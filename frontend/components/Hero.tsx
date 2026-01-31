"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SparkleButton } from "./SparkleButton";
import { AnimatedClouds } from "./AnimatedClouds";

const heroVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-24 sm:px-10 sm:pt-24 sm:pb-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_#4f46e5_0,_transparent_55%),radial-gradient(circle_at_bottom,_#0ea5e9_0,_transparent_55%)] opacity-40" />
      
      <div className="mx-auto max-w-5xl grid gap-12 lg:grid-cols-[3fr,2fr] items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          className="space-y-6"
        >
          <p className="inline-flex rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-200 shadow-sm">
            For founders, tiny teams, and indie hackers
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-50">
            Unlock big-company{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-300 bg-clip-text text-transparent">
              SaaS benefits
            </span>{" "}
            on a seed-stage budget.
          </h1>
          <p className="max-w-xl text-base sm:text-lg text-slate-300">
            Curated founder-only deals on cloud, analytics, marketing, and productivity tools.
            Stop overpaying for software while you are still searching for product–market fit.
          </p>
          <div className="flex flex-wrap gap-3">
            <SparkleButton
              onClick={() => window.location.href = "/deals"}
              className="group inline-flex items-center rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-600"
            >
              Explore deals
              <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </SparkleButton>
            <SparkleButton
              onClick={() => window.location.href = "/register"}
              className="inline-flex items-center rounded-full border border-slate-600 bg-slate-900/40 px-5 py-2.5 text-sm font-medium text-slate-100 backdrop-blur transition hover:border-slate-400"
            >
              Join as a founder
            </SparkleButton>
          </div>
          <div className="flex flex-wrap gap-6 pt-4 text-xs text-slate-400">
            <div>
              <p className="font-semibold text-slate-200">$200k+</p>
              <p>Average stack savings at seed</p>
            </div>
            
            <div>
              <p className="font-semibold text-slate-200">Curated</p>
              <p>No coupon spam, only vetted perks</p>
            </div>
          </div>
        </motion.div>
        <AnimatedClouds />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative hidden h-[360px] rounded-3xl border border-slate-700/80 bg-slate-900/70 p-5 shadow-2xl shadow-indigo-900/60 backdrop-blur-sm sm:block"
        >
          <div className="absolute -inset-16 bg-[conic-gradient(at_top,_rgba(129,140,248,0.18),_transparent_40%,_rgba(45,212,191,0.14),_transparent_70%)] opacity-60 blur-3xl" />
          <div className="relative h-full space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              Deal preview
            </p>
            <div className="grid gap-3 text-xs text-slate-200">
              <div className="flex items-center justify-between rounded-xl bg-slate-800/80 px-3 py-3 shadow-sm">
                <div>
                  <p className="font-semibold">Cloud credits</p>
                  <p className="text-[11px] text-slate-400">Up to $50k for eligible startups</p>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-semibold text-emerald-300">
                  Unlocked
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-800/60 px-3 py-3 shadow-sm">
                <div>
                  <p className="font-semibold">Product analytics</p>
                  <p className="text-[11px] text-slate-400">Founder-verified only</p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-1 text-[10px] font-semibold text-slate-200">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
                  Locked
                </span>
              </div>
              <div className="rounded-xl border border-dashed border-slate-700/80 bg-slate-900/60 px-3 py-3">
                <p className="text-[11px] text-slate-300">
                  Verify once as a founder and unlock higher-impact partnerships reserved for
                  real startups, not coupon hunters.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


