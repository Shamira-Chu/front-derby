'use client';

import React from 'react';

export const SkeletonCard: React.FC = () => (
  <div className="border border-slate-800/80 bg-slate-900/30 rounded-lg p-6 space-y-4 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="h-4 w-24 bg-slate-800 rounded"></div>
      <div className="h-3 w-16 bg-slate-800 rounded"></div>
    </div>
    <div className="h-6 w-3/4 bg-slate-800/90 rounded"></div>
    <div className="space-y-2">
      <div className="h-3.5 w-full bg-slate-800/60 rounded"></div>
      <div className="h-3.5 w-5/6 bg-slate-800/60 rounded"></div>
    </div>
    <div className="pt-4 flex items-center justify-between border-t border-slate-800/40">
      <div className="h-3 w-28 bg-slate-800 rounded"></div>
      <div className="h-3 w-20 bg-slate-800/80 rounded"></div>
    </div>
  </div>
);

export const SkeletonRow: React.FC = () => (
  <div className="border-b border-slate-800/60 py-4 px-2 flex items-center justify-between gap-4 animate-pulse">
    <div className="flex items-center gap-4 flex-1">
      <div className="h-3.5 w-6 bg-slate-800 rounded"></div>
      <div className="h-4 w-1/3 bg-slate-800/90 rounded"></div>
      <div className="hidden sm:block h-3.5 w-20 bg-slate-800/60 rounded"></div>
    </div>
    <div className="flex items-center gap-2">
      <div className="h-8 w-16 bg-slate-800/60 rounded"></div>
      <div className="h-8 w-16 bg-slate-800/40 rounded"></div>
    </div>
  </div>
);

export const SkeletonAcervo: React.FC = () => (
  <div className="space-y-8 py-8">
    <div className="border border-cyan-500/20 bg-cyan-950/10 rounded-lg p-8 space-y-4 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-4 w-32 bg-cyan-900/40 rounded"></div>
        <div className="h-3 w-20 bg-cyan-900/30 rounded"></div>
      </div>
      <div className="h-8 w-2/3 bg-cyan-900/50 rounded"></div>
      <div className="h-4 w-full bg-cyan-900/30 rounded"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  </div>
);
