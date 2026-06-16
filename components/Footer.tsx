import Link from "next/link";
import { Facebook, Instagram, Youtube, MessageCircle, MapPin, Phone, Mail, ChevronRight } from "lucide-react";

function IFKALogoFooter() {
  return (
    <div className="w-14 h-14 flex-shrink-0">
      <img src="/logo.png" alt="IFKA Logo" className="w-full h-full object-contain" />
    </div>
  );
}

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Dojos", href: "/dojos" },
  { label: "Classes", href: "/classes" },
  { label: "About Us", href: "/about" },
  { label: "Policies", href: "/policies" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const programs = ["Kids Karate", "Junior Karate", "Adult Karate", "Advanced Training", "Competition Training", "Self Defense"];

export default function Footer() {
  return (
    <footer className="bg-gray-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <IFKALogoFooter />
              <div>
                <p className="font-display text-white text-2xl tracking-widest leading-none">IRON FIST</p>
                <p className="text-red-400 text-xs tracking-[0.2em] uppercase font-medium mt-1">Karate Academy</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Kerala&apos;s premier full-contact karate institution. Developing champions through discipline, strength, and tradition since 2004.
            </p>
            <div className="flex gap-2.5">
              {[
                { icon: Facebook, href: "https://facebook.com/ifkakarate", label: "Facebook" },
                { icon: Instagram, href: "https://instagram.com/ifkakarate", label: "Instagram" },
                { icon: Youtube, href: "https://youtube.com/@ifkakarate", label: "YouTube" },
                { icon: MessageCircle, href: "https://wa.me/917306036562", label: "WhatsApp" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-white text-xl tracking-widest mb-5">
              QUICK LINKS
              <span className="block w-8 h-0.5 bg-red-600 mt-2" />
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors group">
                    <ChevronRight size={13} className="text-red-600/50 group-hover:text-red-500 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-display text-white text-xl tracking-widest mb-5">
              PROGRAMS
              <span className="block w-8 h-0.5 bg-red-600 mt-2" />
            </h4>
            <ul className="space-y-2.5">
              {programs.map((p) => (
                <li key={p}>
                  <Link href="/classes" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors group">
                    <ChevronRight size={13} className="text-red-600/50 group-hover:text-red-500 transition-colors" />
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-white text-xl tracking-widest mb-5">
              CONTACT
              <span className="block w-8 h-0.5 bg-red-600 mt-2" />
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm leading-relaxed">Perinthalmanna, Malappuram<br />Kerala – 679357, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-red-500 flex-shrink-0" />
                <a href="tel:+917306036562" className="text-gray-400 hover:text-white text-sm transition-colors">+91 73060 36562</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-red-500 flex-shrink-0" />
                <a href="mailto:ironfistkarateoffitial@gmail.com" className="text-gray-400 hover:text-white text-sm transition-colors">ironfistkarateoffitial@gmail.com</a>
              </li>
            </ul>
            <a href="https://wa.me/917306036562" target="_blank" rel="noopener noreferrer"
              className="mt-6 inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-widest px-5 py-2.5 rounded-md transition-all hover:scale-105">
              JOIN NOW
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">© 2024 Iron Fist Karate Academy (IFKA). All rights reserved.</p>
          <p className="text-gray-600 text-xs">Kerala, India · Discipline. Strength. Excellence.</p>
        </div>
      </div>
    </footer>
  );
}
