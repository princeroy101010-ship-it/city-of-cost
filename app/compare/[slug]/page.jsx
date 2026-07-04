// app/compare/[slug]/page.jsx  ← SERVER COMPONENT (no "use client")

import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import CompareClient from "../data";
import { cities, getCityBySlug } from "../../../lib/data";

// ---------- helpers ----------

function splitSlug(slug) {
  if (!slug || !slug.includes("-vs-")) return null;
  const [rawA, rawB] = slug.split("-vs-");
  if (!rawA || !rawB) return null;
  return { rawA, rawB };
}

function resolveSlug(slug) {
  const parts = splitSlug(slug);
  if (!parts) return null;

  const { rawA, rawB } = parts;
  const cityA = getCityBySlug(rawA);
  const cityB = getCityBySlug(rawB);

  if (!cityA || !cityB) return null;

  return { cityA, cityB, rawA, rawB };
}

// Issue #7 fix — related comparisons generated from the current cities,
// not a static hardcoded list. Picks other real cities to pair with cityA.
function getRelatedComparisons(cityA, cityB, limit = 6) {
  const excludeSlugs = new Set([cityA.slug, cityB.slug]);
  const candidates = cities.filter((c) => !excludeSlugs.has(c.slug));

  // Prefer same-country or geographically "similar" cities if that data exists,
  // otherwise just take the next N cities as a reasonable fallback.
  const related = candidates.slice(0, limit).map((c) => ({
    slug: `${cityA.slug}-vs-${c.slug}`,
    label: `${cityA.name} vs ${c.name}`,
  }));

  return related;
}

const popularPairs = [
  "new-york-vs-london",
  "dubai-vs-singapore",
  "tokyo-vs-berlin",
  "sydney-vs-melbourne",
  "toronto-vs-vancouver",
  "bangkok-vs-kuala-lumpur",
  "paris-vs-madrid",
  "amsterdam-vs-berlin",
  "chicago-vs-los-angeles",
];

export async function generateStaticParams() {
  return popularPairs.map((slug) => ({ slug }));
}

