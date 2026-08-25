"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { MedicalProvider } from '../types';
import { 
  Search, 
  MapPin, 
  Phone, 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Hash, 
  ChevronDown 
} from 'lucide-react';

export const MedicalDirectory: React.FC = () => {
  const [providers, setProviders] = useState<MedicalProvider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Local input field values (updated immediately as the user types)
  const [inputName, setInputName] = useState('');
  const [inputSpecialty, setInputSpecialty] = useState('');
  const [inputLocality, setInputLocality] = useState('');

  // Active filter values (updated only when the user clicks 'Buscar')
  const [searchName, setSearchName] = useState('');
  const [searchSpecialty, setSearchSpecialty] = useState('');
  const [searchLocality, setSearchLocality] = useState('');
  const [emergencyOnly, setEmergencyOnly] = useState<boolean>(false);

  const [visibleCount, setVisibleCount] = useState<number>(60);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Fetch providers from local API on mount
  const fetchProviders = async (silent = false) => {
    if (!silent) setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/medicos');
      if (!response.ok) {
        throw new Error('No se pudo obtener el padrón de médicos');
      }
      const json = await response.json();
      setProviders(json.data || []);
    } catch (err: any) {
      console.error(err);
      setError('Hubo un error al cargar la cartilla médica. Por favor, intente de nuevo.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  // Infinite scroll trigger when reaching bottom of page (only if we slice the list)
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      
      // Trigger load more when user is 300px from the bottom
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

  // Apply filters action
  const handleSearch = () => {
    setSearchName(inputName);
    setSearchSpecialty(inputSpecialty);
    setSearchLocality(inputLocality);
    setVisibleCount(60); // Reset pagination count
  };

  // Trigger search on Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Clear all filters action
  const handleClear = () => {
    setInputName('');
    setInputSpecialty('');
    setInputLocality('');
    setSearchName('');
    setSearchSpecialty('');
    setSearchLocality('');
    setEmergencyOnly(false);
    setVisibleCount(60);
  };

  // Normalized accent-insensitive substring & regex checking
  const matchesQuery = (field: string, query: string) => {
    if (!field) return false;
    if (!query) return true;

    // 1. Try regex check (smart regex)
    try {
      const regex = new RegExp(query, 'i');
      if (regex.test(field)) return true;
    } catch (e) {
      // Ignore regex compilation error, fallback to string includes
    }

    // 2. Normal text comparison (accent/case insensitive)
    const normalize = (str: string) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    return normalize(field).includes(normalize(query));
  };

  // Filtered providers list based on active searches
  const filteredProviders = useMemo(() => {
    return providers.filter(p => {
      // 1. Emergency only filter
      if (emergencyOnly && !p.isEmergencyGuard) return false;
      
      // 2. Name search
      if (searchName.trim() !== '') {
        if (!matchesQuery(p.name, searchName)) return false;
      }

      // 3. Specialty search
      if (searchSpecialty.trim() !== '') {
        if (!matchesQuery(p.specialty, searchSpecialty)) return false;
      }

      // 4. Locality search
      if (searchLocality.trim() !== '') {
        const matchesLoc = p.city || p.locality || '';
        if (!matchesQuery(matchesLoc, searchLocality)) return false;
      }

      return true;
    });
  }, [providers, searchName, searchSpecialty, searchLocality, emergencyOnly]);

  // Paginated/deferred providers to actually render
  const renderedProviders = useMemo(() => {
    const isSearching = searchName.trim() !== '' || searchSpecialty.trim() !== '' || searchLocality.trim() !== '';
    
    // If user searched and result size is reasonably small (<= 300), display all matched results at once.
    // Otherwise, lazy-render the top records to prevent DOM rendering lag.
    if (isSearching && filteredProviders.length <= 300) {
      return filteredProviders;
    }
    return filteredProviders.slice(0, visibleCount);
  }, [filteredProviders, visibleCount, searchName, searchSpecialty, searchLocality]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchProviders(true);
  };

  // Text highlighting helper
  const highlightText = (text: string, search: string) => {
    if (!text) return '';
    if (!search.trim()) return <span>{text}</span>;

    try {
      const regex = new RegExp(`(${search})`, 'gi');
      const parts = text.split(regex);
      return (
        <span>
          {parts.map((part, i) => 
            regex.test(part) ? (
              <mark key={i} className="bg-amber-100 text-amber-950 font-semibold px-0.5 rounded-sm">{part}</mark>
            ) : (
              part
            )
          )}
        </span>
      );
    } catch (e) {
      // Regex failed, use standard split
      const escaped = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
      return (
        <span>
          {parts.map((part, i) => 
            part.toLowerCase() === search.toLowerCase() ? (
              <mark key={i} className="bg-amber-100 text-amber-950 font-semibold px-0.5 rounded-sm">{part}</mark>
            ) : (
              part
            )
          )}
        </span>
      );
    }
  };

  // Format localities to Title Case
  const formatLocality = (loc?: string) => {
    if (!loc) return '';
    return loc
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, c => c.toUpperCase());
  };

  // Check if any filter is active
  const isFilterActive = useMemo(() => {
    return searchName.trim() !== '' || searchSpecialty.trim() !== '' || searchLocality.trim() !== '' || emergencyOnly;
  }, [searchName, searchSpecialty, searchLocality, emergencyOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden border border-blue-900/50">
        <div className="absolute right-0 top-0 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-sky-400/20 text-sky-200 border border-sky-300/30 text-xs font-semibold px-3.5 py-1 rounded-full shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
              Cartilla Médica Online (Google Sheets Sync)
            </span>
            <h2 className="text-2xl sm:text-3.5xl font-extrabold tracking-tight text-white mb-2 leading-tight">
              Padrón de Profesionales y Centros Médicos
            </h2>
            <p className="text-sky-100/90 text-xs sm:text-sm leading-relaxed font-normal max-w-2xl">
              Accedé en tiempo real a la cartilla completa de profesionales del DSS. Identificate en la consulta presentando únicamente tu número de Matrícula y DNI. Se aplica carga diferida para optimizar la velocidad.
            </p>
          </div>
          
          <button
            onClick={handleRefresh}
            disabled={loading || isRefreshing}
            className="self-start md:self-center px-4.5 py-2.5 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all border border-white/10 flex items-center gap-2 active:scale-95 shadow-sm cursor-pointer shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            Sincronizar Planilla
          </button>
        </div>
      </div>

      {/* Three Filters Form & Search Button */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-md border border-slate-100 space-y-4">
        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-700 block pl-1">
              Nombre del Médico / Centro
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ej: ABBET, Fernandez..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200/85 rounded-2xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all shadow-inner"
              />
            </div>
          </div>

          {/* 2. Specialty Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-700 block pl-1">
              Especialidad
            </label>
            <div className="relative">
              <Stethoscope className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={inputSpecialty}
                onChange={(e) => setInputSpecialty(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ej: Odontologo, Pediatra, Guardia..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200/85 rounded-2xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all shadow-inner"
              />
            </div>
          </div>

          {/* 3. Locality Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-700 block pl-1">
              Localidad
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={inputLocality}
                onChange={(e) => setInputLocality(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ej: Santa Fe, Avellaneda, Rafaela..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200/85 rounded-2xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* Info Tip about Regex */}
        <p className="text-[10px] text-slate-400 font-medium pl-1 leading-relaxed">
          💡 <b>Tip:</b> Podés usar expresiones regulares (Regex) en cualquiera de los campos. Ejemplo: <code className="bg-slate-100 px-1 py-0.5 rounded-sm">santa fe|esperanza</code> en el campo Localidad para ver médicos de ambas, o <code className="bg-slate-100 px-1 py-0.5 rounded-sm">pediatr|ginec</code> en Especialidad.
        </p>

        {/* Buttons Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-xs font-extrabold transition-all shadow-md shadow-blue-100 flex items-center justify-center gap-2 active:scale-95 cursor-pointer w-full sm:w-auto"
            >
              <Search className="w-4 h-4" />
              Buscar Profesionales
            </button>
            
            <button
              onClick={handleClear}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer w-full sm:w-auto"
            >
              Limpiar Filtros
            </button>
          </div>

          <button
            onClick={() => setEmergencyOnly(!emergencyOnly)}
            className={`px-5 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2.5 transition-all cursor-pointer w-full sm:w-auto ${
              emergencyOnly
                ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-200'
                : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Ver Guardias y Urgencias 24hs</span>
          </button>
        </div>
      </div>

      {/* Results Header */}
      {!loading && !error && (
        <div className="flex items-center justify-between px-2 text-xs font-semibold text-slate-500">
          <span>
            Mostrando {renderedProviders.length} de{' '}
            <strong className="text-blue-900">{filteredProviders.length}</strong>{' '}
            profesionales encontrados (total padrón: {providers.length})
          </span>
          {isFilterActive && (
            <button
              onClick={handleClear}
              className="text-blue-600 hover:underline hover:text-blue-800"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      )}

      {/* Main Content Area */}
      {loading ? (
        /* Premium Loading Skeleton */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="bg-white/60 rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4 animate-pulse"
            >
              <div className="flex items-start justify-between">
                <div className="h-5 w-20 bg-slate-200 rounded-full" />
                <div className="h-5 w-16 bg-slate-200 rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="h-6 w-3/4 bg-slate-200 rounded-md" />
                <div className="h-4.5 w-1/2 bg-slate-200 rounded-md" />
              </div>
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="h-4 w-5/6 bg-slate-200 rounded-md" />
                <div className="h-4 w-2/3 bg-slate-200 rounded-md" />
              </div>
              <div className="pt-4 flex items-center justify-between border-t border-slate-50">
                <div className="h-5 w-24 bg-slate-200 rounded-md" />
                <div className="h-8 w-16 bg-slate-200 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        /* Error Alert Box */
        <div className="p-8 text-center bg-red-50 border border-red-200 rounded-3xl space-y-4 max-w-xl mx-auto">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
          <h3 className="text-base font-extrabold text-red-900">Error al cargar datos</h3>
          <p className="text-xs text-red-700 leading-relaxed font-medium">
            {error}
          </p>
          <button
            onClick={() => fetchProviders()}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-red-200 cursor-pointer"
          >
            Reintentar Carga
          </button>
        </div>
      ) : renderedProviders.length === 0 ? (
        /* No Results Empty View */
        <div className="text-center py-16 bg-white/50 backdrop-blur-md rounded-3xl border border-slate-200/60 p-8 max-w-xl mx-auto space-y-3">
          <Search className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-sm font-extrabold text-slate-900">No se encontraron profesionales</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            Ningún prestador coincide con los criterios especificados. Presioná 'Limpiar Filtros' para restablecer los campos.
          </p>
          <button
            onClick={handleClear}
            className="mt-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Restaurar Filtros
          </button>
        </div>
      ) : (
        /* Provider Cards List */
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {renderedProviders.map((p) => (
              <div 
                key={p.id} 
                className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-slate-100 shadow-md hover:shadow-xl hover:border-blue-400/60 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-blue-50/80 text-blue-800 border border-blue-100/60">
                      📍 {highlightText(formatLocality(p.city), searchLocality)}
                    </span>
                    {p.isEmergencyGuard && (
                      <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200/50 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-rose-500 shrink-0" />
                        Guardia / Centro
                      </span>
                    )}
                  </div>

                  {/* Provider Name */}
                  <h3 className="font-extrabold text-slate-900 text-base leading-snug mb-1.5 group-hover:text-blue-700 transition-colors">
                    {highlightText(p.name, searchName)}
                  </h3>

                  {/* Specialty */}
                  <p className="text-xs font-bold text-sky-700 mb-4 flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>{highlightText(p.specialty, searchSpecialty)}</span>
                  </p>

                  {/* Contact details */}
                  <div className="space-y-2.5 text-xs text-slate-600 font-medium pt-3 border-t border-slate-50">
                    <p className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>
                        {p.address} {p.cp ? `(CP ${p.cp})` : ''}
                      </span>
                    </p>
                    
                    {p.phone ? (
                      <p className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="font-bold text-slate-800">{p.phone}</span>
                      </p>
                    ) : null}

                    {p.matricula ? (
                      <p className="flex items-center gap-2.5">
                        <Hash className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>M.P. <b>{p.matricula}</b></span>
                      </p>
                    ) : null}
                  </div>
                </div>

                {/* Card Action footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-blue-900 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    Atención Directa
                  </span>
                  {p.phone ? (
                    <a
                      href={`tel:${p.phone.split('/')[0].replace(/[^0-9]/g, '')}`}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-extrabold transition-all shadow-md shadow-blue-100 hover:shadow-lg active:scale-95"
                    >
                      Llamar
                    </a>
                  ) : (
                    <span className="text-slate-400 text-xs italic font-medium">Sin teléfono</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Deferred Load More Button (Only visible if not displaying full list) */}
          {visibleCount < filteredProviders.length && !(searchName || searchSpecialty || searchLocality) && (
            <div className="pt-4 pb-8 text-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 120)}
                className="px-7 py-3.5 bg-white border border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 text-slate-800 font-extrabold text-xs rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Cargar más profesionales</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
