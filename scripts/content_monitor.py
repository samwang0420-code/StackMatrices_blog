#!/usr/bin/env python3
"""
Content Monitoring System for StackMatrices Blog
Monitors SEO/GEO authority sources and generates blog updates
"""

import json
import os
from datetime import datetime, timedelta
from typing import List, Dict
import requests
from bs4 import BeautifulSoup
import openai

# Supabase configuration
SUPABASE_URL = "https://fixemvsckapejyfwphft.supabase.co"
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY", "")

# OpenAI for content generation
openai.api_key = os.getenv("OPENAI_API_KEY", "")

class ContentMonitor:
    def __init__(self):
        self.sources = {
            "google_search_central": {
                "url": "https://developers.google.com/search/blog",
                "type": "rss",
                "priority": 1,
                "category": "Algorithm Updates"
            },
            "openai_blog": {
                "url": "https://openai.com/blog",
                "type": "scraping",
                "priority": 1,
                "category": "AI Updates"
            },
            "search_engine_land": {
                "url": "https://searchengineland.com/",
                "type": "rss",
                "priority": 2,
                "category": "Industry News"
            }
        }
        
    def fetch_google_search_central(self) -> List[Dict]:
        """Fetch latest from Google Search Central"""
        try:
            url = "https://developers.google.com/search/blog/feed.atom"
            response = requests.get(url, timeout=30)
            soup = BeautifulSoup(response.content, 'xml')
            
            articles = []
            for entry in soup.find_all('entry')[:5]:
                articles.append({
                    "title": entry.title.text if entry.title else "",
                    "link": entry.link.get('href') if entry.link else "",
                    "published": entry.published.text if entry.published else "",
                    "summary": entry.summary.text if entry.summary else "",
                    "source": "Google Search Central"
                })
            return articles
        except Exception as e:
            print(f"Error fetching Google Search Central: {e}")
            return []
    
    def fetch_openai_blog(self) -> List[Dict]:
        """Fetch latest from OpenAI Blog"""
        try:
            url = "https://openai.com/blog"
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
            response = requests.get(url, headers=headers, timeout=30)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            articles = []
            # Adjust selectors based on actual page structure
            posts = soup.find_all('article', limit=5)
            for post in posts:
                title = post.find('h2') or post.find('h3')
                link = post.find('a')
                if title and link:
                    articles.append({
                        "title": title.text.strip(),
                        "link": f"https://openai.com{link.get('href')}" if link.get('href') else "",
                        "published": datetime.now().isoformat(),
                        "summary": "",
                        "source": "OpenAI Blog"
                    })
            return articles
        except Exception as e:
            print(f"Error fetching OpenAI Blog: {e}")
            return []
    
    def filter_medical_relevant(self, articles: List[Dict]) -> List[Dict]:
        """Filter articles relevant to medical/GEO marketing"""
        keywords = [
            "medical", "healthcare", "doctor", "clinic", "patient",
            "local search", "local SEO", "schema", "structured data",
            "AI search", "generative", "ChatGPT", "AI optimization",
            "citation", "knowledge graph", "entity",
            "algorithm update", "core update", "ranking"
        ]
        
        filtered = []
        for article in articles:
            text = f"{article.get('title', '')} {article.get('summary', '')}".lower()
            if any(kw in text for kw in keywords):
                article['relevance_score'] = sum(1 for kw in keywords if kw in text)
                filtered.append(article)
        
        return sorted(filtered, key=lambda x: x['relevance_score'], reverse=True)
    
    def generate_blog_post(self, article: Dict) -> Dict:
        """Generate a blog post from source article"""
        try:
            prompt = f"""Based on this article from {article['source']}:

Title: {article['title']}
Summary: {article['summary']}

Write a blog post for StackMatrices (a GEO agency for medical practices) that:
1. Explains the news/update in context of medical marketing
2. Provides actionable advice for plastic surgeons, dentists, and medspas
3. Includes specific implementation steps or recommendations
4. Has a professional but accessible tone
5. Is 800-1200 words

Format as JSON with fields: title, excerpt, content (markdown), category, tags"""

            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a medical marketing expert specializing in GEO (Generative Engine Optimization)."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7
            )
            
            generated = response.choices[0].message.content
            
            # Try to parse as JSON
            try:
                blog_data = json.loads(generated)
            except:
                # If not valid JSON, structure it
                blog_data = {
                    "title": article['title'],
                    "excerpt": article['summary'][:200] + "...",
                    "content": generated,
                    "category": "Industry News",
                    "tags": ["GEO", "SEO", "Medical Marketing"]
                }
            
            blog_data['source_url'] = article['link']
            blog_data['source_name'] = article['source']
            blog_data['published_date'] = datetime.now().isoformat()
            
            return blog_data
            
        except Exception as e:
            print(f"Error generating blog post: {e}")
            return None
    
    def save_to_supabase(self, blog_post: Dict):
        """Save generated blog post to Supabase"""
        try:
            headers = {
                "apikey": SUPABASE_KEY,
                "Authorization": f"Bearer {SUPABASE_KEY}",
                "Content-Type": "application/json"
            }
            
            response = requests.post(
                f"{SUPABASE_URL}/rest/v1/blog_posts",
                headers=headers,
                json=blog_post
            )
            
            if response.status_code == 201:
                print(f"✅ Saved blog post: {blog_post['title']}")
                return True
            else:
                print(f"❌ Failed to save: {response.text}")
                return False
                
        except Exception as e:
            print(f"Error saving to Supabase: {e}")
            return False
    
    def run_daily_check(self):
        """Run daily content check"""
        print(f"🔍 Starting content monitoring: {datetime.now()}")
        
        all_articles = []
        
        # Fetch from all sources
        all_articles.extend(self.fetch_google_search_central())
        all_articles.extend(self.fetch_openai_blog())
        
        print(f"📊 Found {len(all_articles)} articles")
        
        # Filter for medical relevance
        relevant = self.filter_medical_relevant(all_articles)
        print(f"🎯 {len(relevant)} relevant to medical marketing")
        
        # Generate and save blog posts for top 3
        for article in relevant[:3]:
            print(f"📝 Generating blog post for: {article['title'][:60]}...")
            blog_post = self.generate_blog_post(article)
            if blog_post:
                self.save_to_supabase(blog_post)
        
        print(f"✅ Daily check complete: {datetime.now()}")

def main():
    monitor = ContentMonitor()
    monitor.run_daily_check()

if __name__ == "__main__":
    main()
