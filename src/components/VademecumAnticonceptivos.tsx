"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Pill, Search, X, Loader2, Database, Info } from 'lucide-react';
import { normalizeStr, parseSearchTerms } from '@/lib/utils';
import { PageHeader } from './PageHeader';

interface AnticonceptivoItem {
  producto: string;
  laboratorio: string;
  troquel: string;
  drogas: string;
  acciones: string;
}

export const VademecumAnticonceptivos: React.FC = () => {
  const [items, setItems] = useState<AnticonceptivoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filtering States
  const [inputQuery, setInputQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(60);

  // Fetch Anticonceptivos data
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/vademecum/anticonceptivos');
      if (!response.ok) {
        throw new Error('No se pudo obtener el vademécum de anticonceptivos');
      }
      const json = await response.json();
      setItems(json.data || []);
    } catch (err: any) {
      console.error(err);
      setError('Hubo un error al cargar los anticonceptivos. Por favor, intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Infinite scroll trigger when reaching bottom of page
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 300
      ) {
        setVisibleCount(prev => prev + 60);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputQuery(val);
    setSearchQuery(val);
    setVisibleCount(60); // Reset pagination count on new search
  };

  const handleClear = () => {
    setInputQuery('');
    setSearchQuery('');
    setVisibleCount(60);
  };

  // Filter items matching search terms in any field
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const terms = parseSearchTerms(searchQuery);

    return items.filter(item => {
      const combinedText = normalizeStr(`${item.producto} ${item.laboratorio} ${item.troquel} ${item.drogas} ${item.acciones}`);
      return terms.every(term => combinedText.includes(term));
    });
  }, [items, searchQuery]);

  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-6 animate-in fade-in duration-300">
      {/* Header & Floating Search Bar */}
      <PageHeader
        badgeIcon={Pill}
        badgeText="DSS • Provisión Especial (100% Cobertura)"
        badgeVariant="rose"
        titlePrefix="Vademécum de "
        titleHighlight="Anticonceptivos"
        description="Buscador oficial de anticonceptivos con cobertura especial. Podés ingresar el nombre comercial, monodroga, laboratorio, troquel o acción terapéutica."
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Vademécum', href: '/vademecum/basico' },
          { label: 'Anticonceptivos' },
        ]}
      >
        <div className="relative max-w-3xl mt-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={inputQuery}
            onChange={handleSearchChange}
            placeholder="Buscar por Producto, Droga, Laboratorio, Troquel..."
            className="w-full pl-12 pr-12 py-3.5 sm:py-4 bg-white border border-slate-200/90 text-slate-900 placeholder:text-slate-400 rounded-2xl text-xs sm:text-sm font-semibold shadow-xs hover:border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 focus:outline-none transition-all"
          />
          {inputQuery && (
            <button
              onClick={handleClear}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </PageHeader>

      {/* Official Coverage Guidelines Card */}
      <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50/80 border border-rose-200/80 rounded-3xl p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-rose-950 font-extrabold text-base">
          <Info className="w-5 h-5 text-rose-600 shrink-0" />
          <h3>Cobertura de Anticonceptivos</h3>
        </div>
        <p className="text-xs text-rose-900 leading-relaxed font-medium">
          La cobertura de medicamentos anticonceptivos puede gestionarse de dos maneras: <strong>Con receta médica (60% de cobertura en farmacias convenidas según el listado)</strong> o <strong>Con Ficha Electrónica de Anticoncepción (100% de cobertura mediante ficha confeccionada por su ginecólogo/a y aprobada previamente por la Obra Social)</strong>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-rose-100 shadow-xs space-y-1">
            <h4 className="text-xs font-bold text-rose-950 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
              Con Receta Médica (60%)
            </h4>
            <p className="text-[11.5px] text-slate-700 leading-relaxed">
              Cobertura del 60% adquiridos en farmacias convenidas, mediante la receta correspondiente y de acuerdo con el listado incluido.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-rose-100 shadow-xs space-y-1">
            <h4 className="text-xs font-bold text-rose-950 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              Con Ficha Electrónica (100%)
            </h4>
            <p className="text-[11.5px] text-slate-700 leading-relaxed">
              Cobertura del 100% mediante ficha electrónica confeccionada por médico/a ginecólogo/a y aprobada por la Obra Social.
            </p>
          </div>
        </div>
        <div className="bg-white/60 p-3.5 rounded-2xl border border-rose-200/60 text-xs text-slate-700 space-y-1">
          <p className="leading-relaxed text-[11.5px]">
            <strong>Sin Receta Adicional con Ficha Vigente:</strong> Una vez aprobada y vigente, no es necesario presentar receta adicional para cada dispensa.
          </p>
          <p className="text-[11px] font-bold text-rose-950 pt-1 border-t border-rose-100">
            Importante: La cobertura del 100% requiere que la ficha electrónica haya sido previamente confeccionada, aprobada y se encuentre vigente.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="w-10 h-10 text-rose-600 animate-spin" />
          <p className="text-slate-600 text-xs font-semibold">Cargando anticonceptivos...</p>
        </div>
      ) : error ? (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center text-rose-700 text-xs font-medium space-y-3">
          <p>{error}</p>
          <button onClick={fetchData} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold transition-all shadow-xs">
            Reintentar
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500 font-bold flex items-center gap-2">
              <Database className="w-4 h-4 text-slate-400" />
              Coincidencias encontradas: <span className="text-rose-700">{filteredItems.length.toLocaleString('es-AR')}</span>
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-hidden bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-3xl shadow-sm">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-extrabold uppercase tracking-wider">
                  <th className="px-6 py-4">Producto</th>
                  <th className="px-6 py-4">Laboratorio</th>
                  <th className="px-6 py-4">Troquel</th>
                  <th className="px-6 py-4">Droga</th>
                  <th className="px-6 py-4">Acción Terapéutica</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {displayedItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 text-sm">{item.producto}</td>
                    <td className="px-6 py-4 text-slate-500">{item.laboratorio}</td>
                    <td className="px-6 py-4 text-slate-600 font-mono">{item.troquel}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block bg-rose-50 text-rose-700 border border-rose-100 px-2.5 py-0.5 rounded-md font-semibold text-[11px]">
                        {item.drogas}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 italic">{item.acciones}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {displayedItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/80 border border-slate-200/80 rounded-2xl p-5 space-y-3.5 shadow-sm hover:border-rose-300 transition-all"
              >
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-extrabold text-slate-900 text-base leading-tight">
                    {item.producto}
                  </h4>
                  <span className="shrink-0 inline-block bg-rose-50 text-rose-700 border border-rose-100 px-2.5 py-0.5 rounded-md font-semibold text-[10px]">
                    Troquel: {item.troquel}
                  </span>
                </div>

                <div className="text-xs space-y-1.5 pt-3 border-t border-slate-100">
                  <p>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Drogas / Componentes</span>
                    <span className="text-slate-800 font-semibold">{item.drogas || '—'}</span>
                  </p>
                  <p>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Acción Terapéutica</span>
                    <span className="text-slate-600 font-medium italic">{item.acciones || '—'}</span>
                  </p>
                  <p>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Laboratorio</span>
                    <span className="text-slate-700 font-medium">{item.laboratorio || '—'}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Loading Indicator at Bottom */}
          {filteredItems.length > visibleCount && (
            <div className="flex justify-center py-6">
              <Loader2 className="w-6 h-6 text-rose-500 animate-spin" />
            </div>
          )}

          {/* No results banner */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16 bg-white/50 border border-dashed border-slate-200 rounded-3xl">
              <p className="text-slate-500 text-xs font-semibold">No se encontraron anticonceptivos coincidentes con la búsqueda.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
