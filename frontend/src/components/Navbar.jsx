import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { NAV, CONTACT } from "../data/content";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        data-testid="site-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md border-b border-hair"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-4 md:py-5 flex items-center justify-between">
          <Link
            to="/"
            data-testid="nav-logo"
            className="flex items-center gap-2 group"
          >
            <span className="inline-block w-2.5 h-2.5 bg-accent" />
            <span className="font-display text-lg md:text-xl font-black tracking-tight">
              Art Creation<span className="text-accent">.</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                data-testid={`nav-link-${item.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `text-[13px] tracking-wide link-underline uppercase font-medium ${
                    isActive ? "text-accent" : "text-black"
                  }`
                }
              >
                <span className="font-mono-tag text-[10px] opacity-60 mr-1">
                  {String(i).padStart(2, "0")}
                </span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={CONTACT.phoneHref}
              data-testid="nav-call-btn"
              className="hidden md:inline-flex btn btn-accent"
            >
              <Phone size={14} />
              <span>Call now</span>
            </a>
            <button
              data-testid="nav-menu-toggle"
              aria-label="Menu"
              onClick={() => setOpen((s) => !s)}
              className="lg:hidden p-2 border border-hair"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white lg:hidden pt-24 px-6"
          >
            <ul className="flex flex-col gap-2">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.to}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    data-testid={`mobile-nav-link-${item.label.toLowerCase()}`}
                    className="flex items-baseline gap-4 py-4 border-b border-hair"
                  >
                    <span className="font-mono-tag text-xs opacity-50">
                      {String(i).padStart(2, "0")}
                    </span>
                    <span className="font-display text-3xl font-black">
                      {item.label}
                    </span>
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <a
              href={CONTACT.whatsappHref}
              data-testid="mobile-whatsapp-btn"
              className="btn btn-accent mt-8"
            >
              WhatsApp us →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
