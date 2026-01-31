"use client";

import "./globals.css";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import UserIcon from "@/components/UserIcon";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-950 to-cyan-950 text-slate-50">
        <UserIcon />
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={typeof window !== "undefined" ? window.location.pathname : "app"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="font-sans"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </body>
    </html>
  );
}


