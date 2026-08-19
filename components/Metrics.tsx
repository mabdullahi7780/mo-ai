"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SEGMENTS } from "@/lib/data";
import { cn } from "@/lib/cn";

export function Metrics() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const segment = SEGMENTS[active];

  return (
    <section id="numbers" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-azure">
            By the numbers
          </p>
        </Reveal>

        <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.05}>
            <h2 className="max-w-[16ch] text-balance text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
              Results we can point at.
            </h2>
          </Reveal>

          {/* segmented control, Apple style */}
          <Reveal delay={0.1}>
            <div
              role="tablist"
              aria-label="Audience"
              className="inline-flex rounded-full bg-white/[0.06] p-1 ring-1 ring-white/10 backdrop-blur-xl"
            >
              {SEGMENTS.map((s, i) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 sm:px-5",
                    active === i ? "text-black" : "text-muted hover:text-ink"
                  )}
                >
                  {active === i && (
                    <motion.span
                      layoutId="segment-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span className="relative z-10 whitespace-nowrap">{s.label}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={segment.id + "-head"}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-muted"
          >
            {segment.headline}
          </motion.p>
        </AnimatePresence>

        {/* metric bento */}
        <AnimatePresence mode="wait">
          <motion.div
            key={segment.id}
            initial="hidden"
            animate="show"
            exit="out"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07 } },
              out: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
            }}
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {segment.metrics.map((m) => (
              <motion.div
                key={`${segment.id}-${m.label}`}
                variants={
                  reduce
                    ? { hidden: {}, show: {}, out: {} }
                    : {
                        hidden: { opacity: 0, y: 22 },
                        show: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                        },
                        out: {
                          opacity: 0,
                          y: -12,
                          transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                        },
                      }
                }
              >
                <SpotlightCard className="h-full p-7 sm:p-8">
                  {/* glow behind the number */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -left-8 -top-10 h-40 w-40 rounded-full bg-azure/[0.14] blur-[52px] transition-colors duration-500 group-hover:bg-azure/25"
                  />
                  <div className="tnum grad-text text-[clamp(2.3rem,4.2vw,3.1rem)] font-semibold leading-none tracking-[-0.04em]">
                    <Counter to={m.to} prefix={m.prefix} suffix={m.suffix} />
                  </div>
                  <p className="mt-4 text-[15px] font-medium text-ink">{m.label}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-faint">{m.sub}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
