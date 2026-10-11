'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import {
  Compass,
  BookOpen,
  Cpu,
  Trophy,
  Users,
  Sparkles,
  Gamepad2
} from 'lucide-react';
import { Interest } from '@/types';

interface InterestsProps {
  interests: Interest[];
}

export function Interests({ interests }: InterestsProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-amber-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-emerald-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-5 h-5 text-sky-400" />;
      default:
        return <Compass className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="interests" className="py-20 lg:py-28 relative cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="PASSIONS &amp; PERSPECTIVE"
          badgeIcon={<Compass className="w-3.5 h-3.5" />}
          title="Curiosities, Culture &amp; Interests"
          subtitle="Beyond the codebase: exploring artificial intelligence breakthroughs, tactical strategy, narrative arts, and continuous lifelong mastery."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((item) => (
            <Card
              key={item.id}
              glow
              className="p-6 bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 shrink-0 group-hover:scale-110 group-hover:border-cyan-500/30 transition-all">
                  {getIcon(item.icon)}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400/80 block uppercase">
                    {item.category}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
