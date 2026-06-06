"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
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
            India Kesar Purity
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-[0.18em] leading-none select-none">
            PRIVACY POLICY
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
            At India Kesar Company, we appreciate your trust and are fully committed to protecting the absolute privacy and security of your personal data when browsing our headless ecommerce storefront.
          </p>

          <h3 className="font-serif text-base font-bold text-stone-900 uppercase tracking-wide">1. What Information Do We Collect?</h3>
          <p>
            We collect information explicitly provided by you during transactions, newsletter subscription, or bulk trade inquiries, including your full name, email address, physical shipping address, phone number, and transaction inputs. We never store credit/debit card numbers directly on our headless databases. All payments are processed securely via encrypted API checkouts.
          </p>

          <h3 className="font-serif text-base font-bold text-stone-900 uppercase tracking-wide">2. How Do We Secure Your Data?</h3>
          <p>
            Our headless Next.js frontend uses state-of-the-art secure routing protocols, running entirely in highly sandboxed serverless environments on Vercel CDN. Any interaction with our backend WordPress server or database uses securely signed JWT tokens and industry-standard SSL encryption.
          </p>

          <h3 className="font-serif text-base font-bold text-stone-900 uppercase tracking-wide">3. Third-Party Sharing</h3>
          <p>
            We do not sell, rent, or trade your personal details to advertising networks. Your information is only shared with essential logistics partners (like FedEx and DHL) to ship your products, and payment processors to complete transactions.
          </p>
        </div>
      </div>
    </div>
  );
}
