import React from "react";
import Marquee from "react-fast-marquee";
import { CLIENTS } from "../data/content";

/**
 * Typography-only client marquee. Uses the client names as bold display
 * type — deliberately editorial and safe from brand asset misuse.
 */
export default function ClientMarquee() {
  return (
    <section
      data-testid="client-marquee"
      className="bg-alt border-y border-hair py-14 md:py-20 relative"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="overline">Trusted by</p>
          <h3 className="font-display text-2xl md:text-3xl font-black tracking-tight mt-3">
            India&apos;s retail names
            <span className="text-accent">.</span>
          </h3>
        </div>
        <p className="hidden md:block text-sm text-black/60 max-w-xs">
          Delivering signage & print rollouts for national retail chains across
          eastern India.
        </p>
      </div>

      <div className="mask-fade-x">
        <Marquee gradient={false} speed={45} pauseOnHover>
          {CLIENTS.concat(CLIENTS).map((c, i) => (
            <div
              key={i}
              data-testid={`client-item-${i}`}
              className="flex items-center gap-8 px-10 py-4"
            >
              <span className="font-display font-black text-3xl md:text-5xl lg:text-6xl tracking-tighter text-black/70 hover:text-accent transition-colors">
                {c}
              </span>
              <span className="w-2 h-2 bg-accent rotate-45" />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
