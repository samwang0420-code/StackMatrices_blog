#!/usr/bin/env python3
"""
StackMatrices Industry Insight Generator
Monitors SEO/GEO industry sources and generates X-ready content
"""

import os
import sys
import json
import requests
from datetime import datetime, timedelta
from typing import List, Dict, Optional
from dataclasses import dataclass
import re

# Configuration
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY", "")
DATA_DIR = "data/insights"

@dataclass
class SourceItem:
    source: str
    title: str
    url: str
    published: str
    content: str
    insight_type: str  # algorithm_update, feature_release, trend, best_practice

class InsightGenerator:
    """Generate industry insights for X/Twitter"""
    
    SOURCES = {
        "google_search_central": {
            "url": "https://developers.google.com/search/blog/feed.atom",
            "type": "rss",
            "category": "Google Updates"
        },
        "openai_blog": {
            "url": "https://openai.com/blog/rss.xml", 
            "type": "rss",
            "category": "AI Technology"
        },
        "bing_webmaster": {
            "url": "https://blogs.bing.com/webmaster/rss.xml",
            "type": "rss", 
            "category": "Bing Updates"
        }
    }
    
    # Medical/GEO focused keywords
    RELEVANT_KEYWORDS = [
        "search", "ranking", "algorithm", "ai", "llm", "generative",
        "local", "medical", "healthcare", "schema", "markup",
        "citation", "recommendation", "visibility", "optimization"
    ]
    
    def __init__(self):
        os.makedirs(DATA_DIR, exist_ok=True)
        self.processed_file = f"{DATA_DIR}/processed.json"
        self.processed = self._load_processed()
    
    def _load_processed(self) -> set:
        """Load already processed URLs"""
        if os.path.exists(self.processed_file):
            with open(self.processed_file, 'r') as f:
                return set(json.load(f))
        return set()
    
    def _save_processed(self):
        """Save processed URLs"""
        with open(self.processed_file, 'w') as f:
            json.dump(list(self.processed), f)
    
    def fetch_rss(self, url: str) -> List[Dict]:
        """Fetch and parse RSS feed"""
        try:
            import xml.etree.ElementTree as ET
            
            response = requests.get(url, timeout=30, headers={
                'User-Agent': 'StackMatrices-InsightBot/1.0'
            })
            
            root = ET.fromstring(response.content)
            items = []
            
            # Handle Atom format
            for entry in root.findall('.//{http://www.w3.org/2005/Atom}entry')[:3]:
                title = entry.find('{http://www.w3.org/2005/Atom}title')
                link = entry.find('{http://www.w3.org/2005/Atom}link')
                published = entry.find('{http://www.w3.org/2005/Atom}published')
                content = entry.find('{http://www.w3.org/2005/Atom}content')
                
                items.append({
                    'title': title.text if title is not None else '',
                    'url': link.get('href') if link is not None else '',
                    'published': published.text if published is not None else '',
                    'content': content.text if content is not None else ''
                })
            
            return items
            
        except Exception as e:
            print(f"❌ RSS fetch error: {e}")
            return []
    
    def is_relevant(self, title: str, content: str) -> bool:
        """Check if content is relevant to medical/GEO"""
        text = f"{title} {content}".lower()
        return any(keyword in text for keyword in self.RELEVANT_KEYWORDS)
    
    def classify_insight(self, title: str, content: str) -> str:
        """Classify the type of insight"""
        text = f"{title} {content}".lower()
        
        if any(x in text for x in ["algorithm update", "core update", "ranking change"]):
            return "algorithm_update"
        elif any(x in text for x in ["new feature", "announcing", "launch"]):
            return "feature_release"
        elif any(x in text for x in ["deprecated", "removing", "shutting down"]):
            return "breaking_change"
        elif any(x in text for x in ["best practice", "guide", "how to", "tips"]):
            return "best_practice"
        else:
            return "trend"
    
    def generate_x_content(self, item: SourceItem) -> Optional[Dict]:
        """Generate X-ready content from source item"""
        
        # Use DeepSeek for high-quality content generation
        if DEEPSEEK_API_KEY:
            return self._generate_with_ai(item)
        else:
            return self._generate_template(item)
    
    def _generate_with_ai(self, item: SourceItem) -> Optional[Dict]:
        """Use DeepSeek AI to generate content"""
        try:
            prompt = f"""Create a Twitter/X post about this {item.insight_type} for medical practices.

Source: {item.source}
Title: {item.title}
Content: {item.content[:500]}

Requirements:
1. Hook attention in first line
2. Explain what changed/what's new
3. Why it matters for plastic surgeons/dentists
4. Actionable tip they can use
5. Use emojis sparingly
6. Max 280 characters for main tweet
7. Include relevant hashtags

Return JSON:
{{
    "hook": "attention-grabbing first line",
    "body": "main content (280 chars max)",
    "cta": "call to action",
    "hashtags": "#hashtag1 #hashtag2",
    "full_tweet": "complete tweet text"
}}"""

            response = requests.post(
                "https://api.deepseek.com/v1/chat/completions",
                headers={"Authorization": f"Bearer {DEEPSEEK_API_KEY}"},
                json={
                    "model": "deepseek-chat",
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature": 0.7
                },
                timeout=60
            )
            
            result = response.json()
            content = json.loads(result['choices'][0]['message']['content'])
            
            return {
                "source": item.source,
                "source_url": item.url,
                "insight_type": item.insight_type,
                "generated_at": datetime.now().isoformat(),
                **content
            }
            
        except Exception as e:
            print(f"⚠️ AI generation failed: {e}")
            return self._generate_template(item)
    
    def _generate_template(self, item: SourceItem) -> Dict:
        """Generate content using templates (fallback)"""
        
        templates = {
            "algorithm_update": {
                "hook": "🚨 Google just dropped an algorithm update",
                "body": f"{item.title}. Medical practices: Check your AI visibility ASAP. This affects who gets recommended by ChatGPT & Perplexity.",
                "hashtags": "#GoogleUpdate #GEO #MedicalMarketing"
            },
            "feature_release": {
                "hook": "✨ New AI feature just launched",
                "body": f"{item.title}. This changes how patients find doctors. Early adopters will win big.",
                "hashtags": "#AI #HealthTech #GEO"
            },
            "breaking_change": {
                "hook": "⚠️ Heads up: Big change coming",
                "body": f"{item.title}. If you're not prepared, your AI visibility could drop 50%+.",
                "hashtags": "#SEO #DigitalHealth #MedicalSEO"
            },
            "best_practice": {
                "hook": "💡 Pro tip for medical practices",
                "body": f"{item.title}. Implement this and watch your AI recommendations increase.",
                "hashtags": "#MedicalMarketing #BestPractice #GEO"
            },
            "trend": {
                "hook": "📊 Trend alert",
                "body": f"{item.title}. The practices adapting to this are capturing 3x more AI-referred patients.",
                "hashtags": "#Trend #MedicalSEO #AI"
            }
        }
        
        template = templates.get(item.insight_type, templates["trend"])
        
        return {
            "source": item.source,
            "source_url": item.url,
            "insight_type": item.insight_type,
            "generated_at": datetime.now().isoformat(),
            "hook": template["hook"],
            "body": template["body"],
            "hashtags": template["hashtags"],
            "full_tweet": f"{template['hook']}\n\n{template['body']}\n\n{template['hashtags']}"
        }
    
    def run(self):
        """Main execution loop"""
        print("🔍 Scanning industry sources for insights...")
        print("=" * 60)
        
        new_insights = []
        
        for source_name, config in self.SOURCES.items():
            print(f"\n📡 Checking: {source_name}")
            
            items = self.fetch_rss(config["url"])
            
            for item in items:
                # Skip if already processed
                if item["url"] in self.processed:
                    print(f"   ⏭️  Already processed: {item['title'][:50]}...")
                    continue
                
                # Check relevance
                if not self.is_relevant(item["title"], item["content"]):
                    print(f"   ⏭️  Not relevant: {item['title'][:50]}...")
                    self.processed.add(item["url"])
                    continue
                
                print(f"   ✅ Found relevant: {item['title'][:50]}...")
                
                # Classify and generate
                insight_type = self.classify_insight(item["title"], item["content"])
                source_item = SourceItem(
                    source=source_name,
                    title=item["title"],
                    url=item["url"],
                    published=item["published"],
                    content=item["content"],
                    insight_type=insight_type
                )
                
                content = self.generate_x_content(source_item)
                if content:
                    new_insights.append(content)
                    self.processed.add(item["url"])
                    
                    # Save individual insight
                    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                    filename = f"{DATA_DIR}/insight_{timestamp}_{source_name}.json"
                    with open(filename, 'w') as f:
                        json.dump(content, f, indent=2)
        
        # Save processed URLs
        self._save_processed()
        
        # Generate report
        print("\n" + "=" * 60)
        print(f"📊 Summary: {len(new_insights)} new insights generated")
        
        if new_insights:
            print("\n📝 Ready to post:")
            for i, insight in enumerate(new_insights[:3], 1):
                print(f"\n{i}. [{insight['insight_type']}] {insight['hook']}")
                print(f"   {insight['body'][:100]}...")
        else:
            print("\n💡 No new relevant insights found today.")
        
        return new_insights

if __name__ == "__main__":
    generator = InsightGenerator()
    insights = generator.run()
    
    # Exit with count for automation
    sys.exit(len(insights))
