#!/usr/bin/env python3
"""
StackMatrices X Content Generator - Mixed Format
30% Short (1 tweet) + 50% Medium (2-3 tweets) + 20% Long Thread (5-6 tweets)
"""

import os
import json
import random
from datetime import datetime

DATA_DIR = "/root/.openclaw/workspace/blog/data/insights"
os.makedirs(DATA_DIR, exist_ok=True)

# =====================
# SHORT - 1 Tweet (30%)
# =====================
SHORT_TEMPLATES = [
    {
        "type": "short",
        "topic": "AI Search Alert",
        "tweet": "🚨 84% of health queries now show AI Overviews.\n\nIf your practice isn't cited, you're invisible.\n\nReply 'AUDIT' for free visibility check.",
        "hashtags": "#GEO #AIsearch"
    },
    {
        "type": "short",
        "topic": "Schema Quick Tip",
        "tweet": "Add MedicalOrganization schema to your site.\n\nIt takes 30 minutes.\n\nIt could triple your AI citations.\n\n→ schema.org/MedicalOrganization",
        "hashtags": "#SchemaMarkup #SEO"
    },
    {
        "type": "short",
        "topic": "Question Hook",
        "tweet": "Ask ChatGPT: \"Best [specialty] in [city]\"\n\nIs YOUR practice on the list?\n\nIf not, you're losing patients to AI.",
        "hashtags": "#ChatGPT #MedicalMarketing"
    },
    {
        "type": "short",
        "topic": "Stat Drop",
        "tweet": "3.2x more AI citations with complete schema markup.\n\nThat's the difference between being recommended or ignored.",
        "hashtags": "#GEO #MedicalSEO"
    },
    {
        "type": "short",
        "topic": "CTA",
        "tweet": "Your SEO budget is 47% invisible to AI search.\n\nMost don't even know.\n\n→ Check your AI visibility: DM your specialty + city",
        "hashtags": "#SEOBudget #GEO"
    },
    {
        "type": "short",
        "topic": "Quick Win",
        "tweet": "Easy win: Add FAQ schema to your service pages.\n\nAI loves it.\n\nYour competitors probably don't have it.",
        "hashtags": "#FAQS #Schema"
    },
]

