"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const BASE =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-[transform,background-color,border-color,box-shadow] duration-300 " +
  "active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure/70 " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-black will-change-transform";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-ink text-black hover:bg-white shadow-[0_8px_30px_-8px_rgba(255,255,255,0.35)] hover:shadow-[0_12px_44px_-10px_rgba(255,255,255,0.5)]",
  secondary:
    "bg-white/[0.06] text-ink hairline hover:bg-white/[0.12] backdrop-blur-xl",
  ghost:
    "text-azure hover:text-cyan-ai bg-transparent",
};

const SIZES = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-[15px]",
  lg: "h-[52px] px-8 text-[17px]",
};

/**
 * Pill button with a magnetic hover: the button leans toward the cursor,
 * then springs back on leave. Disabled under prefers-reduced-motion.
 */
export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  magnetic = true,
  shimmer = false,
  onClick,
  target,
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: keyof typeof SIZES;
  className?: string;
  magnetic?: boolean;
  shimmer?: boolean;
  onClick?: () => void;
  target?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (!magnetic || reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setOffset({
      x: (e.clientX - (r.left + r.width / 2)) * 0.22,
      y: (e.clientY - (r.top + r.height / 2)) * 0.32,
    });
  };
  const handleLeave = () => setOffset({ x: 0, y: 0 });

  const style = {
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
    transition: offset.x === 0 && offset.y === 0
      ? "transform 600ms cubic-bezier(0.16,1,0.3,1)"
      : "transform 120ms linear",
  };

  const inner = (
    <>
      {shimmer && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <span className="animate-shimmer absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </span>
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className={classes}
          style={style}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={classes}
        style={style}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      className={classes}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {inner}
    </button>
  );
}
