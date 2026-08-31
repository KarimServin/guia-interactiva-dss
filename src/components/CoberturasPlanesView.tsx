"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Stethoscope, 
  BedDouble, 
  Pill, 
  Smile, 
  HeartHandshake, 
  FileText, 
  ExternalLink, 
  MapPin, 
  Building2, 
  Activity, 
  Apple, 
  Bone, 
  Sparkles,
  ArrowRight,
  Baby,
  Brain
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

  // Helper to map route key to internal sub-tab id
  const getSubTabId = (key: string) => {
    if (key === 'subsidio-sepelios' || key === 'subsidios') return 'subsidios';
    if (key === 'cobertura-odontologia' || key === 'odontologia') return 'odontologia';
    if (key === 'vademecum-farmacias' || key === 'farmacia') return 'farmacia';
    if (key === 'internaciones') return 'internaciones';
    if (key === 'medica' || key === 'chequeo-preventivo') return 'medica';
    return 'planes';
  };

  const [activeTab, setActiveTab] = useState<string>(getSubTabId(initialSubTab));

  useEffect(() => {
    if (initialSubTab) {
      setActiveTab(getSubTabId(initialSubTab));
    }
  }, [initialSubTab]);

  const TABS = [
    { id: 'planes', label: 'Planes y Ámbito Geográfico', icon: ShieldCheck },
    { id: 'medica', label: 'Asistencia Médica (Arts. 14-24)', icon: Stethoscope },
    { id: 'internaciones', label: 'Internaciones', icon: BedDouble },
    { id: 'farmacia', label: 'Farmacia, Anticonceptivos y Nutrición', icon: Pill },
    { id: 'odontologia', label: 'Odontología (Arts. 25-28)', icon: Smile },
    { id: 'subsidios', label: 'Subsidios y Prótesis', icon: HeartHandshake },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* HERO BANNER */}
      <div className="relative bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl overflow-hidden border border-blue-800/40">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Departamento de Servicios Sociales</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Coberturas y Planes
          </h1>

          <p className="text-slate-200 text-xs sm:text-base leading-relaxed">
            Pensamos y actuamos en función de las prioridades de nuestros Profesionales, ofreciendo las opciones del <strong className="text-white font-bold">Plan Básico</strong> y el <strong className="text-white font-bold">Plan General</strong>. Así procuramos un modelo de atención en su concepto más amplio, apuntando claramente a la promoción de la salud, educando en la prevención y auspiciando conductas saludables para disminuir los factores de riesgos.
          </p>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            A través de la más amplia red de prestadores a nivel provincial, accederán a un sistema de protección médico asistencial de alta calidad con una marcada concepción solidaria y una atención cordial y personalizada de máximo nivel que aseguren su mejor calidad de vida.
          </p>

          {/* Quick CTAs */}
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onOpenCosegurosModal && onOpenCosegurosModal()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Ver Tabla Comparativa de Coseguros y Planes</span>
            </button>
            <button
              onClick={() => router.push('/vademecum/farmacias')}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
            >
              <Pill className="w-4 h-4 text-emerald-400" />
              <span>Ver Cobertura en Farmacias</span>
            </button>
          </div>
        </div>
      </div>

      {/* INTERACTIVE BUTTON TABS */}
      <div className="bg-slate-100/90 p-2 rounded-2xl border border-slate-200/80 flex items-center gap-2 overflow-x-auto scrollbar-none shadow-xs">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 scale-[1.01]'
                  : 'bg-transparent text-slate-700 hover:bg-white/70 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-600'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT CONTAINER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm min-h-[420px] transition-all">

        {/* 1. PLANES Y ÁMBITO GEOGRÁFICO */}
        {activeTab === 'planes' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-2xl bg-blue-100 text-blue-700 font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Planes y Ámbito de Cobertura</h2>
                <p className="text-xs text-slate-500">Plan Básico, Plan General y territorialidad</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Ámbito Geográfico de Cobertura
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  El área de cobertura del DSS comprende la <strong className="text-slate-900">Primera Circunscripción de la provincia de Santa Fe</strong>, donde el Departamento mantiene una actualización constante de los convenios con los prestadores.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  Convenios de Reciprocidad (Rosario, Córdoba y Bs. As.)
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  En la <strong className="text-slate-900">Ciudad de Rosario</strong> y en la <strong className="text-slate-900">provincia de Córdoba</strong> se mantienen convenios de reciprocidad con cada consejo. En estos casos, si los aranceles facturados difirieran con los reconocidos por este Departamento, la diferencia quedará a cargo exclusivo del afiliado (se generará en la cuenta corriente un Coseguro con la leyenda <em className="font-semibold text-slate-900">“diferencia”</em>).
                </p>
                <p className="text-xs text-slate-600 leading-relaxed pt-1 border-t border-slate-200/60">
                  La misma metodología se aplica a aquellos afiliados que se atiendan en el <strong className="text-slate-900">Hospital Italiano de la Ciudad de Buenos Aires</strong>, donde la derivación se aprueba cuando la complejidad no puede ser resuelta a nivel local.
                </p>
              </div>
            </div>

            <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-100 flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs text-blue-900 font-medium">
                ¿Querés consultar la tabla detallada de aranceles y diferencias por cada plan?
              </span>
              <button
                onClick={() => onOpenCosegurosModal && onOpenCosegurosModal()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>Ver Tabla Comparativa de Coseguros / Planes</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. ASISTENCIA MÉDICA (ARTS. 14 A 24) */}
        {activeTab === 'medica' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-2xl bg-indigo-100 text-indigo-700 font-bold">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Asistencia Médica Ambulatoria (Arts. 14 al 24)</h2>
                <p className="text-xs text-slate-500">Normas del Nomenclador Nacional de Prestaciones Médicas y Sanatoriales</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Consultas (Art. 15) */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-indigo-600" />
                  a.1) Consultas Médicas (Art. 15)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cobertura en todas las especialidades del Nomenclador Nacional. Previa presentación de la Credencial de Afiliación, los afiliados acceden a la consulta con profesionales convenidos sin pago de adicionales. Si se requiere a un mismo profesional más de 2 veces en 15 días, debe presentar Historia Clínica.
                </p>
              </div>

              {/* Diagnóstico y Tratamiento (Art. 16 y 17) */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-600" />
                  a.2 y a.3) Diagnóstico y Prácticas No Nomencladas
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Se cubren previa autorización de Auditoría Médica los exámenes complementarios de diagnóstico y prácticas especializadas del Nomenclador. Las prácticas no nomencladas se cubren según el listado vigente en cada plan al momento de su solicitud.
                </p>
              </div>

              {/* Domiciliaria (Art. 18) */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  a.4) Atención Domiciliaria y Enfermería (Art. 18)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Atención médica y enfermería a domicilio para urgencias/emergencias en afiliados adheridos voluntariamente al servicio contratado. Incluye entrega domiciliaria de medicamentos en farmacias que ofrezcan esta modalidad.
                </p>
              </div>

              {/* Plan Materno Infantil (Art. 20) */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Baby className="w-4 h-4 text-rose-600" />
                  a.6) Plan Materno Infantil (Art. 20)
                </h3>
                <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                  <li>• <strong className="text-slate-800">Embarazada:</strong> Desde la gestación hasta 30 días post-parto sin coseguro (consultas, ecografía, internación y laboratorio). Presentar certificado médico estampillado con FPP.</li>
                  <li>• <strong className="text-slate-800">Recién Nacido:</strong> Desde el nacimiento hasta los 12 meses de vida sin coseguro (consultas, leche maternizada o entera por 3 meses; leches medicamentosas al % de medicamentos con HC).</li>
                </ul>
              </div>

              {/* Fisioterapia y Fonoaudiología (Art. 21 y 22) */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-600" />
                  a.7 y a.8) Fisiocinesioterapia y Fonoaudiología
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  • <strong className="text-slate-800">Fisiocinesioterapia:</strong> Hasta 30 sesiones por patología en un período de 365 días por orden médica autorizada.<br/>
                  • <strong className="text-slate-800">Fonoaudiología y Foniatría:</strong> Hasta 30 sesiones por año calendario previa derivación del médico tratante con historia clínica.
                </p>
              </div>

              {/* Salud Mental (Art. 23) */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-600" />
                  a.9) Programa de Salud Mental (Art. 23)
                </h3>
                <ul className="text-xs text-slate-600 space-y-1 leading-relaxed">
                  <li>• <strong className="text-slate-800">Psiquiatría:</strong> Hasta 20 sesiones por año (hasta 10 más con Auditoría).</li>
                  <li>• <strong className="text-slate-800">Psicoterapia:</strong> Como apoyo indicado por psiquiatra hasta 20 sesiones por año.</li>
                  <li>• <strong className="text-slate-800">Psicopedagogía:</strong> Patología específica hasta 20 sesiones (hasta 20 más con Auditoría).</li>
                </ul>
              </div>

            </div>

            {/* Quimioterapia (Art. 24) */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <strong className="text-slate-900 font-bold block text-sm">a.10) Tratamiento Quimioterápico (Art. 24):</strong>
              <p className="leading-relaxed">
                El DSS brinda cobertura de tratamiento quimioterápico hasta el importe que periódicamente determine por cada ciclo. Los medicamentos oncológicos son provistos por el DSS según el procedimiento en vigencia. Cualquier gasto en exceso del importe fijo cubierto queda a cargo del afiliado.
              </p>
            </div>
          </div>
        )}

        {/* 3. INTERNACIONES */}
        {activeTab === 'internaciones' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-2xl bg-rose-100 text-rose-700 font-bold">
                <BedDouble className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Internaciones y Servicios Quirúrgicos</h2>
                <p className="text-xs text-slate-500">Normas de autorización, modalidades y rubros comprendidos</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Cobertura según plan. Para todos los casos de internaciones es necesaria la autorización por parte del DSS de la prescripción médica.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-rose-50/80 p-4 rounded-2xl border border-rose-100 space-y-1">
                <strong className="font-bold text-rose-950 text-sm block">Internación Programada:</strong>
                <p className="text-rose-900 leading-relaxed">
                  Los afiliados deberán solicitar previamente la autorización de la respectiva Orden de Internación.
                </p>
              </div>

              <div className="bg-rose-50/80 p-4 rounded-2xl border border-rose-100 space-y-1">
                <strong className="font-bold text-rose-950 text-sm block">Intervención de Urgencia (72 hs hábiles):</strong>
                <p className="text-rose-900 leading-relaxed">
                  Se requiere indefectiblemente la solicitud de autorización dentro de las <strong className="font-bold">72 horas hábiles</strong> de producida la misma (personalmente, teléfono, fax, telegrama u otro medio fehaciente) para posibilitar auditorías en el lugar.
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <strong className="text-slate-900 font-bold text-sm block">Módulos Quirúrgicos y Coseguros:</strong>
              <p className="leading-relaxed">
                Si la intervención corresponde a un Módulo quirúrgico pactado por convenio, se cargará el coseguro correspondiente al momento de su Autorización. En el resto de los casos el coseguro se generará cuando el prestador liquide los consumos realizados por el Afiliado (únicamente para afiliados al Plan Básico o internaciones realizadas fuera de la primera circunscripción).
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <strong className="text-slate-900 font-bold text-sm block">La Cobertura de Internación comprende los siguientes 10 rubros:</strong>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 pt-1 font-medium text-slate-700">
                <span>1. Pensión Mínima</span>
                <span>2. UTI / Intermedia</span>
                <span>3. Unidad Coronaria</span>
                <span>4. Neonatología</span>
                <span>5. Medicamentos</span>
                <span>6. Derechos Sanatoriales</span>
                <span>7. Derechos Quirúrgicos</span>
                <span>8. Honorarios Médicos</span>
                <span>9. Honorarios Anestesista</span>
                <span>10. Prácticas</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700 border-t border-slate-100 pt-3">
              <p>
                <strong className="text-slate-900 font-bold">• Habitación:</strong> Pensión Mínima en Habitación Compartida con Baño Privado. Para internaciones de menores de 10 años, se cubrirá habitación compartida con un acompañante y baño privado.
              </p>
              <p>
                <strong className="text-slate-900 font-bold">• Habitación Privada (Plan General):</strong> Se reconocerá por Reintegro la diferencia por Habitación Privada en internaciones otorgado a afiliados al Plan General y hasta un máximo de tres (3) días (según criterio de auditoría médica). El DSS no reconocerá honorarios extras generados por esta cobertura.
              </p>
            </div>
          </div>
        )}

        {/* 4. FARMACIAS, ANTICONCEPTIVOS Y NUTRICIÓN */}
        {activeTab === 'farmacia' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-700 font-bold">
                <Pill className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Farmacia, Anticonceptivos y Nutricionistas</h2>
                <p className="text-xs text-slate-500">Cobertura de medicamentos y asistencia nutricional</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Pill className="w-5 h-5 text-emerald-600" />
                Pastillas Anticonceptivas y Medicamentos
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Se incorpora dentro de la cobertura del DSS las pastillas anticonceptivas, el reconocimiento es del <strong className="text-slate-900 font-bold">60% para ambos planes</strong> con descuento directamente en Farmacia. El Afiliado deberá presentar en el DSS una ficha de tratamiento prolongado (deberá ser renovada cada seis meses), indicando alguna de las pastillas que se encuentran en el vademécum. Una vez completado este procedimiento podrá realizar la compra con el descuento mencionado.
              </p>
            </div>

            {/* Direct Links */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => router.push('/vademecum/anticonceptivos')}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Vademécum de Anticonceptivos</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => router.push('/vademecum/basico')}
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Vademécum General (Nombres Comerciales, Monodrogas y Presentaciones)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => router.push('/vademecum/farmacias')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Ver Cobertura en Farmacia</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Apple className="w-5 h-5 text-emerald-600" />
                Nutricionistas
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Cobertura integral en el tratamiento nutricional, incluyendo la Consulta inicial por derivación, el Plan Alimentario y los controles mensuales.
              </p>
            </div>
          </div>
        )}

        {/* 5. ASISTENCIA ODONTOLÓGICA */}
        {activeTab === 'odontologia' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-2xl bg-cyan-100 text-cyan-700 font-bold">
                <Smile className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Asistencia Odontológica (Arts. 25 al 28)</h2>
                <p className="text-xs text-slate-500">Sistemas de atención, requisitos técnicos y normas administrativas</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              La Asistencia Odontológica se brinda a través de dos sistemas alternativos a opción de los afiliados: <strong className="text-slate-900 font-bold">1. Sistema de autorización previa</strong> o <strong className="text-slate-900 font-bold">2. Sistema de reintegro</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* b.1 Autorización Previa */}
              <div className="bg-cyan-50/50 p-5 rounded-2xl border border-cyan-100 space-y-2 text-xs text-slate-700">
                <strong className="text-cyan-950 font-bold text-sm block">b.1) Sistema de Autorización Previa (Art. 26):</strong>
                <ol className="list-decimal pl-4 space-y-1 leading-relaxed">
                  <li>Seleccionar odontólogo convenido y solicitar la "Ficha Odontológica".</li>
                  <li>El odontólogo completa la ficha detallando las prestaciones a realizar.</li>
                  <li>Presentar la ficha en el DSS para arancelamiento por Auditoría Odontológica.</li>
                  <li>Abonar el coseguro correspondiente y entregar la ficha autorizada al odontólogo antes de iniciar.</li>
                  <li>Al finalizar, conformar la ficha con su firma. Estampillado provincial a cargo del afiliado.</li>
                </ol>
              </div>

              {/* b.2 Reintegro */}
              <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 space-y-2 text-xs text-slate-700">
                <strong className="text-blue-950 font-bold text-sm block">b.2) Sistema de Reintegro (Art. 27):</strong>
                <ol className="list-decimal pl-4 space-y-1 leading-relaxed">
                  <li>Abonar el tratamiento al odontólogo al finalizar la atención.</li>
                  <li>Presentar en el DSS: Recibo oficial de pago impositivo, Ficha Odontológica codificada estampillada y Solicitud de Reintegro.</li>
                  <li>Plazo de presentación: dentro del mes de realizada la prestación o los 5 meses inmediatamente siguientes.</li>
                </ol>
              </div>

            </div>

            {/* b.3 Disposiciones Válidas para Ambos Sistemas (Art. 28) */}
            <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-slate-700">
              <strong className="text-slate-900 font-bold text-sm block">b.3) Reglas y Carencias de Cobertura (Art. 28):</strong>

              <ul className="space-y-2 leading-relaxed">
                <li>• <strong className="text-slate-900">Consultas:</strong> Se reconoce solamente 1 consulta por afiliado por año aniversario desde la última autorizada.</li>
                <li>• <strong className="text-slate-900">Operatoria Dental y Preventiva:</strong> Restauraciones (amalgamas, composites, sellantes y periodoncia) no se repiten dentro de los 24 meses (12 meses si es menor de 8 años). Topicación con fluor cada 6 meses hasta los 12 años. Sellantes hasta los 18 años.</li>
                <li>• <strong className="text-slate-900">Prótesis:</strong> Removibles sin repetición dentro de 60 meses; fijas sin repetición dentro de 84 meses (con Rx pre y post). No se cubren cerámicas/porcelanas puras sobre metal (se reconoce equivalente a coronas coladas con frente estético de acrílico). No se reconocen prótesis provisorias.</li>
                <li>• <strong className="text-slate-900">Endodoncias:</strong> 1 vez por pieza por afiliado. Requiere Rx pre, conductometría y post. No cubierto en dientes temporarios en período de recambio.</li>
                <li>• <strong className="text-slate-900">Ortodoncia y Ortopedia Funcional:</strong> Se brinda 1 sola vez de 9 a 14 años inclusive (en 3 etapas: inicio, mitad y finalización). Menores de 9 años según patología previa por Auditoría.</li>
                <li>• <strong className="text-slate-900">Implantes:</strong> Se reconocen las piezas correspondientes a una prótesis fija convencional (Rx pre y post).</li>
                <li>• <strong className="text-slate-900">Examen Bucal de Ingreso:</strong> Obligatorio al afiliarse. Carencia por preexistencia: 24 meses para odontología general y 36 meses para ortodoncia y prótesis por piezas faltantes.</li>
                <li>• <strong className="text-slate-900">Tope Anual:</strong> Definido por el DSS por año aniversario según categoría y grupo familiar.</li>
              </ul>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenCosegurosModal && onOpenCosegurosModal()}
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-900 bg-cyan-50 hover:bg-cyan-100 px-4 py-2.5 rounded-xl border border-cyan-200 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-cyan-700" />
                Ver Tabla Comparativa de Coseguros / Planes
              </button>
            </div>
          </div>
        )}

        {/* 6. SUBSIDIOS Y PRÓTESIS */}
        {activeTab === 'subsidios' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-2xl bg-purple-100 text-purple-700 font-bold">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Subsidios, Prótesis y Beneficios Especiales</h2>
                <p className="text-xs text-slate-500">Subsidio Celíacos, Prótesis/Órtesis (Art. 19) y Subsidio Sepelios</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Subsidio Celíacos */}
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
                <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-700 font-bold w-fit">
                  <Apple className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Subsidio Celíacos</h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  El DSS otorgará una ayuda económica a aquellos afiliados con celiaquía para adquirir los alimentos libre de gluten. Para acceder a este beneficio deberá presentar el Formulario <strong className="text-slate-900">“Protocolo Celíacos”</strong> llenado por el médico tratante adjuntando copia de estudios previos (análisis y resultado de la biopsia).
                </p>
              </div>

              {/* Prótesis y Órtesis */}
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
                <div className="p-2.5 rounded-2xl bg-purple-100 text-purple-700 font-bold w-fit">
                  <Bone className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Provisión de Prótesis (Art. 19)</h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Cobertura de prótesis y órtesis del <strong className="text-slate-900">60% para el Plan General</strong> y del <strong className="text-slate-900">40% para el Plan Básico</strong> del menor de tres presupuestos (provisión o reintegro). Pedidos sin marcas comerciales. Cirugías requieren autorización previa del material.
                </p>
                <p className="text-[11px] text-slate-500 border-t border-slate-200/60 pt-2">
                  Alquiler de muletas, camas, sillas, trípodes y andadores hasta valor fijado por el DSS por máximo de 90 días por año.
                </p>
              </div>

              {/* Subsidio Sepelios */}
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
                <div className="p-2.5 rounded-2xl bg-slate-200 text-slate-800 font-bold w-fit">
                  <HeartHandshake className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Subsidio Sepelios</h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Ayuda y cobertura económica otorgada por el Departamento de Servicios Sociales ante el fallecimiento del afiliado titular o familiar a cargo, previa presentación de la solicitud y documentación fehaciente.
                </p>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
