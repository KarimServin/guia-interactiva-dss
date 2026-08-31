"use client";

import React from 'react';
import { Pill, CheckCircle, Info } from 'lucide-react';

export const PharmacyDirectory: React.FC = () => {
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
            <div className="bg-rose-50/80 p-4 rounded-2xl border border-rose-100 space-y-2">
              <strong className="text-rose-950 font-bold block text-xs">Cobertura de Anticonceptivos:</strong>
              <p className="text-rose-900 text-[11px] leading-relaxed font-medium">
                La cobertura de medicamentos anticonceptivos puede gestionarse de dos maneras: <strong>Con receta médica (60% de cobertura en farmacias convenidas según el listado)</strong> o <strong>Con Ficha Electrónica de Anticoncepción (100% de cobertura mediante ficha confeccionada por su ginecólogo/a y aprobada previamente por la Obra Social)</strong>.
              </p>
              <div className="space-y-1.5 pt-1 text-[11px] text-rose-950">
                <p>
                  <strong className="font-bold">• Con Receta Médica (60%):</strong> Cobertura del 60% adquiridos en farmacias convenidas, mediante la receta correspondiente y de acuerdo con el listado incluido.
                </p>
                <p>
                  <strong className="font-bold">• Con Ficha Electrónica (100%):</strong> Cobertura del 100% mediante ficha electrónica confeccionada por médico/a ginecólogo/a y aprobada por la Obra Social.
                </p>
                <p>
                  <strong className="font-bold">• Sin Receta Adicional con Ficha Vigente:</strong> Una vez aprobada y vigente, no es necesario presentar receta adicional para cada dispensa.
                </p>
                <p className="text-[10.5px] font-bold text-rose-900 pt-1 border-t border-rose-200/60">
                  Importante: La cobertura del 100% requiere que la ficha electrónica haya sido previamente confeccionada, aprobada y se encuentre vigente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
