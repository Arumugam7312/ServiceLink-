import React, { useState } from 'react';
import { X, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DisputeModal: React.FC = () => {
  const { activeDisputeBooking, setActiveDisputeBooking, submitDispute } = useApp();
  const [reason, setReason] = useState('Incomplete Service');
  const [description, setDescription] = useState('');
  const [refundAmount, setRefundAmount] = useState(0);

  if (!activeDisputeBooking) return null;

  const bk = activeDisputeBooking;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    await submitDispute({
      bookingId: bk.id,
      reason,
      description,
      refundAmountRequested: refundAmount || bk.totalAmount
    });

    setActiveDisputeBooking(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full shadow-2xl text-slate-100 p-6 relative">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h2 className="font-bold text-base text-white">File Booking Complaint & Dispute</h2>
          </div>
          <button
            onClick={() => setActiveDisputeBooking(null)}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Reason for Dispute
            </label>
            <select
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none"
            >
              <option value="Incomplete Service">Incomplete Service Work</option>
              <option value="Property Damage">Accidental Property Damage</option>
              <option value="Unsatisfactory Quality">Poor Workmanship Quality</option>
              <option value="Billing Discrepancy">Billing / Charge Discrepancy</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Detailed Complaint Explanation
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              placeholder="Describe what occurred, missing items, or reasons for refund..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Requested Refund Amount ($)
            </label>
            <input
              type="number"
              value={refundAmount || bk.totalAmount}
              onChange={e => setRefundAmount(Number(e.target.value))}
              max={bk.totalAmount}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">Maximum total booking amount: ${bk.totalAmount}</span>
          </div>

          <button
            type="submit"
            disabled={!description.trim()}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg shadow-amber-600/20 disabled:opacity-50 transition"
          >
            Submit Dispute to Admin Resolution Team
          </button>
        </form>

      </div>
    </div>
  );
};
