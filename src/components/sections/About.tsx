'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import {
  Code,
  ShieldCheck,
  Users2,
  Terminal,
  MapPin,
  GraduationCap,
  Sparkles,
  Lock
} from 'lucide-react';
import { Profile } from '@/types';

interface AboutProps {
  profile: Profile;
}

export function About({ profile }: AboutProps) {
  return (
    <section id="about" className="py-20 lg:py-28 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="ABOUT ME"
          badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
          title="The Intersection of Full-Stack Architecture & Cyber Defense"
          subtitle="Transforming complex requirements into resilient web applications backed by enterprise security principles."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Narrative Storytelling */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed text-base sm:text-lg">
            <div className="p-6 rounded-2xl glass-panel border border-cyan-500/20 bg-slate-900/60 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm">
                <Terminal className="w-4 h-4" />
                <span>// ENGINEERING IDENTITY &amp; CORE FOCUS</span>
              </div>
              <p>
                My name is <strong className="text-white font-semibold">Srinivasarao Chalamala</strong>, a Computer Science &amp; Engineering scholar specializing in <strong className="text-cyan-300 font-medium">Cyber Security</strong> at Kakinada Institute of Engineering and Technology (KIET), maintaining an academic standing of <strong className="text-emerald-400 font-medium">8.2 GPA</strong>.
              </p>
              <p>
                Unlike conventional developers who view security as an afterthought or mere checklist item, I approach software engineering through a <strong className="text-indigo-300 font-medium">security-first lens</strong>. From building resource distribution platforms like <strong className="text-white">ManaClg</strong> to analyzing traffic across <strong className="text-white">Fortinet firewalls</strong> and simulating secure hospital topologies with DMZ isolation, my journey bridges client usability with defensive robustness.
              </p>
              <p>
                Whether configuring enterprise Access Control Lists (ACLs), hunting vulnerabilities with Nmap and Metasploit, or designing component architectures in JavaScript and Flask, I thrive on engineering systems that are as fortified as they are fast.
              </p>
            </div>

            {/* Quick Metrics / Verification Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">8.2</div>
                <div className="text-xs text-slate-400 font-medium mt-1">B.Tech CSE GPA</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-black text-indigo-400 font-mono">5+</div>
                <div className="text-xs text-slate-400 font-medium mt-1">Industry Certifications</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center col-span-2 sm:col-span-1">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">100%</div>
                <div className="text-xs text-slate-400 font-medium mt-1">Authentic Credentials</div>
              </div>
            </div>
          </div>

          {/* Right Column: Three Architectural Pillars */}
          <div className="lg:col-span-5 space-y-4">
            {/* Pillar 1 */}
            <Card glow className="p-5 border-l-4 border-l-cyan-400 bg-slate-900/70">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 shrink-0 mt-0.5">
                  <Code className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Full-Stack Development</h4>
                  <p className="text-sm text-slate-400 leading-snug">
                    Developing modern web applications using JavaScript, HTML5, CSS3, Flask, and Firebase Firestore with fast asset pipelines and responsive mobile-first UI.
                  </p>
                </div>
              </div>
            </Card>

            {/* Pillar 2 */}
            <Card glow className="p-5 border-l-4 border-l-indigo-500 bg-slate-900/70">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Defensive Security &amp; Networks</h4>
                  <p className="text-sm text-slate-400 leading-snug">
                    Fortinet Certified in enterprise cybersecurity. Proficient in firewall rule definition, DMZ perimeter segmentation, network packet analysis, and ethical hacking.
                  </p>
                </div>
              </div>
            </Card>

            {/* Pillar 3 */}
            <Card glow className="p-5 border-l-4 border-l-emerald-500 bg-slate-900/70">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shrink-0 mt-0.5">
                  <Users2 className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Leadership &amp; Workshop Training</h4>
                  <p className="text-sm text-slate-400 leading-snug">
                    Workshop Coordinator at ManaClg LevelUp and Core Member at KIET R&amp;D Club, training student cohorts in front-end development and security hygiene.
                  </p>
                </div>
              </div>
            </Card>

            {/* Personal Context Strip */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-mono text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Base of Operations: {profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>B.Tech CSE (Cyber Security) · 2021–Present</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Fortinet Certifications: Active &amp; Validated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
