import React, { useState } from 'react';
import {
  X,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Zap,
  Wrench,
  Wind
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AiDiagnosisResult } from '../types';

export const AiDiagnosticsModal: React.FC = () => {
  const {
    aiModalOpen,
    setAiModalOpen,
    providers,
    setPreselectedProviderForBooking,
    setBookingModalOpen
  } = useApp();

  const [promptText, setPromptText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiDiagnosisResult | null>(null);

  if (!aiModalOpen) return null;

  const handleClose = () => {
    setAiModalOpen(false);
    setResult(null);
    setPromptText('');
  };

  const SAMPLE_CHIPS = [
    'Kitchen sink pipe leaking water into cabinet during dishwasher run',
    'Circuit breaker tripped and outlet buzzing with burning odor',
    'Central AC blowing lukewarm air and unit making rattling sound',
    'TV mounting on drywall wall studs with hidden cable concealment'
  ];

  const handleAnalyze = async (queryText?: string) => {
    const textToAnalyze = queryText || promptText;
    if (!textToAnalyze.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/ai/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToAnalyze })
      });

      if (res.ok) {
        const data: AiDiagnosisResult = await res.json();
        setResult(data);
      }
    } catch (err) {
      console.error('Error in AI diagnosis:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl text-slate-100 p-6 sm:p-8 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 flex items-center justify-center">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Gemini AI Home Repair Advisor</span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-500/20 text-purple-300 rounded border border-purple-500/30">
                  REAL-TIME
                </span>
              </h2>
              <p className="text-xs text-slate-400">Describe your home issue for instant category matching & cost estimates.</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Area */}
        <div className="py-4 space-y-3">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Describe Your Home Problem
          </label>
          <textarea
            value={promptText}
            onChange={e => setPromptText(e.target.value)}
            rows={3}
            placeholder="e.g. My dishwasher is making a loud whistling sound and leaking water onto the kitchen floor..."
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition resize-none"
          />

          {/* Quick sample chips */}
          <div>
            <span className="text-[11px] text-slate-400 font-medium block mb-1.5">Or try a sample issue:</span>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPromptText(chip);
                    handleAnalyze(chip);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-[11px] text-slate-300 border border-slate-700/60 transition text-left"
                >
                  {chip.length > 45 ? `${chip.slice(0, 45)}...` : chip}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={() => handleAnalyze()}
            disabled={loading || !promptText.trim()}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-purple-200" />
                <span>Analyzing Issue with Gemini AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-purple-200" />
                <span>Analyze Issue & Get Cost Estimate</span>
              </>
            )}
          </button>
        </div>

        {/* AI Results Output */}
        {result && (
          <div className="mt-4 p-5 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-4 animate-in fade-in duration-300">
            
            {/* Top Badges */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30 text-xs font-semibold">
                  Category: {result.identifiedCategory}
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                    result.urgencyLevel === 'emergency'
                      ? 'bg-rose-950 text-rose-300 border-rose-700'
                      : result.urgencyLevel === 'high'
                      ? 'bg-amber-950 text-amber-300 border-amber-700'
                      : 'bg-emerald-950 text-emerald-300 border-emerald-700'
                  }`}
                >
                  Urgency: {result.urgencyLevel}
                </span>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Estimated Cost</div>
                <div className="text-lg font-black text-cyan-400">${result.estimatedCostMin} - ${result.estimatedCostMax}</div>
              </div>
            </div>

            {/* Explanation & Action */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-white text-sm">{result.serviceTitle}</h4>
              <p className="text-slate-300 leading-relaxed">{result.explanation}</p>

              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 text-amber-200 flex items-start gap-2.5 mt-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Recommended Immediate Action:</span>
                  <p className="mt-0.5 text-slate-300">{result.suggestedAction}</p>
                </div>
              </div>
            </div>

            {/* Recommended Pros */}
            <div className="pt-3 border-t border-slate-800">
              <h5 className="font-bold text-xs text-slate-300 uppercase tracking-wider mb-2.5">
                Recommended Verified Specialists
              </h5>

              <div className="space-y-2">
                {providers
                  .filter(p => result.recommendedProviderIds.includes(p.id) || p.categoryName === result.identifiedCategory)
                  .slice(0, 2)
                  .map(p => (
                    <div
                      key={p.id}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5">
                        <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <div className="font-bold text-xs text-white flex items-center gap-1">
                            <span>{p.name}</span>
                            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                          </div>
                          <p className="text-[10px] text-slate-400">{p.title} • ★ {p.rating}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          handleClose();
                          setPreselectedProviderForBooking(p);
                          setBookingModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center gap-1"
                      >
                        <span>Book Pro (${p.hourlyRate}/hr)</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
