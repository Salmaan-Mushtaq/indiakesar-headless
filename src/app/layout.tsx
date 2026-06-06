import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "India Kesar Company | Premium Authentic Kashmiri Saffron",
  description: "Experience the pure, authentic, hand-picked Kashmiri Saffron from Pampore, Kashmir. A century-old heritage of quality and passion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fafaf9] text-stone-800 selection:bg-[#d97706]/20 selection:text-stone-900 font-sans relative overflow-x-hidden">
        {/* Unified Saffron-Glow Background Orbs */}
        <div className="fixed top-[-15%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-[#d97706]/8 to-transparent blur-[120px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: "12s" }} />
        <div className="fixed bottom-[-15%] right-[-15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-bl from-[#5c2e91]/6 to-transparent blur-[120px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: "16s" }} />

        <CartProvider>
          <Navigation />
          <main className="flex-1 relative z-10 pt-20">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