// ---------- metadata ----------

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const resolved = resolveSlug(slug);

  if (!resolved) {
    return { title: "Cost of Living Comparison | Worldlivingcost" };
  }

  const { cityA, cityB } = resolved;
  const pairTitle = `${cityA.name} vs ${cityB.name}`;

  return {
    title: `${cityA.name} vs ${cityB.name} Cost of Living, Rent & Salaries`,
    description: `Compare ${cityA.name} vs ${cityB.name} cost of living, rent, salaries, groceries, transport and purchasing power side by side.`,
    alternates: {
      canonical: `https://worldlivingcost.com/compare/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      url: `https://worldlivingcost.com/compare/${slug}`,
      title: `${pairTitle} Cost of Living Comparison`,
      description: `Compare rent, groceries, transport, salaries & quality of life between ${cityA.name} and ${cityB.name}.`,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `Worldlivingcost — ${pairTitle} cost of living comparison`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pairTitle} Cost of Living Comparison`,
      description: `Side-by-side cost of living: rent, groceries, transport, salaries & quality of life — ${cityA.name} vs ${cityB.name}.`,
      images: ["/og-image.png"],
    },
  };
}

// ---------- page ----------

export default async function ComparePage({ params }) {
  const { slug } = await params;
  const resolved = resolveSlug(slug);

  if (!resolved) {
    notFound();
  }

  const { cityA, cityB, rawA, rawB } = resolved;
  const pairTitle = `${cityA.name} vs ${cityB.name}`;
  const canonicalUrl = `https://worldlivingcost.com/compare/${slug}`;

  const cheaperCity =
    cityA.avgMonthlyCost < cityB.avgMonthlyCost
      ? cityA
      : cityB.avgMonthlyCost < cityA.avgMonthlyCost
      ? cityB
      : null;

  const otherPairs = popularPairs.filter((p) => p !== slug).slice(0, 9);
  const relatedPairs = getRelatedComparisons(cityA, cityB, 6);

  // ---------- JSON-LD ----------

  const comparePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${pairTitle} Cost of Living Comparison`,
    description: `Free side-by-side cost of living comparison between ${cityA.name} and ${cityB.name}.`,
    url: canonicalUrl,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://worldlivingcost.com" },
        { "@type": "ListItem", position: 2, name: "Compare Cities", item: "https://worldlivingcost.com/compare" },
        { "@type": "ListItem", position: 3, name: pairTitle, item: canonicalUrl },
      ],
    },
    mainEntity: {
      "@type": "SoftwareApplication",
      name: `${pairTitle} Cost of Living Comparison Tool`,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      description: `Compare cost of living between ${cityA.name} and ${cityB.name}.`,
      url: canonicalUrl,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Side-by-side city cost comparison",
        "Rent and housing cost comparison",
        "Grocery and food price comparison",
        "Transportation cost comparison",
        "Salary and purchasing power comparison",
        "Quality of life index comparison",
        "Safety index comparison",
        "Healthcare cost comparison",
      ],
    },
  };

  const compareSoftwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${pairTitle} Cost of Living Comparison Calculator`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description: `Free tool to compare cost of living between ${cityA.name} and ${cityB.name}, covering rent, groceries, transportation, salaries, healthcare and quality of life.`,
    url: canonicalUrl,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  // Issue #5 fix — Dataset schema removed entirely

  const compareFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How do I compare the cost of living between ${cityA.name} and ${cityB.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Use Worldlivingcost's free comparison tool to see an instant side-by-side breakdown of rent, groceries, transportation, salaries, quality of life, safety, and healthcare costs between ${cityA.name} and ${cityB.name}.`,
        },
      },
      {
        "@type": "Question",
        name: `Which city is cheaper to live in: ${cityA.name} or ${cityB.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Costs vary by category. Use our comparison tool above to see the exact current cost breakdown across rent, groceries, transport, and more between ${cityA.name} and ${cityB.name}.`,
        },
      },
      {
        "@type": "Question",
        name: "What is included in the cost of living comparison?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our comparison covers 50+ data points including restaurants, groceries, transportation, utilities, rent, salaries, quality of life, safety, healthcare, and purchasing power.",
        },
      },
      {
        "@type": "Question",
        name: `Can I use this for remote work or relocation planning to ${cityB.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. Compare ${cityA.name} and ${cityB.name} by salary-adjusted cost of living, purchasing power, and quality of life to see where your money goes furthest.`,
        },
      },
    ],
  };

  const compareItemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Popular Cost of Living Comparisons",
    itemListElement: otherPairs.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.replace(/-vs-/, " vs ").replace(/-/g, " "),
      url: `https://worldlivingcost.com/compare/${p}`,
    })),
  };

  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(comparePageJsonLd) }} />
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(compareSoftwareAppJsonLd) }} />
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(compareFaqJsonLd) }} />
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(compareItemListJsonLd) }} />

      <div className="max-w-6xl mx-auto px-4 pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center text-sm text-slate-500">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li className="mx-2">/</li>
            <li>
              <Link href="/compare" className="hover:text-blue-600 transition-colors">
                Compare Cities
              </Link>
            </li>
            <li className="mx-2">/</li>
            <li className="text-slate-900 font-medium">{pairTitle}</li>
          </ol>
        </nav>
      </div>

      {/* Issue #1 fix — real server-rendered H1 */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          {cityA.name} vs {cityB.name} Cost of Living Comparison
        </h1>

        {/* Issue #4 fix — AI-answer summary block directly below H1 */}
        <p className="text-slate-600 leading-7 mt-3 max-w-3xl">
          Comparing {cityA.name} and {cityB.name} shows that{" "}
          {cheaperCity ? cheaperCity.name : "both cities"} offers{" "}
          {cheaperCity ? "the lower" : "a similar"} overall cost of living based on rent,
          groceries, transportation and utility expenses. The average monthly cost is $
          {cityA.avgMonthlyCost.toLocaleString()} in {cityA.name} versus $
          {cityB.avgMonthlyCost.toLocaleString()} in {cityB.name}.
        </p>

        {/* Issue #6 fix — server-rendered comparison table above the fold */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-4 py-3 font-semibold text-slate-500 uppercase tracking-wide text-xs">
                  Metric
                </th>
                <th className="text-right px-4 py-3 font-semibold text-blue-600 uppercase tracking-wide text-xs">
                  {cityA.name}
                </th>
                <th className="text-right px-4 py-3 font-semibold text-slate-500 uppercase tracking-wide text-xs">
                  {cityB.name}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-4 py-3 text-slate-700">Avg. Monthly Cost of Living</td>
                <td className="px-4 py-3 text-right font-semibold text-slate-900">
                  ${cityA.avgMonthlyCost.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-slate-900">
                  ${cityB.avgMonthlyCost.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700">Quality of Life</td>
                <td className="px-4 py-3 text-right text-slate-900">{cityA.qualityOfLife}/100</td>
                <td className="px-4 py-3 text-right text-slate-900">{cityB.qualityOfLife}/100</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700">Purchasing Power</td>
                <td className="px-4 py-3 text-right text-slate-900">{cityA.purchasingPower}/100</td>
                <td className="px-4 py-3 text-right text-slate-900">{cityB.purchasingPower}/100</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700">Safety</td>
                <td className="px-4 py-3 text-right text-slate-900">{cityA.safety}/100</td>
                <td className="px-4 py-3 text-right text-slate-900">{cityB.safety}/100</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700">Healthcare</td>
                <td className="px-4 py-3 text-right text-slate-900">{cityA.healthcare}/100</td>
                <td className="px-4 py-3 text-right text-slate-900">{cityB.healthcare}/100</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700">Climate</td>
                <td className="px-4 py-3 text-right text-slate-900">{cityA.climate}/100</td>
                <td className="px-4 py-3 text-right text-slate-900">{cityB.climate}/100</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700">Traffic &amp; Commute</td>
                <td className="px-4 py-3 text-right text-slate-900">{cityA.trafficCommute}/100</td>
                <td className="px-4 py-3 text-right text-slate-900">{cityB.trafficCommute}/100</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-display text-2xl font-bold text-slate-900 mt-10">
          Live Cost of Living Comparison: {cityA.name} vs {cityB.name}
        </h2>
      </div>

      <Suspense fallback={<div className="p-10 text-center text-slate-400">Loading...</div>}>
        <CompareClient city1={rawA} city2={rawB} />
      </Suspense>

      <section className="compare-answer max-w-6xl mx-auto px-4 py-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {pairTitle} Cost of Living Comparison
          </h2>

          <div className="space-y-5 text-slate-600 leading-8">
            <p>
              Worldlivingcost helps you compare the cost of living between {cityA.name} and {cityB.name} using
              real-world data covering rent, housing, groceries, transportation, healthcare, utilities, average
              salaries, purchasing power and quality of life. Whether you are relocating, studying abroad, retiring
              overseas, working remotely or planning an international move, our free calculator makes it easy to
              evaluate monthly expenses in {cityA.name} versus {cityB.name}.
            </p>
            <p>
              The average monthly cost of living in {cityA.name} is ${cityA.avgMonthlyCost.toLocaleString()},
              compared with ${cityB.avgMonthlyCost.toLocaleString()} in {cityB.name}.{" "}
              {cheaperCity
                ? `Overall, ${cheaperCity.name} is more affordable based on housing, transportation, groceries and utility costs.`
                : `Overall, both cities have a similar cost of living once housing, transportation, groceries and utility costs are factored in.`}
            </p>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 pt-8 pb-2">About {cityA.name}</h3>
          <p className="text-slate-600 leading-8">
            {cityA.name}, {cityA.country}, is one of the cities most frequently compared on Worldlivingcost. It
            scores {cityA.qualityOfLife} out of 100 on our quality of life index, {cityA.safety} out of 100 for
            safety, and {cityA.healthcare} out of 100 for healthcare access and affordability. With an average
            monthly cost of living of ${cityA.avgMonthlyCost.toLocaleString()}, {cityA.name} attracts residents,
            expats and remote workers who value what the city offers in exchange for its overall cost profile.
            Climate scores {cityA.climate} out of 100 and traffic and commute conditions score {cityA.trafficCommute}{" "}
            out of 100, both of which are worth weighing alongside pure cost when deciding whether {cityA.name} is
            the right fit for your lifestyle.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 pt-6 pb-2">About {cityB.name}</h3>
          <p className="text-slate-600 leading-8">
            {cityB.name}, {cityB.country}, offers a different cost and lifestyle profile. It scores{" "}
            {cityB.qualityOfLife} out of 100 on quality of life, {cityB.safety} out of 100 for safety, and{" "}
            {cityB.healthcare} out of 100 for healthcare. The average monthly cost of living in {cityB.name} is $
            {cityB.avgMonthlyCost.toLocaleString()}, and its climate score of {cityB.climate} out of 100 and traffic
            and commute score of {cityB.trafficCommute} out of 100 round out the picture for anyone weighing{" "}
            {cityB.name} against {cityA.name} for relocation, remote work, or long-term living.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 pt-6 pb-2">
            Rent Comparison: {cityA.name} vs {cityB.name}
          </h3>
          <p className="text-slate-600 leading-8">
            Housing is typically the largest monthly expense for anyone living in {cityA.name} or {cityB.name}, and
            rent prices can vary significantly between the two, even for similar apartment sizes and locations. Use
            the housing tab in the comparison tool above to see exact rent figures for one-bedroom and
            three-bedroom apartments, both in the city center and in outside-city-center neighborhoods, along with
            price-per-square-meter figures for anyone considering buying property in either city. Rent differences
            are often the single biggest factor in determining whether {cityA.name} or {cityB.name} works better
            for your budget.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 pt-6 pb-2">
            Salary Comparison: {cityA.name} vs {cityB.name}
          </h3>
          <p className="text-slate-600 leading-8">
            Average salaries in {cityA.name} and {cityB.name} need to be read alongside local cost of living, not in
            isolation. A higher average salary in one city can be offset by higher rent, transportation and grocery
            costs, while a lower salary in the other city may still leave more disposable income once those
            expenses are accounted for. The salaries tab above shows average and median monthly salaries after tax,
            so you can judge purchasing power rather than just comparing raw numbers between {cityA.name} and{" "}
            {cityB.name}.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 pt-6 pb-2">
            Groceries Comparison: {cityA.name} vs {cityB.name}
          </h3>
          <p className="text-slate-600 leading-8">
            Everyday grocery costs — milk, bread, eggs, rice, produce and meat — add up over a month, and prices for
            these staples can differ substantially between {cityA.name} and {cityB.name}. The markets tab in the
            comparison above breaks down item-by-item pricing, so you can estimate a realistic monthly grocery
            budget for either city rather than relying on a single overall cost index. This is particularly useful
            for anyone planning to cook at home regularly instead of eating out.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 pt-6 pb-2">Transportation Costs</h3>
          <p className="text-slate-600 leading-8">
            Getting around {cityA.name} versus {cityB.name} can look very different depending on public transit
            infrastructure, taxi and rideshare pricing, and whether owning a car is practical or necessary. The
            transport tab compares monthly public transit passes, average taxi fares, and fuel prices, giving you a
            clearer sense of your realistic monthly commuting budget in either city. In cities with strong public
            transit networks, residents often skip car ownership entirely, which can meaningfully lower the overall
            cost of living.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 pt-6 pb-2">Quality of Life Comparison</h3>
          <p className="text-slate-600 leading-8">
            Cost is only one part of the decision between {cityA.name} and {cityB.name}. Quality of life, safety,
            healthcare access, climate, and traffic and commute conditions all shape what daily life actually feels
            like in each city. {cityA.name} scores {cityA.qualityOfLife} out of 100 on quality of life compared with{" "}
            {cityB.name}'s {cityB.qualityOfLife} out of 100, and the score comparison section above breaks down
            safety, healthcare, climate and commute indices side by side, so you can weigh livability alongside raw
            cost.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 pt-6 pb-2">
            Which City Is Better for Expats: {cityA.name} or {cityB.name}?
          </h3>
          <p className="text-slate-600 leading-8">
            There's no single right answer to whether {cityA.name} or {cityB.name} is better for expats — it depends
            on your budget, career, and lifestyle priorities. If affordability is your top priority,{" "}
            {cheaperCity ? cheaperCity.name : "either city"} currently has the lower average monthly cost of living
            between the two. If safety, healthcare and overall quality of life matter more than pure cost, compare
            the index scores above directly, since a more expensive city can still be the better long-term choice
            if it offers meaningfully higher safety and healthcare standards. Many expats, digital nomads and remote
            workers use this comparison as a starting point before narrowing down a shortlist of two or three
            candidate cities.
          </p>

          <div className="grid gap-4 md:grid-cols-3 mt-10">
            <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">10,000+ Cities</h3>
              <p className="text-sm text-slate-600">
                Compare {cityA.name} and {cityB.name} plus 10,000+ other cities worldwide.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">50+ Cost Factors</h3>
              <p className="text-sm text-slate-600">Rent, groceries, healthcare, transport, salaries, utilities and more.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">Updated Data</h3>
              <p className="text-sm text-slate-600">Monthly updates based on global cost of living benchmarks.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">
          Frequently Asked Questions: {pairTitle}
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold">
              How do I compare the cost of living between {cityA.name} and {cityB.name}?
            </h3>
            <p className="text-slate-600 mt-2">
              Instantly compare rent, groceries, transportation, healthcare, salaries, purchasing power and quality
              of life indicators side by side.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">
              Which city is cheaper to live in: {cityA.name} or {cityB.name}?
            </h3>
            <p className="text-slate-600 mt-2">
              Use the comparison calculator above to see current differences across major expense categories.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">What is included in a cost of living comparison?</h3>
            <p className="text-slate-600 mt-2">
              Housing, rent, groceries, restaurants, transportation, healthcare, utilities, salaries, purchasing
              power, safety and quality of life indicators.
            </p>
          </div>
        </div>
      </section>

      {/* Issue #3 fix — visible ItemList as <ul>, matches ItemList schema */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Other Popular Cost of Living Comparisons</h2>
        <ul className="grid md:grid-cols-3 gap-3 text-slate-700">
          {otherPairs.map((p) => (
            <li key={p}>
              <Link href={`/compare/${p}`} className="hover:text-blue-600 transition-colors">
                {p.replace(/-vs-/, " vs ").replace(/-/g, " ")}
              </Link>
            </li>
          ))}
        </ul>
      </section>
<section className="max-w-6xl mx-auto px-4 py-12">
  <h2 className="text-3xl font-bold mb-6">
    Cost of Living Calculator
  </h2>

  <p className="text-slate-600 leading-relaxed">
    Use our free Cost of Living Calculator to estimate monthly expenses, rent,
    groceries, transportation, utilities, and salary requirements in cities
    worldwide. If you're deciding between destinations, try our{" "}
    <Link href="/cost-of-living-calculator" className="text-blue-600 hover:underline">
      Cost of Living Comparison Tool
    </Link>{" "}
    to compare two cities side by side. You can also explore{" "}
    <Link href="/country" className="text-blue-600 hover:underline">
      Cost of Living by Country
    </Link>{" "}
    to discover the cheapest and most expensive countries based on living
    expenses, purchasing power, safety, and quality of life rankings.
  </p>
</section>
      {/* Issue #7 fix — related comparisons dynamically generated from current cityA */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">More Comparisons for {cityA.name}</h2>
        <ul className="grid md:grid-cols-3 gap-3 text-slate-700">
          {relatedPairs.map(({ slug: rSlug, label }) => (
            <li key={rSlug}>
              <Link href={`/compare/${rSlug}`} className="hover:text-blue-600 transition-colors">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}