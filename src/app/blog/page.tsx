import { getBlogPosts } from '@/lib/blog-data';
import BlogContent from './BlogClient';

export default function BlogPage() {
  const posts = getBlogPosts();
  return <BlogContent posts={posts} />;
}