# =====================
# MEDIUM - 2-3 Tweets (50%)
# =====================
MEDIUM_TEMPLATES = [
    {
        "type": "medium",
        "topic": "Schema Basics",
        "tweets": [
            "📊 We analyzed 200 medical practices.\n\nThose with complete schema markup get 3.2x more AI citations.\n\nHere's the breakdown 👇",
            "✅ MedicalOrganization schema\n✅ Physician profiles\n✅ Procedure markup\n✅ FAQ schema\n\nAverage practice: 0/4 done.\n\nThat's your opportunity.",
            "Most don't know schema exists.\nThat's why they're invisible to ChatGPT & Perplexity.\n\n→ Reply 'SCHEMA' for a quick audit."
        ],
        "hashtags": "#MedicalSEO #GEO #Schema"
    },
    {
        "type": "medium",
        "topic": "Perplexity Opportunity",
        "tweets": [
            "🤯 Perplexity users convert 23% better than Google search users.\n\nWhy?\n• Direct answers = higher intent\n• Source citations build trust\n• Users ready to act",
            "Average consultation value:\nPerplexity: $14,800\nGoogle: $12,400\n\nYour patients are on AI.\nAre you showing up?",
            "→ Search your specialty on Perplexity\n→ See if YOUR practice gets cited\n\nNot visible? Reply 'HELP' 👇"
        ],
        "hashtags": "#Perplexity #GEO #Conversions"
    },
    {
        "type": "medium",
        "topic": "Mistakes Cost",
        "tweets": [
            "❌ 3 mistakes costing medical practices $200K+ / year:\n\n1. No MedicalOrganization schema\n2. Generic service descriptions\n3. Aggregated reviews only",
            "Fix these 3 things:\n• Get cited by AI\n• Appear in ChatGPT recommendations\n• Capture high-value patients\n\nIt's not complicated. It just works.",
            "→ Want a free gap analysis?\nReply 'AUDIT' + specialty + city\nI'll check your AI visibility 👇"
        ],
        "hashtags": "#SEOMistakes #MedicalMarketing #GEO"
    },
    {
        "type": "medium",
        "topic": "ROI Shift",
        "tweets": [
            "📈 The marketing ROI shift:\n\nTraditional SEO: 200% ROI\nGoogle Ads: 150% ROI\nGEO: 6,700% ROI\n\nSame budget. Different strategy.",
            "Why?\n• One-time implementation\n• Works across ALL AI platforms\n• Compound returns over time\n• No ongoing agency fees",
            "The practices diversifying to GEO are capturing market share.\n\nThose aren't are getting left behind.\n\n→ Reply 'ROI' for a custom calculation 👇"
        ],
        "hashtags": "#ROICalculator #GEO #Marketing"
    },
    {
        "type": "medium",
        "topic": "Content Authority",
        "tweets": [
            "AI doesn't just want keywords.\n\nIt wants expertise.\n\nWrite content that demonstrates:\n• First-hand experience\n• Specific outcomes\n• Actual results\n• Real patient stories",
            "Generic content gets ignored.\nAuthoritative content gets cited.\n\nThe difference:\n• 'We provide quality care' vs\n• '98% success rate over 500+ procedures'",
            "Start today:\nAdd specific metrics to every service page.\n\n→ Need ideas? Reply 'CONTENT' 👇"
        ],
        "hashtags": "#ContentMarketing #Authority #GEO"
    },
    {
        "type": "medium",
        "topic": "Entity Building",
        "tweets": [
            "Entities = how AI understands your practice.\n\nMore entity signals = more AI trust = more citations.\n\nBuild your entity:\n• Google Business Profile\n• Wikipedia page\n• Medical directories\n• News mentions",
            "Most practices have 1/4 done.\n\nThat's why AI can't recommend them with confidence.",
            "→ Check your entity presence:\nSearch your practice name on ChatGPT\n\nReply 'ENTITY' for a building plan 👇"
        ],
        "hashtags": "#EntitySEO #KnowledgeGraph #GEO"
    },
    {
        "type": "medium",
        "topic": "Review Optimization",
        "tweets": [
            "AI doesn't just check star ratings.\n\nIt reads individual reviews.\n\nWhat AI wants:\n• Detailed patient experiences\n• Specific procedure outcomes\n• Before/after (with consent)\n• Verified reviews",
            "Quantity means nothing.\nAuthenticity means everything.\n\nEncourage detailed reviews.\nTrain staff to ask.",
            "→ Want a review optimization plan?\nReply 'REVIEWS' 👇"
        ],
        "hashtags": "#Reviews #Reputation #MedicalSEO"
    },
    {
        "type": "medium",
        "topic": "Budget Diversification",
        "tweets": [
            "Your $15K/month SEO budget is now 47% less effective.\n\nWhy?\n47% of patients use AI search now.\n\nSEO doesn't cover that.",
            "Current allocation:\n• SEO: 70%\n• Ads: 20%\n• GEO: 0%\n\nTarget:\n• GEO: 45%\n• SEO: 40%\n• Ads: 15%",
            "Diversify. Don't double down on a shrinking channel.\n\n→ Reply 'PLAN' for a custom allocation strategy 👇"
        ],
        "hashtags": "#MarketingBudget #GEO #Diversification"
    },
]

