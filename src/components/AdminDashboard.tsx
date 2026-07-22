import React, { useState } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Users,
  Building2,
  SlidersHorizontal,
  RefreshCw,
  IndianRupee
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../lib/formatters';

export const AdminDashboard: React.FC = () => {
  const {
    providers,
    bookings,
    disputes,
    verifyProvider,
    resolveDispute,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'verifications' | 'disputes' | 'commission'>('verifications');

  // Stats
  const totalGMV = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalCommission = bookings.reduce((sum, b) => sum + b.platformFee, 0);
  const pendingProviders = providers.filter(p => p.verificationStatus === 'pending');
  const activeDisputesList = disputes.filter(d => d.status === 'under_review' || d.status === 'open');

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 text-slate-100">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4 z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-black text-2xl shadow-lg">
            <ShieldCheck className="w-8 h-8 text-cyan-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Platform Admin Governance Suite</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
                SUPER ADMIN HQ
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Tamil Nadu Platform GMV, Service Provider Approvals & Dispute Resolution</p>
          </div>
        </div>
      </div>

      {/* Platform Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Total Platform GMV</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-cyan-400">{formatINR(totalGMV)}</div>
          <p className="text-[11px] text-slate-400 mt-1">All processed booking transactions</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Net Commission (8%)</span>
            <IndianRupee className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">{formatINR(totalCommission)}</div>
          <p className="text-[11px] text-slate-400 mt-1">Platform revenue earned</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Pending Approvals</span>
            <FileCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400">{pendingProviders.length}</div>
          <p className="text-[11px] text-slate-400 mt-1">Awaiting Admin License Review</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Active Disputes</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-black text-rose-400">{activeDisputesList.length}</div>
          <p className="text-[11px] text-slate-400 mt-1">Requires Admin intervention</p>
        </div>
      </div>

      {/* Admin Navigation Sub-tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('verifications')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'verifications'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Service Provider Approvals ({pendingProviders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('disputes')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'disputes'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Dispute & Complaints Manager ({disputes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('commission')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'commission'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Commission Rates & Config</span>
        </button>
      </div>

      {/* TAB 1: Provider Verifications & Approvals */}
      {activeTab === 'verifications' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Pending Service Provider Admin Approvals Queue</h2>
            <span className="text-xs text-slate-400">Providers cannot login until Admin verifies details</span>
          </div>

          {pendingProviders.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/60 rounded-3xl border border-slate-800 text-xs text-slate-400">
              No pending service provider verification requests. All providers are verified!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingProviders.map(p => (
                <div key={p.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h3 className="font-bold text-sm text-white">{p.name}</h3>
                      <p className="text-xs text-slate-400">{p.title} • {p.categoryName}</p>
                      <p className="text-[11px] text-cyan-400 mt-0.5">{p.location} ({formatINR(p.hourlyRate)}/hr)</p>
                    </div>
                  </div>

                  {/* Submitted documents */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Submitted Documents & Licenses ({p.documents.length}):</span>
                    {p.documents.map(doc => (
                      <div key={doc.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-200">{doc.title}</span>
                          <span className="text-[10px] text-slate-400 block">Type: {doc.docType}</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase text-amber-400 bg-amber-950 px-2 py-0.5 rounded">
                          {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => verifyProvider(p.id, 'verified_pro')}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve Service Provider</span>
                    </button>

                    <button
                      onClick={() => verifyProvider(p.id, 'unverified')}
                      className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white font-semibold text-xs transition flex items-center justify-center gap-1"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Dispute Manager */}
      {activeTab === 'disputes' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Dispute & Customer Complaint Manager</h2>

          {disputes.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/60 rounded-3xl border border-slate-800 text-xs text-slate-400">
              No disputes filed on the platform.
            </div>
          ) : (
            <div className="space-y-3">
              {disputes.map(disp => (
                <div key={disp.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <h3 className="font-bold text-sm text-white">{disp.reason} ({disp.bookingCode})</h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-950 text-amber-300 border border-amber-800">
                      {disp.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">
                    <strong>Complainant:</strong> {disp.customerName} • <strong>Provider:</strong> {disp.providerName}
                  </p>

                  <p className="text-xs text-slate-400 italic bg-slate-950 p-3 rounded-xl border border-slate-800">
                    "{disp.description}"
                  </p>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-400 font-medium">Refund Requested: <strong className="text-white">{formatINR(disp.refundAmountRequested)}</strong></span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => resolveDispute(disp.id, 'refunded', 'Full refund authorized by Super Admin.')}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
                      >
                        Issue Refund ({formatINR(disp.refundAmountRequested)})
                      </button>

                      <button
                        onClick={() => resolveDispute(disp.id, 'resolved', 'Resolved without refund.')}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                      >
                        Mark Resolved
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Commission Configurator */}
      {activeTab === 'commission' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white">Platform Commission Rates Configuration</h2>
          <p className="text-xs text-slate-400">Configure global platform fee percentage and insurance coverage limits.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-200">Standard Platform Commission Rate (%)</label>
              <input
                type="number"
                defaultValue={8}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-cyan-400 font-bold"
              />
              <span className="text-[10px] text-slate-500 block">Deducted from gross booking total upon payout.</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-200">Property Damage Guarantee Limit (₹ INR)</label>
              <input
                type="number"
                defaultValue={500000}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-emerald-400 font-bold"
              />
              <span className="text-[10px] text-slate-500 block">Maximum liability coverage per booking.</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
