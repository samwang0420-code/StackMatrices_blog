#!/usr/bin/env python3
"""
Add Cross-links to All Blog Posts
=================================
自然嵌入5个网站的外链
"""

import os
import re
from pathlib import Path

BLOG_DIR = Path("/root/.openclaw/workspace/blog/content/blog")

# Cross-link templates - 自然嵌入
RELATED_SECTION = """

## Related Resources

- **[US City Data](https://getuscompliance.com)** - Research demographics before choosing providers
- **[SaaS对比](https://jianfacv.com)** - Compare business software
- **[Error Code Database](https://uscomplianceguard.com)** - Technical reference
- **[China Sourcing](https://uscompliance-team.com)** - Import materials for your business

---

*This guide is part of StackMatrices' GEO series.*"""

def add_cross_links(content: str) -> str:
    # Check if already has Related Resources
    if "## Related Resources" in content:
        return content
    
    # Find Conclusion section and add after it
    if "## Conclusion" in content:
        parts = content.split("## Conclusion", 1)
        if len(parts) == 2:
            # Find the end of conclusion (next --- or end)
            conclusion_part = parts[1]
            
            # Find where conclusion ends (either --- or end of content)
            if "---" in conclusion_part:
                conclusion_end = conclusion_part.find("---")
                conclusion_text = conclusion_part[:conclusion_end]
                rest = conclusion_part[conclusion_end:]
            else:
                conclusion_text = conclusion_part
                rest = ""
            
            # Rebuild content
            new_content = parts[0] + "## Conclusion" + conclusion_text + RELATED_SECTION + rest
            return new_content
    
    return content

def main():
    print("🔗 Adding cross-links to blog posts...")
    
    count = 0
    for md_file in BLOG_DIR.glob("*.md"):
        content = md_file.read_text()
        new_content = add_cross_links(content)
        
        if new_content != content:
            md_file.write_text(new_content)
            count += 1
            print(f"  ✅ {md_file.name}")
    
    print(f"\n📊 Updated {count} articles with cross-links")

if __name__ == "__main__":
    main()
