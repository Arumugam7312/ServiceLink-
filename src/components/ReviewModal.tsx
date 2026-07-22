import React, { useState } from 'react';
import { X, Star, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReviewModal: React.FC = () => {
  const { activeReviewBooking, setActiveReviewBooking, submitReview } = useApp();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  if (!activeReviewBooking) return null;

  const bk = activeReviewBooking;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    await submitReview({
      bookingId: bk.id,
      providerId: bk.providerId,
      rating,
      comment,
      serviceTitle: bk.serviceTitle
    });

    setActiveReviewBooking(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full shadow-2xl text-slate-100 p-6 relative">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h2 className="font-bold text-base text-white">Rate Service Quality</h2>
          <button
            onClick={() => setActiveReviewBooking(null)}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          <div className="text-center">
            <p className="text-xs text-slate-400">How was your experience with <strong className="text-white">{bk.providerName}</strong>?</p>
            
            {/* Star Selector */}
            <div className="flex items-center justify-center gap-2 mt-3">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-amber-400 mt-1 block">{rating} of 5 Stars</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Written Feedback
            </label>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              rows={3}
              placeholder="Share details about punctuality, work quality, cleanliness..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!comment.trim()}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 disabled:opacity-50 transition"
          >
            Submit Verified Review
          </button>
        </form>

      </div>
    </div>
  );
};
