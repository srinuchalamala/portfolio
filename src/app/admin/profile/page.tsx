'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { User, Save, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { getProfile, updateProfile } from '@/services/db';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Profile } from '@/types';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getProfile();
      setProfile(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    try {
      setUploadingAvatar(true);
      const res = await uploadToCloudinary(file, 'portfolio/profile');
      setProfile({ ...profile, avatarUrl: res.secureUrl });
    } catch (err: unknown) {
      alert(`Upload failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    try {
      setUploadingResume(true);
      const res = await uploadToCloudinary(file, 'portfolio/resume');
      setProfile({ ...profile, resumeUrl: res.secureUrl });
    } catch (err: unknown) {
      alert(`Upload failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setUploadingResume(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    setNotice(null);

    try {
      await updateProfile(profile);
      setNotice('Profile updated successfully in Firestore!');
      setTimeout(() => setNotice(null), 3000);
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !profile) {
    return (
      <AdminLayout>
        <div className="text-center py-20 font-mono text-cyan-400">
          LOADING PROFILE DATA...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <User className="w-6 h-6 text-cyan-400" />
              <span>Personal Profile &amp; Bio Dossier</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              MANAGE PUBLIC HEADLINES, CONTACT DETAILS, AVATAR &amp; RESUME URLS
            </p>
          </div>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{notice}</span>
          </div>
        )}

        <Card className="p-6 sm:p-8 bg-slate-900 border border-cyan-500/30">
          <form onSubmit={handleSave} className="space-y-6">
            {/* Avatar & Resume Upload Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                  <Image
                    src={profile.avatarUrl || '/profile/srinu-profile.png'}
                    alt={profile.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono text-slate-300 block font-semibold">
                    Profile Portrait Photo
                  </span>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 text-xs font-mono border border-cyan-500/30">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingAvatar ? 'Uploading...' : 'Replace Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                      disabled={uploadingAvatar}
                    />
                  </label>
                </div>
              </div>

              {/* Resume */}
              <div className="space-y-1 sm:border-l sm:border-slate-800 sm:pl-6">
                <span className="text-xs font-mono text-slate-300 block font-semibold">
                  Official Resume Document
                </span>
                <span className="text-[11px] font-mono text-slate-400 block truncate max-w-xs">
                  {profile.resumeUrl}
                </span>
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 text-xs font-mono border border-indigo-500/30 mt-1">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingResume ? 'Uploading...' : 'Upload New Resume PDF'}</span>
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    className="hidden"
                    onChange={handleResumeUpload}
                    disabled={uploadingResume}
                  />
                </label>
              </div>
            </div>

            {/* Core Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  Status Clearance Badge
                </label>
                <input
                  type="text"
                  value={profile.statusBadge}
                  onChange={(e) =>
                    setProfile({ ...profile, statusBadge: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  Hero Headline
                </label>
                <input
                  type="text"
                  required
                  value={profile.headline}
                  onChange={(e) =>
                    setProfile({ ...profile, headline: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  Subheadline / Tagline
                </label>
                <input
                  type="text"
                  required
                  value={profile.subheadline}
                  onChange={(e) =>
                    setProfile({ ...profile, subheadline: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Bios */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">
                Hero Short Bio
              </label>
              <textarea
                rows={2}
                required
                value={profile.shortBio}
                onChange={(e) =>
                  setProfile({ ...profile, shortBio: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">
                Detailed About Narrative Bio
              </label>
              <textarea
                rows={5}
                required
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none resize-none"
              />
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  Phone Number *
                </label>
                <input
                  type="text"
                  required
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={profile.location}
                  onChange={(e) =>
                    setProfile({ ...profile, location: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={profile.linkedin}
                  onChange={(e) =>
                    setProfile({ ...profile, linkedin: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={profile.github}
                  onChange={(e) =>
                    setProfile({ ...profile, github: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={profile.whatsapp}
                  onChange={(e) =>
                    setProfile({ ...profile, whatsapp: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <Button
                type="submit"
                variant="cyber"
                size="md"
                loading={saving}
                icon={<Save className="w-4 h-4" />}
              >
                Persist Profile Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
}
