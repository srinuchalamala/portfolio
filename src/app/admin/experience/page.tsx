'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Briefcase, Plus, Trash2, Edit2, X } from 'lucide-react';
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience
} from '@/services/db';
import { Experience } from '@/types';

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Internship' as Experience['type'],
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    responsibilities: '',
    technologies: '',
    active: true,
    sortOrder: 1
  });

  const loadExperiences = async () => {
    setLoading(true);
    const data = await getExperiences();
    setExperiences(data);
    setLoading(false);
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const resetForm = () => {
    setForm({
      title: '',
      company: '',
      location: '',
      type: 'Internship',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      responsibilities: '',
      technologies: '',
      active: true,
      sortOrder: experiences.length + 1
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (e: Experience) => {
    setForm({
      title: e.title,
      company: e.company,
      location: e.location,
      type: e.type,
      startDate: e.startDate,
      endDate: e.endDate,
      current: e.current,
      description: e.description,
      responsibilities: e.responsibilities ? e.responsibilities.join('\n') : '',
      technologies: e.technologies ? e.technologies.join(', ') : '',
      active: e.active !== false,
      sortOrder: e.sortOrder
    });
    setEditingId(e.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this experience record?')) return;
    await deleteExperience(id);
    await loadExperiences();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const respArray = form.responsibilities
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const techArray = form.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const expData = {
      title: form.title.trim(),
      company: form.company.trim(),
      location: form.location.trim(),
      type: form.type,
      startDate: form.startDate.trim(),
      endDate: form.current ? 'Present' : form.endDate.trim(),
      current: form.current,
      description: form.description.trim(),
      responsibilities: respArray,
      technologies: techArray,
      active: form.active,
      sortOrder: Number(form.sortOrder)
    };

    if (editingId) {
      await updateExperience(editingId, expData);
    } else {
      await createExperience(expData);
    }

    resetForm();
    await loadExperiences();
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-cyan-400" />
              <span>Career &amp; Experience Timeline</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              MANAGE INDUSTRY INTERNSHIPS, APPRENTICESHIPS &amp; DEVELOPER ROLES
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
            {isEditing ? 'Cancel Editor' : 'New Experience'}
          </Button>
        </div>

        {isEditing && (
          <Card className="p-6 bg-slate-900 border border-cyan-500/30 space-y-4">
            <h2 className="text-lg font-bold text-white">
              {editingId ? 'Edit Experience' : 'Add Experience Record'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Role / Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="CyberSecurity Intern"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Eduskills Foundation (AICTE)"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Kakinada / Remote"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">Type</label>
                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        type: e.target.value as Experience['type']
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Apprenticeship">Apprenticeship</option>
                    <option value="Self-employed">Self-employed</option>
                    <option value="Full-time">Full-time</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Start Date
                  </label>
                  <input
                    type="text"
                    required
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    placeholder="August 2024"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    End Date
                  </label>
                  <input
                    type="text"
                    disabled={form.current}
                    value={form.current ? 'Present' : form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    placeholder="December 2024"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none disabled:opacity-50"
                  />
                </div>

                <div className="flex items-center gap-4 pt-6">
                  <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.current}
                      onChange={(e) =>
                        setForm({ ...form, current: e.target.checked })
                      }
                      className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
                    />
                    <span>Currently Active Role</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.active}
                      onChange={(e) =>
                        setForm({ ...form, active: e.target.checked })
                      }
                      className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
                    />
                    <span>Visible on Portfolio</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  Description Overview
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
                  placeholder="Configured Fortinet firewall policies&#10;Conducted ethical hacking footprinting tasks"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  Technologies Used (comma separated)
                </label>
                <input
                  type="text"
                  value={form.technologies}
                  onChange={(e) =>
                    setForm({ ...form, technologies: e.target.value })
                  }
                  placeholder="Fortinet Firewalls, Nmap, Metasploit, Threat Management"
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

        {/* Experience List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">
            Configured Experiences ({experiences.length})
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {experiences.map((exp) => (
              <Card
                key={exp.id}
                className="p-5 bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="cyan" size="sm">
                      {exp.type}
                    </Badge>
                    <span className="text-xs font-mono text-slate-400">
                      {exp.startDate} – {exp.endDate}
                    </span>
                    {exp.current && (
                      <span className="text-[11px] font-mono text-emerald-400">
                        • CURRENT
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {exp.title}
                  </h3>
                  <div className="text-xs text-slate-300 font-medium">
                    {exp.company} • {exp.location}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1 pt-1">
                    {exp.description}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1.5"
                    onClick={() => handleEdit(exp)}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="p-1.5"
                    onClick={() => handleDelete(exp.id)}
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
