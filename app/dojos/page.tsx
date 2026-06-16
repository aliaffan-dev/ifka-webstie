"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ExternalLink, Search, Mail, Star } from "lucide-react";
import Link from "next/link";
import { dojos } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

export default function DojosPage() {
  const [filter, setFilter] = useState<"All" | "Malappuram" | "Palakkad">("All");
  const [search, setSearch] = useState("");

  const filtered = dojos.filter(d => {
    const matchDist = filter === "All" || d.district === filter;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.address.toLowerCase().includes(search.toLowerCase());
    return matchDist && matchSearch;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-white overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-red-600" />Kerala, India
            </p>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl tracking-wider leading-none text-gray-900">
              OUR <span className="text-red-600">DOJOS</span>
            </h1>
            <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-xl leading-relaxed">
              Find your nearest IFKA training centre across Malappuram and Palakkad districts.
            </p>
            <div className="mt-5 h-1 w-14 bg-red-600 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Sticky filter */}
      <div className="sticky top-16 lg:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text" placeholder="Search dojos..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:border-red-400 rounded-lg pl-9 pr-4 py-2.5 text-gray-900 placeholder-gray-400 text-sm outline-none transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {(["All", "Malappuram", "Palakkad"] as const).map(tab => (
              <button key={tab} onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-all ${
                  filter === tab ? "bg-red-600 text-white shadow-md shadow-red-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >{tab}</button>
            ))}
          </div>
          <p className="text-gray-400 text-sm ml-auto hidden sm:block">{filtered.length} dojo{filtered.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-3xl text-gray-300 tracking-wider">NO DOJOS FOUND</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filtered.map((dojo, i) => (
                <motion.div
                  key={dojo.id} variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={i}
                  className="card-light rounded-2xl overflow-hidden"
                >
                  {/* Map */}
                  <div className="h-48 relative overflow-hidden bg-gray-100">
                    <iframe
                      src={dojo.mapSrc} width="100%" height="100%"
                      style={{ border: 0 }} allowFullScreen={false} loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade" title={`Map for ${dojo.name}`}
                    />
                    <div className="absolute top-3 left-3 bg-white text-gray-900 text-xs font-bold tracking-wider px-3 py-1.5 rounded-full shadow border border-gray-100">
                      {dojo.district}
                    </div>
                    {dojo.isMain && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow">
                        <Star size={10} /> Main Dojo
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-display text-2xl text-gray-900 tracking-wider">{dojo.name}</h3>
                        <p className="text-red-500 text-xs font-bold tracking-wider mt-0.5 uppercase">{dojo.district} District</p>
                      </div>
                      <a href={dojo.mapLink} target="_blank" rel="noopener noreferrer"
                        className="flex-shrink-0 flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wider px-3 py-2 rounded-lg transition-colors shadow-md shadow-red-200"
                      >
                        <ExternalLink size={12} /> Directions
                      </a>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-500 text-sm leading-relaxed">{dojo.address}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                        <div className="space-y-0.5">
                          {dojo.timings.map((t, idx) => (
                            <p key={idx} className="text-gray-500 text-sm">
                              <span className="text-gray-700 font-medium">{t.days}</span> — {t.time}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone size={14} className="text-red-500 flex-shrink-0" />
                        <a href={`tel:${dojo.phone.replace(/\s/g, "")}`} className="text-gray-500 hover:text-red-600 text-sm transition-colors">{dojo.phone}</a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail size={14} className="text-red-500 flex-shrink-0" />
                        <a href={`mailto:${dojo.email}`} className="text-gray-500 hover:text-red-600 text-sm transition-colors">{dojo.email}</a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl text-gray-900 tracking-wider">
            CAN&apos;T FIND A <span className="text-red-600">DOJO NEARBY?</span>
          </h2>
          <p className="mt-3 text-gray-500 text-sm">We may have expansion plans in your area. Contact us to find out.</p>
          <Link href="/contact" className="mt-6 inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest px-8 py-4 rounded-md transition-all hover:scale-105 shadow-lg shadow-red-200">
            CONTACT US
          </Link>
        </div>
      </section>
    </div>
  );
}
