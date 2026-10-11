'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Shield,
  Terminal,
  ArrowRight,
  FileText,
  Mail,
  Github,
  Linkedin,
  Lock,
  Cpu,
  CheckCircle2
} from 'lucide-react';
import { Profile } from '@/types';

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden cyber-grid">
      {/* Background radial ambient lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Technical Narrative & Positioning */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Clearance Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs font-mono shadow-sm shadow-cyan-500/10">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-semibold tracking-wider">DEFENSE-IN-DEPTH ARCHITECTURE</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300">ACTIVE</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08] text-slate-900 dark:text-white">
                BUILDING <br />
                <span className="text-gradient-cyan">SECURE DIGITAL</span> <br />
                EXPERIENCES.
              </h1>
            </div>

            {/* Subtitle / Positioning */}
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-sm sm:text-base font-mono font-medium text-slate-700 dark:text-cyan-300">
                <span className="text-cyan-400">SRINIVASARAO CHALAMALA</span>
                <span className="text-slate-500">•</span>
                <span>Full-Stack Web Developer</span>
                <span className="text-slate-500">×</span>
                <span className="text-indigo-400">Cybersecurity Specialist</span>
              </div>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {profile.shortBio ||
                  'Building secure, scalable and meaningful digital experiences at the intersection of full-stack development and cybersecurity.'}
              </p>
            </div>

            {/* Verified Quick Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
              <Badge variant="cyan" size="sm" icon={<Shield className="w-3.5 h-3.5" />}>
                B.Tech CSE (Cyber Security) 8.2 GPA
              </Badge>
              <Badge variant="purple" size="sm" icon={<Lock className="w-3.5 h-3.5" />}>
                Fortinet Certified Associate
              </Badge>
              <Badge variant="emerald" size="sm" icon={<Cpu className="w-3.5 h-3.5" />}>
                Full-Stack Builder
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <a href="#projects">
                <Button
                  variant="cyber"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Explore My Work
                </Button>
              </a>
              <a href="#resume">
                <Button
                  variant="outline"
                  size="lg"
                  icon={<FileText className="w-4 h-4" />}
                >
                  View Resume
                </Button>
              </a>
              <a href="#contact">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<Mail className="w-4 h-4" />}
                >
                  Let&apos;s Connect
                </Button>
              </a>
            </div>

            {/* Social Connectivity Links */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-3 text-sm text-slate-400 font-mono">
              <span className="text-slate-400">TRANSMISSION:</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-700">/</span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-700">/</span>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Technical Card / Profile Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative Corner Cyber Brackets */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-indigo-400 z-20 pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-indigo-400 z-20 pointer-events-none" />

              {/* Main Profile Showcase Card */}
              <div className="relative rounded-2xl overflow-hidden glass-panel-glow scanline-effect border border-cyan-500/30 bg-slate-900/90 shadow-2xl shadow-cyan-500/10">
                {/* Header status bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950/70 text-xs font-mono">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>OPERATOR_ID: SC-2003</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>AUTHENTICATED</span>
                  </div>
                </div>

                {/* Profile Portrait Image */}
                <div className="relative w-full aspect-square max-h-[380px] bg-slate-950 overflow-hidden">
                  <Image
                    src={profile.avatarUrl || '/profile/srinu-profile.png'}
                    alt="Srinivasarao Chalamala"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                </div>

                {/* Technical Meta Footer inside Card */}
                <div className="p-5 space-y-3 bg-slate-950/80 border-t border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white text-base tracking-wide">
                        Srinivasarao Chalamala
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        Eluru, Andhra Pradesh, India
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded">
                        KIET CSE (CYBER)
                      </span>
                    </div>
                  </div>

                  {/* Terminal-style Telemetry grid */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300 pt-2 border-t border-slate-800/60">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">SPECIALTY:</span>
                      <span className="text-cyan-300">Web &amp; Sec</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">GPA:</span>
                      <span className="text-emerald-400">8.2 / 10.0</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">FORTINET:</span>
                      <span className="text-indigo-300">Certified FCA</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">EXPERIENCE:</span>
                      <span className="text-slate-200">3+ Years</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