# =====================
# LONG - 5-6 Tweets (20%)
# =====================
LONG_TEMPLATES = [
    {
        "type": "long",
        "topic": "Case Study Miami Dental",
        "tweets": [
            "💰 A Miami dental implant practice was spending $35K/month on ads.\n\nTheir AI visibility: 18/100 (critical).\n\n90 days later:\n\nHere's what happened 👇",
            "1/ The starting point:\n\n• Monthly ad spend: $35,000\n• Monthly leads: 89\n• Cost per lead: $393\n• AI visibility: 18/100\n\nThey were doing everything 'right.'\nSEO, PPC, social.\n\nBut AI? Invisible.",
            "2/ What we found:\n\n❌ No MedicalOrganization schema\n❌ Generic service pages\n❌ No entity presence\n❌ Reviews aggregated only\n\nThey were invisible to:\n• ChatGPT\n• Perplexity\n• Google's AI Overviews\n\n47% of their potential patients.",
            "3/ The implementation:\n\nMonth 1: Schema audit + fix, rewrite service pages\nMonth 2: Entity building, FAQ schema, AI blog\nMonth 3: Reviews, monitoring setup\n\nTotal: $50K one-time",
            "4/ The results:\n\n• AI visibility: 18 → 74/100\n• Monthly AI referrals: 0 → 89\n• Ad spend reduction: 47%\n• Cost per lead: $393 → $187\n\nAnnual savings: $165K+\n\nROI: 330% in year one.",
            "5/ The key insight:\n\nThey didn't need MORE ad spend.\n\nThey needed to show up where patients were LOOKING.\n\n47% of their market was using AI.\n\nThey were spending $35K on the other 53%.",
            "6/ Ready to see your potential?\n\nReply 'CASE' for:\n1. Full case study\n2. Your implementation timeline\n3. Cost breakdown\n\n👇 What's your specialty + monthly budget?",
        ],
        "hashtags": "#CaseStudy #DentalImplants #GEO #ROI"
    },
    {
        "type": "long",
        "topic": "5-Step GEO Framework",
        "tweets": [
            "📋 The 5-step GEO framework that recovered $2M+ for clients:\n\nA complete breakdown 👇",
            "1/ Step 1: Technical Schema\n\nFoundation.\n\nEssential:\n• MedicalOrganization\n• Physician\n• MedicalProcedure\n• FAQPage\n• Review schema\n\nNo schema = AI can't find you.",
            "2/ Step 2: Content Authority\n\nAI prefers expert content.\n\nWrite for AI readability:\n• Clear headings\n• Bullet points\n• Concise paragraphs\n• Citations\n• Updated dates\n\nDon't write for keywords. Write for answers.",
            "3/ Step 3: Entity Building\n\nEntities = real things AI understands.\n\nBuild your entity:\n• Wikipedia\n• Google Business\n• Directories\n• News mentions\n\nMore signals = more trust = more citations.",
            "4/ Step 4: Review Optimization\n\nAI reads individual reviews.\n\nWant:\n• Detailed experiences\n• Specific outcomes\n• Before/after\n• Verified reviews\n\nTrain staff to ask for detailed feedback.",
            "5/ Step 5: Continuous Monitoring\n\nGEO isn't 'set and forget.'\n\nTrack:\n• Citation frequency\n• Platform mentions\n• Competitor citations\n• Schema errors\n\nTools: Search Console, Bing Webmaster.",
            "6/ The results:\n\nClients implementing this:\n• 3.2x more AI citations\n• 47% less ad dependency\n• 89% more consultations\n• $2M+ revenue recovered\n\nThis isn't theory. It works.",
            "7/ Want help?\n\nReply 'FRAMEWORK' for:\n1. Implementation checklist\n2. Custom roadmap\n3. Call to discuss\n\n👇 What's your biggest GEO challenge?",
        ],
        "hashtags": "#GEOFramework #MedicalSEO #Implementation"
    },
    {
        "type": "long",
        "topic": "Google Algorithm Update",
        "tweets": [
            "🚨 Google just announced another algorithm update.\n\nMedical practices: This affects you directly.\n\nHere's what changed 👇",
            "1/ What's different:\n\n• AI Overviews: 84% of health queries (up from 67%)\n• 'Follow-up' queries prioritized\n• Local results in diverse formats\n• E-E-A-T signals weighted heavier\n\nIf you relied on traditional SEO, this hurts.",
            "2/ The impact:\n\n📉 Traditional SEO traffic: -23%\n📈 AI-cited practices: +156%\n📉 Non-optimized: Page 2 or worse\n\nThe gap is widening.\n\nEither you're in AI, or you're invisible.",
            "3/ What Google wants now:\n\nE-E-A-T:\n• Author bios with credentials\n• Publication history\n• Real patient outcomes\n• Updated content\n• First-hand experience",
            "4/ Quick wins:\n\n1️⃣ Update author bios\n2️⃣ Add publication links\n3️⃣ Refresh content (2024+ dates)\n4️⃣ Add outcome data\n5️⃣ Build internal links\n\nDo this before next wave.",
            "5/ But here's the thing:\n\nEven with perfect E-E-A-T, you're competing for 2-3 spots.\n\nThe practices winning provide unique value AI can't find elsewhere.",
            "6/ The opportunity:\n\nWhile others panic:\n• Publish proprietary data\n• Create original research\n• Build unique tools\n• Compile comprehensive guides\n\nContent AI can ONLY find on YOUR site.",
            "7/ Need help?\n\nReply 'UPDATE' for:\n1. This week's checklist\n2. Content ideas\n3. Monitoring setup\n\n👇 Biggest concern? Comment below.",
        ],
        "hashtags": "#GoogleUpdate #Algorithm #MedicalSEO #GEO"
    },
]

