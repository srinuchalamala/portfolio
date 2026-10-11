'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Shield, Lock, Mail, Key, AlertCircle, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { signIn, user, isAdmin } = useAuth();

  const [email, setEmail] = useState('srinu@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If already logged in as admin, redirect to dashboard
  if (user && isAdmin) {
    router.replace('/admin/dashboard');
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(email.trim(), password);
      router.push('/admin/dashboard');
    } catch (err: unknown) {
      console.error('Firebase Auth error:', err);
      const errorMsg =
        err instanceof Error
          ? err.message
          : 'Invalid credentials. Please verify your administrative email and password.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 cyber-grid">
      <div className="w-full max-w-md space-y-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Portfolio</span>
        </Link>

        <Card
          glow
          className="p-8 bg-slate-900/95 border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Administrative Console
            </h1>
            <p className="text-xs font-mono text-slate-400">
              AUTHENTICATED ACCESS ONLY // FIREBASE REALTIME CMS
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 font-medium flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Admin Email Address</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="srinu@gmail.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono transition-colors"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 font-medium flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-cyan-400" />
                <span>Master Password</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono transition-colors"
              />
            </div>

            <Button
              type="submit"
              variant="cyber"
              size="lg"
              loading={loading}
              className="w-full mt-2 font-mono text-sm"
              icon={<Lock className="w-4 h-4" />}
            >
              Authorize Clearance
            </Button>
          </form>

          {/* Security Clearance Note */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] font-mono text-slate-400 leading-relaxed space-y-1">
            <span className="text-cyan-400 font-semibold block">
              SECURITY DIRECTIVE:
            </span>
            <p>
              Pre-authorized for <code className="text-white">srinu@gmail.com</code>. All CRUD actions are recorded in immutable audit logs.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
