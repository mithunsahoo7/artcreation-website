import React from "react";
import { motion } from "framer-motion";

/**
 * Masked line-by-line reveal.
 * Each line is wrapped in an overflow-hidden container and translated in
 * from below.
 */
export default function RevealLines({
  lines = [],
  delay = 0,
  stagger = 0.08,
  className = "",
  lineClassName = "",
  as: Tag = "h1",
  dataTestId,
}) {
  return (
    <Tag data-testid={dataTestId} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className={`block overflow-hidden ${lineClassName}`}
          style={{ lineHeight: 0.95 }}
        >
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.9,
              ease: [0.2, 0.8, 0.2, 1],
              delay: delay + i * stagger,
            }}
            className="block"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
