"use client";

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COSEGUROS_TABLE } from '../data/dssData';
import { X, ShieldCheck, DollarSign } from 'lucide-react';

interface CoseguroTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CoseguroTableModal: React.FC<CoseguroTableModalProps> = ({ isOpen, onClose }) => {
  // Keyboard close
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Body scroll lock
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
      <div className="shrink-0 bg-gradient-to-r from-blue-700 to-indigo-800 px-5 pt-4 pb-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md bg-white/20 text-white/90 mb-2">
              Valores Oficiales DSS
            </span>
            <h2 className="text-base md:text-lg font-extrabold text-white leading-snug">
              Tabla de Coseguros
            </h2>
            <p className="text-[11px] text-white/70 mt-1">CPCE Santa Fe · Cámara I</p>
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
        {/* How it works box */}
        <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 space-y-2">
          <p className="text-xs font-bold text-blue-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
            ¿Cómo funciona el coseguro?
          </p>
          <p className="text-xs text-slate-700 leading-relaxed">
            Cuando una práctica es autorizada, el DSS cubre el porcentaje correspondiente según el plan. El saldo restante se incorpora automáticamente a la cuenta corriente del afiliado.
          </p>
          <div className="bg-white/90 border border-sky-200/80 rounded-xl p-3">
            <p className="text-xs font-semibold text-blue-900 leading-relaxed">
              No es necesario abonar importes en clínicas o sanatorios al momento de la prestación. El coseguro se liquida junto con la cuota mensual siguiente.
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-xs border-collapse min-w-[440px]">
            <thead className="bg-slate-900 text-white font-bold">
              <tr>
                <th className="py-3 px-3.5 text-left">Práctica / Atención</th>
                <th className="py-3 px-3.5 text-left">Coseguro</th>
                <th className="py-3 px-3.5 text-left">Modalidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {COSEGUROS_TABLE.map((row, idx) => (
                <tr
                  key={idx}
                  className={
                    row.coseguro.includes('$0')
                      ? 'bg-sky-50/80 font-semibold'
                      : 'hover:bg-slate-50 transition-colors'
                  }
                >
                  <td className="py-3 px-3.5 font-semibold text-slate-900">{row.practica}</td>
                  <td className="py-3 px-3.5 font-bold text-blue-600">{row.coseguro}</td>
                  <td className="py-3 px-3.5 text-slate-600">
                    <div>{row.cobro}</div>
                    {row.nota && <span className="text-[11px] text-slate-400">{row.nota}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="shrink-0 p-4 bg-white border-t border-slate-100">
        <button
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm font-bold shadow-md hover:opacity-90 active:scale-[0.98] transition-all"
        >
          Entendido
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
            style={{ width: 'min(460px, 90vw)' }}
          >
            {content}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
