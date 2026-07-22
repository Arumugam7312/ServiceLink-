import React, { useState } from 'react';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CreditCard,
  IndianRupee,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { ProviderProfile } from '../types';
import { formatINR } from '../lib/formatters';

export const BookingFlowModal: React.FC = () => {
  const {
    bookingModalOpen,
    setBookingModalOpen,
    preselectedProviderForBooking,
    setPreselectedProviderForBooking,
    categories,
    providers,
    createNewBooking,
    currentPersona
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedCatId, setSelectedCatId] = useState(preselectedProviderForBooking?.categoryId || categories[0]?.id || 'cat_electrical');
  const [serviceTitle, setServiceTitle] = useState('Standard Service Inspection');
  const [problemNotes, setProblemNotes] = useState('');
  const [address, setAddress] = useState('Flat 302, Green Acres Appts, Velachery Main Rd');
  const [city, setCity] = useState('Chennai, Tamil Nadu');

  const [scheduledDate, setScheduledDate] = useState('2026-07-25');
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 12:00 PM');

  const [selectedProvider, setSelectedProvider] = useState<ProviderProfile | null>(preselectedProviderForBooking || providers[0] || null);

  const [laborHours, setLaborHours] = useState(2);
  const [materialsCost, setMaterialsCost] = useState(250);
  const [paymentMethod, setPaymentMethod] = useState('UPI (GPay / PhonePe)');

  if (!bookingModalOpen) return null;

  const handleClose = () => {
    setBookingModalOpen(false);
    setPreselectedProviderForBooking(null);
    setStep(1);
  };

  // Financial Calculations in INR ₹
  const hourlyRate = selectedProvider ? selectedProvider.hourlyRate : 450;
  const subtotal = (laborHours * hourlyRate) + materialsCost;
  const platformFee = Math.round(subtotal * 0.08);
  const tax = Math.round(subtotal * 0.07);
  const totalAmount = subtotal + platformFee + tax;

  const handleFinalConfirm = async () => {
    if (!selectedProvider) return;

    const newBooking = await createNewBooking({
      categoryId: selectedCatId,
      serviceTitle,
      problemNotes,
      address,
      city,
      scheduledDate,
      timeSlot,
      providerId: selectedProvider.id,
      providerName: selectedProvider.name,
      providerTitle: selectedProvider.title,
      providerAvatar: selectedProvider.avatar,
      laborHoursEstimate: laborHours,
      hourlyRate,
      materialsCost,
      paymentMethod
    });

    if (newBooking) {
      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback
      }
      handleClose();
    }
  };

  const matchingProviders = providers.filter(p => p.categoryId === selectedCatId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl text-slate-100 p-6 sm:p-8 relative my-8">
        
        {/* Header Title */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[11px] font-semibold uppercase tracking-wide">
                Step {step} of 4
              </span>
              <h2 className="text-xl font-bold text-white">Instant Service Booking Engine</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">Upfront price guarantee in INR ₹ with verified Tamil Nadu dispatch.</p>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Stepper Bar */}
        <div className="grid grid-cols-4 gap-2 my-5">
          {['Details', 'Schedule', 'Select Pro', 'Payment'].map((label, idx) => {
            const stepNum = idx + 1;
            const isActive = step === stepNum;
            const isDone = step > stepNum;

            return (
              <div key={idx} className="flex flex-col gap-1">
                <div
                  className={`h-1.5 rounded-full transition-all ${
                    isDone ? 'bg-cyan-400' : isActive ? 'bg-blue-600' : 'bg-slate-800'
                  }`}
                />
                <span className={`text-[10px] font-semibold ${isActive ? 'text-cyan-400' : isDone ? 'text-slate-300' : 'text-slate-500'}`}>
                  {stepNum}. {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* STEP 1: Category & Problem Details */}
        {step === 1 && (
          <div className="space-y-4 py-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                1. Select Service Category
              </label>
              <select
                value={selectedCatId}
                onChange={e => {
                  setSelectedCatId(e.target.value);
                  const firstMatching = providers.find(p => p.categoryId === e.target.value);
                  if (firstMatching) setSelectedProvider(firstMatching);
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id} className="bg-slate-900">
                    {cat.name} (Avg {formatINR(cat.avgHourlyRate)}/hr)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                2. Service Title / Job Requirement
              </label>
              <input
                type="text"
                value={serviceTitle}
                onChange={e => setServiceTitle(e.target.value)}
                placeholder="e.g., Inverter & Battery Wiring or AC Jet Spray Service"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                3. Problem Description & Notes
              </label>
              <textarea
                value={problemNotes}
                onChange={e => setProblemNotes(e.target.value)}
                rows={3}
                placeholder="Describe what needs repair or installation (e.g. Master bedroom AC water leakage or MCB trip fix)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Service Address in Tamil Nadu
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  City & District
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Date & Time Selection */}
        {step === 2 && (
          <div className="space-y-5 py-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4 text-cyan-400" />
                <span>Select Service Date</span>
              </label>
              <input
                type="date"
                value={scheduledDate}
                onChange={e => setScheduledDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Select Preferred Time Slot</span>
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  '08:00 AM - 10:00 AM',
                  '10:00 AM - 12:00 PM',
                  '01:00 PM - 03:00 PM',
                  '04:00 PM - 06:00 PM'
                ].map((slot, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`p-3 rounded-xl border text-xs font-semibold transition ${
                      timeSlot === slot
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-800/50 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-cyan-200">Guaranteed On-Time Arrival</span>
                <p className="text-cyan-300/80 mt-0.5">Your assigned technician will call & message via live chat before arrival.</p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Select Verified Pro */}
        {step === 3 && (
          <div className="space-y-4 py-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Verified Local Professional
            </label>

            {matchingProviders.length === 0 ? (
              <div className="p-6 text-center bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-400">
                No pros found in this specific category, showing top available master technicians instead.
              </div>
            ) : null}

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {(matchingProviders.length > 0 ? matchingProviders : providers).map(p => {
                const isSelected = selectedProvider?.id === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProvider(p)}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-blue-950/80 border-blue-500 ring-2 ring-blue-500/30'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <div className="flex items-center gap-1.5 font-bold text-sm text-white">
                          <span>{p.name}</span>
                          {p.verificationStatus === 'verified_pro' && (
                            <ShieldCheck className="w-4 h-4 text-cyan-400" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400">{p.title}</p>
                        <div className="text-[11px] text-amber-400 font-semibold mt-1">
                          ★ {p.rating} ({p.reviewCount} reviews) • {p.completedJobs} Jobs
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-extrabold text-cyan-400">{formatINR(p.hourlyRate)}/hr</div>
                      {isSelected ? (
                        <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold">Selected</span>
                      ) : (
                        <span className="text-xs text-slate-400">Click to Select</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Upfront Invoice Breakdown & Confirmation */}
        {step === 4 && selectedProvider && (
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div>
                  <h4 className="font-bold text-sm text-white">{serviceTitle}</h4>
                  <p className="text-xs text-slate-400">{scheduledDate} @ {timeSlot}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xs text-slate-200">{selectedProvider.name}</div>
                  <div className="text-[10px] text-cyan-400 font-medium">Verified Pro Assigned</div>
                </div>
              </div>

              {/* Line items in ₹ */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Labor ({laborHours} hours @ {formatINR(hourlyRate)}/hr):</span>
                  <span className="font-semibold text-white">{formatINR(laborHours * hourlyRate)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Standard Materials & Equipment Fee:</span>
                  <span className="font-semibold text-white">{formatINR(materialsCost)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>ServiceLink Platform Protection (8%):</span>
                  <span>{formatINR(platformFee)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>GST & Local Tax (7%):</span>
                  <span>{formatINR(tax)}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between font-extrabold text-sm text-white">
                  <span>Total Guaranteed Amount:</span>
                  <span className="text-cyan-400 text-lg">{formatINR(totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1">
                <CreditCard className="w-4 h-4 text-cyan-400" />
                <span>Payment Method</span>
              </label>
              <select
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none"
              >
                <option value="UPI (GPay / PhonePe / Paytm)">UPI (GPay / PhonePe / Paytm)</option>
                <option value="HDFC / ICICI Debit Card">HDFC / ICICI Debit & Credit Card</option>
                <option value="Net Banking">Net Banking (SBI, Canara, Indian Bank)</option>
                <option value="Cash After Work">Cash On Completion</option>
              </select>
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="pt-5 border-t border-slate-800 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              onClick={() => setStep(prev => (prev - 1) as any)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(prev => (prev + 1) as any)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition flex items-center gap-1.5"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinalConfirm}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/30 transition flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm & Book ({formatINR(totalAmount)})</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
