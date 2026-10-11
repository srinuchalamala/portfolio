'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Upload,
  Copy,
  Check,
  Trash2,
  Image as ImageIcon,
  ExternalLink,
  Plus,
  RefreshCw
} from 'lucide-react';
import {
  uploadToCloudinary,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET
} from '@/lib/cloudinary';
import {
  getGalleryItems,
  createGalleryItem,
  deleteGalleryItem
} from '@/services/db';
import { GalleryItem } from '@/types';

export default function AdminMediaPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Certifications');

  const loadMedia = async () => {
    setLoading(true);
    const data = await getGalleryItems();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const res = await uploadToCloudinary(file, 'portfolio/gallery');

      const title = newTitle.trim() || res.originalFilename || 'Uploaded Asset';
      await createGalleryItem({
        title,
        caption: `Cloudinary asset (${res.format.toUpperCase()} • ${Math.round(res.bytes / 1024)} KB)`,
        mediaUrl: res.secureUrl,
        resourceType: res.resourceType === 'video' ? 'video' : 'image',
        category: newCategory,
        tags: [newCategory.toLowerCase()],
        featured: true,
        sortOrder: items.length + 1
      });

      setNewTitle('');
      await loadMedia();
    } catch (err: unknown) {
      alert(`Upload error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this gallery record?')) return;
    await deleteGalleryItem(id);
    await loadMedia();
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-emerald-400" />
              <span>Cloudinary Media Pipeline &amp; Assets</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              CLOUD: {CLOUDINARY_CLOUD_NAME} // PRESET: {CLOUDINARY_UPLOAD_PRESET}
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={loadMedia}
            icon={<RefreshCw className="w-4 h-4" />}
          >
            Refresh Media
          </Button>
        </div>

        {/* Upload Zone Card */}
        <Card className="p-6 bg-slate-900 border border-emerald-500/30 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Upload className="w-4 h-4 text-emerald-400" />
            <span>Upload Directly to Cloudinary</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">
                Asset Title / Label (Optional)
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Fortinet Certificate or Project Schematic"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="Certifications">Certifications</option>
                <option value="Projects">Projects</option>
                <option value="Profile">Profile</option>
                <option value="Documents">Documents</option>
              </select>
            </div>
          </div>

          {/* Drag & Drop Input Box */}
          <div className="p-8 rounded-xl border-2 border-dashed border-slate-800 hover:border-emerald-500/50 bg-slate-950/60 text-center transition-colors">
            <input
              type="file"
              id="file-upload"
              accept="image/*,video/*,.pdf"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center justify-center space-y-3"
            >
              <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                <Upload className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-sm font-semibold text-white block">
                  {uploading
                    ? 'Transmitting payload to Cloudinary...'
                    : 'Click to select media or drop file here'}
                </span>
                <span className="text-xs font-mono text-slate-400 block">
                  Supports PNG, JPG, WEBP, PDF, MP4 up to 25MB
                </span>
              </div>
            </label>
          </div>
        </Card>

        {/* Media Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">
            Registered Assets ({items.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden bg-slate-900/80 border border-slate-800 group"
              >
                <div className="relative w-full aspect-video bg-slate-950">
                  <Image
                    src={item.mediaUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="cyan" size="sm">
                      {item.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-3 space-y-2">
                  <h4 className="text-xs font-bold text-white truncate">
                    {item.title}
                  </h4>

                  <div className="flex items-center justify-between gap-1 pt-1 border-t border-slate-800 text-xs font-mono">
                    <button
                      onClick={() => handleCopy(item.mediaUrl)}
                      className="p-1 rounded bg-slate-950 text-slate-400 hover:text-cyan-400 flex items-center gap-1 text-[11px]"
                      title="Copy Secure URL"
                    >
                      {copiedUrl === item.mediaUrl ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1">
                      <a
                        href={item.mediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded text-slate-400 hover:text-white"
                        title="Open full resolution"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-400"
                        title="Delete asset"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
