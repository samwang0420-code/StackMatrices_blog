#!/usr/bin/env python3
"""
Content Monitor + Iteration Generator
Monitors SEO/GEO sources and auto-generates iteration requirements
"""

import os
import sys
import json
import re
from datetime import datetime, timedelta
from typing import List, Dict, Optional
import requests
from bs4 import BeautifulSoup

# Supabase config
SUPABASE_URL = "https://fixemvsckapejyfwphft.supabase.co"
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

# DeepSeek API for content analysis
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY", "")

class IterationGenerator:
    def __init__(self):
        self.supabase = None
        if SUPABASE_KEY:
            try:
                from supabase import create_client
                self.supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
            except:
                pass
        
        self.sources = {
            "google_search_central": {
                "url": "https://developers.google.com/search/blog/feed.atom",
                "type": "rss",
                "category": "Algorithm Updates"
            },
            "openai_blog": {
                "url": "https://openai.com/blog",
                "type": "scraping",
                "category": "AI Updates"
            },
            "perplexity_blog": {
                "url": "https://www.perplexity.ai/hub/blog",
                "type": "scraping", 
                "category": "Search Innovation"
            },
            "bing_webmaster": {
                "url": "https://blogs.bing.com/webmaster",
                "type": "rss",
                "category": "Search Updates"
            }
        }
        
        # Keywords that indicate actionable changes
        self.action_keywords = [
            "update", "changes", "new feature", "deprecated", "algorithm",
            "ranking", "indexing", "crawl", "schema", "structured data",
            "core update", "helpful content", "spam", "penalty",
            "ai overview", "generative", "chatgpt", "llm", "semantic"
        ]
        
        # Impact assessment patterns
        self.high_impact_patterns = [
            r"core\s+update",
            r"algorithm\s+change",
            r"ranking\s+factor",
            r"deprecated",
            r"breaking\s+change",
            r"must\s+update",
            r"critical"
        ]
    
    def fetch_rss(self, url: str) -> List[Dict]:
        """Fetch and parse RSS feed"""
        try:
            response = requests.get(url, timeout=30, headers={
                'User-Agent': 'StackMatrices-Monitor/1.0'
            })
            soup = BeautifulSoup(response.content, 'xml')
            
            items = []
            for entry in soup.find_all(['entry', 'item'])[:5]:  # Latest 5
                title = entry.find(['title', 'summary'])
                link = entry.find(['link', 'id'])
                published = entry.find(['published', 'updated', 'pubDate'])
                
                items.append({
                    'title': title.get_text(strip=True) if title else '',
                    'link': link.get('href', link.get_text(strip=True)) if link else '',
                    'published': published.get_text(strip=True) if published else '',
                    'content': entry.get_text(strip=True)[:500]
                })
            return items
        except Exception as e:
            print(f"❌ RSS fetch error: {e}")
            return []
    
    def analyze_with_ai(self, content: Dict, source_category: str) -> Optional[Dict]:
        """Analyze content with DeepSeek to extract iteration requirements"""
        if not DEEPSEEK_API_KEY:
            # Fallback: rule-based analysis
            return self._rule_based_analysis(content, source_category)
        
        try:
            prompt = f"""Analyze this {source_category} update and extract actionable iteration requirements for a GEO (Generative Engine Optimization) agency.

Title: {content['title']}
Content: {content['content'][:1000]}

Identify:
1. What changed? (technical details)
2. Who is affected? (scope)
3. What action is required? (implementation)
4. Priority level? (critical/high/medium/low)
5. Estimated effort? (hours)

Return ONLY valid JSON:
{{
  "is_actionable": true/false,
  "title": "Brief requirement title",
  "description": "Detailed what/why/how",
  "category": "Algorithm|Technical|Content|Strategy",
  "priority": "critical|high|medium|low",
  "estimated_hours": number,
  "tags": ["tag1", "tag2"],
  "affects": ["medical", "local", "ecommerce"],
  "implementation_steps": ["step1", "step2"]
}}"""

            response = requests.post(
                "https://api.deepseek.com/v1/chat/completions",
                headers={"Authorization": f"Bearer {DEEPSEEK_API_KEY}"},
                json={
                    "model": "deepseek-chat",
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature": 0.3
                },
                timeout=60
            )
            
            result = response.json()
            analysis = json.loads(result['choices'][0]['message']['content'])
            return analysis if analysis.get('is_actionable') else None
            
        except Exception as e:
            print(f"⚠️ AI analysis failed, using rule-based: {e}")
            return self._rule_based_analysis(content, source_category)
    
    def _rule_based_analysis(self, content: Dict, source_category: str) -> Optional[Dict]:
        """Rule-based analysis when AI is unavailable"""
        text = f"{content['title']} {content['content']}".lower()
        
        # Check if content contains action keywords
        has_action = any(kw in text for kw in self.action_keywords)
        if not has_action:
            return None
        
        # Determine priority
        priority = "medium"
        for pattern in self.high_impact_patterns:
            if re.search(pattern, text):
                priority = "critical" if "critical" in text else "high"
                break
        
        # Extract category
        category = "Algorithm" if "algorithm" in text else \
                   "Technical" if any(x in text for x in ["schema", "structured", "json"]) else \
                   "Content" if any(x in text for x in ["content", "quality", "helpful"]) else \
                   "Strategy"
        
        # Generate requirement
        return {
            "is_actionable": True,
            "title": f"[{source_category}] {content['title'][:60]}...",
            "description": f"Source: {content['link']}\n\n{content['content'][:300]}...",
            "category": category,
            "priority": priority,
            "estimated_hours": 4 if priority == "low" else 8 if priority == "medium" else 16,
            "tags": [source_category.lower().replace(" ", "_"), "auto_generated"],
            "affects": ["all_clients"],
            "implementation_steps": [
                "Review source documentation",
                "Analyze impact on current clients",
                "Update GEO playbooks",
                "Implement changes"
            ]
        }
    
    def save_iteration(self, iteration: Dict, source: str) -> bool:
        """Save iteration to Supabase or JSON file"""
        iteration_data = {
            "title": iteration['title'],
            "description": iteration['description'],
            "category": iteration['category'],
            "priority": iteration['priority'],
            "status": "backlog",
            "estimated_hours": iteration['estimated_hours'],
            "tags": iteration.get('tags', []),
            "acceptance_criteria": iteration.get('implementation_steps', []),
            "technical_notes": f"Auto-generated from {source}",
            "source_url": iteration.get('link', ''),
            "project": "GEO_SEO_Implementation",
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat()
        }
        
        # Try Supabase first
        if self.supabase:
            try:
                # Check for duplicates
                existing = self.supabase.table("tech_iterations").select("id").eq("title", iteration_data['title']).execute()
                
                if existing.data:
                    print(f"⚠️ Already exists: {iteration_data['title'][:50]}...")
                    return False
                
                self.supabase.table("tech_iterations").insert(iteration_data).execute()
                print(f"✅ Saved to Supabase: {iteration_data['title'][:50]}...")
                return True
                
            except Exception as e:
                print(f"⚠️ Supabase save failed: {e}")
        
        # Fallback to JSON file
        try:
            json_path = "data/auto_iterations.json"
            os.makedirs(os.path.dirname(json_path), exist_ok=True)
            
            iterations = []
            if os.path.exists(json_path):
                with open(json_path, 'r') as f:
                    iterations = json.load(f)
            
            # Check duplicates
            if not any(i['title'] == iteration_data['title'] for i in iterations):
                iterations.append(iteration_data)
                with open(json_path, 'w') as f:
                    json.dump(iterations, f, indent=2, default=str)
                print(f"✅ Saved to JSON: {iteration_data['title'][:50]}...")
                return True
            else:
                print(f"⚠️ Already exists in JSON: {iteration_data['title'][:50]}...")
                
        except Exception as e:
            print(f"❌ JSON save failed: {e}")
        
        return False
    
    def run(self):
        """Main monitoring loop"""
        print("🔍 Starting Content Monitor + Iteration Generator...")
        print(f"⏰ {datetime.now().isoformat()}")
        print("-" * 60)
        
        total_new = 0
        
        for source_name, source_config in self.sources.items():
            print(f"\n📡 Monitoring: {source_name}")
            
            if source_config['type'] == 'rss':
                items = self.fetch_rss(source_config['url'])
            else:
                # Skip scraping for now
                print(f"   ⏭️  Skipping (scraping not implemented)")
                continue
            
            for item in items:
                # Analyze content
                analysis = self.analyze_with_ai(item, source_config['category'])
                
                if analysis and analysis.get('is_actionable'):
                    if self.save_iteration(analysis, source_name):
                        total_new += 1
        
        print("\n" + "=" * 60)
        print(f"📊 Summary: {total_new} new iterations generated")
        
        return total_new

if __name__ == "__main__":
    generator = IterationGenerator()
    count = generator.run()
    sys.exit(0 if count >= 0 else 1)
