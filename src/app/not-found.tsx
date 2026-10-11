'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ShieldAlert, ArrowLeft, Terminal } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center cyber-grid font-sans">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto animate-pulse">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">
            ERROR 404 // ROUTE DISCONNECTED
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Node Not Found
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed font-mono">
            The requested network address does not exist or has been relocated to another sector of the grid.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/">
            <Button
              variant="cyber"
              size="md"
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Re-route to Central Portfolio
            </Button>
          </Link>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
          SYSTEM: DEFENSE PERIMETER INTACT
        </div>
      </div>
    </div>
  );
}
