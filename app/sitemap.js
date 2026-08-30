// app/sitemap.js

import { cities } from "@/lib/data";

export default function sitemap() {
  const baseUrl = "https://worldlivingcost.com";
  const DATA_LAST_REFRESHED = new Date("2026-07-01");

  // Unique countries
  const countries = [
    ...new Map(
      cities.map((city) => [
        city.countrySlug,
        {
          slug: city.countrySlug,
          name: city.country,
        },
      ])
    ).values(),
  ];

  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: DATA_LAST_REFRESHED,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/rankings`,
      lastModified: DATA_LAST_REFRESHED,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: DATA_LAST_REFRESHED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cheapest-states-to-live-in-us`,
      lastModified: DATA_LAST_REFRESHED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
     {
      url: `${baseUrl}/best-affordable-cities-to-live-in-us`,
      lastModified: DATA_LAST_REFRESHED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
     {
      url: `${baseUrl}/cities-with-lowest-cost-of-living`,
      lastModified: DATA_LAST_REFRESHED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    
    {
      url: `${baseUrl}/country`,
      lastModified: DATA_LAST_REFRESHED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cost-of-living-calculator`,
      lastModified: DATA_LAST_REFRESHED,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: DATA_LAST_REFRESHED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/methodology`,
      lastModified: DATA_LAST_REFRESHED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: DATA_LAST_REFRESHED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: DATA_LAST_REFRESHED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: DATA_LAST_REFRESHED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: DATA_LAST_REFRESHED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // City pages
  const cityPages = cities.map((city) => ({
    url: `${baseUrl}/city/${city.slug}`,
    lastModified: city.updatedAt
      ? new Date(city.updatedAt)
      : DATA_LAST_REFRESHED,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Country pages
  const countryPages = countries.map((country) => ({
    url: `${baseUrl}/country/${country.slug}`,
    lastModified: DATA_LAST_REFRESHED,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // Top compare pages only (max 200)
  const comparePages = [];

  for (let i = 0; i < cities.length; i++) {
    for (let j = i + 1; j < cities.length; j++) {
      comparePages.push({
        url: `${baseUrl}/compare/${cities[i].slug}-vs-${cities[j].slug}`,
        lastModified: DATA_LAST_REFRESHED,
        changeFrequency: "monthly",
        priority: 0.85,
      });

      if (comparePages.length >= 200) break;
    }

    if (comparePages.length >= 200) break;
  }

  return [
    ...staticPages,
    ...cityPages,
    ...countryPages,
    ...comparePages,
  ];
}