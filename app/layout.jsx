import { Inter, Syne } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Script from "next/script";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://worldlivingcost.com"),
  title: {
   default: "Cost of Living Calculator & Comparison by City & Country | 10,000+ Cities",
    template: "%s | Worldlivingcost",
  },
  description:"Compare cost of living, rent prices, groceries, salaries, healthcare costs, and quality of life across 10,000+ cities and 195 countries. Free cost of living calculator and city comparison tool updated monthly.",
  keywords: [
    "cost of living",
    "cost of living comparison",
    "cost of living calculator",
    "cost of living by city",
    "cheapest countries to live",
    "cheapest cities to live",
    "average cost of living",
    "monthly living expenses",
    "living expenses calculator",
    "cost of living index",
    "rent prices by city",
    "grocery prices by country",
    "cheapest places to retire",
    "cost of living increase 2025",
    "best cities for expats",
    "salary cost of living comparison",
    
    "cost of living New York",
    "cost of living London",
    "cost of living Dubai",
    "cost of living Tokyo",
    "cost of living Canada",
    "cost of living Australia",
    "cheapest Asian countries to live",
    "cost of living Europe",
    "quality of life index",
    "purchasing power by city",
    "salary comparison by city",
  ],
  authors: [{ name: "Worldlivingcost", url: "https://worldlivingcost.com" }],
  creator: "Worldlivingcost",
  publisher: "Worldlivingcost",
  category: "Finance, Travel, Lifestyle",
  alternates: {
    canonical: "https://worldlivingcost.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://worldlivingcost.com",
    siteName: "Worldlivingcost",
      title: "Cost of Living Calculator & Comparison by City & Country | 10,000+ Cities",
    description:
      "Compare cost of living, rent, groceries, and salaries across 10,000+ cities worldwide. Real-time data trusted by 500K+ expats, remote workers, and travelers every month.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Worldlivingcost Global Cost of Living Index & City Comparisons",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Worldlivingcost",
    creator: "@Worldlivingcost",
    title: "Cost of Living Comparison 10,000+ Cities Worldwide",
    description:
      "Compare cost of living, rent, groceries, and salaries across 10,000+ cities worldwide. Real-time data for expats and remote workers.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
 
};

export default function RootLayout({ children }) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Worldlivingcost",
    url: "https://worldlivingcost.com",
    description:
      "Compare cost of living, rent, groceries, and salaries across 10,000+ cities and 195 countries worldwide.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://worldlivingcost.com/city/{search_term_string}"
      },
      "query-input": "required name=search_term_string",
    },
  };


const organizationJsonLd = {
  "@context":"https://schema.org",
  "@type":"Organization",
  "@id":"https://worldlivingcost.com/#organization",
  name: "Worldlivingcost",
  url: "https://worldlivingcost.com",
  logo: {
    "@type": "ImageObject",
    url: "https://worldlivingcost.com/logo.png",
    width: 200,
    height: 60,
  },
  keywords: [
  "cost of living",
  "cost of living calculator",
  "city comparison",
  "country comparison",
  "quality of life rankings",
  "rent prices",
  "salary comparison"
],
  slogan:
"Global Cost of Living Calculator and City Comparison Platform",
  description: "Worldlivingcost is a global cost of living database and city comparison platform providing rent prices, grocery costs, salary benchmarks, healthcare costs, purchasing power indexes, and quality of life rankings across 10,000+ cities and 195 countries.",
  foundingDate: "2021",
  areaServed: "Worldwide",
  knowsAbout: [
    "Cost of Living",
    "City Comparisons",
    "Expat Finance",
    "Remote Work",
    "Quality of Life Index",
  ],
  sameAs: [
    "https://twitter.com/worldlivingcost",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: "https://worldlivingcost.com/contact",
  },
};

  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="bg-slate-50 text-slate-900 antialiased " suppressHydrationWarning={true}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />

  <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0YQMKW3BN3"
          strategy="afterInteractive"
        />
<Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0YQMKW3BN3', {
              page_path: window.location.pathname,
              send_page_view: true,
              anonymize_ip: true,
            });
          `}
        </Script>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <GoogleAnalytics gaId="G-0YQMKW3BN3" />
           <Analytics />
      </body>
    </html>
  );
}