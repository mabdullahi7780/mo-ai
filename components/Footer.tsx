import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { CAL_URL, CONTACT_EMAIL } from "@/lib/data";

const COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Custom CRM Architecture", href: "#services" },
      { label: "GoHighLevel Engineering", href: "#services" },
      { label: "Autonomous AI Agents", href: "#services" },
      { label: "Modern Web Engineering", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Selected work", href: "#work" },
      { label: "By the numbers", href: "#numbers" },
      { label: "How it works", href: "#architecture" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { label: "Book a consultation", href: CAL_URL },
      { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:gap-14">
          <div className="col-span-2 sm:col-span-1">
            <Logo size="md" showTagline />
            <p className="mt-5 max-w-[34ch] text-[13.5px] leading-[1.7] text-faint">
              Intelligence engineered into every workflow. Custom CRMs, GoHighLevel
              systems, autonomous AI agents and high-performance web.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h5 className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-faint">
                {col.title}
              </h5>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[13.5px] text-muted transition-colors duration-300 hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-white/[0.08] pt-8">
          <p className="max-w-[92ch] text-[12px] leading-[1.75] text-faint">
            Client names shown on this site are pseudonyms and client logos are
            omitted, because the underlying engagements are covered by
            non-disclosure agreements. All projects, systems and metrics described
            are real and drawn from delivered work. Figures reflect the state of each
            system at the time of delivery and are not a guarantee of future results.
            Verifiable references can be provided on request during a consultation.
          </p>
          <div className="mt-7 flex flex-col gap-3 text-[12.5px] text-faint sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Mo AI. All rights reserved.</span>
            <span>Built by Abdullah Irfan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
