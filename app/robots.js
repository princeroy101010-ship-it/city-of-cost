export default function robots() {
  const baseUrl = "https://worldlivingcost.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",          // Agar koi backend api routes hain
          "/_next/",         // Next.js internal files ko block karne ke liye
          "/static/",        // Static assets agar directly crawl nahi karwane
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}