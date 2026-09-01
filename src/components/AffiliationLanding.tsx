"use client";

import React, { useState } from 'react';
import Image from 'next/image';
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
  Sparkles,
  HeartHandshake,
  Heart,
  Users,
  Building2,
  ArrowRight,
  ShieldCheck,
  Star
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
    <div className="bg-slate-50/50 min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HERO MOTIVACIONAL CON IMAGEN DESTACADA */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white shadow-2xl border border-blue-900/40">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12 relative z-10">
            {/* Left Text Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span>Sistema Solidario de Salud CPCE Santa Fe</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                Tu salud y la de tu familia, <span className="bg-gradient-to-r from-blue-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent">respaldadas desde el primer día</span>.
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                El Departamento de Servicios Sociales (DSS) fue creado por y para profesionales de Ciencias Económicas. Una red médica de excelencia diseñada para acompañarte en cada etapa de tu vida con tranquilidad, agilidad y calidez humana.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sin carencias para el titular</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>100% Cobertura Solidaria</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 col-span-2 sm:col-span-1">
                  <Users className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Grupo familiar protegido</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 group">
                <img 
                  src="/images/affiliation-hero.png" 
                  alt="Familia profesional protegida por el DSS" 
                  className="w-full h-[280px] sm:h-[340px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Floating Glassmorphic Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-700 flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 fill-emerald-600 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Protección Médica Integral</h4>
                    <p className="text-[11px] text-slate-600 font-medium">Tranquilidad y respaldo para profesionales matriculados</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TARJETAS MOTIVACIONALES CON IMÁGENES & BENEFICIOS */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
              ¿Por qué afiliarte al DSS?
            </h2>
            <p className="text-slate-600 text-sm">
              Conocé las ventajas de formar parte de nuestra comunidad de salud profesional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Atención Médica de Excelencia */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img 
                  src="/images/affiliation-care.png" 
                  alt="Atención médica personalizada" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-md">
                  Red de Cartilla Amplia
                </span>
              </div>
              <div className="p-6 sm:p-7 flex-1 space-y-4">
                <h3 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600 shrink-0" />
                  Excelencia en Atención y Sanatorios
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Accedé a los principales prestadores de salud, clínicas y centros de diagnóstico en toda la provincia de Santa Fe. Atención directa sin autorizaciones previas innecesarias para consultas habituales.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Cartilla médica con especialistas de primer nivel.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Descuentos exclusivos en farmacias de la región.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 2: Estilo de Vida y Bienestar */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img 
                  src="/images/affiliation-wellbeing.png" 
                  alt="Bienestar y estilo de vida pleno" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full shadow-md">
                  Calidad de Vida
                </span>
              </div>
              <div className="p-6 sm:p-7 flex-1 space-y-4">
                <h3 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-emerald-600 shrink-0" />
                  Respaldo Humano y Personalizado
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Un sistema pensado para cuidarte en cada etapa: desde el inicio de tu carrera profesional hasta los momentos de expansión familiar y madurez.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Plan Materno Infantil con 100% de cobertura.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Trámites simplificados y atención directa por WhatsApp.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* NORMATIVA Y ASPECTOS GENERALES DEL ALTA */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2.5 border-b border-slate-100 pb-4">
            <Info className="w-5 h-5 text-blue-600" />
            Normativa y Aspectos Generales del Alta
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50/70 to-slate-50 p-6 rounded-2xl border border-blue-100/90 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                Afiliación Titular
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-700 shrink-0">•</span>
                  <span><strong>Alta Automática:</strong> Se formaliza junto con el trámite de matriculación en la Cámara I para profesionales de hasta 50 años.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-700 shrink-0">•</span>
                  <span><strong>Cobertura Inmediata:</strong> El titular no requiere cumplimentar carencias ni presenta restricciones por preexistencias.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-700 shrink-0">•</span>
                  <span><strong>Identificación Directa:</strong> Presentación ágil con el número de Matrícula Profesional en prestadores.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-sky-50/70 to-slate-50 p-6 rounded-2xl border border-sky-100/90 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <Shield className="w-5 h-5 text-sky-600 shrink-0" />
                Adhesión del Grupo Familiar
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-sky-700 shrink-0">•</span>
                  <span><strong>Integrantes Elegibles:</strong> Cónyuge / Conviviente e Hijos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-sky-700 shrink-0">•</span>
                  <span><strong>Códigos de Extensión:</strong> Cónyuge (Matrícula + 01), Hijos (Matrícula + 11, 12, 13, etc.).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-sky-700 shrink-0">•</span>
                  <span><strong>Carencias Progresivas:</strong> Períodos escalonados de entre 3 y 12 meses según el tipo de prestación.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* PASO A PASO DEL TRÁMITE */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="font-heading text-xl font-bold text-slate-900">
              Procedimiento de Gestión en 3 Pasos
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Incorpórate fácil y rápido a tu cobertura médica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-3 group hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                01
              </div>
              <h4 className="font-bold text-slate-900 text-base">Matriculación</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Al matricularte en la Cámara I del CPCE Santa Fe, la cobertura médica del titular queda automáticamente habilitada en el sistema.
              </p>
            </div>

            <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-3 group hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                02
              </div>
              <h4 className="font-bold text-slate-900 text-base">Completar Formularios</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Para adherir a tu grupo familiar o presentar la declaración jurada de no ejercicio, descarga e imprime los formularios requeridos.
              </p>
            </div>

            <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-3 group hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                03
              </div>
              <h4 className="font-bold text-slate-900 text-base">Atención Inmediata</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Presentá tu número de matrícula profesional en la red de sanatorios, consultorios médicos de cartilla y farmacias adheridas.
              </p>
            </div>
          </div>
        </div>

        {/* FORMULARIOS DIRECTOS */}
        {affiliationForms.length > 0 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Formularios de Afiliación Requeridos
                </h2>
                <p className="text-xs text-slate-600">
                  Descargá directamente los documentos oficiales para presentar en el DSS.
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
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">
            Preguntas Frecuentes
          </h2>

          <div className="space-y-2.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-slate-200/90 rounded-xl overflow-hidden transition-colors">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-slate-800 text-xs sm:text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CONTACTO DIRECTO WHATSAPP E INSTITUCIONAL */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="font-heading font-bold text-lg text-white flex items-center justify-center sm:justify-start gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              ¿Querés realizar una consulta sobre tu trámite?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Secretaría del DSS • San Lorenzo 1849 – Santa Fe • Lunes a viernes de 7 a 15 hs.
            </p>
          </div>
          <a
            href="https://wa.me/5493425105675"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20 shrink-0 flex items-center gap-2.5 cursor-pointer active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            Consulta por WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
};
