import React from 'react';
import { Star, ShieldCheck, MapPin, CheckCircle2, Clock, Calendar, ArrowRight } from 'lucide-react';
import { ProviderProfile } from '../types';
import { useApp } from '../context/AppContext';
import { formatINR } from '../lib/formatters';

interface ProviderCardProps {
  provider: ProviderProfile;
  viewMode?: 'grid' | 'list';
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider, viewMode = 'grid' }) => {
  const {
    setSelectedProviderForDetail,
    setPreselectedProviderForBooking,
    setBookingModalOpen,
    isAuthenticated,
    setAuthModalOpen,
    setAuthModalMode,
    setAuthNotice
  } = useApp();

  const handleBookClick = () => {
    setPreselectedProviderForBooking(provider);
    if (!isAuthenticated) {
      setAuthNotice(`Please sign in or create a customer account to book ${provider.name}.`);
      setAuthModalMode('login');
      setAuthModalOpen(true);
    } else {
      setBookingModalOpen(true);
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-slate-900/90 border border-slate-800/80 hover:border-blue-500/50 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 group flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative shrink-0">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-800 group-hover:ring-blue-500/50 transition-all"
            />
            {provider.isOnline && (
              <span
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 ring-2 ring-slate-900 rounded-full"
                title="Online now - Instant Dispatch Available"
              />
            )}
          </div>

          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-slate-100 text-base group-hover:text-sky-300 transition-colors truncate">
                {provider.name}
              </h3>
              {provider.verificationStatus === 'verified_pro' && (
                <span className="p-0.5 rounded-full bg-blue-500/20 text-sky-400" title="Verified Pro">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                </span>
              )}
              <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 text-slate-300 rounded-md">
                {provider.categoryName}
              </span>
            </div>

            <p className="text-xs text-slate-400 line-clamp-1">{provider.bio}</p>

            <div className="flex items-center gap-3 text-xs pt-0.5">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{provider.rating}</span>
                <span className="text-slate-500 font-normal">({provider.reviewCount})</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>{provider.distanceKm} km away</span>
              </div>
              <span className="text-slate-600 hidden md:inline">•</span>
              <span className="text-slate-400 hidden md:inline font-medium">{provider.experienceYears} Years Exp</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 justify-between sm:justify-end border-t sm:border-t-0 border-slate-800/80 pt-3 sm:pt-0 shrink-0">
          <div className="text-right">
            <div className="font-black text-lg text-slate-50">{formatINR(provider.hourlyRate)}</div>
            <div className="text-[10px] text-slate-400 font-medium">per hour</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedProviderForDetail(provider)}
              className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs font-semibold border border-slate-700/60 transition"
            >
              Details
            </button>
            <button
              onClick={handleBookClick}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition flex items-center gap-1.5"
            >
              <span>Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800/80 hover:border-blue-500/50 rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 via-transparent to-purple-600/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10">
        {/* Header Avatar + Badges + Rate */}
        <div className="flex items-start gap-3 justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-800 group-hover:ring-blue-500/50 transition-all"
              />
              {provider.isOnline && (
                <span
                  className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 ring-2 ring-slate-900 rounded-full"
                  title="Online now - Instant Dispatch Available"
                />
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-bold text-slate-100 text-base group-hover:text-sky-300 transition-colors">
                  {provider.name}
                </h3>
                {provider.verificationStatus === 'verified_pro' && (
                  <span className="p-0.5 rounded-full bg-blue-500/20 text-sky-400" title="Verified Pro Badge">
                    <ShieldCheck className="w-4 h-4 text-sky-400" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-medium">{provider.title}</p>
              
              {/* Rating + Distance */}
              <div className="flex items-center gap-2 mt-1 text-xs">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{provider.rating}</span>
                  <span className="text-slate-400 font-normal">({provider.reviewCount})</span>
                </div>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-1 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>{provider.distanceKm} km</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rate Badge in INR */}
          <div className="text-right shrink-0">
            <div className="font-black text-lg text-slate-50">{formatINR(provider.hourlyRate)}</div>
            <div className="text-[10px] text-slate-400 font-medium">per hour</div>
          </div>
        </div>

        {/* Bio summary */}
        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
          {provider.bio}
        </p>

        {/* Badges Chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {provider.badges.map((badge, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 text-[10px] font-semibold bg-slate-950/80 text-slate-300 border border-slate-800 rounded-lg flex items-center gap-1"
            >
              <CheckCircle2 className="w-3 h-3 text-sky-400" />
              <span>{badge}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 relative z-10">
        <button
          onClick={() => setSelectedProviderForDetail(provider)}
          className="flex-1 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs font-semibold border border-slate-700/60 transition"
        >
          View Profile
        </button>

        <button
          onClick={handleBookClick}
          className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition flex items-center justify-center gap-1.5"
        >
          <span>Book Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
