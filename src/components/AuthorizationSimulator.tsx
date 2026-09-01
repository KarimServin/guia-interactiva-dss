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
            <svg viewBox="0 0 175.216 175.552" className="w-5 h-5 shrink-0">
              <path fill="#FFFFFF" d="M148.97 26.155C132.748 9.927 111.16 1 87.61 1 39.387 1 0.17 40.218 0.17 88.44c0 15.418 4.027 30.472 11.667 43.708L0.16 175.552l44.38-11.644c12.723 6.938 27.026 10.596 43.07 10.596h0.038c48.218 0 87.439-39.223 87.439-87.445 0-23.35-9.07-45.318-26.117-60.904z"/>
              <path fill="#25D366" d="M87.61 13.86c-41.12 0-74.58 33.46-74.58 74.58 0 13.15 3.43 25.97 9.95 37.26l-6.58 24.01 24.58-6.44c10.84 5.92 23.05 9.04 36.5 9.04h0.03c41.12 0 74.58-33.46 74.58-74.58 0-19.91-7.75-38.62-21.82-52.69-14.07-14.07-32.78-21.82-52.69-21.82z"/>
              <path fill="#FFFFFF" d="M123.63 103.75c-1.98-0.99-11.72-5.78-13.53-6.44-1.81-0.66-3.13-0.99-4.45 0.99-1.32 1.98-5.11 6.44-6.27 7.76-1.16 1.32-2.31 1.48-4.29 0.49-1.98-0.99-8.37-3.08-15.94-9.84-5.89-5.25-9.87-11.73-11.03-13.71-1.16-1.98-0.12-3.05 0.87-4.04 0.89-0.89 1.98-2.31 2.97-3.47 0.99-1.16 1.32-1.98 1.98-3.3 0.66-1.32 0.33-2.48-0.17-3.47-0.49-0.99-4.45-10.72-6.1-14.68-1.61-3.86-3.25-3.34-4.45-3.4-1.16-0.06-2.48-0.06-3.8-0.06-1.32 0-3.47 0.49-5.28 2.48-1.81 1.98-6.93 6.77-6.93 16.5 0 9.73 7.09 19.13 8.08 20.45 0.99 1.32 13.95 21.3 33.79 29.85 4.72 2.04 8.4 3.25 11.28 4.16 4.74 1.51 9.05 1.3 12.46 0.79 3.8-0.57 11.72-4.79 13.37-9.41 1.65-4.62 1.65-8.58 1.16-9.41-0.49-0.83-1.81-1.32-3.79-2.31z"/>
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
