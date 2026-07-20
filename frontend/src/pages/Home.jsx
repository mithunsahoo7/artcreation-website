import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import RevealLines from "../components/RevealLines";
import Reveal from "../components/Reveal";
import ClientMarquee from "../components/ClientMarquee";
import EditorialTicker from "../components/EditorialTicker";
import { SERVICES, MANIFESTO, PORTFOLIO, INFRA, STATS } from "../data/content";

/* ---------- HERO ---------- */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const opts = { hour: "2-digit", minute: "2-digit", hour12: false };
      setTime(
        d.toLocaleTimeString("en-IN", {
          ...opts,
          timeZone: "Asia/Kolkata",
        }) + " IST"
      );
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={ref}
      data-testid="hero"
      className="relative min-h-[100svh] pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-white grain"
    >
      {/* Top meta bar */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex items-center justify-between text-[11px] font-mono-tag uppercase tracking-[0.25em] text-black/60">
        <span>Kolkata · India — 22.57° N, 88.36° E</span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-accent rounded-full blink" />
          Studio online · {time}
        </span>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mt-12 md:mt-16 grid grid-cols-12 gap-6 md:gap-10 items-end">
        {/* Kinetic headline */}
        <div className="col-span-12 lg:col-span-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="overline mb-6 md:mb-10"
          >
            <span className="text-accent">●</span> End-to-End Printing &amp;
            Signage Execution Partner
          </motion.p>

          <RevealLines
            as="h1"
            dataTestId="hero-headline"
            className="font-display font-black leading-[0.88] tracking-tighter text-[15vw] md:text-[10.5vw] lg:text-[9vw]"
            lines={[
              "We build",
              <>
                the <span className="text-accent italic font-medium">store-</span>
              </>,
              "front.",
            ]}
          />
        </div>

        {/* Right column: image + stat */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <motion.div
            style={{ y, scale }}
            className="img-frame aspect-[4/5] w-full"
          >
            <motion.img
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
              src="https://images.unsplash.com/photo-1564419965579-5da68ffdf3af?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHw0fHxyZXRhaWwlMjBzdG9yZSUyMHN0b3JlZnJvbnQlMjBicmFuZGluZyUyMGZhY2FkZXxlbnwwfHx8fDE3ODQ1NzQyODN8MA&ixlib=rb-4.1.0&q=85"
              alt="Retail storefront branding"
              className="grayscale-[0.15]"
            />
            <div className="absolute left-4 top-4 bg-white/95 px-2 py-1 font-mono-tag text-[10px] tracking-widest">
              CASE · 034 / KOLKATA
            </div>
          </motion.div>

          <Reveal delay={0.5}>
            <p className="text-lg text-black/70 leading-relaxed max-w-md">
              End-to-end signage, glow sign fabrication, flex &amp;
              large-format print, and retail rollouts — engineered for the
              country&apos;s most demanding brands.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                to="/contact"
                data-testid="hero-quote-btn"
                className="btn btn-accent"
              >
                Get a quote <ArrowRight size={16} />
              </Link>
              <Link
                to="/portfolio"
                data-testid="hero-work-btn"
                className="btn btn-outline"
              >
                See our work
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom stats row */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-hair pt-8">
        {STATS.map((s, i) => (
          <Reveal key={s.k} delay={0.1 * i}>
            <div className="flex flex-col">
              <span className="font-display text-4xl md:text-5xl font-black tracking-tight">
                {s.v}
              </span>
              <span className="mt-2 text-xs uppercase tracking-widest text-black/50">
                {s.k}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- MANIFESTO ---------- */
function Manifesto() {
  return (
    <section
      data-testid="manifesto"
      className="bg-white py-24 md:py-40 relative"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 md:gap-10 mb-16">
          <p className="col-span-12 md:col-span-2 overline">Manifesto</p>
          <div className="col-span-12 md:col-span-10">
            <Reveal>
              <h2 className="font-display font-black tracking-tighter text-5xl md:text-7xl lg:text-8xl leading-[0.9]">
                We are the crew behind
                <br />
                <span className="text-accent italic font-medium">
                  the brand.
                </span>
              </h2>
            </Reveal>
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
          {MANIFESTO.map((m, i) => (
            <Reveal key={m.n} delay={0.06 * i}>
              <li
                data-testid={`manifesto-${m.n}`}
                className={`grid grid-cols-12 gap-6 ${
                  i % 2 === 1 ? "md:mt-16" : ""
                }`}
              >
                <div className="col-span-2">
                  <span className="font-mono-tag text-sm text-accent">
                    ({m.n})
                  </span>
                </div>
                <div className="col-span-10">
                  <h3 className="font-display text-2xl md:text-3xl font-black tracking-tight">
                    {m.title}
                  </h3>
                  <p className="mt-4 text-black/70 leading-relaxed max-w-md">
                    {m.body}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- SERVICES BENTO ---------- */
function ServicesGrid() {
  const spans = [
    "md:col-span-7 md:row-span-2",
    "md:col-span-5",
    "md:col-span-5",
    "md:col-span-4",
    "md:col-span-4",
    "md:col-span-4",
  ];
  return (
    <section
      data-testid="services-grid"
      className="bg-alt py-24 md:py-40 border-y border-hair"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <div>
            <p className="overline">What we execute</p>
            <h2 className="font-display font-black tracking-tighter text-4xl md:text-6xl lg:text-7xl leading-[0.9] mt-4">
              Six disciplines,
              <br />
              one crew<span className="text-accent">.</span>
            </h2>
          </div>
          <Link
            to="/services"
            data-testid="services-all-link"
            className="btn btn-outline"
          >
            All services <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 md:auto-rows-[300px] gap-4">
          {SERVICES.map((s, i) => (
            <Reveal
              key={s.id}
              delay={0.05 * i}
              className={`${spans[i]} col-span-1`}
            >
              <Link
                to="/services"
                data-testid={`service-card-${s.id}`}
                className="group relative block h-full border border-hair bg-white overflow-hidden"
              >
                <div className="img-frame absolute inset-0">
                  <img src={s.image} alt={s.title} />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/50 transition-colors duration-500" />
                </div>
                <div className="relative h-full flex flex-col justify-between p-6 md:p-8 text-white">
                  <div className="flex items-start justify-between">
                    <span className="font-mono-tag text-xs tracking-widest">
                      {s.number} / SERVICE
                    </span>
                    <ArrowUpRight
                      size={22}
                      className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500"
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-black tracking-tighter text-3xl md:text-4xl lg:text-5xl leading-[0.95]">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-white/80 text-sm max-w-md">
                      {s.tagline}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- INFRA TEASER ---------- */
function InfraTeaser() {
  return (
    <section
      data-testid="infra-teaser"
      className="relative bg-white py-24 md:py-40"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-6 md:gap-12 items-center">
        <div className="col-span-12 md:col-span-6 order-2 md:order-1">
          <Reveal>
            <p className="overline">Owned Infrastructure</p>
            <h2 className="font-display font-black tracking-tighter text-5xl md:text-7xl lg:text-8xl leading-[0.9] mt-6">
              <span className="text-accent">Latex.</span>
              <br />
              Solvent.
              <br />
              UV.
            </h2>
            <p className="mt-8 text-lg text-black/70 max-w-md leading-relaxed">
              Three print technologies, one production floor. From
              indoor-safe latex décor to weather-tough solvent hoardings and
              rigid UV signage — every job stays in-house.
            </p>
            <Link
              to="/infrastructure"
              data-testid="infra-teaser-link"
              className="btn btn-primary mt-8"
            >
              Tour the floor <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-6 order-1 md:order-2 grid grid-cols-6 grid-rows-6 gap-3 h-[70svh]">
          <div className="col-span-4 row-span-4 img-frame">
            <img src={INFRA[0].image} alt="Latex printer" />
          </div>
          <div className="col-span-2 row-span-3 img-frame">
            <img src={INFRA[1].image} alt="Solvent bank" />
          </div>
          <div className="col-span-2 row-span-3 img-frame">
            <img src={INFRA[2].image} alt="UV printer" />
          </div>
          <div className="col-span-4 row-span-2 bg-black text-white p-6 flex flex-col justify-between">
            <span className="overline text-white/60">Print capacity</span>
            <span className="font-display font-black text-4xl md:text-5xl tracking-tight leading-[0.95]">
              12,000 <br />
              <span className="text-accent">sq.ft / day</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CASE STUDIES ---------- */
function CaseStudies() {
  const feat = PORTFOLIO.slice(0, 4);
  return (
    <section
      data-testid="case-studies"
      className="bg-alt py-24 md:py-40 border-y border-hair"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <p className="overline">Case Studies</p>
            <h2 className="font-display font-black tracking-tighter text-4xl md:text-6xl lg:text-7xl leading-[0.9] mt-4">
              Retail work,
              <br />
              across the East.
            </h2>
          </div>
          <Link
            to="/portfolio"
            data-testid="case-all-link"
            className="btn btn-outline"
          >
            View portfolio <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {feat.map((p, i) => (
            <Reveal key={p.slug} delay={0.06 * i}>
              <Link
                to="/portfolio"
                data-testid={`case-${p.slug}`}
                className={`group block ${i === 1 ? "md:mt-24" : ""}`}
              >
                <div className="img-frame aspect-[4/5] md:aspect-[5/6]">
                  <img src={p.image} alt={p.title} />
                </div>
                <div className="flex items-start justify-between mt-5">
                  <div>
                    <p className="font-mono-tag text-[11px] tracking-widest uppercase text-black/60">
                      {p.brand} · {p.year}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl font-black mt-2 tracking-tight max-w-md">
                      {p.title}
                    </h3>
                    <p className="text-sm text-black/60 mt-2">{p.location}</p>
                  </div>
                  <ArrowUpRight
                    size={22}
                    className="mt-1 opacity-70 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
function CTA() {
  return (
    <section
      data-testid="home-cta"
      className="bg-accent text-white py-24 md:py-40"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-9">
          <Reveal>
            <p className="overline text-white/70">Next storefront</p>
            <h2 className="font-display font-black tracking-tighter text-5xl md:text-7xl lg:text-9xl leading-[0.88] mt-6">
              Let&apos;s build
              <br />
              yours.
            </h2>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-3 flex md:justify-end items-end">
          <Reveal delay={0.15}>
            <Link
              to="/contact"
              data-testid="cta-quote-link"
              className="btn bg-black text-white hover:bg-white hover:text-black"
            >
              Get a quote <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <ClientMarquee />
      <Manifesto />
      <ServicesGrid />
      <EditorialTicker />
      <InfraTeaser />
      <CaseStudies />
      <CTA />
    </>
  );
}
