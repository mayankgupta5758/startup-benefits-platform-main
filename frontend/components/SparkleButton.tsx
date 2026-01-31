"use client";

import { motion, useAnimate } from "framer-motion";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function SparkleButton({ children, href, onClick, className }: Props) {
  const [scope] = useAnimate();
  const router = useRouter();

  return (
    <motion.button
      ref={scope}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => (href ? router.push(href) : onClick?.())}
      className={`relative transition ${className}`}
    >
      {children}
      <span className="absolute inset-0 rounded-full blur-xl bg-cyan-400/30 opacity-0 group-hover:opacity-100 transition" />
    </motion.button>
  );
}
