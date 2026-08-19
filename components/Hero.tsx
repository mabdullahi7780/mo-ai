"use client";

import { ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const WORDS = ["Mo AI.", "Intelligence Engineered", "into Every Workflow."];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative isolate overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
      {/* ambient spotlight */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-18%] h-[720px] w-[1100px] max-w-[150vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(10,132,255,0.20),rgba(11,87,224,0.10)_38%,transparent_68%)] blur-[60px]" />
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[820px] max-w-[130vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(100,210,255,0.10),transparent_65%)] blur-[80px]" />
        {/* hairline grid, very faint */}
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
            backgroundSize: "84px 84px",
            maskImage:
              "radial-gradient(ellipse 70% 55% at 50% 32%, black 20%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 55% at 50% 32%, black 20%, transparent 78%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 text-center">
        {/* eyebrow */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-4 py-1.5 text-[12.5px] font-medium text-muted ring-1 ring-white/10 backdrop-blur-xl"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-azure" />
          </span>
          Eight systems live in production
        </motion.div>

        {/* headline */}
        <h1 className="text-balance text-[clamp(2.6rem,7.4vw,5.6rem)] font-semibold leading-[1.03] tracking-[-0.035em] text-ink">
          {WORDS.map((w, i) => (
            <motion.span
              key={w}
              className="block"
              initial={reduce ? false : { opacity: 0, y: 26, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.08 + i * 0.11, ease: [0.16, 1, 0.3, 1] }}
            >
              {i === 2 ? <span className="grad-text">{w}</span> : w}
            </motion.span>
          ))}
        </h1>

        {/* subhead */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-[52ch] text-balance text-[clamp(1.05rem,1.9vw,1.35rem)] font-normal leading-[1.5] text-muted"
        >
          Custom CRMs, GoHighLevel engineering and autonomous AI agents.
          <span className="block">
            Built by the team that ships them into live revenue.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
          className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Button href="#book" size="lg" shimmer className="w-full sm:w-auto">
            Get Started
          </Button>
          <Button href="#work" variant="ghost" size="lg" className="w-full sm:w-auto">
            See the numbers
            <ChevronRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Button>
        </motion.div>

        {/* trust row */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[12.5px] text-faint"
        >
          <span>Delivered across</span>
          {["United States", "Netherlands", "Australia", "United Kingdom"].map((c, i) => (
            <span key={c} className="flex items-center gap-3">
              <span className="font-medium text-muted">{c}</span>
              {i < 3 && <span className="h-[3px] w-[3px] rounded-full bg-faint" />}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
