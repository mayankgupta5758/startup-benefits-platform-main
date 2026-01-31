"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Create your founder profile",
    body: "Tell us how early you are, your team size, and what you are building.",
  },
  {
    title: "Browse curated deals",
    body: "Filter by category, stack, and access level. No coupon spam, only vetted perks.",
  },
  {
    title: "Claim and track",
    body: "Request access with one click, then track approvals from your dashboard.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-t border-slate-800 bg-slate-950/80 px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50">How it works</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-400">
              A lightweight workflow built for tiny teams: discover, verify once, then keep using
              founder-only deals as you grow.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm transition hover:border-slate-500/80 hover:bg-slate-900"
            >
              <div className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-200 ring-1 ring-slate-700">
                0{index + 1}
              </div>
              <h3 className="text-sm font-semibold text-slate-50">{step.title}</h3>
              <p className="mt-2 text-xs text-slate-400">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


