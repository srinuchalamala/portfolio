'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Layers, Plus, Trash2, Edit2, X } from 'lucide-react';
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill
} from '@/services/db';
import { Skill } from '@/types';

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    category: 'Programming' as Skill['category'],
    proficiencyLabel: 'Proficient',
    featured: true,
    sortOrder: 1
  });

  const loadSkills = async () => {
    setLoading(true);
    const data = await getSkills();
    setSkills(data);
    setLoading(false);
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const resetForm = () => {
    setForm({
      name: '',
      category: 'Programming',
      proficiencyLabel: 'Proficient',
      featured: true,
      sortOrder: skills.length + 1
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (s: Skill) => {
    setForm({
      name: s.name,
      category: s.category,
      proficiencyLabel: s.proficiencyLabel || '',
      featured: s.featured,
      sortOrder: s.sortOrder
    });
    setEditingId(s.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this skill?')) return;
    await deleteSkill(id);
    await loadSkills();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const skillData = {
      name: form.name.trim(),
      category: form.category,
      proficiencyLabel: form.proficiencyLabel.trim() || undefined,
      featured: form.featured,
      sortOrder: Number(form.sortOrder)
    };

    if (editingId) {
      await updateSkill(editingId, skillData);
    } else {
      await createSkill(skillData);
    }

    resetForm();
    await loadSkills();
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-emerald-400" />
              <span>Technical Skills Matrix</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              MANAGE PROGRAMMING LANGUAGES, SECURITY TOOLS &amp; PLATFORMS
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
            {isEditing ? 'Cancel Editor' : 'New Skill'}
          </Button>
        </div>

        {isEditing && (
          <Card className="p-6 bg-slate-900 border border-emerald-500/30 space-y-4">
            <h2 className="text-lg font-bold text-white">
              {editingId ? 'Edit Skill' : 'Add New Skill'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Fortinet Firewalls"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        category: e.target.value as Skill['category']
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Programming">Programming</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Cybersecurity & Networks">Cybersecurity & Networks</option>
                    <option value="Database & Cloud">Database & Cloud</option>
                    <option value="Tools & Platforms">Tools & Platforms</option>
                    <option value="Operating Systems">Operating Systems</option>
                    <option value="Prompt Engineering">Prompt Engineering</option>
                    <option value="Soft Skills">Soft Skills</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Context / Proficiency Label
                  </label>
                  <input
                    type="text"
                    value={form.proficiencyLabel}
                    onChange={(e) =>
                      setForm({ ...form, proficiencyLabel: e.target.value })
                    }
                    placeholder="e.g. Certified / Advanced / Practiced"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) =>
                      setForm({ ...form, featured: e.target.checked })
                    }
                    className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
                  />
                  <span>Showcase on Homepage</span>
                </label>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-mono text-slate-300">
                    Sort Order:
                  </label>
                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) =>
                      setForm({ ...form, sortOrder: Number(e.target.value) })
                    }
                    className="w-20 px-2 py-1 rounded bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <Button type="submit" variant="cyber" size="sm">
                  {editingId ? 'Update Skill' : 'Save Skill'}
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

        {/* Skills List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">
            Configured Skills ({skills.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {skills.map((s) => (
              <Card
                key={s.id}
                className="p-3 bg-slate-900/80 border border-slate-800 flex items-center justify-between"
              >
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white block">
                    {s.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {s.category} {s.proficiencyLabel ? `• ${s.proficiencyLabel}` : ''}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(s)}
                    className="p-1 rounded text-slate-400 hover:text-white"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="p-1 rounded text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
