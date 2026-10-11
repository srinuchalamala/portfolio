'use client';

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: boolean;
  hoverEffect?: boolean;
  className?: string;
}

export function Card({
  children,
  glow = false,
  hoverEffect = true,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-xl transition-all duration-300 ${
        glow ? 'glass-panel-glow' : 'glass-panel'
      } ${
        hoverEffect
          ? 'hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/5'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
