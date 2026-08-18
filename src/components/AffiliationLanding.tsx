"use client";

import React, { useState } from 'react';
import { 
  UserCheck, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  HelpCircle, 
  ArrowRight, 
  Download, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  Clock, 
  BadgeCheck,
  AlertCircle
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
      a: 'Al matricularse en el CPCE Santa Fe - Cámara I, el profesional debe contar obligatoriamente con la obra social DSS, salvo que realice la declaración jurada formal de no ejercicio profesional.'
    },
    {
      q: '¿Qué sucede si tengo más de 50 años al matricularme?',
      a: 'Para profesionales de hasta 50 años la afiliación es automática al concretar la matriculación. Si tenés más de 50 años, se evalúa tu incorporación en la secretaría del DSS conforme a las reglamentaciones institucionales vigentes.'
    },
    {
      q: '¿El titular posee períodos de carencia?',
      a: 'No. El profesional titular cuenta con cobertura médica inmediata desde el primer día de alta, sin períodos de carencia ni restricciones por enfermedades preexistentes.'
    },
    {
      q: '¿Cómo funciona el período de carencia para el grupo familiar?',
      a: 'Los integrantes del grupo familiar adheridos (cónyuge e hijos) pueden presentar períodos de carencia progresivos que van entre 3 y 12 meses según la complejidad de la prestación requerida.'
    },
    {
      q: '¿Hasta qué edad están cubiertos los hijos en el grupo familiar?',
      a: 'Los hijos están cubiertos automáticamente hasta los 21 años de edad. Es posible extender la cobertura hasta los 25 años inclusive presentando anualmente el certificado de alumno regular de nivel universitario o terciario.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Hero Banner Header */}
        <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden border border-blue-800/40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md">
              <UserCheck className="w-4 h-4 text-blue-400" />
              <span>Guía de Afiliación Oficial</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              ¿Cómo afiliarme al DSS?
            </h1>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
              Información clara y transparente sobre el sistema solidario de cobertura médica para profesionales matriculados del CPCE Santa Fe • Cámara I y su grupo familiar.
            </p>
          </div>
        </div>

        {/* Key Features / Highlights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-300 transition-all space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <BadgeCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Afiliación Automática</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Alta inmediata al matricularte en el CPCE Cámara I para profesionales de hasta 50 años.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Titular Sin Carencias</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              El profesional titular accede a cobertura médica integral sin esperas ni restricciones preexistentes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-sky-300 transition-all space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Extensión Familiar</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Posibilidad de adherir a tu cónyuge e hijos con códigos de extensión vinculados a tu matrícula.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-300 transition-all space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Sin Credencial Física</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Presentando únicamente tu número de matrícula titular te identificás en sanatorios y farmacias.
            </p>
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
          <div>
            <h2 className="font-heading text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
              Pasos para la Afiliación y Alta de Cobertura
            </h2>
            <p className="text-sm text-slate-600">
              Conocé el procedimiento administrativo según tu situación profesional y familiar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="bg-slate-50/90 p-6 rounded-2xl border border-slate-200 relative space-y-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Matriculación Profesional</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Al matricularte en la Cámara I del CPCE Santa Fe, el alta como titular del DSS se activa automáticamente para menores de 50 años.
              </p>
            </div>

            <div className="bg-slate-50/90 p-6 rounded-2xl border border-slate-200 relative space-y-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Uso Inmediato del Servicio</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Podés hacer uso inmediato de la cartilla médica y farmacias adhiriendo con tu número de matrícula sin necesidad de carnets plásticos.
              </p>
            </div>

            <div className="bg-slate-50/90 p-6 rounded-2xl border border-slate-200 relative space-y-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Incorporación del Grupo Familiar</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Completá el formulario correspondiente, adjuntá la documentación requerida (DNI, actas) y enviá la solicitud al DSS.
              </p>
            </div>
          </div>
        </div>

        {/* Action / Download Section for Forms */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="font-heading text-xl font-bold text-slate-900">
                Formularios Relacionados de Afiliación
              </h2>
              <p className="text-xs text-slate-600">
                Descargá los formularios oficiales listos para presentar.
              </p>
            </div>
            {onGoToFormularios && (
              <button
                onClick={() => onGoToFormularios()}
                className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 shrink-0"
              >
                <FileText className="w-4 h-4" />
                Ver Centro de Formularios
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {affiliationForms.map((form) => (
              <div 
                key={form.id} 
                className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4 hover:border-blue-300 transition-colors"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-700 uppercase bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                    {form.code}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">{form.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{form.description}</p>
                </div>
                <button
                  onClick={() => onGoToFormularios && onGoToFormularios(form.id)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  Descargar Formulario
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Accordion Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
          <div>
            <h2 className="font-heading text-xl font-bold text-slate-900 mb-1">
              Preguntas Frecuentes sobre Afiliación
            </h2>
            <p className="text-xs text-slate-600">
              Respuestas rápidas a las consultas normativas más habituales.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="border border-slate-200/90 rounded-2xl overflow-hidden bg-slate-50/50 transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:bg-slate-100/70 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Direct WhatsApp Contact CTA */}
        <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100 rounded-3xl p-8 border border-orange-200/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider bg-orange-100 px-2.5 py-0.5 rounded-md border border-orange-200">
              ¿Tenés dudas adicionales?
            </span>
            <h3 className="font-heading text-lg font-bold text-slate-900">
              Nuestro equipo de atención al afiliado responde tus consultas en forma directa
            </h3>
            <p className="text-xs text-slate-600">
              Sede Central: San Lorenzo 1849 – Santa Fe | Horario: Lunes a viernes de 7 a 15 hs.
            </p>
          </div>
          <a
            href="https://wa.me/5493425105675"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            Contactar por WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
};
