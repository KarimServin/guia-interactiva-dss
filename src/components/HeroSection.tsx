"use client";

import React, { useState } from 'react';
import { Search, HeartPulse, Sparkles, ChevronRight, ShieldCheck, Stethoscope, Pill, FileText, CreditCard } from 'lucide-react';
import { ACTION_MODULES } from '@/data/dssData';

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
  const quickFilters = [
    { label: 'Cartilla Médica', query: 'cartilla', icon: Stethoscope },
    { label: 'Autorizaciones', query: 'autorizar', icon: ShieldCheck },
    { label: 'Medicamentos y Farmacias', query: 'farmacia', icon: Pill },
    { label: 'Coseguros', query: 'coseguro', icon: CreditCard },
    { label: 'Reintegros', query: 'reembolso', icon: FileText },
  ];

  return (
    <div className="relative overflow-hidden pt-14 pb-8 sm:pt-20 sm:pb-12 px-4 sm:px-6 lg:px-8 z-10 bg-gradient-to-b from-sky-50/90 via-blue-50/50 to-slate-50">
      {/* Background Hero Image with Soft Dual Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-25 bg-cover bg-center bg-no-repeat pointer-events-none mix-blend-multiply"
        style={{ 
          backgroundImage: "url('/hero-bg.webp')", 
          backgroundPosition: "center 30%",
        }}
      />
      
      {/* Rich Institutional Color Overlays for Depth & Elegance */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-blue-900/10 via-sky-500/5 to-amber-500/10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />

      {/* Decorative Ambient Light Orbs */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-96 h-96 rounded-full bg-sky-300/30 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-0 w-80 h-80 rounded-full bg-orange-300/25 blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Main Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-700/90 mb-2">
            Bienvenido al Portal DSS
          </p>
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4 text-slate-900">
            Guía Interactiva para Afiliados
          </h1>

          <p className="text-slate-600 text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Todo lo que necesitás saber sobre coberturas, trámites y servicios en un solo lugar.
          </p>
        </div>

        {/* Global Search Bar with Glassmorphism */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative group mb-4">
            <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            </div>
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
              className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-xl border border-slate-200/90 text-slate-900 placeholder-slate-400 text-sm font-semibold rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 shadow-lg shadow-blue-950/5 transition-all"
            />
            
            {/* Auto-suggestions Dropdown */}
            {searchQuery.trim() !== '' && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                {ACTION_MODULES.filter(m => 
                  m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  m.verbTitle.toLowerCase().includes(searchQuery.toLowerCase())
                ).slice(0, 4).map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() => {
                      setSearchQuery(mod.title);
                      setTimeout(() => {
                        const el = document.getElementById('search-results');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 50);
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center justify-between border-b border-slate-100 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <Search className="w-4 h-4 text-slate-400" />
                      <span>{mod.verbTitle}</span>
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

          {/* Quick Suggestion Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs mb-4">
            <span className="text-slate-500 font-bold text-[11px] mr-1">Consultas frecuentes:</span>
            {quickFilters.map((chip) => {
              const ChipIcon = chip.icon;
              const isSelected = searchQuery === chip.query;
              return (
                <button
                  key={chip.query}
                  onClick={() => setSearchQuery(chip.query)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-700 text-white shadow-sm scale-105'
                      : 'bg-white/85 hover:bg-white text-slate-700 hover:text-blue-800 border border-slate-200/80 shadow-2xs hover:shadow-xs'
                  }`}
                >
                  <ChipIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                  <span>{chip.label}</span>
                </button>
              );
            })}
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



