"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Stethoscope, 
  BedDouble, 
  Pill, 
  Smile, 
  HeartHandshake, 
  ChevronRight, 
  FileText, 
  ExternalLink, 
  Info, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  Building2, 
  Activity, 
  Award, 
  Apple, 
  Bone, 
  Sparkles,
  Search,
  ArrowRight
} from 'lucide-react';

interface CoberturasPlanesViewProps {
  initialSubTab?: string;
  onOpenCosegurosModal?: () => void;
  onGoToFormularios?: (formId?: string) => void;
}

export const CoberturasPlanesView: React.FC<CoberturasPlanesViewProps> = ({
  initialSubTab = 'planes',
  onOpenCosegurosModal,
  onGoToFormularios
}) => {
  const router = useRouter();

  // Map initial sub-tab route aliases
  const getInitialTab = (tabKey: string) => {
    if (tabKey === 'subsidio-sepelios') return 'subsidios';
    if (tabKey === 'cobertura-odontologia') return 'odontologia';
    if (tabKey === 'chequeo-preventivo') return 'medica';
    if (tabKey === 'vademecum-farmacias') return 'farmacia';
    return tabKey || 'planes';
  };

  const [activeSubTab, setActiveSubTab] = useState<string>(getInitialTab(initialSubTab));
  const [searchTerm, setSearchTerm] = useState<string>('');

  const TABS = [
    { id: 'planes', label: 'Planes y Cobertura Territorial', icon: ShieldCheck, color: 'blue' },
    { id: 'medica', label: 'Asistencia Médica Ambulatoria', icon: Stethoscope, color: 'indigo' },
    { id: 'internaciones', label: 'Internaciones y Quirúrgicos', icon: BedDouble, color: 'rose' },
    { id: 'farmacia', label: 'Farmacia, Anticonceptivos y Nutrición', icon: Pill, color: 'emerald' },
    { id: 'odontologia', label: 'Asistencia Odontológica', icon: Smile, color: 'cyan' },
    { id: 'subsidios', label: 'Subsidios, Prótesis y Beneficios', icon: HeartHandshake, color: 'purple' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* HERO BANNER */}
      <div className="relative bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl overflow-hidden border border-blue-800/40">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-12 bottom-0 opacity-10 pointer-events-none hidden md:block">
          <ShieldCheck className="w-80 h-80 text-white" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Departamento de Servicios Sociales</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Coberturas y Planes de Salud
          </h1>

          <p className="text-slate-200 text-xs sm:text-base leading-relaxed">
            Pensamos y actuamos en función de las prioridades de nuestros Profesionales, ofreciendo las opciones del <strong className="text-white font-bold">Plan Básico</strong> y el <strong className="text-white font-bold">Plan General</strong>. Un modelo de atención integral orientado a la prevención, la solidaridad y la excelencia asistencial.
          </p>

          {/* Quick Stats Badges */}
          <div className="pt-2 flex flex-wrap gap-3 text-xs">
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>1.ª Circunscripción Santa Fe</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span>Reciprocidad Rosario y Córdoba</span>
            </div>
            <button
              onClick={() => onOpenCosegurosModal && onOpenCosegurosModal()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-md hover:shadow-blue-500/30 flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Tabla Comparativa de Coseguros</span>
            </button>
          </div>
        </div>
      </div>

      {/* NAVIGATION CAPSULES */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200/80">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 scale-[1.02]'
                  : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-600'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION CONTENT */}
      <div className="space-y-6">

        {/* 1. PLANES Y ÁMBITO GEOGRÁFICO */}
        {activeSubTab === 'planes' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Intro Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50/60 p-6 rounded-3xl border border-blue-100 space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center gap-0 justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Plan Básico vs. Plan General</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Procuramos un modelo de atención en su concepto más amplio, apuntando a la promoción de la salud, educando en la prevención y auspiciando conductas saludables para disminuir los factores de riesgo.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onOpenCosegurosModal && onOpenCosegurosModal()}
                    className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-white hover:bg-blue-100 px-4 py-2.5 rounded-xl border border-blue-200 transition-colors shadow-2xs"
                  >
                    <FileText className="w-4 h-4 text-blue-600" />
                    Ver Valores y Coseguros por Plan
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50/60 p-6 rounded-3xl border border-emerald-100 space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Ámbito de Cobertura Territorial</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  El área de cobertura comprende la <strong className="text-slate-900">1.ª Circunscripción de la Provincia de Santa Fe</strong>, manteniendo una actualización constante de los convenios de la red de prestadores.
                </p>
                <ul className="text-xs text-slate-700 space-y-1.5 pt-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Rosario y Córdoba:</strong> Convenios de reciprocidad con cada Consejo Profesional. Si los aranceles facturados difieren de los reconocidos, la diferencia se liquida como Coseguro "Diferencia" en la cuenta corriente.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-900">Hospital Italiano de Buenos Aires:</strong> Derivación de alta complejidad autorizada cuando la patología no pueda resolverse a nivel local.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Reciprocidad Notice */}
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-5 flex items-start gap-3 text-amber-950">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs sm:text-sm">
                <h4 className="font-bold">Aclaración sobre Convenios de Reciprocidad fuera de la 1ª Circunscripción</h4>
                <p className="text-slate-700 leading-relaxed text-xs">
                  En prestaciones realizadas en Rosario, Córdoba u Hospital Italiano de Buenos Aires, en caso de surgir diferencias entre los honorarios facturados por el prestador y los homologados por el DSS, dicho importe diferido se imputará a la cuenta corriente del afiliado bajo el concepto coseguro <strong className="text-slate-900">"Diferencia"</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2. ASISTENCIA MÉDICA AMBULATORIA */}
        {activeSubTab === 'medica' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Grid of Medical Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Consultas Médicas */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2 hover:border-blue-300 transition-all">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <Stethoscope className="w-4.5 h-4.5 text-blue-600" />
                  <h4>Consultas Médicas (Art. 15)</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cobertura en todas las especialidades del Nomenclador Nacional. Acceso directo presentando la <strong className="text-slate-800">Credencial de Afiliación y DNI</strong> ante profesionales convenidos sin pago adicional.
                </p>
                <div className="bg-blue-50 p-2.5 rounded-xl text-[11px] text-blue-900 font-medium border border-blue-100">
                  ⚠️ Si requerís más de 2 consultas con un mismo profesional en un período de 15 días, se debe adjuntar Historia Clínica.
                </div>
              </div>

              {/* Diagnóstico y Tratamiento */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2 hover:border-blue-300 transition-all">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <Activity className="w-4.5 h-4.5 text-blue-600" />
                  <h4>Diagnóstico y Tratamiento (Art. 16 y 17)</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Exámenes complementarios, ecografías, laboratorio y prácticas especializadas con prescripción médica. Se requiere autorización previa de Auditoría Médica para prácticas complejas o No Nomencladas.
                </p>
              </div>

              {/* Urgencias y Enfermería Domiciliaria */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2 hover:border-blue-300 transition-all">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <Building2 className="w-4.5 h-4.5 text-blue-600" />
                  <h4>Atención Domiciliaria (Art. 18)</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Servicio médico y enfermería a domicilio para emergencias en afiliados adheridos al servicio de emergencias contratado. Incluye servicio de entrega domiciliaria de medicamentos en farmacias convenidas adheridas.
                </p>
              </div>

              {/* Plan Materno Infantil */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2 hover:border-rose-300 transition-all">
                <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                  <Award className="w-4.5 h-4.5 text-rose-600" />
                  <h4>Plan Materno Infantil (Art. 20)</h4>
                </div>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• <strong className="text-slate-800">Embarazada:</strong> Cobertura al 100% sin coseguro desde gestación hasta 30 días post-parto (consultas, laboratorio, ecografías e internación).</li>
                  <li>• <strong className="text-slate-800">Recién Nacido:</strong> Cobertura al 100% hasta los 12 meses. Incluye leches maternizadas por 3 meses (leches medicamentosas con HC al % de medicamentos).</li>
                </ul>
              </div>

              {/* Fisiokinesioterapia & Fonoaudiología */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2 hover:border-indigo-300 transition-all">
                <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                  <Activity className="w-4.5 h-4.5 text-indigo-600" />
                  <h4>Fisioterapia y Fonoaudiología (Art. 21-22)</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  • <strong className="text-slate-800">Fisiokinesioterapia:</strong> Hasta 30 sesiones por año aniversario con orden autorizada y diagnóstico.<br/>
                  • <strong className="text-slate-800">Fonoaudiología:</strong> Hasta 30 sesiones por año calendario previa derivación e historia clínica.
                </p>
              </div>

              {/* Salud Mental */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2 hover:border-purple-300 transition-all">
                <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                  <ShieldCheck className="w-4.5 h-4.5 text-purple-600" />
                  <h4>Salud Mental (Art. 23)</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  • <strong className="text-slate-800">Psiquiatría:</strong> Hasta 20 sesiones/año (extensibles a 30 por Auditoría).<br/>
                  • <strong className="text-slate-800">Psicoterapia de apoyo:</strong> Hasta 20 sesiones/año con indicación del psiquiatra.<br/>
                  • <strong className="text-slate-800">Psicopedagogía:</strong> Hasta 20 sesiones/año (extensibles a 40 con HC).
                </p>
              </div>

            </div>

            {/* Chequeo Preventivo Anual Callout */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
              <div className="space-y-1 text-center md:text-left">
                <h4 className="text-base font-extrabold flex items-center gap-2 justify-center md:justify-start">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  Chequeo Preventivo Anual DSS
                </h4>
                <p className="text-xs text-blue-100 max-w-xl">
                  Educamos en la prevención y auspiciamos hábitos saludables para evaluar de forma periódica tu estado de salud integral.
                </p>
              </div>
              <button
                onClick={() => router.push('/cartilla')}
                className="bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-sm shrink-0 cursor-pointer"
              >
                Buscar Médicos en Cartilla
              </button>
            </div>
          </div>
        )}

        {/* 3. INTERNACIONES Y QUIRÚRGICOS */}
        {activeSubTab === 'internaciones' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Notice Card */}
            <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-3 text-rose-950 font-extrabold text-lg">
                <BedDouble className="w-6 h-6 text-rose-600" />
                <h3>Normas para Internaciones Sanitarias</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-white p-4 rounded-2xl border border-rose-100 space-y-2">
                  <h4 className="font-bold text-rose-900 text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-rose-600" />
                    Internaciones Programadas
                  </h4>
                  <p className="text-slate-700 leading-relaxed">
                    Los afiliados deberán solicitar <strong className="text-slate-900">previamente la autorización</strong> de la respectiva Orden de Internación en el DSS antes de ingresar al sanatorio.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-rose-100 space-y-2">
                  <h4 className="font-bold text-rose-900 text-sm flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    Internaciones de Urgencia (72 hs)
                  </h4>
                  <p className="text-slate-700 leading-relaxed">
                    En urgencias, es imprescindible comunicar y solicitar autorización dentro de las <strong className="text-slate-900">72 horas hábiles</strong> de producida la internación (por teléfono, WhatsApp o mail) para posibilitar auditorías en lugar.
                  </p>
                </div>
              </div>
            </div>

            {/* Coberturas Incluidas */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4 shadow-2xs">
              <h4 className="font-extrabold text-slate-900 text-base">La Cobertura de Internación comprende:</h4>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs">
                {[
                  "1. Pensión Mínima",
                  "2. UTI / UTI Intermedia",
                  "3. Unidad Coronaria",
                  "4. Neonatología",
                  "5. Medicamentos",
                  "6. Derechos Sanatoriales",
                  "7. Derechos Quirúrgicos",
                  "8. Honorarios Médicos",
                  "9. Anestesista",
                  "10. Prácticas Complementarias"
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium text-slate-700 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
                <div className="space-y-1">
                  <strong className="text-slate-900 block font-bold">• Habitación Compartida:</strong>
                  <p>Comprende Pensión Mínima en Habitación Compartida con Baño Privado. Para menores de 10 años, se cubre habitación compartida con 1 acompañante.</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-slate-900 block font-bold">• Reintegro por Habitación Privada:</strong>
                  <p>Para afiliados al <strong className="text-slate-900">Plan General</strong>, se reconoce por reintegro la diferencia por Habitación Privada en internaciones hasta un máximo de 3 días (según criterio de Auditoría Médica).</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* 4. FARMACIA, ANTICONCEPTIVOS Y NUTRICIÓN */}
        {activeSubTab === 'farmacia' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Anticonceptivos Card */}
            <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 rounded-3xl p-6 border border-rose-200 space-y-4 shadow-xs">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3 text-rose-950 font-extrabold text-lg">
                  <Pill className="w-6 h-6 text-rose-600" />
                  <h3>Cobertura de Medicamentos y Anticonceptivos</h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push('/vademecum/anticonceptivos')}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Vademécum Anticonceptivos</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => router.push('/vademecum/basico')}
                    className="bg-white text-slate-800 hover:bg-slate-100 font-bold text-xs px-3.5 py-2 rounded-xl border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Vademécum General</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-white/90 p-4 rounded-2xl border border-rose-100 space-y-1">
                  <h4 className="font-bold text-rose-950 text-sm">• Con Receta Médica (60%)</h4>
                  <p className="text-slate-700 leading-relaxed">
                    Los medicamentos anticonceptivos y de ambulatorio cuentan con un 60% de cobertura directa en farmacias convenidas presenting carnet y receta.
                  </p>
                </div>
                <div className="bg-white/90 p-4 rounded-2xl border border-rose-100 space-y-1">
                  <h4 className="font-bold text-rose-950 text-sm">• Con Ficha Electrónica (100%)</h4>
                  <p className="text-slate-700 leading-relaxed">
                    Mediante Ficha Electrónica confeccionada por su médico/a ginecólogo/a y aprobada previamente por la Obra Social, el anticonceptivo contará con 100% de cobertura sin requerir recetas adicionales mientras permanezca vigente.
                  </p>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => router.push('/vademecum/farmacias')}
                  className="inline-flex items-center gap-2 text-xs font-bold text-rose-900 hover:text-rose-950 underline cursor-pointer"
                >
                  Ver Guía de Cobertura en Farmacias Adheridas ➔
                </button>
              </div>
            </div>

            {/* Nutricionistas */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center md:text-left">
                <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-base justify-center md:justify-start">
                  <Apple className="w-5 h-5 text-emerald-600" />
                  <h4>Cobertura Integral en Nutrición</h4>
                </div>
                <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                  Tratamiento nutricional completo: incluye la Consulta Inicial por derivación médica, confección de Plan Alimentario personalizado y seguimiento con controles mensuales.
                </p>
              </div>
              <button
                onClick={() => router.push('/vademecum/farmacias')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Ver Cobertura en Farmacias</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* 5. ASISTENCIA ODONTOLÓGICA */}
        {activeSubTab === 'odontologia' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            <div className="bg-gradient-to-r from-cyan-900 to-blue-900 text-white rounded-3xl p-6 sm:p-8 space-y-3 shadow-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-300/30 text-cyan-200 text-xs font-semibold">
                <Smile className="w-4 h-4 text-cyan-300" />
                <span>Artículo 25 a 28 del Reglamento</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold">Asistencia Odontológica Integral</h3>
              <p className="text-xs sm:text-sm text-cyan-100 leading-relaxed max-w-3xl">
                La cobertura de Odontología se brinda a través de dos sistemas alternativos a opción del afiliado: <strong className="text-white">Sistema de Autorización Previa</strong> (con odontólogos convenidos) o <strong className="text-white">Sistema de Reintegros</strong>.
              </p>
            </div>

            {/* Modalidades Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Autorización Previa */}
              <div className="bg-white p-6 rounded-3xl border border-cyan-200 shadow-2xs space-y-3">
                <h4 className="font-extrabold text-cyan-950 text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-600" />
                  1. Sistema de Autorización Previa
                </h4>
                <ol className="text-xs text-slate-700 space-y-2 list-decimal pl-4 leading-relaxed">
                  <li>Solicitá el formulario <strong className="text-slate-900">"Ficha Odontológica"</strong> en el DSS o descargalo de la sección Formularios.</li>
                  <li>Concurrí al odontólogo convenido para que complete el detalle de prestaciones.</li>
                  <li>Presentá la ficha en el DSS para su arancelamiento y aboná el coseguro correspondiente.</li>
                  <li>Entregá la ficha autorizada al odontólogo antes de iniciar el tratamiento.</li>
                </ol>
              </div>

              {/* Reintegro */}
              <div className="bg-white p-6 rounded-3xl border border-blue-200 shadow-2xs space-y-3">
                <h4 className="font-extrabold text-blue-950 text-base flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  2. Sistema de Reintegro
                </h4>
                <ol className="text-xs text-slate-700 space-y-2 list-decimal pl-4 leading-relaxed">
                  <li>Aboná el tratamiento al odontólogo al finalizar la atención.</li>
                  <li>Presentá en el DSS la <strong className="text-slate-900">Ficha Odontológica</strong> codificada con estampillado e informe técnico.</li>
                  <li>Adjuntá el <strong className="text-slate-900">Recibo oficial de pago impositivo</strong>.</li>
                  <li>Plazo de presentación: dentro del mes de realizada la práctica o hasta los 5 meses posteriores.</li>
                </ol>
              </div>

            </div>

            {/* Reglas y Carencias de Cobertura */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
              <h4 className="font-extrabold text-slate-900 text-sm">Disposiciones y Carencias Clave por Práctica (Art. 28):</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs text-slate-700">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">• Consultas y Operatoria:</strong>
                  <p>1 consulta por año aniversario. Restauraciones (amalgamas/composites) no se repiten dentro de los 24 meses (12 meses en menores de 8 años).</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">• Prótesis Removibles y Fijas:</strong>
                  <p>Prótesis removibles: repetición a los 60 meses. Prótesis fijas: repetición a los 84 meses (con Rx pre/post). No cubre porcelana pura sobre metal.</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">• Endodoncia & Ortodoncia:</strong>
                  <p>Endodoncias: 1 por pieza con Rx conductometría. Ortodoncia: de 9 a 14 años inclusive (cubierto en 3 etapas: inicio, mitad y final).</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* 6. SUBSIDIOS, PRÓTESIS Y BENEFICIOS */}
        {activeSubTab === 'subsidios' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Subsidio Celíacos */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-3xl border border-amber-200 space-y-3 shadow-2xs">
                <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold">
                  <Apple className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Subsidio para Celíacos</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Ayuda económica mensual otorgada a afiliados con celiaquía para la adquisición de alimentos libres de gluten (sin TACC).
                </p>
                <div className="bg-white/80 p-3 rounded-2xl border border-amber-200 text-xs text-slate-800 space-y-1">
                  <strong className="block font-bold">Requisitos de Trámite:</strong>
                  <p>Presentar el formulario <strong className="text-slate-900">"Protocolo Celíacos"</strong> completado por el médico tratante + copia de análisis y biopsia diagnóstica.</p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => onGoToFormularios && onGoToFormularios('protocolo-celiacos')}
                    className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 bg-white hover:bg-amber-100 px-4 py-2.5 rounded-xl border border-amber-300 transition-all cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-amber-600" />
                    Ir al Centro de Formularios
                  </button>
                </div>
              </div>

              {/* Provisión de Prótesis y Órtesis */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-3xl border border-purple-200 space-y-3 shadow-2xs">
                <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold">
                  <Bone className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Prótesis y Órtesis (Art. 19)</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Cobertura del <strong className="text-slate-900">60% para Plan General</strong> y del <strong className="text-slate-900">40% para Plan Básico</strong> calculada sobre el menor de 3 presupuestos.
                </p>
                <div className="bg-white/80 p-3 rounded-2xl border border-purple-200 text-xs text-slate-800 space-y-1">
                  <strong className="block font-bold">Alquiler de Elementos de Ortopedia:</strong>
                  <p>Alquiler de muletas, camas, sillas de ruedas, trípodes y andadores por reintegro hasta 90 días por año aniversario.</p>
                </div>
              </div>

            </div>

            {/* Subsidio por Sepelios */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-2xs">
              <div className="flex items-center gap-3 text-slate-900 font-extrabold text-base">
                <HeartHandshake className="w-6 h-6 text-purple-600" />
                <h3>Subsidio por Sepelios</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Asistencia y compensación económica ante el fallecimiento del afiliado titular o integrantes de su grupo familiar primario a cargo. Para la tramitación del subsidio, se deberá presentar la solicitud correspondiente acompañada de la partida de defunción y comprobantes exigidos por la reglamentación.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onGoToFormularios && onGoToFormularios()}
                  className="inline-flex items-center gap-2 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 px-4 py-2.5 rounded-xl border border-purple-200 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-purple-600" />
                  Descargar Formularios de Subsidio
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
