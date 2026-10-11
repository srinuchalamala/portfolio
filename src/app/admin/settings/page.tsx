'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Settings, Save, CheckCircle2, Shield } from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '@/services/db';
import { SiteSettings } from '@/types';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getSiteSettings();
      setSettings(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setNotice(null);

    try {
      await updateSiteSettings(settings);
      setNotice('Settings saved to Firestore successfully!');
      setTimeout(() => setNotice(null), 3000);
    } catch (err) {
      console.error(err);
      alert('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = (key: keyof SiteSettings['sectionsVisibility']) => {
    if (!settings) return;
    setSettings({
      ...settings,
      sectionsVisibility: {
        ...settings.sectionsVisibility,
        [key]: !settings.sectionsVisibility[key]
      }
    });
  };

  if (loading || !settings) {
    return (
      <AdminLayout>
        <div className="text-center py-20 font-mono text-cyan-400">
          LOADING SETTINGS...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-cyan-400" />
            <span>Site Configuration &amp; Section Visibility</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            CONFIGURE DYNAMIC METADATA, WHATSAPP WIDGET &amp; HOMEPAGE SECTIONS
          </p>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{notice}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* SEO & Meta Config */}
          <Card className="p-6 bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Global Search Engine Optimization (SEO)</span>
            </h2>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">
                Browser Title Tag Template
              </label>
              <input
                type="text"
                required
                value={settings.siteTitle}
                onChange={(e) =>
                  setSettings({ ...settings, siteTitle: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">
                Meta Description (Search Snippet)
              </label>
              <textarea
                rows={2}
                required
                value={settings.metaDescription}
                onChange={(e) =>
                  setSettings({ ...settings, metaDescription: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none resize-none"
              />
            </div>
          </Card>

          {/* WhatsApp Floating Action Widget */}
          <Card className="p-6 bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white">
              Floating WhatsApp CTA Widget
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  WhatsApp Contact Phone (With country code)
                </label>
                <input
                  type="text"
                  required
                  value={settings.whatsappNumber}
                  onChange={(e) =>
                    setSettings({ ...settings, whatsappNumber: e.target.value })
                  }
                  placeholder="919390011378"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  Default Prefilled Message
                </label>
                <input
                  type="text"
                  required
                  value={settings.whatsappPrefillMessage}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      whatsappPrefillMessage: e.target.value
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>
          </Card>

          {/* Section Visibility Controls */}
          <Card className="p-6 bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white">
              Homepage Section Visibility Toggles
            </h2>
            <p className="text-xs text-slate-400">
              Toggle specific sections on or off without redeploying code.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
              {Object.entries(settings.sectionsVisibility).map(([key, isVis]) => (
                <label
                  key={key}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    isVis
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="text-xs font-mono uppercase font-semibold">
                    {key}
                  </span>
                  <input
                    type="checkbox"
                    checked={isVis}
                    onChange={() =>
                      toggleSection(
                        key as keyof SiteSettings['sectionsVisibility']
                      )
                    }
                    className="rounded bg-slate-950 border-slate-800 text-cyan-400 focus:ring-0"
                  />
                </label>
              ))}
            </div>
          </Card>

          <Button
            type="submit"
            variant="cyber"
            size="md"
            loading={saving}
            icon={<Save className="w-4 h-4" />}
          >
            Save Configuration
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}
