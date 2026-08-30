import { Inter, Syne } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

import "./globals.css";
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

const SITE_URL = "https://worldlivingcost.com";
const SITE_NAME = "WorldLivingCost";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Cost of Living Calculator & City Comparison",
    template: "%s | WorldLivingCost",
  },

  description:
    "Compare cost of living, rent, groceries, transportation, salaries and everyday expenses across cities and countries worldwide.",

  applicationName: SITE_NAME,

  authors: [
    {
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],

  creator: SITE_NAME,
  publisher: SITE_NAME,

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,

    title: "Cost of Living Calculator & City Comparison",

    description:
      "Compare rent, groceries, transportation, salaries and living expenses across cities and countries worldwide.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WorldLivingCost cost of living calculator and city comparison",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Cost of Living Calculator & City Comparison",

    description:
      "Compare living expenses, rent, groceries, transportation and salaries across cities worldwide.",

    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,

  name: SITE_NAME,
  alternateName: "World Living Cost",

  url: SITE_URL,

  description:
    "Cost of living calculator and city comparison platform for comparing living expenses, rent, groceries, transportation and salaries worldwide.",

  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,

  name: SITE_NAME,
  url: SITE_URL,

  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.png`,
    width: 200,
    height: 60,
  },

  description:
    "WorldLivingCost provides cost of living data, city comparisons, rent prices, grocery costs, salary information and affordability rankings.",

  areaServed: "Worldwide",

  sameAs: [
    "https://twitter.com/worldlivingcost",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable}`}
    >
      <body
        className="bg-slate-50 text-slate-900 antialiased"
        suppressHydrationWarning
      >
        <Script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />

        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />

        <Navbar />

        <main>{children}</main>

        <Footer />

        <GoogleAnalytics gaId="G-0YQMKW3BN3" />

        <Analytics />
      </body>
    </html>
  );
}