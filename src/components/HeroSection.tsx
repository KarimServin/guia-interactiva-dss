"use client";

import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Users, Search, CreditCard, Sparkles, ArrowRight, ChevronDown, ChevronsDown, HeartPulse, Stethoscope, Pill, FileText } from 'lucide-react';

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
  const [openCard, setOpenCard] = useState<string | null>(null);

  const toggleCard = (cardId: string) => {
    setOpenCard(prev => prev === cardId ? null : cardId);
  };

  const quickFilters = [
    { label: 'Cartilla Médica', query: 'cartilla' },
    { label: 'Autorizaciones', query: 'autorizar' },
    { label: 'Medicamentos y Farmacias', query: 'farmacia' },
    { label: 'Coseguros', query: 'coseguro' },
    { label: 'Reintegros', query: 'reembolso' },
  ];

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Subtle Background Image with Fade-Out Mask */}
      <div 
        className="absolute inset-0 z-0 opacity-15 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ 
          backgroundImage: "url('/hero-bg.webp')", 
          backgroundPosition: "center 30%",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)"
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-sky-50 border border-sky-200/80 text-sky-800 text-xs font-semibold mb-4 rounded-full shadow-2xs">
            <HeartPulse className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
            <span>¡Bienvenido al Portal del Afiliado DSS!</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-3">
            Guía Interactiva para Afiliados
          </h1>
          <p className="text-slate-600 text-base sm:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
            Todo lo que necesitás saber, en un solo lugar
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative group mb-3">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar trámite, especialidad, coseguro o medicamento..."
              className="w-full pl-11 pr-24 py-3.5 bg-white border border-slate-200/90 text-slate-900 placeholder-slate-400 text-sm font-medium rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition-all"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-2 right-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-xl font-semibold transition-colors"
              >
                Limpiar
              </button>
            ) : (
              <span className="absolute inset-y-2 right-2 px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs rounded-xl font-semibold flex items-center pointer-events-none shadow-2xs">
                Buscar
              </span>
            )}
          </div>

          {/* Quick Suggestion Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs mb-6">
            <span className="text-slate-400 font-medium text-[11px] mr-1">Consultas sugeridas:</span>
            {quickFilters.map((chip) => (
              <button
                key={chip.query}
                onClick={() => setSearchQuery(chip.query)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  searchQuery === chip.query
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-sky-50 hover:text-sky-700 border border-slate-200/60'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>



          {/* Minimalist Wide-Angle Double Scroll Down Arrow */}
          <div className="flex justify-center pt-10 sm:pt-16 pb-2">
            <button
              onClick={() => {
                const el = document.getElementById('servicios');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-2 text-slate-400 hover:text-blue-600 opacity-60 hover:opacity-100 transition-all focus:outline-none cursor-pointer animate-bounce"
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



