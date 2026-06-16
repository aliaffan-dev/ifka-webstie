"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Award, Target, Heart, ChevronRight } from "lucide-react";
import { instructors, belts, achievements } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

const values = [
  { icon: "⚔️", title: "Discipline", desc: "The foundation of all martial arts mastery. We train mind and body to act with purpose." },
  { icon: "🙏", title: "Respect", desc: "For your instructors, fellow students, and the art itself. Respect is the core of dojo culture." },
  { icon: "🔥", title: "Perseverance", desc: "Champions are made when they want to quit. We cultivate the will to keep going." },
  { icon: "🏆", title: "Excellence", desc: "We don't settle for average. Every student is pushed to reach their highest potential." },
  { icon: "📜", title: "Tradition", desc: "We honour the roots of karate — its history, philosophy, and the masters who developed it." },
];

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="relative pt-24 sm:pt-32 pb-0 bg-white overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />

        {/* Red corner accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-bl-[5rem] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-4 lg:gap-0">
            {/* Left — headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="pb-10 lg:pb-0"
            >
              <p className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-red-600" />Our Story
              </p>
              <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl tracking-wider leading-none text-gray-900">
                ABOUT <span className="text-red-600">IFKA</span>
              </h1>
              <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-xl leading-relaxed">
                Two decades of forging champions, building character, and spreading full-contact karate across Kerala.
              </p>
              <div className="mt-5 h-1 w-14 bg-red-600 rounded-full" />

              {/* Mini stat pills */}
              <div className="mt-6 flex flex-wrap gap-3">
                {[["500+", "Students"], ["20+", "Years"], ["10+", "Dojos"], ["3", "Expert Instructors"]].map(([v, l]) => (
                  <div key={l} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
                    <span className="font-display text-xl text-red-600 tracking-wider leading-none">{v}</span>
                    <span className="text-gray-500 text-xs font-medium">{l}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — kicking figure */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex justify-center lg:justify-end items-end"
            >
              <img
                src="/about-banner.png"
                alt="Karate practitioner high kick"
                className="h-40 sm:h-64 lg:h-80 xl:h-96 object-contain object-bottom select-none"
                draggable={false}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="pt-16 sm:pt-20 lg:pt-28 pb-14 sm:pb-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* LEFT — Photo with floating badges */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative mt-10 lg:mt-0 order-2 lg:order-1 mb-8 lg:mb-0"
            >
              {/* Background accent shapes — desktop only */}
              <div className="absolute -bottom-5 -left-5 w-40 h-40 bg-red-50 rounded-3xl -z-10 hidden sm:block" />
              <div className="absolute -top-5 -right-5 w-24 h-24 border-2 border-red-100 rounded-3xl -z-10 hidden sm:block" />

              {/* Photo */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/80">
                <img
                  src="/gallery/black-belt-test.jpg"
                  alt="IFKA Black Belt Ceremony — Students with Diplomas"
                  className="w-full h-64 sm:h-[440px] lg:h-[500px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-red-600 text-[10px] sm:text-xs font-bold tracking-widest px-2.5 py-1 rounded-full shadow border border-red-100">
                  IRON FIST KARATE ACADEMY
                </div>
              </div>

              {/* Floating badge — 500+ students */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute -bottom-6 right-3 sm:right-4 lg:-right-6 bg-white rounded-2xl shadow-xl shadow-gray-200/70 p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border border-gray-100"
              >
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-red-200">
                  <Award size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-display text-2xl sm:text-3xl text-gray-900 tracking-wider leading-none">500+</p>
                  <p className="text-gray-500 text-[10px] sm:text-xs font-medium mt-0.5">Students Trained</p>
                </div>
              </motion.div>

              {/* Floating badge — 20+ years */}
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

            {/* RIGHT — Story + Mission/Vision */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="order-1 lg:order-2"
            >
              <p className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-3 flex items-center gap-2">
                <span className="w-8 h-px bg-red-600" />Founded 2004
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                Our <span className="text-red-600">Story</span>
              </h2>
              <div className="mt-4 w-14 h-1 bg-red-600 rounded-full" />

              <div className="mt-5 space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                <p>Iron Fist Karate Academy was born from a passion — not just for karate, but for the transformative power it holds. In 2004, Sensei Musthafa Alukkal returned to his roots in Palakkad with a singular mission: to build a world-class karate institution in Kerala.</p>
                <p>Starting with a modest dojo and a handful of students, IFKA rapidly earned a reputation for producing technically exceptional martial artists with equally strong character. Today, IFKA operates across multiple dojos with over 500 active students and certified black belt instructors.</p>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  { icon: Target, title: "OUR MISSION", bg: "bg-red-50 border-red-100", iconBg: "bg-red-600",
                    text: "To develop disciplined, confident, and physically capable martial artists through authentic karate training." },
                  { icon: Heart, title: "OUR VISION", bg: "bg-gray-50 border-gray-200", iconBg: "bg-gray-900",
                    text: "To be Kerala's most respected karate institution — producing champions not only on the mat but in life." },
                  { icon: Award, title: "PHILOSOPHY", bg: "bg-gray-50 border-gray-200", iconBg: "bg-gray-900",
                    text: "Karate is a lifelong practice of self-improvement — training the body as the instrument of a disciplined and courageous spirit." },
                ].map(item => (
                  <div key={item.title} className={`${item.bg} border rounded-2xl p-4 flex gap-3 items-start`}>
                    <div className={`w-8 h-8 ${item.iconBg} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <item.icon size={14} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-gray-900 tracking-wider">{item.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed mt-0.5">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-3">What We Stand For</p>
            <h2 className="font-display text-5xl text-gray-900 tracking-wider">CORE <span className="text-red-600">VALUES</span></h2>
            <div className="mt-4 w-14 h-1 bg-red-600 rounded-full mx-auto" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {values.map((v, i) => (
              <motion.div key={v.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className="card-light rounded-xl p-5 text-center"
              >
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="font-display text-xl text-gray-900 tracking-wider mb-1.5">{v.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-3">The IFKA Team</p>
            <h2 className="font-display text-5xl text-gray-900 tracking-wider">OUR <span className="text-red-600">INSTRUCTORS</span></h2>
            <div className="mt-4 w-14 h-1 bg-red-600 rounded-full" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {instructors.map((inst, i) => (
              <motion.div key={inst.id} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className="card-light rounded-2xl overflow-hidden flex flex-col"
              >
                {/* Photo */}
                <div className="h-56 bg-gray-100 overflow-hidden relative">
                  <img
                    src={inst.photo}
                    alt={inst.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-3 left-3 bg-red-600 text-white text-xs font-bold tracking-wider px-2.5 py-1 rounded-full">
                    {inst.belt.split("·")[0].trim()}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div>
                    <h3 className="font-display text-2xl text-gray-900 tracking-wider leading-tight">{inst.name}</h3>
                    <p className="text-red-500 text-xs font-bold tracking-widest mt-0.5">{inst.title.toUpperCase()}</p>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mt-2.5 flex-1">{inst.bio}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {inst.achievements.map(a => (
                      <span key={a} className="bg-gray-100 text-gray-500 text-xs px-2.5 py-1 rounded-full">{a}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Belt progression */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-3">The Journey</p>
            <h2 className="font-display text-5xl text-gray-900 tracking-wider">BELT <span className="text-red-600">PROGRESSION</span></h2>
            <div className="mt-4 w-14 h-1 bg-red-600 rounded-full mx-auto" />
          </motion.div>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-2">
            {belts.map((belt, i) => (
              <motion.div key={belt.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-center gap-2 sm:gap-0"
              >
                <div className="flex flex-col items-center gap-2 sm:px-4">
                  <div className={`w-16 h-5 rounded shadow-md ${belt.border ? "border-2 border-gray-300" : ""}`} style={{ backgroundColor: belt.color }} />
                  <p className="text-gray-500 text-xs font-medium">{belt.name}</p>
                </div>
                {i < belts.length - 1 && <ChevronRight size={13} className="text-gray-300 hidden sm:block flex-shrink-0" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-3">Our Track Record</p>
            <h2 className="font-display text-5xl text-gray-900 tracking-wider">KEY <span className="text-red-600">MILESTONES</span></h2>
            <div className="mt-4 w-14 h-1 bg-red-600 rounded-full mx-auto" />
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-16 sm:left-24 top-0 bottom-0 w-px bg-gray-200" />
              <div className="space-y-5">
                {achievements.map((a, i) => (
                  <motion.div key={a.year} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                    className="flex items-start gap-5 sm:gap-8"
                  >
                    <div className="w-12 sm:w-20 flex-shrink-0 text-right">
                      <span className="font-display text-xl text-red-600 tracking-wider">{a.year}</span>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-red-600 flex-shrink-0 mt-1.5 relative z-10 ring-4 ring-white" />
                    <div className="flex-1 card-light rounded-xl p-4">
                      <p className="font-display text-xl text-gray-900 tracking-wider">{a.title}</p>
                      <p className="text-gray-500 text-sm mt-0.5">{a.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern-dark opacity-60" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <h2 className="font-display text-5xl text-white tracking-wider">BE PART OF THE LEGACY</h2>
          <p className="mt-3 text-gray-400 text-base">Join the IFKA family and write your own chapter in our story.</p>
          <a href="https://wa.me/917306036562" target="_blank" rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest px-8 py-4 rounded-md transition-all hover:scale-105 shadow-lg shadow-red-900/40">
            JOIN IFKA TODAY <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
