import { MetadataRoute } from "next";

const siteUrl = "https://vibengoding.id";

const courseSlugs = [
  "vibe-coding-101",
  "ai-powered-frontend",
  "full-stack-vibes",
  "prompt-engineering-pro",
  "ship-it-deploy-guide",
  "cursor-copilot-mastery",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/courses`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/belajar-vibe-coding`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // Course pages
  const coursePages: MetadataRoute.Sitemap = courseSlugs.map((slug) => ({
    url: `${siteUrl}/courses/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...coursePages];
}
