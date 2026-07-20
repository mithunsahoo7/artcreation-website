import React from "react";
import { Link } from "react-router-dom";
import { CONTACT, NAV } from "../data/content";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="bg-dark text-white relative overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 pt-24 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-6">
            <p className="overline text-white/60">Signage · Print · Rollout</p>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mt-6">
              Build the
              <br />
              storefront.
              <span className="text-accent">_</span>
            </h2>
            <p className="mt-8 max-w-md text-white/70 text-lg">
              A Kolkata-based execution partner for the country&apos;s most
              recognised retail brands. Turnkey signage & large-format
              production, delivered on schedule.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                data-testid="footer-whatsapp"
                href={CONTACT.whatsappHref}
                className="btn btn-accent"
              >
                WhatsApp us
              </a>
              <a
                data-testid="footer-call"
                href={CONTACT.phoneHref}
                className="btn border border-white/30 text-white hover:bg-white hover:text-black"
              >
                {CONTACT.phone}
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="overline text-white/60">Sitemap</p>
            <ul className="mt-6 space-y-3">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    data-testid={`footer-link-${n.label.toLowerCase()}`}
                    className="text-white/80 hover:text-accent transition-colors"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/login"
                  data-testid="footer-link-admin"
                  className="text-white/50 hover:text-accent text-xs"
                >
                  Studio sign in
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="overline text-white/60">Studio</p>
            <address className="not-italic mt-6 text-white/80 leading-relaxed">
              {CONTACT.address}
              <br />
              <a
                href={`mailto:${CONTACT.email}`}
                className="link-underline"
                data-testid="footer-email"
              >
                {CONTACT.email}
              </a>
              <br />
              <a href={CONTACT.phoneHref} className="link-underline">
                {CONTACT.phone}
              </a>
            </address>
            {CONTACT.placeholder && (
              <p className="mt-4 text-[11px] text-white/40">
                * Contact details are placeholders.
              </p>
            )}
          </div>
        </div>

        <div className="mt-20 pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Art Creation. Executing retail visions
            from Kolkata.
          </p>
          <p className="font-mono-tag text-[10px] tracking-[0.3em] uppercase text-white/40">
            EST · KOLKATA · IN
          </p>
        </div>
      </div>
    </footer>
  );
}
