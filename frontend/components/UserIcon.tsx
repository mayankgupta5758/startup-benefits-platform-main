"use client";

import { motion } from "framer-motion";
import { User, CheckCircle } from "lucide-react";
import { SparkleButton } from "./SparkleButton";
import { getUser, getToken } from "@/lib/api";
import { useEffect, useState } from "react";

export default function UserIcon() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (getToken()) setUser(getUser());
  }, []);

  if (!user) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed top-4 right-4 z-50"
    >
      <SparkleButton href="/profile" className="w-12 h-12 rounded-full border bg-slate-900 flex items-center justify-center">
        <User className="text-slate-300" />
        {user.isVerified && (
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5"
          >
            <CheckCircle size={12} className="text-white" />
          </motion.div>
        )}
      </SparkleButton>
    </motion.div>
  );
}
