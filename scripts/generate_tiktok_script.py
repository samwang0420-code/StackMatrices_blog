#!/usr/bin/env python3
"""
StackMatrices TikTok Video Generator
Data visualization + Voiceover scripts for short-form videos
"""

import os
import json
from datetime import datetime

OUTPUT_DIR = "/root/.openclaw/workspace/blog/public/tiktok-assets"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# TikTok Video Scripts - 15-30 seconds, data-driven, marketing-focused
TIKTOK_TEMPLATES = [
    {
        "id": "geo_basics",
        "title": "什么是GEO",
        "duration": 25,
        "script": """
[HOOK - 3秒]
救命！Google根本不想让你知道这件事...

[DATA - 5秒]
84%的医疗搜索 现在都由AI直接回答
患者再也看不到你的网站了

[INSIGHT - 8秒]
传统SEO已死
现在赢的是GEO - 生成引擎优化
谁先做 谁就能抢走市场

[CTA - 5秒]
想知道你的诊所有没有戏？
评论区扣"诊断" 我来查
        """,
        "visual_notes": "大数据: 84% 用大号绿色字体\nAI搜索示意图\n对比: SEO vs GEO",
        "hashtags": "#GEO #医疗营销 #AI搜索 #seo优化",
        "caption": "救命！Google根本不想让你知道这件事...\n\n84%的医疗搜索现在都由AI直接回答，患者再也看不到你的网站了。\n\n传统SEO已死，现在赢的是GEO。\n\n想知道你的诊所有没有戏？评论区扣\"诊断\"\n\n#GEO #医疗营销 #AI搜索 #诊所 #营销"
    },
    {
        "id": "schema_32x",
        "title": "Schema优化的威力",
        "duration": 22,
        "script": """
[HOOK - 2秒]
就因为加了这个代码 诊所流量翻3倍

[DATA - 6秒]
有完整Schema标记的诊所
AI引用率高出3.2倍
3.2倍啊 朋友们

[DETAIL - 8秒]
什么Schema？
就是告诉AI你是谁 你做什么
MedicalOrganization
Physician
Procedure
FAQ

你没有？AI根本不知道你是谁

[CTA - 6秒]
想知道你缺什么Schema？
关注我 下期讲
评论区扣"1" 领检查清单
        """,
        "visual_notes": "代码界面截图\n3.2x 大数字动画\nSchema类型列表",
        "hashtags": "#Schema #医疗SEO #诊所流量",
        "caption": "就因为加了这个代码，诊所流量翻3倍...\n\n有完整Schema标记的诊所，AI引用率高出3.2倍。\n\n你没有Schema？AI根本不知道你是谁。\n\n#Schema #医疗SEO #诊所"
    },
    {
        "id": "mistakes_3",
        "title": "3个亏钱错误",
        "duration": 28,
        "script": """
[HOOK - 2秒]
我看了50家诊所 都犯了这3个错误

[ERROR 1 - 5秒]
错误一：没有机构Schema
网站说你是诊所
AI：你说是就是？

[ERROR 2 - 5秒]
错误二：服务描述太泛
"我们提供优质医疗服务"
AI：所以呢？

[ERROR 3 - 5秒]
错误三：只有汇总评价
4.8星 200条评价
AI：这谁写的？

[CTA - 7秒]
每一个错误 都让你亏10万+
想知道自己亏多少？
评论区扣"错误" 我帮你算
        """,
        "visual_notes": "三个错误图标\n金额亏损动画\n对比: 错误 vs 正确",
        "hashtags": "#诊所营销 #SEO错误 #亏钱",
        "caption": "我看了50家诊所，都犯了这3个错误...\n\n每一个错误都让你亏10万+\n\n想知道亏多少？评论区扣\"错误\"\n\n#诊所 #营销 #SEO"
    },
    {
        "id": "perplexity_23",
        "title": "Perplexity的崛起",
        "duration": 24,
        "script": """
[HOOK - 2秒]
这个AI工具 转化率比Google高23%

[DATA - 6秒]
Perplexity用户
平均咨询价值: $14,800
Google用户: $12,400

为什么？
AI直接推荐 信任度更高

[INSIGHT - 8秒]
10M+人在用Perplexity找医生
你在名单里吗？

不在的话
患者根本不知道你存在

[CTA - 6秒]
怎么上Perplexity？
下期讲 先关注
评论区扣"P" 我告诉你方法
        """,
        "visual_notes": "Perplexity界面\n数据对比图\n$14,800 vs $12,400",
        "hashtags": "#Perplexity #AI #医疗流量",
        "caption": "这个AI工具，转化率比Google高23%...\n\nPerplexity用户平均咨询价值$14,800，你在名单里吗？\n\n#Perplexity #AI #医疗"
    },
    {
        "id": "case_miami",
        "title": "Miami牙科案例",
        "duration": 30,
        "script": """
[HOOK - 2秒]
一家Miami牙科诊所
月广告费从$35K降到$18K

[PROBLEM - 5秒]
之前: 月费$35,000
AI可见度: 18/100 (危险)
每月0个AI转诊

[SOLUTION - 8秒]
做了3件事:
1. 补全Schema
2. 重写服务页
3. 建立Entity

[RESULT - 7秒]
90天后:
AI可见度: 18→74
AI转诊: 0→89/月
广告费: 降47%

[CTA - 6秒]
他们怎么做到的？
想听的评论区扣"案例"
我专门出一期讲
        """,
        "visual_notes": "Before/After对比\n金额变化动画\n时间线",
        "hashtags": "#案例 #牙科 #广告费",
        "caption": "一家Miami牙科诊所，月广告费从$35K降到$18K...\n\n90天AI可见度从18→74，转诊0→89/月。\n\n想学？评论区扣\"案例\"\n\n#牙科 #营销 #案例"
    },
    {
        "id": "roi_comparison",
        "title": "营销ROI对比",
        "duration": 25,
        "script": """
[HOOK - 2秒]
同样的预算 不同策略
ROI差33倍

[DATA - 8秒]
传统SEO: 200% ROI
Google Ads: 150% ROI
GEO: 6,700% ROI

GEO是什么？
生成引擎优化
AI搜索时代的SEO

[WHY - 7秒]
为什么差这么多？
1次优化 持续有效
不交月费
全平台覆盖

[CTA - 6秒]
你的预算花对了吗？
评论区扣"ROI"
我帮你算
        """,
        "visual_notes": "ROI柱状图对比\n6,700% 大字\n预算分配饼图",
        "hashtags": "#ROI #营销预算 #GEO",
        "caption": "同样的预算，ROI差33倍...\n\n传统SEO 200%，Google Ads 150%，GEO 6,700%。\n\n你的预算花对了吗？\n\n#ROI #营销 #GEO"
    },
    {
        "id": "ai_diversion",
        "title": "AI流量流失",
        "duration": 23,
        "script": """
[HOOK - 2秒]
你的患者正在被AI抢走

[FACT - 6秒]
47%的患者
现在用AI找医生
ChatGPT Perplexity Google SGE

他们不问Google了
直接问AI

[IMPACT - 7秒]
你不优化AI
= 47%的市场不要了

[CTA - 6秒]
被抢了多少？
评论区扣"城市+专科"
我帮你查
        """,
        "visual_notes": "47% 大字\nAI搜索界面\n流失示意图",
        "hashtags": "#AI流量 #患者 #流失",
        "caption": "你的患者正在被AI抢走...\n\n47%的患者现在用AI找医生，你不要这47%吗？\n\n#AI #患者 #医疗"
    },
    {
        "id": "framework_5",
        "title": "5步GEO框架",
        "duration": 28,
        "script": """
[HOOK - 2秒]
做好GEO 就这5步

[STEP 1 - 4秒]
第一步：技术Schema
MedicalOrganization
Physician Procedure

[STEP 2 - 4秒]
第二步：内容权威
AI能读懂的内容

[STEP 3 - 4秒]
第三步：Entity建立
百科 目录 新闻

[STEP 4 - 4秒]
第四步：评价优化
详细真实评价

[STEP 5 - 4秒]
第五步：持续监测
每月检查排名

[CTA - 4秒]
想要清单？
评论区扣"5步"
我发你
        """,
        "visual_notes": "5步流程图\n每个步骤图标\n清单样式",
        "hashtags": "#GEO框架 #SEO教程",
        "caption": "做好GEO就这5步...\n\nSchema → 内容 → Entity → 评价 → 监测\n\n想要清单？评论区扣\"5步\"\n\n#GEO #SEO #框架"
    },
]

