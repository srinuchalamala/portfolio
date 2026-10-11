import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center cyber-grid font-mono">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center animate-pulse">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
      <div className="space-y-1">
        <span className="text-xs text-cyan-400 tracking-widest block font-bold">
          ESTABLISHING SECURE PROTOCOLS...
        </span>
        <span className="text-[11px] text-slate-500 block">
          STREAMING FIRESTORE STATE &amp; ASSETS
        </span>
      </div>
    </div>
  );
}
