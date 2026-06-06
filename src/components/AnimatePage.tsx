"use client";

import { motion } from "framer-motion";
import React from "react";

interface AnimatePageProps {
  children: React.ReactNode;
}

export default function AnimatePage({ children }: AnimatePageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 flex flex-col w-full min-h-full"
    >
      {children}
    </motion.div>
  );
}
