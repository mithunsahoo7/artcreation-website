import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import RevealLines from "../components/RevealLines";
import Reveal from "../components/Reveal";
import { SERVICES } from "../data/content";

export default function Services() {
  return (
    <>
      <section className="pt-40 pb-16 md:pt-52 md:pb-24 bg-white grain relative">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <p className="overline mb-8">Services · Six disciplines</p>
          <RevealLines
            as="h1"
            dataTestId="services-title"
            className="font-display font-black leading-[0.9] tracking-tighter text-6xl md:text-8xl lg:text-9xl"
            lines={[
              "Everything on",
              <>the <span className="text-accent italic font-medium">shopfront.</span></>,
            ]}
          />
          <div className="grid grid-cols-12 gap-6 md:gap-10 mt-16">
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <Reveal>
                <p className="text-lg text-black/70 leading-relaxed">
                  From acrylic letters at the fascia to the last vinyl on the
                  window — we execute every touchpoint of retail signage under
                  a single scope of work.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pb-24 md:pb-40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <ul className="border-t border-black">
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={0.03 * i}>
                <li
                  data-testid={`service-row-${s.id}`}
                  className={`group grid grid-cols-12 gap-4 md:gap-8 py-10 md:py-14 border-b border-hair items-center relative overflow-hidden ${
                    i % 2 === 1 ? "bg-alt" : ""
                  }`}
                >
                  <div className="col-span-2 md:col-span-1">
                    <span className="font-mono-tag text-accent text-sm">
                      {s.number}
                    </span>
                  </div>
                  <div className="col-span-10 md:col-span-5">
                    <h2 className="font-display font-black tracking-tighter text-4xl md:text-6xl lg:text-7xl leading-[0.95] group-hover:text-accent transition-colors">
                      {s.title}
                    </h2>
                    <p className="mt-3 md:mt-5 text-black/70 max-w-lg">
                      {s.body}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 font-mono-tag text-xs uppercase tracking-widest text-black/60">
                      {s.tagline}
                    </span>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <div className="img-frame aspect-[16/10]">
                      <img src={s.image} alt={s.title} />
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-accent text-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-9">
            <Reveal>
              <p className="overline text-white/70">One vendor</p>
              <h2 className="font-display font-black tracking-tighter text-5xl md:text-7xl lg:text-8xl leading-[0.9] mt-6">
                Single-scope
                <br />
                execution.
              </h2>
              <p className="mt-6 text-white/80 max-w-xl text-lg">
                One PO, one contact, one crew — from concept adaptation to the
                final photo report on install.
              </p>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-3 flex md:justify-end items-end">
            <Link to="/contact" data-testid="services-cta" className="btn bg-black text-white hover:bg-white hover:text-black">
              Request scope <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
