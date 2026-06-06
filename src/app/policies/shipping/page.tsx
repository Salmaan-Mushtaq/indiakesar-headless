"use client";

import React from "react";
import { ArrowLeft, Clock, ShieldCheck, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ShippingPolicy() {
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
            India Kesar Logistics
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-[0.18em] leading-none select-none">
            SHIPPING POLICY
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
            We take immense pride in processing and shipping our organic Pampore Grade A++ saffron directly to premium clients worldwide, maintaining the absolute freshness and coloring power of the harvest.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 py-6 border-y border-stone-200 bg-white p-4">
            <div className="space-y-2 text-center p-4">
              <Clock className="h-6 w-6 text-[#d97706] mx-auto animate-pulse" />
              <h4 className="font-bold text-stone-900 uppercase text-[10px] tracking-widest">Processing</h4>
              <p className="text-[11px] text-stone-500 leading-normal">Orders packed and sealed securely within 1-2 business days.</p>
            </div>
            <div className="space-y-2 text-center p-4 border-y md:border-y-0 md:border-x border-stone-100">
              <Globe className="h-6 w-6 text-[#d97706] mx-auto" />
              <h4 className="font-bold text-stone-900 uppercase text-[10px] tracking-widest">Global delivery</h4>
              <p className="text-[11px] text-stone-500 leading-normal">Shipped internationally with an estimated transit of 5-10 business days.</p>
            </div>
            <div className="space-y-2 text-center p-4">
              <ShieldCheck className="h-6 w-6 text-[#d97706] mx-auto" />
              <h4 className="font-bold text-stone-900 uppercase text-[10px] tracking-widest">Secure Packing</h4>
              <p className="text-[11px] text-stone-500 leading-normal">Packed in airtight vacuum glass jars to protect crocin and volatile oils.</p>
            </div>
          </div>

          <h3 className="font-serif text-base font-bold text-stone-900 uppercase tracking-wide">1. Shipping Costs</h3>
          <p>
            We provide **Complimentary Standard Shipping Worldwide** for all orders. For smaller orders, shipping charges will be automatically calculated during the checkout process depending on your regional zip codes.
          </p>

          <h3 className="font-serif text-base font-bold text-stone-900 uppercase tracking-wide">2. Dispatch & Tracking</h3>
          <p>
            Once your saffron package leaves our distribution centers in Pulwama, J&K or Dubai Marina, UAE, a unique shipment tracking number from DHL, FedEx, or India Post will be delivered to your registered email address automatically.
          </p>

          <h3 className="font-serif text-base font-bold text-stone-900 uppercase tracking-wide">3. Customs & Regulations</h3>
          <p>
            For international shipments to USA, Europe, and Asia, our team handles all primary custom declarations and GI certification paperwork. Customers are only responsible for localized import duties or VAT fees if required by regional ports.
          </p>
        </div>
      </div>
    </div>
  );
}
