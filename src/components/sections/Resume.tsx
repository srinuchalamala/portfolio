'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  FileText,
  Download,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Terminal
} from 'lucide-react';
import { Profile } from '@/types';

interface ResumeProps {
  profile: Profile;
}

export function Resume({ profile }: ResumeProps) {
  const resumeUrl = profile.resumeUrl || '/certificates/network-security-associate-eduskills.png';

  return (
    <section id="resume" className="py-20 lg:py-28 relative cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="CURRICULUM VITAE"
          badgeIcon={<FileText className="w-3.5 h-3.5" />}
          title="Verified Resume &amp; Dossier"
          subtitle="Download or inspect the official engineering résumé summarizing academic milestones, Fortinet certifications, and practical development experience."
        />

        <div className="max-w-4xl mx-auto">
          <Card
            glow
            className="p-8 sm:p-10 bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Column: Dossier Summary */}
              <div className="md:col-span-8 space-y-5">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                  <Terminal className="w-4 h-4" />
                  <span>CANDIDATE_DOSSIER // SRINIVASARAO CHALAMALA</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Full-Stack Developer &amp; Cybersecurity Specialist
                  </h3>
                  <p className="text-sm font-mono text-cyan-300">
                    B.Tech CSE Cyber Security (KIET) • 8.2 GPA • Eluru, AP, India
                  </p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  The verified resume documents hands-on contributions across modern web applications, Fortinet enterprise firewall deployments, network vulnerability scanning (Nmap/Metasploit), and university workshop coordination.
                </p>

                {/* Highlights List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-slate-300 font-mono">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Fortinet Certified (FCA &amp; FCF)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Network Security Intern (AICTE)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>IIIT Hyderabad Summer Intern</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Google Cybersecurity Verified</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Download Actions */}
              <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-4">
                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <FileText className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono text-slate-400 block">
                    FORMAT: PDF / VERIFIED
                  </span>
                  <span className="text-xs text-emerald-400 font-mono flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> SECURE DOCUMENT
                  </span>
                </div>

                <div className="w-full space-y-2 pt-2">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button
                      variant="cyber"
                      size="md"
                      className="w-full text-xs"
                      icon={<ExternalLink className="w-4 h-4" />}
                      iconPosition="right"
                    >
                      Open PDF Dossier
                    </Button>
                  </a>

                  <a
                    href={resumeUrl}
                    download="Srinivasarao_Chalamala_Resume.pdf"
                    className="block w-full"
                  >
                    <Button
                      variant="outline"
                      size="md"
                      className="w-full text-xs"
                      icon={<Download className="w-4 h-4" />}
                    >
                      Download Resume
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
