'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Mail, Phone, MapPin, Lock, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';

interface FooterProps {
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
}

export function Footer({
  email = 'chalamalasrinu2003@gmail.com',
  phone = '9390011378',
  location = 'Eluru, Andhra Pradesh, India',
  linkedin = 'https://linkedin.com/in/ch-srinu',
  github = 'https://github.com/Srinu-01'
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800 text-slate-400 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                SRINIVASARAO <span className="text-cyan-400">CHALAMALA</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Full-Stack Web Developer &amp; Cybersecurity Specialist. Building secure, resilient, high-performance digital architectures at the intersection of web technology and defensive computing.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${email}`}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">
                  About Narrative
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-cyan-400 transition-colors">
                  Technical Skills Matrix
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">
                  Featured Case Studies
                </a>
              </li>
              <li>
                <a href="#certifications" className="hover:text-cyan-400 transition-colors">
                  Verified Certifications
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-cyan-400 transition-colors">
                  Professional Experience
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition-colors">
                  Contact &amp; Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <a
                  href={`mailto:${email}`}
                  className="hover:text-cyan-400 transition-colors break-all"
                >
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a
                  href={`tel:${phone}`}
                  className="hover:text-cyan-400 transition-colors"
                >
                  +91 {phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{location}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Security Clearances & Admin */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Security Posture
            </h4>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>SYSTEM STATUS: NORMAL</span>
              </div>
              <p className="text-slate-400">
                End-to-End SSL/TLS, Zero-Trust Architecture &amp; Authenticated Admin Portal.
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors font-mono"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin CMS</span>
                </Link>
                <button
                  onClick={scrollToTop}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  aria-label="Scroll to top"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} Srinivasarao Chalamala. All rights reserved.</p>
          <p className="font-mono text-slate-400">
            ENGINEERED WITH NEXT.JS, FIREBASE &amp; CLOUDINARY
          </p>
        </div>
      </div>
    </footer>
  );
}
