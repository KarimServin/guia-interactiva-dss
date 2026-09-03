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
  Brain,
  Trees,
  BadgePercent,
  CheckCircle2,
  Leaf
} from 'lucide-react';
import { CoseguroTableInline } from './CoseguroTableInline';

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
    if (key === 'subsidio-sepelios' || key === 'sepelios') return 'sepelios';
    if (key === 'cobertura-odontologia' || key === 'odontologia') return 'odontologia';
    if (key === 'vademecum-farmacias' || key === 'cobertura-farmacias' || key === 'cobertura-farmacia' || key === 'farmacias' || key === 'farmacia') return 'farmacia';
    if (key === 'internaciones') return 'internaciones';
    if (key === 'medica' || key === 'chequeo-preventivo') return 'medica';
    if (key === 'materno' || key === 'plan-materno') return 'materno';
    if (key === 'nutricion-celiacos' || key === 'celiacos' || key === 'nutricion') return 'nutricion-celiacos';
    if (key === 'protesis' || key === 'ortesis') return 'protesis';
    return 'planes';
  };

  const [activeTab, setActiveTab] = useState<string>(getSubTabId(initialSubTab));

  const handleTabClick = (tabId: string, shouldScroll = true) => {
    const targetId = getSubTabId(tabId);
    setActiveTab(targetId);

    if (shouldScroll) {
      setTimeout(() => {
        const elem = document.getElementById('coberturas-tab-content');
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  };

  useEffect(() => {
    if (initialSubTab) {
      const subId = getSubTabId(initialSubTab);
      setActiveTab(subId);
      if (initialSubTab !== 'planes') {
        setTimeout(() => {
          const elem = document.getElementById('coberturas-tab-content');
          if (elem) {
            elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  }, [initialSubTab]);

  const TABS = [
    { id: 'planes', title: 'Planes y Ámbito', icon: ShieldCheck },
    { id: 'medica', title: 'Asistencia Médica', icon: Stethoscope },
    { id: 'materno', title: 'Plan Materno Infantil', icon: Baby },
    { id: 'internaciones', title: 'Internaciones', icon: BedDouble },
    { id: 'farmacia', title: 'Farmacia y Anticonceptivos', icon: Pill },
    { id: 'odontologia', title: 'Odontología', icon: Smile },
    { id: 'nutricion-celiacos', title: 'Nutrición y Celíacos', icon: Apple },
    { id: 'protesis', title: 'Prótesis y Órtesis', icon: Bone },
    { id: 'sepelios', title: 'Subsidio Sepelios', icon: HeartHandshake },
  ];

  return (
    <div id="coberturas-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* HERO BANNER */}
      <div className="relative bg-gradient-to-r from-sky-100/90 via-blue-50/60 to-orange-100/60 rounded-3xl p-6 sm:p-8 shadow-sm overflow-hidden border border-slate-200/80">
        <div className="absolute right-0 top-0 w-96 h-96 bg-orange-200/25 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-3">

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Prestaciones
          </h1>

          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl">
            El DSS ofrece dos modalidades de cobertura: el <strong className="text-slate-900 font-bold">Plan General</strong> y el <strong className="text-slate-900 font-bold">Plan Básico</strong>, respaldados por una amplia red de prestadores médicos en toda la provincia.
          </p>
        </div>
      </div>

      {/* RESPONSIVE 3x3 CATEGORY SELECTOR GRID (DESKTOP: 3 COLS, MOBILE: 2 COLS) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id, true)}
              className={`group flex items-center gap-3.5 text-left p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-blue-600 shadow-md shadow-blue-600/25 ring-2 ring-blue-400/40 scale-[1.01]'
                  : 'bg-white text-slate-700 border-slate-200/90 hover:border-blue-300 hover:bg-blue-50/50 hover:text-slate-900 shadow-2xs'
              }`}
            >
              {/* Top Accent line when active */}
              {isActive && (
                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-sky-300 rounded-l-full" />
              )}
              
              <div className={`p-2.5 rounded-xl shrink-0 transition-transform group-hover:scale-110 ${
                isActive 
                  ? 'bg-white/15 text-white' 
                  : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
              }`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="text-sm sm:text-base font-bold leading-tight">
                  {tab.title}
                </h4>
              </div>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT CONTAINER */}
      <div id="coberturas-tab-content" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm min-h-[420px] transition-all scroll-mt-24">

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

        {/* 3. PLAN MATERNO INFANTIL */}
        {activeTab === 'materno' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-2xl bg-rose-100 text-rose-700 font-bold">
                <Baby className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Plan Materno Infantil (Art. 20)</h2>
                <p className="text-xs text-slate-500">Cobertura integral sin coseguro para la mamá y el recién nacido</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Cobertura Embarazada */}
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Baby className="w-5 h-5 text-rose-600" />
                  Cobertura para la Embarazada
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Cubre desde la confirmación del embarazo hasta <strong className="text-slate-900 font-bold">30 días post-parto sin cosecha de coseguro</strong> en todas las prestaciones vinculadas: consultas médicas, ecografías, estudios de laboratorio e internación para el parto o cesárea.
                </p>
                <div className="bg-rose-50/80 p-3.5 rounded-2xl border border-rose-100 text-xs text-rose-950 font-medium">
                  Requisito: Presentar en el DSS el certificado médico estampillado que indique la Fecha Probable de Parto (FPP).
                </div>
              </div>

              {/* Cobertura Recién Nacido */}
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-rose-600" />
                  Cobertura para el Recién Nacido
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Cubre desde el nacimiento hasta los <strong className="text-slate-900 font-bold">12 meses de vida sin coseguro</strong> (consultas de pediatría, vacunas y estudios).
                </p>
                <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed pt-1 border-t border-slate-200/60">
                  <li>• <strong className="text-slate-800">Leches Maternizadas o Enteras:</strong> Cobertura por un período de 3 meses.</li>
                  <li>• <strong className="text-slate-800">Leches Medicamentosas:</strong> Se reconocen al porcentaje de medicamentos con Historia Clínica y prescripción médica justificada.</li>
                </ul>
              </div>

            </div>
          </div>
        )}

        {/* 4. INTERNACIONES */}
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

        {/* 5. FARMACIAS Y ANTICONCEPTIVOS */}
        {activeTab === 'farmacia' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header Title */}
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-700 font-bold">
                <Pill className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Cobertura en Farmacia, Medicamentos y Salud Sexual</h2>
                <p className="text-xs text-slate-500">Esquema detallado de bonificaciones al 60% y cobertura integral al 100%</p>
              </div>
            </div>

            {/* Quick Access Badges Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50/60 p-5 rounded-2xl border border-emerald-200/80 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold text-xs">
                    60% Cobertura
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm">Medicamentos Ambulatorios</h3>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  Descuento directo en mostrador para medicamentos incluidos en el Vademécum Ambulatorio General (Plan General y Plan Básico).
                </p>
              </div>

              <div className="bg-gradient-to-br from-rose-50 to-pink-50/60 p-5 rounded-2xl border border-rose-200/80 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-extrabold text-xs">
                    100% Cobertura
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm">Salud Sexual y Anticoncepción</h3>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  Cobertura sin cargo en pastillas anticonceptivas seleccionadas, DIU/SIU, implantes y anticoncepción de emergencia.
                </p>
              </div>
            </div>

            {/* DETAILED SECTION: COBERTURA AL 60% */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 border-b border-slate-100 pb-3">
                <BadgePercent className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  1. Funcionamiento de la Cobertura al 60% (Medicamentos Generales)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
                <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Modalidad de Compra en Mostrador
                  </h4>
                  <ul className="space-y-1.5 text-slate-600 leading-relaxed">
                    <li>• Presentá en cualquier farmacia adherida tu <strong>Receta Médica</strong> (física o digital) emitida por el profesional.</li>
                    <li>• Acreditar identidad con tu <strong>Número de Matrícula Profesional</strong> o DNI.</li>
                    <li>• La farmacia aplica el <strong>60% de descuento directo</strong> sobre el precio de lista y abonás únicamente el 40% restante.</li>
                  </ul>
                </div>

                <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                    <FileText className="w-4 h-4 text-blue-600" />
                    Tratamientos Prolongados / Crónicos
                  </h4>
                  <ul className="space-y-1.5 text-slate-600 leading-relaxed">
                    <li>• Para medicamentos de uso habitual o crónico, presentá la <strong>Ficha de Tratamiento Prolongado</strong> en la secretaría del DSS.</li>
                    <li>• La ficha cuenta con una validez de <strong>6 meses</strong> y automatiza el expendio directo en farmacia sin trámites adicionales.</li>
                    <li>• Vademécum incluye las principales monodrogas y presentaciones comerciales aprobadas.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* DETAILED SECTION: COBERTURA Y SALUD SEXUAL */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-rose-800 border-b border-slate-100 pb-3">
                <Sparkles className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  2. Cobertura de Anticonceptivos (Salud Sexual, Reproductiva y Anticoncepción)
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                La cobertura de medicamentos anticonceptivos puede gestionarse de dos maneras: <strong>Con receta médica (60% de cobertura en farmacias convenidas según el listado)</strong> o <strong>Con Ficha Electrónica de Anticoncepción (100% de cobertura mediante ficha confeccionada por su ginecólogo/a y aprobada previamente por la Obra Social)</strong>.
              </p>

              <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-100/80 space-y-3">
                <h4 className="font-extrabold text-rose-950 text-xs uppercase tracking-wider">
                  Aspectos Clave
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-lg border border-rose-100 space-y-1">
                    <strong className="text-slate-900 font-bold block">Con Receta Médica (60%):</strong>
                    <p className="text-slate-600 text-[11.5px] leading-relaxed">
                      Cobertura del 60% adquiridos en farmacias convenidas, mediante la receta correspondiente y de acuerdo con el listado incluido.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-rose-100 space-y-1">
                    <strong className="text-rose-950 font-bold block">Con Ficha Electrónica (100%):</strong>
                    <p className="text-rose-900 text-[11.5px] leading-relaxed">
                      Cobertura del 100% mediante ficha electrónica confeccionada por médico/a ginecólogo/a y aprobada por la Obra Social.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-rose-100 text-xs space-y-1.5">
                  <div className="flex items-start gap-2 text-slate-700">
                    <span className="font-bold text-emerald-600 shrink-0">•</span>
                    <p className="text-[11.5px]">
                      <strong>Sin Receta Adicional con Ficha Vigente:</strong> Una vez aprobada y vigente, no es necesario presentar receta adicional para cada dispensa.
                    </p>
                  </div>
                  <div className="pt-1.5 border-t border-rose-100 text-rose-950 font-bold text-[11px]">
                    <strong>Importante:</strong> La cobertura del 100% requiere que la ficha electrónica haya sido previamente confeccionada, aprobada y se encuentre vigente.
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Vademécum Shortcuts */}
            <div className="bg-slate-900 rounded-2xl p-5 text-white space-y-3">
              <h4 className="font-bold text-sm text-white">Consultá los Vademécums Oficiales</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Accedé a los listados actualizados de monodrogas, marcas y nombres comerciales disponibles en el sistema.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  onClick={() => router.push('/vademecum/anticonceptivos')}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-rose-200" />
                  <span>Ver Vademécum de Anticonceptivos (100% y 60%)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => router.push('/vademecum/basico')}
                  className="bg-white/15 hover:bg-white/25 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
                >
                  <Pill className="w-4 h-4 text-emerald-400" />
                  <span>Ver Vademécum General Ambulatorio (60%)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 6. ASISTENCIA ODONTOLÓGICA */}
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

        {/* 7. NUTRICIÓN Y CELÍACOS */}
        {activeTab === 'nutricion-celiacos' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-700 font-bold">
                <Apple className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Nutrición y Subsidio Celíacos</h2>
                <p className="text-xs text-slate-500">Tratamiento nutricional y ayuda económica para alimentos sin TACC</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Nutricionistas */}
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Apple className="w-5 h-5 text-emerald-600" />
                  Atención Nutricional
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Cobertura integral en el tratamiento nutricional, incluyendo la Consulta inicial por derivación médica, el Plan Alimentario personalizado y los controles mensuales de seguimiento.
                </p>
              </div>

              {/* Subsidio Celíacos */}
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  Subsidio Celíacos
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  El DSS otorgará una ayuda económica a aquellos afiliados con celiaquía para adquirir los alimentos libre de gluten. Para acceder a este beneficio deberá presentar el Formulario <strong className="text-slate-900">“Protocolo Celíacos”</strong> llenado por el médico tratante adjuntando copia de estudios previos (análisis y resultado de la biopsia).
                </p>
              </div>

            </div>
          </div>
        )}

        {/* 8. PRÓTESIS Y ÓRTESIS (ART. 19) */}
        {activeTab === 'protesis' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-2xl bg-purple-100 text-purple-700 font-bold">
                <Bone className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Provisión de Prótesis y Órtesis (Art. 19)</h2>
                <p className="text-xs text-slate-500">Porcentajes de cobertura, alquiler de elementos ortopédicos y requisitos</p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Bone className="w-5 h-5 text-purple-600" />
                  Cobertura de Prótesis y Órtesis
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Cobertura de prótesis y órtesis del <strong className="text-slate-900 font-bold">60% para el Plan General</strong> y del <strong className="text-slate-900 font-bold">40% para el Plan Básico</strong> del menor de tres presupuestos (provisión o reintegro). Pedidos sin marcas comerciales. Cirugías requieren autorización previa del material.
                </p>
              </div>

              <div className="bg-purple-50/80 p-4 rounded-2xl border border-purple-100 space-y-1 text-xs text-purple-950">
                <strong className="font-bold text-sm block">Alquiler de Elementos Ortopédicos:</strong>
                <p className="leading-relaxed">
                  Alquiler de muletas, camas, sillas de ruedas, trípodes y andadores por reintegro con prescripción médica hasta el valor fijado por el DSS por un máximo de <strong className="font-bold">90 días por año</strong>. Reintegro sobre el menor de 2 presupuestos.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 9. SUBSIDIO SEPELIOS */}
        {activeTab === 'sepelios' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 font-bold">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Subsidio por Sepelios</h2>
                <p className="text-xs text-slate-500">Ayuda económica y convenios institucionales</p>
              </div>
            </div>

            {/* Subsidio por Fallecimiento */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-slate-700" />
                Subsidio por Fallecimiento
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Ayuda y cobertura económica otorgada por el Departamento de Servicios Sociales ante el fallecimiento del afiliado titular o familiar a cargo, previa presentación de la solicitud correspondiente y documentación fehaciente.
              </p>
            </div>

            {/* Adquisición Parcelas Lar de Paz */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-5">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700/80 border border-emerald-200/60 shrink-0 mt-0.5">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Adquisición de Parcelas — Parque Cementerio &quot;Lar de Paz&quot;
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Información y condiciones del convenio institucional para la adquisición de parcelas.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Características</h4>
                  <ul className="space-y-1.5 list-disc pl-5 leading-relaxed text-slate-700">
                    <li>Predio parquizado.</li>
                    <li>Parcelas a perpetuidad de 1,20 m x 2,40 m (capacidad para 2 féretros + 2 reducciones).</li>
                    <li>Absoluta libertad de culto.</li>
                    <li>Capilla ecuménica donde se pueden realizar los oficios que se soliciten.</li>
                  </ul>
                </div>

                <div className="space-y-1 pt-3 border-t border-slate-200/80">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Escritura y Expensas</h4>
                  <p className="leading-relaxed text-slate-700">
                    La parcela se debe escriturar y el propietario se debe hacer cargo de las expensas.
                  </p>
                </div>

                <div className="space-y-1 pt-3 border-t border-slate-200/80">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Precio</h4>
                  <p className="leading-relaxed text-slate-700">
                    Al valor de una parcela de lista Ceprisa se le aplica un 20% de descuento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── BANNER ACCESO A TABLA DE PLANES Y COSEGUROS ── */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md border border-blue-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Consulta Online</span>
          </div>
          <h3 className="text-lg sm:text-2xl font-extrabold text-white">
            Tabla Comparativa de Cobertura y Coseguros
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Consultá en tiempo real aranceles, porcentajes de cobertura y períodos de carencia en nuestra landing dedicada.
          </p>
        </div>
        <button
          onClick={() => router.push('/tabla-coseguros')}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <span>Ir a la Tabla de Planes y Coseguros</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
