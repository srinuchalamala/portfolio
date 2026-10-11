'use client';

import React from 'react';
import { Badge } from './Badge';

interface SectionHeadingProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  badge,
  badgeIcon,
  title,
  subtitle,
  align = 'center',
  className = ''
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl mb-12 md:mb-16 ${alignment} ${className}`}>
      {badge && (
        <div className={`mb-3 inline-block ${align === 'center' ? 'mx-auto' : ''}`}>
          <Badge variant="cyber" size="md" icon={badgeIcon}>
            {badge}
          </Badge>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-1 w-20 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
}
