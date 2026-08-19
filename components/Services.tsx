"use client";

import { Bot, Database, Workflow, Zap, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SERVICES } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = { Database, Workflow, Bot, Zap };

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      {/* section spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[560px] w-[1000px] max-w-[140vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(11,87,224,0.12),transparent_66%)] blur-[70px]"
      />

      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-azure">
            Core services
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-[18ch] text-balance text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
            Four disciplines. One system.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-[54ch] text-[17px] leading-relaxed text-muted">
            Most agencies sell you one piece and leave the seams to you. We build
            the whole chain, from the page a stranger lands on to the appointment
            in your calendar.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-fr">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <Reveal key={s.id} delay={i * 0.08} className={s.span}>
                <SpotlightCard className="flex h-full flex-col p-8 sm:p-9">
                  <div className="mb-7 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-white/[0.14] to-white/[0.04] ring-1 ring-white/10">
                    <Icon size={19} className="text-cyan-ai" strokeWidth={1.6} />
                  </div>

                  <p className="text-[12px] font-semibold uppercase tracking-[0.13em] text-azure">
                    {s.eyebrow}
                  </p>
                  <h3 className="mt-3 text-balance text-[1.42rem] font-semibold leading-[1.2] tracking-[-0.024em] text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.65] text-muted">{s.body}</p>

                  <ul className="mt-auto space-y-0 pt-7">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 border-t border-white/[0.07] py-2.5 text-[13.5px] text-faint"
                      >
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-azure/70" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
