"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  label?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
}

export default function PageHero({ label, title, titleHighlight, subtitle }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 bg-ink-100 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-ink-DEFAULT" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-40 h-40 border border-red-600/10 rounded-full" />
      <div className="absolute top-24 right-14 w-28 h-28 border border-red-600/15 rounded-full" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border border-white/5 rotate-45" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {label && (
            <p className="text-red-500 text-xs sm:text-sm font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-red-600/40" />
              {label}
            </p>
          )}

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-wider leading-none text-white">
            {title}
            {titleHighlight && (
              <>
                {" "}
                <span className="text-red-600">{titleHighlight}</span>
              </>
            )}
          </h1>

          {subtitle && (
            <p className="mt-5 text-base sm:text-lg text-white/50 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}

          <div className="mt-5 h-1 w-16 bg-red-600 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
