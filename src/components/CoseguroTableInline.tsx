"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { PLANES_COMPARATIVE_DATA, PlanComparisonItem } from '../data/dssData';
import { ShieldCheck, Search, Filter, Sparkles, Clock, ArrowLeftRight, Table } from 'lucide-react';

export const CoseguroTableInline: React.FC = () => {
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
    <div id="tabla-coseguros-planes" className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-0 scroll-mt-20">
      
      {/* ── Section Header (Compact) ── */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 px-4 sm:px-6 py-3.5 text-white">
        <div className="flex items-center gap-2">
          <Table className="w-5 h-5 text-blue-400 shrink-0" />
          <h2 className="text-sm sm:text-base font-extrabold text-white leading-tight">
            Tabla Comparativa de Cobertura y Coseguros
          </h2>
        </div>
        <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5 leading-normal">
          Consulta en tiempo real aranceles, coberturas y períodos de carencia entre el <strong className="text-white font-bold">Plan General</strong> y el <strong className="text-white font-bold">Plan Básico</strong>.
        </p>
      </div>

      {/* ── Search & Filter Toolbar ── */}
      <div className="bg-slate-50 border-b border-slate-200 p-2.5 sm:p-3 space-y-2">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar prestación, ecografía, TAC, prótesis, kinesiología..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-20 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 text-[10px] font-bold text-slate-500 hover:text-slate-800 bg-slate-100 rounded-md transition-all"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5 no-scrollbar text-xs">
          <Filter className="w-3 h-3 text-slate-400 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 text-[11px] ${
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
      <div className="p-3 space-y-2.5 bg-slate-50/40">
        
        {/* Settlement Legend Banner */}
        <div className="p-2.5 bg-blue-50/90 border border-blue-200/80 rounded-xl flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-700 leading-relaxed">
            <strong className="text-blue-900 font-bold">Resumen de liquidación:</strong> Los porcentajes indican la cobertura a cargo del DSS. Los coseguros se incorporan a tu resumen mensual de cuenta corriente sin abonar efectivo en mostrador.
          </p>
        </div>

        {/* Mobile Swipe Banner */}
        <div className="md:hidden flex items-center justify-between gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-lg text-[10px] font-bold shadow-2xs">
          <span className="flex items-center gap-1.5">
            <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-600 shrink-0 animate-pulse" />
            <span>Deslizá para comparar valores de cada plan</span>
          </span>
          <span className="text-[9px] bg-indigo-200/80 text-indigo-950 px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0 font-extrabold">
            ← Deslizar →
          </span>
        </div>

        {/* ── Mobile View: Fluid Cards ── */}
        <div className="sm:hidden space-y-2">
          {filteredData.length > 0 ? (
            filteredData.map((row, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                    {row.category}
                  </span>
                  <div className="font-extrabold text-slate-900 text-xs mt-0.5">
                    {row.prestacion}
                  </div>
                  {row.descripcion && (
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                      {row.descripcion}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-1.5 pt-1.5 border-t border-slate-100 text-center">
                  <div className="bg-blue-50/70 p-1.5 rounded-lg border border-blue-100/80">
                    <span className="text-[9px] text-blue-900 font-bold block mb-0.5">General</span>
                    <span className={`inline-block px-1.5 py-0.5 rounded-md font-extrabold text-[10px] ${
                      row.planGeneral.includes('100%')
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : row.planGeneral.includes('Sin Cobertura')
                        ? 'bg-slate-100 text-slate-400'
                        : 'bg-blue-100 text-blue-900'
                    }`}>
                      {row.planGeneral}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200/80">
                    <span className="text-[9px] text-slate-700 font-bold block mb-0.5">Básico</span>
                    <span className={`inline-block px-1.5 py-0.5 rounded-md font-extrabold text-[10px] ${
                      row.planBasico.includes('100%')
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : row.planBasico.includes('Sin Cobertura')
                        ? 'bg-rose-50 text-rose-500 border border-rose-100'
                        : 'bg-slate-100 text-slate-800'
                    }`}>
                      {row.planBasico}
                    </span>
                  </div>

                  <div className="bg-amber-50/70 p-1.5 rounded-lg border border-amber-100/80 flex flex-col justify-center items-center">
                    <span className="text-[9px] text-amber-900 font-bold block mb-0.5">Carencia</span>
                    <span className={`inline-flex items-center gap-0.5 px-1 py-0.5 rounded-full text-[9px] font-bold ${
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
            <div className="py-6 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
              <p className="text-xs font-semibold">No se encontraron prestaciones para &quot;{searchTerm}&quot;</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('Todas'); }}
                className="mt-1 text-[11px] font-bold text-blue-600 hover:underline"
              >
                Restablecer búsqueda
              </button>
            </div>
          )}
        </div>

        {/* ── Desktop View: Compact Table ── */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 shadow-2xs bg-white relative">
          <table className="w-full text-xs border-collapse min-w-[580px]">
            <thead className="bg-slate-900 text-white font-bold text-left">
              <tr>
                <th className="py-2 px-3 text-[11px] font-extrabold w-5/12">Prestación / Detalle</th>
                <th className="py-2 px-2.5 text-center text-[11px] font-extrabold bg-blue-900/90 text-sky-200 border-x border-blue-800">
                  Plan General
                </th>
                <th className="py-2 px-2.5 text-center text-[11px] font-extrabold bg-slate-800 text-slate-200 border-r border-slate-700">
                  Plan Básico
                </th>
                <th className="py-2 px-2.5 text-center text-[11px] font-extrabold">Carencia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length > 0 ? (
                filteredData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    {/* Prestacion */}
                    <td className="py-2 px-3">
                      <span className="text-[9px] font-extrabold text-blue-600 uppercase tracking-wider block">
                        {row.category}
                      </span>
                      <div className="font-extrabold text-slate-900 text-xs mt-0.5">
                        {row.prestacion}
                      </div>
                      <div className="text-[10px] text-slate-500 leading-tight mt-0.5">
                        {row.descripcion}
                      </div>
                    </td>

                    {/* Plan General */}
                    <td className="py-2 px-2.5 text-center bg-blue-50/30 border-x border-blue-100">
                      <span className={`inline-block px-2 py-0.5 rounded-lg font-extrabold text-[11px] ${
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
                    <td className="py-2 px-2.5 text-center border-r border-slate-100">
                      <span className={`inline-block px-2 py-0.5 rounded-lg font-extrabold text-[11px] ${
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
                    <td className="py-2 px-2.5 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
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
                  <td colSpan={4} className="py-8 text-center text-slate-500">
                    <p className="text-xs font-semibold">No se encontraron prestaciones para &quot;{searchTerm}&quot;</p>
                    <button
                      onClick={() => { setSearchTerm(''); setSelectedCategory('Todas'); }}
                      className="mt-1 text-[11px] font-bold text-blue-600 hover:underline"
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
