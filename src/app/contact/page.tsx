"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatePage from "@/components/AnimatePage";
import { Mail, MapPin, ShieldCheck, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    submitted: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validations
    const errors: typeof formErrors = {};
    if (!form.name.trim()) {
      errors.name = "Full name is required.";
    } else if (form.name.trim().length < 3) {
      errors.name = "Full name must be at least 3 characters.";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      errors.email = "Email address is required.";
    } else if (!emailRegex.test(form.email)) {
      errors.email = "Please enter a valid email address.";
    }
    
    if (!form.subject.trim()) {
      errors.subject = "Subject is required.";
    } else if (form.subject.trim().length < 4) {
      errors.subject = "Subject must be at least 4 characters.";
    }
    
    if (!form.message.trim()) {
      errors.message = "Message details are required.";
    } else if (form.message.trim().length < 10) {
      errors.message = "Message details must be at least 10 characters.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setForm((prev) => ({ ...prev, submitted: true }));
    }, 1200);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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
      <section className="relative py-20 bg-linear-to-r from-[#4c1d95] via-[#b45309] to-[#4c1d95] overflow-hidden border-b border-stone-200/50 mb-16">
        <div className="absolute inset-0 bg-radial-gradient from-[#d97706]/40 via-transparent to-transparent opacity-80 animate-pulse pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-black/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 text-center space-y-3 relative z-10">
          <span className="text-[#fef3c7] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] block animate-pulse">
            Connect with Our Regional Offices
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-[0.18em] leading-none select-none">
            CONTACT US
          </h1>
          <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#fef3c7] to-transparent mx-auto mt-3" />
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-4xl pb-16">
        {/* Staggered entrance animations */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Grid structure */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Office Details */}
            <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-stone-900 tracking-wide uppercase">
                Heritage Offices
              </h3>
              <p className="text-stone-500 text-xs md:text-sm leading-relaxed font-light">
                Have questions about our crop grades, laboratory seals, or placing bulk wholesale orders? Reach out to our regional distribution offices in India or the UAE, or drop us a message using the form.
              </p>
            </div>

            <div className="space-y-6 font-sans">
              {/* Kashmir Location */}
              <div className="flex gap-4 p-5 bg-white/70 backdrop-blur-md border border-stone-200/80 shadow-xl shadow-stone-100/30 hover:border-[#d97706]/40 transition-all duration-300 group">
                <div className="h-10 w-10 bg-[#d97706]/10 border border-[#d97706]/20 rounded-full flex items-center justify-center text-[#d97706] shrink-0 group-hover:scale-105 transition-transform">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="space-y-1.5 text-xs text-stone-600 font-light">
                  <h4 className="font-bold text-stone-855 uppercase tracking-wider">Pampore Agriculture Office</h4>
                  <p className="leading-relaxed text-[11px]">
                    410, Namlabal, Pampore, Pulwama District,<br />Jammu & Kashmir - 192121, India
                  </p>
                  <span className="text-[10px] text-[#d97706] font-bold block uppercase tracking-widest pt-1 leading-none">
                    Direct Grower Hub & Processing Unit
                  </span>
                </div>
              </div>

              {/* Dubai Location */}
              <div className="flex gap-4 p-5 bg-white/70 backdrop-blur-md border border-stone-200/80 shadow-xl shadow-stone-100/30 hover:border-[#d97706]/40 transition-all duration-300 group">
                <div className="h-10 w-10 bg-[#d97706]/10 border border-[#d97706]/20 rounded-full flex items-center justify-center text-[#d97706] shrink-0 group-hover:scale-105 transition-transform">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="space-y-1.5 text-xs text-stone-600 font-light">
                  <h4 className="font-bold text-stone-855 uppercase tracking-wider">Dubai Distribution Office</h4>
                  <p className="leading-relaxed text-[11px]">
                    7703, The Torch Tower, Dubai Marina,<br />Dubai, United Arab Emirates
                  </p>
                  <span className="text-[10px] text-[#d97706] font-bold block uppercase tracking-widest pt-1 leading-none">
                    GCC Wholesale & Global Logistics Unit
                  </span>
                </div>
              </div>
              {/* Email Support */}
              <div className="flex gap-4 p-5 bg-white/70 backdrop-blur-md border border-stone-200/80 shadow-xl shadow-stone-100/30 hover:border-[#d97706]/40 transition-all duration-300 group">
                <div className="h-10 w-10 bg-[#d97706]/10 border border-[#d97706]/20 rounded-full flex items-center justify-center text-[#d97706] shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="space-y-1 text-xs text-stone-600">
                  <h4 className="font-bold text-stone-855 uppercase tracking-wider">General & Export Support</h4>
                  <a href="mailto:info@indiakesar.com" className="text-[#5c2e91] hover:text-[#d97706] font-bold font-mono tracking-wide block pt-0.5 transition-colors">
                    info@indiakesar.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form with interactive submit states */}
          <motion.div 
            variants={itemVariants} 
            className="bg-white/80 backdrop-blur-md border border-stone-200/80 p-8 shadow-xl shadow-stone-100/40 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#d97706]/5 blur-2xl rounded-full pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {form.submitted ? (
                <motion.div 
                  key="success-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="h-64 flex flex-col items-center justify-center text-center p-6 space-y-4 border border-[#d97706]/10 bg-[#d97706]/5"
                >
                  <ShieldCheck className="h-12 w-12 text-[#d97706] animate-bounce" />
                  <div>
                    <h4 className="font-serif text-lg font-bold text-stone-900 uppercase tracking-wider">Message Received</h4>
                    <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                      Thank you for contacting India Kesar Company. An export representative will review your message and reach out shortly via email.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4 text-xs font-sans">
                  <div className="flex items-center gap-2 text-[#5c2e91] mb-6 border-b border-stone-100 pb-3">
                    <MessageSquare className="text-[#d97706] h-4.5 w-4.5 animate-pulse" />
                    <span className="font-serif text-base tracking-wide font-bold uppercase">Write Us A Message</span>
                  </div>

                  <div>
                    <label className="text-[9px] text-stone-500 uppercase tracking-widest block font-bold mb-1.5">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => {
                        setForm(prev => ({ ...prev, name: e.target.value }));
                        if (formErrors.name) setFormErrors(prev => ({ ...prev, name: undefined }));
                      }}
                      className={`w-full bg-stone-50/50 border ${formErrors.name ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/40' : 'border-stone-200 focus:border-[#d97706] focus:ring-[#d97706]/40'} focus:ring-1 outline-none text-stone-800 px-4 py-3.5 text-xs transition-all duration-200`}
                      placeholder="e.g. Irfan Ahmad"
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
                      value={form.email}
                      onChange={(e) => {
                        setForm(prev => ({ ...prev, email: e.target.value }));
                        if (formErrors.email) setFormErrors(prev => ({ ...prev, email: undefined }));
                      }}
                      className={`w-full bg-stone-50/50 border ${formErrors.email ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/40' : 'border-stone-200 focus:border-[#d97706] focus:ring-[#d97706]/40'} focus:ring-1 outline-none text-stone-800 px-4 py-3.5 text-xs transition-all duration-200`}
                      placeholder="name@mail.com"
                    />
                    {formErrors.email && (
                      <p className="text-rose-500 text-[10px] mt-1 font-medium">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-[9px] text-stone-500 uppercase tracking-widest block font-bold mb-1.5">Subject</label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => {
                        setForm(prev => ({ ...prev, subject: e.target.value }));
                        if (formErrors.subject) setFormErrors(prev => ({ ...prev, subject: undefined }));
                      }}
                      className={`w-full bg-stone-50/50 border ${formErrors.subject ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/40' : 'border-stone-200 focus:border-[#d97706] focus:ring-[#d97706]/40'} focus:ring-1 outline-none text-stone-800 px-4 py-3.5 text-xs transition-all duration-200`}
                      placeholder="Order status or general questions"
                    />
                    {formErrors.subject && (
                      <p className="text-rose-500 text-[10px] mt-1 font-medium">{formErrors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-[9px] text-stone-500 uppercase tracking-widest block font-bold mb-1.5">Message Details</label>
                    <textarea
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => {
                        setForm(prev => ({ ...prev, message: e.target.value }));
                        if (formErrors.message) setFormErrors(prev => ({ ...prev, message: undefined }));
                      }}
                      className={`w-full bg-stone-50/50 border ${formErrors.message ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/40' : 'border-stone-200 focus:border-[#d97706] focus:ring-[#d97706]/40'} focus:ring-1 outline-none text-stone-850 px-4 py-3.5 text-xs resize-none leading-relaxed transition-all duration-200`}
                      placeholder="Tell us what you are looking for..."
                    />
                    {formErrors.message && (
                      <p className="text-rose-500 text-[10px] mt-1 font-medium">{formErrors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#5c2e91] hover:bg-[#4a154b] text-white font-bold uppercase tracking-widest text-[10px] py-6 rounded-none cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
          </div>

          {/* Pampore Address Map (Full Width Below Address & Form) */}
          <motion.div 
            variants={itemVariants}
            className="overflow-hidden border border-stone-200/80 bg-white/70 backdrop-blur-md shadow-xl shadow-stone-100/30 hover:border-[#d97706]/40 transition-all duration-300 group"
          >
            <div className="p-4 border-b border-stone-100/80 bg-stone-50/50 flex items-center justify-between">
              <span className="font-serif text-xs font-bold text-stone-800 tracking-wider uppercase">Pampore Address Location</span>
              <span className="text-[10px] text-[#d97706] font-bold uppercase tracking-widest font-mono">Namlabal, Pampore, Jammu & Kashmir 192121</span>
            </div>
            <div className="relative w-full h-[350px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.281861053154!2d74.9298492!3d33.9984976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e18f2f2c8d2dfd%3A0xe67dbbe84a7e3ab3!2sNamlabal%2C%20Pampore%2C%20Jammu%20and%20Kashmir%20192121!5e0!3m2!1sen!2sin!4v1717510000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePage>
  );
}
