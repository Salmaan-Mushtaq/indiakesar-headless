"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Award, ShieldCheck, Check, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import AnimatePage from "@/components/AnimatePage";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/components/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { CinematicCarousel } from "@/components/CinematicCarousel";

const carouselImages = [
  { src: "/saffron1.jpg", alt: "Kashmiri Saffron Fields in Pampore under Sunlight" },
  { src: "/saffron2.jpg", alt: "Harvesting saffron filaments from violet blossoms" },
  { src: "/saffron3.jpg", alt: "Pure Kashmiri Saffron Threads Premium Harvest" },
  { src: "/saffron4.jpg", alt: "Violet Saffron Flowers handpicked at morning dawn" },
  { src: "/saffron5.jpg", alt: "Centuries of traditional organic kesar cultivation" },
  { src: "/saffron6.jpg", alt: "Sealed airtight packaging jars protecting the harvest" },
  { src: "/saffron7.jpg", alt: "Curated organic kashmiri kesar threads showcase" }
];

export default function Home() {
  const { addToCart } = useCart();

  const handleAddToCart = (product: typeof PRODUCTS[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      optionName: product.weight,
      price: product.price,
      image: product.images[0]
    });
  };

  // Staggered motion variants for children fade-in
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  return (
    <AnimatePage>
      {/* Background glow orbs specific to landing */}
      <div className="absolute top-0 left-1/4 w-72 md:w-[500px] h-[500px] bg-gradient-to-b from-[#d97706]/5 via-[#5c2e91]/2 to-transparent blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-96 right-1/4 w-72 md:w-[500px] h-[500px] bg-gradient-to-b from-[#5c2e91]/5 via-[#d97706]/2 to-transparent blur-[120px] pointer-events-none z-0" />
          
          {/* ================= HERO SECTION: LUXURY TYPOGRAPHY ================= */}
          <section className="relative min-h-[70vh] flex items-center py-20 bg-transparent border-b border-stone-200/40">
            
            {/* Decorative fine-line border frames */}
            <div className="absolute inset-x-6 md:inset-x-12 inset-y-8 border border-stone-200/30 pointer-events-none z-0 flex justify-between">
              <div className="w-[1px] h-full bg-stone-200/30 border-dashed" />
              <div className="w-[1px] h-full bg-stone-200/30 border-dashed" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-4xl">
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                
                {/* Stamp Tag */}
                <motion.div 
                  variants={itemVariants}
                  className="inline-flex items-center gap-1.5 px-4.5 py-1.5 bg-white/70 backdrop-blur border border-[#d97706]/20 shadow-sm text-[#5c2e91] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] rounded-full mx-auto"
                >
                  <Sparkles className="h-3 w-3 text-[#d97706] animate-pulse" />
                  The Royal Saffron Heritage
                </motion.div>

                {/* Main Luxury Header */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-black text-stone-900 leading-none uppercase tracking-[0.12em] drop-shadow-sm select-none">
                    INDIA KESAR
                  </h1>
                  
                  <div className="flex items-center justify-center gap-4">
                    <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#d97706]" />
                    <p className="font-serif text-[10px] md:text-[11px] text-[#b45309] tracking-[0.45em] font-black uppercase">
                      Premium Authentic Pampore Saffron
                    </p>
                    <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#d97706]" />
                  </div>
                </motion.div>

                {/* Subtitle intro */}
                <motion.p 
                  variants={itemVariants}
                  className="text-stone-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light font-sans"
                >
                  Nourished by the unique limestone plateau soils of Pampore, Jammu & Kashmir. Hand-harvested during late autumn dawn, our saffron delivers grade-I certified crocin value, aroma, and natural culinary coloring.
                </motion.p>

                {/* Call to action button */}
                <motion.div variants={itemVariants} className="pt-2">
                  <Button
                    asChild
                    className="bg-[#5c2e91] hover:bg-[#4a154b] text-white font-bold uppercase tracking-widest text-[10px] px-10 py-6 rounded-none cursor-pointer transition-all duration-300 hover:scale-[1.03] shadow-md shadow-[#5c2e91]/10"
                  >
                    <Link href="#products-showcase">Shop Saffron</Link>
                  </Button>
                </motion.div>

              </motion.div>

            </div>
          </section>

          {/* ================================== HARVEST HEADER BANNER (ABOVE CAROUSEL) ================================== */}
          <section className="relative py-20 bg-gradient-to-r from-[#4c1d95] via-[#b45309] to-[#4c1d95] overflow-hidden border-y border-stone-200/50">
            <div className="absolute inset-0 bg-radial-gradient from-[#d97706]/40 via-transparent to-transparent opacity-80 animate-pulse pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 text-center space-y-3 relative z-10">
              <span className="text-[#fef3c7] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] block animate-pulse">
                Photographic Archives of Pampore Valley
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-[0.2em] leading-none select-none">
                THE HARVEST
              </h2>
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#fef3c7] to-transparent mx-auto mt-3" />
            </div>
          </section>

          {/* ================================== CINEMATIC CAROUSEL: SAFFRON VISUAL STORIES (AFTER HERO) ================================== */}
          <section className="py-20 bg-stone-50/10 border-b border-stone-200/50 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl relative z-10">
              <CinematicCarousel images={carouselImages} />
            </div>
          </section>

          {/* ================================== HISTORY HEADER BANNER ================================== */}
          <section className="relative py-20 bg-gradient-to-r from-[#4c1d95] via-[#b45309] to-[#4c1d95] overflow-hidden border-y border-stone-200/50">
            <div className="absolute inset-0 bg-radial-gradient from-[#d97706]/40 via-transparent to-transparent opacity-80 animate-pulse pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 text-center space-y-3 relative z-10">
              <span className="text-[#fef3c7] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] block animate-pulse">
                India Kesar Legacy
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-[0.2em] leading-none select-none">
                HISTORY
              </h2>
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#fef3c7] to-transparent mx-auto mt-3" />
            </div>
          </section>

          {/* ================================= YEARS OF SERVICE: LEGACY BLOCK ================================= */}
          <section className="py-24 bg-white border-b border-stone-200/60 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-4xl">
              
              {/* Scroll reveal container */}
              <motion.div 
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
              >
                
                {/* Left Columns - Generations numbers */}
                <div className="lg:col-span-5 space-y-5 border-b border-stone-100 pb-8 lg:border-b-0 lg:pb-0">
                  <div className="flex items-center gap-2 text-[#d97706]">
                    <span className="h-[2px] w-6 bg-[#d97706]" />
                    <span className="text-xs font-bold uppercase tracking-widest font-sans">
                      Years Of Service
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-serif text-3xl md:text-4xl font-black text-stone-900 leading-tight uppercase tracking-wider">
                      FOUR<br />
                      GENERATIONS
                    </h3>
                    <span className="text-xs md:text-sm font-serif italic text-stone-500 font-medium block">
                      Cultivating pure Pampore gold since 1988
                    </span>
                  </div>

                  <div className="h-0.5 w-12 bg-stone-200 mt-4" />

                  <div className="space-y-2.5 pt-2 text-[9px] md:text-[10px] text-stone-500 font-bold uppercase tracking-widest font-sans">
                    <div className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 bg-[#d97706] rounded-full animate-pulse" />
                      <span>Certified Grade A++ Saffron</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 bg-[#d97706] rounded-full animate-pulse" />
                      <span>Direct Grower to Table</span>
                    </div>
                  </div>
                </div>

                {/* Right Columns - Heritage narrative */}
                <div className="lg:col-span-7 space-y-6 relative pl-6 md:pl-10">
                  <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#d97706] via-[#5c2e91]/20 to-transparent" />
                  
                  <h4 className="font-serif text-lg md:text-xl font-bold text-[#5c2e91] leading-relaxed tracking-wide">
                    "More than a century, and over four generations of passion and dedication in the production and sale of saffron."
                  </h4>
                  
                  <div className="text-stone-600 text-xs md:text-sm leading-relaxed space-y-4 font-light font-sans tracking-wide">
                    <p>
                      India Kesar is more than a company dedicated to the production and sale of saffron. Over a Century old tradition and over the years it has become many people’s dream, in a way that has endured and has passed from generation to generation. More than a hundred years putting passion and perseverance into creating the most sublime saffron.
                    </p>
                    <p>
                      India Kesar company has been focusing on Marketing and promoting top quality saffron originating from Pampore both in bulk and retail packaging. We protect this legacy with absolute laboratory seals and direct grower trades.
                    </p>
                  </div>

                  <div className="pt-4">
                    <Button
                      asChild
                      variant="outline"
                      className="border-stone-300 hover:border-[#5c2e91] text-stone-700 hover:text-[#5c2e91] bg-white hover:bg-stone-50 font-bold uppercase tracking-widest text-[9px] px-8 py-5 rounded-none cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                    >
                      <Link href="/about" className="flex items-center gap-1.5">
                        More About Us <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>

              </motion.div>

            </div>
          </section>

          {/* ================================== YOU CHOOSE WE DELIVER: FULL SCREEN BANNER ================================== */}
          <section id="products-showcase" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            
            {/* Background Image from Public directory */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/saffron3.jpg"
                alt="Premium India Kesar Background"
                fill
                className="object-cover object-center scale-105"
                unoptimized
              />
              {/* Luxury dark & warm gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/60 to-stone-950/80 backdrop-blur-[2px]" />
              {/* Decorative fine-line border frame */}
              <div className="absolute inset-6 md:inset-12 border border-white/10 pointer-events-none" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-4xl space-y-8">
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {/* Micro badge */}
                <div className="inline-flex items-center gap-1.5 px-4 py-1 bg-white/[0.06] border border-white/15 text-[#f8e8c8] text-[9px] font-bold uppercase tracking-[0.3em] rounded-full mx-auto backdrop-blur-sm">
                  Premium Delivery Network
                </div>

                {/* Text in the center */}
                <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black text-white leading-tight uppercase tracking-[0.15em] drop-shadow-lg">
                  YOU CHOOSE<br className="md:hidden" /> WE DELIVER
                </h2>
                
                <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-[#d97706] to-transparent mx-auto animate-pulse" />

                <p className="text-stone-300 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light tracking-wide font-sans">
                  From the historic clay fields of Pampore straight to your kitchen table. We handle every ounce with extreme laboratory verification, sealing in the freshness, and delivering the highest grade Kashmiri saffron securely worldwide.
                </p>

                {/* Button Buy from Us leading to products page */}
                <div className="pt-6">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#92400e] text-black font-extrabold uppercase tracking-[0.25em] text-[10px] sm:text-xs px-12 py-7 rounded-none cursor-pointer transition-all duration-300 hover:scale-105 shadow-xl shadow-amber-950/20 border border-amber-500/20"
                  >
                    <Link href="/products" className="flex items-center gap-2">
                      Buy from Us <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>

            </div>
          </section>

    </AnimatePage>
  );
}
