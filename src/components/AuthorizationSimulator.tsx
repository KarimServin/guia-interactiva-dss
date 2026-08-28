"use client";

import React from 'react';
import { ClipboardCheck, MessageCircle, Clock, FileCheck, X, ChevronRight, Sparkles } from 'lucide-react';

interface AuthorizationSimulatorProps {
  onClose?: () => void;
}

export const AuthorizationSimulator: React.FC<AuthorizationSimulatorProps> = ({ onClose }) => {
  const items = [
    'Estudios',
    'Prácticas',
    'Imágenes',
    'Odontología',
    'Análisis, etc.'
  ];

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl border border-slate-100 max-w-2xl mx-auto my-auto max-h-[92vh] sm:max-h-[90vh] overflow-y-auto relative">
      {/* Top Gradient Accent */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500" />

      {/* Header */}
      <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-4 sm:pb-5 sm:mb-6 pt-1">
        <div className="flex items-center gap-3 sm:gap-3.5">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-500 text-white flex items-center justify-center font-bold shadow-md shrink-0">
            <ClipboardCheck className="w-5 h-5 sm:w-6.5 sm:h-6.5 text-white" />
          </div>
          <div>
            <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Autorizaciones
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
              Información de trámite y canal de gestión previa
            </p>
          </div>
        </div>
        {onClose && (
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors shrink-0"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Section 1: Necesitan autorización previa */}
        <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/80">
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Necesitan autorización previa:</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {items.map((item, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 bg-white rounded-xl border border-slate-200/90 text-[11px] sm:text-xs font-semibold text-slate-800 shadow-2xs"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: ¿Cómo se autoriza? */}
        <div className="bg-gradient-to-br from-emerald-50 via-teal-50/40 to-sky-50 rounded-2xl p-4 sm:p-6 border border-emerald-200/70 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-md">
                Gestión Directa
              </span>
              <h4 className="text-sm sm:text-base font-extrabold text-slate-900 pt-1">
                ¿Cómo se autoriza?
              </h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Enviando la indicación médica por WhatsApp:
              </p>
            </div>

            <a
              href="https://wa.me/5493425105675"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 sm:px-5 sm:py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 sm:gap-2.5 shrink-0 group active:scale-95 text-center"
            >
              <MessageCircle className="w-4 h-4 text-white fill-white/20" />
              <span>Enviar por WhatsApp</span>
              <span className="font-mono text-emerald-100 font-extrabold">3425 10-5675</span>
              <ChevronRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Section 3: Horario de atención */}
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100/70 py-2.5 px-4 rounded-xl border border-slate-200/60 text-center">
          <Clock className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Atención: Lunes a viernes | 7 a 15 hs</span>
        </div>
      </div>
    </div>
  );
};
