"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CAL_LINK, CAL_URL, CONTACT_EMAIL } from "@/lib/data";

const PROMISES = [
  "A map of your current lead journey",
  "The two or three places you are losing the most",
  "What a fix would actually take, in hours of work",
  "No obligation and no follow-up sequence",
];

export function CTA() {
  const [state, setState] = useState<"idle" | "loading" | "ready" | "failed">("idle");

  useEffect(() => {
    let cancelled = false;
    setState("loading");

    type CalFn = ((...args: unknown[]) => void) & {
      loaded?: boolean;
      ns?: Record<string, unknown>;
      q?: unknown[];
    };
    const w = window as unknown as { Cal?: CalFn };

    /**
     * Cal's embed.js expects `window.Cal` to already exist as a queueing stub
     * that lazily injects the script. Loading the script first and then calling
     * Cal() throws "Cal is not defined" from inside the bundle, so we install
     * the official stub exactly as Cal documents it.
     */
    if (!w.Cal) {
      const push = (fn: { q: unknown[] }, args: IArguments) => fn.q.push(args);
      const cal = function (this: unknown, ...rest: unknown[]) {
        const c = w.Cal as CalFn;
        // eslint-disable-next-line prefer-rest-params
        const args = arguments as IArguments;
        if (!c.loaded) {
          c.ns = {};
          c.q = c.q || [];
          const script = document.createElement("script");
          script.src = "https://app.cal.com/embed/embed.js";
          script.async = true;
          script.onerror = () => !cancelled && setState("failed");
          document.head.appendChild(script);
          c.loaded = true;
        }
        if (rest[0] === "init") {
          const api = function () {
            // eslint-disable-next-line prefer-rest-params
            push(api as unknown as { q: unknown[] }, arguments);
          } as unknown as { q: unknown[] };
          const namespace = rest[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            (c.ns as Record<string, unknown>)[namespace] =
              (c.ns as Record<string, unknown>)[namespace] || api;
            push((c.ns as Record<string, { q: unknown[] }>)[namespace], args);
            push(c as unknown as { q: unknown[] }, [
              "initNamespace",
              namespace,
            ] as unknown as IArguments);
          } else {
            push(c as unknown as { q: unknown[] }, args);
          }
          return;
        }
        push(c as unknown as { q: unknown[] }, args);
      } as CalFn;
      w.Cal = cal;
    }

    try {
      const Cal = w.Cal as CalFn;
      Cal("init", { origin: "https://cal.com" });
      Cal("inline", {
        elementOrSelector: "#cal-embed",
        calLink: CAL_LINK,
        layout: "month_view",
      });
      Cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        cssVarsPerTheme: { dark: { "cal-brand": "#0a84ff" } },
      });
    } catch {
      setState("failed");
      return;
    }

    // The embed renders into #cal-embed asynchronously; watch for it rather
    // than guessing a fixed delay.
    const host = document.getElementById("cal-embed");
    let settled = false;
    const markReady = () => {
      if (settled || cancelled) return;
      settled = true;
      setState("ready");
    };
    const observer = host
      ? new MutationObserver(() => {
          if (host.querySelector("iframe")) markReady();
        })
      : null;
    observer?.observe(host!, { childList: true, subtree: true });
    if (host?.querySelector("iframe")) markReady();

    const timeout = window.setTimeout(() => {
      if (!settled && !cancelled) setState("failed");
    }, 10000);

    return () => {
      cancelled = true;
      observer?.disconnect();
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <section id="book" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-b from-obsidian to-abyss ring-1 ring-white/10">
            {/* ambient animated glow */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
              <div className="animate-drift absolute -left-24 -top-32 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.30),transparent_66%)] blur-[70px]" />
              <div
                className="animate-drift absolute -right-24 top-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(11,87,224,0.26),transparent_66%)] blur-[70px]"
                style={{ animationDelay: "-6s" }}
              />
              <div
                className="animate-drift absolute bottom-[-16%] left-1/3 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(100,210,255,0.18),transparent_66%)] blur-[70px]"
                style={{ animationDelay: "-12s" }}
              />
            </div>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />

            <div className="relative z-10 grid grid-cols-1 gap-12 p-8 sm:p-12 lg:grid-cols-2 lg:gap-14 lg:p-14">
              {/* copy */}
              <div>
                <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-cyan-ai">
                  Free consultation
                </p>
                <h2 className="mt-4 max-w-[15ch] text-balance text-[clamp(2rem,4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
                  Let us find the gap in your follow-up.
                </h2>
                <p className="mt-6 max-w-[46ch] text-[16.5px] leading-[1.7] text-muted">
                  Thirty minutes, no pitch deck. Tell us how a lead reaches you
                  today and what happens next. We will map where they are leaking
                  out and tell you honestly whether automation fixes it, including
                  when the answer is no.
                </p>

                <ul className="mt-9">
                  {PROMISES.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 border-t border-white/[0.08] py-3.5 text-[15px] text-muted"
                    >
                      <Check size={16} className="mt-1 shrink-0 text-azure" strokeWidth={2.4} />
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Button
                    href={`mailto:${CONTACT_EMAIL}?subject=Mo%20AI%20consultation`}
                    variant="secondary"
                    size="md"
                  >
                    Email us instead
                  </Button>
                </div>
              </div>

              {/* embedded calendar */}
              <div className="relative min-h-[560px] overflow-hidden rounded-[28px] bg-black/50 ring-1 ring-white/10 backdrop-blur-xl">
                <div id="cal-embed" className="min-h-[560px] w-full" />
                {state !== "ready" && (
                  <div className="absolute inset-0 grid place-items-center p-8 text-center">
                    {state === "failed" ? (
                      <div className="max-w-[30ch]">
                        <p className="text-[15px] font-medium text-ink">
                          Calendar could not load
                        </p>
                        <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                          Open the booking page directly, or send us an email and we
                          will find a time.
                        </p>
                        <div className="mt-6 flex justify-center">
                          <Button href={CAL_URL} target="_blank" size="sm">
                            Open booking page
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2.5 text-[13.5px] text-faint">
                        <Loader2 size={15} className="animate-spin" />
                        Loading available times
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
