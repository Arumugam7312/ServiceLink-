import React from 'react';
import {
  Wrench,
  Zap,
  Sparkles,
  Wind,
  Tv,
  Hammer,
  Trees,
  Paintbrush,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../lib/formatters';
import { motion } from 'motion/react';

const categoryIcons: Record<string, React.ElementType> = {
  Wrench,
  Zap,
  Sparkles,
  Wind,
  Tv,
  Hammer,
  Trees,
  Paintbrush
};

export const CategoryGrid: React.FC = () => {
  const { categories, selectedCategory, setSelectedCategory } = useApp();

  return (
    <section id="category-grid-section" className="py-12 bg-slate-900/40 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Services Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-50 tracking-tight">
              Explore Services Across Tamil Nadu
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md leading-relaxed">
            Click any service category to view verified technicians in Chennai, Coimbatore, Madurai & Salem. Compare rates in ₹ INR.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, idx) => {
            const Icon = categoryIcons[cat.iconName] || Wrench;
            const isSelected = selectedCategory === cat.id;

            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`group relative overflow-hidden p-5 rounded-2xl border text-left transition-all duration-300 ${
                  isSelected
                    ? 'bg-blue-950/80 border-blue-500 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/40'
                    : 'bg-slate-900/90 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900 shadow-lg'
                }`}
              >
                {/* Background Image overlay */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-25 transition-opacity pointer-events-none overflow-hidden rounded-bl-full">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                </div>

                <div className="relative z-10 flex flex-col justify-between h-full space-y-3">
                  <div>
                    {/* Icon & Rate Tag */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-sky-300 bg-slate-950/90 px-2.5 py-1 rounded-full border border-sky-800/40">
                        Avg {formatINR(cat.avgHourlyRate)}/hr
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-100 text-base mb-1 group-hover:text-sky-300 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Popular Services Pills */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">
                      {cat.popularServices.length} Core Services
                    </span>
                    <span className="text-blue-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      <span>View Pros</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
