"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, Users, ChevronRight } from "lucide-react";
import { classes, belts } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

const schedule = [
  { day: "Monday",    sessions: ["Kids: 4:30 PM", "Adult: 6:00 PM", "Advanced: 7:00 PM"] },
  { day: "Tuesday",   sessions: ["Junior: 5:15 PM", "Adult: 6:00 PM", "Comp: 6:00 AM"] },
  { day: "Wednesday", sessions: ["Kids: 4:30 PM", "Adult: 6:00 PM", "Advanced: 7:00 PM"] },
  { day: "Thursday",  sessions: ["Junior: 5:15 PM", "Adult: 6:00 PM", "Comp: 6:00 AM"] },
  { day: "Friday",    sessions: ["Kids: 4:30 PM", "Adult: 6:00 PM", "Advanced: 7:00 PM"] },
  { day: "Saturday",  sessions: ["Kids: 4:30 PM", "Junior: 5:15 PM", "Self Defense: 9:00 AM"] },
  { day: "Sunday",    sessions: ["Self Defense: 9:00 AM", "Comp: 6:00 AM"] },
];

export default function ClassesPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="relative pt-32 pb-16 bg-white overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-red-600" />Training Programs
            </p>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl tracking-wider leading-none text-gray-900">
              OUR <span className="text-red-600">CLASSES</span>
            </h1>
            <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-2xl leading-relaxed">
              From tiny beginners to competitive fighters — structured programs for every age and skill level.
            </p>
            <div className="mt-5 h-1 w-14 bg-red-600 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {classes.map((cls, i) => (
              <motion.div
                key={cls.id} variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true }} custom={i}
                className="card-light rounded-2xl overflow-hidden flex flex-col"
              >
                <div className={`h-1.5 ${cls.levelColor}`} />
                <div className="p-6 pb-3 flex items-start justify-between gap-3">
                  <div>
                    <span className={`inline-block ${cls.levelColor} text-white text-xs font-bold tracking-wider px-2.5 py-0.5 rounded-full mb-2`}>{cls.level}</span>
                    <h3 className="font-display text-3xl text-gray-900 tracking-wider leading-none">{cls.name}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-red-500 text-xs font-medium"><Users size={11} />{cls.ageGroup}</span>
                      <span className="flex items-center gap-1 text-gray-400 text-xs"><Clock size={11} />{cls.duration}</span>
                    </div>
                  </div>
                  <span className="text-4xl flex-shrink-0">{cls.icon}</span>
                </div>

                <div className="px-6 pb-3"><p className="text-gray-500 text-sm leading-relaxed">{cls.description}</p></div>

                <div className="px-6 pb-4 flex-1">
                  <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-2">Benefits</p>
                  <ul className="space-y-1.5">
                    {cls.benefits.map(b => (
                      <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle size={13} className="text-red-500 mt-0.5 flex-shrink-0" />{b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-6 pt-4 pb-5 border-t border-gray-50 mt-auto">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={12} className="text-red-500" />
                    <p className="text-gray-400 text-xs">{cls.schedule}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-900 font-bold text-lg">{cls.fee}</p>
                    <a href="https://wa.me/917306036562" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-widest px-4 py-2 rounded-lg transition-all shadow-md shadow-red-200">
                      ENROLL <ArrowRight size={11} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <p className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-3">Weekly Timetable</p>
            <h2 className="font-display text-5xl text-gray-900 tracking-wider">CLASS <span className="text-red-600">SCHEDULE</span></h2>
            <div className="mt-4 w-14 h-1 bg-red-600 rounded-full" />
          </motion.div>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-900">
                  <th className="text-left px-5 py-4 text-white font-bold tracking-wider text-xs uppercase">Day</th>
                  <th className="text-left px-5 py-4 text-white font-bold tracking-wider text-xs uppercase">Sessions</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, i) => (
                  <tr key={row.day} className={`border-b border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-red-50/50 transition-colors`}>
                    <td className="px-5 py-4"><span className="font-display text-xl text-gray-900 tracking-wider">{row.day}</span></td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        {row.sessions.map(s => (
                          <span key={s} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full border border-gray-200">{s}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-400 text-xs mt-3">* Schedules may vary by dojo. Contact your nearest dojo to confirm.</p>
        </div>
      </section>

      {/* Belt Progression */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-3">Your Path Forward</p>
            <h2 className="font-display text-5xl text-gray-900 tracking-wider">BELT <span className="text-red-600">PROGRESSION</span></h2>
            <div className="mt-4 w-14 h-1 bg-red-600 rounded-full mx-auto" />
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-2">
            {belts.map((belt, i) => (
              <motion.div
                key={belt.name}
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 sm:gap-0"
              >
                <div className="flex flex-col items-center gap-2 sm:px-4">
                  <div
                    className={`w-16 h-5 rounded-sm shadow-md ${belt.border ? "border-2 border-gray-300" : ""}`}
                    style={{ backgroundColor: belt.color }}
                  />
                  <p className="text-gray-500 text-xs font-medium tracking-wide">{belt.name}</p>
                </div>
                {i < belts.length - 1 && <ChevronRight size={14} className="text-gray-300 hidden sm:block flex-shrink-0" />}
              </motion.div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-8 max-w-lg mx-auto leading-relaxed">
            Average time to black belt: 4–6 years of consistent training (3–4 sessions/week).
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-red-600 relative overflow-hidden">
        <div className="absolute inset-0 diagonal-stripes-dark opacity-30" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <h2 className="font-display text-5xl text-white tracking-wider">START TODAY</h2>
          <p className="mt-3 text-white/70 text-base">Your first class is waiting.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://wa.me/917306036562" target="_blank" rel="noopener noreferrer" className="bg-white text-red-600 hover:bg-red-50 font-bold tracking-widest px-8 py-4 rounded-md transition-all hover:scale-105 shadow-lg">ENROLL NOW</a>
            <Link href="/dojos" className="border-2 border-white/40 hover:border-white text-white font-bold tracking-widest px-8 py-4 rounded-md transition-all">FIND A DOJO</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
