"use client";

import { motion } from "framer-motion";

export function AnimatedClouds() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        initial={{ x: "-200px" }}
        animate={{ x: "100vw" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 opacity-30"
      >
        <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 60 Q30 40 50 20 Q70 10 90 20 Q110 10 130 20 Q150 10 170 20 Q190 30 170 50 Q190 70 170 80 Q150 90 130 80 Q110 90 90 80 Q70 90 50 80 Q30 70 50 60 Z" fill="#e2e8f0"/>
        </svg>
      </motion.div>
      <motion.div
        initial={{ x: "-250px" }}
        animate={{ x: "100vw" }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
        className="absolute top-40 opacity-25"
      >
        <svg width="250" height="120" viewBox="0 0 250 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 70 Q40 50 60 30 Q80 20 100 30 Q120 20 140 30 Q160 20 180 30 Q200 40 180 60 Q200 80 180 90 Q160 100 140 90 Q120 100 100 90 Q80 100 60 90 Q40 80 60 70 Z" fill="#cbd5e1"/>
        </svg>
      </motion.div>
      <motion.div
        initial={{ x: "-180px" }}
        animate={{ x: "100vw" }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 10 }}
        className="absolute top-60 opacity-35"
      >
        <svg width="180" height="90" viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M45 55 Q25 35 45 15 Q65 5 85 15 Q105 5 125 15 Q145 5 165 15 Q175 25 165 45 Q175 65 165 75 Q145 85 125 75 Q105 85 85 75 Q65 85 45 75 Q25 65 45 55 Z" fill="#f1f5f9"/>
        </svg>
      </motion.div>
      <motion.div
        initial={{ x: "-220px" }}
        animate={{ x: "100vw" }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 15 }}
        className="absolute top-80 opacity-20"
      >
        <svg width="220" height="110" viewBox="0 0 220 110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M55 65 Q35 45 55 25 Q75 15 95 25 Q115 15 135 25 Q155 15 175 25 Q195 35 175 55 Q195 75 175 85 Q155 95 135 85 Q115 95 95 85 Q75 95 55 85 Q35 75 55 65 Z" fill="#e2e8f0"/>
        </svg>
      </motion.div>
    </div>
  );
}
