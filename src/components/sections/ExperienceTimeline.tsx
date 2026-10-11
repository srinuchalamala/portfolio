'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Briefcase, Calendar, MapPin, CheckCircle, Shield } from 'lucide-react';
import { Experience } from '@/types';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const activeExperiences = experiences.filter((e) => e.active !== false);

  return (
    <section id="experience" className="py-20 lg:py-28 relative bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="EXPERIENCE TIMELINE"
          badgeIcon={<Briefcase className="w-3.5 h-3.5" />}
          title="Professional &amp; Academic Experience"
          subtitle="Track record spanning full-stack web engineering, campus IT network operations, Fortinet cybersecurity analysis, and institutional research."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Guide Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-400 via-indigo-500 to-slate-800 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-12">
            {activeExperiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Badge */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-6 z-20 hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 text-cyan-400 shadow-lg shadow-cyan-500/20">
                    <Shield className="w-3.5 h-3.5" />
                  </div>

                  {/* Card Content Container */}
                  <div className="w-full sm:w-1/2 sm:px-8">
                    <Card
                      glow
                      className="p-6 bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40"
                    >
                      {/* Top Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                          {exp.type}
                        </span>
                        {exp.current ? (
                          <Badge variant="emerald" size="sm" className="font-mono">
                            ACTIVE ROLE
                          </Badge>
                        ) : (
                          <Badge variant="slate" size="sm" className="font-mono">
                            COMPLETED
                          </Badge>
                        )}
                      </div>

                      {/* Role & Company */}
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {exp.title}
                      </h3>
                      <div className="text-base font-medium text-slate-300 mt-0.5">
                        {exp.company}
                      </div>

                      {/* Date & Location */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mt-2 pb-3 border-b border-slate-800">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>
                            {exp.startDate} – {exp.endDate}
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{exp.location}</span>
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Responsibilities list */}
                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-400">
                          {exp.responsibilities.map((resp, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Tech Stack Badges */}
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="mt-5 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-950 text-slate-300 border border-slate-800"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
