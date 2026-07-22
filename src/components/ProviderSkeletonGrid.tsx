import React from 'react';
import { Sparkles, Shield } from 'lucide-react';

interface ProviderSkeletonGridProps {
  count?: number;
  viewMode?: 'grid' | 'list';
}

export const ProviderSkeletonCard: React.FC<{ viewMode?: 'grid' | 'list' }> = ({ viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 shadow-xl animate-pulse relative overflow-hidden">
        {/* Shimmer Overlay */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-[shimmer_2s_infinite]" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-800/90 shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <div className="h-4 w-36 bg-slate-800 rounded-lg" />
                <div className="h-4 w-12 bg-blue-900/40 border border-blue-700/30 rounded-full" />
              </div>
              <div className="h-3 w-48 bg-slate-800/70 rounded-md" />
              <div className="flex items-center gap-3 pt-1">
                <div className="h-3 w-16 bg-slate-800/60 rounded" />
                <div className="h-3 w-16 bg-slate-800/60 rounded" />
                <div className="h-3 w-20 bg-slate-800/60 rounded" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-between sm:justify-end border-t sm:border-t-0 border-slate-800/80 pt-3 sm:pt-0">
            <div className="space-y-1 text-right">
              <div className="h-5 w-20 bg-slate-800 rounded-md ml-auto" />
              <div className="h-3 w-12 bg-slate-800/60 rounded ml-auto" />
            </div>
            <div className="h-9 w-28 bg-blue-600/30 border border-blue-500/20 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl animate-pulse relative overflow-hidden flex flex-col justify-between">
      {/* Subtle Blue/Purple Shimmer Animation */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/20 via-indigo-950/20 to-purple-950/10 pointer-events-none" />
      
      <div className="space-y-4 relative z-10">
        {/* Header Avatar + Badges + Rate */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-slate-800/90 shrink-0 ring-2 ring-slate-800/80" />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-4 w-32 bg-slate-800/90 rounded-md" />
                <div className="w-4 h-4 rounded-full bg-sky-500/20 border border-sky-500/30" />
              </div>
              <div className="h-3 w-28 bg-slate-800/70 rounded-md" />
              <div className="flex items-center gap-2 pt-0.5">
                <div className="h-3 w-12 bg-amber-500/20 border border-amber-500/30 rounded" />
                <div className="h-3 w-16 bg-slate-800/60 rounded" />
              </div>
            </div>
          </div>

          <div className="text-right space-y-1">
            <div className="h-5 w-16 bg-slate-800/90 rounded-md ml-auto" />
            <div className="h-2.5 w-10 bg-slate-800/60 rounded ml-auto" />
          </div>
        </div>

        {/* Bio summary lines */}
        <div className="space-y-2 py-1">
          <div className="h-3 w-full bg-slate-800/70 rounded-md" />
          <div className="h-3 w-4/5 bg-slate-800/50 rounded-md" />
        </div>

        {/* Badges Chips */}
        <div className="flex items-center gap-2 pt-1">
          <div className="h-5 w-20 bg-slate-800/80 rounded-lg border border-slate-700/50" />
          <div className="h-5 w-24 bg-slate-800/80 rounded-lg border border-slate-700/50" />
          <div className="h-5 w-16 bg-slate-800/80 rounded-lg border border-slate-700/50" />
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 relative z-10 mt-4">
        <div className="h-9 flex-1 bg-slate-800/70 rounded-xl border border-slate-700/40" />
        <div className="h-9 flex-1 bg-blue-600/30 rounded-xl border border-blue-500/30" />
      </div>
    </div>
  );
};

export const ProviderSkeletonGrid: React.FC<ProviderSkeletonGridProps> = ({
  count = 6,
  viewMode = 'grid'
}) => {
  return (
    <div className="space-y-4">
      {/* Skeleton Loading Status Indicator Banner */}
      <div className="bg-slate-900/80 border border-blue-500/30 rounded-2xl p-3 px-4 flex items-center justify-between gap-3 text-xs shadow-lg">
        <div className="flex items-center gap-2.5 text-blue-300">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
          <span className="font-semibold">Fetching verified service professionals across Tamil Nadu...</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
          <span className="text-[11px] font-medium hidden sm:inline">Encrypting & Verifying Licenses</span>
        </div>
      </div>

      {/* Grid or List of Skeleton Cards */}
      <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {Array.from({ length: count }).map((_, idx) => (
          <ProviderSkeletonCard key={idx} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
};
