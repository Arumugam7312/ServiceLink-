import React, { useState } from 'react';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  Power,
  Upload,
  FileCheck,
  MessageSquare,
  TrendingUp,
  MapPin,
  Plus,
  IndianRupee
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../lib/formatters';

export const ProviderDashboard: React.FC = () => {
  const {
    currentPersona,
    providers,
    bookings,
    updateBookingStatus,
    setActiveChatBooking,
    toggleProviderOnline,
    addToast
  } = useApp();

  const myProvider = providers.find(p => p.userId === currentPersona.id || p.id === currentPersona.providerId) || providers[0];

  const myBookings = bookings.filter(b => b.providerId === myProvider.id || b.providerName === myProvider.name);

  const pendingRequests = myBookings.filter(b => b.status === 'requested');
  const activeJobs = myBookings.filter(b => b.status === 'confirmed' || b.status === 'in_progress');
  const completedJobs = myBookings.filter(b => b.status === 'completed');

  // Financial Stats
  const totalGrossEarnings = completedJobs.reduce((sum, b) => sum + b.totalAmount, 0);
  const platformFees = completedJobs.reduce((sum, b) => sum + b.platformFee, 0);
  const netEarnings = totalGrossEarnings - platformFees;

  // New Document upload modal state
  const [docType, setDocType] = useState<'license' | 'insurance' | 'identity'>('license');
  const [docTitle, setDocTitle] = useState('');
  const [docUploading, setDocUploading] = useState(false);

  const handleDocUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim()) return;

    setDocUploading(true);
    setTimeout(() => {
      myProvider.documents.push({
        id: `doc_${Date.now()}`,
        docType,
        title: docTitle,
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=500',
        status: 'pending',
        uploadedAt: new Date().toISOString().split('T')[0]
      });

      myProvider.verificationStatus = 'pending';
      setDocTitle('');
      setDocUploading(false);
      addToast('info', 'Document Submitted', 'Tamil Nadu trade license sent to Admin Verification Queue.');
    }, 800);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 text-slate-100">
      
      {/* Provider Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4 z-10">
          <div className="relative">
            <img
              src={myProvider.avatar}
              alt={myProvider.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-blue-500/30"
            />
            {myProvider.isOnline && (
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 ring-2 ring-slate-900 rounded-full" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{myProvider.name}</h1>
              {myProvider.verificationStatus === 'verified_pro' ? (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30 text-xs font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Verified Pro</span>
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                  Pending Verification
                </span>
              )}
            </div>

            <p className="text-xs text-slate-400 mt-0.5">{myProvider.title} • {formatINR(myProvider.hourlyRate)}/hr</p>
            <p className="text-xs text-slate-300 font-medium mt-1 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{myProvider.location} ({myProvider.serviceRadiusKm} km dispatch radius)</span>
            </p>
          </div>
        </div>

        {/* Online / Offline Dispatch Toggle */}
        <div className="z-10 flex items-center gap-3 w-full md:w-auto justify-between bg-slate-950 p-3 rounded-2xl border border-slate-800">
          <div>
            <div className="text-xs font-bold text-slate-200">Dispatch Dispatching</div>
            <div className="text-[10px] text-slate-400">
              {myProvider.isOnline ? 'Online (Accepting Leads)' : 'Offline (Paused)'}
            </div>
          </div>

          <button
            onClick={() => toggleProviderOnline(myProvider.id)}
            className={`px-4 py-2 rounded-xl font-bold text-xs transition flex items-center gap-2 ${
              myProvider.isOnline
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-400'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>{myProvider.isOnline ? 'ONLINE' : 'OFFLINE'}</span>
          </button>
        </div>
      </div>

      {/* Revenue & Payout Analytics Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Net Revenue Payout</span>
            <IndianRupee className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">{formatINR(netEarnings)}</div>
          <p className="text-[11px] text-slate-400 mt-1">Direct Bank Payout Ready</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Gross Value</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-white">{formatINR(totalGrossEarnings)}</div>
          <p className="text-[11px] text-slate-400 mt-1">Total completed jobs volume</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Jobs Completed</span>
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-white">{completedJobs.length}</div>
          <p className="text-[11px] text-slate-400 mt-1">100% satisfaction rating</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Platform Fee (8%)</span>
            <Briefcase className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-indigo-300">{formatINR(platformFees)}</div>
          <p className="text-[11px] text-slate-400 mt-1">Insurance & matching fee</p>
        </div>
      </div>

      {/* Incoming Job Requests Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>Incoming Job Requests</span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-xs font-bold">
                {pendingRequests.length}
              </span>
            </h2>
            <p className="text-xs text-slate-400">Accept or decline incoming customer service leads in Tamil Nadu.</p>
          </div>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/60 rounded-3xl border border-slate-800 text-xs text-slate-400">
            No pending incoming requests right now. Your profile is live for customer bookings.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingRequests.map(req => (
              <div key={req.id} className="p-5 rounded-2xl bg-slate-900 border border-blue-500/40 shadow-xl space-y-4">
                <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="font-bold text-sm text-white">{req.serviceTitle}</h3>
                    <p className="text-xs text-slate-400">Customer: <strong className="text-slate-200">{req.customerName}</strong></p>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-extrabold text-cyan-400">{formatINR(req.totalAmount)}</div>
                    <div className="text-[10px] font-mono text-slate-400">{req.bookingCode}</div>
                  </div>
                </div>

                <div className="text-xs space-y-1.5 text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Scheduled: {req.scheduledDate} ({req.timeSlot})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Location: {req.address}, {req.city}</span>
                  </div>
                  {req.problemNotes && (
                    <p className="p-2 rounded-xl bg-slate-950 text-slate-400 italic text-[11px] mt-2">
                      "{req.problemNotes}"
                    </p>
                  )}
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => updateBookingStatus(req.id, 'confirmed')}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Accept Lead ({formatINR(req.totalAmount)})</span>
                  </button>

                  <button
                    onClick={() => updateBookingStatus(req.id, 'cancelled')}
                    className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white font-semibold text-xs transition flex items-center justify-center gap-1"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Decline</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active Work in Progress */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight">Active Work in Progress ({activeJobs.length})</h2>

        {activeJobs.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/60 rounded-3xl border border-slate-800 text-xs text-slate-400">
            No active jobs in progress.
          </div>
        ) : (
          <div className="space-y-3">
            {activeJobs.map(job => (
              <div key={job.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={job.customerAvatar} alt={job.customerName} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-bold text-sm text-white">{job.serviceTitle}</h3>
                    <p className="text-xs text-slate-400">Customer: {job.customerName} • {job.address}</p>
                    <div className="text-[11px] text-cyan-400 font-semibold mt-0.5">
                      Scheduled: {job.scheduledDate} ({job.timeSlot})
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-end">
                  <button
                    onClick={() => setActiveChatBooking(job)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700/60 transition flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                    <span>Chat Customer</span>
                  </button>

                  {job.status === 'confirmed' && (
                    <button
                      onClick={() => updateBookingStatus(job.id, 'in_progress')}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
                    >
                      Start Work
                    </button>
                  )}

                  {job.status === 'in_progress' && (
                    <button
                      onClick={() => updateBookingStatus(job.id, 'completed')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
                    >
                      Complete & Get Paid
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* State License Verification Portal */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-cyan-400" />
              <span>Tamil Nadu License & Insurance Verification Center</span>
            </h3>
            <p className="text-xs text-slate-400">Submit official trade license or Aadhaar credentials to earn the Verified Pro Badge.</p>
          </div>
        </div>

        {/* Existing Documents List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {myProvider.documents.map(doc => (
            <div key={doc.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-xs text-white">{doc.title}</h4>
                <p className="text-[10px] text-slate-400">Uploaded {doc.uploadedAt}</p>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                  doc.status === 'approved'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-amber-950 text-amber-400 border border-amber-800'
                }`}
              >
                {doc.status}
              </span>
            </div>
          ))}
        </div>

        {/* Upload form */}
        <form onSubmit={handleDocUpload} className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select
            value={docType}
            onChange={e => setDocType(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200"
          >
            <option value="license">TN Electrical / Plumbing License</option>
            <option value="insurance">Business Liability Policy</option>
            <option value="identity">Aadhaar Card / Driver ID</option>
          </select>

          <input
            type="text"
            value={docTitle}
            onChange={e => setDocTitle(e.target.value)}
            placeholder="Document title / License registration number..."
            className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-500"
          />

          <button
            type="submit"
            disabled={docUploading || !docTitle.trim()}
            className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Submit Document</span>
          </button>
        </form>
      </div>

    </div>
  );
};
