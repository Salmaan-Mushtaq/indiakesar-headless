import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Award, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-900 border-t border-stone-200 text-stone-300 font-sans mt-auto">
      {/* Main links columns */}
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Intro Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-full border border-stone-850 p-0.5 flex items-center justify-center bg-white shrink-0 overflow-hidden shadow-md shadow-black/10">
                <Image
                  src="/indiakeserlogo.png"
                  alt="India Kesar Company Logo"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <div>
                <span className="font-serif text-lg tracking-[0.15em] font-bold text-white block uppercase">
                  INDIA KESAR
                </span>
                <span className="text-[9px] tracking-[0.25em] text-[#d97706] uppercase font-bold mt-1 block">
                  The Royal Saffron
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              More than a century of passion and over four generations of dedication in the growing, marketing, and promoting of top-quality saffron originating from Pampore, J&K.
            </p>
          </div>

          {/* Saffron categories */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm tracking-widest text-white uppercase border-l-2 border-[#d97706] pl-3 font-bold">
              Our Products
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products" className="hover:text-[#d97706] transition-colors flex items-center justify-between group">
                  Pure Kashmiri Saffron (Retail) <ArrowUpRight className="h-3 w-3 text-stone-600 group-hover:text-[#d97706] transition-colors" />
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#d97706] transition-colors flex items-center justify-between group">
                  Pure Kashmiri Saffron (Wholesale) <ArrowUpRight className="h-3 w-3 text-stone-600 group-hover:text-[#d97706] transition-colors" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick links & Policy routes (exactly as requested) */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm tracking-widest text-white uppercase border-l-2 border-[#d97706] pl-3 font-bold">
              Information & Policies
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-[#d97706] transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/foundation" className="hover:text-[#d97706] transition-colors">Foundation</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#d97706] transition-colors">Our Gallery</Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-[#d97706] transition-colors">News</Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-[#d97706] transition-colors">Terms and Conditions</Link>
              </li>
              <li>
                <Link href="/policies/refund" className="hover:text-[#d97706] transition-colors">Refund Policy</Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-[#d97706] transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="hover:text-[#d97706] transition-colors">Shipping Policy</Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm tracking-widest text-white uppercase border-l-2 border-[#d97706] pl-3 font-bold">
              Heritage Hubs
            </h4>
            <ul className="space-y-4 text-xs">
              {/* Kashmir */}
              <li className="flex gap-2.5">
                <MapPin className="h-4 w-4 text-[#d97706] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block text-[9px] uppercase tracking-wider">Kashmir Office</span>
                  <span className="text-stone-400 mt-1 block leading-relaxed text-[10px]">
                    410, Namlabal, Pampore,<br />Jammu & Kashmir - 192121, India
                  </span>
                </div>
              </li>
              {/* Dubai */}
              <li className="flex gap-2.5">
                <MapPin className="h-4 w-4 text-[#d97706] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block text-[9px] uppercase tracking-wider">Dubai Office</span>
                  <span className="text-stone-400 mt-1 block leading-relaxed text-[10px]">
                    7703, The Torch Tower,<br />Dubai Marina, UAE
                  </span>
                </div>
              </li>
              {/* Contact email */}
              <li className="flex gap-2.5 border-t border-white/5 pt-3">
                <Mail className="h-4 w-4 text-[#d97706] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block text-[9px] uppercase tracking-wider">Direct Email</span>
                  <Link href="mailto:info@indiakesar.com" className="text-stone-400 hover:text-[#d97706] transition-colors text-[10px] block mt-0.5 font-mono">
                    info@indiakesar.com
                  </Link>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Footer bar */}
      <div className="border-t border-white/5 py-6 bg-stone-950 text-stone-500 text-[10px] font-sans">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 India Kesar Company. Cultivating authentic Pampore saffron.</p>
          <div className="flex space-x-6">
            <Link href="/policies/terms" className="hover:text-stone-300 transition-colors">Terms of Service</Link>
            <Link href="/policies/privacy" className="hover:text-stone-300 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
