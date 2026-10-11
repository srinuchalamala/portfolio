'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { AdminGuard } from './AdminGuard';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Award,
  Briefcase,
  GraduationCap,
  Layers,
  Users2,
  Compass,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  Activity,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Profile & Bio', href: '/admin/profile', icon: User },
  { name: 'Projects', href: '/admin/projects', icon: FolderGit2 },
  { name: 'Certifications', href: '/admin/certifications', icon: Award },
  { name: 'Experience', href: '/admin/experience', icon: Briefcase },
  { name: 'Education', href: '/admin/education', icon: GraduationCap },
  { name: 'Skills Matrix', href: '/admin/skills', icon: Layers },
  { name: 'Organizations', href: '/admin/organizations', icon: Users2 },
  { name: 'Interests', href: '/admin/interests', icon: Compass },
  { name: 'Media & Uploads', href: '/admin/media', icon: ImageIcon },
  { name: 'Inquiries / Inbox', href: '/admin/messages', icon: MessageSquare },
  { name: 'Site Settings', href: '/admin/settings', icon: Settings },
  { name: 'Activity Audit', href: '/admin/activity', icon: Activity }
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logOut();
    router.push('/admin/login');
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 border-r border-slate-800 bg-slate-950/95 p-4 shrink-0 justify-between">
          <div className="space-y-6">
            {/* Admin Header */}
            <div className="flex items-center gap-3 px-2 py-3 border-b border-slate-800/80">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-black text-white tracking-wider">
                  SECURITY CMS
                </h2>
                <span className="text-[10px] font-mono text-cyan-400 block truncate">
                  {user?.email || 'Admin'}
                </span>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      active
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom user strip */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-cyan-400 hover:bg-slate-900 transition-colors"
            >
              <span>View Live Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono text-rose-400 hover:bg-rose-950/40 border border-transparent hover:border-rose-500/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Terminate Session</span>
            </button>
          </div>
        </aside>

        {/* Mobile Header Bar */}
        <header className="md:hidden flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800 sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-sm tracking-wide">PORTFOLIO CMS</span>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg bg-slate-900 text-slate-300"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Slideout Nav */}
        {mobileOpen && (
          <div className="md:hidden bg-slate-950 border-b border-slate-800 p-4 space-y-2 animate-in slide-in-from-top-4">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                      active
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
              <Link
                href="/"
                target="_blank"
                className="text-cyan-400 flex items-center gap-1 font-mono"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={handleLogout}
                className="text-rose-400 flex items-center gap-1 font-mono"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Admin Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
