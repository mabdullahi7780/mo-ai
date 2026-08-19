"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "#numbers", label: "Numbers" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#architecture", label: "How it works" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:pt-4">
      <nav
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full px-4 sm:px-5",
          "transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "bg-black/60 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_8px_40px_-16px_rgba(0,0,0,0.9)]"
            : "bg-transparent"
        )}
      >
        {/* logo */}
        <Logo size="sm" className="shrink-0" />

        {/* centre links */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium text-muted transition-colors duration-300 hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* right CTA */}
        <div className="flex items-center gap-2">
          <Button href="#book" size="sm" className="hidden sm:inline-flex" magnetic={false}>
            Book a Demo
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full text-ink ring-1 ring-white/10 transition-colors hover:bg-white/10 md:hidden"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {/* mobile sheet */}
      <div
        className={cn(
          "mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl md:hidden",
          "transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"
        )}
      >
        <div className="bg-black/80 p-3 ring-1 ring-white/10 backdrop-blur-xl">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 text-[15px] font-medium text-muted transition-colors hover:bg-white/5 hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Button href="#book" className="mt-2 w-full" magnetic={false} onClick={() => setOpen(false)}>
            Book a Demo
          </Button>
        </div>
      </div>
    </header>
  );
}
