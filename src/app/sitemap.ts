import type { MetadataRoute } from 'next';
import { blogPosts, siteConfig } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/about',
    '/features',
    '/pricing',
    '/roadmap',
    '/docs',
    '/developers',
    '/blog',
    '/contact',
    '/privacy',
    '/terms',
    '/app',
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...blogRoutes];
}
