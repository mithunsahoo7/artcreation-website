import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { CONTACT } from "../data/content";

export default function FloatingActions() {
  return (
    <div
      data-testid="floating-actions"
      className="fixed bottom-5 right-5 z-40 flex flex-col gap-3"
    >
      <motion.a
        data-testid="float-whatsapp"
        href={CONTACT.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Art Creation"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        whileHover={{ scale: 1.08 }}
        className="w-14 h-14 flex items-center justify-center bg-[#25D366] text-white rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.35)]"
      >
        <MessageCircle size={22} />
      </motion.a>

      <motion.a
        data-testid="float-call"
        href={CONTACT.phoneHref}
        aria-label="Call Art Creation"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.15, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        whileHover={{ scale: 1.08 }}
        className="w-14 h-14 flex items-center justify-center bg-accent text-white rounded-full shadow-[0_10px_30px_rgba(229,38,31,0.35)]"
      >
        <Phone size={20} />
      </motion.a>
    </div>
  );
}
