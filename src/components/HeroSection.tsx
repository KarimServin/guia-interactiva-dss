"use client";

import React, { useState } from 'react';
import { Search, HeartPulse, Sparkles, ChevronRight, ShieldCheck, Stethoscope, Pill, FileText, CreditCard } from 'lucide-react';
import { ACTION_MODULES, PRESTACIONES_TABS } from '@/data/dssData';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenCredential: () => void;
  onSelectCard: (cardId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  onOpenCredential,
  onSelectCard,
}) => {
  // Normalized search logic for better matching
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


  return (
    <div className="relative overflow-hidden pt-14 pb-8 sm:pt-20 sm:pb-12 px-4 sm:px-6 lg:px-8 z-10 bg-gradient-to-b from-sky-50/90 via-blue-50/50 to-slate-50">
      {/* Background Hero Image with Soft Dual Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-no-repeat pointer-events-none mix-blend-multiply"
        style={{ 
          backgroundImage: "url('/hero-bg.webp')", 
          backgroundPosition: "100% 30%",
          opacity: 0.20,
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 40%, black 95%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, transparent 40%, black 95%, transparent 100%)",
        }}
      />
      
      {/* Rich Institutional Color Overlays for Depth & Elegance */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-sky-300/15 via-blue-100/10 to-orange-200/15 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />

      {/* Decorative Ambient Light Orbs */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-96 h-96 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-0 w-80 h-80 rounded-full bg-orange-200/25 blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Main Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-600 mb-3">
            Bienvenido al Portal DSS
          </p>
          <h1 className="font-montserrat text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-5 text-slate-900">
            Guía Interactiva <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-sky-500">para Afiliados</span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Todo lo que necesitás saber sobre coberturas, trámites y servicios en un solo lugar.
          </p>
        </div>

        {/* Global Search Bar with Glassmorphism */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative group mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setTimeout(() => {
                    const el = document.getElementById('search-results');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 50);
                }
              }}
              placeholder="Buscar trámite, especialidad, coseguro o medicamento..."
              className="w-full pl-6 pr-16 py-4 bg-white/90 backdrop-blur-xl border border-slate-200/90 text-slate-900 placeholder-slate-400 text-sm font-semibold rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 shadow-lg shadow-blue-950/5 transition-all"
            />
            <button
              onClick={() => {
                const el = document.getElementById('search-results');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="absolute inset-y-1.5 right-1.5 w-12 flex items-center justify-center bg-blue-50/50 hover:bg-blue-100/60 backdrop-blur-md border border-blue-100/50 text-blue-600 rounded-xl transition-all cursor-pointer shadow-sm"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {/* Auto-suggestions Dropdown */}
            {searchQuery.trim() !== '' && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                {combinedSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => {
                      setSearchQuery(suggestion.query);
                      setTimeout(() => {
                        const el = document.getElementById('search-results');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 50);
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center justify-between border-b border-slate-100 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <Search className={`w-4 h-4 ${suggestion.type === 'prestacion' ? 'text-teal-400' : 'text-slate-400'}`} />
                      <span className={suggestion.type === 'prestacion' ? 'text-teal-700' : ''}>{suggestion.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </button>
                ))}
                
                <button
                  onClick={() => {
                    const el = document.getElementById('search-results');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full text-center px-4 py-3 text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors border-t border-slate-100"
                >
                  Presioná Enter para ver todos los resultados
                </button>
              </div>
            )}
          </div>



          {/* Minimalist Double Scroll Arrow */}
          <div className="flex justify-center pt-8 sm:pt-12 pb-2 -mb-8">
            <button
              onClick={() => {
                const el = document.getElementById('servicios');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-3 text-slate-400 hover:text-blue-600 opacity-70 hover:opacity-100 transition-all focus:outline-none cursor-pointer animate-bounce"
              title="Desplazarse hacia abajo"
            >
              <svg 
                className="w-12 h-6" 
                fill="none" 
                viewBox="0 0 36 18" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M4 3l14 7L32 3" />
                <path d="M4 9l14 7L32 9" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



