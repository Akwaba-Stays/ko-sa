import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { rooms, experiences } from '@/lib/content/home';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    '/',
    '/rooms',
    '/experiences',
    '/virtual-tour',
    '/dining',
    '/wellness',
    '/about',
    '/gallery',
    '/blog',
    '/contact',
    '/book',
  ];

  const dynamicPaths = [
    ...rooms.map((r) => `/rooms/${r.slug}`),
    ...experiences.map((e) => `/experiences/${e.slug}`),
    '/blog/things-to-do-in-elmina',
    '/blog/ghana-beach-holiday-guide',
    '/blog/rituals-of-the-shore',
  ];

  return [...staticPaths, ...dynamicPaths].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/book') ? 0.9 : 0.7,
  }));
}