def generate_tiktok_content(video_id=None):
    """Generate TikTok script and assets list"""
    
    import random
    
    # Select video
    if video_id:
        template = next((t for t in TIKTOK_TEMPLATES if t["id"] == video_id), None)
        if not template:
            print(f"❌ Video ID '{video_id}' not found")
            return None
    else:
        template = random.choice(TIKTOK_TEMPLATES)
    
    # Save script
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    content = {
        "id": f"tiktok_{template['id']}_{timestamp}",
        "generated_at": datetime.now().isoformat(),
        "template_id": template["id"],
        "title": template["title"],
        "duration": template["duration"],
        "script": template["script"].strip(),
        "visual_notes": template["visual_notes"],
        "hashtags": template["hashtags"],
        "caption": template["caption"]
    }
    
    filename = f"{OUTPUT_DIR}/{content['id']}.json"
    with open(filename, 'w') as f:
        json.dump(content, f, indent=2, ensure_ascii=False)
    
    return content, template

def main():
    import sys
    
    print("🎬 StackMatrices TikTok Video Generator")
    print("=" * 60)
    
    video_id = sys.argv[1] if len(sys.argv) > 1 else None
    
    result = generate_tiktok_content(video_id)
    
    if not result:
        print("\nAvailable video IDs:")
        for t in TIKTOK_TEMPLATES:
            print(f"  - {t['id']}: {t['title']} ({t['duration']}s)")
        return
    
    content, template = result
    
    print(f"\n✅ Generated: {content['id']}")
    print(f"📹 Title: {content['title']}")
    print(f"⏱️ Duration: {content['duration']} seconds")
    
    print(f"\n{'='*60}")
    print("📝 SCRIPT (Read this for voiceover):")
    print("="*60)
    print(content['script'])
    
    print(f"\n{'='*60}")
    print("🖼️ VISUAL NOTES:")
    print("="*60)
    print(content['visual_notes'])
    
    print(f"\n{'='*60}")
    print("📱 CAPTION (Copy for TikTok):")
    print("="*60)
    print(content['caption'])
    
    print(f"\n{'='*60}")
    print("🏷️ HASHTAGS:")
    print("="*60)
    print(content['hashtags'])
    
    print(f"\n💡 Next steps:")
    print("1. Read script, record voiceover (Microsoft TTS)")
    print("2. Generate visuals: python3 scripts/generate_tiktok_visuals.py")
    print("3. Combine in CapCut/Canva")
    print("4. Upload to TikTok")

if __name__ == "__main__":
    main()
