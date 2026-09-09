"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, LucideIcon } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface PageHeaderProps {
  badgeIcon?: LucideIcon;
  badgeText?: string;
  badgeVariant?: 'blue' | 'indigo' | 'rose' | 'emerald' | 'cyan' | 'amber';
  titlePrefix?: string;
  titleHighlight?: string;
  titleSuffix?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  children?: React.ReactNode;
  className?: string;
}

const BADGE_VARIANTS = {
  blue: 'bg-blue-50/90 text-blue-700 border-blue-200/80 shadow-2xs',
  indigo: 'bg-indigo-50/90 text-indigo-700 border-indigo-200/80 shadow-2xs',
  rose: 'bg-rose-50/90 text-rose-700 border-rose-200/80 shadow-2xs',
  emerald: 'bg-emerald-50/90 text-emerald-700 border-emerald-200/80 shadow-2xs',
  cyan: 'bg-cyan-50/90 text-cyan-700 border-cyan-200/80 shadow-2xs',
  amber: 'bg-amber-50/90 text-amber-700 border-amber-200/80 shadow-2xs',
};

const ICON_VARIANTS = {
  blue: 'text-[#2454B8]',
  indigo: 'text-indigo-600',
  rose: 'text-rose-600',
  emerald: 'text-emerald-600',
  cyan: 'text-cyan-600',
  amber: 'text-amber-600',
};

const HIGHLIGHT_VARIANTS = {
  blue: 'text-[#2454B8]',
  indigo: 'text-indigo-600',
  rose: 'text-rose-600',
  emerald: 'text-emerald-600',
  cyan: 'text-cyan-600',
  amber: 'text-amber-600',
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  badgeIcon: BadgeIcon,
  badgeText,
  badgeVariant = 'blue',
  titlePrefix,
  titleHighlight,
  titleSuffix,
  title,
  description,
  breadcrumbs,
  children,
  className = '',
}) => {
  return (
    <header className={`relative pt-28 sm:pt-32 lg:pt-36 pb-6 sm:pb-8 animate-in fade-in duration-300 ${className}`}>
      {/* Ambient Radial Mesh (Zero GPU overhead, seamless transition from navbar) */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 sm:h-96 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(219, 234, 254, 0.50) 0%, rgba(224, 242, 254, 0.25) 50%, transparent 80%)'
        }}
        aria-hidden="true"
      />

      <div className="space-y-3.5">
        {/* Optional Breadcrumb Nav */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1" aria-label="Ruta de navegación">
            {breadcrumbs.map((item, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />}
                  {isLast ? (
                    <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-none">
                      {item.label}
                    </span>
                  ) : item.onClick ? (
                    <button
                      onClick={item.onClick}
                      className="hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ) : item.href ? (
                    <Link
                      href={item.href}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-slate-500">{item.label}</span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        )}

        {/* Micro-badge temático */}
        {badgeText && (
          <div>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] sm:text-xs font-bold tracking-wider uppercase select-none ${BADGE_VARIANTS[badgeVariant] || BADGE_VARIANTS.blue}`}>
              {BadgeIcon && <BadgeIcon className={`w-3.5 h-3.5 shrink-0 ${ICON_VARIANTS[badgeVariant] || ICON_VARIANTS.blue}`} />}
              <span>{badgeText}</span>
            </span>
          </div>
        )}

        {/* Main Title */}
        <div>
          {title ? (
            <h1 className="font-sans text-2xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              {title}
            </h1>
          ) : (
            <h1 className="font-sans text-2xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              {titlePrefix}
              {titleHighlight && (
                <span className={HIGHLIGHT_VARIANTS[badgeVariant] || HIGHLIGHT_VARIANTS.blue}>
                  {titleHighlight}
                </span>
              )}
              {titleSuffix}
            </h1>
          )}
        </div>

        {/* Subtitle / Description */}
        {description && (
          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl font-normal pt-0.5">
            {description}
          </p>
        )}

        {/* Optional Actions / Search or Filter Injection */}
        {children && (
          <div className="pt-2">
            {children}
          </div>
        )}
      </div>
    </header>
  );
};
