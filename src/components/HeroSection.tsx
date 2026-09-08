"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, ChevronRight, ShieldCheck, Star, ArrowRight } from 'lucide-react';
import { ACTION_MODULES, PRESTACIONES_TABS } from '@/data/dssData';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenCredential: () => void;
  onSelectCard: (cardId: string) => void;
}

const TRUST_STATS = [
  { value: '+12.000', label: 'Afiliados activos' },
  { value: '98%', label: 'Satisfacción' },
  { value: '24/7', label: 'Atención online' },
];

const QUICK_LINKS = [
  { label: 'Cartilla Médica', id: 'cartilla' },
  { label: 'Autorizaciones', id: 'autorizaciones' },
  { label: 'Vademécum', id: 'vademecum' },
  { label: 'Coseguros', id: 'tabla-coseguros' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  onSelectCard,
}) => {
  const normalizeStr = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const searchWords = normalizeStr(searchQuery).split(/\s+/).filter(Boolean);

  const matchesSearch = (text: string) => {
    if (!text) return false;
    const normText = normalizeStr(text);
    return searchWords.every(word => normText.includes(word));
  };

  const matchingModules = searchWords.length > 0 ? ACTION_MODULES.filter(m =>
    matchesSearch(m.title) || matchesSearch(m.verbTitle) || matchesSearch(m.shortDesc)
  ).map(m => ({ id: m.id, type: 'module', label: m.verbTitle, query: m.title })) : [];

  const matchingPrestaciones = searchWords.length > 0 ? PRESTACIONES_TABS.filter(p =>
    matchesSearch(p.title) || matchesSearch(p.desc)
  ).map(p => ({ id: `prest-${p.id}`, type: 'prestacion', label: `Prestación: ${p.title}`, query: p.title })) : [];

  const combinedSuggestions = [...matchingModules, ...matchingPrestaciones].slice(0, 5);

  const scrollToResults = () => {
    setTimeout(() => {
      const el = document.getElementById('search-results');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <section className="relative overflow-hidden bg-white">
      {/* ─────────── BACKGROUND LAYER: Luxurious Editorial Mesh ─────────── */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/80 to-blue-50/30" />
      {/* Ultra-soft ambient luminous glows */}
      <div className="pointer-events-none absolute -top-44 -left-32 w-[650px] h-[650px] rounded-full bg-blue-100/50 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/4 left-1/3 w-[480px] h-[480px] rounded-full bg-sky-200/35 blur-[130px]" />
      {/* Subtle organic SVG accent line */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.15]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="none" stroke="url(#hero-gradient-stroke)" strokeWidth="1.5" d="M0,160 Q360,260 720,160 T1440,160" />
        <defs>
          <linearGradient id="hero-gradient-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* ─────────── RIGHT IMAGE: full-bleed desktop ─────────── */}
      <div 
        className="hidden lg:block absolute inset-y-0 right-0 w-[55%] pointer-events-none select-none z-0 overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.01) 15%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 75%, black 100%), linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.01) 15%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 75%, black 100%), linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        <Image
          src="/hero-bg.webp"
          alt="Familia DSS – Tu cobertura más simple"
          fill
          priority
          sizes="55vw"
          className="object-cover object-center scale-105"
          style={{
            filter: 'contrast(1.02) saturate(0.97) brightness(0.99)'
          }}
        />
        {/* Subtle institutional tone tint */}
        <div className="absolute inset-0 bg-blue-950/[0.04] mix-blend-color pointer-events-none" />
      </div>

      {/* ─────────── CONTENT ─────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 lg:pt-40 pb-10 sm:pb-14 lg:pb-16">
        <div className="max-w-xl lg:max-w-[52%]">

          {/* Headline — Outfit typography exclusively for Hero */}
          <h1 className="font-hero text-[2.75rem] sm:text-5xl lg:text-[3.8rem] xl:text-[4.25rem] font-extrabold leading-[1.05] tracking-tight text-slate-900 mb-4 sm:mb-5">
            Guía Interactiva{' '}
            <br className="hidden sm:block" />
            <span
              className="relative inline-block"
              style={{
                backgroundImage: 'linear-gradient(135deg, #1e3a8a 0%, #1b3d82 45%, #2563eb 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
              para Afiliados
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-slate-500 text-base sm:text-lg font-medium leading-relaxed max-w-md mb-6 sm:mb-8">
            Todo lo que necesitás saber para gestionar tu cobertura, trámites y servicios médicos, en un solo lugar.
          </p>

          {/* Search bar */}
          <div className="relative group mb-4 sm:mb-5" style={{ zIndex: 20 }}>
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') scrollToResults(); }}
                placeholder="Buscá prestaciones, autorizaciones, cartilla…"
                className="w-full pl-11 pr-14 py-3.5 sm:py-4 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-900 placeholder-slate-400 text-sm sm:text-base font-medium rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 shadow-lg shadow-slate-200/60 transition-all"
              />
              <button
                onClick={scrollToResults}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-md cursor-pointer"
                aria-label="Buscar">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Auto-suggestions */}
            {searchQuery.trim() !== '' && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white/98 backdrop-blur-2xl border border-slate-200/60 rounded-2xl shadow-2xl shadow-slate-300/30 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                {combinedSuggestions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setSearchQuery(s.query); scrollToResults(); }}
                    className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center justify-between border-b border-slate-100 last:border-0 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Search className={`w-4 h-4 ${s.type === 'prestacion' ? 'text-teal-400' : 'text-slate-400'}`} />
                      <span className={s.type === 'prestacion' ? 'text-teal-700' : ''}>{s.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </button>
                ))}
                <button
                  onClick={scrollToResults}
                  className="w-full text-center px-4 py-3 text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors border-t border-slate-100 cursor-pointer">
                  Ver todos los resultados
                </button>
              </div>
            )}
          </div>

          {/* Quick access chips */}
          <div className="flex flex-wrap gap-2">
            {QUICK_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => setSearchQuery(link.label)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/80 backdrop-blur-sm border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50 text-slate-600 hover:text-blue-700 text-xs sm:text-[13px] font-semibold rounded-full transition-all duration-200 shadow-sm cursor-pointer">
                {link.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* ─────────── MOBILE IMAGE CARD ─────────── */}
      <div className="lg:hidden mx-4 mb-6 relative rounded-3xl overflow-hidden h-48 sm:h-64 shadow-xl border border-white/60">
        <Image
          src="/hero-bg.webp"
          alt="Familia DSS"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* gradient overlay for brand feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
        {/* floating badge */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-[11px] font-bold text-slate-700">Obra Social de confianza</span>
        </div>
      </div>
    </section>
  );
};
