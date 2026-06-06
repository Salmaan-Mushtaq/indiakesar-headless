"use client";

import React from "react";
import { motion } from "framer-motion";
import AnimatePage from "@/components/AnimatePage";
import { Award, ShieldCheck, Heart } from "lucide-react";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <AnimatePage>
      {/* Saffron background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[300px] bg-gradient-to-b from-[#d97706]/5 via-transparent to-transparent blur-[120px] pointer-events-none z-0" />

      {/* Page-Header Sunset Hero Banner */}
      <section className="relative py-20 bg-linear-to-r from-[#4c1d95] via-[#b45309] to-[#4c1d95] overflow-hidden border-b border-stone-200/50">
        <div className="absolute inset-0 bg-radial-gradient from-[#d97706]/40 via-transparent to-transparent opacity-80 animate-pulse pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-black/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 text-center space-y-3 relative z-10">
          <span className="text-[#fef3c7] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] block animate-pulse">
            Since 1988
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-[0.18em] leading-none select-none">
            ABOUT US
          </h1>
          <div className="h-[2px] w-16 bg-linear-to-r from-transparent via-[#fef3c7] to-transparent mx-auto mt-3" />
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-4xl space-y-16 mt-16">
        {/* Main Heritage Text blocks with staggered entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          {/* Text block */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 space-y-6 text-stone-600 text-xs md:text-sm leading-relaxed font-light font-sans"
          >
            <h3 className="font-serif text-xl font-semibold text-[#5c2e91] tracking-wide leading-snug uppercase">
              6th-Generation Passion & Integrity in Saffron
            </h3>
            <p>
              India Kesar Company represents more than a century of passion and over four generations of dedication in the production and sale of saffron. For over a hundred years, our families have put passion and perseverance into creating the most sublime saffron originating from Pampore, Kashmir.
            </p>
            <p>
              Established formally in 1988, India Kesar company has been focusing on marketing and promoting top quality saffron originating from Pampore both in bulk and retail packaging.
            </p>
            <p>
              By dealing directly with consumers and excluding intermediaries, we ensure full batch tracking, authentic GI-tag support, and complete moisture protection, delivering fresh saffron threads right from the farm to your doorstep.
            </p>
          </motion.div>

          {/* Saffron standards card - Refined with premium glassmorphism */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 bg-white/75 backdrop-blur-md border border-stone-200/80 p-6 space-y-6 shadow-xl shadow-stone-100/40 hover:border-[#d97706]/40 transition-all duration-300"
          >
            <h4 className="font-serif text-sm font-bold text-stone-900 tracking-wider uppercase border-b border-stone-100 pb-3">
              Saffron Standards
            </h4>
            <ul className="space-y-4 text-[11px] text-stone-500">
              <li className="flex gap-2.5 group">
                <div className="h-8 w-8 bg-[#d97706]/10 border border-[#d97706]/20 rounded-full flex items-center justify-center text-[#d97706] shrink-0 group-hover:scale-105 transition-transform">
                  <Award className="h-4.5 w-4.5 text-[#d97706]" />
                </div>
                <div>
                  <strong className="text-stone-800 block text-xs uppercase tracking-wide">100% Pampore Origin</strong>
                  Harvested exclusively in Namlabal, Pampore, Jammu & Kashmir.
                </div>
              </li>

              <li className="flex gap-2.5 group">
                <div className="h-8 w-8 bg-[#d97706]/10 border border-[#d97706]/20 rounded-full flex items-center justify-center text-[#d97706] shrink-0 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="h-4.5 w-4.5 text-[#d97706]" />
                </div>
                <div>
                  <strong className="text-stone-800 block text-xs uppercase tracking-wide">Grade A++ Certified</strong>
                  Independently verified with crocin strength values exceeding 240.
                </div>
              </li>

              <li className="flex gap-2.5 group">
                <div className="h-8 w-8 bg-[#d97706]/10 border border-[#d97706]/20 rounded-full flex items-center justify-center text-[#d97706] shrink-0 group-hover:scale-105 transition-transform animate-pulse">
                  <Heart className="h-4.5 w-4.5 text-[#d97706]" />
                </div>
                <div>
                  <strong className="text-stone-800 block text-xs uppercase tracking-wide">Shade Cured Pure</strong>
                  Nourished under natural shade to preserve volatile safranal oils.
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePage>
  );
}
