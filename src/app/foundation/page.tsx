"use client";

import React from "react";
import { motion } from "framer-motion";
import AnimatePage from "@/components/AnimatePage";
import { Heart, Compass, Shield } from "lucide-react";

export default function Foundation() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[300px] bg-gradient-to-b from-[#d97706]/5 via-transparent to-transparent blur-[120px] pointer-events-none z-0" />

      {/* Page-Header Sunset Hero Banner */}
      <section className="relative py-20 bg-linear-to-r from-[#4c1d95] via-[#b45309] to-[#4c1d95] overflow-hidden border-b border-stone-200/50">
        <div className="absolute inset-0 bg-radial-gradient from-[#d97706]/40 via-transparent to-transparent opacity-80 animate-pulse pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-black/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 text-center space-y-3 relative z-10">
          <span className="text-[#fef3c7] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] block animate-pulse">
            Giving Back
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-[0.18em] leading-none select-none">
            FOUNDATION
          </h1>
          <div className="h-[2px] w-16 bg-linear-to-r from-transparent via-[#fef3c7] to-transparent mx-auto mt-3" />
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-4xl space-y-16 mt-16">
        {/* Core Foundation message with staggered cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          {/* Text narrative */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 text-stone-600 text-xs md:text-sm leading-relaxed font-light font-sans"
          >
            <h3 className="font-serif text-xl font-semibold text-[#5c2e91] tracking-wide leading-snug uppercase">
              Nurturing the Saffron Farming Community
            </h3>
            <p>
              The India Kesar Foundation was formed to sustain and support the farming families of Pampore, J&K. Saffron harvesting is highly labor-intensive, relying entirely on traditional manual methods that have remained unchanged for centuries.
            </p>
            <p>
              Our foundation works closely with local growers to introduce sustainable farming equipment, provide agricultural training, and safeguard water security resources on the limestone hills.
            </p>
            <p>
              A percentage of every retail and wholesale transaction on our platform directly funds the foundation's initiatives, ensuring the century-old legacy of Kashmiri saffron continues to thrive for future generations.
            </p>
          </motion.div>

          {/* Welfare columns - Refined with premium glassmorphism */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 gap-4"
          >
            {[
              {
                icon: <Heart className="h-5 w-5 text-[#d97706] animate-pulse" />,
                title: "Grower Welfare",
                desc: "Supporting the seasonal plucking and sorting communities with direct crop value shares and health coverages.",
              },
              {
                icon: <Compass className="h-5 w-5 text-[#d97706]" />,
                title: "Heritage Preservation",
                desc: "Educating younger generation families in Pampore on the complex art of organic corms planting and dry shade curing.",
              },
              {
                icon: <Shield className="h-5 w-5 text-[#d97706]" />,
                title: "Sustainable Soil Care",
                desc: "Preventing modern chemical runoffs to maintain the natural organic lacustrine clay profiles of Pampore plateaus.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-5 bg-white/70 backdrop-blur-md border border-stone-200/80 flex gap-4 shadow-xl shadow-stone-100/40 hover:border-[#d97706]/40 transition-all duration-300 group"
              >
                <div className="h-10 w-10 bg-[#d97706]/10 border border-[#d97706]/20 rounded-full flex items-center justify-center text-[#d97706] shrink-0 group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <div className="space-y-1 text-xs">
                  <h4 className="font-bold text-stone-900 uppercase tracking-wide">{item.title}</h4>
                  <p className="text-stone-500 leading-relaxed font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </AnimatePage>
  );
}
