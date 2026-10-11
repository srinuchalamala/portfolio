'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GraduationCap, Plus, Trash2, Edit2, X } from 'lucide-react';
import {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation
} from '@/services/db';
import { Education } from '@/types';

export default function AdminEducationPage() {
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    boardOrUniversity: '',
    score: '',
    scoreType: 'GPA' as Education['scoreType'],
    startYear: '',
    endYear: '',
    current: false,
    details: '',
    sortOrder: 1
  });

  const loadEdu = async () => {
    setLoading(true);
    const data = await getEducation();
    setEducationList(data);
    setLoading(false);
  };

  useEffect(() => {
    loadEdu();
  }, []);

  const resetForm = () => {
    setForm({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      boardOrUniversity: '',
      score: '',
      scoreType: 'GPA',
      startYear: '',
      endYear: '',
      current: false,
      details: '',
      sortOrder: educationList.length + 1
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (e: Education) => {
    setForm({
      institution: e.institution,
      degree: e.degree,
      fieldOfStudy: e.fieldOfStudy,
      boardOrUniversity: e.boardOrUniversity,
      score: e.score,
      scoreType: e.scoreType,
      startYear: e.startYear,
      endYear: e.endYear,
      current: e.current,
      details: e.details || '',
      sortOrder: e.sortOrder
    });
    setEditingId(e.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this education entry?')) return;
    await deleteEducation(id);
    await loadEdu();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const eduData = {
      institution: form.institution.trim(),
      degree: form.degree.trim(),
      fieldOfStudy: form.fieldOfStudy.trim(),
      boardOrUniversity: form.boardOrUniversity.trim(),
      score: form.score.trim(),
      scoreType: form.scoreType,
      startYear: form.startYear.trim(),
      endYear: form.current ? 'Present' : form.endYear.trim(),
      current: form.current,
      details: form.details.trim() || undefined,
      sortOrder: Number(form.sortOrder)
    };

    if (editingId) {
      await updateEducation(editingId, eduData);
    } else {
      await createEducation(eduData);
    }

    resetForm();
    await loadEdu();
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-cyan-400" />
              <span>Academic Education Records</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              MANAGE HIGH SCHOOL, INTERMEDIATE &amp; B.TECH DEGREE CREDENTIALS
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
            {isEditing ? 'Cancel Editor' : 'New Education Entry'}
          </Button>
        </div>

        {isEditing && (
          <Card className="p-6 bg-slate-900 border border-cyan-500/30 space-y-4">
            <h2 className="text-lg font-bold text-white">
              {editingId ? 'Edit Academic Record' : 'Add Academic Record'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Institution Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.institution}
                    onChange={(e) =>
                      setForm({ ...form, institution: e.target.value })
                    }
                    placeholder="Kakinada Institute of Engineering and Technology (KIET)"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Degree / Qualification *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.degree}
                    onChange={(e) => setForm({ ...form, degree: e.target.value })}
                    placeholder="B.Tech – Computer Science and Engineering"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Field of Study / Specialization *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.fieldOfStudy}
                    onChange={(e) =>
                      setForm({ ...form, fieldOfStudy: e.target.value })
                    }
                    placeholder="Specialization: Cyber Security"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Board / University *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.boardOrUniversity}
                    onChange={(e) =>
                      setForm({ ...form, boardOrUniversity: e.target.value })
                    }
                    placeholder="JNTUK / AP State Board"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Score / Marks *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={form.score}
                      onChange={(e) =>
                        setForm({ ...form, score: e.target.value })
                      }
                      placeholder="8.2"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono"
                    />
                    <select
                      value={form.scoreType}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          scoreType: e.target.value as Education['scoreType']
                        })
                      }
                      className="px-2 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                    >
                      <option value="GPA">GPA</option>
                      <option value="Marks">Marks</option>
                      <option value="Percentage">%</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Start Year
                  </label>
                  <input
                    type="text"
                    required
                    value={form.startYear}
                    onChange={(e) =>
                      setForm({ ...form, startYear: e.target.value })
                    }
                    placeholder="2021"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    End Year
                  </label>
                  <input
                    type="text"
                    disabled={form.current}
                    value={form.current ? 'Present' : form.endYear}
                    onChange={(e) =>
                      setForm({ ...form, endYear: e.target.value })
                    }
                    placeholder="Present / 2025"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono disabled:opacity-50"
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
                    <span>Currently Enrolled</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  Curriculum Highlights &amp; Academic Honors
                </label>
                <textarea
                  rows={2}
                  value={form.details}
                  onChange={(e) =>
                    setForm({ ...form, details: e.target.value })
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

        {/* List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">
            Academic Track Records ({educationList.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {educationList.map((edu) => (
              <Card
                key={edu.id}
                className="p-5 bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="cyan" size="sm">
                      {edu.score} {edu.scoreType}
                    </Badge>
                    <span className="text-xs font-mono text-slate-400">
                      {edu.startYear} – {edu.endYear}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {edu.degree}
                  </h3>
                  <div className="text-xs text-cyan-300 font-mono">
                    {edu.fieldOfStudy}
                  </div>
                  <div className="text-xs text-slate-400">
                    {edu.institution} • {edu.boardOrUniversity}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1.5"
                    onClick={() => handleEdit(edu)}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="p-1.5"
                    onClick={() => handleDelete(edu.id)}
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
