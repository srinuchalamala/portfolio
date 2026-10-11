'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Camera, Maximize2, Tag, Calendar } from 'lucide-react';
import { GalleryItem } from '@/types';

interface GalleryProps {
  galleryItems: GalleryItem[];
}

export function Gallery({ galleryItems }: GalleryProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  if (!galleryItems || galleryItems.length === 0) return null;

  return (
    <section id="gallery" className="py-20 lg:py-28 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="MEDIA ARCHIVE"
          badgeIcon={<Camera className="w-3.5 h-3.5" />}
          title="Interactive Visual Archive"
          subtitle="A curated showcase of verified certifications, architectural schematics, and milestone artifacts."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <Card
              key={item.id}
              glow
              className="overflow-hidden bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 group cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative w-full aspect-[4/3] bg-slate-950 overflow-hidden">
                <Image
                  src={item.mediaUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2.5 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg">
                    <Maximize2 className="w-4 h-4" /> Full Resolution
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge variant="cyan" size="sm" className="font-mono">
                    {item.category}
                  </Badge>
                </div>
              </div>

              <div className="p-4 space-y-1 bg-slate-950/80">
                <h4 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors truncate">
                  {item.title}
                </h4>
                {item.caption && (
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {item.caption}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Lightbox Modal */}
        <Modal
          isOpen={Boolean(selectedItem)}
          onClose={() => setSelectedItem(null)}
          title={selectedItem?.title || 'Visual Artifact'}
          maxWidth="4xl"
        >
          {selectedItem && (
            <div className="space-y-4">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <Image
                  src={selectedItem.mediaUrl}
                  alt={selectedItem.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">
                    {selectedItem.title}
                  </h3>
                  <Badge variant="cyan" size="sm">
                    {selectedItem.category}
                  </Badge>
                </div>
                {selectedItem.caption && (
                  <p className="text-xs text-slate-300">
                    {selectedItem.caption}
                  </p>
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}
