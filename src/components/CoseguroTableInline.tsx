"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { PLANES_COMPARATIVE_DATA, PlanComparisonItem } from '../data/dssData';
import { ShieldCheck, Search, Filter, Sparkles, Clock, ArrowLeftRight, Table } from 'lucide-react';

interface CoseguroTableInlineProps {
  hideHeader?: boolean;
}

export const CoseguroTableInline: React.FC<CoseguroTableInlineProps> = ({ hideHeader = false }) => {
  const [data, setData] = useState<PlanComparisonItem[]>(PLANES_COMPARATIVE_DATA);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  // Fetch dynamic data from /api/coberturas endpoint
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch('/api/coberturas')
      .then(res => res.json())
      .then(resData => {
        if (isMounted && resData.success && Array.isArray(resData.data) && resData.data.length > 0) {
          setData(resData.data);
        }
      })
      .catch(err => console.error('Error fetching /api/coberturas:', err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(data.map(item => item.category)));
    return ['Todas', ...cats];
  }, [data]);

  // Filtered rows based on category & search term
  const filteredData = useMemo(() => {
    return data.filter(row => {
      const matchesCategory = selectedCategory === 'Todas' || row.category === selectedCategory;
      const matchesSearch = searchTerm.trim() === '' ||
        row.prestacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [data, selectedCategory, searchTerm]);

  return (
    <div id="tabla-coseguros-planes" className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-0 scroll-mt-20">
      
      {/* ── Section Header ── */}
      {!hideHeader && (
        <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 px-5 sm:px-8 py-4.5 text-white">
          <div className="flex items-center gap-2.5">
            <Table className="w-5.5 h-5.5 text-blue-400 shrink-0" />
            <h2 className="text-base sm:text-xl font-extrabold text-white leading-tight">
              Tabla de Planes y Coseguros
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            Consultá en tiempo real aranceles, coberturas y períodos de carencia entre el <strong className="text-white font-bold">Plan General</strong> y el <strong className="text-white font-bold">Plan Básico</strong>.
          </p>
        </div>
      )}

      {/* ── Search & Filter Toolbar ── */}
      <div className="bg-slate-50 border-b border-slate-200 p-3.5 sm:p-4 space-y-2.5">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar prestación, ecografía, TAC, prótesis, kinesiología..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-24 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 rounded-lg transition-all"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 text-xs ${
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

      {/* ── Main Body & Content ── */}
      <div className="p-4 sm:p-5 space-y-3.5 bg-slate-50/40">
        
        {/* Settlement Legend Banner */}
        <div className="p-3 bg-blue-50/90 border border-blue-200/80 rounded-2xl flex items-start gap-2.5">
          <ShieldCheck className="w-4.5 h-4.5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-700 leading-relaxed">
            <strong className="text-blue-900 font-bold">Resumen de liquidación:</strong> Los porcentajes indican la cobertura a cargo del DSS. Los coseguros se incorporan a tu resumen mensual de cuenta corriente sin abonar efectivo en mostrador.
          </p>
        </div>

        {/* Mobile Swipe Banner */}
        <div className="md:hidden flex items-center justify-between gap-2 px-3.5 py-2 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-xl text-xs font-bold shadow-2xs">
          <span className="flex items-center gap-1.5">
            <ArrowLeftRight className="w-4 h-4 text-indigo-600 shrink-0 animate-pulse" />
            <span>Deslizá para comparar valores de cada plan</span>
          </span>
          <span className="text-[10px] bg-indigo-200/80 text-indigo-950 px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0 font-extrabold">
            ← Deslizar →
          </span>
        </div>

        {/* ── Mobile View: Fluid Cards ── */}
        <div className="sm:hidden space-y-3">
          {filteredData.length > 0 ? (
            filteredData.map((row, idx) => (
              <div key={idx} className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
                <div>
                  <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider block">
                    {row.category}
                  </span>
                  <div className="font-extrabold text-slate-900 text-sm mt-0.5">
                    {row.prestacion}
                  </div>
                  {row.descripcion && (
                    <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {row.descripcion}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
                  <div className="bg-blue-50/70 p-2 rounded-xl border border-blue-100/80">
                    <span className="text-[10px] text-blue-900 font-bold block mb-1">Plan General</span>
                    <span className={`inline-block px-2 py-0.5 rounded-md font-extrabold text-xs ${
                      row.planGeneral.includes('100%')
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : row.planGeneral.includes('Sin Cobertura')
                        ? 'bg-slate-100 text-slate-400'
                        : 'bg-blue-100 text-blue-900'
                    }`}>
                      {row.planGeneral}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                    <span className="text-[10px] text-slate-700 font-bold block mb-1">Plan Básico</span>
                    <span className={`inline-block px-2 py-0.5 rounded-md font-extrabold text-xs ${
                      row.planBasico.includes('100%')
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : row.planBasico.includes('Sin Cobertura')
                        ? 'bg-rose-50 text-rose-500 border border-rose-100'
                        : 'bg-slate-100 text-slate-800'
                    }`}>
                      {row.planBasico}
                    </span>
                  </div>

                  <div className="bg-amber-50/70 p-2 rounded-xl border border-amber-100/80 flex flex-col justify-center items-center">
                    <span className="text-[10px] text-amber-900 font-bold block mb-1">Carencia</span>
                    <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      row.carencia.includes('Sin carencia')
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-900'
                    }`}>
                      {row.carencia}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
              <p className="text-xs font-semibold">No se encontraron prestaciones para &quot;{searchTerm}&quot;</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('Todas'); }}
                className="mt-1 text-xs font-bold text-blue-600 hover:underline"
              >
                Restablecer búsqueda
              </button>
            </div>
          )}
        </div>

        {/* ── Desktop View: Professional Expanded Table ── */}
        <div className="hidden sm:block overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs bg-white relative">
          <table className="w-full text-xs sm:text-sm border-collapse min-w-[620px]">
            <thead className="bg-slate-900 text-white font-bold text-left">
              <tr>
                <th className="py-3 px-4 text-xs font-extrabold w-5/12">Prestación / Detalle</th>
                <th className="py-3 px-3 text-center text-xs font-extrabold bg-blue-900/90 text-sky-200 border-x border-blue-800">
                  Plan General
                </th>
                <th className="py-3 px-3 text-center text-xs font-extrabold bg-slate-800 text-slate-200 border-r border-slate-700">
                  Plan Básico
                </th>
                <th className="py-3 px-3 text-center text-xs font-extrabold">Período de Carencia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length > 0 ? (
                filteredData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    {/* Prestacion */}
                    <td className="py-3 px-4">
                      <span className="text-[10px] sm:text-[11px] font-extrabold text-blue-600 uppercase tracking-wider block">
                        {row.category}
                      </span>
                      <div className="font-extrabold text-slate-900 text-sm sm:text-base mt-0.5 leading-snug">
                        {row.prestacion}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                        {row.descripcion}
                      </div>
                    </td>

                    {/* Plan General */}
                    <td className="py-3 px-3 text-center bg-blue-50/30 border-x border-blue-100">
                      <span className={`inline-block px-3 py-1 rounded-xl font-extrabold text-xs sm:text-sm ${
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
                      <span className={`inline-block px-3 py-1 rounded-xl font-extrabold text-xs sm:text-sm ${
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
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                        row.carencia.includes('Sin carencia')
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{row.carencia}</span>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-slate-500">
                    <p className="text-xs sm:text-sm font-semibold">No se encontraron prestaciones para &quot;{searchTerm}&quot;</p>
                    <button
                      onClick={() => { setSearchTerm(''); setSelectedCategory('Todas'); }}
                      className="mt-1 text-xs font-bold text-blue-600 hover:underline"
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

      {/* ── Table Footer Summary ── */}
      <div className="px-4 py-2 bg-slate-100/80 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600 font-semibold">
        <span>Departamento de Servicios Sociales · CPCE Santa Fe</span>
        <button
          onClick={() => {
            const elem = document.getElementById('coberturas-content');
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-blue-700 hover:text-blue-900 font-extrabold hover:underline"
        >
          ↑ Volver arriba
        </button>
      </div>

    </div>
  );
};
