import React, { useState } from 'react';
import { PHARMACIES_DATA } from '../data/dssData';
import { Pill, Search, MapPin, Phone, Calculator, CheckCircle, Percent, Info } from 'lucide-react';

export const PharmacyDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [calcPrice, setCalcPrice] = useState<number>(12500);
  const [coverageType, setCoverageType] = useState<number>(40); // 40, 70, 100

  const filteredPharmacies = PHARMACIES_DATA.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const discountAmount = Math.round((calcPrice * coverageType) / 100);
  const affiliatePays = calcPrice - discountAmount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
        <span className="inline-block bg-sky-400/20 text-sky-200 border border-sky-300/30 text-xs font-semibold px-3 py-1 rounded-full mb-3 shadow-xs">
          Cobertura en Farmacia
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
          Red de Farmacias y Vademécum DSS
        </h2>
        <p className="text-sky-100/90 text-xs sm:text-sm max-w-2xl leading-relaxed font-normal">
          Accedé al 40% de descuento directo en mostrador con tu receta y N° de Matrícula en todas las farmacias adheridas al Colegio de Farmacéuticos de Santa Fe.
        </p>
      </div>

      {/* Interactive Discount Calculator Widget */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-6 sm:p-8 shadow-lg shadow-slate-200/40">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
            <Calculator className="w-5 h-5 text-sky-200" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">Simulador de Cobertura en Medicamentos</h3>
            <p className="text-xs text-slate-600 font-medium">Calculá cuánto abonas en la farmacia según tu plan de cobertura</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Precio del Medicamento ($)
            </label>
            <input
              type="number"
              value={calcPrice}
              onChange={(e) => setCalcPrice(Number(e.target.value) || 0)}
              className="w-full px-4 py-2.5 bg-white/80 border border-slate-200/80 rounded-2xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all shadow-2xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tipo de Cobertura Aprobada
            </label>
            <select
              value={coverageType}
              onChange={(e) => setCoverageType(Number(e.target.value))}
              className="w-full px-4 py-2.5 bg-white/80 border border-slate-200/80 rounded-2xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all shadow-2xs"
            >
              <option value={40}>40% - Cobertura Habitual Vademécum</option>
              <option value={70}>70% - Plan Cronicidad Empadronado</option>
              <option value={100}>100% - Plan Materno Infantil / Oncología</option>
            </select>
          </div>

          <div className="bg-white/90 p-4 sm:p-5 rounded-2xl border border-sky-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">Cobertura DSS ({coverageType}%):</p>
              <p className="text-base font-bold text-sky-600">${discountAmount.toLocaleString('es-AR')}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-slate-500">Abonás en Mostrador:</p>
              <p className="text-xl font-extrabold text-blue-900">${affiliatePays.toLocaleString('es-AR')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Pharmacy Network */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
            <Pill className="w-5 h-5 text-sky-600" />
            Farmacias Adheridas de la Red
          </h3>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por localidad o farmacia..."
              className="w-full pl-11 pr-4 py-2 bg-white/80 border border-slate-200/80 rounded-full text-xs font-medium focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all shadow-2xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPharmacies.map(ph => (
            <div key={ph.id} className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:border-blue-300 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-50 text-blue-700 border border-sky-100">
                  {ph.city}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60 flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5 text-sky-600" />
                  {ph.discount}
                </span>
              </div>

              <h4 className="font-extrabold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                {ph.name}
              </h4>

              <div className="space-y-2 text-xs text-slate-600 font-normal">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{ph.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold text-slate-800">{ph.phone}</span>
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-blue-800 font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-sky-600" />
                  Acepta Receta Digital
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
