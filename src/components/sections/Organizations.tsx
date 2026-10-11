'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Users2, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Organization } from '@/types';

interface OrganizationsProps {
  organizations: Organization[];
}

export function Organizations({ organizations }: OrganizationsProps) {
  return (
    <section id="organizations" className="py-20 lg:py-28 relative bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="LEADERSHIP &amp; COMMUNITY"
          badgeIcon={<Users2 className="w-3.5 h-3.5" />}
          title="Organizations &amp; Technical Leadership"
          subtitle="Empowering peer developers through structured technical workshops, university research initiatives, and collaborative security collectives."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {organizations.map((org) => (
            <Card
              key={org.id}
              glow
              className="p-6 bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    <Users2 className="w-5 h-5" />
                  </div>
                  <Badge variant="cyan" size="sm" className="font-mono">
                    {org.period}
                  </Badge>
                </div>

                {/* Org & Role */}
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {org.name}
                  </h3>
                  <div className="text-sm font-semibold text-cyan-400 font-mono">
                    {org.role}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {org.description}
                </p>

                {/* Responsibilities list */}
                {org.responsibilities && org.responsibilities.length > 0 && (
                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                      Key Contributions
                    </span>
                    <ul className="space-y-2 text-xs text-slate-400">
                      {org.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
