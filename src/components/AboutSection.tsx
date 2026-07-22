import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, MapPin, Award, Users, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-semibold text-xs tracking-wider uppercase">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>About ServiceLink Tamil Nadu</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Tamil Nadu's #1 On-Demand Platform for Verified Local Service Professionals
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          ServiceLink bridges the gap between homeowners requiring urgent maintenance and background-checked, licensed service experts across Tamil Nadu.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl text-center space-y-2">
          <div className="text-3xl font-black text-cyan-400">12,500+</div>
          <div className="text-xs text-slate-400 font-medium">Verified Technicians</div>
        </div>
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl text-center space-y-2">
          <div className="text-3xl font-black text-blue-400">₹4.8 Cr+</div>
          <div className="text-xs text-slate-400 font-medium">Technician Payouts</div>
        </div>
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl text-center space-y-2">
          <div className="text-3xl font-black text-emerald-400">99.4%</div>
          <div className="text-xs text-slate-400 font-medium">Customer Satisfaction</div>
        </div>
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl text-center space-y-2">
          <div className="text-3xl font-black text-purple-400">30 Mins</div>
          <div className="text-xs text-slate-400 font-medium">Average Arrival Time</div>
        </div>
      </div>

      {/* Coverage Grid */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-red-400" />
          <span>Service Coverage Across Tamil Nadu Districts</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-1">
            <span className="font-bold text-white block text-sm">Chennai Metropolitan</span>
            <p className="text-slate-400">T. Nagar, Velachery, Anna Nagar, Adyar, OMR, Porur, Chromepet, Tambaram</p>
          </div>
          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-1">
            <span className="font-bold text-white block text-sm">Coimbatore Region</span>
            <p className="text-slate-400">RS Puram, Gandhipuram, Peelamedu, Saibaba Colony, Saravanampatti</p>
          </div>
          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-1">
            <span className="font-bold text-white block text-sm">Madurai Heritage</span>
            <p className="text-slate-400">Simmakkal, KK Nagar, Anna Nagar, TVS Nagar, Mattuthavani</p>
          </div>
          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-1">
            <span className="font-bold text-white block text-sm">Trichy & Thanjavur</span>
            <p className="text-slate-400">Thillai Nagar, KK Nagar, Srirangam, Cantonment</p>
          </div>
          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-1">
            <span className="font-bold text-white block text-sm">Salem & Erode</span>
            <p className="text-slate-400">Fairlands, Suramangalam, Perundurai Road, BPS Colony</p>
          </div>
          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-1">
            <span className="font-bold text-white block text-sm">Tirunelveli & Kanyakumari</span>
            <p className="text-slate-400">Palayamkottai, Vannarpettai, Nagercoil Town</p>
          </div>
        </div>
      </div>
    </section>
  );
};
