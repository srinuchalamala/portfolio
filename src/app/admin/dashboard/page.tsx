'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  FolderGit2,
  Award,
  Layers,
  MessageSquare,
  Activity,
  Database,
  Plus,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Trash2,
  Mail,
  User,
  Shield,
  ArrowRight
} from 'lucide-react';
import {
  getProjects,
  getCertifications,
  getSkills,
  getMessages,
  getActivityLogs,
  updateMessageStatus,
  deleteMessage,
  seedDatabaseWithVerifiedData
} from '@/services/db';
import { Project, Certification, Skill, ContactMessage, ActivityLog } from '@/types';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    projectsCount: 0,
    certsCount: 0,
    skillsCount: 0,
    messagesCount: 0,
    unreadMessages: 0
  });

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedNotice, setSeedNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [projList, certList, skillList, msgList, actList] = await Promise.all([
        getProjects(),
        getCertifications(),
        getSkills(),
        getMessages(),
        getActivityLogs(10)
      ]);

      const unread = msgList.filter((m) => m.status === 'new').length;

      setStats({
        projectsCount: projList.length,
        certsCount: certList.length,
        skillsCount: skillList.length,
        messagesCount: msgList.length,
        unreadMessages: unread
      });

      setMessages(msgList.slice(0, 5));
      setActivities(actList);
    } catch (err) {
      console.error('Failed to load admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSeed = async () => {
    const confirm = window.confirm(
      'This will populate Firestore collections (Profile, Projects, Certifications, Experience, Skills, Education, Organizations, Interests, Gallery) with the verified resume source data. Continue?'
    );
    if (!confirm) return;

    setSeeding(true);
    setSeedNotice(null);

    const result = await seedDatabaseWithVerifiedData();
    if (result.success) {
      setSeedNotice({ type: 'success', text: result.message });
      await loadData();
    } else {
      setSeedNotice({ type: 'error', text: result.message });
    }
    setSeeding(false);
  };

  const handleStatusChange = async (
    id: string,
    newStatus: ContactMessage['status']
  ) => {
    await updateMessageStatus(id, newStatus);
    await loadData();
  };

  const handleDeleteMsg = async (id: string) => {
    if (!window.confirm('Delete this message permanently?')) return;
    await deleteMessage(id);
    await loadData();
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-cyan-500/25 bg-slate-900/80">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Shield className="w-6 h-6 text-cyan-400" />
              <span>Operations Command &amp; CMS Overview</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              REAL-TIME FIRESTORE DATABASE // STATUS: OPERATIONAL
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="cyber"
              size="sm"
              loading={seeding}
              onClick={handleSeed}
              icon={<Database className="w-4 h-4" />}
            >
              Sync/Seed Verified Data
            </Button>
            <Link href="/" target="_blank">
              <Button
                variant="outline"
                size="sm"
                icon={<ExternalLink className="w-4 h-4" />}
                iconPosition="right"
              >
                View Live Site
              </Button>
            </Link>
          </div>
        </div>

        {/* Database Seed Notification */}
        {seedNotice && (
          <div
            className={`p-4 rounded-xl border text-sm flex items-center gap-3 font-mono ${
              seedNotice.type === 'success'
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
            }`}
          >
            {seedNotice.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
            )}
            <span>{seedNotice.text}</span>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Projects */}
          <Link href="/admin/projects">
            <Card className="p-5 bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center justify-between text-slate-400 mb-3">
                <span className="text-xs font-mono font-medium">PROJECTS</span>
                <FolderGit2 className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-3xl font-black text-white font-mono">
                {stats.projectsCount}
              </div>
              <span className="text-[11px] text-cyan-400 font-mono mt-1 block">
                Manage showcases &rarr;
              </span>
            </Card>
          </Link>

          {/* Certifications */}
          <Link href="/admin/certifications">
            <Card className="p-5 bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-all">
              <div className="flex items-center justify-between text-slate-400 mb-3">
                <span className="text-xs font-mono font-medium">CERTIFICATIONS</span>
                <Award className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-3xl font-black text-white font-mono">
                {stats.certsCount}
              </div>
              <span className="text-[11px] text-indigo-400 font-mono mt-1 block">
                Fortinet &amp; Google credentials &rarr;
              </span>
            </Card>
          </Link>

          {/* Skills */}
          <Link href="/admin/skills">
            <Card className="p-5 bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all">
              <div className="flex items-center justify-between text-slate-400 mb-3">
                <span className="text-xs font-mono font-medium">SKILLS MATRIX</span>
                <Layers className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-black text-white font-mono">
                {stats.skillsCount}
              </div>
              <span className="text-[11px] text-emerald-400 font-mono mt-1 block">
                Categorized tech stack &rarr;
              </span>
            </Card>
          </Link>

          {/* Inquiries */}
          <Link href="/admin/messages">
            <Card className="p-5 bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all">
              <div className="flex items-center justify-between text-slate-400 mb-3">
                <span className="text-xs font-mono font-medium">INCOMING INQUIRIES</span>
                <MessageSquare className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-black text-white font-mono flex items-center gap-2">
                <span>{stats.messagesCount}</span>
                {stats.unreadMessages > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40">
                    {stats.unreadMessages} NEW
                  </span>
                )}
              </div>
              <span className="text-[11px] text-amber-400 font-mono mt-1 block">
                Inbox management &rarr;
              </span>
            </Card>
          </Link>
        </div>

        {/* Quick Actions Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href="/admin/projects" className="block">
            <Button variant="secondary" size="sm" className="w-full text-xs font-mono justify-start">
              <Plus className="w-3.5 h-3.5 mr-1 text-cyan-400" /> Add Project
            </Button>
          </Link>
          <Link href="/admin/certifications" className="block">
            <Button variant="secondary" size="sm" className="w-full text-xs font-mono justify-start">
              <Plus className="w-3.5 h-3.5 mr-1 text-indigo-400" /> Add Certification
            </Button>
          </Link>
          <Link href="/admin/media" className="block">
            <Button variant="secondary" size="sm" className="w-full text-xs font-mono justify-start">
              <Plus className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Upload Media
            </Button>
          </Link>
          <Link href="/admin/profile" className="block">
            <Button variant="secondary" size="sm" className="w-full text-xs font-mono justify-start">
              <User className="w-3.5 h-3.5 mr-1 text-amber-400" /> Edit Profile Bio
            </Button>
          </Link>
        </div>

        {/* Two-Column: Recent Inquiries & Activity Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Messages Inbox */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>Recent Inquiries</span>
              </h2>
              <Link
                href="/admin/messages"
                className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {messages.length === 0 ? (
              <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center text-slate-400 text-sm font-mono">
                No inquiries received yet. Submissions from the public contact form appear here in real-time.
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <Card
                    key={msg.id}
                    className="p-4 bg-slate-900/80 border border-slate-800 space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-white text-sm">
                          {msg.name}
                        </h4>
                        <div className="text-xs text-slate-400 font-mono">
                          {msg.email} {msg.phone ? `• ${msg.phone}` : ''}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={msg.status}
                          onChange={(e) =>
                            handleStatusChange(
                              msg.id,
                              e.target.value as ContactMessage['status']
                            )
                          }
                          className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 focus:outline-none"
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                          <option value="archived">Archived</option>
                        </select>

                        <button
                          onClick={() => handleDeleteMsg(msg.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-400"
                          title="Delete message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80">
                      <strong className="text-white block mb-0.5">
                        Subject: {msg.subject}
                      </strong>
                      {msg.message}
                    </p>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                      <span>{msg.createdAt.split('T')[0]}</span>
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                        className="text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Quick Reply</span>
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Activity Logs */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              <span>Audit Activity Stream</span>
            </h2>

            <Card className="p-4 bg-slate-900/80 border border-slate-800 max-h-[460px] overflow-y-auto space-y-3 font-mono text-xs">
              {activities.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  No activity logged yet.
                </div>
              ) : (
                activities.map((act) => (
                  <div
                    key={act.id}
                    className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-cyan-400">
                        {act.action} // {act.resource}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(act.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    {act.details && (
                      <p className="text-slate-300 text-[11px]">
                        {act.details}
                      </p>
                    )}
                  </div>
                ))
              )}
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
