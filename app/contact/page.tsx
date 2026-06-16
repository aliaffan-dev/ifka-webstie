"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ChevronDown, CheckCircle, Send } from "lucide-react";
import { dojos, faqs, siteConfig } from "@/lib/data";

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.06 }}
      className="border border-gray-100 rounded-xl overflow-hidden shadow-sm"
    >
      <button onClick={() => setOpen(!open)} aria-expanded={open}
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <span className="text-gray-800 font-medium pr-4 text-sm sm:text-base">{q}</span>
        <ChevronDown size={16} className={`text-red-500 transition-transform duration-300 flex-shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden"
          >
            <div className="bg-gray-50 border-t border-gray-100 px-6 py-4">
              <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

type FormState = { name: string; email: string; phone: string; dojo: string; message: string };
type FormErrors = Partial<Record<keyof FormState, string>>;

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", dojo: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const inputCls = (f: keyof FormState) =>
    `w-full bg-gray-50 border ${errors[f] ? "border-red-400" : "border-gray-200 focus:border-red-400"} rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 text-sm outline-none transition-colors`;

  return (
    <div className="bg-white min-h-screen">
      <section className="relative pt-32 pb-16 bg-white overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-red-600" />Get In Touch
            </p>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl tracking-wider leading-none text-gray-900">
              CONTACT <span className="text-red-600">US</span>
            </h1>
            <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-xl leading-relaxed">
              Ready to start? Have a question? We&apos;re here — our team responds within 24 hours.
            </p>
            <div className="mt-5 h-1 w-14 bg-red-600 rounded-full" />
          </motion.div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { icon: Phone, title: "Call Us", value: siteConfig.phone, sub: "Mon–Sat 9AM–7PM", href: `tel:${siteConfig.phone.replace(/\s/g,"")}` },
              { icon: Mail,  title: "Email Us", value: siteConfig.email, sub: "Reply within 24 hours", href: `mailto:${siteConfig.email}` },
              { icon: MapPin, title: "Main Location", value: "Thachampara, Palakkad", sub: "Kerala, India", href: "https://maps.app.goo.gl/b1ELLMvtR2YWbqZt7" },
              { icon: Clock, title: "Opening Hours", value: "6AM – 8PM", sub: "Mon–Sat (varies by dojo)", href: "/dojos" },
            ].map(({ icon: Icon, title, value, sub, href }) => (
              <motion.a key={title} href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="card-light rounded-xl p-5 flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={17} className="text-red-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-0.5">{title}</p>
                  <p className="text-gray-900 font-medium text-sm truncate">{value}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{sub}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Form + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm"
            >
              <h2 className="font-display text-3xl text-gray-900 tracking-wider mb-1">SEND A MESSAGE</h2>
              <div className="w-10 h-1 bg-red-600 rounded-full mb-6" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                  >
                    <CheckCircle size={48} className="text-green-500" />
                    <div>
                      <p className="font-display text-2xl text-gray-900 tracking-wider">MESSAGE SENT!</p>
                      <p className="text-gray-500 text-sm mt-2">Our team will contact you within 24 hours.</p>
                    </div>
                    <button onClick={() => { setSubmitted(false); setForm({ name:"", email:"", phone:"", dojo:"", message:"" }); }}
                      className="text-red-500 hover:text-red-600 text-sm font-medium"
                    >Send another message</button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-1.5 block">Full Name *</label>
                        <input type="text" placeholder="Your full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputCls("name")} />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-1.5 block">Phone *</label>
                        <input type="tel" placeholder="+91 73060 36562" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={inputCls("phone")} />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-1.5 block">Email Address *</label>
                      <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputCls("email")} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-1.5 block">Preferred Dojo</label>
                      <select value={form.dojo} onChange={e => setForm({...form, dojo: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-red-400 rounded-xl px-4 py-3 text-gray-900 text-sm outline-none transition-colors"
                      >
                        <option value="">Select a dojo (optional)</option>
                        {dojos.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-1.5 block">Message *</label>
                      <textarea placeholder="Tell us about yourself or your query..." rows={4} value={form.message}
                        onChange={e => setForm({...form, message: e.target.value})} className={`${inputCls("message")} resize-none`} />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>
                    <button type="submit" disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white font-bold tracking-widest py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-200"
                    >
                      {submitting ? (
                        <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />SENDING...</>
                      ) : (
                        <><Send size={15} />SEND MESSAGE</>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Map */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="flex flex-col gap-4"
            >
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex-1 min-h-80">
                <div className="p-4 border-b border-gray-100">
                  <p className="font-display text-xl text-gray-900 tracking-wider">MAIN LOCATION</p>
                  <p className="text-gray-400 text-xs mt-0.5">Perinthalmanna, Malappuram, Kerala</p>
                </div>
                <div style={{ height: "320px" }}>
                  <iframe
                    src="https://maps.google.com/maps?q=Thachampara+Palakkad+Kerala&output=embed"
                    width="100%" height="100%" style={{ border: 0 }}
                    allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    title="IFKA Thachampara Main Dojo"
                  />
                </div>
              </div>

              <a href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl p-5 transition-all"
              >
                <div className="w-11 h-11 bg-green-500 rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">💬</div>
                <div>
                  <p className="text-gray-900 font-bold text-sm">Chat on WhatsApp</p>
                  <p className="text-gray-500 text-xs mt-0.5">Quick responses · 9AM – 9PM</p>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <p className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-3">Common Questions</p>
            <h2 className="font-display text-5xl text-gray-900 tracking-wider">FAQ<span className="text-red-600">s</span></h2>
            <div className="mt-4 w-14 h-1 bg-red-600 rounded-full mx-auto" />
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
