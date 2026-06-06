"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AnimatePage from "@/components/AnimatePage";
import { BLOG_POSTS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, ArrowLeft } from "lucide-react";

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<typeof BLOG_POSTS[0] | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <AnimatePage>
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[300px] bg-gradient-to-b from-[#d97706]/5 via-transparent to-transparent blur-[120px] pointer-events-none z-0" />

      {/* Page-Header Sunset Hero Banner */}
      <section className="relative py-20 bg-gradient-to-r from-[#4c1d95] via-[#b45309] to-[#4c1d95] overflow-hidden border-b border-stone-200/50 mb-16">
        <div className="absolute inset-0 bg-radial-gradient from-[#d97706]/40 via-transparent to-transparent opacity-80 animate-pulse pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 text-center space-y-3 relative z-10">
          <span className="text-[#fef3c7] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] block animate-pulse">
            Saffron Heritage & Cultivation Chronicles
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-[0.18em] leading-none select-none">
            NEWS
          </h1>
          <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#fef3c7] to-transparent mx-auto mt-3" />
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        
        {/* View Transitions Pane using AnimatePresence */}
        <AnimatePresence mode="wait">
          {selectedPost ? (
            /* ======================================================== */
            /* A. SINGLE POST READER VIEW */
            /* ======================================================== */
            <motion.article 
              key="post-reader"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8 font-sans"
            >
              <Button
                onClick={() => setSelectedPost(null)}
                variant="ghost"
                className="text-[#5c2e91] hover:text-[#4a154b] hover:bg-stone-100/50 uppercase tracking-widest text-[10px] font-bold pl-0 flex items-center gap-1.5 cursor-pointer rounded-none"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to News
              </Button>

              <div className="space-y-4">
                <span className="text-[#d97706] text-xs font-bold uppercase tracking-widest block font-mono">
                  {selectedPost.category}
                </span>
                <h1 className="font-serif text-2xl md:text-4xl font-bold text-stone-900 tracking-wide leading-tight uppercase">
                  {selectedPost.title}
                </h1>
                
                {/* Meta lists */}
                <div className="flex flex-wrap items-center gap-4 text-[10px] text-stone-400 uppercase tracking-widest font-semibold border-y border-stone-200 py-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-[#d97706]" />
                    {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-[#d97706]" />
                    By {selectedPost.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-[#d97706]" />
                    {selectedPost.readTime}
                  </span>
                </div>
              </div>

              {/* Cover Image */}
              <div className="aspect-[21/9] bg-stone-50 border border-stone-100 relative overflow-hidden shadow-inner">
                <Image
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Content */}
              <div className="text-stone-600 text-xs md:text-sm leading-relaxed space-y-6 font-light font-sans">
                {selectedPost.content.split("\n\n").map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </motion.article>
          ) : (
            /* ======================================================== */
            /* B. BLOGS LIST VIEW (With Staggered Entries) */
            /* ======================================================== */
            <motion.div 
              key="posts-list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {BLOG_POSTS.map((post) => (
                  <motion.div
                    key={post.id}
                    variants={itemVariants}
                    className="bg-white/70 backdrop-blur-md border border-stone-200/80 p-6 flex flex-col md:flex-row gap-6 items-center justify-between group hover:border-[#d97706]/40 hover:scale-[1.01] transition-all duration-300 shadow-xl shadow-stone-100/40 w-full"
                  >
                    <div className="flex flex-col md:flex-row gap-6 items-start flex-1 w-full">
                      {/* Image preview */}
                      <div className="relative w-full md:w-32 aspect-[16/10] md:aspect-square bg-stone-50 border border-stone-100 shrink-0 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          unoptimized
                        />
                      </div>

                      <div className="flex-1 space-y-4">
                        <span className="text-[#d97706] text-[10px] uppercase tracking-widest font-bold font-mono">
                          {post.category} — {post.readTime}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-stone-900 tracking-wide leading-snug group-hover:text-[#5c2e91] transition-colors uppercase">
                          {post.title}
                        </h3>
                        <p className="text-stone-500 text-xs md:text-sm leading-relaxed font-light">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-4 text-[10px] text-stone-400 font-bold font-sans tracking-wide">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>BY {post.author}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => setSelectedPost(post)}
                      className="bg-transparent hover:bg-stone-50 border border-stone-200 hover:border-[#d97706] text-stone-600 hover:text-stone-900 font-bold uppercase tracking-widest text-[9px] px-6 py-5 rounded-none cursor-pointer shrink-0 w-full md:w-auto flex items-center justify-center gap-1.5 mt-4 md:mt-0 transition-colors"
                    >
                      Read Article
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </AnimatePage>
  );
}
