import Link from "next/link";

const contactCards = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 5h16v12a1 1 0 01-1 1H4a1 1 0 01-1-1V5z" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M3 5l8 8 8-8" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "General Inquiries",
    value: "hello@Worldlivingcost",
    sub: "For general questions and feedback",
    href: "mailto:hello@Worldlivingcost",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 5h16v12a1 1 0 01-1 1H4a1 1 0 01-1-1V5z" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M3 5l8 8 8-8" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Data Corrections",
    value: "data@Worldlivingcost.world",
    sub: "Report incorrect prices or indices",
    href: "mailto:data@Worldlivingcost.world",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 5h16v12a1 1 0 01-1 1H4a1 1 0 01-1-1V5z" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M3 5l8 8 8-8" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Partnerships & API",
    value: "api@Worldlivingcost.world",
    sub: "Business, data licensing & API access",
    href: "mailto:api@Worldlivingcost.world",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 5h16v12a1 1 0 01-1 1H4a1 1 0 01-1-1V5z" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M3 5l8 8 8-8" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Press & Media",
    value: "press@Worldlivingcost.world",
    sub: "Media kits, interviews, and press requests",
    href: "mailto:press@Worldlivingcost.world",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 5h16v12a1 1 0 01-1 1H4a1 1 0 01-1-1V5z" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M3 5l8 8 8-8" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Legal",
    value: "legal@Worldlivingcost.world",
    sub: "Privacy, terms, and compliance",
    href: "mailto:legal@Worldlivingcost.world",
  },
];

const quickLinks = [
  { label: "Browse FAQ", href: "/faq", desc: "Most questions answered here" },
  { label: "Our Methodology", href: "/methodology", desc: "How we calculate our indices" },
  { label: "About Us", href: "/about-us", desc: "Learn about our team and mission" },
];

const officeInfo = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2C6.24 2 4 4.24 4 7c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" stroke="#2563eb" strokeWidth="1.5" />
        <circle cx="9" cy="7" r="1.5" stroke="#2563eb" strokeWidth="1.5" />
      </svg>
    ),
    label: "Headquarters",
    value: "Berlin, Germany",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M9 5v4l3 2" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Response Time",
    value: "Within 24 hours (Mon–Fri)",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="3" width="14" height="12" rx="1" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M6 2v2M12 2v2M2 7h14" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Founded",
    value: "2021",
  },
];

export default function ContactForm() {
  return (
    <>
      {/* Header */}
      <section className="bg-white border-b border-slate-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              Contact Us
            </div>
            <h1 className="font-display text-4xl font-bold text-slate-900 mb-4">
              Get in touch
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Have a question, found an error in our data, or want to partner with
              us? Reach out directly we reply within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left — office info + quick links */}
          <div className="space-y-5">
            {/* Office card */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Our Office</h3>
              <div className="space-y-3">
                {officeInfo.map((o) => (
                  <div key={o.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                      {o.icon}
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">{o.label}</p>
                      <p className="text-sm font-medium text-slate-800">{o.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                {quickLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900 group-hover:text-blue-700">{l.label}</p>
                      <p className="text-xs text-slate-400">{l.desc}</p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-slate-300 group-hover:text-blue-500 shrink-0">
                      <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right — email cards */}
          <div className="lg:col-span-2">
            <h2 className="font-display font-bold text-slate-900 mb-5">
              Contact by Email
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactCards.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                    {c.icon}
                  </div>
                  <p className="font-semibold text-sm text-slate-900 mb-1">{c.label}</p>
                  <p className="text-sm text-blue-600 font-medium mb-1.5 group-hover:underline">
                    {c.value}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">{c.sub}</p>
                </a>
              ))}
            </div>
          </div>
          
        </div>
        {/* SEO Content */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 border-t border-slate-100 pt-12">
    <div>
      <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
        How Can We Help?
      </h2>
      <p className="text-sm text-slate-500 leading-relaxed mb-4">
        Worldlivingcost is used by over 500,000 people every month — expats, remote workers, HR professionals, and retirees planning international moves. We take every message seriously and aim to respond within 24 hours on business days.
      </p>
      <p className="text-sm text-slate-500 leading-relaxed">
        If you have found an incorrect price or index in our database, please use the Data Corrections email above. Include the city name, the field that is incorrect, and the value you believe is accurate. Our data team reviews every correction within 48 hours.
      </p>
    </div>
    <div>
      <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
        Partnerships and API Access
      </h2>
      <p className="text-sm text-slate-500 leading-relaxed mb-4">
        We offer data licensing and API access for businesses, HR platforms, relocation services, and financial tools. Our dataset covers 10,000+ cities across 195 countries with monthly-updated rent, grocery, transport, utility, and salary data.
      </p>
      <p className="text-sm text-slate-500 leading-relaxed">
        For press and media inquiries, interview requests, or data citations in publications, contact our press team directly. We are happy to provide verified data, methodology documentation, and expert commentary on global cost of living trends.
      </p>
    </div>
  </div>
</div>
      </div>
    </>
  );
}