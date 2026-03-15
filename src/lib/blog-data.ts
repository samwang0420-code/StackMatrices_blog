import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  image: string;
  tags: string[];
}

// Fallback images
const IMAGES = [
  'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/8435692/pexels-photo-8435692.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3845806/pexels-photo-3845806.jpeg?auto=compress&cs=tinysrgb&w=800',
];

export function getBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];
  const blogDir = path.join(process.cwd(), 'content/blog');
  
  if (!fs.existsSync(blogDir)) {
    return getFallbackPosts();
  }
  
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    try {
      const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
      const { data, content: markdownContent } = matter(content);
      
      // Get title from frontmatter or first heading
      let title = data.title || '';
      if (!title) {
        const headingMatch = markdownContent.match(/^#\s+(.+)$/m);
        title = headingMatch ? headingMatch[1] : file.replace('.md', '');
      }
      
      // Get excerpt from description or first paragraph
      let excerpt = data.description || '';
      if (!excerpt) {
        const paragraphs = markdownContent.split(/\n\n+/);
        const textParagraph = paragraphs.find(p => p.trim() && !p.startsWith('#'));
        if (textParagraph) {
          excerpt = textParagraph.replace(/^#+\s*/gm, '').substring(0, 150) + '...';
        }
      }
      
      // Parse date
      let date = data.date || '';
      if (date) {
        try {
          const d = new Date(date);
          date = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        } catch {
          date = '';
        }
      }
      
      // Get category from first tag
      const category = (data.tags && data.tags[0]) || 'SEO Strategy';
      const tags = data.tags || [];
      
      const slug = file.replace('.md', '');
      const image = IMAGES[i % IMAGES.length];
      
      posts.push({
        id: slug,
        title,
        excerpt,
        category,
        author: data.author || 'StackMatrices Team',
        date: date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        readTime: `${Math.floor(Math.random() * 10) + 3} min read`,
        featured: i === 0,
        image,
        tags
      });
    } catch (e) {
      console.error('Error reading blog file:', file, e);
    }
  }
  
  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Update featured status after sort
  if (posts.length > 0) {
    posts[0].featured = true;
  }
  
  return posts.length > 0 ? posts : getFallbackPosts();
}

function getFallbackPosts(): BlogPost[] {
  return [
    {
      id: "google-ai-overviews-2026",
      title: "How to Optimize for Google AI Overviews in 2026",
      excerpt: "The rules have changed. We analyzed 247 AI Overview citations and found 3 factors that determine 78% of what gets cited.",
      category: "SEO Strategy",
      author: "StackMatrices Intelligence",
      date: "March 9, 2026",
      readTime: "7 min read",
      featured: true,
      image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["SEO", "AI"]
    },
    {
      id: "entity-seo-medical-practices",
      title: "Entity SEO for Medical Practices: The Foundation Nobody Talks About",
      excerpt: "Everyone talks entities. Here's why entity optimization is the difference between invisible and obvious.",
      category: "Technical Implementation",
      author: "StackMatrices Intelligence",
      date: "March 8, 2026",
      readTime: "14 min read",
      featured: false,
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["SEO", "Entity"]
    },
    {
      id: "ai-evaluates-medical-content",
      title: "How AI Actually Evaluates Medical Content: What No One Tells You",
      excerpt: "Most practices optimize for dead search engines. Here's how AI really evaluates medical content.",
      category: "AI Search Trends",
      author: "StackMatrices Intelligence",
      date: "March 8, 2026",
      readTime: "12 min read",
      featured: false,
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["AI", "Content"]
    },
  ];
}

export default function getBlogData() {
  return getBlogPosts();
}
