import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  MessageSquare,
  FileText,
  Star,
  AlertTriangle,
  Plus,
  CheckCircle2,
  RefreshCw,
  Wrench,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../lib/formatters';

export const CustomerDashboard: React.FC = () => {
  const {
    currentPersona,
    bookings,
    updateBookingStatus,
    setActiveChatBooking,
    setActiveInvoiceBooking,
    setActiveReviewBooking,
    setActiveDisputeBooking,
    setBookingModalOpen,
    providers,
    setSelectedProviderForDetail,
    setPreselectedProviderForBooking
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed'>('all');

  const customerBookings = bookings.filter(b => b.customerId === currentPersona.id || b.customerName === currentPersona.name);

  const filteredBookings = customerBookings.filter(b => {
    if (statusFilter === 'active') return b.status === 'requested' || b.status === 'confirmed' || b.status === 'in_progress';
    if (statusFilter === 'completed') return b.status === 'completed' || b.status === 'cancelled';
    return true;
  });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 text-slate-100">
      
      {/* Homeowner Header Profile Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

        <div className="flex items-center gap-4 z-10">
          <img
            src={currentPersona.avatar}
            alt={currentPersona.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-blue-500/30"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{currentPersona.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold">
                Customer Account
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{currentPersona.email} • {currentPersona.phone}</p>
            <div className="text-xs text-slate-300 font-medium mt-2 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Velachery Main Road, Chennai, Tamil Nadu</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 z-10 w-full md:w-auto">
          <button
            onClick={() => setBookingModalOpen(true)}
            className="w-full md:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Book New Service</span>
          </button>
        </div>
      </div>

      {/* Bookings Timeline Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Your Service Bookings ({customerBookings.length})</h2>
            <p className="text-xs text-slate-400">Track real-time technician dispatch and view digital receipts in INR ₹.</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                statusFilter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({customerBookings.length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                statusFilter === 'active' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                statusFilter === 'completed' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              History
            </button>
          </div>
        </div>

        {/* Bookings Cards Stream */}
        {filteredBookings.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/60 rounded-3xl border border-slate-800 space-y-3">
            <Wrench className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="font-bold text-white text-base">No Bookings Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You haven't scheduled any service pros in this filter view yet.
            </p>
            <button
              onClick={() => setBookingModalOpen(true)}
              className="mt-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
            >
              Book Service Now
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map(bk => {
              const stepperSteps = ['requested', 'confirmed', 'in_progress', 'completed'];
              const currentStepIdx = stepperSteps.indexOf(bk.status);

              return (
                <div
                  key={bk.id}
                  className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5 hover:border-slate-700 transition"
                >
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <img src={bk.providerAvatar} alt={bk.providerName} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-800" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-white">{bk.serviceTitle}</h3>
                          <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/50">
                            {bk.bookingCode}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">Assigned Pro: <strong className="text-slate-200">{bk.providerName}</strong> ({bk.providerTitle})</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-medium">Scheduled:</span>
                      <span className="text-xs font-bold text-white bg-slate-950 px-3 py-1 rounded-xl border border-slate-800 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{bk.scheduledDate} ({bk.timeSlot})</span>
                      </span>
                    </div>
                  </div>

                  {/* Status Stepper */}
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Live Progress Status</div>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { label: 'Requested', code: 'requested' },
                        { label: 'Confirmed', code: 'confirmed' },
                        { label: 'In Progress', code: 'in_progress' },
                        { label: 'Completed', code: 'completed' }
                      ].map((st, idx) => {
                        const isDone = currentStepIdx >= idx;
                        const isCurrent = bk.status === st.code;

                        return (
                          <div key={idx} className="flex flex-col gap-1 text-center">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                isDone ? 'bg-cyan-400' : 'bg-slate-800'
                              } ${isCurrent ? 'ring-2 ring-cyan-400/50 animate-pulse' : ''}`}
                            />
                            <span className={`text-[10px] font-bold ${isCurrent ? 'text-cyan-400' : isDone ? 'text-slate-300' : 'text-slate-600'}`}>
                              {st.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom Actions Bar */}
                  <div className="pt-2 flex items-center justify-between gap-3 flex-wrap">
                    <div className="text-xs text-slate-300">
                      <span>Total Amount: </span>
                      <strong className="text-cyan-400 text-sm font-black">{formatINR(bk.totalAmount)}</strong>
                      <span className="text-slate-500 font-normal ml-1">({bk.paymentMethod})</span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Chat Button */}
                      <button
                        onClick={() => setActiveChatBooking(bk)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700/60 transition flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                        <span>Chat Pro ({bk.messages.length})</span>
                      </button>

                      {/* Invoice Button */}
                      <button
                        onClick={() => setActiveInvoiceBooking(bk)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700/60 transition flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Digital Receipt</span>
                      </button>

                      {/* Mark Completed */}
                      {bk.status === 'in_progress' && (
                        <button
                          onClick={() => updateBookingStatus(bk.id, 'completed')}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Mark Work Done</span>
                        </button>
                      )}

                      {/* Leave Review */}
                      {bk.status === 'completed' && !bk.hasReview && (
                        <button
                          onClick={() => setActiveReviewBooking(bk)}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition flex items-center gap-1.5"
                        >
                          <Star className="w-3.5 h-3.5 fill-white" />
                          <span>Rate Service</span>
                        </button>
                      )}

                      {/* File Dispute */}
                      {!bk.hasDispute && (
                        <button
                          onClick={() => setActiveDisputeBooking(bk)}
                          className="px-3.5 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/60 text-xs font-semibold transition flex items-center gap-1.5"
                        >
                          <AlertTriangle className="w-3 h-3 text-rose-400" />
                          <span>File Complaint</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Preferred Local Pros */}
      <div className="space-y-4 pt-4 border-t border-slate-800/80">
        <h2 className="text-xl font-bold text-white tracking-tight">Saved & Highly Rated Local Pros</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.slice(0, 3).map(p => (
            <div key={p.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-1">
                    <span>{p.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  </h4>
                  <p className="text-xs text-slate-400">{p.title}</p>
                  <div className="text-[11px] text-amber-400 font-semibold mt-0.5">
                    ★ {p.rating} ({p.reviewCount}) • {formatINR(p.hourlyRate)}/hr
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setPreselectedProviderForBooking(p);
                  setBookingModalOpen(true);
                }}
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition shrink-0"
                title="Book Pro"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
