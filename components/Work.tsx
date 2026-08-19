"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { CASES, type CaseStudy } from "@/lib/data";
import { cn } from "@/lib/cn";

function StatusPill({ status }: { status: CaseStudy["status"] }) {
  const live = status === "live";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.09em] ring-1",
        live
          ? "bg-azure/[0.10] text-azure ring-azure/25"
          : "bg-deep/[0.12] text-deep ring-deep/30"
      )}
    >
      {live && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-azure" />
        </span>
      )}
      {live ? "Live system" : "In build"}
    </span>
  );
}

export function Work() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = CASES.find((c) => c.id === openId) ?? null;

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-azure">
            Selected work
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-[16ch] text-balance text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
            Real systems. Real numbers.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-muted">
            Select any project for the full breakdown: the problem, what we built,
            and what changed.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {CASES.map((c, i) => (
            <Reveal key={c.id} delay={Math.min(i * 0.06, 0.36)} className={c.span}>
              <SpotlightCard
                as="button"
                onClick={() => setOpenId(c.id)}
                className="flex h-full w-full cursor-pointer flex-col p-7 text-left sm:p-8"
                aria-label={`Open ${c.name} case study`}
              >
                <div className="flex items-start justify-between gap-4">
                  <StatusPill status={c.status} />
                  <span className="shrink-0 text-[12px] text-faint">{c.geo}</span>
                </div>

                <h3
                  className={cn(
                    "mt-6 font-semibold leading-[1.15] tracking-[-0.025em] text-ink",
                    c.featured ? "text-[clamp(1.5rem,2.4vw,1.95rem)]" : "text-[1.25rem]"
                  )}
                >
                  {c.name}
                </h3>
                <p className="mt-1.5 text-[13px] text-faint">{c.industry}</p>
                <p
                  className={cn(
                    "mt-4 leading-[1.65] text-muted",
                    c.featured ? "text-[15.5px]" : "text-[14px]"
                  )}
                >
                  {c.summary}
                </p>

                <div className="mt-auto grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/[0.07] pt-7">
                  {c.metrics.map((m) => (
                    <div key={m.label}>
                      <div
                        className={cn(
                          "font-semibold leading-none tracking-[-0.03em] text-ink",
                          c.featured ? "text-[1.6rem]" : "text-[1.3rem]"
                        )}
                      >
                        {m.value}
                      </div>
                      <div className="mt-1.5 text-[12px] leading-snug text-faint">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                <span className="mt-7 inline-flex items-center gap-1.5 text-[13px] font-medium text-azure">
                  Full breakdown
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-[74ch] border-l border-white/10 pl-5 text-[13px] leading-[1.75] text-faint">
            Client names on this page are pseudonyms and logos are omitted, because
            most of this work sits under NDA. Every project, system and number is
            real and taken from the live build it came from. Verifiable references
            are available on a call.
          </p>
        </Reveal>
      </div>

      {/* ---------------- modal ---------------- */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-black/75 backdrop-blur-xl"
              onClick={() => setOpenId(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={active.name}
              initial={{ opacity: 0, y: 28, scale: 0.975 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.985 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="no-scrollbar relative max-h-[86vh] w-full max-w-3xl overflow-y-auto rounded-[32px] bg-obsidian ring-1 ring-white/12 shadow-[0_50px_140px_-40px_rgba(0,0,0,1)]"
            >
              <button
                type="button"
                onClick={() => setOpenId(null)}
                aria-label="Close"
                className="sticky left-full top-5 z-20 mr-5 grid h-9 w-9 place-items-center rounded-full bg-white/[0.08] text-ink ring-1 ring-white/10 backdrop-blur-xl transition-all duration-300 hover:rotate-90 hover:bg-white/[0.16]"
              >
                <X size={16} />
              </button>

              <div className="-mt-9 p-8 sm:p-11">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusPill status={active.status} />
                  <span className="text-[12.5px] text-faint">{active.geo}</span>
                </div>

                <h3 className="mt-5 text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink">
                  {active.name}
                </h3>
                <p className="mt-2 text-[14px] text-faint">{active.industry}</p>

                <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/[0.08] ring-1 ring-white/[0.08] sm:grid-cols-4">
                  {active.metrics.map((m) => (
                    <div key={m.label} className="bg-abyss p-5">
                      <div className="grad-text text-[1.45rem] font-semibold leading-none tracking-[-0.03em]">
                        {m.value}
                      </div>
                      <div className="mt-2 text-[11.5px] leading-snug text-faint">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Block title="The problem">
                  <p className="text-[15.5px] leading-[1.75] text-muted">{active.problem}</p>
                </Block>

                <Block title="What we built">
                  <ul>
                    {active.built.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 border-t border-white/[0.07] py-3 text-[14.5px] leading-[1.6] text-muted"
                      >
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-azure/70" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </Block>

                <Block title={active.status === "build" ? "Status" : "The outcome"}>
                  <p className="text-[15.5px] leading-[1.75] text-muted">{active.outcome}</p>
                </Block>

                <div className="mt-9">
                  <Button href="#book" onClick={() => setOpenId(null)}>
                    Book a free consultation
                    <ArrowUpRight size={16} />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-9">
      <h4 className="mb-3 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-azure">
        {title}
      </h4>
      {children}
    </div>
  );
}
