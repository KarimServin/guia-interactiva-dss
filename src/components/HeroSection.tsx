import React from 'react';
import { ShieldCheck, UserCheck, Users, Search, CreditCard, Sparkles, ArrowRight, HeartPulse, Stethoscope, Pill, FileText } from 'lucide-react';

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
    { label: 'Cartilla Médica', query: 'cartilla' },
    { label: 'Autorizaciones', query: 'autorizar' },
    { label: 'Medicamentos y Farmacias', query: 'farmacia' },
    { label: 'Coseguros', query: 'coseguro' },
    { label: 'Reintegros', query: 'reembolso' },
  ];

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
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
            Consejo Profesional de Ciencias Económicas de Santa Fe – Cámara I. Respuestas inmediatas, autogestión de trámites y atención integral.
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
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
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
        </div>

        {/* Top 3 Institutional Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: ¿QUÉ ES EL DSS? */}
          <div 
            onClick={() => onSelectCard('que-es')}
            className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-2xs hover:shadow-md hover:border-sky-300 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex justify-between items-start mb-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 border border-sky-100 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-sky-700 uppercase tracking-wider">Sistema Solidario</span>
                    <h2 className="font-heading text-lg font-bold text-slate-900 leading-snug">
                      ¿Qué es el DSS?
                    </h2>
                  </div>
                </div>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed mb-4 font-normal">
                Sistema de salud creado por y para profesionales matriculados en la Cámara I del CPCE.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-xs text-sky-800 font-semibold flex items-center justify-between">
              <span>Afiliación automática al matricularte</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-sky-600" />
            </div>
          </div>

          {/* Card 2: SOY AFILIADO */}
          <div 
            onClick={() => onSelectCard('soy-afiliado')}
            className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex justify-between items-start mb-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider">Identificación</span>
                    <h2 className="font-heading text-lg font-bold text-slate-900 leading-snug">
                      Soy Afiliado
                    </h2>
                  </div>
                </div>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed mb-4 font-normal">
                Identificate con tu número de matrícula o generá tu credencial digital para presentar en prestadores.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCredential();
                }}
                className="w-full py-2 px-3.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <CreditCard className="w-3.5 h-3.5 text-blue-200" />
                <span>Ver Credencial Digital</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: MI GRUPO FAMILIAR */}
          <div 
            onClick={() => onSelectCard('grupo-familiar')}
            className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-2xs hover:shadow-md hover:border-teal-300 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex justify-between items-start mb-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider">Familia</span>
                    <h2 className="font-heading text-lg font-bold text-slate-900 leading-snug">
                      Grupo Familiar
                    </h2>
                  </div>
                </div>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed mb-4 font-normal">
                Integrá a tu cónyuge e hijos. Mantené la cobertura de estudiantes universitarios hasta los 25 años.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-xs text-teal-800 font-semibold flex items-center justify-between">
              <span>Incorporación y Requisitos</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-teal-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



