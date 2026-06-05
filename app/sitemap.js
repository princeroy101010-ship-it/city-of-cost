// app/sitemap.js

import { cities } from "@/lib/data";

export default function sitemap() {
  const baseUrl = "https://worldlivingcost.com/";

  // ─── Static pages ──────────────────────────────────────────────────────────
  // lastModified = real date the page content was last meaningfully changed.
  // DO NOT use new Date() — Google loses trust in your sitemap if all dates
  // are identical or change on every build with no real content change.
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date("2025-06-01"),
      priority: 1.0,
      changeFrequency: "daily",
    },
    {
      url: `${baseUrl}/rankings`,
      lastModified: new Date("2025-06-01"),
      priority: 0.9,
      changeFrequency: "daily",
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date("2025-06-01"),
      priority: 0.9,
      changeFrequency: "weekly",
    },
    {
      url: `${baseUrl}/countries`,
      lastModified: new Date("2025-06-01"),
      priority: 0.8,
      changeFrequency: "weekly",
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date("2025-06-01"),
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date("2025-05-01"),
      priority: 0.6,
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/methodology`,
      lastModified: new Date("2025-05-01"),
      priority: 0.6,
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2025-04-01"),
      priority: 0.5,
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/privacy-policy`,
      // No lastModified — better to omit than lie. Google prefers this.
      priority: 0.3,
      changeFrequency: "yearly",
    },
    {
      url: `${baseUrl}/terms-of-service`,
      // No lastModified — omitted intentionally per Google's own guidance.
      priority: 0.3,
      changeFrequency: "yearly",
    },
  ];

  // ─── Dynamic city pages ────────────────────────────────────────────────────
  // If your city data has a real updatedAt/lastModified field, use that.
  // Otherwise use a fixed date representing when city data was last refreshed.
  // Never use new Date() here — it changes every build = Google ignores it.
  const DATA_LAST_REFRESHED = new Date("2025-06-01"); // update this monthly

  const cityPages = cities.map((city) => ({
    url: `${baseUrl}/city/${city.slug}`,
    lastModified: city.updatedAt
      ? new Date(city.updatedAt)   // use real date if your data has it
      : DATA_LAST_REFRESHED,       // fallback: one shared accurate date
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  return [...staticPages, ...cityPages];
}