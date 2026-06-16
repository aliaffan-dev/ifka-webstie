"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle } from "lucide-react";
import { policies, siteConfig } from "@/lib/data";

type PolicyKey = keyof typeof policies;

const tabs: { key: PolicyKey; label: string }[] = [
  { key: "membership",  label: "Membership" },
  { key: "attendance",  label: "Attendance" },
  { key: "safety",      label: "Safety Guidelines" },
  { key: "conduct",     label: "Code of Conduct" },
  { key: "uniform",     label: "Uniform" },
  { key: "payment",     label: "Payment" },
  { key: "refund",      label: "Refund & Cancellation" },
  { key: "privacy",     label: "Privacy Policy" },
  { key: "terms",       label: "Terms of Service" },
];

/* ── Contact block rendered inside rich policies ── */
function ContactBlock() {
  return (
    <div className="mt-2 bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-1.5 text-sm">
      <p className="text-gray-700">
        <span className="font-semibold text-gray-900">Email: </span>
        <a href={`mailto:${siteConfig.email}`} className="text-red-600 hover:underline">
          {siteConfig.email}
        </a>
      </p>
      <p className="text-gray-700">
        <span className="font-semibold text-gray-900">Phone: </span>
        <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="text-red-600 hover:underline">
          {siteConfig.phone}
        </a>
      </p>
      <p className="text-gray-700">
        <span className="font-semibold text-gray-900">Address: </span>
        {siteConfig.address}
      </p>
    </div>
  );
}

/* ── Renders a policy that has sections (rich format) ── */
function RichPolicyContent({ policy }: { policy: { title: string; lastUpdated?: string; sections: any[] } }) {
  return (
    <div>
      {policy.lastUpdated && (
        <p className="text-gray-400 text-xs mb-6">Last Updated: {policy.lastUpdated}</p>
      )}
      <div className="space-y-6">
        {policy.sections.map((section: any, i: number) => (
          <div key={i}>
            {section.heading && (
              <h3 className="font-bold text-gray-900 text-base mb-2 flex items-center gap-2">
                <span className="w-1 h-4 bg-red-600 rounded-full flex-shrink-0 inline-block" />
                {section.heading}
              </h3>
            )}
            {section.text && (
              <p className="text-gray-600 text-sm leading-relaxed mb-2">{section.text}</p>
            )}
            {section.items && (
              <ul className="space-y-1.5 ml-3 mb-2">
                {section.items.map((item: string, j: number) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle size={13} className="text-red-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {section.note && (
              <p className="text-gray-500 text-xs italic mt-1.5 pl-3 border-l-2 border-red-200">
                {section.note}
              </p>
            )}
            {section.contact && <ContactBlock />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Renders a simple items list policy ── */
function SimpleItemsContent({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-4">
          <span className="w-7 h-7 bg-red-50 border border-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
            {i + 1}
          </span>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed pt-0.5">{item}</p>
        </li>
      ))}
    </ul>
  );
}

/* ── Accordion for mobile ── */
function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <span className="font-display text-xl text-gray-900 tracking-wider">{title}</span>
        <ChevronDown
          size={17}
          className={`text-red-500 transition-transform duration-300 flex-shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-gray-50 border-t border-gray-100 p-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function renderPolicyContent(p: any) {
  if ("sections" in p) return <RichPolicyContent policy={p} />;
  if ("items" in p) return <SimpleItemsContent items={p.items} />;
  if ("content" in p) return <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{p.content}</p>;
  return null;
}

export default function PoliciesPage() {
  const [activeTab, setActiveTab] = useState<PolicyKey>("membership");
  const current = policies[activeTab];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-white overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-red-600" />Guidelines &amp; Rules
            </p>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl tracking-wider leading-none text-gray-900">
              IFKA <span className="text-red-600">POLICIES</span>
            </h1>
            <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-2xl leading-relaxed">
              Our policies ensure a safe, respectful, and professional training environment for all students.
            </p>
            <div className="mt-5 h-1 w-14 bg-red-600 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Desktop sidebar + content */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <nav className="lg:sticky lg:top-28 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all ${
                      activeTab === tab.key
                        ? "bg-red-600 text-white shadow-md shadow-red-200"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content panel */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm"
                >
                  <h2 className="font-display text-4xl text-gray-900 tracking-wider mb-2">
                    {current.title}
                  </h2>
                  <div className="w-12 h-1 bg-red-600 rounded-full mb-6" />
                  {renderPolicyContent(current)}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile accordion */}
      <section className="py-10 bg-gray-50 border-t border-gray-100 lg:hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl text-gray-900 tracking-wider mb-6 text-center">
            ALL <span className="text-red-600">POLICIES</span>
          </h2>
          <div className="space-y-3">
            {tabs.map((tab, i) => {
              const p = policies[tab.key];
              return (
                <AccordionItem key={tab.key} title={p.title} defaultOpen={i === 0}>
                  {renderPolicyContent(p)}
                </AccordionItem>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-3">Questions?</p>
          <h2 className="font-display text-4xl text-gray-900 tracking-wider">NEED CLARIFICATION?</h2>
          <p className="mt-3 text-gray-500 text-sm">Contact us for any questions about our policies.</p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`mailto:${siteConfig.email}`}
              className="bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest px-8 py-3.5 rounded-md transition-all hover:scale-105 shadow-md shadow-red-200"
            >
              EMAIL US
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="border-2 border-gray-200 hover:border-red-600 text-gray-700 hover:text-red-600 font-bold tracking-widest px-8 py-3.5 rounded-md transition-all"
            >
              CALL US
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
