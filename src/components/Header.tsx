import React from 'react';
import { Shield, Phone, MapPin, CreditCard, Sparkles, Globe, HeartPulse } from 'lucide-react';

interface HeaderProps {
  onOpenCredential?: () => void;
  onOpenAssistant?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCredential,
  onOpenAssistant,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md text-slate-900 border-b border-slate-200/80 shadow-xs">
      {/* Top Thin Institutional Bar */}
      <div className="bg-blue-950 text-slate-200 text-xs py-1.5 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-2 border-b border-blue-900/60">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-blue-900/90 text-sky-100 border border-blue-800/80 font-semibold px-2.5 py-0.5 rounded-md text-[11px] shadow-2xs">
            <Shield className="w-3.5 h-3.5 text-sky-400" />
            CPCE Santa Fe • Cámara I
          </span>
          <span className="hidden md:inline text-slate-300 text-xs font-normal">
            Departamento de Servicios Sociales (DSS) | Sistema Solidario de Salud
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-normal text-slate-300">
          <a 
            href="https://wa.me/5493425105675" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>WA 3425 10-5675</span>
          </a>
          <span className="hidden sm:flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>San Lorenzo 1849 – Santa Fe</span>
          </span>
          <a 
            href="https://cpcesfe1.org.ar" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hidden lg:flex items-center gap-1.5 text-sky-300 hover:text-white transition-colors font-medium"
          >
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span>cpcesfe1.org.ar</span>
          </a>
        </div>
      </div>

      {/* Main Navbar Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center shrink-0 shadow-2xs text-white">
            <HeartPulse className="w-5 h-5 text-sky-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-extrabold text-slate-900 text-lg tracking-tight leading-none">
                DSS Santa Fe
              </h1>
              <span className="bg-sky-50 text-sky-800 border border-sky-200/80 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                Cámara I
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              Servicios Sociales y Cobertura Médica
            </p>
          </div>
        </div>

        {/* Quick Institutional Action Badges */}
        <div className="flex items-center gap-2.5">
          {onOpenCredential && (
            <button
              onClick={onOpenCredential}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-semibold text-xs px-3.5 py-2 rounded-xl border border-slate-200 transition-colors shadow-2xs"
            >
              <CreditCard className="w-3.5 h-3.5 text-blue-700" />
              <span className="hidden sm:inline">Credencial Digital</span>
            </button>
          )}

          {onOpenAssistant && (
            <button
              onClick={onOpenAssistant}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all shadow-xs active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Asistente AI</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};



