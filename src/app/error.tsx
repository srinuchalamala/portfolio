'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Captured Runtime Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center cyber-grid font-sans">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-rose-400 uppercase tracking-widest block">
            ANOMALY DETECTED // 500 INTERNAL EXCEPTION
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            System Subsystem Error
          </h1>
          <p className="text-sm text-slate-400 font-mono">
            {error?.message ||
              'A non-critical execution fault occurred. The state has been isolated.'}
          </p>
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <Button
            variant="cyber"
            size="md"
            onClick={() => reset()}
            icon={<RefreshCw className="w-4 h-4" />}
          >
            Re-initialize Pipeline
          </Button>
        </div>
      </div>
    </div>
  );
}
