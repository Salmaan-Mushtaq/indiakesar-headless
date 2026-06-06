"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
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
            India Kesar Heritage
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-[0.18em] leading-none select-none">
            TERMS OF SERVICE
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
            Welcome to the India Kesar Company digital storefront. By accessing this headless web platform, you agree to comply with and be bound by the following terms and conditions of service.
          </p>

          <h3 className="font-serif text-base font-bold text-stone-900 uppercase tracking-wide">1. Authenticity Commitment</h3>
          <p>
            We guarantee that all saffron sold on this platform is 100% genuine Kashmiri saffron grown in Pampore, Jammu & Kashmir. We deal directly with consumers and farmers to ensure fully tracked batches and Grade I certification parameters.
          </p>

          <h3 className="font-serif text-base font-bold text-stone-900 uppercase tracking-wide">2. Product Descriptions & Pricing</h3>
          <p>
            We strive to ensure that all catalog details, harvest parameters, laboratory grades, and pricing schedules are perfectly accurate. In the rare event of price modifications or crop stock shortages, we reserve the right to cancel placed orders and issue instant full refunds.
          </p>

          <h3 className="font-serif text-base font-bold text-stone-900 uppercase tracking-wide">3. Commercial & Export Agreements</h3>
          <p>
            Any bulk order, trade deal, or export package submitted through our wholesale channels is subjected to individual commercial agreements signed between India Kesar and the purchasing enterprise.
          </p>
        </div>
      </div>
    </div>
  );
}
