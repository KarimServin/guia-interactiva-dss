"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { CreditCard, RefreshCw, Table, Info, ChevronRight } from 'lucide-react';

interface CuotaRow {
  categoria: string;
  activa: { total: string; emerg: string; conEmerg: string };
  mantenimiento: { total: string; emerg: string; conEmerg: string };
}

interface CuotaSection {
  title: string;
  rows: CuotaRow[];
}

interface CuotasDataResponse {
  success: boolean;
  isFallback?: boolean;
  updatedAt: string;
  sheetUrl: string;
  rawGrid: string[][];
  sections: CuotaSection[];
  error?: string;
}

export const CuotasValores: React.FC = () => {
  const [data, setData] = useState<CuotasDataResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [matriculaFilter, setMatriculaFilter] = useState<'todos' | 'activa' | 'mantenimiento'>('todos');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const fetchCuotasData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cuotas');
      if (!res.ok) throw new Error('Error al conectar con la API de cuotas');
      const json: CuotasDataResponse = await res.json();
      setData(json);
    } catch (err: any) {
      console.error('Error cargando datos de cuotas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCuotasData();
  }, [fetchCuotasData]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 rounded-2xl p-5 sm:p-8 text-white shadow-lg relative overflow-hidden border border-blue-800/40">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/20 backdrop-blur-md border border-blue-400/20 px-3 py-1 rounded-full text-[11px] font-bold text-sky-200">
            <CreditCard className="w-3.5 h-3.5 text-sky-400" />
            <span>Departamento de Servicios Sociales</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Valores de cuota
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl font-normal leading-relaxed">
            Consulta la estructura y los importes vigentes de cuotas mensuales según el plan y condición de matrícula.
          </p>
        </div>
      </div>

      {/* Filter Controls & Mobile View Selector */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center justify-between sm:justify-start gap-2 font-bold text-slate-800 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Table className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Estructura Oficial de Cuotas</span>
          </div>

          {/* Mobile View Switcher */}
          <div className="flex md:hidden items-center bg-slate-200/80 p-0.5 rounded-lg text-[10px]">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                viewMode === 'cards' ? 'bg-white text-blue-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Tarjetas
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-blue-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Tabla
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 text-xs font-semibold text-slate-700">
          <span className="text-slate-500 text-[11px]">Estado Matrícula:</span>
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg overflow-x-auto max-w-full">
            <button
              onClick={() => setMatriculaFilter('todos')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer text-[11px] whitespace-nowrap ${
                matriculaFilter === 'todos' ? 'bg-white text-blue-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setMatriculaFilter('activa')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer text-[11px] whitespace-nowrap ${
                matriculaFilter === 'activa' ? 'bg-emerald-600 text-white font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Matrícula Activa
            </button>
            <button
              onClick={() => setMatriculaFilter('mantenimiento')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer text-[11px] whitespace-nowrap ${
                matriculaFilter === 'mantenimiento' ? 'bg-amber-600 text-white font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mantenimiento
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="h-48 bg-slate-50 rounded-2xl animate-pulse flex items-center justify-center border border-slate-100">
          <div className="flex items-center gap-2 text-slate-500 font-semibold text-xs">
            <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
            <span>Cargando datos de cuotas...</span>
          </div>
        </div>
      )}

      {/* Table View (Default on desktop, selectable on mobile) */}
      {!loading && data && (
        <div className={`${viewMode === 'table' ? 'block' : 'hidden md:block'} bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-200`}>
          
          {/* Mobile Swipe Banner when table is forced on mobile */}
          <div className="md:hidden bg-indigo-50 px-3.5 py-2 border-b border-indigo-100 text-indigo-900 text-[11px] font-bold flex items-center justify-between">
            <span>← Deslizá la tabla horizontalmente para ver todos los importes →</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs min-w-[620px]">
              <thead>
                {/* Row 1: Group Headers */}
                <tr className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white text-[10px] uppercase tracking-wider font-extrabold">
                  <th className="py-2.5 px-4 border-b border-slate-800 w-1/4">
                    Categoría / Plan
                  </th>
                  {(matriculaFilter === 'todos' || matriculaFilter === 'activa') && (
                    <th colSpan={3} className="py-2.5 px-4 border-b border-slate-800 text-center bg-blue-900/40 border-l border-r border-blue-800/40">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span>Matrícula Activa</span>
                      </div>
                    </th>
                  )}
                  {(matriculaFilter === 'todos' || matriculaFilter === 'mantenimiento') && (
                    <th colSpan={3} className="py-2.5 px-4 border-b border-slate-800 text-center bg-amber-955/40 border-l border-slate-800">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                        <span>Mantenimiento Matrícula</span>
                      </div>
                    </th>
                  )}
                </tr>

                {/* Row 2: Column Headers */}
                <tr className="bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-2 px-4">Detalle Afiliado</th>

                  {/* Matrícula Activa Columns */}
                  {(matriculaFilter === 'todos' || matriculaFilter === 'activa') && (
                    <>
                      <th className="py-2 px-3 text-right bg-blue-50/30">Total</th>
                      <th className="py-2 px-3 text-right bg-blue-50/30 text-slate-500">Emerg</th>
                      <th className="py-2 px-3 text-right bg-blue-100/40 text-blue-950 font-extrabold">C/Emerg</th>
                    </>
                  )}

                  {/* Mantenimiento Columns */}
                  {(matriculaFilter === 'todos' || matriculaFilter === 'mantenimiento') && (
                    <>
                      <th className="py-2 px-3 text-right bg-amber-50/30">Total</th>
                      <th className="py-2 px-3 text-right bg-amber-50/30 text-slate-500">Emerg</th>
                      <th className="py-2 px-3 text-right bg-amber-100/40 text-amber-950 font-extrabold">C/Emerg</th>
                    </>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-slate-700">
                {data.sections.map((sec, secIdx) => {
                  const isBasico = sec.title.toLowerCase().includes('básico') || sec.title.toLowerCase().includes('basico');
                  const isGeneral = sec.title.toLowerCase().includes('general');

                  return (
                    <React.Fragment key={secIdx}>
                      {/* Section Header Row */}
                      <tr className={`font-extrabold text-[10px] uppercase tracking-wider ${
                        isBasico 
                          ? 'bg-sky-50/60 text-blue-900 border-t border-sky-100' 
                          : isGeneral 
                          ? 'bg-indigo-50/60 text-indigo-950 border-t border-indigo-100'
                          : 'bg-amber-50/60 text-amber-950 border-t border-amber-100'
                      }`}>
                        <td 
                          colSpan={matriculaFilter === 'todos' ? 7 : 4} 
                          className="py-1.5 px-4 font-extrabold"
                        >
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${
                              isBasico ? 'bg-sky-500' : isGeneral ? 'bg-indigo-600' : 'bg-amber-500'
                            }`} />
                            <span>{sec.title}</span>
                          </div>
                        </td>
                      </tr>

                      {/* Data Rows under Section */}
                      {sec.rows.map((row, rowIdx) => (
                        <tr key={rowIdx} className="hover:bg-slate-50 transition-colors">
                          <td className="py-2 px-4 font-bold text-slate-800">
                            {row.categoria}
                          </td>

                          {/* Matrícula Activa */}
                          {(matriculaFilter === 'todos' || matriculaFilter === 'activa') && (
                            <>
                              <td className="py-2 px-3 text-right font-medium text-slate-700 bg-blue-50/10">
                                {row.activa.total}
                              </td>
                              <td className="py-2 px-3 text-right text-slate-400 bg-blue-50/10">
                                {row.activa.emerg}
                              </td>
                              <td className="py-2 px-3 text-right font-extrabold text-blue-900 bg-blue-50/30">
                                {row.activa.conEmerg}
                              </td>
                            </>
                          )}

                          {/* Mantenimiento Matrícula */}
                          {(matriculaFilter === 'todos' || matriculaFilter === 'mantenimiento') && (
                            <>
                              <td className="py-2 px-3 text-right font-medium text-slate-700 bg-amber-50/10">
                                {row.mantenimiento.total || '-'}
                              </td>
                              <td className="py-2 px-3 text-right text-slate-400 bg-amber-50/10">
                                {row.mantenimiento.emerg || '-'}
                              </td>
                              <td className="py-2 px-3 text-right font-extrabold text-amber-950 bg-amber-50/30">
                                {row.mantenimiento.conEmerg || '-'}
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mobile Cards View (Default on mobile, hidden on desktop or when table mode is selected) */}
      {!loading && data && (
        <div className={`${viewMode === 'cards' ? 'block md:hidden' : 'hidden'} space-y-5 animate-in fade-in duration-200`}>
          {data.sections.map((sec, secIdx) => {
            const isBasico = sec.title.toLowerCase().includes('básico') || sec.title.toLowerCase().includes('basico');
            const isGeneral = sec.title.toLowerCase().includes('general');

            return (
              <div key={secIdx} className="space-y-2.5">
                {/* Mobile Section Header */}
                <div className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                  isBasico 
                    ? 'bg-sky-100/70 text-blue-900 border border-sky-200' 
                    : isGeneral 
                    ? 'bg-indigo-100/70 text-indigo-950 border border-indigo-200' 
                    : 'bg-amber-100/70 text-amber-950 border border-amber-200'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    isBasico ? 'bg-sky-500' : isGeneral ? 'bg-indigo-600' : 'bg-amber-500'
                  }`} />
                  <span>{sec.title}</span>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 gap-2.5">
                  {sec.rows.map((row, rowIdx) => (
                    <div key={rowIdx} className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs space-y-3">
                      <div className="border-b border-slate-100 pb-1.5 flex items-center justify-between">
                        <span className="text-xs font-extrabold text-slate-900">{row.categoria}</span>
                        <span className="text-[10px] text-slate-400 font-medium">Cuota mensual</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        {/* Matrícula Activa Box */}
                        {(matriculaFilter === 'todos' || matriculaFilter === 'activa') && (
                          <div className="bg-blue-50/60 rounded-xl p-2.5 border border-blue-100 space-y-1.5">
                            <div className="flex items-center justify-between border-b border-blue-100 pb-1">
                              <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                <span className="font-bold text-blue-950 text-[10px] uppercase tracking-wider">Matrícula Activa</span>
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-slate-600">
                              <span>Total Base:</span>
                              <span className="font-semibold text-slate-800">{row.activa.total}</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-500">
                              <span>Emergencia:</span>
                              <span className="text-slate-600">{row.activa.emerg}</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-blue-100/60 pt-1 text-blue-900 font-bold">
                              <span>Total c/Emerg:</span>
                              <span className="text-xs text-blue-950 font-extrabold">{row.activa.conEmerg}</span>
                            </div>
                          </div>
                        )}

                        {/* Mantenimiento Matrícula Box */}
                        {(matriculaFilter === 'todos' || matriculaFilter === 'mantenimiento') && (
                          <div className="bg-amber-50/50 rounded-xl p-2.5 border border-amber-100 space-y-1.5">
                            <div className="flex items-center justify-between border-b border-amber-100 pb-1">
                              <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                <span className="font-bold text-amber-950 text-[10px] uppercase tracking-wider">Mantenimiento</span>
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-slate-600">
                              <span>Total Base:</span>
                              <span className="font-semibold text-slate-800">{row.mantenimiento.total || '-'}</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-500">
                              <span>Emergencia:</span>
                              <span className="text-slate-600">{row.mantenimiento.emerg || '-'}</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-amber-100/60 pt-1 text-amber-900 font-bold">
                              <span>Total c/Emerg:</span>
                              <span className="text-xs text-amber-950 font-extrabold">{row.mantenimiento.conEmerg || '-'}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Payment Methods Footer Note - Clean and Elegant */}
      {!loading && data && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 text-slate-700 space-y-2">
          <h4 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-blue-600" />
            Medios de pago autorizados
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-[11px] leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              <span><strong>Débito Automático:</strong> en CBU (Banco Macro, Santa Fe, Nación, otros) o Tarjeta de Crédito (Visa, Mastercard).</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              <span><strong>Pago Mis Cuentas / Red Link:</strong> Buscando <em>"CPCE Santa Fe - Cámara I"</em>.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              <span><strong>Botón de Pago Web:</strong> Desde la Autogestión del Consejo.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              <span><strong>Transferencia Bancaria:</strong> A la cuenta institucional del CPCE Santa Fe Cámara I.</span>
            </li>
          </ul>
        </div>
      )}

      {/* Bottom Help Bar */}
      <div className="bg-gradient-to-r from-sky-50 via-blue-50 to-amber-50/30 rounded-2xl p-5 sm:p-6 border border-sky-150 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600" />
            ¿Tenés dudas sobre tu liquidación de aportes?
          </h4>
          <p className="text-[11px] text-slate-600 max-w-2xl leading-relaxed">
            Nuestro equipo de atención al afiliado está disponible para ayudarte a verificar tus coberturas y medios de pago.
          </p>
        </div>

        <a
          href="https://wa.me/5493425105675"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-xl shadow-sm transition-all shrink-0 flex items-center gap-1.5 active:scale-95 cursor-pointer"
        >
          <span>Consultar por WhatsApp</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
