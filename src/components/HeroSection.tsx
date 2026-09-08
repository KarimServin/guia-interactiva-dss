"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, ChevronRight, ArrowRight, ChevronsDown } from 'lucide-react';
import { ACTION_MODULES, PRESTACIONES_TABS } from '@/data/dssData';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenCredential: () => void;
  onSelectCard: (cardId: string) => void;
}

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

  const scrollToHelp = () => {
    const el = document.getElementById('servicios');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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

      {/* ─────────── RIGHT IMAGE: Full-bleed desktop ─────────── */}
      <div 
        className="hidden lg:block absolute inset-y-0 right-0 w-[50%] xl:w-[52%] pointer-events-none select-none z-0 overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.02) 18%, rgba(0,0,0,0.2) 38%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.9) 85%, black 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.02) 18%, rgba(0,0,0,0.2) 38%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.9) 85%, black 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        <Image
          src="/hero-bg.webp"
          alt="Familia DSS"
          fill
          priority
          fetchPriority="high"
          sizes="(min-width: 1024px) 52vw, 100vw"
          className="object-cover object-center scale-105"
          style={{
            filter: 'contrast(1.01) saturate(0.98) brightness(0.99)'
          }}
        />
        <div className="absolute inset-0 bg-[#101A35]/[0.03] mix-blend-color pointer-events-none" />
      </div>

      {/* ─────────── CONTENT ─────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-24 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-xl mx-auto lg:mx-0 lg:max-w-[54%] text-center lg:text-left flex flex-col items-center lg:items-start">

          {/* Headline — Plus Jakarta Sans 800 */}
          <h1 className="font-sans text-[40px] sm:text-[46px] lg:text-[60px] xl:text-[64px] font-extrabold leading-[1.0] tracking-[-0.035em] text-[#101A35] mb-5 sm:mb-6">
            Guía interactiva <br className="hidden sm:block" />
            para <span className="text-[#2454B8]">Afiliados</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-[#526987] text-base sm:text-[18px] font-normal leading-[1.55] max-w-[480px] mx-auto lg:mx-0 mb-8 sm:mb-9">
            Toda la información que necesitás sobre tu cobertura, trámites y servicios médicos, en un solo lugar.
          </p>

          {/* Search bar */}
          <div className="relative group mb-6 sm:mb-7 w-full text-left" style={{ zIndex: 20 }}>
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-[#8EA1BD] pointer-events-none z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') scrollToResults(); }}
                placeholder="Buscá prestaciones, autorizaciones, cartilla..."
                className="w-full h-[58px] pl-12 pr-14 bg-white border border-[#DCE5F2] text-slate-900 placeholder:text-[#8EA1BD] text-sm sm:text-base font-normal rounded-[16px] focus:outline-none focus:ring-4 focus:ring-[#2454B8]/15 focus:border-[#2454B8] shadow-[0_4px_20px_rgba(16,26,53,0.06)] transition-all"
              />
              <button
                onClick={scrollToResults}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-[42px] h-[42px] flex items-center justify-center bg-[#2454B8] hover:bg-[#1d4498] text-white rounded-[12px] transition-all shadow-sm cursor-pointer"
                aria-label="Buscar">
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Auto-suggestions */}
            {searchQuery.trim() !== '' && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-[#DCE5F2] rounded-[16px] shadow-[0_10px_30px_rgba(16,26,53,0.1)] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                {combinedSuggestions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setSearchQuery(s.query); scrollToResults(); }}
                    className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-[#F3F8FE] hover:text-[#2454B8] transition-colors flex items-center justify-between border-b border-[#DCE5F2]/50 last:border-0 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Search className={`w-4 h-4 ${s.type === 'prestacion' ? 'text-teal-500' : 'text-[#8EA1BD]'}`} />
                      <span className={s.type === 'prestacion' ? 'text-teal-700' : ''}>{s.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </button>
                ))}
                <button
                  onClick={scrollToResults}
                  className="w-full text-center px-4 py-3 text-xs font-bold text-[#2454B8] hover:bg-[#F3F8FE] transition-colors border-t border-[#DCE5F2] cursor-pointer">
                  Ver todos los resultados
                </button>
              </div>
            )}
          </div>

          {/* Quick access chips */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
            {QUICK_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => setSearchQuery(link.label)}
                className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#DCE5F2] hover:border-[#93C5FD] hover:bg-[#EFF7FF] text-[#425875] hover:text-[#2454B8] text-[14px] font-medium rounded-[999px] transition-all duration-200 shadow-[0_2px_8px_rgba(16,26,53,0.04)] cursor-pointer">
                {link.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* ─────────── DOUBLE DOWN ARROW SCROLL INDICATOR ─────────── */}
      <div className="hidden sm:flex absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 items-center justify-center">
        <button
          onClick={scrollToHelp}
          aria-label="Desplazarse a servicios"
          className="group p-1.5 bg-transparent border-0 outline-none cursor-pointer animate-bounce transition-all">
          <svg
            className="w-14 h-7 sm:w-16 sm:h-8 text-[#2454B8]/40 group-hover:text-[#2454B8] transition-colors"
            viewBox="0 0 48 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="4 4 24 13 44 4" />
            <polyline points="4 11 24 20 44 11" />
          </svg>
        </button>
      </div>
    </section>
  );
};
