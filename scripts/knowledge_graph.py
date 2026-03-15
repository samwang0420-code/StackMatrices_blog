#!/usr/bin/env python3
"""
Entity Knowledge Graph Generator for GEO
==========================================
Creates structured entity data for AI search optimization.
"""

import json
import os
from datetime import datetime
from pathlib import Path

# Entity Types
ENTITY_TYPES = {
    "MedicalPractice": "医疗诊所",
    "Physician": "医生",
    "Service": "服务",
    "Procedure": "手术/治疗",
    "Location": "位置",
    "Product": "产品",
    "Review": "评论",
    "Author": "作者"
}

# Medical Entity Definitions for California
MEDICAL_ENTITIES = {
    "practices": [
        {
            "id": "dr-smith-dental-fresno",
            "type": "MedicalPractice",
            "name": "Dr. Smith Dental",
            "description": "Premier dental practice in Fresno, CA specializing in cosmetic and restorative dentistry",
            "address": "Fresno, CA",
            "specialties": ["Cosmetic Dentistry", "Restorative Dentistry", "Dental Implants"],
            "services": ["Teeth Whitening", "Veneers", "Dental Crowns", "Root Canal"],
            "rating": 4.8,
            "reviewCount": 127
        },
        {
            "id": "beverly-hills-aesthetics",
            "type": "MedicalPractice",
            "name": "Beverly Hills Aesthetics",
            "description": "World-class medical spa and aesthetic clinic in Beverly Hills",
            "address": "Beverly Hills, CA",
            "specialties": ["Botox", "Dermal Fillers", "Laser Treatments", "CoolSculpting"],
            "services": ["Botox Injections", "Juvederm", "PRP Therapy", "Morpheus8"],
            "rating": 4.9,
            "reviewCount": 342
        },
        {
            "id": "la-emergency-plumbing",
            "type": "Service",
            "name": "LA Emergency Plumbing",
            "description": "24/7 emergency plumbing services throughout Los Angeles County",
            "address": "Los Angeles, CA",
            "specialties": ["Emergency Repipes", "Water Heater Installation", "Drain Cleaning"],
            "services": ["Emergency Pipe Repair", "Water Heater Service", "Sewer Line Repair"],
            "rating": 4.7,
            "reviewCount": 89
        }
    ],
    "procedures": [
        {
            "id": "botox-cosmetic",
            "type": "Procedure",
            "name": "Botox Cosmetic Treatment",
            "description": "FDA-approved injectable treatment for reducing fine lines and wrinkles",
            "avgCost": "$450-$600",
            "duration": "15-30 minutes",
            "recoveryTime": "24-48 hours",
            "relatedPractices": ["beverly-hills-aesthetics"],
            "keywords": ["botox", "wrinkle treatment", "anti-aging", "cosmetic injection"]
        },
        {
            "id": "dental-implant",
            "type": "Procedure",
            "name": "Dental Implant Surgery",
            "description": "Permanent tooth replacement solution using titanium implants",
            "avgCost": "$3000-$5000 per implant",
            "duration": "1-2 hours",
            "recoveryTime": "3-6 months",
            "relatedPractices": ["dr-smith-dental-fresno"],
            "keywords": ["dental implant", "tooth replacement", "implant dentistry"]
        },
        {
            "id": "coolscupltping",
            "type": "Procedure",
            "name": "CoolSculpting",
            "description": "Non-invasive fat reduction treatment using cryolipolysis",
            "avgCost": "$2000-$4000",
            "duration": "35-60 minutes per area",
            "recoveryTime": "None",
            "relatedPractices": ["beverly-hills-aesthetics"],
            "keywords": ["coolsculpting", "fat freezing", "non-surgical fat reduction"]
        }
    ],
    "locations": [
        {
            "id": "fresno-ca",
            "type": "Location",
            "name": "Fresno, California",
            "description": "Central Valley city with hard water issues affecting plumbing and dental health",
            "population": "1M+",
            "keywords": ["fresno", "central valley", "california"]
        },
        {
            "id": "beverly-hills-ca",
            "type": "Location",
            "name": "Beverly Hills, California",
            "description": "Luxury destination for aesthetic medicine and cosmetic procedures",
            "population": "34K",
            "keywords": ["beverly hills", "los angeles", "luxury", "aesthetic medicine"]
        },
        {
            "id": "los-angeles-ca",
            "type": "Location",
            "name": "Los Angeles, California",
            "description": "Major metropolitan area with diverse service needs",
            "population": "4M",
            "keywords": ["los angeles", "la", "california"]
        }
    ],
    "authors": [
        {
            "id": "stackmatrices-team",
            "type": "Author",
            "name": "StackMatrices Team",
            "description": "Expert writers specializing in local SEO and GEO optimization",
            "expertise": ["SEO", "GEO", "Content Marketing", "Local SEO"],
            "articles": 50
        }
    ]
}

