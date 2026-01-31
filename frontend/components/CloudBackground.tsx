"use client";

import { motion } from "framer-motion";

export function CloudBackground() {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: -200, y: i * 120, opacity: 0.25 }}
          animate={{ x: ["-20%", "120%"] }}
          transition={{
            duration: 60 + i * 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-[500px] h-[200px] rounded-full blur-3xl"
          style={{
            background:
              i % 2 === 0
                ? "linear-gradient(90deg,#4f46e5,#38bdf8)"
                : "linear-gradient(90deg,#22c55e,#0ea5e9)",
            top: `${i * 18}%`,
          }}
        />
      ))}
    </div>
  );
}
