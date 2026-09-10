"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ChevronRight, ArrowRight } from 'lucide-react';
import { ACTION_MODULES, PRESTACIONES_TABS } from '@/data/dssData';
import { normalizeStr, parseSearchTerms } from '@/lib/utils';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenCredential: () => void;
  onSelectCard: (cardId: string) => void;
}

const QUICK_LINKS = [
  { label: 'Cartilla Médica', href: '/cartilla' },
  { label: 'Tabla de coberturas', href: '/tabla-coseguros' },
  { label: 'Valores de cuota', href: '/cuotas' },
  { label: 'Vademecum', href: '/vademecum/basico' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  onSelectCard,
}) => {
  const searchWords = parseSearchTerms(searchQuery);

  const matchesSearch = (text: string): boolean => {
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

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToResults = () => {
    const el = document.getElementById('search-results');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <section className="relative overflow-hidden bg-white lg:min-h-[86vh] xl:min-h-[90vh] 2xl:min-h-[92vh] flex flex-col justify-center">
      {/* ─────────── BACKGROUND LAYER: Pure CSS Ambient Mesh (Apple / Stripe style — 0ms GPU math) ─────────── */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 5% 0%, rgba(219, 234, 254, 0.65) 0%, transparent 70%),
            radial-gradient(ellipse 50% 45% at 50% 25%, rgba(224, 242, 254, 0.45) 0%, transparent 65%),
            radial-gradient(ellipse 45% 40% at 85% 10%, rgba(238, 242, 255, 0.35) 0%, transparent 60%),
            linear-gradient(135deg, #ffffff 0%, rgba(248, 250, 252, 0.8) 50%, rgba(239, 246, 255, 0.3) 100%)
          `
        }}
      />
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
        className="hidden lg:block absolute inset-y-0 right-0 w-[50%] xl:w-[52%] 2xl:w-[50%] pointer-events-none select-none z-0 overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.02) 16%, rgba(0,0,0,0.2) 36%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.9) 85%, black 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 90%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.02) 16%, rgba(0,0,0,0.2) 36%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.9) 85%, black 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 90%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        <Image
          src="/hero-bg.webp"
          alt="Familia DSS"
          fill
          sizes="(min-width: 1024px) 52vw, 0px"
          className="object-cover object-[center_18%] xl:object-[center_15%]"
          priority
          style={{
            filter: 'contrast(1.01) saturate(0.98) brightness(0.99)'
          }}
        />
        <div className="absolute inset-0 bg-[#101A35]/[0.03] mix-blend-color pointer-events-none" />
      </div>

      {/* ─────────── CONTENT ─────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-36 sm:pt-40 lg:pt-44 xl:pt-48 pb-16 sm:pb-20 lg:pb-24 xl:pb-28 w-full">
        <div className="max-w-xl mx-auto lg:mx-0 lg:max-w-[54%] text-center lg:text-left flex flex-col items-center lg:items-start">

          {/* Headline — Plus Jakarta Sans 800 */}
          <h1 className="font-sans text-[40px] sm:text-[46px] lg:text-[56px] xl:text-[62px] 2xl:text-[68px] font-extrabold leading-[1.04] tracking-[-0.035em] text-[#101A35] mb-5 sm:mb-6">
            Guía interactiva <br className="hidden sm:block" />
            para <span className="text-[#2454B8]">Afiliados</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-[#526987] text-base sm:text-[18px] xl:text-[19px] font-normal leading-[1.55] max-w-[480px] xl:max-w-[520px] mx-auto lg:mx-0 mb-8 sm:mb-9 xl:mb-10">
            Toda la información que necesitás sobre tu cobertura, trámites y servicios médicos, en un solo lugar.
          </p>

          {/* Search bar */}
          <div className="relative group mb-6 sm:mb-7 xl:mb-8 w-full max-w-xl text-left" style={{ zIndex: 20 }}>
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
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#DCE5F2] hover:border-[#93C5FD] hover:bg-[#EFF7FF] text-[#425875] hover:text-[#2454B8] text-[14px] font-medium rounded-[999px] transition-all duration-200 shadow-[0_2px_8px_rgba(16,26,53,0.04)] cursor-pointer">
                {link.label}
              </Link>
            ))}
          </div>

        </div>
      </div>

      {/* ─────────── MOBILE-ONLY SLEEK SCROLL INDICATOR ─────────── */}
      <div 
        className={`flex sm:hidden justify-center pb-5 pt-1 transition-all duration-200 pointer-events-none ${
          hasScrolled ? 'opacity-0 scale-90 translate-y-2' : 'opacity-100 scale-100 translate-y-0'
        }`}
        aria-hidden={hasScrolled}
      >
        <div className="flex flex-col items-center animate-bounce">
          <svg
            className="w-10 h-3 text-[#2454B8]/40"
            viewBox="0 0 36 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 3 18 10 33 3" />
          </svg>
        </div>
      </div>

    </section>
  );
};
