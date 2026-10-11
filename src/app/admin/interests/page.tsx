'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Compass, Plus, Trash2, Edit2, X } from 'lucide-react';
import {
  getInterests,
  createInterest,
  updateInterest,
  deleteInterest
} from '@/services/db';
import { Interest } from '@/types';

export default function AdminInterestsPage() {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Technology',
    icon: 'Cpu',
    sortOrder: 1
  });

  const loadInterests = async () => {
    setLoading(true);
    const data = await getInterests();
    setInterests(data);
    setLoading(false);
  };

  useEffect(() => {
    loadInterests();
  }, []);

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      category: 'Technology',
      icon: 'Cpu',
      sortOrder: interests.length + 1
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (i: Interest) => {
    setForm({
      title: i.title,
      description: i.description,
      category: i.category,
      icon: i.icon,
      sortOrder: i.sortOrder
    });
    setEditingId(i.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this interest entry?')) return;
    await deleteInterest(id);
    await loadInterests();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const interestData = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category.trim(),
      icon: form.icon.trim(),
      sortOrder: Number(form.sortOrder)
    };

    if (editingId) {
      await updateInterest(editingId, interestData);
    } else {
      await createInterest(interestData);
    }

    resetForm();
    await loadInterests();
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-cyan-400" />
              <span>Interests &amp; Curiosities</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              MANAGE TECHNICAL PURSUITS, GAMING, ANIME &amp; CONTINUOUS LEARNING
            </p>
          </div>

          <Button
            variant={isEditing ? 'outline' : 'cyber'}
            size="sm"
            onClick={() => {
              if (isEditing) resetForm();
              else {
                resetForm();
                setIsEditing(true);
              }
            }}
            icon={isEditing ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          >
            {isEditing ? 'Cancel Editor' : 'New Interest'}
          </Button>
        </div>

        {isEditing && (
          <Card className="p-6 bg-slate-900 border border-cyan-500/30 space-y-4">
            <h2 className="text-lg font-bold text-white">
              {editingId ? 'Edit Interest' : 'Add Interest'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="AI & Emerging Technologies"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    placeholder="Technology / Recreation"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">Icon</label>
                  <select
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Cpu">Cpu</option>
                    <option value="BookOpen">BookOpen</option>
                    <option value="Trophy">Trophy</option>
                    <option value="Users">Users</option>
                    <option value="Sparkles">Sparkles</option>
                    <option value="Gamepad2">Gamepad2</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  Description
                </label>
                <textarea
                  rows={2}
                  required
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <Button type="submit" variant="cyber" size="sm">
                  {editingId ? 'Update Record' : 'Save Record'}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">
            Configured Interests ({interests.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {interests.map((item) => (
              <Card
                key={item.id}
                className="p-4 bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-white text-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1.5"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="p-1.5"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
