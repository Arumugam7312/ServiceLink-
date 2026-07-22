import React from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck, Wrench, Building2, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../lib/formatters';

export const DigitalInvoiceModal: React.FC = () => {
  const { activeInvoiceBooking, setActiveInvoiceBooking } = useApp();

  if (!activeInvoiceBooking) return null;

  const bk = activeInvoiceBooking;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full shadow-2xl text-slate-900 p-6 sm:p-10 relative my-8 print:m-0 print:border-none print:shadow-none">
        
        {/* Modal Controls - Hidden when printing */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>OFFICIAL DIGITAL RECEIPT (INR ₹)</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={() => setActiveInvoiceBooking(null)}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* INVOICE CONTENT */}
        <div className="pt-6 space-y-6">
          
          {/* Top Invoice Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Wrench className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-xl text-slate-900 tracking-tight">ServiceLink TN Technologies</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Verified Local Services Marketplace<br />
                Spencer Plaza Annexe, Anna Salai • Chennai, Tamil Nadu 600002
              </p>
            </div>

            <div className="text-right">
              <div className="font-black text-2xl text-slate-900">INVOICE</div>
              <p className="font-mono text-xs font-bold text-blue-600 mt-0.5">{bk.bookingCode}</p>
              <p className="text-xs text-slate-500 mt-1">Date: {bk.createdAt}</p>
              <div className="mt-2 inline-block px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold text-xs">
                PAID IN FULL
              </div>
            </div>
          </div>

          {/* Customer & Provider Meta */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <div className="font-bold text-slate-400 uppercase text-[10px] tracking-wider mb-1">Customer Details</div>
              <div className="font-bold text-slate-900">{bk.customerName}</div>
              <div className="text-slate-600 mt-0.5">{bk.address}, {bk.city}</div>
              <div className="text-slate-500 mt-0.5">{bk.customerPhone}</div>
            </div>

            <div>
              <div className="font-bold text-slate-400 uppercase text-[10px] tracking-wider mb-1">Service Professional</div>
              <div className="font-bold text-slate-900">{bk.providerName}</div>
              <div className="text-slate-600 mt-0.5">{bk.providerTitle}</div>
              <div className="text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Pro Badge #TN-VP-882</span>
              </div>
            </div>
          </div>

          {/* Job Details Banner */}
          <div className="p-4 rounded-2xl border border-slate-200 text-xs">
            <div className="font-bold text-slate-900 text-sm mb-1">{bk.serviceTitle}</div>
            <p className="text-slate-600">Scheduled: {bk.scheduledDate} ({bk.timeSlot})</p>
            {bk.problemNotes && (
              <p className="text-slate-500 italic mt-2 border-t border-slate-100 pt-2">
                "Notes: {bk.problemNotes}"
              </p>
            )}
          </div>

          {/* Itemized Charges Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <th className="p-3">Description</th>
                  <th className="p-3 text-center">Qty / Hrs</th>
                  <th className="p-3 text-right">Rate</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                <tr>
                  <td className="p-3 font-medium">Labor & Professional Service</td>
                  <td className="p-3 text-center">{bk.laborHoursEstimate} hrs</td>
                  <td className="p-3 text-right">{formatINR(bk.hourlyRate)}/hr</td>
                  <td className="p-3 text-right font-semibold">{formatINR(bk.laborHoursEstimate * bk.hourlyRate)}</td>
                </tr>
                {bk.materialsCost > 0 && (
                  <tr>
                    <td className="p-3 font-medium">Materials & Dedicated Equipment</td>
                    <td className="p-3 text-center">1</td>
                    <td className="p-3 text-right">{formatINR(bk.materialsCost)}</td>
                    <td className="p-3 text-right font-semibold">{formatINR(bk.materialsCost)}</td>
                  </tr>
                )}
                <tr>
                  <td className="p-3 text-slate-600">ServiceLink Platform Protection (8%)</td>
                  <td className="p-3 text-center">-</td>
                  <td className="p-3 text-right">-</td>
                  <td className="p-3 text-right text-slate-600">{formatINR(bk.platformFee)}</td>
                </tr>
                <tr>
                  <td className="p-3 text-slate-600">GST & Local Tax (7%)</td>
                  <td className="p-3 text-center">-</td>
                  <td className="p-3 text-right">-</td>
                  <td className="p-3 text-right text-slate-600">{formatINR(bk.tax)}</td>
                </tr>
              </tbody>
            </table>

            {/* Total Footer */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400 font-medium">Payment Method</div>
                <div className="text-xs font-bold">{bk.paymentMethod}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400 font-medium">Total Paid</div>
                <div className="text-2xl font-black text-cyan-400">{formatINR(bk.totalAmount)}</div>
              </div>
            </div>
          </div>

          {/* Guarantee Note */}
          <div className="text-[11px] text-slate-500 text-center leading-relaxed border-t border-slate-200 pt-4">
            Thank you for choosing ServiceLink Tamil Nadu! All completed jobs are backed by our 100% Satisfaction Guarantee and ₹5,000,00 Property Protection. For support, contact support@servicelink.in.
          </div>

        </div>

      </div>
    </div>
  );
};
