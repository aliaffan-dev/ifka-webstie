"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  label,
  title,
  titleHighlight,
  subtitle,
  center = false,
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${center ? "text-center" : ""}`}
    >
      {label && (
        <p className="text-red-500 text-sm font-bold tracking-[0.3em] uppercase mb-3 flex items-center gap-2">
          {center && <span className="flex-1 h-px bg-red-600/20 max-w-16 inline-block" />}
          {label}
          {center && <span className="flex-1 h-px bg-red-600/20 max-w-16 inline-block" />}
          {!center && <span className="w-8 h-px bg-red-600/40 inline-block" />}
        </p>
      )}

      <h2
        className={`font-display text-4xl sm:text-5xl lg:text-6xl tracking-wider leading-none ${
          light ? "text-white" : "text-white"
        }`}
      >
        {title}
        {titleHighlight && (
          <>
            {" "}
            <span className="text-red-600">{titleHighlight}</span>
          </>
        )}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed max-w-2xl ${
            center ? "mx-auto" : ""
          } ${light ? "text-white/60" : "text-white/50"}`}
        >
          {subtitle}
        </p>
      )}

      <div className={`mt-4 h-1 w-16 bg-red-600 rounded-full ${center ? "mx-auto" : ""}`} />
    </motion.div>
  );
}
