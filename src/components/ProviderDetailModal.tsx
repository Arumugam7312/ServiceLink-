import React from 'react';
import {
  X,
  Star,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Clock,
  FileCheck,
  Award,
  IndianRupee,
  ArrowRight,
  Image as ImageIcon
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../lib/formatters';

export const ProviderDetailModal: React.FC = () => {
  const {
    selectedProviderForDetail,
    setSelectedProviderForDetail,
    setPreselectedProviderForBooking,
    setBookingModalOpen,
    reviews
  } = useApp();

  if (!selectedProviderForDetail) return null;

  const provider = selectedProviderForDetail;
  const providerReviews = reviews.filter(r => r.providerId === provider.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-slate-100 p-6 sm:p-8 relative my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProviderForDetail(null)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Profile Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border-b border-slate-800/80 pb-6">
          <div className="relative shrink-0">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-blue-500/30"
            />
            {provider.isOnline && (
              <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 ring-4 ring-slate-900 rounded-full" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl font-bold text-white">{provider.name}</h2>
              {provider.verificationStatus === 'verified_pro' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Verified Pro</span>
                </span>
              )}
            </div>

            <p className="text-sm text-slate-300 font-medium mt-0.5">{provider.title}</p>

            <div className="flex items-center gap-4 mt-2 text-xs flex-wrap">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{provider.rating}</span>
                <span className="text-slate-400 font-normal">({provider.reviewCount} reviews)</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{provider.completedJobs} Jobs Completed</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>{provider.location}</span>
              </div>
            </div>
          </div>

          <div className="sm:text-right bg-slate-950 p-4 rounded-2xl border border-slate-800 shrink-0 w-full sm:w-auto">
            <div className="text-xs text-slate-400 uppercase font-semibold">Standard Rate</div>
            <div className="text-2xl font-black text-cyan-400">{formatINR(provider.hourlyRate)}<span className="text-sm font-medium text-slate-400">/hr</span></div>
            <button
              onClick={() => {
                setSelectedProviderForDetail(null);
                setPreselectedProviderForBooking(provider);
                setBookingModalOpen(true);
              }}
              className="mt-2 w-full px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition shadow-lg shadow-blue-600/20 flex items-center justify-center gap-1.5"
            >
              <span>Book Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bio & Badges */}
        <div className="py-6 border-b border-slate-800/80 space-y-4">
          <h3 className="font-bold text-sm text-slate-200 uppercase tracking-wider">About The Professional</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{provider.bio}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {provider.badges.map((badge, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-slate-800 text-xs font-semibold text-cyan-300 border border-slate-700/80 flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>{badge}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Offered Services & Fixed Rates */}
        <div className="py-6 border-b border-slate-800/80 space-y-4">
          <h3 className="font-bold text-sm text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-emerald-400" />
            <span>Offered Services & Upfront Rates</span>
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {provider.offeredServices.map(service => (
              <div
                key={service.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="font-bold text-sm text-white">{service.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{service.description}</p>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>Est. {service.estimatedHours} Hours</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-lg font-extrabold text-cyan-400">{formatINR(service.basePrice)}</div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">{service.priceUnit} rate</div>
                  <button
                    onClick={() => {
                      setSelectedProviderForDetail(null);
                      setPreselectedProviderForBooking(provider);
                      setBookingModalOpen(true);
                    }}
                    className="mt-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs transition"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified License & Insurance Documents */}
        {provider.documents.length > 0 && (
          <div className="py-6 border-b border-slate-800/80 space-y-4">
            <h3 className="font-bold text-sm text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-blue-400" />
              <span>Verified Licenses & Insurance Credentials</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {provider.documents.map(doc => (
                <div
                  key={doc.id}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-slate-200">{doc.title}</h4>
                    <p className="text-[10px] text-emerald-400 font-medium mt-0.5">Approved & Verified by ServiceLink Admin</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customer Reviews */}
        <div className="pt-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Customer Feedback ({providerReviews.length})</span>
          </h3>

          {providerReviews.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No reviews written yet.</p>
          ) : (
            <div className="space-y-3">
              {providerReviews.map(rev => (
                <div key={rev.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <img src={rev.customerAvatar} alt={rev.customerName} className="w-6 h-6 rounded-full object-cover" />
                      <span className="font-semibold text-slate-200">{rev.customerName}</span>
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">
                        Verified Booking
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{rev.rating}.0</span>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
