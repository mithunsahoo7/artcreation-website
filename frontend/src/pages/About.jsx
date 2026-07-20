import React from "react";
import { Link } from "react-router-dom";
import RevealLines from "../components/RevealLines";
import Reveal from "../components/Reveal";
import EditorialTicker from "../components/EditorialTicker";
import { STATS } from "../data/content";

const TIMELINE = [
  { y: "2010", t: "Founded in Kolkata", d: "Started as a two-machine print shop off B.T. Road." },
  { y: "2014", t: "First national retail rollout", d: "Executed a 12-city façade rebranding project across East India." },
  { y: "2018", t: "Latex + UV floor added", d: "Brought indoor-safe latex and flatbed UV in-house." },
  { y: "2021", t: "40+ retail brands", d: "Cross the 40-brand mark and 25+ cities in the East." },
  { y: "2024", t: "1,200+ stores delivered", d: "Turnkey signage & rollout for the country's biggest names." },
];

const PILLARS = [
  { t: "Vendor-first mindset", d: "We do not compete with our clients' agencies or designers. We are the executor." },
  { t: "Owned production", d: "Latex, Solvent and UV printing under one roof — no outsourced surprises." },
  { t: "Documented process", d: "Every site is surveyed, measured, quoted and signed off. Every install is photo-reported." },
  { t: "Local install crews", d: "Trained applicators for vinyl, ACP fabrication and outdoor structural work." },
];

export default function About() {
  return (
    <>
      <section className="pt-40 pb-24 md:pt-52 md:pb-32 bg-white relative grain">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <p className="overline mb-8">About · Art Creation</p>
          <RevealLines
            as="h1"
            dataTestId="about-title"
            className="font-display font-black leading-[0.9] tracking-tighter text-6xl md:text-8xl lg:text-9xl"
            lines={[
              "Fourteen years",
              <>
                behind the <span className="text-accent italic font-medium">brand.</span>
              </>,
            ]}
          />
          <div className="grid grid-cols-12 gap-6 md:gap-10 mt-16">
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <Reveal>
                <p className="text-lg text-black/70 leading-relaxed">
                  Art Creation is a Kolkata-based print &amp; signage execution
                  company. We work as a silent vendor for retail brands —
                  fabricating, printing, and installing the storefronts, in-store
                  graphics and hoardings you see every day across eastern India.
                </p>
                <p className="mt-6 text-lg text-black/70 leading-relaxed">
                  We do not design campaigns. We deliver them. On brief, on
                  budget, on the day the store opens.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-alt border-y border-hair py-20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <Reveal key={s.k}>
              <div>
                <span className="font-display text-5xl md:text-7xl font-black tracking-tighter">
                  {s.v}
                </span>
                <span className="block mt-3 overline">{s.k}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <p className="col-span-12 md:col-span-2 overline">How we work</p>
          <div className="col-span-12 md:col-span-10">
            <Reveal>
              <h2 className="font-display font-black tracking-tighter text-4xl md:text-6xl lg:text-7xl leading-[0.9]">
                Four pillars<span className="text-accent">.</span>
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 mt-14">
              {PILLARS.map((p, i) => (
                <Reveal key={p.t} delay={0.05 * i}>
                  <div className="border-t border-hair pt-6">
                    <span className="font-mono-tag text-accent text-xs">
                      ({String(i + 1).padStart(2, "0")})
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-black mt-4 tracking-tight">
                      {p.t}
                    </h3>
                    <p className="mt-3 text-black/70 max-w-md leading-relaxed">
                      {p.d}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <EditorialTicker items={["Kolkata Studio", "East India Coverage", "40+ Retail Partners", "1200+ Stores", "Since 2010"]} />

      <section className="py-24 md:py-32 bg-alt border-y border-hair">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-6 md:gap-10">
          <p className="col-span-12 md:col-span-2 overline">Timeline</p>
          <div className="col-span-12 md:col-span-10">
            <ul className="space-y-10">
              {TIMELINE.map((e, i) => (
                <Reveal key={e.y} delay={0.05 * i}>
                  <li data-testid={`timeline-${e.y}`} className="grid grid-cols-12 gap-6 border-t border-hair pt-8">
                    <div className="col-span-3 md:col-span-2">
                      <span className="font-display text-3xl md:text-5xl font-black text-accent tracking-tighter">{e.y}</span>
                    </div>
                    <div className="col-span-9 md:col-span-10">
                      <h3 className="font-display text-2xl md:text-3xl font-black tracking-tight">{e.t}</h3>
                      <p className="mt-2 text-black/70 max-w-2xl">{e.d}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex flex-wrap gap-6 items-end justify-between">
          <Reveal>
            <h2 className="font-display font-black tracking-tighter text-4xl md:text-6xl">
              Bring us the brief.
            </h2>
          </Reveal>
          <Link to="/contact" data-testid="about-cta" className="btn btn-accent">
            Start a project →
          </Link>
        </div>
      </section>
    </>
  );
}
