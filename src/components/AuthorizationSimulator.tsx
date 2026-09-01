"use client";

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardCheck, MessageCircle, Clock, FileCheck, X, ChevronRight } from 'lucide-react';

interface AuthorizationSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const items = ['Estudios', 'Prácticas', 'Imágenes', 'Odontología', 'Análisis, etc.'];

export const AuthorizationSimulator: React.FC<AuthorizationSimulatorProps> = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  React.useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const content = (
    <>
      {/* Drag handle (mobile) */}
      <div className="md:hidden flex justify-center pt-3 pb-1 shrink-0">
        <div className="w-10 h-1 rounded-full bg-slate-300" />
      </div>

      {/* Header */}
      <div className="shrink-0 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 px-5 pt-4 pb-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md bg-white/20 text-white/90 mb-2">
              Gestión de Prestaciones
            </span>
            <h2 className="text-base md:text-lg font-extrabold text-white leading-snug">
              Autorizaciones Previas
            </h2>
            <p className="text-[11px] text-white/70 mt-1">DSS · CPCE Santa Fe · Cámara I</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/15 hover:bg-white/30 text-white transition-colors shrink-0 mt-0.5"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto overscroll-contain p-4 md:p-5 space-y-4">
        {/* What needs authorization */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4">
          <h4 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-blue-600 shrink-0" />
            Necesitan autorización previa:
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-2 px-3 py-2.5 bg-white rounded-xl border border-slate-200/80 text-xs font-semibold text-slate-800 shadow-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                <span className="truncate">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How to authorize */}
        <div className="bg-gradient-to-br from-emerald-50 via-teal-50/40 to-sky-50 rounded-2xl border border-emerald-200/70 p-4 space-y-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
              Gestión Directa
            </span>
            <h4 className="text-sm font-extrabold text-slate-900 mt-2">
              ¿Cómo se autoriza?
            </h4>
            <p className="text-xs text-slate-600 font-medium leading-relaxed mt-0.5">
              Enviando la indicación médica por WhatsApp al equipo DSS:
            </p>
          </div>

          <a
            href="https://wa.me/5493425105675"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-2xl shadow-md transition-all active:scale-95 group"
          >
            <svg role="img" viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>Enviar por WhatsApp</span>
            <span className="font-mono font-extrabold text-emerald-100">(342) 510-5675</span>
            <ChevronRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Horario */}
        <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-100/80 rounded-xl border border-slate-200/60 text-xs font-semibold text-slate-600">
          <Clock className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Atención: Lunes a Viernes · 7 a 15 hs</span>
        </div>
      </div>

      {/* Footer */}
      <div className="shrink-0 p-4 bg-white border-t border-slate-100">
        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
        >
          Cerrar
        </button>
      </div>
    </>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Mobile: Bottom Sheet */}
          <motion.div
            key="sheet-mobile"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38, mass: 0.8 }}
            className="md:hidden fixed bottom-0 inset-x-0 z-50 flex flex-col bg-white rounded-t-3xl shadow-2xl overflow-hidden"
            style={{ maxHeight: '92dvh' }}
          >
            {content}
          </motion.div>

          {/* Desktop: Side Drawer */}
          <motion.div
            key="drawer-desktop"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 36, mass: 0.9 }}
            className="hidden md:flex fixed right-0 top-0 bottom-0 z-50 flex-col bg-white shadow-2xl border-l border-slate-200/80 overflow-hidden"
            style={{ width: 'min(440px, 90vw)' }}
          >
            {content}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
