"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Trash2, Plus, Minus, ShieldCheck, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { useCart } from "./CartContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";

export default function Navigation() {
  const pathname = usePathname();
  const { cart, removeFromCart, updateQuantity, cartCount, cartTotal, clearCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamic Checkout States
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "shipping" | "success">("cart");
  const [shippingName, setShippingName] = useState("");
  const [shippingEmail, setShippingEmail] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastOrderId, setLastOrderId] = useState("");
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  }>({});

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    // Client-side validations
    const errors: typeof formErrors = {};
    if (!shippingName.trim()) {
      errors.name = "Full name is required.";
    } else if (shippingName.trim().length < 3) {
      errors.name = "Full name must be at least 3 characters.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!shippingEmail) {
      errors.email = "Email address is required.";
    } else if (!emailRegex.test(shippingEmail)) {
      errors.email = "Please enter a valid email address.";
    }
    const phoneRegex = /^[0-9\s\-+()]{10,20}$/;
    if (!shippingPhone) {
      errors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(shippingPhone.trim())) {
      errors.phone = "Please enter a valid phone number (at least 10 digits).";
    }
    if (!shippingAddress.trim()) {
      errors.address = "Delivery address is required.";
    } else if (shippingAddress.trim().length < 10) {
      errors.address = "Address details must be at least 10 characters.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    
    setIsProcessing(true);
    
    try {
      const resScript = await loadRazorpay();
      if (!resScript) {
        alert("Failed to load Razorpay payment SDK.");
        setIsProcessing(false);
        return;
      }

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: cart.map(item => ({
            id: item.id,
            price: item.price,
            quantity: item.quantity
          })),
          customerName: shippingName,
          shippingAddress: `${shippingAddress} (Phone: ${shippingPhone})`
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || "Failed to initialize payment.");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_your_key_id",
        amount: data.amount,
        currency: data.currency,
        name: "India Kesar Company",
        description: cart.map(i => `${i.name} x${i.quantity}`).join(", "),
        order_id: data.orderId,
        handler: function (response: any) {
          setLastOrderId(data.orderId);
          setCheckoutStep("success");
          clearCart();
        },
        prefill: {
          name: shippingName,
          email: shippingEmail,
          contact: shippingPhone,
        },
        notes: {
          customer_name: shippingName,
          shipping_address: shippingAddress
        },
        theme: {
          color: "#5c2e91",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        alert("Payment failed: " + response.error.description);
      });
      rzp.open();
    } catch (err: any) {
      alert("Checkout failed: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Header Links: exactly as requested (Home, About Us, Foundation, Our Products, Our Gallery, News, Contact Us)
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Foundation", href: "/foundation" },
    { label: "Our Products", href: "/products" },
    { label: "Our Gallery", href: "/gallery" },
    { label: "News", href: "/news" },
    { label: "Contact US", href: "/contact" },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-stone-200 py-3 shadow-md shadow-stone-100"
          : "bg-white py-5 border-b border-stone-100"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* Branding Logo with round stamp layout */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Logo seal image rendering */}
          <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-full border border-stone-200 p-0.5 flex items-center justify-center bg-white group-hover:scale-105 transition-all duration-300 shrink-0 shadow-sm overflow-hidden">
            <Image
              src="/indiakeserlogo.png"
              alt="India Kesar Company Logo"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-sm md:text-base font-bold tracking-[0.15em] text-[#5c2e91] group-hover:text-[#d97706] transition-colors leading-tight">
              INDIA KESAR
            </span>
            <span className="text-[8px] tracking-[0.25em] text-stone-500 uppercase font-sans font-semibold">
              The Royal Saffron
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] md:text-xs tracking-wider uppercase font-semibold transition-all relative py-1 hover:text-[#5c2e91] ${
                  isActive ? "text-[#5c2e91]" : "text-stone-500 hover:text-stone-900"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d97706] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action buttons */}
        <div className="flex items-center space-x-3">
          {/* Dynamic Light Cart Drawer */}
          <Sheet onOpenChange={(open) => { if (!open) setCheckoutStep("cart"); }}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-stone-600 hover:text-[#5c2e91] hover:bg-stone-50 rounded-full h-10 w-10 flex items-center justify-center transition-all border border-stone-200"
              >
                <ShoppingBag className="h-4.5 w-4.5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#d97706] text-black text-[9px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md bg-white border-l border-stone-200 text-stone-800 flex flex-col h-full p-0">
              
              {/* Conditional sheet header based on checkout step */}
              <SheetHeader className="p-6 border-b border-stone-100">
                {checkoutStep === "cart" && (
                  <>
                    <SheetTitle className="font-serif text-lg tracking-wider text-[#5c2e91] flex items-center gap-2 font-bold uppercase">
                      <ShoppingBag className="text-[#d97706] h-5 w-5" />
                      Your Cart
                    </SheetTitle>
                    <SheetDescription className="text-xs text-stone-500">
                      Manage your premium saffron packaging details.
                    </SheetDescription>
                  </>
                )}
                {checkoutStep === "shipping" && (
                  <>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setCheckoutStep("cart")}
                        className="text-stone-500 hover:text-stone-800 mr-1 p-1 hover:bg-stone-50 rounded"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </button>
                      <SheetTitle className="font-serif text-lg tracking-wider text-[#5c2e91] font-bold uppercase">
                        Shipping Address
                      </SheetTitle>
                    </div>
                    <SheetDescription className="text-xs text-stone-500">
                      Where should we deliver your organic Pampore saffron?
                    </SheetDescription>
                  </>
                )}
                {checkoutStep === "success" && (
                  <>
                    <SheetTitle className="font-serif text-lg tracking-wider text-emerald-600 flex items-center gap-2 font-bold uppercase justify-center">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 animate-bounce" />
                      Payment Successful
                    </SheetTitle>
                    <SheetDescription className="text-xs text-stone-500 text-center">
                      Your order has been validated and recorded!
                    </SheetDescription>
                  </>
                )}
              </SheetHeader>

              {/* Conditional sheet content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* A. CART VIEW */}
                {checkoutStep === "cart" && (
                  cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-stone-400 space-y-4 text-center">
                      <div className="h-16 w-16 rounded-full bg-stone-50 flex items-center justify-center text-[#d97706] border border-[#d97706]/10">
                        <ShoppingBag className="h-7 w-7" />
                      </div>
                      <div>
                        <p className="font-medium text-stone-700 tracking-wide text-sm">Your cart is empty</p>
                        <p className="text-xs text-stone-500 mt-1 max-w-xs leading-normal">
                          Browse our catalog of pure Grade A++ Kashmiri saffron jars and tins.
                        </p>
                      </div>
                      <Button
                        asChild
                        className="bg-[#d97706] hover:bg-[#b45309] text-black font-bold mt-4 text-[10px] tracking-wider uppercase rounded-none"
                      >
                        <Link href="/products">Shop Saffron</Link>
                      </Button>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={`${item.id}-${item.optionName}`}
                        className="flex gap-4 pb-6 border-b border-stone-100"
                      >
                        <div className="h-16 w-16 bg-stone-50 border border-stone-100 p-2 flex items-center justify-center shrink-0">
                          <div className="w-full h-full bg-[#d97706]/5 border border-[#d97706]/10 rounded flex items-center justify-center font-serif text-[9px] text-[#d97706] text-center font-bold px-1 uppercase">
                            Kesar
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold tracking-wide text-stone-800 truncate">
                            {item.name}
                          </h4>
                          <p className="text-[10px] text-[#d97706] mt-1 font-bold bg-[#d97706]/5 border border-[#d97706]/15 px-2 py-0.5 inline-block rounded-sm">
                            {item.optionName}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-stone-200 rounded-sm">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.optionName, item.quantity - 1)
                                }
                                className="px-2 py-1 text-stone-400 hover:text-stone-700 transition-colors"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-2 text-xs font-bold text-stone-700">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.optionName, item.quantity + 1)
                                }
                                className="px-2 py-1 text-stone-400 hover:text-stone-700 transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id, item.optionName)}
                              className="text-stone-400 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-stone-800 font-mono">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    ))
                  )
                )}
                {/* B. SHIPPING DETAILS FORM VIEW */}
                {checkoutStep === "shipping" && (
                  <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }} className="space-y-4 text-xs font-sans">
                    <div>
                      <label className="text-[9px] text-stone-500 uppercase tracking-widest block font-bold mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        value={shippingName}
                        onChange={(e) => { setShippingName(e.target.value); if(formErrors.name) setFormErrors(prev => ({...prev, name: undefined})); }}
                        className={`w-full bg-stone-50/50 border ${formErrors.name ? 'border-rose-400 focus:border-rose-500' : 'border-stone-200 focus:border-[#d97706]'} focus:ring-1 outline-none text-stone-800 px-4 py-3 text-xs transition-all duration-200`}
                        placeholder="e.g. Ramesh Kumar"
                      />
                      {formErrors.name && (
                        <p className="text-rose-500 text-[10px] mt-1 font-medium">{formErrors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-[9px] text-stone-500 uppercase tracking-widest block font-bold mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={shippingEmail}
                        onChange={(e) => { setShippingEmail(e.target.value); if(formErrors.email) setFormErrors(prev => ({...prev, email: undefined})); }}
                        className={`w-full bg-stone-50/50 border ${formErrors.email ? 'border-rose-400 focus:border-rose-500' : 'border-stone-200 focus:border-[#d97706]'} focus:ring-1 outline-none text-stone-800 px-4 py-3 text-xs transition-all duration-200`}
                        placeholder="name@mail.com"
                      />
                      {formErrors.email && (
                        <p className="text-rose-500 text-[10px] mt-1 font-medium">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-[9px] text-stone-500 uppercase tracking-widest block font-bold mb-1.5">Contact Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={shippingPhone}
                        onChange={(e) => { setShippingPhone(e.target.value); if(formErrors.phone) setFormErrors(prev => ({...prev, phone: undefined})); }}
                        className={`w-full bg-stone-50/50 border ${formErrors.phone ? 'border-rose-400 focus:border-rose-500' : 'border-stone-200 focus:border-[#d97706]'} focus:ring-1 outline-none text-stone-800 px-4 py-3 text-xs transition-all duration-200`}
                        placeholder="+91 98765 43210"
                      />
                      {formErrors.phone && (
                        <p className="text-rose-500 text-[10px] mt-1 font-medium">{formErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-[9px] text-stone-500 uppercase tracking-widest block font-bold mb-1.5">Delivery Address</label>
                      <textarea
                        rows={4}
                        required
                        value={shippingAddress}
                        onChange={(e) => { setShippingAddress(e.target.value); if(formErrors.address) setFormErrors(prev => ({...prev, address: undefined})); }}
                        className={`w-full bg-stone-50/50 border ${formErrors.address ? 'border-rose-400 focus:border-rose-500' : 'border-stone-200 focus:border-[#d97706]'} focus:ring-1 outline-none text-stone-850 px-4 py-3 text-xs resize-none leading-relaxed transition-all duration-200`}
                        placeholder="House Number, Street Name, Landmark, City, State, Pin Code"
                      />
                      {formErrors.address && (
                        <p className="text-rose-500 text-[10px] mt-1 font-medium">{formErrors.address}</p>
                      )}
                    </div>
                  </form>
                )}

                {/* C. PAYMENT SUCCESS VIEW */}
                {checkoutStep === "success" && (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-6 font-sans">
                    <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
                      <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-serif text-lg font-bold text-stone-900 uppercase tracking-wider">Order Certified</h3>
                      <p className="text-xs text-stone-500 leading-relaxed max-w-xs mx-auto">
                        Thank you for your order! Your crop has been reserved and your transaction successfully captured. An email receipt has been sent to <strong className="text-stone-700">{shippingEmail}</strong>.
                      </p>
                    </div>

                    <div className="bg-stone-50 border border-stone-200 p-4 font-mono text-[10px] text-stone-400 w-full text-center space-y-1">
                      <span className="font-bold text-stone-500 block uppercase text-[8px] tracking-widest mb-1">Transaction Ref</span>
                      <div>Order: {lastOrderId}</div>
                    </div>

                    <Button
                      onClick={() => setCheckoutStep("cart")}
                      className="bg-[#5c2e91] hover:bg-[#4a154b] text-white font-bold uppercase tracking-widest text-[10px] py-5 rounded-none cursor-pointer"
                    >
                      Close Checkout
                    </Button>
                  </div>
                )}

              </div>

              {/* Checkout bottom summary blocks */}
              {cart.length > 0 && checkoutStep !== "success" && (
                <div className="bg-stone-50 border-t border-stone-200 p-6 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-stone-500 tracking-wide uppercase text-[10px] font-bold">
                      Order Subtotal
                    </span>
                    <span className="text-lg font-bold text-[#5c2e91] font-mono">₹{cartTotal}</span>
                  </div>
                  <p className="text-[10px] text-stone-500 leading-normal">
                    Secure double-sealed shipping and certificate seals included.
                  </p>
                  
                  <div className="pt-1">
                    {checkoutStep === "cart" ? (
                      <Button 
                        onClick={() => setCheckoutStep("shipping")}
                        className="w-full bg-[#d97706] hover:bg-[#b45309] text-black font-bold uppercase rounded-none tracking-widest text-[10px] py-5 flex items-center justify-center gap-1.5"
                      >
                        <ShieldCheck className="h-4 w-4" />
                        Proceed To Checkout
                      </Button>
                    ) : (
                      <Button
                        disabled={isProcessing}
                        onClick={handlePayment}
                        className="w-full bg-[#1f6feb] hover:bg-[#1a5cbd] text-white font-bold uppercase rounded-none tracking-widest text-[10px] py-5 flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-100"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Processing Secure payment...
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="h-4 w-4" />
                            Confirm & Pay Now
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>

          {/* Desktop Buy button */}
          <Button
            asChild
            className="hidden lg:flex bg-[#5c2e91] hover:bg-[#4a154b] text-white text-[10px] uppercase tracking-widest font-bold rounded-none px-6"
          >
            <Link href="/products">Buy From Us</Link>
          </Button>

          {/* Mobile hamburger menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-stone-600 hover:text-[#5c2e91] hover:bg-stone-50 rounded-full"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:max-w-xs bg-white border-l border-stone-200 text-stone-800 p-0 flex flex-col h-full"
            >
              <SheetHeader className="p-6 border-b border-stone-100 flex flex-row items-center justify-between">
                <div>
                  <SheetTitle className="font-serif text-base tracking-wider text-[#5c2e91] font-bold">
                    INDIA KESAR
                  </SheetTitle>
                  <SheetDescription className="text-[8px] tracking-widest text-stone-400 uppercase mt-0.5">
                    The Royal Saffron
                  </SheetDescription>
                </div>
              </SheetHeader>
              
              <nav className="flex-1 px-6 py-8 flex flex-col space-y-5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick}
                      className={`text-xs tracking-widest uppercase font-bold border-b border-stone-50 pb-2 hover:text-[#5c2e91] transition-colors ${
                        isActive ? "text-[#5c2e91]" : "text-stone-500"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="p-6 bg-stone-50 border-t border-stone-100 space-y-4">
                <Button
                  asChild
                  onClick={handleLinkClick}
                  className="w-full bg-[#d97706] hover:bg-[#b45309] text-black text-[10px] font-bold uppercase rounded-none tracking-widest py-5"
                >
                  <Link href="/products">Shop Catalog</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
