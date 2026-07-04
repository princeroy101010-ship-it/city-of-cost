// app/faq/faqs.js  ← plain data module, no "use client"
// Single source of truth for FAQ content. Both the server component's
// FAQPage JSON-LD and the client UI import from here, so the visible
// text and the structured data can never drift out of sync.

export const faqs = [
  {
    category: "About the Data",
    items: [
      {
        q: "How often is cost of living data updated?",
        a: "Cost and rent indices are updated monthly. Quality of life, safety, and healthcare indices are updated quarterly. Every data point is timestamped so you always know how fresh the data is.",
      },
      {
        q: "How accurate is the cost of living data?",
        a: "Each price is cross-referenced against at least two independent sources before publishing. Cost of living data is inherently approximate — prices vary by neighbourhood, lifestyle, and time. Use our data as a reliable guide, not an absolute truth.",
      },
      {
        q: "What does the NYC = 100 baseline mean in the cost of living index?",
        a: "All cost and rent indices use New York City as the baseline (score of 100). A city with a cost index of 65 is approximately 35% cheaper than New York City for equivalent goods and services.",
      },
      {
        q: "Are cost of living prices shown in local currency or USD?",
        a: "All prices are shown in USD for easy global comparison. Daily exchange rates from the European Central Bank are used for conversion. The original local currency is noted where relevant.",
      },
      {
        q: "How do you handle cities with less cost of living data?",
        a: "Cities with fewer than 100 contributor data points are marked with a lower confidence indicator. Data is still shown but should be treated as an estimate rather than a precise figure.",
      },
    ],
  },
  {
    category: "Using Worldlivingcost",
    items: [
      {
        q: "Is Worldlivingcost free to use?",
        a: "Yes — core cost of living data, city comparisons, and rankings are completely free. A premium API tier for businesses is planned for the future, but personal use will always be free.",
      },
      {
        q: "How do I compare the cost of living between two cities?",
        a: "Go to the Compare page, select any two cities from the dropdowns, and instantly see a side-by-side breakdown across restaurants, groceries, transport, housing, utilities, and salaries.",
      },
      {
        q: "Can I download cost of living data?",
        a: "Bulk data downloads are available via the API. CSV export functionality for individual city pages is in development.",
      },
      {
        q: "How do I report incorrect cost of living data?",
        a: "Use the Contact page and select 'Data Correction' as the topic. Include the city name, the incorrect value, and the correct value. All reports are reviewed within 48 hours.",
      },
    ],
  },
  {
    category: "Contributing Data",
    items: [
      {
        q: "How can I contribute city price data to Worldlivingcost?",
        a: "Visit the Contribute page to submit local prices. All submissions are reviewed before being incorporated into the database. Contributions from locals who know their city's prices are especially valuable.",
      },
      {
        q: "Do I need an account to contribute cost of living data?",
        a: "You can submit data without an account, but creating a free account lets you track contributions, earn contributor status, and get credited on the city pages you help improve.",
      },
      {
        q: "What happens after I submit data?",
        a: "Your submission enters our review queue. Our team verifies it against existing data points and other sources. If approved, it is incorporated into the city's dataset within 7 days.",
      },
    ],
  },
  {
    category: "API & Business",
    items: [
      {
        q: "Do you offer a cost of living data API?",
        a: "Yes, a public API is available with rate-limited free access. For higher rate limits and commercial use, contact api@worldlivingcost.com to discuss partnership options.",
      },
      {
        q: "Can I use Worldlivingcost data in my app or product?",
        a: "Free tier API data can be used in non-commercial applications with attribution. Commercial use requires a separate data license agreement. Contact legal@worldlivingcost.com for details.",
      },
    ],
  },
  {
  category: "Rankings & Comparisons",
  items: [
    {
      q: "How are city and country rankings calculated?",
      a: "Rankings are based on the average cost index across tracked cities within a country, combined with quality of life and safety scores. Cities and countries are re-ranked automatically whenever underlying price or index data is updated.",
    },
    {
      q: "Why do rankings sometimes change month to month?",
      a: "Rankings shift as new contributor submissions are verified, exchange rates fluctuate, or quarterly quality of life and safety indices are refreshed. A small ranking change usually reflects a real update rather than an error.",
    },
    {
      q: "Can I filter city rankings by continent or budget?",
      a: "Yes. The Rankings and Countries pages let you filter by continent and sort by cost index, quality of life, or safety score, making it easy to shortlist affordable cities that match your budget and lifestyle priorities.",
    },
    {
      q: "Do rankings account for salary differences between cities?",
      a: "Cost of living rankings focus on expenses rather than income. For a fuller financial picture, pair the cost index with the average net salary and purchasing power index shown on each city page.",
    },
  ],
},
{
  category: "Relocation & Planning",
  items: [
    {
      q: "How do I use cost of living data to plan a relocation budget?",
      a: "Start with the average monthly cost shown on the destination city's page, then add one-time relocation costs such as visa fees, flights, and a security deposit for housing. Compare the city's rent index and average salary to estimate how much of your income would go toward housing versus other expenses.",
    },
    {
      q: "Does Worldlivingcost account for family size when estimating costs?",
      a: "Our baseline figures reflect the average cost for a single adult. Families should budget additional amounts for larger housing, school fees where applicable, higher grocery volumes, and family health insurance, none of which are included in the single-person average shown by default.",
    },
    {
      q: "How reliable is cost of living data for visa and immigration planning?",
      a: "Our data is a useful reference for budgeting purposes but is not an official source for visa applications. Immigration authorities often require documentation from government-issued cost of living or minimum income tables specific to their country, which may differ from our contributor-based averages.",
    },
    {
      q: "Can I compare cost of living before and after taxes?",
      a: "The average net salary shown on each city page already reflects take-home pay after local income tax. Cost of living figures for rent, groceries, and transport are pre-tax retail prices, since sales tax and VAT rates vary by category and are not separately broken out.",
    },
    {
      q: "How often should I re-check cost of living data before moving?",
      a: "Since cost and rent indices are updated monthly, we recommend checking your target city's page again within a few weeks of finalizing your relocation plans, especially if you are moving to a city with high inflation or a fast-changing rental market.",
    },
  ],
},
];