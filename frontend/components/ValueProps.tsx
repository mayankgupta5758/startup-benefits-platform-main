"use client";

import { motion } from "framer-motion";

const items = [
  {
    label: "Real founder signal",
    body: "Locked deals are reserved for verified founders so partners can offer deeper discounts without attracting coupon hunters.",
  },
  {
    label: "Stack-aware recommendations",
    body: "We highlight deals that fit early-stage stacks: modern infra, analytics, marketing, and productivity.",
  },
  {
    label: "Transparent eligibility",
    body: "Every deal clearly states what is required and how approval works. No vague 'contact sales' flows.",
  },
];

export function ValueProps() {
  return (
    <section className="px-6 pb-20 sm:px-10">
      <div className="mx-auto max-w-5xl grid gap-10 border border-slate-800 bg-slate-950/70 p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-900/70">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            Why this instead of a coupon list?
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50">
            Built for companies that still ship at 2am.
          </h2>
          <p className="max-w-xl text-sm text-slate-400">
            Early-stage teams don&apos;t need another marketplace. You need leverage: better terms,
            fewer distractions, and a stack that scales with you from zero to product–market fit.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300"
            >
              <h3 className="mb-2 text-sm font-semibold text-slate-50">{item.label}</h3>
              <p className="text-xs text-slate-400">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


