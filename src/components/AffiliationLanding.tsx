"use client";

import React, { useState } from 'react';
import { 
  UserCheck, 
  FileText, 
  Download, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  Shield, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { FORMS_DATA } from '@/data/dssData';

interface AffiliationLandingProps {
  onGoToFormularios?: (formId?: string) => void;
}

export const AffiliationLanding: React.FC<AffiliationLandingProps> = ({ onGoToFormularios }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(prev => prev === idx ? null : idx);
  };

  const affiliationForms = FORMS_DATA.filter(f => f.category === 'Afiliación' || f.id === 'FORM-06');

  const faqs = [
    {
      q: '¿La afiliación al DSS es obligatoria al matricularme?',
      a: 'Al matricularse en el CPCE Santa Fe - Cámara I, el profesional debe contar obligatoriamente con la cobertura del DSS, salvo que formalice la declaración jurada de no ejercicio profesional.'
    },
    {
      q: '¿Qué sucede si tengo más de 50 años al matricularme?',
      a: 'Para profesionales de hasta 50 años la afiliación se genera automáticamente al concretar la matriculación. Si superás los 50 años, la incorporación se evalúa en la secretaría del DSS conforme a la normativa vigente.'
    },
    {
      q: '¿El profesional titular posee período de carencia?',
      a: 'No. El titular cuenta con cobertura médica inmediata desde el día de alta en la matrícula, sin períodos de carencia ni restricciones por preexistencias.'
    },
    {
      q: '¿Cómo funcionan las carencias para el grupo familiar adherido?',
      a: 'Los integrantes del grupo familiar (cónyuge e hijos) poseen períodos de carencia escalonados de entre 3 y 12 meses según el tipo de prestación.'
    },
    {
      q: '¿Hasta qué edad están cubiertos los hijos en el grupo familiar?',
      a: 'La cobertura de los hijos es automática hasta los 21 años. Puede extenderse hasta los 25 años inclusive presentando anualmente el certificado de alumno regular universitario o terciario.'
    }
  ];

  return (
    <div className="bg-white min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Soft Institutional Header */}
        <div className="bg-gradient-to-r from-sky-50/90 via-blue-50/70 to-slate-50 rounded-2xl p-6 sm:p-10 border border-sky-200/80 shadow-2xs space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-sky-200 text-sky-800 text-xs font-semibold rounded-md shadow-2xs">
            <UserCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>Departamento de Servicios Sociales • CPCE Cámara I</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Afiliación e Incorporación al DSS
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl font-normal">
            El Departamento de Servicios Sociales (DSS) es el sistema solidario de cobertura médica creado y sostenido por los profesionales matriculados en el Consejo Profesional de Ciencias Económicas de Santa Fe – Cámara I.
          </p>
        </div>

        {/* Institutional Framework Details */}
        <div className="bg-slate-50/60 rounded-2xl p-6 sm:p-8 border border-slate-200/80 space-y-6">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
            <Info className="w-5 h-5 text-blue-600" />
            Normativa y Aspectos Generales del Alta
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="space-y-3 bg-white p-5 rounded-xl border border-slate-200/90">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Afiliación Titular
              </h3>
              <ul className="space-y-2 text-slate-600 text-xs">
                <li>• <strong>Alta Automática:</strong> Se formaliza junto con el trámite de matriculación en la Cámara I para profesionales de hasta 50 años.</li>
                <li>• <strong>Cobertura Inmediata:</strong> El titular no requiere cumplimentar carencias ni presenta restricciones por enfermedades preexistentes.</li>
                <li>• <strong>Identificación:</strong> Se efectúa mediante el número de Matrícula Profesional, sin necesidad de credencial física.</li>
              </ul>
            </div>

            <div className="space-y-3 bg-white p-5 rounded-xl border border-slate-200/90">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-sky-600" />
                Adhesión del Grupo Familiar
              </h3>
              <ul className="space-y-2 text-slate-600 text-xs">
                <li>• <strong>Integrantes Elegibles:</strong> Cónyuge/Conviviente e Hijos.</li>
                <li>• <strong>Códigos de Extensión:</strong> Cónyuge (Matrícula + 01), Hijos (Matrícula + 11, 12, 13, etc.).</li>
                <li>• <strong>Carencias Progresivas:</strong> Los integrantes adheridos cuentan con carencias de entre 3 y 12 meses según la prestación.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Step-by-Step Administrative Procedure */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-slate-900">
            Procedimiento de Gestión
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-blue-700 bg-blue-100/80 px-2.5 py-0.5 rounded-md inline-block">Paso 1</span>
              <h4 className="font-bold text-slate-900 text-sm">Matriculación Institucional</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Al matricularte en la Cámara I del CPCE Santa Fe, la cobertura del titular queda habilitada en el sistema.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-blue-700 bg-blue-100/80 px-2.5 py-0.5 rounded-md inline-block">Paso 2</span>
              <h4 className="font-bold text-slate-900 text-sm">Presentación de Formularios</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Para adhesión de grupo familiar o declaración de no ejercicio, completá los formularios requeridos.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-blue-700 bg-blue-100/80 px-2.5 py-0.5 rounded-md inline-block">Paso 3</span>
              <h4 className="font-bold text-slate-900 text-sm">Acceso a la Red de Atención</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Presentá tu número de matrícula en médicos de cartilla, sanatorios y farmacias adheridas.
              </p>
            </div>
          </div>
        </div>

        {/* Related Official Forms */}
        <div className="bg-slate-50/60 rounded-2xl p-6 sm:p-8 border border-slate-200/80 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="font-heading text-lg font-bold text-slate-900">
              Formularios Oficiales
            </h2>
            {onGoToFormularios && (
              <button
                onClick={() => onGoToFormularios()}
                className="text-xs text-blue-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                Ver todos en Centro de Formularios →
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {affiliationForms.map((form) => (
              <div key={form.id} className="p-4 bg-white rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                    {form.code}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-2">{form.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{form.description}</p>
                </div>
                <button
                  onClick={() => onGoToFormularios && onGoToFormularios(form.id)}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  Descargar PDF
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-4">
          <h2 className="font-heading text-lg font-bold text-slate-900 mb-2">
            Preguntas Frecuentes
          </h2>

          <div className="space-y-2">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-slate-800 text-xs sm:text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Direct Institutional Contact */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-heading font-bold text-base text-white">
              ¿Tenés dudas sobre el trámite de afiliación?
            </h3>
            <p className="text-xs text-slate-300">
              Secretaría del DSS • San Lorenzo 1849 – Santa Fe • Lunes a viernes de 7 a 15 hs.
            </p>
          </div>
          <a
            href="https://wa.me/5493425105675"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-colors shrink-0 flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            Consulta por WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
};
