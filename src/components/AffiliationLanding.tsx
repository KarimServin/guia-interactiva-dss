"use client";

import React, { useState } from 'react';
import { 
  UserCheck, 
  FileText, 
  Download, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  Shield, 
  Info,
  CheckCircle2,
  Building2,
  ArrowRight,
  ShieldCheck,
  HeartHandshake
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
      a: 'Al matricularse en el CPCE Santa Fe - Cámara I, el profesional cuenta automáticamente con la cobertura del DSS, garantizando su respaldo médico desde el primer día, salvo que formalice la declaración jurada de no ejercicio profesional.'
    },
    {
      q: '¿Qué sucede si tengo más de 50 años al matricularme?',
      a: 'Para profesionales de hasta 50 años la afiliación se genera automáticamente al concretar la matriculación. Si superás los 50 años, la incorporación se evalúa en la secretaría del DSS conforme a la normativa vigente.'
    },
    {
      q: '¿El profesional titular posee período de carencia?',
      a: 'No. El titular cuenta con cobertura médica inmediata desde el día de alta en la matrícula, sin períodos de carencia ni restricciones por enfermedades preexistentes.'
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
      <div className="max-w-6xl mx-auto space-y-10">

        {/* HERO INSTITUCIONAL LIMPIO Y NATURAL */}
        <div className="bg-gradient-to-r from-sky-50/90 via-blue-50/50 to-slate-50 rounded-3xl p-6 sm:p-10 border border-sky-100 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Contenido Principal */}
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 text-xs font-bold tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                CPCE Santa Fe • Cámara I
              </span>

              <h1 className="font-heading text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                Tu salud y la de tu familia, respaldadas desde el primer día
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                El Departamento de Servicios Sociales (DSS) es el sistema solidario de cobertura médica creado y sostenido por los profesionales matriculados en el Consejo Profesional de Ciencias Económicas.
              </p>

              {/* Beneficios directos */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Alta automática con tu matrícula profesional (hasta 50 años)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sin períodos de carencia ni preexistencias para el titular</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cobertura extensible a cónyuge e hijos</span>
                </div>
              </div>
            </div>

            {/* Fotografía limpia y natural sin sobrecargas de IA */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200/90 shadow-md bg-white">
                <img 
                  src="/images/affiliation-hero.png" 
                  alt="Familia profesional de ciencias económicas" 
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
            </div>

          </div>
        </div>

        {/* PILARES DE COBERTURA Y ATENCIÓN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Red de atención */}
          <div className="bg-slate-50/70 rounded-2xl border border-slate-200/80 overflow-hidden flex flex-col sm:flex-row items-stretch">
            <div className="sm:w-2/5 relative h-48 sm:h-auto shrink-0">
              <img 
                src="/images/affiliation-care.png" 
                alt="Consulta médica profesional" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 sm:w-3/5 space-y-3 flex flex-col justify-center">
              <h3 className="font-heading font-bold text-slate-900 text-base flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                Red Médica y Sanatorios
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Acceso directo a prestadores de primer nivel, clínicas y sanatorios de la región sin trámites engorrosos.
              </p>
              <span className="text-[11px] font-bold text-blue-700 block">
                • Cartilla médica abierta y actualizada
              </span>
            </div>
          </div>

          {/* Card 2: Respaldo familiar */}
          <div className="bg-slate-50/70 rounded-2xl border border-slate-200/80 overflow-hidden flex flex-col sm:flex-row items-stretch">
            <div className="sm:w-2/5 relative h-48 sm:h-auto shrink-0">
              <img 
                src="/images/affiliation-wellbeing.png" 
                alt="Bienestar y respaldo profesional" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 sm:w-3/5 space-y-3 flex flex-col justify-center">
              <h3 className="font-heading font-bold text-slate-900 text-base flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-emerald-600 shrink-0" />
                Tranquilidad y Bienestar
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cobertura pensada para protegerte en cada etapa de tu ejercicio profesional y la de tus seres queridos.
              </p>
              <span className="text-[11px] font-bold text-emerald-700 block">
                • Plan Materno Infantil y coseguros respaldados
              </span>
            </div>
          </div>
        </div>

        {/* NORMATIVA Y ASPECTOS GENERALES DEL ALTA */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
            <Info className="w-5 h-5 text-blue-600" />
            Normativa y Aspectos Generales del Alta
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="space-y-3 bg-slate-50/60 p-5 rounded-xl border border-slate-200/90">
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

            <div className="space-y-3 bg-slate-50/60 p-5 rounded-xl border border-slate-200/90">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-sky-600" />
                Adhesión del Grupo Familiar
              </h3>
              <ul className="space-y-2 text-slate-600 text-xs">
                <li>• <strong>Integrantes Elegibles:</strong> Cónyuge/Conviviente e Hijos.</li>
                <li>• <strong>Códigos de Extensión:</strong> Cónyuge (Matrícula + 01), Hijos (Matrícula + 11, 12, 13, etc.).</li>
                <li>• <strong>Carencias Progresivas:</strong> Los integrantes adheridos cuentan con carencias de entre 3 y 12 meses según el tipo de prestación.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* PROCEDIMIENTO DE GESTIÓN (PASO A PASO) */}
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

        {/* FORMULARIOS DIRECTOS */}
        {affiliationForms.length > 0 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
              <div>
                <h2 className="font-heading text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Formularios de Afiliación
                </h2>
                <p className="text-xs text-slate-600">
                  Descargá los formularios requeridos para tramitar tu alta o la de tu grupo familiar.
                </p>
              </div>
              {onGoToFormularios && (
                <button
                  onClick={() => onGoToFormularios()}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer shrink-0"
                >
                  Ver todos los formularios
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {affiliationForms.map((form) => (
                <div 
                  key={form.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-200 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-md inline-block">
                      {form.code}
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs leading-snug">
                      {form.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 line-clamp-2">
                      {form.description}
                    </p>
                  </div>

                  <a
                    href={form.fileUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!form.fileUrl && onGoToFormularios) {
                        e.preventDefault();
                        onGoToFormularios(form.id);
                      }
                    }}
                    className="w-full py-2 px-3 bg-white hover:bg-blue-600 hover:text-white border border-slate-200 hover:border-blue-600 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Descargar PDF
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

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

        {/* CONTACTO DIRECTO INSTITUCIONAL */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-slate-800">
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
