"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Star, Shield, Trophy, Users, MapPin, Zap, Phone, Target, Eye } from "lucide-react";
import { stats, whyChoose, classes, instructors, testimonials } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function StatCounter({ value, label }: { value: string; label: string }) {
  const [count, setCount] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !animated) {
        setAnimated(true);
        const num = parseInt(value.replace(/\D/g, ""));
        const suffix = value.replace(/[0-9]/g, "");
        let cur = 0;
        const tick = setInterval(() => {
          cur += Math.ceil(num / (1500 / 16));
          if (cur >= num) { setCount(value); clearInterval(tick); }
          else setCount(cur + suffix);
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, animated]);
  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl sm:text-5xl text-white tracking-wider">{count}</p>
      <p className="text-white/60 text-sm font-medium mt-1 tracking-wide">{label}</p>
    </div>
  );
}

const whyIcons = [Users, Star, Zap, Trophy, Shield, MapPin];

function IFKALogoBadge({ className = "" }: { className?: string }) {
  const [err, setErr] = useState(false);
  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      {!err ? (
        <img
          src="/logo.png"
          alt="IFKA Logo"
          className="w-full h-full object-contain"
          onError={() => setErr(true)}
        />
      ) : (
        <div className="w-full h-full rounded-full bg-red-800 flex flex-col items-center justify-center gap-2 ring-4 ring-red-600/30">
          <span className="font-display text-white text-4xl tracking-wider">IFKA</span>
          <span className="text-white/60 text-xs tracking-widest">KARATE ACADEMY</span>
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrentTestimonial(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-white">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16 lg:pt-20">

        {/* ── Animated background layer ── */}
        <div className="absolute inset-0 grid-pattern pointer-events-none opacity-70" />

        {/* Ghost IFKA watermark */}
        <motion.div
          className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 1.4, ease: "easeOut" }}
        >
          <span className="font-display text-[22vw] text-gray-100 tracking-wider leading-none pr-4 lg:pr-10">
            IFKA
          </span>
        </motion.div>

        {/* Animated diagonal red accent lines — top-right */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
          {[
            { w: 160, top: "8%",  right: "2%",  delay: 0.15 },
            { w: 220, top: "15%", right: "5%",  delay: 0.23 },
            { w: 180, top: "22%", right: "0%",  delay: 0.31 },
            { w: 260, top: "30%", right: "8%",  delay: 0.38 },
            { w: 140, top: "38%", right: "3%",  delay: 0.45 },
            { w: 200, top: "46%", right: "12%", delay: 0.52 },
          ].map((line, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-red-300/50 origin-right"
              style={{ width: line.w, top: line.top, right: line.right, rotate: "45deg" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: line.delay, duration: 0.65, ease: "easeOut" }}
            />
          ))}
        </div>

        {/* Red geometric accent shapes — desktop only */}
        <motion.div
          className="absolute top-24 right-16 w-56 h-56 border border-red-200 rounded-full pointer-events-none hidden md:block"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
        />
        <motion.div
          className="absolute top-28 right-20 w-36 h-36 border border-red-100 rounded-full pointer-events-none hidden md:block"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
        />
        <motion.div
          className="absolute bottom-24 right-10 w-20 h-20 bg-red-600/6 rounded-2xl pointer-events-none"
          initial={{ scale: 0, rotate: 0, opacity: 0 }}
          animate={{ scale: 1, rotate: 20, opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.7 }}
        />
        <motion.div
          className="absolute bottom-40 left-10 w-12 h-12 bg-red-600/8 rounded-xl pointer-events-none"
          initial={{ scale: 0, rotate: 0, opacity: 0 }}
          animate={{ scale: 1, rotate: -15, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        />
        {/* Bottom-right triangle accent */}
        <motion.div
          className="absolute bottom-0 right-0 pointer-events-none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          style={{
            width: 0, height: 0,
            borderBottom: "180px solid rgba(220,38,38,0.07)",
            borderLeft: "180px solid transparent",
          }}
        />

        {/* ── Main content ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12 lg:py-16">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 lg:gap-16 md:min-h-[calc(100vh-5rem)]">

            {/* LEFT — Logo badge */}
            <motion.div
              className="relative flex-shrink-0 z-10 mt-4 md:mt-0"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.75, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {/* Outer slow-spin dashed ring */}
              <motion.div
                className="absolute -inset-3 sm:-inset-4 rounded-full border-2 border-red-300 border-dashed"
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              />
              {/* Inner counter-spin ring — sm+ only */}
              <motion.div
                className="absolute -inset-7 sm:-inset-9 rounded-full border border-red-200 border-dashed hidden sm:block"
                animate={{ rotate: -360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              />

              {/* Logo — responsive size */}
              <div className="relative z-10">
                <IFKALogoBadge className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-[230px] lg:h-[230px]" />
              </div>

              {/* Floating Kerala badge */}
              <motion.div
                className="absolute -bottom-2 -right-3 sm:-right-4 bg-red-600 text-white text-[10px] sm:text-xs font-bold tracking-wider px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg shadow-red-200 whitespace-nowrap z-20"
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              >
                KERALA, INDIA
              </motion.div>
            </motion.div>

            {/* RIGHT — Text content */}
            <div className="relative z-10 text-center md:text-left flex-1 max-w-2xl mx-auto md:mx-0">

              {/* Label */}
              <motion.p
                className="text-red-600 text-xs font-bold tracking-[0.4em] uppercase mb-5 flex items-center gap-2 justify-center md:justify-start"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                <span className="w-8 h-px bg-red-600 hidden sm:inline-block" />
                Since 2004 · Malappuram &amp; Palakkad
              </motion.p>

              {/* Staggered headline — each word slides up independently */}
              <div className="overflow-hidden">
                {[
                  { text: "IRON FIST", color: "text-gray-900" },
                  { text: "KARATE",    color: "text-red-600" },
                  { text: "ACADEMY",  color: "text-gray-900" },
                ].map((line, i) => (
                  <div key={line.text} className="overflow-hidden leading-none">
                    <motion.span
                      className={`font-display tracking-wider block ${line.color}`}
                      style={{ fontSize: "clamp(3rem, 8.5vw, 7.5rem)" }}
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{ delay: 0.55 + i * 0.13, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      {line.text}
                    </motion.span>
                  </div>
                ))}
              </div>

              {/* Red underline bar — draws in from left */}
              <motion.div
                className="mt-4 h-1.5 bg-red-600 rounded-full origin-left mx-auto md:mx-0"
                style={{ width: "4rem" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.0, duration: 0.45, ease: "easeOut" }}
              />

              {/* Tagline */}
              <motion.p
                className="mt-4 text-base sm:text-lg text-gray-400 font-medium tracking-[0.1em] sm:tracking-[0.2em]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05, duration: 0.5 }}
              >
                DISCIPLINE. STRENGTH. EXCELLENCE.
              </motion.p>

              {/* Description */}
              <motion.p
                className="mt-3 text-base text-gray-500 max-w-md mx-auto md:mx-0 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15, duration: 0.5 }}
              >
                Kerala&apos;s premier full-contact karate institution — certified black belt
                instructors, competitive training, and programs for all ages.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.25, duration: 0.5 }}
              >
                <Link
                  href="/classes"
                  className="group inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest px-8 py-4 rounded-md transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-200"
                >
                  EXPLORE CLASSES
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="https://wa.me/917306036562"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-red-600 text-gray-700 hover:text-red-600 font-bold tracking-widest px-8 py-4 rounded-md transition-all"
                >
                  JOIN NOW
                </a>
              </motion.div>

              {/* Mini stats */}
              <motion.div
                className="mt-9 flex gap-8 justify-center md:justify-start"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                {[["500+", "Students"], ["10+", "Locations"], ["20+", "Years"]].map(([v, l]) => (
                  <div key={l} className="text-center md:text-left">
                    <p className="font-display text-3xl text-gray-900 tracking-wider">{v}</p>
                    <p className="text-gray-400 text-xs font-medium tracking-wide mt-0.5">{l}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-400"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────── */}
      <section className="bg-red-600 py-8 relative overflow-hidden">
        <div className="absolute inset-0 diagonal-stripes-dark opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(s => <StatCounter key={s.label} value={s.value} label={s.label} />)}
          </div>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ─────────────────────────────────────────── */}
      <section className="pt-16 sm:pt-20 lg:pt-28 pb-14 sm:pb-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* LEFT — Photo with floating badges */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative mt-10 lg:mt-0 mb-8 lg:mb-0"
            >
              {/* Background accent square */}
              <div className="absolute -bottom-5 -left-5 w-40 h-40 bg-red-50 rounded-3xl -z-10" />
              <div className="absolute -top-5 -right-5 w-24 h-24 border-2 border-red-100 rounded-3xl -z-10 hidden sm:block" />

              {/* Main photo */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/80">
                <img
                  src="/gallery/black-belt-test.jpg"
                  alt="IFKA Black Belt Ceremony — Students with Diplomas"
                  className="w-full h-[440px] sm:h-[480px] object-cover object-top"
                />
                {/* Subtle bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                {/* IFKA label inside photo */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-red-600 text-xs font-bold tracking-widest px-3 py-1.5 rounded-full shadow border border-red-100">
                  IRON FIST KARATE ACADEMY
                </div>
              </div>

              {/* Floating badge — bottom right: students */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute -bottom-6 right-3 sm:right-4 lg:-right-6 bg-white rounded-2xl shadow-xl shadow-gray-200/70 p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border border-gray-100"
              >
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-red-200">
                  <Users size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-display text-2xl sm:text-3xl text-gray-900 tracking-wider leading-none">500+</p>
                  <p className="text-gray-500 text-[10px] sm:text-xs font-medium mt-0.5">Students Trained</p>
                </div>
              </motion.div>

              {/* Floating badge — top left: years */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute -top-6 left-3 sm:left-4 lg:-left-6 bg-red-600 rounded-2xl shadow-xl shadow-red-200 p-3 sm:p-4 text-center"
              >
                <p className="font-display text-2xl sm:text-3xl text-white tracking-wider leading-none">20+</p>
                <p className="text-white/75 text-[10px] sm:text-xs font-medium mt-0.5">Years of Excellence</p>
              </motion.div>
            </motion.div>

            {/* RIGHT — Text content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <p className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
                About Us
              </p>

              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                Building strong bodies and
                <span className="text-red-600"> even stronger minds</span>
              </h2>

              <p className="mt-5 text-gray-500 leading-relaxed text-base">
                Iron Fist Karate Academy was founded in 2004 with a singular vision — to bring
                authentic, championship-level karate training to the people of Kerala. We focus on
                building physical strength, mental discipline, and lasting confidence through
                structured training where students learn respect and focus.
              </p>

              {/* Mission + Vision cards */}
              <div className="mt-7 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-red-100 hover:bg-red-50/30 transition-colors duration-200">
                  <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center mb-3">
                    <Target size={16} className="text-red-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm tracking-wide">Our Mission</h4>
                  <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                    To develop disciplined, confident, and physically capable martial artists
                    through authentic karate training.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-red-100 hover:bg-red-50/30 transition-colors duration-200">
                  <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center mb-3">
                    <Eye size={16} className="text-red-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm tracking-wide">Our Vision</h4>
                  <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                    To be Kerala&apos;s most respected karate institution, producing champions
                    not only on the mat but in life.
                  </p>
                </div>
              </div>

              {/* CTA + Phone */}
              <div className="mt-7 flex items-center gap-5 flex-wrap">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold tracking-wider px-7 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-red-200"
                >
                  LEARN MORE ABOUT
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-red-50 border border-red-100 rounded-full flex items-center justify-center shadow-sm">
                    <Phone size={16} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-medium">Need Help?</p>
                    <a href="tel:+917306036562" className="text-gray-900 font-bold text-sm hover:text-red-600 transition-colors">
                      +91 73060 36562
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE IFKA ───────────────────────────────────────── */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-3">Why Choose Us</p>
              <h2 className="font-display text-5xl sm:text-6xl text-gray-900 tracking-wider">
                THE IFKA <span className="text-red-600">DIFFERENCE</span>
              </h2>
              <div className="mt-4 w-14 h-1 bg-red-600 rounded-full mx-auto" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyChoose.map((item, i) => {
              const Icon = whyIcons[i];
              return (
                <motion.div
                  key={item.title} variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={i}
                  className="card-light rounded-xl p-6"
                >
                  <div className="w-11 h-11 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={20} className="text-red-600" />
                  </div>
                  <h3 className="font-display text-2xl text-gray-900 tracking-wider mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CLASSES PREVIEW ───────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-3">Training Programs</p>
              <h2 className="font-display text-5xl sm:text-6xl text-gray-900 tracking-wider">
                OUR <span className="text-red-600">CLASSES</span>
              </h2>
              <div className="mt-4 w-14 h-1 bg-red-600 rounded-full" />
            </motion.div>
            <Link href="/classes" className="group flex items-center gap-1.5 text-gray-500 hover:text-red-600 font-medium text-sm transition-colors">
              View All Classes <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {classes.slice(0, 3).map((cls, i) => (
              <motion.div
                key={cls.id} variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true }} custom={i}
                className="card-light rounded-xl overflow-hidden flex flex-col"
              >
                <div className={`h-1.5 ${cls.levelColor}`} />
                <div className="p-6 pb-4 flex items-start justify-between gap-3">
                  <div>
                    <span className={`inline-block ${cls.levelColor} text-white text-xs font-bold tracking-wider px-2.5 py-0.5 rounded-full mb-2`}>
                      {cls.level}
                    </span>
                    <h3 className="font-display text-2xl text-gray-900 tracking-wider">{cls.name}</h3>
                    <p className="text-red-500 text-xs font-medium tracking-wider mt-0.5">{cls.ageGroup}</p>
                  </div>
                  <span className="text-4xl flex-shrink-0">{cls.icon}</span>
                </div>
                <div className="px-6 flex-1">
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{cls.description}</p>
                </div>
                <div className="px-6 pt-4 pb-5 flex items-center justify-between border-t border-gray-50 mt-4">
                  <span className="text-gray-400 text-xs">{cls.duration}</span>
                  <Link href="/classes" className="group/lnk flex items-center gap-1 text-red-600 hover:text-red-700 text-xs font-bold tracking-wider">
                    LEARN MORE <ArrowRight size={11} className="group-hover/lnk:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTRUCTORS ───────────────────────────────────────────── */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-3">Meet The Team</p>
              <h2 className="font-display text-5xl sm:text-6xl text-gray-900 tracking-wider">
                OUR <span className="text-red-600">INSTRUCTORS</span>
              </h2>
              <div className="mt-4 w-14 h-1 bg-red-600 rounded-full mx-auto" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {instructors.map((inst, i) => (
              <motion.div
                key={inst.id} variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true }} custom={i}
                className="card-light rounded-xl overflow-hidden"
              >
                {/* Real photo */}
                <div className="h-56 bg-gray-100 relative overflow-hidden">
                  <img
                    src={inst.photo}
                    alt={inst.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {inst.belt.split("·")[0].trim()}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl text-gray-900 tracking-wider leading-tight">{inst.name}</h3>
                  <p className="text-red-500 text-xs font-bold tracking-wider mt-0.5">{inst.title}</p>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed line-clamp-2">{inst.specialization}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/about" className="group inline-flex items-center gap-2 border-2 border-gray-200 hover:border-red-600 text-gray-700 hover:text-red-600 font-bold tracking-wider px-6 py-3 rounded-md transition-all">
              MEET ALL INSTRUCTORS <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-3">Student Stories</p>
            <h2 className="font-display text-5xl sm:text-6xl text-gray-900 tracking-wider">
              WHAT THEY <span className="text-red-600">SAY</span>
            </h2>
            <div className="mt-4 w-14 h-1 bg-red-600 rounded-full mx-auto" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-8 sm:p-10 text-center shadow-sm"
            >
              <div className="text-red-500 text-5xl mb-4 leading-none">&ldquo;</div>
              <p className="text-gray-700 text-lg sm:text-xl leading-relaxed italic">
                {testimonials[currentTestimonial].quote}
              </p>
              <div className="mt-6 flex flex-col items-center gap-1">
                <p className="font-display text-xl text-gray-900 tracking-wider">{testimonials[currentTestimonial].name}</p>
                <p className="text-red-500 text-xs font-bold tracking-wider">
                  {testimonials[currentTestimonial].belt} · {testimonials[currentTestimonial].location}
                </p>
                <p className="text-gray-400 text-xs mt-0.5">{testimonials[currentTestimonial].years}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-2 mt-5">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrentTestimonial(i)}
                className={`rounded-full transition-all duration-300 ${i === currentTestimonial ? "w-8 h-2 bg-red-600" : "w-2 h-2 bg-gray-200 hover:bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ───────────────────────────────────────── */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-3">Gallery</p>
              <h2 className="font-display text-5xl sm:text-6xl text-gray-900 tracking-wider">
                LIFE IN THE <span className="text-red-600">DOJO</span>
              </h2>
              <div className="mt-4 w-14 h-1 bg-red-600 rounded-full" />
            </motion.div>
            <Link href="/gallery" className="group flex items-center gap-1.5 text-gray-500 hover:text-red-600 font-medium text-sm transition-colors">
              View Full Gallery <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Pinterest preview grid — real images */}
          <div className="columns-2 sm:columns-3 gap-3 sm:gap-4">
            {[
              { src: "/gallery/inter-dojo.jpg",       h: "h-56", label: "Inter Dojo Championship", cat: "Tournaments" },
              { src: "/gallery/black-belt-test.jpg",   h: "h-44", label: "Black Belt Test",          cat: "Events"      },
              { src: "/gallery/fighting-camp.jpg",     h: "h-52", label: "Fighting Camp",             cat: "Training"    },
              { src: "/gallery/district-tournament.jpg", h: "h-44", label: "District Tournament",    cat: "Tournaments" },
              { src: "/gallery/thachampara-dojo.jpg",  h: "h-56", label: "Thachampara Main Dojo",    cat: "Training"    },
              { src: "/gallery/blackbelt.jpg",         h: "h-44", label: "Black Belt Ceremony",       cat: "Events"      },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true }} custom={i * 0.15}
                className={`group relative ${item.h} bg-gray-200 rounded-xl overflow-hidden mb-3 sm:mb-4 cursor-pointer`}
                style={{ breakInside: "avoid" }}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-xs text-red-300 font-bold tracking-widest">{item.cat}</p>
                  <p className="text-white text-sm font-semibold leading-tight">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ───────────────────────────────────────────── */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 grid-pattern-dark opacity-60" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-800/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <p className="text-red-400 text-xs font-bold tracking-[0.4em] uppercase mb-4">Begin Your Journey</p>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white tracking-wider leading-none">
              READY TO BEGIN<br />YOUR JOURNEY?
            </h2>
            <p className="mt-5 text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
              Join hundreds of students across Kerala who have transformed their lives
              through the art of karate. Your first class is waiting.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/917306036562"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest px-10 py-4 rounded-md transition-all hover:scale-105 shadow-2xl shadow-red-900/40"
              >
                JOIN NOW <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link href="/dojos" className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-white text-white font-bold tracking-widest px-8 py-4 rounded-md transition-all">
                <MapPin size={15} /> FIND A DOJO
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
