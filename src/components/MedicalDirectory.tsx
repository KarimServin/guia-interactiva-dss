"use client";

import React, { useState } from 'react';
import { MEDICAL_PROVIDERS } from '../data/dssData';
import { Search, MapPin, Phone, Shield, Stethoscope, AlertTriangle, Filter, CheckCircle2 } from 'lucide-react';

export const MedicalDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('Todas');
  const [emergencyOnly, setEmergencyOnly] = useState<boolean>(false);

  const cities = ['Todas', 'Santa Fe', 'Santo Tomé', 'Rafaela', 'Reconquista', 'Esperanza', 'San Justo'];

  const filteredProviders = MEDICAL_PROVIDERS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'Todas' || p.city === selectedCity;
    const matchesEmergency = !emergencyOnly || p.isEmergencyGuard;

    return matchesSearch && matchesCity && matchesEmergency;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-2xl relative z-10">
          <span className="inline-block bg-sky-400/20 text-sky-200 border border-sky-300/30 text-xs font-semibold px-3 py-1 rounded-full mb-3 shadow-xs">
            Cartilla Médica Directa
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Prestadores y Sanatorios Adheridos
          </h2>
          <p className="text-sky-100/90 text-xs sm:text-sm leading-relaxed font-normal">
            Consultá la red de profesionales, clínicas y guardias de urgencia en Santa Fe y localidades de la Cámara I. Recordá que te identificás directamente con tu número de Matrícula.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-lg shadow-slate-200/40 border border-white/80 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          {/* Search Box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar especialidad, sanatorio o médico (ej. 'Guardia', 'Pediatría')..."
              className="w-full pl-11 pr-4 py-2.5 bg-white/80 border border-slate-200/80 rounded-full text-xs font-medium text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all shadow-2xs"
            />
          </div>

          {/* Emergency Only Toggle */}
          <div className="sm:col-span-6 flex items-center justify-end">
            <button
              onClick={() => setEmergencyOnly(!emergencyOnly)}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-full font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
                emergencyOnly
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-white/80 text-slate-700 border border-slate-200 hover:bg-white'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              Ver Solo Guardias y Urgencias 24hs
            </button>
          </div>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-3 border-t border-slate-200/60 text-xs">
          <span className="text-slate-400 font-bold uppercase text-[10px] pr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Ciudad:
          </span>
          {cities.map(city => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-full font-semibold text-xs whitespace-nowrap transition-all ${
                selectedCity === city
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-md'
                  : 'bg-white/80 text-slate-600 hover:bg-white'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Provider Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProviders.map(p => (
          <div key={p.id} className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60">
                  {p.city}
                </span>
                {p.isEmergencyGuard && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Guardia 24hs
                  </span>
                )}
              </div>

              <h3 className="font-extrabold text-slate-900 text-lg leading-snug mb-1 group-hover:text-blue-600 transition-colors">
                {p.name}
              </h3>
              <p className="text-xs font-bold text-sky-600 mb-4 flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-sky-500" />
                {p.specialty}
              </p>

              <div className="space-y-2 text-xs text-slate-600 font-normal">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{p.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-semibold text-slate-800">{p.phone}</span>
                </p>
              </div>

              {p.notes && (
                <p className="mt-4 p-3 bg-slate-50/80 rounded-2xl text-xs text-slate-600 border border-slate-100 leading-relaxed font-normal">
                  {p.notes}
                </p>
              )}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-blue-800 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                Con N° de Matrícula
              </span>
              <a
                href={`tel:${p.phone.replace(/[^0-9]/g, '')}`}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full text-xs font-bold transition-all shadow-md"
              >
                Llamar
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredProviders.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
          <p className="text-slate-500 font-medium text-sm">
            No se encontraron prestadores con los filtros seleccionados. Proba limpiar la búsqueda.
          </p>
        </div>
      )}
    </div>
  );
};
