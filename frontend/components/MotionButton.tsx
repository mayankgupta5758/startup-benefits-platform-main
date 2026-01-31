"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function MotionButton({
  children,
  href,
  onClick,
  className = "",
  disabled = false,
}: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (disabled) return;
    href ? router.push(href) : onClick?.();
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      whileHover={{
        scale: 1.08,
        boxShadow: "0px 0px 25px rgba(56,189,248,0.55)",
      }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className={`relative overflow-hidden ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {/* glow layer */}
      <span className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 opacity-0 hover:opacity-30 transition duration-300 blur-xl" />
      {children}
    </motion.button>
  );
}
