"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Dojos", href: "/dojos" },
  { label: "Classes", href: "/classes" },
  { label: "About Us", href: "/about" },
  { label: "Policies", href: "/policies" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

function IFKALogo({ size = 44 }: { size?: number }) {
  const [err, setErr] = useState(false);
  return (
    <div style={{ width: size, height: size }} className="flex-shrink-0 relative">
      {!err ? (
        <img
          src="/logo.png"
          alt="IFKA Logo"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          onError={() => setErr(true)}
        />
      ) : (
        <div className="w-full h-full rounded-full bg-red-700 flex items-center justify-center ring-2 ring-red-600/30">
          <span className="font-display text-white text-xs tracking-widest">IFKA</span>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md shadow-black/5 border-b border-gray-100"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <IFKALogo size={48} />
              <div className="hidden sm:block">
                <p className="font-display text-gray-900 text-lg lg:text-xl tracking-widest leading-none">
                  IRON FIST
                </p>
                <p className="text-red-600 text-[10px] tracking-[0.25em] uppercase font-semibold leading-none mt-0.5">
                  Karate Academy
                </p>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 xl:px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 rounded-md ${
                      isActive
                        ? "text-red-600"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-red-600 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/917306036562"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wider px-5 py-2.5 rounded-md transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-red-200"
              >
                JOIN NOW
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white border-l border-gray-100 shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <IFKALogo size={36} />
                  <span className="font-display text-gray-900 text-xl tracking-widest">IFKA</span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-1">
                  {navLinks.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <Link
                          href={link.href}
                          className={`flex items-center gap-2.5 px-4 py-3 rounded-lg font-medium transition-all ${
                            isActive
                              ? "bg-red-50 text-red-600 border border-red-100"
                              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />}
                          {link.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <div className="p-4 border-t border-gray-100">
                <a
                  href="https://wa.me/917306036562"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest py-3.5 rounded-lg transition-all"
                >
                  JOIN NOW
                </a>
                <p className="text-center text-gray-400 text-xs mt-3">+91 73060 36562</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
