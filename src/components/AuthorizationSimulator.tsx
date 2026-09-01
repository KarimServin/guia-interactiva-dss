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
            <img 
              src="/whatsapp-logo.png" 
              alt="WhatsApp" 
              className="w-5 h-5 object-contain shrink-0" 
            />
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
