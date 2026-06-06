"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AnimatePage from "@/components/AnimatePage";
import { GALLERY_ITEMS } from "@/lib/data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CinematicCarousel } from "@/components/CinematicCarousel";
import { Loader2 } from "lucide-react";

const carouselImages = [
  { src: "/saffron1.jpg", alt: "Kashmiri Saffron Fields in Pampore under Sunlight" },
  { src: "/saffron2.jpg", alt: "Harvesting saffron filaments from violet blossoms" },
  { src: "/saffron3.jpg", alt: "Pure Kashmiri Saffron Threads Premium Harvest" },
  { src: "/saffron4.jpg", alt: "Violet Saffron Flowers handpicked at morning dawn" },
  { src: "/saffron5.jpg", alt: "Centuries of traditional organic kesar cultivation" },
  { src: "/saffron6.jpg", alt: "Sealed airtight packaging jars protecting the harvest" },
  { src: "/saffron7.jpg", alt: "Curated organic kashmiri kesar threads showcase" }
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<(typeof GALLERY_ITEMS)[0] | null>(null);
  const [galleryItems, setGalleryItems] = useState<typeof GALLERY_ITEMS>([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Fields", "Harvesting", "Processing"];

  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        if (res.ok && data.success && data.gallery && data.gallery.length > 0) {
          const mapped = data.gallery.map((g: any) => ({
            id: String(g.id),
            title: g.title,
            category: g.category,
            image: g.image,
            description: g.description
          }));
          setGalleryItems(mapped);
        } else {
          setGalleryItems(GALLERY_ITEMS);
        }
      } catch (err) {
        console.error("Failed to load gallery items from API:", err);
        setGalleryItems(GALLERY_ITEMS);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <AnimatePage>
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[300px] bg-gradient-to-b from-[#d97706]/5 via-transparent to-transparent blur-[120px] pointer-events-none z-0" />

      {/* Page-Header Sunset Hero Banner */}
      <section className="relative py-20 bg-linear-to-r from-[#4c1d95] via-[#b45309] to-[#4c1d95] overflow-hidden border-b border-stone-200/50 mb-16">
        <div className="absolute inset-0 bg-radial-gradient from-[#d97706]/40 via-transparent to-transparent opacity-80 animate-pulse pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-black/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 text-center space-y-3 relative z-10">
          <span className="text-[#fef3c7] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] block animate-pulse">
            Photographic Archives of the Saffron Harvest
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-[0.18em] leading-none select-none">
            OUR GALLERY
          </h1>
          <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#fef3c7] to-transparent mx-auto mt-3" />
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8">
        
        {/* Cinematic Widescreen Header Slider */}
        <div className="max-w-5xl mx-auto mb-16">
          <CinematicCarousel images={carouselImages} />
        </div>

        {/* Categories bar with interactive transitions */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12 border-b border-stone-200 pb-6 relative z-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-5 py-2.5 text-xs font-bold tracking-wider uppercase border transition-all duration-300 rounded-none cursor-pointer overflow-hidden ${
                activeCategory === cat
                  ? "bg-[#5c2e91] border-[#5c2e91] text-white shadow-md shadow-[#5c2e91]/10 scale-[1.02]"
                  : "border-stone-200 bg-white text-stone-500 hover:border-stone-300 hover:text-stone-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <Loader2 className="h-8 w-8 text-[#d97706] animate-spin" />
            <span className="text-stone-500 text-xs font-bold uppercase tracking-widest">
              Syncing Saffron Heritage Archives...
            </span>
          </div>
        ) : (
          /* Grid Layout of photos with staggered animation */
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeCategory} // Triggers animation on filter change
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  variants={cardVariants}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                  onClick={() => setSelectedItem(item)}
                  className="bg-white/70 backdrop-blur-md border border-stone-200/80 hover:border-[#d97706]/40 hover:scale-[1.02] transition-all duration-350 p-3 relative overflow-hidden group cursor-pointer shadow-xl shadow-stone-100/30 hover:shadow-2xl"
                >
                  <div className="aspect-4/3 bg-stone-50 border border-stone-100 relative overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent z-10 opacity-70 group-hover:opacity-85 transition-opacity" />
                    
                    {/* Text overlay details */}
                    <div className="absolute bottom-4 left-4 right-4 z-20 space-y-1 transform group-hover:translate-y-[-2px] transition-transform duration-300">
                      <span className="text-[#d97706] text-[9px] uppercase tracking-widest font-mono font-bold">
                        {item.category}
                      </span>
                      <h3 className="font-serif text-sm font-bold text-white tracking-wide leading-snug uppercase">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Detailed Image Viewer dialog */}
        <Dialog open={selectedItem !== null} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-2xl bg-white/95 backdrop-blur border border-stone-200 text-stone-850 rounded-none p-6 space-y-4 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="font-serif text-lg text-stone-900 tracking-wide font-bold uppercase">
                {selectedItem?.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-[#d97706] font-bold uppercase tracking-widest font-mono mt-1 leading-none">
                Category: {selectedItem?.category}
              </DialogDescription>
            </DialogHeader>

            {/* Large Image container */}
            <div className="aspect-[16/9] bg-stone-50 border border-stone-100 relative overflow-hidden shadow-inner">
              {selectedItem && (
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              )}
            </div>

            <p className="text-stone-600 text-xs md:text-sm leading-relaxed font-light font-sans">
              {selectedItem?.description}
            </p>
          </DialogContent>
        </Dialog>

      </div>
    </AnimatePage>
  );
}
