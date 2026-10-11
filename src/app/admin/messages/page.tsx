'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  MessageSquare,
  Mail,
  Phone,
  Trash2,
  Calendar,
  CheckCircle,
  Clock,
  Archive,
  RefreshCw
} from 'lucide-react';
import {
  getMessages,
  updateMessageStatus,
  deleteMessage
} from '@/services/db';
import { ContactMessage } from '@/types';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied' | 'archived'>('all');

  const loadMessages = async () => {
    setLoading(true);
    const data = await getMessages();
    setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleStatusChange = async (
    id: string,
    status: ContactMessage['status']
  ) => {
    await updateMessageStatus(id, status);
    await loadMessages();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this message permanently?')) return;
    await deleteMessage(id);
    await loadMessages();
  };

  const filtered =
    filter === 'all'
      ? messages
      : messages.filter((m) => m.status === filter);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-amber-400" />
              <span>Inquiries &amp; Lead Management</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              TOTAL INCOMING MESSAGES: {messages.length}
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={loadMessages}
            icon={<RefreshCw className="w-4 h-4" />}
          >
            Refresh Inbox
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {(['all', 'new', 'read', 'replied', 'archived'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase transition-all ${
                filter === tab
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab} (
              {tab === 'all'
                ? messages.length
                : messages.filter((m) => m.status === tab).length}
              )
            </button>
          ))}
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-sm font-mono">
              No inquiries found under this category filter.
            </div>
          ) : (
            filtered.map((msg) => (
              <Card
                key={msg.id}
                className="p-5 bg-slate-900/90 border border-slate-800 space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div>
                    <h3 className="font-bold text-white text-base">
                      {msg.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-cyan-400" />
                        <a
                          href={`mailto:${msg.email}`}
                          className="hover:text-cyan-300"
                        >
                          {msg.email}
                        </a>
                      </span>
                      {msg.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-emerald-400" />
                          <a
                            href={`tel:${msg.phone}`}
                            className="hover:text-emerald-300"
                          >
                            {msg.phone}
                          </a>
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <select
                      value={msg.status}
                      onChange={(e) =>
                        handleStatusChange(
                          msg.id,
                          e.target.value as ContactMessage['status']
                        )
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none"
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                      <option value="archived">Archived</option>
                    </select>

                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Message Body */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                  <h4 className="text-sm font-semibold text-cyan-300">
                    Subject: {msg.subject}
                  </h4>
                  <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {msg.message}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between text-xs font-mono pt-1">
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 border border-cyan-500/30 flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Reply via Email</span>
                    </a>

                    {msg.phone && (
                      <a
                        href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${msg.name}, following up on your inquiry via my portfolio.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30 flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    )}
                  </div>

                  <span className="text-slate-400">
                    ID: {msg.id.substring(0, 8)}...
                  </span>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
