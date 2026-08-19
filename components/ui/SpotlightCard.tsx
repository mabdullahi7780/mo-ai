"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Obsidian card with a hairline ring, a cursor-tracking radial spotlight,
 * and an Apple-style hover lift.
 */
export function SpotlightCard({
  children,
  className,
  as: Tag = "div",
  lift = true,
  onClick,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "button";
  lift?: boolean;
  onClick?: () => void;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
  };

  return (
    <Tag
      ref={ref as never}
      onMouseMove={handleMove}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-[28px] bg-obsidian",
        "ring-1 ring-white/10",
        "shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]",
        "transition-[transform,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        lift &&
          "hover:-translate-y-1.5 hover:bg-slate-card hover:shadow-[0_36px_90px_-36px_rgba(0,0,0,1)] hover:ring-white/[0.18]",
        className
      )}
      {...rest}
    >
      {/* cursor spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(460px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(10,132,255,0.10), transparent 42%)",
        }}
      />
      {/* top hairline highlight, the Apple bevel */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <div className="relative z-10 h-full">{children}</div>
    </Tag>
  );
}
