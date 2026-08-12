import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { CreditCard, QrCode, Download, Shield, CheckCircle, User, RefreshCw, Smartphone, X } from 'lucide-react';

interface DigitalCredentialProps {
  onClose?: () => void;
}

export const DigitalCredential: React.FC<DigitalCredentialProps> = ({ onClose }) => {
  const [matricula, setMatricula] = useState('14520');
  const [titularName, setTitularName] = useState('CPTA. MARIA LAURA GOMEZ');
  const [memberRelation, setMemberRelation] = useState<'Titular' | 'Cónyuge (+01)' | 'Hijo/a 1 (+11)' | 'Hijo/a 2 (+12)'>('Titular');
  const [memberName, setMemberName] = useState('MARIA LAURA GOMEZ');
  const [dni, setDni] = useState('32.456.789');

  const getExtensionCode = () => {
    switch (memberRelation) {
      case 'Cónyuge (+01)': return '/01';
      case 'Hijo/a 1 (+11)': return '/11';
      case 'Hijo/a 2 (+12)': return '/12';
      default: return '';
    }
  };

  const fullMatriculaCode = `${matricula}${getExtensionCode()}`;

  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [85.6, 53.98] // Standard ID card dimension (CR80)
    });

    // Dark Institutional Navy Header
    doc.setFillColor(30, 58, 138); // blue-900
    doc.rect(0, 0, 85.6, 14, 'F');

    // Accent Sky Line
    doc.setFillColor(14, 165, 233); // sky-500
    doc.rect(0, 14, 85.6, 1.5, 'F');

    // Header Text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('CPCE SANTA FE - CAMARA I', 4, 6);
    doc.setFontSize(6);
    doc.setFont('helvetica', 'normal');
    doc.text('DEPARTAMENTO DE SERVICIOS SOCIALES (DSS)', 4, 10);

    // Card Body Background
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 15.5, 85.6, 38.48, 'F');

    // Label & Data - Matrícula
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(5);
    doc.text('MATRICULA / AFILIADO N°', 5, 20);
    doc.setTextColor(30, 58, 138);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(fullMatriculaCode, 5, 25);

    // Member Name
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(5);
    doc.setFont('helvetica', 'normal');
    doc.text('AFILIADO / INTEGRANTE', 5, 29);
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text(memberName.toUpperCase(), 5, 33);

    // DNI & Relation
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(5);
    doc.setFont('helvetica', 'normal');
    doc.text('DOCUMENTO (DNI)', 5, 37);
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(6);
    doc.setFont('helvetica', 'bold');
    doc.text(dni, 5, 41);

    doc.setTextColor(100, 116, 139);
    doc.setFontSize(5);
    doc.setFont('helvetica', 'normal');
    doc.text('CATEGORIA', 35, 37);
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(6);
    doc.setFont('helvetica', 'bold');
    doc.text(memberRelation, 35, 41);

    // Footer Status
    doc.setFillColor(224, 242, 254); // sky-100
    doc.rect(5, 45, 45, 5, 'F');
    doc.setTextColor(30, 58, 138);
    doc.setFontSize(5);
    doc.setFont('helvetica', 'bold');
    doc.text('ESTADO: ACTIVO - VIGENCIA 2026', 7, 48.5);

    // Simulated QR Code Frame on Right
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(203, 213, 225);
    doc.rect(60, 20, 20, 20, 'FD');
    doc.setTextColor(71, 85, 105);
    doc.setFontSize(4);
    doc.text('VALIDACION QR', 62, 42);

    doc.save(`Credencial_DSS_${fullMatriculaCode.replace('/', '_')}.pdf`);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-w-4xl mx-auto my-6">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-600 text-white flex items-center justify-center font-bold shadow-md">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Credencial Digital DSS</h3>
            <p className="text-xs text-slate-500">
              Generador y simulador oficial de credencial para atención médica sin carnet físico
            </p>
          </div>
        </div>
        {onClose && (
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Controls to Customize Credential */}
        <div className="lg:col-span-5 bg-slate-50/80 p-6 rounded-3xl border border-slate-200/80 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-2">
            <User className="w-4 h-4 text-sky-600" />
            Datos del Afiliado
          </h4>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              N° de Matrícula Titular
            </label>
            <input
              type="text"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all"
              placeholder="Ej. 14520"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Seleccionar Integrante
            </label>
            <select
              value={memberRelation}
              onChange={(e: any) => {
                setMemberRelation(e.target.value);
                if (e.target.value === 'Titular') {
                  setMemberName(titularName.replace('CPTA. ', ''));
                } else if (e.target.value === 'Cónyuge (+01)') {
                  setMemberName('CARLOS ALBERTO PEREZ');
                } else {
                  setMemberName('SOFIA GOMEZ PEREZ');
                }
              }}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all"
            >
              <option value="Titular">Titular (Matrícula Directa)</option>
              <option value="Cónyuge (+01)">Cónyuge (Extensión +01)</option>
              <option value="Hijo/a 1 (+11)">Hijo/a 1 (Extensión +11)</option>
              <option value="Hijo/a 2 (+12)">Hijo/a 2 (Extensión +12)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nombre y Apellido del Integrante
            </label>
            <input
              type="text"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Documento de Identidad (DNI)
            </label>
            <input
              type="text"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={handleDownloadPDF}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-full shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-sky-200" />
              Descargar Credencial en PDF
            </button>
          </div>
        </div>

        {/* Live Credential Card Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-semibold text-slate-500 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-sky-600" />
            Vista Previa Digital (Ideal Pantalla Móvil)
          </div>

          {/* Actual Realistic Credential Badge */}
          <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-950 text-white rounded-3xl p-6 shadow-2xl border border-sky-400/30 relative overflow-hidden max-w-md mx-auto">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3.5 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-white/10 backdrop-blur-md text-white font-bold flex items-center justify-center text-xs shadow-xs border border-white/10">
                  <Shield className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-tight text-white leading-none">
                    CPCE SANTA FE • CÁMARA I
                  </p>
                  <p className="text-[10px] text-sky-300 font-semibold uppercase tracking-wider">
                    Servicios Sociales
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                ACTIVO
              </span>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-12 gap-3 items-center">
              <div className="col-span-8 space-y-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                    MATRÍCULA / AFILIADO N°
                  </p>
                  <p className="text-2xl font-black text-sky-300 font-mono tracking-tight">
                    {fullMatriculaCode}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                    INTEGRANTE / AFILIADO
                  </p>
                  <p className="text-sm font-extrabold text-white tracking-tight">
                    {memberName}
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    DNI: {dni} • <span className="text-sky-300 font-semibold">{memberRelation}</span>
                  </p>
                </div>
              </div>

              {/* QR Code Container */}
              <div className="col-span-4 flex flex-col items-center justify-center bg-white/95 p-2.5 rounded-2xl shadow-inner">
                {/* SVG Mock QR */}
                <div className="w-16 h-16 bg-blue-950 p-2 rounded-xl flex items-center justify-center">
                  <QrCode className="w-12 h-12 text-white" />
                </div>
                <span className="text-[9px] font-bold text-slate-700 mt-1 uppercase">
                  VAL. DIGITAL
                </span>
              </div>
            </div>

            {/* Bottom Footer Details */}
            <div className="mt-6 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-300 font-medium">
              <span>Plan Solidario DSS</span>
              <span>Vigencia: Diciembre 2026</span>
            </div>
          </div>

          <div className="bg-sky-50/80 border border-sky-200/80 rounded-2xl p-4 text-xs text-blue-950 leading-relaxed font-medium">
            <strong>Nota para el prestador médico:</strong> Conforme al reglamento del DSS CPCE Santa Fe Cámara I, no es obligatorio exhibir un carnet plástico físico. Mencionando el número de matrícula y la extensión correspondiente, el profesional o sanatorio puede registrar la consulta o estudio de inmediato.
          </div>
        </div>
      </div>
    </div>
  );
};
