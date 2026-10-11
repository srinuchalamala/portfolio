import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjects } from '@/services/db';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  ShieldAlert,
  Lightbulb,
  Trophy,
  CheckCircle2,
  Calendar,
  UserCheck,
  Layers
} from 'lucide-react';
import type { Metadata } from 'next';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found | Srinivasarao Chalamala'
    };
  }

  return {
    title: `${project.title} | Srinivasarao Chalamala`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.featuredImage]
    }
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 cyber-grid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation Button */}
          <div className="mb-8">
            <Link href="/#projects">
              <Button
                variant="outline"
                size="sm"
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Back to All Projects
              </Button>
            </Link>
          </div>

          {/* Header Banner Section */}
          <div className="space-y-4 mb-10">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="cyan" size="md">
                {project.category}
              </Badge>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                STATUS: {project.status.toUpperCase()}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
              {project.subtitle}
            </p>

            {/* Role & Tech Metadata Strip */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-cyan-400" />
                <span>ROLE: <strong className="text-white">{project.role}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>ARCHIVED: <strong className="text-white">{project.createdAt || '2024'}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Architecture</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Featured Visual Image / Diagram */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 mb-12 bg-slate-900">
            <Image
              src={project.featuredImage || '/projects/manaclg-banner.svg'}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Case Study Content Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Main Narrative */}
            <div className="lg:col-span-2 space-y-10">
              {/* Detailed Overview */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-400" />
                  <span>Project Overview &amp; Architecture</span>
                </h2>
                <div className="text-slate-300 text-base leading-relaxed space-y-3">
                  <p>{project.longDescription || project.description}</p>
                </div>
              </div>

              {/* Technical Challenges */}
              {project.challenges && (
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-amber-500/25 space-y-3">
                  <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5" />
                    <span>Engineering Challenges</span>
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {project.challenges}
                  </p>
                </div>
              )}

              {/* Solutions & Methodology */}
              {project.solutions && (
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/25 space-y-3">
                  <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    <span>Architectural Solutions</span>
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {project.solutions}
                  </p>
                </div>
              )}

              {/* Results & Measured Impact */}
              {project.results && (
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/25 space-y-3">
                  <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    <span>Results &amp; Impact</span>
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {project.results}
                  </p>
                </div>
              )}
            </div>

            {/* Right 1 Col: Tech Specs & Features */}
            <div className="space-y-6">
              {/* Technologies Applied */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-950 text-cyan-300 border border-cyan-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Features */}
              {project.features && project.features.length > 0 && (
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                    Key Deliverables
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                    {project.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Project CTA card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-indigo-950/40 border border-cyan-500/30 text-center space-y-3">
                <h4 className="font-bold text-white text-base">
                  Interested in discussing this build?
                </h4>
                <p className="text-xs text-slate-300">
                  Connect with Srinivasarao for code walkthroughs or architectural discussions.
                </p>
                <Link href="/#contact">
                  <Button variant="cyber" size="sm" className="w-full">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
