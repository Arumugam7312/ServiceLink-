import React from 'react';
import { Search, MapPin, Sparkles, ShieldCheck, Star, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';

export const HeroSection: React.FC = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, categories, setAiModalOpen, setBookingModalOpen } = useApp();

  return (
    <div className="relative overflow-hidden bg-slate-950 text-slate-100 py-16 md:py-24 border-b border-slate-800/80">
      
      {/* Background Radial Glow Layer */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.18),rgba(2,6,23,0))]" />

      {/* Decorative Subtle Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-6"
        >
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-sky-500/30 shadow-lg shadow-sky-500/5 text-xs font-semibold text-sky-300">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>Tamil Nadu's Premier Admin-Verified Service Network</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-50">
            Book Verified Electricians, Plumbers & Techs in <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">Minutes</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Transparent upfront pricing in Indian Rupees (₹), instant scheduling across Chennai, Coimbatore, Madurai, Trichy & Salem with 100% Admin Safety Guarantee.
          </p>

          {/* Search Bar & Location Selector Box */}
          <div className="mt-8 bg-slate-900/90 p-2 sm:p-3 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-xl max-w-2xl mx-auto flex flex-col sm:flex-row gap-2">
            
            {/* Search Input */}
            <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-950/90 rounded-xl border border-slate-800/80">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search services (e.g., Inverter Wiring, AC Jet Wash, Geyser Fix)..."
                className="w-full bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              />
            </div>

            {/* Tamil Nadu City Location dropdown */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-950/90 rounded-xl border border-slate-800/80 shrink-0">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
              <select className="bg-transparent text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer">
                <option className="bg-slate-900 text-white">Chennai (Velachery, T. Nagar)</option>
                <option className="bg-slate-900 text-white">Coimbatore (RS Puram, Peelamedu)</option>
                <option className="bg-slate-900 text-white">Madurai (Simmakkal, KK Nagar)</option>
                <option className="bg-slate-900 text-white">Trichy (Thillai Nagar)</option>
                <option className="bg-slate-900 text-white">Salem (Fairlands)</option>
              </select>
            </div>

            {/* Book Now button */}
            <button
              onClick={() => setBookingModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <span>Explore Pros</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* AI Repair Advisor Trigger Banner */}
          <div className="pt-2">
            <button
              onClick={() => setAiModalOpen(true)}
              className="w-full max-w-2xl mx-auto p-4 rounded-2xl bg-gradient-to-r from-indigo-950/50 via-slate-900 to-slate-900 border border-indigo-500/30 hover:border-indigo-400/60 transition-all text-left group flex items-center justify-between gap-4 shadow-xl"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-indigo-300 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2 font-bold text-sm text-indigo-200">
                    <span>Unsure what repair you need?</span>
                    <span className="px-2 py-0.5 text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30 uppercase tracking-wide">
                      Gemini AI Engine
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Describe your problem (e.g. "Water dripping from AC in bedroom") for instant Tamil Nadu cost estimation in INR ₹.
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-indigo-300 group-hover:translate-x-1 transition-transform">
                <span>Diagnose Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>

          {/* Category Chips Bar */}
          <div className="pt-4 flex items-center justify-center flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/25'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              All Services
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/25'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Trust Metrics Bar */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-slate-800/80">
            <div className="text-center p-3">
              <div className="font-black text-2xl text-slate-50 flex items-center justify-center gap-1">
                <span>4.92</span>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Average Customer Rating</p>
            </div>

            <div className="text-center p-3">
              <div className="font-black text-2xl text-slate-50">25,000+</div>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Tamil Nadu Bookings</p>
            </div>

            <div className="text-center p-3">
              <div className="font-black text-2xl text-sky-400">100%</div>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Admin License Verified</p>
            </div>

            <div className="text-center p-3">
              <div className="font-black text-2xl text-emerald-400">₹5 Lakhs</div>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Damage Protection</p>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};
