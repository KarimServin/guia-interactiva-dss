"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PLANES_COMPARATIVE_DATA, PlanComparisonItem } from '../data/dssData';
import { X, ShieldCheck, Search, Filter, Sparkles, Clock } from 'lucide-react';

interface CoseguroTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CoseguroTableModal: React.FC<CoseguroTableModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

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

  // Categories list
  const categories = useMemo(() => {
    const cats = Array.from(new Set(PLANES_COMPARATIVE_DATA.map(item => item.category)));
    return ['Todas', ...cats];
  }, []);

  // Filtered Rows
  const filteredData = useMemo(() => {
    return PLANES_COMPARATIVE_DATA.filter(row => {
      const matchesCategory = selectedCategory === 'Todas' || row.category === selectedCategory;
      const matchesSearch = searchTerm.trim() === '' || 
        row.prestacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const content = (
    <>
      {/* Drag handle (mobile) */}
      <div className="md:hidden flex justify-center pt-3 pb-1 shrink-0 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900">
        <div className="w-10 h-1 rounded-full bg-white/30" />
      </div>

      {/* Header */}
      <div className="shrink-0 bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 px-5 pt-4 pb-5 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 mb-1.5">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span>CPCE Santa Fe · Cámara I</span>
            </div>
            <h2 className="text-lg md:text-xl font-extrabold text-white leading-tight">
              Tabla Comparativa de Cobertura y Planes
            </h2>
            <p className="text-xs text-slate-300 mt-1 leading-normal">
              Comparativa detallada entre el <strong className="text-white font-bold">Plan General</strong> y el <strong className="text-white font-bold">Plan Básico</strong> del Departamento de Servicios Sociales.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0 cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="shrink-0 bg-slate-50 border-b border-slate-200 p-4 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar prestación, análisis, ecografía, prótesis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Category Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 text-[11px] ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4 bg-slate-50/50">
        
        {/* Explanation banner */}
        <div className="p-3.5 bg-blue-50/90 border border-blue-100 rounded-2xl flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-700 leading-relaxed">
            <strong className="text-blue-900 font-bold">Resumen de liquidación:</strong> Los porcentajes indican la cobertura a cargo del DSS. Los coseguros se incorporan a tu resumen mensual de cuenta corriente sin necesidad de abonar efectivo al prestador.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
          <table className="w-full text-xs border-collapse min-w-[620px]">
            <thead className="bg-slate-900 text-white font-bold text-left">
              <tr>
                <th className="py-3.5 px-4 text-xs font-extrabold w-2/5">Prestación / Detalle</th>
                <th className="py-3.5 px-3 text-center text-xs font-extrabold bg-blue-900/90 text-sky-200 border-x border-blue-800">
                  Plan General
                </th>
                <th className="py-3.5 px-3 text-center text-xs font-extrabold bg-slate-800 text-slate-200 border-r border-slate-700">
                  Plan Básico
                </th>
                <th className="py-3.5 px-3 text-center text-xs font-extrabold">Carencia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length > 0 ? (
                filteredData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    {/* Prestacion */}
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {row.category}
                      </span>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5">
                        {row.prestacion}
                      </div>
                      <div className="text-[11px] text-slate-500 leading-normal mt-0.5">
                        {row.descripcion}
                      </div>
                    </td>

                    {/* Plan General */}
                    <td className="py-3 px-3 text-center bg-blue-50/40 border-x border-blue-100">
                      <span className={`inline-block px-2.5 py-1 rounded-lg font-extrabold text-xs ${
                        row.planGeneral.includes('100%')
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : row.planGeneral.includes('Sin Cobertura')
                          ? 'bg-slate-100 text-slate-400'
                          : 'bg-blue-100 text-blue-900'
                      }`}>
                        {row.planGeneral}
                      </span>
                    </td>

                    {/* Plan Básico */}
                    <td className="py-3 px-3 text-center border-r border-slate-100">
                      <span className={`inline-block px-2.5 py-1 rounded-lg font-extrabold text-xs ${
                        row.planBasico.includes('100%')
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : row.planBasico.includes('Sin Cobertura')
                          ? 'bg-rose-50 text-rose-500 border border-rose-100'
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {row.planBasico}
                      </span>
                    </td>

                    {/* Carencia */}
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        row.carencia.includes('Sin carencia')
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        <Clock className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>{row.carencia}</span>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500">
                    <p className="text-sm font-semibold">No se encontraron prestaciones para la búsqueda &quot;{searchTerm}&quot;</p>
                    <button
                      onClick={() => { setSearchTerm(''); setSelectedCategory('Todas'); }}
                      className="mt-2 text-xs font-bold text-blue-600 hover:underline"
                    >
                      Restablecer filtros
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="shrink-0 p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3">
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Mostrando {filteredData.length} de {PLANES_COMPARATIVE_DATA.length} prestaciones
        </span>
        <button
          onClick={onClose}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-xs font-bold shadow-sm active:scale-95 transition-all cursor-pointer ml-auto"
        >
          Cerrar Tabla Comparativa
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
            className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm"
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
            style={{ maxHeight: '94dvh' }}
          >
            {content}
          </motion.div>

          {/* Desktop: Side Drawer / Dialog */}
          <motion.div
            key="drawer-desktop"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 36, mass: 0.9 }}
            className="hidden md:flex fixed right-0 top-0 bottom-0 z-50 flex-col bg-white shadow-2xl border-l border-slate-200 overflow-hidden"
            style={{ width: 'min(780px, 94vw)' }}
          >
            {content}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
