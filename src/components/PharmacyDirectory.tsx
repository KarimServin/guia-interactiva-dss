"use client";

import React, { useState } from 'react';
import { Pill, Calculator, CheckCircle, Info } from 'lucide-react';

export const PharmacyDirectory: React.FC = () => {
  const [calcPrice, setCalcPrice] = useState<number>(12500);
  const [coverageType, setCoverageType] = useState<number>(60); // 60, 70, 100

  const discountAmount = Math.round((calcPrice * coverageType) / 100);
  const affiliatePays = calcPrice - discountAmount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
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
          Accedé al 60% de descuento directo en mostrador con tu prescripción médica y carnet en todas las farmacias adheridas al Colegio de Farmacéuticos de la Provincia de Santa Fe – 1ª Circunscripción.
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
              <option value={60}>60% - Cobertura Habitual Vademécum</option>
              <option value={70}>70% - Plan Cronicidad Empadronado</option>
              <option value={100}>100% - Anticonceptivos / Materno Infantil / Oncología</option>
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

      {/* Normativas y Coberturas Clave */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Doble Cobertura y Cantidades */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 text-blue-900 font-extrabold text-base">
            <Info className="w-5 h-5 text-sky-600 shrink-0" />
            <h3>Cobertura Complementaria y Cantidades</h3>
          </div>
          <div className="text-xs text-slate-700 leading-relaxed space-y-3">
            <p>
              <strong className="text-slate-900">Doble Obra Social:</strong> Si usted posee cobertura por otra obra social, podrá comprar los medicamentos beneficiándose de ambos descuentos sin trámite adicional. Presente en la farmacia ambas credenciales y la orden con los datos de su otro sistema de salud. El DSS actuará como cobertura complementaria.
            </p>
            <div>
              <strong className="text-slate-900 block mb-1">Cantidades reconocidas por receta:</strong>
              <ul className="list-disc list-inside space-y-0.5 text-slate-600 pl-1">
                <li>Hasta 2 productos distintos por receta</li>
                <li>Hasta 2 envases chicos o 1 grande</li>
                <li>Hasta 6 antibióticos inyectables monodosis (2 o más consideran tamaño grande)</li>
                <li>Hasta 1 antibiótico inyectable multidosis (se considera tamaño grande)</li>
              </ul>
            </div>
            <p className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200/60 font-medium">
              * No se realizan reintegros por compras de medicamentos dentro de la 1.ª Circunscripción de la Provincia.
            </p>
          </div>
        </div>

        {/* Tratamientos Prolongados y Anticonceptivos */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 text-rose-900 font-extrabold text-base">
            <CheckCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <h3>Tratamientos Prolongados y Anticonceptivas</h3>
          </div>
          <div className="text-xs text-slate-700 leading-relaxed space-y-3">
            <div>
              <strong className="text-slate-900 block mb-1">Tratamientos Prolongados (Crónicos):</strong>
              <p className="text-slate-600">
                Para autorizar el consumo continuo de medicamentos en patologías crónicas, el afiliado deberá presentar en la administración del DSS una <strong className="text-slate-800">Historia Clínica del médico tratante</strong> (validez por 180 días) para análisis de la Auditoría Médica.
              </p>
            </div>
            <div className="bg-rose-50/80 p-3 rounded-2xl border border-rose-100 space-y-1">
              <strong className="text-rose-950 font-bold block">Pastillas Anticonceptivas (Cobertura 100%):</strong>
              <p className="text-rose-900 text-[11px] leading-relaxed">
                Cobertura total de anticonceptivos orales incluidos en el vademécum (Plan Básico y Ampliado), <strong className="font-bold">sin necesidad de receta médica</strong>. El único requisito es completar la ficha de tratamiento prolongado (vigencia anual). Una vez cargada en el sistema del Colegio de Farmacéuticos, la afiliada retira directamente en la farmacia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
