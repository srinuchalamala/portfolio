'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { GraduationCap, Calendar, Award, Building, BookOpen } from 'lucide-react';
import { Education as EducationType } from '@/types';

interface EducationProps {
  education: EducationType[];
}

export function Education({ education }: EducationProps) {
  return (
    <section id="education" className="py-20 lg:py-28 relative cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="ACADEMIC FOUNDATION"
          badgeIcon={<GraduationCap className="w-3.5 h-3.5" />}
          title="Education &amp; Academic Honors"
          subtitle="Formal academic credentials combining intensive computer science theory with applied cybersecurity specialization."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {education.map((item) => (
            <Card
              key={item.id}
              glow
              className="p-6 bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header: Score Badge */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <Badge variant="cyan" size="md" className="font-mono font-bold">
                    {item.score} {item.scoreType}
                  </Badge>
                </div>

                {/* Degree & Institution */}
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                    {item.degree}
                  </h3>
                  <div className="text-sm font-medium text-cyan-400 font-mono">
                    {item.fieldOfStudy}
                  </div>
                  <div className="text-xs text-slate-300 flex items-center gap-1.5 pt-1">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{item.institution}</span>
                  </div>
                </div>

                {/* Board / University & Years */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate">{item.boardOrUniversity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>
                      {item.startYear} – {item.endYear} {item.current ? '(Current)' : ''}
                    </span>
                  </div>
                </div>

                {/* Details narrative */}
                {item.details && (
                  <p className="text-xs text-slate-400 leading-relaxed pt-2">
                    {item.details}
                  </p>
                )}
              </div>

              {/* Status pill */}
              <div className="mt-6 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400">STATUS:</span>
                <span
                  className={
                    item.current
                      ? 'text-cyan-400 font-semibold'
                      : 'text-emerald-400 font-semibold'
                  }
                >
                  {item.current ? 'IN PROGRESS' : 'COMPLETED'}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
