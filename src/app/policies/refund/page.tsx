"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RefundPolicy() {
  return (
    <div className="relative font-sans pb-24">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[300px] bg-gradient-to-b from-[#d97706]/5 via-transparent to-transparent blur-[120px] pointer-events-none z-0" />
      
      {/* Page-Header Sunset Hero Banner (Policy Version) */}
      <section className="relative py-14 bg-gradient-to-r from-[#4c1d95] via-[#b45309] to-[#4c1d95] overflow-hidden border-b border-stone-200/50 mb-12">
        <div className="absolute inset-0 bg-radial-gradient from-[#d97706]/40 via-transparent to-transparent opacity-80 animate-pulse pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 text-center space-y-2 relative z-10">
          <span className="text-[#fef3c7] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] block animate-pulse">
            India Kesar Guarantees
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-[0.18em] leading-none select-none">
            REFUND POLICY
          </h1>
          <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-[#fef3c7] to-transparent mx-auto mt-2" />
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-3xl space-y-8 relative z-10">
        
        <Button
          asChild
          variant="ghost"
          className="text-[#d97706] hover:text-[#b45309] hover:bg-stone-100/50 uppercase tracking-widest text-[10px] font-bold pl-0 flex items-center gap-1.5 cursor-pointer rounded-none"
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </Button>

        <div className="text-stone-600 text-xs md:text-sm leading-relaxed space-y-6 font-light">
          <p>
            Your satisfaction is our absolute priority. Given the premium nature of our organic Kashmiri harvests, we strive to ensure that every jar and tin meets the highest standard of culinary purity.
          </p>

          <h3 className="font-serif text-base font-bold text-stone-900 uppercase tracking-wide">1. 30-Day Satisfaction Guarantee</h3>
          <p>
            If you feel the coloring strength, aroma, or overall grade of our saffron does not meet Grade I specifications, or if your package was damaged during international transit, you are entitled to a **full refund or a free replacement** within 30 days of receiving your package.
          </p>

          <h3 className="font-serif text-base font-bold text-stone-900 uppercase tracking-wide">2. How to Request a Refund</h3>
          <p>
            To initiate a return or request a refund, please email our support team directly at <strong className="text-stone-850 font-medium">info@indiakesar.com</strong> with:
            <br />
            • Your unique order number
            <br />
            • Clear photographs of the damaged transit box or sealed product jar
            <br />
            • A brief description of the issue or crop parameters encountered.
          </p>

          <h3 className="font-serif text-base font-bold text-stone-900 uppercase tracking-wide">3. Process Times</h3>
          <p>
            Refund requests are audited by our Pulwama and Dubai logistics management within 2 business days. Approved refunds are credited directly back to your original source of payment (Credit Card / NetBanking / Razorpay) within 5-7 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
