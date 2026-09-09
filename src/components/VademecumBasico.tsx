"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Pill, Search, X, Loader2, Database } from 'lucide-react';
import { normalizeStr, parseSearchTerms } from '@/lib/utils';
import { PageHeader } from './PageHeader';

interface VademecumItem {
  nombre: string;
  presentacion: string;
  laboratorio: string;
  droga: string;
}

export const VademecumBasico: React.FC = () => {
  const [items, setItems] = useState<VademecumItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filtering States
  const [inputQuery, setInputQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(60);

  // Fetch Vademecum Básico data
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/vademecum/basico');
      if (!response.ok) {
        throw new Error('No se pudo obtener el vademécum básico');
      }
      const json = await response.json();
      setItems(json.data || []);
    } catch (err: any) {
      console.error(err);
      setError('Hubo un error al cargar el vademécum. Por favor, intente de nuevo.');
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
    // Debounce/immediate search mapping
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
      const combinedText = normalizeStr(`${item.nombre} ${item.presentacion} ${item.laboratorio} ${item.droga}`);
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
        badgeText="DSS • Cobertura Farmacéutica"
        badgeVariant="blue"
        titlePrefix="Vademécum "
        titleHighlight="Básico"
        description="Buscador oficial de cobertura de medicamentos ambulatorios. Ingresá el nombre comercial, monodroga, laboratorio o presentación."
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Vademécum', href: '/vademecum/basico' },
          { label: 'Básico' },
        ]}
      >
        <div className="relative max-w-3xl mt-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={inputQuery}
            onChange={handleSearchChange}
            placeholder="Buscar por Nombre Comercial, Droga, Laboratorio o Presentación..."
            className="w-full pl-12 pr-12 py-3.5 sm:py-4 bg-white border border-slate-200/90 text-slate-900 placeholder:text-slate-400 rounded-2xl text-xs sm:text-sm font-semibold shadow-xs hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
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

      {/* Main Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-slate-600 text-xs font-semibold">Cargando vademécum...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-700 text-xs font-medium space-y-3">
          <p>{error}</p>
          <button onClick={fetchData} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all shadow-xs">
            Reintentar
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500 font-bold flex items-center gap-2">
              <Database className="w-4 h-4 text-slate-400" />
              Coincidencias encontradas: <span className="text-blue-700">{filteredItems.length.toLocaleString('es-AR')}</span>
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-hidden bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-3xl shadow-sm">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-extrabold uppercase tracking-wider">
                  <th className="px-6 py-4">Nombre Comercial</th>
                  <th className="px-6 py-4">Presentación</th>
                  <th className="px-6 py-4">Laboratorio</th>
                  <th className="px-6 py-4">Droga</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {displayedItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 text-sm">{item.nombre}</td>
                    <td className="px-6 py-4 text-slate-600">{item.presentacion}</td>
                    <td className="px-6 py-4 text-slate-500">{item.laboratorio}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 rounded-md font-semibold text-[11px]">
                        {item.droga}
                      </span>
                    </td>
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
                className="bg-white/80 border border-slate-200/80 rounded-2xl p-5 space-y-3.5 shadow-sm hover:border-blue-300 transition-all"
              >
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-extrabold text-slate-900 text-base leading-tight">
                    {item.nombre}
                  </h4>
                  <span className="shrink-0 inline-block bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 rounded-md font-semibold text-[10px]">
                    {item.droga}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-1 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Presentación</span>
                    <span className="text-slate-700 font-medium">{item.presentacion || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Laboratorio</span>
                    <span className="text-slate-700 font-medium">{item.laboratorio || '—'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Loading Indicator at Bottom */}
          {filteredItems.length > visibleCount && (
            <div className="flex justify-center py-6">
              <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
            </div>
          )}

          {/* No results banner */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16 bg-white/50 border border-dashed border-slate-200 rounded-3xl">
              <p className="text-slate-500 text-xs font-semibold">No se encontraron medicamentos coincidentes con la búsqueda.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
