'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  FolderGit2,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Upload,
  Check,
  X
} from 'lucide-react';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} from '@/services/db';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Project } from '@/types';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [form, setForm] = useState({
    title: '',
    slug: '',
    subtitle: '',
    description: '',
    longDescription: '',
    category: 'Full-Stack' as Project['category'],
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    featuredImage: '/projects/manaclg-banner.svg',
    status: 'Completed' as Project['status'],
    role: '',
    challenges: '',
    solutions: '',
    results: '',
    features: '',
    featured: true,
    sortOrder: 1
  });

  const loadProjects = async () => {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const resetForm = () => {
    setForm({
      title: '',
      slug: '',
      subtitle: '',
      description: '',
      longDescription: '',
      category: 'Full-Stack',
      technologies: '',
      githubUrl: '',
      liveUrl: '',
      featuredImage: '/projects/manaclg-banner.svg',
      status: 'Completed',
      role: '',
      challenges: '',
      solutions: '',
      results: '',
      features: '',
      featured: true,
      sortOrder: projects.length + 1
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (p: Project) => {
    setForm({
      title: p.title,
      slug: p.slug,
      subtitle: p.subtitle,
      description: p.description,
      longDescription: p.longDescription || '',
      category: p.category,
      technologies: p.technologies.join(', '),
      githubUrl: p.githubUrl || '',
      liveUrl: p.liveUrl || '',
      featuredImage: p.featuredImage,
      status: p.status,
      role: p.role,
      challenges: p.challenges || '',
      solutions: p.solutions || '',
      results: p.results || '',
      features: p.features ? p.features.join('\n') : '',
      featured: p.featured,
      sortOrder: p.sortOrder
    });
    setEditingId(p.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this project permanently from Firestore?')) return;
    await deleteProject(id);
    await loadProjects();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const res = await uploadToCloudinary(file, 'portfolio/projects');
      setForm((prev) => ({ ...prev, featuredImage: res.secureUrl }));
    } catch (err) {
      alert(`Upload failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const techArray = form.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const featuresArray = form.features
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const generatedSlug =
      form.slug.trim() ||
      form.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const projectData = {
      title: form.title.trim(),
      slug: generatedSlug,
      subtitle: form.subtitle.trim(),
      description: form.description.trim(),
      longDescription: form.longDescription.trim(),
      category: form.category,
      technologies: techArray,
      githubUrl: form.githubUrl.trim() || undefined,
      liveUrl: form.liveUrl.trim() || undefined,
      featuredImage: form.featuredImage,
      status: form.status,
      role: form.role.trim(),
      challenges: form.challenges.trim() || undefined,
      solutions: form.solutions.trim() || undefined,
      results: form.results.trim() || undefined,
      features: featuresArray,
      featured: form.featured,
      sortOrder: Number(form.sortOrder)
    };

    if (editingId) {
      await updateProject(editingId, projectData);
    } else {
      await createProject(projectData);
    }

    resetForm();
    await loadProjects();
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <FolderGit2 className="w-6 h-6 text-cyan-400" />
              <span>Project Case Studies Manager</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              CREATE, UPDATE AND REORDER PORTFOLIO PROJECTS
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
            {isEditing ? 'Cancel Editor' : 'New Project'}
          </Button>
        </div>

        {/* Project Form Editor */}
        {isEditing && (
          <Card className="p-6 bg-slate-900 border border-cyan-500/30 space-y-4">
            <h2 className="text-lg font-bold text-white">
              {editingId ? 'Edit Project' : 'Create New Project'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    URL Slug (e.g. manaclg-jntuk-study-hub)
                  </label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        category: e.target.value as Project['category']
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Networking">Networking</option>
                    <option value="Open Source">Open Source</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value as Project['status']
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Production">Production</option>
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">Role</label>
                  <input
                    type="text"
                    required
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="Full-Stack Developer"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  Subtitle (Short Summary)
                </label>
                <input
                  type="text"
                  required
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  Card Description (Short Overview)
                </label>
                <textarea
                  rows={2}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  Long Architecture Case Study Description
                </label>
                <textarea
                  rows={4}
                  value={form.longDescription}
                  onChange={(e) =>
                    setForm({ ...form, longDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    required
                    value={form.technologies}
                    onChange={(e) =>
                      setForm({ ...form, technologies: e.target.value })
                    }
                    placeholder="HTML5, CSS3, JavaScript, Firebase"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Featured Image URL (or upload to Cloudinary)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={form.featuredImage}
                      onChange={(e) =>
                        setForm({ ...form, featuredImage: e.target.value })
                      }
                      className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                    />
                    <label className="cursor-pointer px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-mono flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingImage ? '...' : 'Upload'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    GitHub URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={form.githubUrl}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Live Demo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={form.liveUrl}
                    onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Challenges Encountered
                  </label>
                  <textarea
                    rows={2}
                    value={form.challenges}
                    onChange={(e) =>
                      setForm({ ...form, challenges: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Architectural Solutions
                  </label>
                  <textarea
                    rows={2}
                    value={form.solutions}
                    onChange={(e) =>
                      setForm({ ...form, solutions: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Measured Results / Impact
                  </label>
                  <textarea
                    rows={2}
                    value={form.results}
                    onChange={(e) =>
                      setForm({ ...form, results: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none resize-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  Features / Deliverables (One per line)
                </label>
                <textarea
                  rows={3}
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
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
                  {editingId ? 'Update Project' : 'Create Project'}
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

        {/* Projects List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Active Projects in Database</h2>

          {projects.length === 0 ? (
            <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-xl text-slate-400">
              No projects configured. Use &apos;Sync/Seed Verified Data&apos; on the Dashboard or click &apos;New Project&apos;.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {projects.map((proj) => (
                <Card
                  key={proj.id}
                  className="p-5 bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <Badge variant="cyan" size="sm">
                        {proj.category}
                      </Badge>
                      <span className="text-xs font-mono text-slate-400">
                        Order: {proj.sortOrder}
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-base">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {proj.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <a
                      href={`/projects/${proj.slug}`}
                      target="_blank"
                      className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                      title="View public page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEdit(proj)}
                      icon={<Edit2 className="w-3.5 h-3.5" />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(proj.id)}
                      icon={<Trash2 className="w-3.5 h-3.5" />}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
