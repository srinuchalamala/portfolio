'use client';

import React, { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  Code2,
  Globe,
  Database,
  Wrench,
  ShieldAlert,
  Server,
  UserCheck,
  Bot,
  Layers
} from 'lucide-react';
import { Skill } from '@/types';

interface SkillsProps {
  skills: Skill[];
}

export function Skills({ skills }: SkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Categories list
  const categories = [
    'All',
    'Programming',
    'Web Development',
    'Cybersecurity & Networks',
    'Database & Cloud',
    'Tools & Platforms',
    'Operating Systems',
    'Prompt Engineering',
    'Soft Skills'
  ];

  const filteredSkills =
    selectedCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Programming':
        return <Code2 className="w-4 h-4 text-cyan-400" />;
      case 'Web Development':
        return <Globe className="w-4 h-4 text-sky-400" />;
      case 'Cybersecurity & Networks':
        return <ShieldAlert className="w-4 h-4 text-indigo-400" />;
      case 'Database & Cloud':
        return <Database className="w-4 h-4 text-amber-400" />;
      case 'Tools & Platforms':
        return <Wrench className="w-4 h-4 text-emerald-400" />;
      case 'Operating Systems':
        return <Server className="w-4 h-4 text-rose-400" />;
      case 'Prompt Engineering':
        return <Bot className="w-4 h-4 text-purple-400" />;
      case 'Soft Skills':
        return <UserCheck className="w-4 h-4 text-teal-400" />;
      default:
        return <Layers className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 lg:py-28 relative cyber-grid-dense">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="TECHNICAL ARSENAL"
          badgeIcon={<Layers className="w-3.5 h-3.5" />}
          title="Skills &amp; Technology Stack"
          subtitle="A comprehensive matrix of programming languages, offensive & defensive security tools, cloud platforms, and engineering methodologies."
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/25 scale-105'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {getCategoryIcon(cat)}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <Card
              key={skill.id}
              className="p-4 bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm tracking-wide">
                      {skill.name}
                    </h4>
                    <span className="text-[11px] text-slate-400 block font-mono">
                      {skill.category}
                    </span>
                  </div>
                </div>

                {skill.proficiencyLabel && (
                  <Badge variant="cyan" size="sm" className="font-mono shrink-0">
                    {skill.proficiencyLabel}
                  </Badge>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Security / Quality Commitment Banner */}
        <div className="mt-12 p-6 rounded-2xl glass-panel border border-cyan-500/20 bg-slate-900/40 text-center max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            <span className="text-cyan-400 font-bold">NOTE: </span>
            Skills are backed by verified coursework, hands-on lab environments, Fortinet credentials, and production codebase contributions. No arbitrary or simulated percentage metrics.
          </p>
        </div>
      </div>
    </section>
  );
}
