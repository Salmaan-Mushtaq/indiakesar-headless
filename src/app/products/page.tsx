"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatePage from "@/components/AnimatePage";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/components/CartContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, Loader2 } from "lucide-react";

export default function ProductsCatalog() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<typeof PRODUCTS>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (res.ok && data.success && data.products && data.products.length > 0) {
          const mapped = data.products.map((p: any) => ({
            id: String(p.id),
            name: p.name,
            slug: p.slug,
            weight: p.weight,
            originalPrice: Number(p.original_price),
            price: Number(p.price),
            benefits: typeof p.benefits === "string" ? JSON.parse(p.benefits) : p.benefits,
            images: typeof p.images === "string" ? JSON.parse(p.images) : p.images,
          }));
          setProducts(mapped);
        } else {
          setProducts(PRODUCTS);
        }
      } catch (err) {
        console.error("Failed to load products from API:", err);
        setProducts(PRODUCTS);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const handleAddToCart = (product: (typeof PRODUCTS)[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      optionName: product.weight,
      price: product.price,
      image: product.images[0],
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (idx: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: idx * 0.15,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <AnimatePage>
      {/* Background glow orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-75 bg-linear-to-b from-[#d97706]/5 via-transparent to-transparent blur-[120px] pointer-events-none z-0" />

      {/* Page-Header Sunset Hero Banner */}
      <section className="relative py-20 bg-linear-to-r from-[#4c1d95] via-[#b45309] to-[#4c1d95] overflow-hidden border-b border-stone-200/50 mb-16">
        <div className="absolute inset-0 bg-radial-gradient from-[#d97706]/40 via-transparent to-transparent opacity-80 animate-pulse pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-black/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 text-center space-y-3 relative z-10">
          <span className="text-[#fef3c7] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] block animate-pulse">
            Authentic Pampore Saffron
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-[0.18em] leading-none select-none">
            OUR PRODUCTS
          </h1>
          <div className="h-0.5 w-16 bg-linear-to-r from-transparent via-[#fef3c7] to-transparent mx-auto mt-3" />
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <Loader2 className="h-8 w-8 text-[#d97706] animate-spin" />
            <span className="text-stone-500 text-xs font-bold uppercase tracking-widest">
              Syncing Authentic Pampore Saffron...
            </span>
          </div>
        ) : (
          /* Catalog products container */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-24">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <Card className="bg-white/80 backdrop-blur-md border border-stone-200/80 rounded-none flex flex-col justify-between overflow-hidden shadow-xl shadow-stone-100/40 hover:shadow-2xl hover:scale-[1.01] hover:border-[#d97706]/40 transition-all duration-300 relative group h-full">
                  {/* Diagonal Discount Ribbon */}
                  <div className="absolute top-0 right-0 bg-[#e11d48] text-white text-[8px] font-black px-8 py-1 rotate-45 translate-x-5 translate-y-3 uppercase tracking-widest shadow-sm z-30 select-none">
                    Discount
                  </div>

                  <CardContent className="p-0 flex flex-col justify-between h-full">
                    {/* Jar outlines Presentation */}
                    <div className="aspect-4/3 bg-stone-50/10 p-6 flex flex-col items-center justify-center relative overflow-hidden shrink-0 border-b border-stone-100">
                      <div className="absolute w-28 h-28 rounded-full border border-dashed border-[#5c2e91]/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500" />
                      <div className="relative z-10 text-[#5c2e91] text-center font-serif text-lg tracking-[0.2em] font-black uppercase">
                        SAFFRON
                      </div>
                      <span className="relative z-10 text-[9px] text-[#b45309] uppercase tracking-widest font-extrabold mt-1">
                        {product.weight}
                      </span>
                    </div>

                    {/* Black Header Banner */}
                    <div className="bg-black text-white py-3.5 px-6 text-center shrink-0">
                      <h3 className="font-serif text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                        {product.name}
                      </h3>
                    </div>

                    {/* Prices section */}
                    <div className="py-5 border-b border-stone-100 bg-white text-center flex items-center justify-center gap-4 shrink-0">
                      <span className="text-[#e11d48] line-through font-mono font-bold text-sm select-none">
                        ₹{product.originalPrice}
                      </span>
                      <span className="text-stone-900 font-mono font-black text-2xl group-hover:text-[#d97706] transition-colors">
                        ₹{product.price}
                      </span>
                    </div>

                    {/* Benefits checklist */}
                    <ul className="bg-white divide-y divide-stone-100 text-stone-600 text-[11px] font-medium font-sans flex-1">
                      {product.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="py-3 px-6 flex items-center justify-center gap-2 text-center leading-normal"
                        >
                          <Check className="h-3.5 w-3.5 text-[#5c2e91] shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  {/* Razorpay secured button */}
                  <div className="p-4 bg-white border-t border-stone-100 shrink-0">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-[#1f6feb] hover:bg-[#1a5cbd] text-white font-bold text-xs uppercase tracking-widest py-5 rounded-none flex flex-col items-center justify-center gap-0.5 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-md shadow-blue-100"
                    >
                      <span className="flex items-center gap-1.5 leading-none">
                        <CreditCard className="h-4 w-4" />
                        Pay Now
                      </span>
                      <span className="text-[7px] text-blue-200 font-light lowercase tracking-wider">
                        Secured by Razorpay
                      </span>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AnimatePage>
  );
}
