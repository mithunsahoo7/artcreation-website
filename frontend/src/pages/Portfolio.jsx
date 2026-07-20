import React, { useState } from "react";
import RevealLines from "../components/RevealLines";
import Reveal from "../components/Reveal";
import { PORTFOLIO } from "../data/content";

const FILTERS = ["All", "Retail", "Signage", "OOH", "Fabric"];

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const items = PORTFOLIO;

  return (
    <>
      <section className="pt-40 pb-16 md:pt-52 md:pb-24 bg-white grain relative">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <p className="overline mb-8">Portfolio · Selected work</p>
          <RevealLines
            as="h1"
            dataTestId="portfolio-title"
            className="font-display font-black leading-[0.9] tracking-tighter text-6xl md:text-8xl lg:text-9xl"
            lines={[
              "The work",
              <>speaks<span className="text-accent italic font-medium"> loudest.</span></>,
            ]}
          />
        </div>
      </section>

      <section className="bg-white pb-24 md:pb-40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <div className="flex flex-wrap gap-2 border-y border-hair py-4">
            {FILTERS.map((f) => (
              <button
                key={f}
                data-testid={`filter-${f.toLowerCase()}`}
                onClick={() => setActive(f)}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-mono-tag transition-colors ${
                  active === f
                    ? "bg-black text-white"
                    : "text-black/60 hover:text-black"
                }`}
              >
                {f}
              </button>
            ))}
            <span className="ml-auto text-xs uppercase tracking-widest text-black/40 self-center font-mono-tag">
              {items.length} projects
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mt-10">
            {items.map((p, i) => {
              const isWide = i % 5 === 0 || i % 5 === 3;
              const col = isWide ? "md:col-span-8" : "md:col-span-4";
              const offset = i % 3 === 1 ? "md:mt-20" : i % 3 === 2 ? "md:mt-8" : "";
              return (
                <Reveal
                  key={p.slug}
                  delay={0.03 * i}
                  className={`${col} col-span-1 ${offset}`}
                >
                  <article
                    data-testid={`portfolio-${p.slug}`}
                    className="group"
                  >
                    <div className={`img-frame ${isWide ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
                      <img src={p.image} alt={p.title} />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                      <div className="absolute left-4 top-4 flex gap-2">
                        {p.scope.map((s) => (
                          <span
                            key={s}
                            className="bg-white/90 px-2 py-1 font-mono-tag text-[10px] tracking-widest uppercase"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-start justify-between mt-5 gap-4">
                      <div>
                        <p className="font-mono-tag text-[11px] tracking-widest uppercase text-black/60">
                          {p.brand} · {p.year} · {p.location}
                        </p>
                        <h3 className="font-display text-2xl md:text-3xl font-black tracking-tight mt-2">
                          {p.title}
                        </h3>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
