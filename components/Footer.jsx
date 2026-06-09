import Link from "next/link";

const footerLinks = {
  Explore: [
    { href: "/rankings", label: "City Rankings" },
    { href: "/compare", label: "Compare Cities" },
    { href: "/countries", label: "Countries" },
  ],
  "Top Cities": [
    { href: "/city/new-york", label: "New York" },
    { href: "/city/london", label: "London" },
    { href: "/city/tokyo", label: "Tokyo" },
    { href: "/city/dubai", label: "Dubai" },
    { href: "/city/singapore", label: "Singapore" },
    { href: "/city/berlin", label: "Berlin" },
  ],
  Info: [
    { href: "/methodology", label: "Methodology" },
    { href: "/contact", label: "Contact" },


  ],
  legal: [
    { href: "/about-us", label: "About" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms of Service" },
    { href: "/faq", label: "FAQ" },

  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="1.5" />
                  <path d="M9 5v4l3 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-display font-bold text-lg text-white">
                Cost<span className="text-blue-500">Living</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              The world&apos;s most trusted source for cost of living data. Compare
              prices, salaries, and quality of life across thousands of cities.
            </p>
            <p className="text-xs text-slate-600">
              Data updated monthly. Prices in USD equivalent unless stated.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-sm font-semibold text-white mb-4">{group}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} CostLiving. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Data is crowd-sourced and provided for informational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
