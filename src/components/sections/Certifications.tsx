'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import {
  Award,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Copy,
  Check,
  Maximize2
} from 'lucide-react';
import { Certification } from '@/types';

interface CertificationsProps {
  certifications: Certification[];
}

export function Certifications({ certifications }: CertificationsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'All',
    'Cybersecurity',
    'Network Security',
    'Software Engineering'
  ];

  const filteredCerts =
    activeCategory === 'All'
      ? certifications
      : certifications.filter((c) => c.category === activeCategory);

  const handleCopy = (idText: string) => {
    navigator.clipboard.writeText(idText);
    setCopiedId(idText);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="certifications" className="py-20 lg:py-28 relative bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="VALIDATED CREDENTIALS"
          badgeIcon={<Award className="w-3.5 h-3.5" />}
          title="Industry Certifications &amp; Accreditations"
          subtitle="Verifiable credentials earned from Fortinet Training Institute, Google, AICTE, EduSkills, and industry testing bodies."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <Card
              key={cert.id}
              glow
              className="flex flex-col overflow-hidden bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 group"
            >
              {/* Image Preview with Zoom Overlay */}
              <div
                className="relative w-full aspect-[4/3] bg-slate-950 overflow-hidden cursor-pointer"
                onClick={() => setSelectedCert(cert)}
              >
                <Image
                  src={cert.certificateImage}
                  alt={cert.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity p-2.5 rounded-full bg-cyan-500 text-slate-950 shadow-lg font-bold text-xs flex items-center gap-1.5">
                    <Maximize2 className="w-4 h-4" /> View Certificate
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge variant="cyan" size="sm" className="font-mono">
                    {cert.category}
                  </Badge>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{cert.issuer}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {/* Credential ID Strip */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      {cert.issueDate}
                    </span>
                    {cert.credentialId && (
                      <button
                        onClick={() => handleCopy(cert.credentialId)}
                        className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
                        title="Copy Credential ID"
                      >
                        {copiedId === cert.credentialId ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="truncate max-w-[120px]">
                              {cert.credentialId}
                            </span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Skills tags */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {cert.skills.slice(0, 3).map((sk) => (
                        <span
                          key={sk}
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-400 border border-slate-800"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-cyan-400 hover:text-cyan-300 px-0"
                    onClick={() => setSelectedCert(cert)}
                  >
                    Inspect Document
                  </Button>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-slate-300 hover:text-cyan-400 p-1.5 rounded hover:bg-slate-800 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Verify</span>
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Certificate Modal Viewer */}
        <Modal
          isOpen={Boolean(selectedCert)}
          onClose={() => setSelectedCert(null)}
          title={selectedCert?.title || 'Certificate Document'}
          maxWidth="4xl"
        >
          {selectedCert && (
            <div className="space-y-6">
              {/* Large Image Frame */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
                <Image
                  src={selectedCert.certificateImage}
                  alt={selectedCert.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              {/* Detailed Metadata Grid */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {selectedCert.title}
                    </h4>
                    <p className="text-xs font-mono text-cyan-400">
                      Issuing Body: {selectedCert.issuer}
                    </p>
                  </div>
                  {selectedCert.credentialUrl && (
                    <a
                      href={selectedCert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="cyber"
                        size="sm"
                        icon={<ExternalLink className="w-3.5 h-3.5" />}
                        iconPosition="right"
                      >
                        Official Verification Portal
                      </Button>
                    </a>
                  )}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedCert.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block">ISSUE DATE:</span>
                    <span className="text-white font-semibold">
                      {selectedCert.issueDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">EXPIRATION:</span>
                    <span className="text-emerald-400 font-semibold">
                      {selectedCert.expiryDate || 'Lifetime Credential'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">CREDENTIAL ID:</span>
                    <button
                      onClick={() => handleCopy(selectedCert.credentialId)}
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                    >
                      <span className="truncate">{selectedCert.credentialId}</span>
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}
