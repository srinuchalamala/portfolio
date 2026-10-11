'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Activity, RefreshCw, Shield, Terminal } from 'lucide-react';
import { getActivityLogs } from '@/services/db';
import { ActivityLog } from '@/types';

export default function AdminActivityPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  const loadLogs = async () => {
    setLoading(true);
    const data = await getActivityLogs(100);
    setLogs(data);
    setLoading(false);
  };

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Activity className="w-6 h-6 text-indigo-400" />
              <span>Immutable Activity &amp; Audit Log</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              RECORDING ALL ADMINISTRATIVE AUTH, CRUD &amp; MEDIA EVENTS
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={loadLogs}
            icon={<RefreshCw className="w-4 h-4" />}
          >
            Refresh Stream
          </Button>
        </div>

        <Card className="p-4 sm:p-6 bg-slate-900 border border-slate-800 space-y-3 font-mono">
          <div className="flex items-center gap-2 text-xs text-cyan-400 pb-3 border-b border-slate-800">
            <Terminal className="w-4 h-4" />
            <span>AUDIT TRAIL TELEMETRY // RETENTION: UNLIMITED</span>
          </div>

          {logs.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No audit logs recorded yet. Operations performed in the CMS will appear here in chronological sequence.
            </div>
          ) : (
            <div className="space-y-2">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.action === 'CREATE'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : log.action === 'DELETE'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : log.action === 'UPDATE'
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                      }`}
                    >
                      {log.action}
                    </span>

                    <span className="text-white font-semibold">
                      {log.resource}
                    </span>

                    {log.details && (
                      <span className="text-slate-400 truncate max-w-md hidden md:inline">
                        • {log.details}
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center gap-3 self-end sm:self-center">
                    <span>Operator: {log.email}</span>
                    <span>
                      {new Date(log.timestamp).toLocaleDateString()} {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
}
