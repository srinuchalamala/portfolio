'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Users2, Plus, Trash2, Edit2, X } from 'lucide-react';
import {
  getOrganizations,
  createOrganization,
  updateOrganization,
  deleteOrganization
} from '@/services/db';
import { Organization } from '@/types';

export default function AdminOrganizationsPage() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    role: '',
    period: '',
    description: '',
    responsibilities: '',
    sortOrder: 1
  });

  const loadOrgs = async () => {
    setLoading(true);
    const data = await getOrganizations();
    setOrgs(data);
    setLoading(false);
  };

  useEffect(() => {
    loadOrgs();
  }, []);

  const resetForm = () => {
    setForm({
      name: '',
      role: '',
      period: '',
      description: '',
      responsibilities: '',
      sortOrder: orgs.length + 1
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (o: Organization) => {
    setForm({
      name: o.name,
      role: o.role,
      period: o.period,
      description: o.description,
      responsibilities: o.responsibilities ? o.responsibilities.join('\n') : '',
      sortOrder: o.sortOrder
    });
    setEditingId(o.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this organization record?')) return;
    await deleteOrganization(id);
    await loadOrgs();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const respArray = form.responsibilities
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const orgData = {
      name: form.name.trim(),
      role: form.role.trim(),
      period: form.period.trim(),
      description: form.description.trim(),
      responsibilities: respArray,
      sortOrder: Number(form.sortOrder)
    };

    if (editingId) {
      await updateOrganization(editingId, orgData);
    } else {
      await createOrganization(orgData);
    }

    resetForm();
    await loadOrgs();
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Users2 className="w-6 h-6 text-cyan-400" />
              <span>Organizations &amp; Leadership</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              MANAGE STUDENT COLLECTIVES, WORKSHOP COORDINATION &amp; CLUBS
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
            {isEditing ? 'Cancel Editor' : 'New Organization'}
          </Button>
        </div>

        {isEditing && (
          <Card className="p-6 bg-slate-900 border border-cyan-500/30 space-y-4">
            <h2 className="text-lg font-bold text-white">
              {editingId ? 'Edit Organization' : 'Add Organization'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="ManaClg LevelUp"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Role / Position *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="Workshop Coordinator"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Period
                  </label>
                  <input
                    type="text"
                    required
                    value={form.period}
                    onChange={(e) => setForm({ ...form, period: e.target.value })}
                    placeholder="2023 – 2024"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  Overview Description
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

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  Key Responsibilities (One per line)
                </label>
                <textarea
                  rows={3}
                  value={form.responsibilities}
                  onChange={(e) =>
                    setForm({ ...form, responsibilities: e.target.value })
                  }
                  placeholder="Coordinated front-end development workshops&#10;Trained peers in HTML, CSS and React.js"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
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
            Configured Organizations ({orgs.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orgs.map((org) => (
              <Card
                key={org.id}
                className="p-5 bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <span className="text-xs font-mono text-cyan-400">
                    {org.period}
                  </span>
                  <h3 className="text-base font-bold text-white">
                    {org.name}
                  </h3>
                  <div className="text-xs text-slate-300 font-medium">
                    {org.role}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 pt-1">
                    {org.description}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1.5"
                    onClick={() => handleEdit(org)}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="p-1.5"
                    onClick={() => handleDelete(org.id)}
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
