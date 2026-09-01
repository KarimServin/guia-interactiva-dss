"use client";

import React, { useState } from 'react';
import { Search, HeartPulse, Sparkles, ChevronRight, ShieldCheck, Stethoscope, Pill, FileText, CreditCard } from 'lucide-react';

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
    <div className="relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6 lg:px-8 z-10 bg-gradient-to-b from-sky-50/90 via-blue-50/50 to-slate-50">
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/85 backdrop-blur-md border border-sky-200/80 text-blue-950 text-xs font-bold mb-4 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <HeartPulse className="w-3.5 h-3.5 text-blue-600" />
            <span>¡Bienvenido al Portal del Afiliado DSS!</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4 text-slate-900">
            Guía Interactiva para <span className="bg-gradient-to-r from-blue-950 via-blue-700 to-sky-600 bg-clip-text text-transparent">Afiliados</span>
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
              placeholder="Buscar trámite, especialidad, coseguro o medicamento..."
              className="w-full pl-12 pr-28 py-4 bg-white/90 backdrop-blur-xl border border-slate-200/90 text-slate-900 placeholder-slate-400 text-sm font-semibold rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 shadow-lg shadow-blue-950/5 transition-all"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-2.5 right-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-xl font-bold transition-colors cursor-pointer"
              >
                Limpiar
              </button>
            ) : (
              <span className="absolute inset-y-2 right-2 px-4 py-2 bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white text-xs rounded-xl font-bold flex items-center shadow-md pointer-events-none transition-all">
                Buscar
              </span>
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
          <div className="flex justify-center pt-16 sm:pt-24 pb-4 -mb-6">
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



