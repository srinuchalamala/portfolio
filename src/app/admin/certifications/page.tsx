'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Award, Plus, Trash2, Edit2, Upload, ExternalLink, X } from 'lucide-react';
import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification
} from '@/services/db';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Certification } from '@/types';

export default function AdminCertificationsPage() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [form, setForm] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
    certificateImage: '/certificates/fortinet-certified-associate.png',
    description: '',
    skills: '',
    category: 'Cybersecurity' as Certification['category'],
    featured: true,
    sortOrder: 1
  });

  const loadCerts = async () => {
    setLoading(true);
    const data = await getCertifications();
    setCerts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCerts();
  }, []);

  const resetForm = () => {
    setForm({
      title: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: '',
      certificateImage: '/certificates/fortinet-certified-associate.png',
      description: '',
      skills: '',
      category: 'Cybersecurity',
      featured: true,
      sortOrder: certs.length + 1
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (c: Certification) => {
    setForm({
      title: c.title,
      issuer: c.issuer,
      issueDate: c.issueDate,
      expiryDate: c.expiryDate || '',
      credentialId: c.credentialId,
      credentialUrl: c.credentialUrl || '',
      certificateImage: c.certificateImage,
      description: c.description,
      skills: c.skills.join(', '),
      category: c.category,
      featured: c.featured,
      sortOrder: c.sortOrder
    });
    setEditingId(c.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this certificate permanently?')) return;
    await deleteCertification(id);
    await loadCerts();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const res = await uploadToCloudinary(file, 'portfolio/certificates');
      setForm((prev) => ({ ...prev, certificateImage: res.secureUrl }));
    } catch (err) {
      alert(`Upload failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const skillsArray = form.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const certData = {
      title: form.title.trim(),
      issuer: form.issuer.trim(),
      issueDate: form.issueDate.trim(),
      expiryDate: form.expiryDate.trim() || undefined,
      credentialId: form.credentialId.trim(),
      credentialUrl: form.credentialUrl.trim() || undefined,
      certificateImage: form.certificateImage,
      description: form.description.trim(),
      skills: skillsArray,
      category: form.category,
      featured: form.featured,
      sortOrder: Number(form.sortOrder)
    };

    if (editingId) {
      await updateCertification(editingId, certData);
    } else {
      await createCertification(certData);
    }

    resetForm();
    await loadCerts();
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-indigo-400" />
              <span>Certifications &amp; Accreditations</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              MANAGE VERIFIED CREDENTIALS, CLOUDINARY CERTIFICATES &amp; IDS
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
            {isEditing ? 'Cancel Editor' : 'New Certification'}
          </Button>
        </div>

        {/* Editor Form */}
        {isEditing && (
          <Card className="p-6 bg-slate-900 border border-indigo-500/30 space-y-4">
            <h2 className="text-lg font-bold text-white">
              {editingId ? 'Edit Certificate' : 'Add New Certificate'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Certificate Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Fortinet Certified Associate in Cybersecurity"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Issuing Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.issuer}
                    onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                    placeholder="Fortinet Training Institute"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Issue Date *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.issueDate}
                    onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
                    placeholder="November 27, 2024"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={form.expiryDate}
                    onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                    placeholder="November 27, 2026 or Lifetime"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Credential ID / Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.credentialId}
                    onChange={(e) => setForm({ ...form, credentialId: e.target.value })}
                    placeholder="2529624852SC"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Verification URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={form.credentialUrl}
                    onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })}
                    placeholder="https://training.fortinet.com/..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        category: e.target.value as Certification['category']
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Network Security">Network Security</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Cloud & Systems">Cloud & Systems</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  Certificate Image URL (or upload to Cloudinary)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={form.certificateImage}
                    onChange={(e) =>
                      setForm({ ...form, certificateImage: e.target.value })
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

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  Skills Validated (comma separated)
                </label>
                <input
                  type="text"
                  value={form.skills}
                  onChange={(e) => setForm({ ...form, skills: e.target.value })}
                  placeholder="Network Security, Firewall Configuration, Threat Analysis"
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
                  {editingId ? 'Update Certificate' : 'Save Certificate'}
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

        {/* Certs List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">
            Configured Certifications ({certs.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certs.map((c) => (
              <Card
                key={c.id}
                className="p-4 bg-slate-900/80 border border-slate-800 flex items-start gap-4"
              >
                <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                  <Image
                    src={c.certificateImage}
                    alt={c.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 space-y-1 min-w-0">
                  <Badge variant="cyan" size="sm">
                    {c.category}
                  </Badge>
                  <h3 className="font-bold text-white text-sm truncate">
                    {c.title}
                  </h3>
                  <div className="text-xs text-slate-400 font-mono">
                    {c.issuer} • ID: {c.credentialId}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1.5"
                    onClick={() => handleEdit(c)}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="p-1.5"
                    onClick={() => handleDelete(c.id)}
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
