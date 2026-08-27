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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-blue-800/50">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-sky-200">
            <CreditCard className="w-4 h-4 text-sky-400" />
            <span>Departamento de Servicios Sociales</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Cuotas y Valores Afiliatorios
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl font-normal leading-relaxed">
            Consulta la estructura y los importes vigentes de cuotas mensuales según el plan y condición de matrícula.
          </p>
        </div>
      </div>

      {/* Filter Controls (Matrícula Activa / Mantenimiento / Todos) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
          <Table className="w-4.5 h-4.5 text-blue-600" />
          <span>Estructura Oficial de Cuotas</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <span className="text-slate-500">Filtrar Estado:</span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setMatriculaFilter('todos')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                matriculaFilter === 'todos' ? 'bg-white text-blue-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setMatriculaFilter('activa')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                matriculaFilter === 'activa' ? 'bg-emerald-600 text-white font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Matrícula Activa
            </button>
            <button
              onClick={() => setMatriculaFilter('mantenimiento')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
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
        <div className="h-64 bg-slate-100 rounded-3xl animate-pulse flex items-center justify-center">
          <div className="flex items-center gap-3 text-slate-500 font-semibold text-sm">
            <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
            <span>Cargando datos de cuotas...</span>
          </div>
        </div>
      )}

      {/* Official Table 1:1 */}
      {!loading && data && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden animate-in fade-in duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                {/* Row 1: Group Headers */}
                <tr className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white text-xs uppercase tracking-wider font-extrabold">
                  <th className="py-4 px-6 border-b border-slate-800 w-1/4">
                    Categoría / Plan
                  </th>
                  {(matriculaFilter === 'todos' || matriculaFilter === 'activa') && (
                    <th colSpan={3} className="py-4 px-6 border-b border-slate-800 text-center bg-blue-900/60 border-l border-r border-blue-800/60">
                      <div className="flex items-center justify-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                        <span>Matrícula Activa</span>
                      </div>
                    </th>
                  )}
                  {(matriculaFilter === 'todos' || matriculaFilter === 'mantenimiento') && (
                    <th colSpan={3} className="py-4 px-6 border-b border-slate-800 text-center bg-amber-950/60 border-l border-slate-800">
                      <div className="flex items-center justify-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                        <span>Mantenimiento Matrícula</span>
                      </div>
                    </th>
                  )}
                </tr>

                {/* Row 2: Column Headers */}
                <tr className="bg-slate-100/90 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-6">Detalle Afiliado</th>

                  {/* Matrícula Activa Columns */}
                  {(matriculaFilter === 'todos' || matriculaFilter === 'activa') && (
                    <>
                      <th className="py-3 px-4 text-right bg-blue-50/50">Total</th>
                      <th className="py-3 px-4 text-right bg-blue-50/50 text-slate-500">Emerg</th>
                      <th className="py-3 px-4 text-right bg-blue-100/60 text-blue-950 font-extrabold">C/Emerg</th>
                    </>
                  )}

                  {/* Mantenimiento Columns */}
                  {(matriculaFilter === 'todos' || matriculaFilter === 'mantenimiento') && (
                    <>
                      <th className="py-3 px-4 text-right bg-amber-50/50">Total</th>
                      <th className="py-3 px-4 text-right bg-amber-50/50 text-slate-500">Emerg</th>
                      <th className="py-3 px-4 text-right bg-amber-100/60 text-amber-950 font-extrabold">C/Emerg</th>
                    </>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200/80 text-sm">
                {data.sections.map((sec, secIdx) => {
                  const isBasico = sec.title.toLowerCase().includes('básico') || sec.title.toLowerCase().includes('basico');
                  const isGeneral = sec.title.toLowerCase().includes('general');

                  return (
                    <React.Fragment key={secIdx}>
                      {/* Section Header Row */}
                      <tr className={`font-extrabold text-xs uppercase tracking-wider ${
                        isBasico 
                          ? 'bg-sky-50 text-blue-900 border-t-2 border-sky-200' 
                          : isGeneral 
                          ? 'bg-indigo-50 text-indigo-950 border-t-2 border-indigo-200'
                          : 'bg-amber-50 text-amber-950 border-t-2 border-amber-200'
                      }`}>
                        <td 
                          colSpan={matriculaFilter === 'todos' ? 7 : 4} 
                          className="py-3 px-6 flex items-center gap-2"
                        >
                          <span className={`w-2.5 h-2.5 rounded-full ${
                            isBasico ? 'bg-sky-500' : isGeneral ? 'bg-indigo-600' : 'bg-amber-500'
                          }`} />
                          <span className="text-sm font-extrabold">{sec.title}</span>
                        </td>
                      </tr>

                      {/* Data Rows under Section */}
                      {sec.rows.map((row, rowIdx) => (
                        <tr key={rowIdx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-6 font-bold text-slate-900">
                            {row.categoria}
                          </td>

                          {/* Matrícula Activa */}
                          {(matriculaFilter === 'todos' || matriculaFilter === 'activa') && (
                            <>
                              <td className="py-3.5 px-4 text-right font-medium text-slate-700 bg-blue-50/20">
                                {row.activa.total}
                              </td>
                              <td className="py-3.5 px-4 text-right text-xs text-slate-500 bg-blue-50/20">
                                {row.activa.emerg}
                              </td>
                              <td className="py-3.5 px-4 text-right font-extrabold text-blue-900 bg-blue-50/50">
                                {row.activa.conEmerg}
                              </td>
                            </>
                          )}

                          {/* Mantenimiento Matrícula */}
                          {(matriculaFilter === 'todos' || matriculaFilter === 'mantenimiento') && (
                            <>
                              <td className="py-3.5 px-4 text-right font-medium text-slate-700 bg-amber-50/20">
                                {row.mantenimiento.total || '-'}
                              </td>
                              <td className="py-3.5 px-4 text-right text-xs text-slate-500 bg-amber-50/20">
                                {row.mantenimiento.emerg || '-'}
                              </td>
                              <td className="py-3.5 px-4 text-right font-extrabold text-amber-950 bg-amber-50/50">
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

      {/* Bottom Contact Help Bar */}
      <div className="bg-gradient-to-r from-sky-50 via-blue-50 to-amber-50/40 rounded-3xl p-6 sm:p-8 border border-sky-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            ¿Tenés consultas sobre la liquidación de tu cuota o medios de pago?
          </h4>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Podés adherir tu cuota mensual a débito automático en CBU o tarjeta de crédito para mantener al día tu cobertura.
          </p>
        </div>

        <a
          href="https://wa.me/5493425105675"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-2xl shadow-md transition-all shrink-0 flex items-center gap-2 active:scale-95 cursor-pointer"
        >
          <span>Consultar por WhatsApp</span>
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
