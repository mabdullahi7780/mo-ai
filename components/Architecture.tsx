"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, CalendarCheck, Database, Globe, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { FLOW, STACK } from "@/lib/data";
import { cn } from "@/lib/cn";

const ICONS: Record<string, LucideIcon> = { Globe, Database, Bot, CalendarCheck };

/** How long each layer holds before advancing. */
const AUTO_MS = 10_000;

export function Architecture() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const step = FLOW[active];

  // Pause only for a reader who is hovering or tabbing through the panel, and
  // for anyone who asked for reduced motion. An earlier version also gated on
  // an IntersectionObserver so the cycle would begin at layer 01, but that made
  // the whole carousel dependent on a callback that never arrives in a
  // throttled tab, and it silently never ran.
  const running = !paused && !reduce;

  // Keyed on `active`, so selecting a layer by hand restarts the countdown
  // rather than advancing a moment later.
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(
      () => setActive((a) => (a + 1) % FLOW.length),
      AUTO_MS
    );
    return () => window.clearTimeout(t);
  }, [active, running]);

  const select = useCallback((i: number) => setActive(i), []);

  return (
    <section id="architecture" className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[520px] w-[960px] max-w-[140vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(10,132,255,0.11),transparent_66%)] blur-[80px]"
      />

      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-azure">
            The architecture
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-[17ch] text-balance text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
            From stranger to booked revenue.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-muted">
            The same four layers sit under nearly every system we ship. It walks
            itself through them, or select a layer to jump straight there.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            className="mt-14 rounded-[32px] bg-obsidian p-6 ring-1 ring-white/10 sm:p-10"
          >
            {/* the rail */}
            <div className="relative">
              <div
                aria-hidden
                className="absolute left-0 right-0 top-[26px] hidden h-px overflow-hidden bg-white/10 md:block"
              >
                <motion.div
                  className="h-full w-1/4 bg-gradient-to-r from-transparent via-azure to-transparent"
                  animate={reduce ? undefined : { x: ["-100%", "400%"] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-4">
                {FLOW.map((f, i) => {
                  const Icon = ICONS[f.icon];
                  const on = active === i;
                  return (
                    <button
                      key={f.id}
                      onClick={() => select(i)}
                      aria-pressed={on}
                      aria-label={`Layer ${i + 1}, ${f.label}`}
                      className="group/step relative flex items-center gap-4 rounded-2xl p-3 text-left transition-colors duration-300 hover:bg-white/[0.04] md:flex-col md:items-start md:gap-0 md:bg-transparent md:p-0 md:hover:bg-transparent"
                    >
                      <span
                        className={cn(
                          "relative z-10 grid h-[52px] w-[52px] shrink-0 place-items-center rounded-2xl ring-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          on
                            ? "bg-gradient-to-br from-cyan-ai/25 to-azure/15 ring-azure/45 shadow-[0_0_0_6px_rgba(10,132,255,0.10)]"
                            : "bg-white/[0.05] ring-white/10 group-hover/step:ring-white/25"
                        )}
                      >
                        <Icon
                          size={20}
                          strokeWidth={1.6}
                          className={cn(
                            "transition-colors duration-300",
                            on ? "text-cyan-ai" : "text-muted group-hover/step:text-ink"
                          )}
                        />
                      </span>
                      <div className="md:mt-5">
                        <p
                          className={cn(
                            "text-[15px] font-semibold tracking-[-0.015em] transition-colors duration-300",
                            on ? "text-ink" : "text-muted group-hover/step:text-ink"
                          )}
                        >
                          {f.label}
                        </p>
                        <p className="mt-1 text-[12px] text-faint">
                          Layer {String(i + 1).padStart(2, "0")}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* detail panel */}
            <div className="mt-9 overflow-hidden rounded-3xl bg-abyss ring-1 ring-white/[0.07]">
              {/* countdown to the next layer */}
              <div aria-hidden className="h-[2px] w-full bg-white/[0.06]">
                {running && (
                  <motion.div
                    key={active}
                    className="h-full origin-left bg-gradient-to-r from-cyan-ai to-azure"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
                  />
                )}
              </div>

              <div className="min-h-[188px] p-7 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.id}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h3 className="text-[1.3rem] font-semibold tracking-[-0.022em] text-ink">
                      {step.label}
                    </h3>
                    <p className="mt-3 max-w-[70ch] text-[15.5px] leading-[1.7] text-muted">
                      {step.detail}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {step.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-white/[0.05] px-3.5 py-1.5 text-[12.5px] text-muted ring-1 ring-white/10"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>

        {/* stack marquee */}
        <Reveal delay={0.1}>
          <div className="mt-16 text-center">
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-faint">
              Built with
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
              {STACK.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-white/[0.04] px-4 py-2 text-[13px] text-muted ring-1 ring-white/[0.08] transition-all duration-300 hover:-translate-y-0.5 hover:text-ink hover:ring-white/25"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