def generate_knowledge_graph():
    """Generate complete knowledge graph JSON-LD"""
    
    # Build entity graph
    entities = []
    
    # Add practices
    for practice in MEDICAL_ENTITIES["practices"]:
        entity = {
            "@context": "https://schema.org",
            "@type": practice["type"],
            "name": practice["name"],
            "description": practice["description"],
            "address": {
                "@type": "PostalAddress",
                "addressLocality": practice["address"].split(",")[0].strip(),
                "addressRegion": "CA",
                "addressCountry": "US"
            }
        }
        
        if practice.get("rating"):
            entity["aggregateRating"] = {
                "@type": "AggregateRating",
                "ratingValue": practice["rating"],
                "reviewCount": practice["reviewCount"]
            }
        
        entities.append(entity)
    
    # Add procedures with Q&A
    for proc in MEDICAL_ENTITIES["procedures"]:
        entity = {
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": proc["name"],
            "description": proc["description"],
            "estimatedCost": {
                "@type": "MonetaryAmount",
                "currency": "USD",
                "value": proc.get("avgCost", "").replace("$", "").split("-")[0]
            },
            "howPerformed": proc.get("description", ""),
            "performTime": proc.get("duration", ""),
            "recoveryTime": proc.get("recoveryTime", "")
        }
        
        # Add FAQ schema for procedure
        faq_questions = [
            f"What is {proc['name']}?",
            f"How much does {proc['name']} cost?",
            f"What is the recovery time for {proc['name']}?"
        ]
        
        entity["faq"] = [
            {
                "question": q,
                "answer": proc["description"]
            }
            for q in faq_questions
        ]
        
        entities.append(entity)
    
    return {
        "@context": "https://schema.org",
        "@graph": entities
    }

def generate_entity_sitemap():
    """Generate entity sitemap for discovery"""
    
    urls = []
    
    # Add practice URLs
    for practice in MEDICAL_ENTITIES["practices"]:
        urls.append({
            "loc": f"https://stackmatrices.com/practice/{practice['id']}",
            "changefreq": "weekly",
            "priority": 0.9,
            "lastmod": datetime.now().isoformat()
        })
    
    # Add procedure URLs
    for proc in MEDICAL_ENTITIES["procedures"]:
        urls.append({
            "loc": f"https://stackmatrices.com/procedure/{proc['id']}",
            "changefreq": "monthly",
            "priority": 0.8,
            "lastmod": datetime.now().isoformat()
        })
    
    # Add location URLs
    for loc in MEDICAL_ENTITIES["locations"]:
        urls.append({
            "loc": f"https://stackmatrices.com/location/{loc['id']}",
            "changefreq": "monthly",
            "priority": 0.7,
            "lastmod": datetime.now().isoformat()
        })
    
    return urls

def main():
    """Main execution"""
    output_dir = Path("/root/.openclaw/workspace/blog/data")
    output_dir.mkdir(exist_ok=True)
    
    # Generate knowledge graph
    kg = generate_knowledge_graph()
    
    with open(output_dir / "knowledge-graph.json", "w") as f:
        json.dump(kg, f, indent=2)
    
    # Generate entity sitemap
    sitemap = generate_entity_sitemap()
    
    with open(output_dir / "entity-sitemap.json", "w") as f:
        json.dump(sitemap, f, indent=2)
    
    print(f"✅ Knowledge Graph: {len(kg['@graph'])} entities")
    print(f"✅ Entity Sitemap: {len(sitemap)} URLs")
    print(f"📁 Output: {output_dir}")

if __name__ == "__main__":
    main()
