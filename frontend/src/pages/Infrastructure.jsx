import React from "react";
import RevealLines from "../components/RevealLines";
import Reveal from "../components/Reveal";
import EditorialTicker from "../components/EditorialTicker";
import { INFRA } from "../data/content";

export default function Infrastructure() {
  return (
    <>
      <section className="pt-40 pb-16 md:pt-52 md:pb-24 bg-white grain relative">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <p className="overline mb-8">Infrastructure · The production floor</p>
          <RevealLines
            as="h1"
            dataTestId="infra-title"
            className="font-display font-black leading-[0.9] tracking-tighter text-6xl md:text-8xl lg:text-9xl"
            lines={[
              "Machines",
              <>we <span className="text-accent italic font-medium">run.</span></>,
            ]}
          />
          <div className="grid grid-cols-12 gap-10 mt-12">
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <Reveal>
                <p className="text-lg text-black/70 leading-relaxed">
                  Three print technologies, one Kolkata production floor.
                  Fabrication, finishing and quality control are all in-house —
                  so we own every step from artwork approval to install.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <EditorialTicker items={["Latex", "Solvent", "UV Flatbed", "ACP Fabrication", "Vinyl Cutting", "Structural Steel"]} />

      <section className="bg-white">
        {INFRA.map((m, i) => (
          <div
            key={m.tag}
            data-testid={`infra-block-${m.tag.toLowerCase()}`}
            className={`border-b border-hair ${i % 2 === 1 ? "bg-alt" : ""}`}
          >
            <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-20 md:py-32 grid grid-cols-12 gap-6 md:gap-12 items-center">
              <div className={`col-span-12 md:col-span-6 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <Reveal>
                  <div className="img-frame aspect-[4/3]">
                    <img src={m.image} alt={m.title} />
                    <div className="absolute left-4 top-4 bg-white px-3 py-1.5 font-mono-tag text-xs tracking-widest">
                      {m.tag} · {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                </Reveal>
              </div>
              <div className={`col-span-12 md:col-span-6 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <Reveal delay={0.1}>
                  <span className="font-mono-tag text-accent text-xs tracking-widest">
                    ({String(i + 1).padStart(2, "0")}) / {m.tag}
                  </span>
                  <h2 className="font-display font-black tracking-tighter text-4xl md:text-6xl lg:text-7xl leading-[0.9] mt-4">
                    {m.title}
                  </h2>
                  <p className="mt-6 text-lg text-black/70 max-w-xl leading-relaxed">
                    {m.body}
                  </p>
                  <dl className="mt-8 border-t border-black">
                    {m.spec.map((s) => (
                      <div
                        key={s.k}
                        className="grid grid-cols-12 border-b border-hair py-4 gap-4"
                      >
                        <dt className="col-span-4 font-mono-tag text-[11px] tracking-widest uppercase text-black/60">
                          {s.k}
                        </dt>
                        <dd className="col-span-8 text-base md:text-lg font-display font-black">
                          {s.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="py-24 md:py-32 bg-dark text-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <Reveal>
              <p className="overline text-white/60">Capacity</p>
              <h2 className="font-display font-black tracking-tighter text-5xl md:text-7xl lg:text-8xl leading-[0.9] mt-6">
                12,000 <span className="text-accent">sq.ft</span>
                <br />
                per day.
              </h2>
              <p className="mt-6 text-white/70 max-w-xl text-lg">
                Sustained combined print throughput across our latex, solvent
                and UV lines — with an in-house fabrication bay for ACP,
                acrylic and metal signage.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
