import React from "react";
import { motion } from "framer-motion";

export default function Reveal({
  children,
  y = 30,
  delay = 0,
  duration = 0.7,
  once = true,
  className = "",
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.2, 0.8, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
