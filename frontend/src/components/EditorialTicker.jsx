import React from "react";

/**
 * A slow, editorial ticker of headline copy — CSS animated, purposefully
 * lo-fi in feel.
 */
export default function EditorialTicker({
  items = [
    "Retail Store Branding",
    "Glow Sign Boards",
    "Flex & Vinyl",
    "Backlit Fabric",
    "Hoardings",
    "UV · Solvent · Latex",
  ],
}) {
  const doubled = [...items, ...items];
  return (
    <div
      data-testid="editorial-ticker"
      className="bg-dark text-white py-6 md:py-8 overflow-hidden border-y border-white/10"
    >
      <div className="ticker-track">
        {doubled.map((it, i) => (
          <span
            key={i}
            className="flex items-center gap-8 pr-8 font-display font-black text-4xl md:text-6xl lg:text-7xl tracking-tighter whitespace-nowrap"
          >
            <span className="text-white">{it}</span>
            <span className="inline-block w-3 h-3 bg-accent rounded-full" />
          </span>
        ))}
      </div>
    </div>
  );
}
