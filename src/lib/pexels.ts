// Pexels API client for blog cover images
const PEXELS_API_KEY = "VWw1NAzilQOJN7m36QOmOG80XcN1b621l3bnL0e4HhS4R6hWUdIf2CNj";

const KEYWORDS = [
  "Artificial Intelligence abstract",
  "Neural network",
  "Digital connectivity",
  "Cybersecurity background",
  "Information flow",
  "Data visualization dark",
  "Macro technology",
  "Blue laser",
  "Fiber optics dark",
];

export async function getPexelsImage(keyword?: string, index: number = 0): Promise<string> {
  const searchKeyword = keyword || KEYWORDS[index % KEYWORDS.length];
  
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchKeyword)}&per_page=10&orientation=landscape`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );
    
    if (!response.ok) {
      console.error("Pexels API error:", response.status);
      return getFallbackImage(index);
    }
    
    const data = await response.json();
    
    if (data.photos && data.photos.length > 0) {
      // Use index to get different images for different posts
      const photoIndex = index % data.photos.length;
      return data.photos[photoIndex].src.large2x || data.photos[photoIndex].src.large;
    }
    
    return getFallbackImage(index);
  } catch (error) {
    console.error("Error fetching Pexels image:", error);
    return getFallbackImage(index);
  }
}

// Fallback images from Unsplash (also free)
function getFallbackImage(index: number): string {
  const fallbackImages = [
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=630&fit=crop",
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=630&fit=crop",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=630&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=630&fit=crop",
    "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=1200&h=630&fit=crop",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=630&fit=crop",
  ];
  
  return fallbackImages[index % fallbackImages.length];
}

// Pre-defined image URLs for each blog post to ensure consistency
export const BLOG_IMAGES: Record<string, string> = {
    "schema-markup-guide": "https://images.pexels.com/photos/8435692/pexels-photo-8435692.jpeg?auto=compress&cs=tinysrgb&w=800",
  "predictions-2026": "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
  "ai-optimized-content": "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
  "seo-geo-trends-2025": "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "entity-seo-medical-practices": "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
  "google-ai-mode-12-percent": "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
  "ai-evaluates-medical-content": "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
  "ai-eating-seo-budget": "https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "hidden-cost-calculator": "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "chatgpt-vs-perplexity": "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "geo-checklist": "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "6-month-playbook": "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "quality-guidelines": "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
  "ai-evaluates-medical-content": "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
  "case-study-beverly-hills": "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
};

export function getBlogImage(postId: string): string {
  return BLOG_IMAGES[postId] || getFallbackImage(0);
}
