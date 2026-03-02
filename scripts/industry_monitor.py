#!/usr/bin/env python3
"""
Comprehensive Industry Monitor + Smart Iteration Generator
Monitors: Industry updates, tech changes, algorithm updates, best practices
Generates: Actionable iteration requirements for GEO/SEO implementation
"""

import os
import sys
import json
import re
import hashlib
from datetime import datetime, timedelta
from typing import List, Dict, Optional, Tuple
from dataclasses import dataclass, asdict
import requests
from bs4 import BeautifulSoup

# Configuration
SUPABASE_URL = "https://fixemvsckapejyfwphft.supabase.co"
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY", "")

@dataclass
class MonitoredSource:
    name: str
    url: str
    type: str  # rss, api, scraping
    category: str
    check_interval: int  # hours
    priority: int  # 1-5, higher = more important

@dataclass
class DetectedChange:
    source: str
    title: str
    url: str
    published_at: str
    content: str
    change_type: str  # algorithm_update, feature_release, best_practice, breaking_change
    severity: str  # critical, high, medium, low
    affected_areas: List[str]
    action_required: bool

class IndustryMonitor:
    """Comprehensive industry change monitoring system"""
    
    SOURCES = [
        # Google Ecosystem
        MonitoredSource("Google Search Central", "https://developers.google.com/search/blog/feed.atom", "rss", "Google Algorithm", 24, 5),
        MonitoredSource("Google Search Status", "https://status.search.google.com/incidents.json", "api", "Google Incidents", 1, 5),
        
        # AI/LLM Updates
        MonitoredSource("OpenAI Blog", "https://openai.com/blog/rss.xml", "rss", "AI Technology", 12, 4),
        MonitoredSource("OpenAI API Status", "https://status.openai.com/api/v2/status.json", "api", "API Changes", 1, 4),
        MonitoredSource("Anthropic Blog", "https://www.anthropic.com/blog/rss.xml", "rss", "AI Technology", 24, 4),
        MonitoredSource("Perplexity Blog", "https://www.perplexity.ai/hub/blog", "scraping", "Search Innovation", 24, 4),
        
        # Search Engines
        MonitoredSource("Bing Webmaster", "https://blogs.bing.com/webmaster/rss.xml", "rss", "Bing Updates", 24, 3),
        MonitoredSource("DuckDuckGo Blog", "https://spreadprivacy.com/rss/", "rss", "Privacy Search", 48, 2),
        
        # Industry Standards
        MonitoredSource("Schema.org Releases", "https://schema.org/docs/releases.html", "scraping", "Schema Standards", 168, 4),  # Weekly
        MonitoredSource("W3C Web Standards", "https://www.w3.org/blog/", "rss", "Web Standards", 48, 3),
        
        # SEO Industry
        MonitoredSource("Search Engine Land", "https://searchengineland.com/feed/", "rss", "SEO News", 12, 3),
        MonitoredSource("Search Engine Journal", "https://www.searchenginejournal.com/feed/", "rss", "SEO News", 24, 3),
        MonitoredSource("Moz Blog", "https://moz.com/blog/rss", "rss", "SEO Best Practices", 48, 3),
        
        # Healthcare/Medical Specific (for GEO medical clients)
        MonitoredSource("HealthIT.gov", "https://www.healthit.gov/newsroom/news-feed", "rss", "Healthcare Tech", 48, 3),
        
        # Technical Standards
        MonitoredSource("Web.dev Blog", "https://web.dev/feed.xml", "rss", "Web Development", 24, 3),
        MonitoredSource("Chrome Developers", "https://developer.chrome.com/blog/feed.xml", "rss", "Chrome Updates", 24, 3),
    ]
    
    # Change detection patterns
    CHANGE_PATTERNS = {
        "algorithm_update": [
            r"core\s+update", r"algorithm\s+change", r"ranking\s+update",
            r"search\s+update", r"indexing\s+change"
        ],
        "feature_release": [
            r"new\s+feature", r"now\s+available", r"introducing",
            r"announcing", r"launch", r"beta"
        ],
        "breaking_change": [
            r"deprecated", r"sunset", r"removing", r"discontinued",
            r"breaking\s+change", r"api\s+change"
        ],
        "best_practice": [
            r"best\s+practice", r"recommendation", r"guideline",
            r"how\s+to", r"tips", r"optimization"
        ]
    }
    
    SEVERITY_KEYWORDS = {
        "critical": ["critical", "urgent", "emergency", "immediate action", "must update"],
        "high": ["important", "significant", "major", "breaking", "deprecated"],
        "medium": ["recommend", "should", "consider", "improve"],
        "low": ["optional", "might", "could", "suggestion"]
    }
    
    def __init__(self):
        self.supabase = None
        if SUPABASE_KEY:
            try:
                from supabase import create_client
                self.supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
            except Exception as e:
                print(f"⚠️ Supabase init error: {e}")
        
        self.processed_hashes = self._load_processed_hashes()
    
    def _load_processed_hashes(self) -> set:
        """Load previously processed content hashes to avoid duplicates"""
        cache_file = "data/processed_hashes.json"
        if os.path.exists(cache_file):
            with open(cache_file, 'r') as f:
                return set(json.load(f))
        return set()
    
    def _save_processed_hashes(self):
        """Save processed hashes"""
        cache_file = "data/processed_hashes.json"
        os.makedirs(os.path.dirname(cache_file), exist_ok=True)
        with open(cache_file, 'w') as f:
            json.dump(list(self.processed_hashes), f)
    
    def _content_hash(self, content: str) -> str:
        """Generate hash for content deduplication"""
        return hashlib.md5(content.lower().strip().encode()).hexdigest()[:16]
    
    def fetch_rss(self, source: MonitoredSource) -> List[Dict]:
        """Fetch and parse RSS feed"""
        try:
            response = requests.get(source.url, timeout=30, headers={
                'User-Agent': 'StackMatrices-IndustryMonitor/1.0'
            })
            
            # Handle JSON API responses
            if source.type == "api":
                return self._parse_api_response(source, response.json())
            
            # Parse RSS/Atom
            soup = BeautifulSoup(response.content, 'xml')
            items = []
            
            for entry in soup.find_all(['entry', 'item'])[:10]:
                title = entry.find('title')
                link = entry.find(['link', 'id'])
                published = entry.find(['published', 'updated', 'pubDate', 'date'])
                content = entry.find(['content', 'summary', 'description'])
                
                title_text = title.get_text(strip=True) if title else ""
                link_text = link.get('href') if link and link.get('href') else link.get_text(strip=True) if link else ""
                published_text = published.get_text(strip=True) if published else datetime.now().isoformat()
                content_text = content.get_text(strip=True)[:1000] if content else title_text
                
                items.append({
                    'source': source.name,
                    'category': source.category,
                    'title': title_text,
                    'url': link_text,
                    'published': published_text,
                    'content': content_text
                })
            
            return items
            
        except Exception as e:
            print(f"❌ Error fetching {source.name}: {e}")
            return []
    
    def _parse_api_response(self, source: MonitoredSource, data: Dict) -> List[Dict]:
        """Parse API responses (like status pages)"""
        items = []
        
        if "incidents" in data:
            for incident in data["incidents"][:5]:
                items.append({
                    'source': source.name,
                    'category': source.category,
                    'title': incident.get('name', 'Incident'),
                    'url': incident.get('shortlink', ''),
                    'published': incident.get('started_at', datetime.now().isoformat()),
                    'content': incident.get('incident_updates', [{}])[0].get('body', '')
                })
        
        return items
    
    def analyze_change(self, item: Dict) -> Optional[DetectedChange]:
        """Analyze content to detect actionable changes"""
        text = f"{item['title']} {item['content']}".lower()
        content_hash = self._content_hash(text)
        
        # Check if already processed
        if content_hash in self.processed_hashes:
            return None
        
        # Detect change type
        change_type = self._detect_change_type(text)
        if not change_type:
            self.processed_hashes.add(content_hash)
            return None
        
        # Determine severity
        severity = self._assess_severity(text, change_type, item['category'])
        
        # Identify affected areas
        affected_areas = self._identify_affected_areas(text)
        
        # Check if action is required
        action_required = severity in ['critical', 'high'] or change_type in ['breaking_change', 'algorithm_update']
        
        change = DetectedChange(
            source=item['source'],
            title=item['title'],
            url=item['url'],
            published_at=item['published'],
            content=item['content'],
            change_type=change_type,
            severity=severity,
            affected_areas=affected_areas,
            action_required=action_required
        )
        
        self.processed_hashes.add(content_hash)
        return change
    
    def _detect_change_type(self, text: str) -> Optional[str]:
        """Detect what type of change this is"""
        for change_type, patterns in self.CHANGE_PATTERNS.items():
            for pattern in patterns:
                if re.search(pattern, text):
                    return change_type
        return None
    
    def _assess_severity(self, text: str, change_type: str, category: str) -> str:
        """Assess the severity of the change"""
        # Algorithm updates from Google are always high priority
        if change_type == "algorithm_update" and "google" in category.lower():
            return "critical"
        
        # Check severity keywords
        for severity, keywords in self.SEVERITY_KEYWORDS.items():
            for keyword in keywords:
                if keyword in text:
                    return severity
        
        # Default based on change type
        severity_map = {
            "breaking_change": "high",
            "algorithm_update": "high",
            "feature_release": "medium",
            "best_practice": "low"
        }
        return severity_map.get(change_type, "medium")
    
    def _identify_affected_areas(self, text: str) -> List[str]:
        """Identify which areas are affected"""
        areas = []
        
        # Industry areas
        if any(x in text for x in ["medical", "healthcare", "doctor", "clinic"]):
            areas.append("medical")
        if any(x in text for x in ["local", "map", "business"]):
            areas.append("local")
        if any(x in text for x in ["ecommerce", "shop", "product"]):
            areas.append("ecommerce")
        if any(x in text for x in ["schema", "structured", "markup"]):
            areas.append("technical_seo")
        if any(x in text for x in ["content", "quality", "helpful"]):
            areas.append("content_strategy")
        if any(x in text for x in ["ai", "llm", "generative", "chatgpt"]):
            areas.append("ai_optimization")
        
        if not areas:
            areas.append("all")
        
        return areas
    
    def generate_iteration(self, change: DetectedChange) -> Optional[Dict]:
        """Generate implementation iteration from detected change"""
        if not change.action_required:
            return None
        
        # Use AI for complex changes
        if change.severity in ['critical', 'high'] and DEEPSEEK_API_KEY:
            return self._generate_with_ai(change)
        
        # Use template for standard changes
        return self._generate_with_template(change)
    
    def _generate_with_ai(self, change: DetectedChange) -> Dict:
        """Use DeepSeek AI to generate detailed iteration"""
        try:
            prompt = f"""As a GEO/SEO implementation expert, analyze this industry change and create a detailed implementation requirement.

SOURCE: {change.source}
TITLE: {change.title}
CHANGE TYPE: {change.change_type}
SEVERITY: {change.severity}
AFFECTED AREAS: {', '.join(change.affected_areas)}

CONTENT:
{change.content[:1500]}

Create a structured implementation requirement:
1. Clear, actionable title
2. Detailed description of what changed and why it matters
3. Specific implementation steps (5-8 steps)
4. Acceptance criteria for completion
5. Estimated effort in hours
6. Required skills/tags
7. Risk assessment

Return ONLY valid JSON matching this structure:
{{
  "title": "Action-oriented title",
  "description": "Detailed explanation including context, impact, and rationale",
  "implementation_steps": ["step 1", "step 2", ...],
  "acceptance_criteria": ["criterion 1", "criterion 2", ...],
  "estimated_hours": number,
  "tags": ["tag1", "tag2"],
  "risk_level": "high|medium|low",
  "dependencies": ["dependency 1"]
}}"""

            response = requests.post(
                "https://api.deepseek.com/v1/chat/completions",
                headers={"Authorization": f"Bearer {DEEPSEEK_API_KEY}"},
                json={
                    "model": "deepseek-chat",
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature": 0.3,
                    "max_tokens": 2000
                },
                timeout=60
            )
            
            result = response.json()
            ai_output = json.loads(result['choices'][0]['message']['content'])
            
            return {
                "title": f"[{change.change_type.upper()}] {ai_output['title']}",
                "description": ai_output['description'],
                "category": self._map_category(change.change_type),
                "priority": change.severity,
                "status": "backlog",
                "estimated_hours": ai_output.get('estimated_hours', 8),
                "actual_hours": None,
                "tags": ai_output.get('tags', []) + [change.source.lower().replace(' ', '_')],
                "affects": change.affected_areas,
                "source_type": change.change_type,
                "source_url": change.url,
                "source_title": change.title,
                "acceptance_criteria": ai_output.get('acceptance_criteria', []),
                "implementation_steps": ai_output.get('implementation_steps', []),
                "technical_notes": f"Auto-generated from {change.source} on {datetime.now().isoformat()}",
                "risk_level": ai_output.get('risk_level', 'medium'),
                "project": "GEO_SEO_Implementation"
            }
            
        except Exception as e:
            print(f"⚠️ AI generation failed: {e}, using template")
            return self._generate_with_template(change)
    
    def _generate_with_template(self, change: DetectedChange) -> Dict:
        """Generate iteration using predefined templates"""
        
        templates = {
            "algorithm_update": {
                "steps": [
                    f"Monitor {change.source} for detailed guidance",
                    "Audit client sites for compliance",
                    "Identify affected pages/content",
                    "Develop remediation strategy",
                    "Implement required changes",
                    "Monitor ranking/performance impact",
                    "Document learnings and update playbooks"
                ],
                "criteria": [
                    "All affected client sites audited",
                    "Changes implemented within recommended timeframe",
                    "No ranking drops observed",
                    "Documentation updated"
                ],
                "base_hours": 16
            },
            "breaking_change": {
                "steps": [
                    f"Review {change.source} documentation",
                    "Assess impact on current implementations",
                    "Develop migration plan",
                    "Test changes in staging",
                    "Deploy to production",
                    "Monitor for issues",
                    "Update client communications"
                ],
                "criteria": [
                    "Migration plan approved",
                    "Staging tests pass",
                    "Production deployment successful",
                    "No service disruptions"
                ],
                "base_hours": 12
            },
            "feature_release": {
                "steps": [
                    f"Research {change.title} capabilities",
                    "Evaluate relevance for GEO/SEO clients",
                    "Develop implementation guide",
                    "Create proof of concept",
                    "Test with pilot clients",
                    "Roll out to all applicable clients"
                ],
                "criteria": [
                    "Feature evaluated and documented",
                    "Implementation guide created",
                    "Pilot test successful",
                    "Rolled out to relevant clients"
                ],
                "base_hours": 8
            },
            "best_practice": {
                "steps": [
                    f"Review {change.title} recommendations",
                    "Compare with current practices",
                    "Identify improvement opportunities",
                    "Update internal guidelines",
                    "Train team on new practices",
                    "Implement where applicable"
                ],
                "criteria": [
                    "Best practices reviewed",
                    "Guidelines updated",
                    "Team trained",
                    "Changes implemented"
                ],
                "base_hours": 4
            }
        }
        
        template = templates.get(change.change_type, templates["best_practice"])
        
        # Adjust hours based on severity
        hour_multiplier = {"critical": 2, "high": 1.5, "medium": 1, "low": 0.5}
        estimated_hours = int(template["base_hours"] * hour_multiplier.get(change.severity, 1))
        
        return {
            "title": f"[{change.change_type.upper()}] {change.title[:80]}",
            "description": f"Source: {change.source}\n\n{change.content[:500]}...\n\nURL: {change.url}",
            "category": self._map_category(change.change_type),
            "priority": change.severity,
            "status": "backlog",
            "estimated_hours": estimated_hours,
            "actual_hours": None,
            "tags": [change.change_type, change.source.lower().replace(' ', '_'), "auto_generated"],
            "affects": change.affected_areas,
            "source_type": change.change_type,
            "source_url": change.url,
            "source_title": change.title,
            "acceptance_criteria": template["criteria"],
            "implementation_steps": template["steps"],
            "technical_notes": f"Auto-generated from {change.source} on {datetime.now().isoformat()}",
            "risk_level": "high" if change.severity == "critical" else change.severity,
            "project": "GEO_SEO_Implementation"
        }
    
    def _map_category(self, change_type: str) -> str:
        """Map change type to category"""
        mapping = {
            "algorithm_update": "Algorithm",
            "breaking_change": "Technical",
            "feature_release": "Strategy",
            "best_practice": "Content"
        }
        return mapping.get(change_type, "Strategy")
    
    def save_iteration(self, iteration: Dict) -> bool:
        """Save iteration to Supabase"""
        iteration["created_at"] = datetime.now().isoformat()
        iteration["updated_at"] = datetime.now().isoformat()
        
        # Try Supabase
        if self.supabase:
            try:
                # Check for duplicates
                existing = self.supabase.table("geo_implementation_iterations")\
                    .select("id")\
                    .eq("source_url", iteration['source_url'])\
                    .execute()
                
                if existing.data:
                    print(f"  ⚠️ Already exists: {iteration['title'][:50]}...")
                    return False
                
                self.supabase.table("geo_implementation_iterations").insert(iteration).execute()
                print(f"  ✅ Saved to database")
                return True
                
            except Exception as e:
                print(f"  ⚠️ Database save failed: {e}")
        
        # Fallback to JSON
        try:
            json_path = "data/geo_iterations.json"
            os.makedirs(os.path.dirname(json_path), exist_ok=True)
            
            iterations = []
            if os.path.exists(json_path):
                with open(json_path, 'r') as f:
                    iterations = json.load(f)
            
            if not any(i.get('source_url') == iteration['source_url'] for i in iterations):
                iterations.append(iteration)
                with open(json_path, 'w') as f:
                    json.dump(iterations, f, indent=2, default=str)
                print(f"  ✅ Saved to JSON file")
                return True
        except Exception as e:
            print(f"  ❌ JSON save failed: {e}")
        
        return False
    
    def run(self):
        """Main monitoring loop"""
        print("🔍 Industry Monitor + Smart Iteration Generator")
        print("=" * 70)
        print(f"⏰ Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"📊 Monitoring {len(self.SOURCES)} sources\n")
        
        stats = {"checked": 0, "changes_detected": 0, "iterations_created": 0, "errors": 0}
        
        for source in self.SOURCES:
            print(f"📡 {source.name} ({source.category})")
            
            try:
                if source.type in ["rss", "api"]:
                    items = self.fetch_rss(source)
                else:
                    print(f"   ⏭️  Skipping (scraping not implemented)")
                    continue
                
                stats["checked"] += len(items)
                
                for item in items:
                    # Analyze for changes
                    change = self.analyze_change(item)
                    
                    if change:
                        stats["changes_detected"] += 1
                        print(f"   🔎 {change.change_type.upper()} | {change.severity.upper()}")
                        print(f"      {change.title[:60]}...")
                        
                        # Generate iteration
                        iteration = self.generate_iteration(change)
                        
                        if iteration:
                            if self.save_iteration(iteration):
                                stats["iterations_created"] += 1
                                print(f"      📋 Iteration created ({iteration['estimated_hours']}h)")
                        else:
                            print(f"      ℹ️  No action required")
                    
                    else:
                        print(f"   ✓ No actionable changes")
                
            except Exception as e:
                stats["errors"] += 1
                print(f"   ❌ Error: {e}")
        
        # Save processed hashes
        self._save_processed_hashes()
        
        # Summary
        print("\n" + "=" * 70)
        print("📊 MONITORING SUMMARY")
        print("-" * 70)
        print(f"Sources checked:     {len(self.SOURCES)}")
        print(f"Items analyzed:      {stats['checked']}")
        print(f"Changes detected:    {stats['changes_detected']}")
        print(f"Iterations created:  {stats['iterations_created']}")
        print(f"Errors:              {stats['errors']}")
        print("=" * 70)
        
        return stats

if __name__ == "__main__":
    monitor = IndustryMonitor()
    stats = monitor.run()
    sys.exit(0 if stats['errors'] == 0 else 1)
