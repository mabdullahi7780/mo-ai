import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

import markSrc from "@/public/logo-mark@3x.png";

/**
 * Mo AI lockup.
 *
 * The supplied logo's wordmark is dark slate (#304050), which disappears on a
 * black background, so the mark is used as the glyph and the wordmark is set in
 * type. That also keeps the wordmark crisp at every size and in every theme.
 */
export function Logo({
  href = "#top",
  size = "md",
  showTagline = false,
  className,
}: {
  href?: string | null;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
}) {
  const dims = {
    sm: { h: 24, text: "text-[14px]" },
    md: { h: 30, text: "text-[16px]" },
    lg: { h: 42, text: "text-[22px]" },
  }[size];

  const inner = (
    <span className={cn("group/logo inline-flex items-center gap-2.5", className)}>
      <Image
        src={markSrc}
        alt=""
        height={dims.h}
        width={Math.round((dims.h * 225) / 145)}
        priority
        className="h-auto w-auto shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/logo:scale-[1.06]"
        style={{ height: dims.h, width: "auto" }}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-semibold tracking-[-0.02em] text-ink",
            dims.text
          )}
        >
          Mo AI
        </span>
        {showTagline && (
          <span className="mt-1 text-[9.5px] font-medium uppercase tracking-[0.22em] text-faint">
            Intelligence Engineered
          </span>
        )}
      </span>
    </span>
  );

  if (!href) return inner;
  return (
    <Link href={href} aria-label="Mo AI, home">
      {inner}
    </Link>
  );
}