def generate_daily_content():
    """Generate content with mixed format"""
    
    # Determine format based on probability
    rand = random.random()
    if rand < 0.30:
        # 30% short
        template_pool = SHORT_TEMPLATES
        format_type = "short"
    elif rand < 0.80:
        # 50% medium
        template_pool = MEDIUM_TEMPLATES
        format_type = "medium"
    else:
        # 20% long
        template_pool = LONG_TEMPLATES
        format_type = "long"
    
    # Load used templates
    used_file = f"{DATA_DIR}/used_{format_type}.json"
    if os.path.exists(used_file):
        with open(used_file, 'r') as f:
            used = json.load(f)
    else:
        used = []
    
    # Get available
    available = [t for i, t in enumerate(template_pool) if i not in used]
    
    if not available:
        used = []
        available = template_pool
    
    # Select
    template = random.choice(available)
    template_idx = template_pool.index(template)
    used.append(template_idx)
    
    with open(used_file, 'w') as f:
        json.dump(used, f)
    
    # Generate content
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    if format_type == "short":
        tweets = [template["tweet"]]
    else:
        tweets = template["tweets"]
    
    full_text = ""
    for i, t in enumerate(tweets):
        full_text += f"[{i+1}/{len(tweets)}] {t}\n\n"
    full_text += f"\n{template.get('hashtags', '')}"
    
    content = {
        "id": f"content_{timestamp}",
        "generated_at": datetime.now().isoformat(),
        "format": format_type,
        "topic": template["topic"],
        "tweet_count": len(tweets),
        "tweets": tweets,
        "hashtags": template.get("hashtags", ""),
        "full_text": full_text
    }
    
    filename = f"{DATA_DIR}/{content['id']}.json"
    with open(filename, 'w') as f:
        json.dump(content, f, indent=2)
    
    return content

def main():
    print("🎯 StackMatrices X Content Generator - Mixed Format")
    print("=" * 60)
    print("Format distribution:")
    print("  30% Short (1 tweet)")
    print("  50% Medium (2-3 tweets)")
    print("  20% Long Thread (5-6 tweets)")
    print("=" * 60)
    
    content = generate_daily_content()
    
    print(f"\n✅ Generated: {content['id']}")
    print(f"Format: {content['format'].upper()}")
    print(f"Topic: {content['topic']}")
    print(f"Tweets: {content['tweet_count']}")
    
    print(f"\n{'='*60}")
    print(f"📝 TODAY'S CONTENT ({content['tweet_count']} tweets):")
    print("="*60)
    
    for i, tweet in enumerate(content['tweets'], 1):
        print(f"\n--- Tweet {i}/{content['tweet_count']} ---")
        print(tweet[:300] + "..." if len(tweet) > 300 else tweet)
    
    print(f"\n{'='*60}")
    print(f"Hashtags: {content['hashtags']}")
    print("="*60)
    
    print(f"\n💡 Posting Guide:")
    if content['format'] == 'short':
        print("→ Post as single tweet")
    elif content['format'] == 'medium':
        print("→ Post 2-3 tweets in sequence")
    else:
        print("→ Post as Twitter Thread (5-6 tweets)")
        print("→ Wait 1-2 min between each")
        print("→ Reply to first tweet to complete thread")
    
    print(f"\n📊 Content pools:")
    print(f"  Short: {len(SHORT_TEMPLATES)} | Medium: {len(MEDIUM_TEMPLATES)} | Long: {len(LONG_TEMPLATES)}")

if __name__ == "__main__":
    main()
