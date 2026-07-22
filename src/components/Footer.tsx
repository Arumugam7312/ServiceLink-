import React from 'react';
import { Wrench, ShieldCheck, Lock, Heart, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab, setBookingModalOpen, setAiModalOpen } = useApp();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1 Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                <Wrench className="w-4 h-4 text-cyan-300" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">ServiceLink TN</span>
            </div>

            <p className="text-slate-400 leading-relaxed">
              Tamil Nadu's premier SaaS marketplace connecting homeowners with verified, background-checked, and licensed local service professionals.
            </p>

            <div className="flex items-center gap-2 pt-1 text-[11px] font-semibold text-cyan-400">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>₹50,00,000 Property Damage Protection</span>
            </div>
          </div>

          {/* Col 2 Services */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Popular Trade Services</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => { setActiveTab('home'); }} className="hover:text-cyan-400 transition">Licensed Plumbing & Pipeline Leak Repair</button></li>
              <li><button onClick={() => { setActiveTab('home'); }} className="hover:text-cyan-400 transition">Master Electrician & Meter Installation</button></li>
              <li><button onClick={() => { setActiveTab('home'); }} className="hover:text-cyan-400 transition">Inverter AC Servicing & Gas Refill</button></li>
              <li><button onClick={() => { setActiveTab('home'); }} className="hover:text-cyan-400 transition">Deep Home Cleaning & Pest Control</button></li>
              <li><button onClick={() => { setActiveTab('home'); }} className="hover:text-cyan-400 transition">Washing Machine & RO Water Repair</button></li>
            </ul>
          </div>

          {/* Col 3 Platform */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Platform Portals</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => setActiveTab('customer')} className="hover:text-cyan-400 transition">Customer Homeowner Portal</button></li>
              <li><button onClick={() => setActiveTab('provider')} className="hover:text-cyan-400 transition">Service Pro Dashboard & Payouts</button></li>
              <li><button onClick={() => setActiveTab('admin')} className="hover:text-cyan-400 transition">Admin Approval & Verification Suite</button></li>
              <li><button onClick={() => setAiModalOpen(true)} className="hover:text-cyan-400 transition">Gemini AI Home Issue Diagnoser</button></li>
              <li><button onClick={() => setBookingModalOpen(true)} className="hover:text-cyan-400 transition">Instant Booking Engine</button></li>
            </ul>
          </div>

          {/* Col 4 Coverage */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Tamil Nadu Metro Coverage</h4>
            <p className="text-slate-400 leading-relaxed">
              Dispatching top-rated technicians across Chennai, Coimbatore, Madurai, Salem, Tiruchirappalli, Tirunelveli, Erode & Vellore.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-[11px] text-slate-500">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit SSL Encrypted Razorpay Payments</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            © {new Date().getFullYear()} ServiceLink TN Technologies Pvt. Ltd. All rights reserved. Built with React, TypeScript & Tailwind CSS.
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Pro Verification Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
