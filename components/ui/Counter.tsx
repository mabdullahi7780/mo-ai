"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up when it first enters the viewport, and re-runs whenever `to`
 * changes (so the audience toggle re-animates).
 *
 * Uses a native IntersectionObserver rather than framer's useInView: the hook
 * did not fire reliably here, and this needs no motion context.
 */
export function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1600,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [seen, setSeen] = useState(false);
  const [value, setValue] = useState(0);

  // Trigger as soon as the element is on screen. The immediate geometric check
  // matters when the component remounts while already in view (audience toggle):
  // a fresh observer's first callback can land before layout settles and then
  // never re-evaluates, because nothing scrolls afterwards.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScreen = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh - 40 && r.bottom > 0;
    };

    if (onScreen()) {
      setSeen(true);
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!seen) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(to);
      return;
    }

    let raf = 0;
    const from = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4); // easeOutQuart, Apple deceleration
      setValue(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString("en-US")}
      {value === to ? suffix : ""}
    </span>
  );
}
