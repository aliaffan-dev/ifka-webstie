"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const galleryItems = [
  {
    id: 1,
    src: "/gallery/inter-dojo.jpg",
    category: "Tournaments",
    label: "Inter Dojo Championship",
    desc: "IFKA students competing at the Inter Dojo Karate Championship",
    h: "h-64",
  },
  {
    id: 2,
    src: "/gallery/thachampara-dojo.jpg",
    category: "Training",
    label: "Thachampara Main Dojo",
    desc: "Training session at Thachampara Main Dojo",
    h: "h-52",
  },
  {
    id: 3,
    src: "/gallery/black-belt-test.jpg",
    category: "Events",
    label: "Black Belt Test",
    desc: "Students demonstrating their skills during the black belt grading",
    h: "h-56",
  },
  {
    id: 4,
    src: "/gallery/inter-dojo-2.jpg",
    category: "Tournaments",
    label: "Inter Dojo Championship II",
    desc: "Action highlights from the Inter Dojo Karate Championship",
    h: "h-48",
  },
  {
    id: 5,
    src: "/gallery/district-tournament.jpg",
    category: "Tournaments",
    label: "District Karate Tournament",
    desc: "IFKA competitors at the District Level Karate Tournament",
    h: "h-60",
  },
  {
    id: 6,
    src: "/gallery/thachampara-dojo-2.jpg",
    category: "Training",
    label: "Thachampara Dojo — Session",
    desc: "Regular training session at Thachampara Main Dojo",
    h: "h-44",
  },
  {
    id: 7,
    src: "/gallery/fighting-camp.jpg",
    category: "Training",
    label: "Fighting Camp",
    desc: "Intensive fighting camp for competition team preparation",
    h: "h-56",
  },
  {
    id: 8,
    src: "/gallery/blackbelt.jpg",
    category: "Events",
    label: "Black Belt Ceremony",
    desc: "Black belt holders at IFKA — the culmination of years of dedication",
    h: "h-48",
  },
  {
    id: 9,
    src: "/gallery/poovathani-dojo.jpg",
    category: "Training",
    label: "Poovathani Dojo",
    desc: "Students training at the Poovathani Dojo branch",
    h: "h-52",
  },
  {
    id: 10,
    src: "/gallery/summer-camp-1.jpg",
    category: "Events",
    label: "Summer Camp 2024",
    desc: "IFKA Summer Karate Camp — intensive training and fun for all ages",
    h: "h-60",
  },
  {
    id: 11,
    src: "/gallery/summer-camp-2.jpg",
    category: "Events",
    label: "Summer Camp — Group",
    desc: "Students and instructors at the IFKA Summer Camp",
    h: "h-52",
  },
];

const categories = ["All", "Training", "Events", "Tournaments"] as const;
type Category = typeof categories[number];

const catColors: Record<string, string> = {
  Training: "bg-blue-600",
  Events: "bg-green-600",
  Tournaments: "bg-red-600",
  Kids: "bg-amber-500",
};

export default function GalleryPage() {
  const [filter, setFilter] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    filter === "All" ? galleryItems : galleryItems.filter((g) => g.category === filter);
  const curIdx = lightbox ? filtered.findIndex((g) => g.id === lightbox) : -1;

  const prev = () => {
    if (curIdx <= 0) setLightbox(filtered[filtered.length - 1].id);
    else setLightbox(filtered[curIdx - 1].id);
  };
  const next = () => {
    if (curIdx >= filtered.length - 1) setLightbox(filtered[0].id);
    else setLightbox(filtered[curIdx + 1].id);
  };

  const curItem = lightbox ? filtered.find((g) => g.id === lightbox) : null;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-white overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-red-600" />
              Visual Journey
            </p>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl tracking-wider leading-none text-gray-900">
              OUR <span className="text-red-600">GALLERY</span>
            </h1>
            <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-xl leading-relaxed">
              Moments from the mat — training, competition, ceremonies, and community life at IFKA.
            </p>
            <div className="mt-5 h-1 w-14 bg-red-600 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-16 lg:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-all ${
                filter === cat
                  ? "bg-red-600 text-white shadow-md shadow-red-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="text-gray-400 text-sm ml-auto flex-shrink-0">
            {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Pinterest Masonry Grid */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="masonry-grid">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  onClick={() => setLightbox(item.id)}
                  className={`masonry-item group relative ${item.h} rounded-2xl overflow-hidden cursor-pointer bg-gray-100`}
                >
                  {/* Real image */}
                  <img
                    src={item.src}
                    alt={item.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient overlay (always subtle, stronger on hover) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-all duration-300" />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                    <span
                      className={`${catColors[item.category] || "bg-red-600"} text-white text-xs font-bold tracking-wider px-2.5 py-1 rounded-full shadow`}
                    >
                      {item.category}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm rounded-lg p-1.5">
                      <ZoomIn size={14} className="text-white" />
                    </div>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-bold text-sm leading-tight drop-shadow">
                      {item.label}
                    </p>
                    <p className="text-white/70 text-xs mt-0.5 leading-tight line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && curItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <button
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center text-white transition-all z-10"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center text-white transition-all z-10"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
            >
              <ChevronRight size={22} />
            </button>

            <motion.div
              key={lightbox}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Full image */}
              <div className="rounded-2xl overflow-hidden bg-gray-900 max-h-[70vh]">
                <img
                  src={curItem.src}
                  alt={curItem.label}
                  className="w-full max-h-[70vh] object-contain"
                />
              </div>

              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-white font-bold text-lg">{curItem.label}</p>
                  <p className="text-white/50 text-sm mt-1">{curItem.desc}</p>
                </div>
                <span
                  className={`${catColors[curItem.category] || "bg-red-600"} text-white text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0`}
                >
                  {curItem.category}
                </span>
              </div>
              <p className="mt-2 text-white/25 text-xs">
                {curIdx + 1} / {filtered.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-14 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-red-500 text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Be In The Next Gallery
          </p>
          <h2 className="font-display text-4xl text-gray-900 tracking-wider">
            START YOUR JOURNEY AT <span className="text-red-600">IFKA</span>
          </h2>
          <p className="mt-3 text-gray-500 text-sm">
            Follow us on Instagram{" "}
            <a
              href="https://instagram.com/ifkakarate"
              className="text-red-600 hover:text-red-700 font-medium"
            >
              @ifkakarate
            </a>{" "}
            for daily updates.
          </p>
        </div>
      </section>
    </div>
  );
}
