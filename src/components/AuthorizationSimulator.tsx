import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { ClipboardCheck, Upload, CheckCircle2, Clock, FileText, Download, ArrowRight, ShieldAlert, Sparkles, X } from 'lucide-react';

interface AuthorizationSimulatorProps {
  onClose?: () => void;
}

export const AuthorizationSimulator: React.FC<AuthorizationSimulatorProps> = ({ onClose }) => {
  const [matricula, setMatricula] = useState('14520');
  const [paciente, setPaciente] = useState('MARIA LAURA GOMEZ');
  const [practica, setPractica] = useState('Resonancia Magnética de Rodilla Derecha con Contraste');
  const [medico, setMedico] = useState('Dr. Carlos Benitez (M.P. 4812)');
  const [sanatorio, setSanatorio] = useState('Sanatorio Garay / Centro de Diagnóstico Santa Fe');
  const [fileAttached, setFileAttached] = useState<string | null>('orden_medica_escaneada.pdf');
  const [submitted, setSubmitted] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `AUT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setTrackingCode(code);
    setSubmitted(true);
  };

  const handleDownloadVoucher = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a5'
    });

    doc.setFillColor(30, 58, 138); // blue-900
    doc.rect(0, 0, 148, 22, 'F');

    doc.setFillColor(14, 165, 233); // sky-500
    doc.rect(0, 22, 148, 1.5, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('CPCE SANTA FE - CAMARA I', 10, 9);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text('DEPARTAMENTO DE SERVICIOS SOCIALES (DSS)', 10, 15);

    doc.setTextColor(30, 58, 138);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`COMPROBANTE DE AUTORIZACION`, 10, 32);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`CODIGO DE SEGUIMIENTO: ${trackingCode}`, 10, 40);

    doc.setDrawColor(203, 213, 225);
    doc.line(10, 43, 138, 43);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`Matrícula Titular: ${matricula}`, 10, 50);
    doc.text(`Paciente: ${paciente.toUpperCase()}`, 10, 56);
    doc.text(`Práctica Autorizada: ${practica}`, 10, 62);
    doc.text(`Médico Prescriptor: ${medico}`, 10, 68);
    doc.text(`Centro de Atención: ${sanatorio}`, 10, 74);

    doc.setFillColor(224, 242, 254);
    doc.rect(10, 82, 128, 10, 'F');
    doc.setTextColor(30, 58, 138);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('ESTADO: REVISION DE AUDITORIA MEDICA (24-48 HS)', 14, 88);

    doc.save(`Autorizacion_DSS_${trackingCode}.pdf`);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-w-3xl mx-auto my-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-600 text-white flex items-center justify-center font-bold shadow-md">
            <ClipboardCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Solicitud de Autorización Online</h3>
            <p className="text-xs text-slate-500">
              Trámite digital para prácticas médicas, odontología y estudios de alta complejidad
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

      {submitted ? (
        <div className="text-center py-8 space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10 text-blue-600" />
          </div>

          <div>
            <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
              Solicitud Registrada
            </span>
            <h4 className="text-2xl font-extrabold text-slate-900 mt-3">
              Código de Trámite: <span className="text-blue-600 font-mono">{trackingCode}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed font-normal">
              La orden médica fue ingresada al sistema de Auditoría Médica del DSS. El plazo promedio de resolución es de 24 a 48 hs hábiles.
            </p>
          </div>

          {/* Timeline */}
          <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/80 max-w-md mx-auto text-left space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</div>
              <div>
                <p className="text-xs font-bold text-slate-900">Solicitud Recibida</p>
                <p className="text-[11px] text-slate-500">Documentación digitalizada recibida</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-sky-400 text-slate-950 flex items-center justify-center text-xs font-extrabold animate-pulse">2</div>
              <div>
                <p className="text-xs font-bold text-blue-600">En Revisión de Auditoría Médica</p>
                <p className="text-[11px] text-slate-500">Verificando normas de la cartilla DSS</p>
              </div>
            </div>
            <div className="flex items-center gap-3 opacity-50">
              <div className="w-7 h-7 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center text-xs font-bold">3</div>
              <div>
                <p className="text-xs font-bold text-slate-900">Aprobación y Emisión de Orden</p>
                <p className="text-[11px] text-slate-500">Notificación por e-mail y WhatsApp</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={handleDownloadVoucher}
              className="py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-full shadow-lg transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-sky-200" />
              Descargar Comprobante (PDF)
            </button>
            <button
              onClick={() => setSubmitted(false)}
              className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-full border border-slate-200 transition-colors"
            >
              Nueva Solicitud
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                N° de Matrícula Titular
              </label>
              <input
                type="text"
                required
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nombre del Paciente
              </label>
              <input
                type="text"
                required
                value={paciente}
                onChange={(e) => setPaciente(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Práctica o Estudio Solicitado
            </label>
            <input
              type="text"
              required
              value={practica}
              onChange={(e) => setPractica(e.target.value)}
              placeholder="Ej. Resonancia Magnética de Columna, Ecocardiograma"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Médico Prescriptor y M.P.
              </label>
              <input
                type="text"
                required
                value={medico}
                onChange={(e) => setMedico(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sanatorio / Centro Médico Elegido
              </label>
              <input
                type="text"
                required
                value={sanatorio}
                onChange={(e) => setSanatorio(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Upload Mock Box */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Adjuntar Foto u Orden Médica Digitalizada
            </label>
            <div className="border-2 border-dashed border-sky-300 bg-sky-50/50 rounded-2xl p-5 text-center cursor-pointer hover:bg-sky-50 transition-colors">
              <Upload className="w-7 h-7 text-sky-600 mx-auto mb-1.5" />
              <p className="text-xs font-bold text-blue-900">
                {fileAttached ? `Archivo adjunto: ${fileAttached}` : 'Hacé clic para seleccionar la orden médica (JPG, PNG, PDF)'}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">Asegurate que la firma y diagnóstico del médico sean legibles</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-full shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
          >
            <span>Enviar Solicitud a Auditoría Médica</span>
            <ArrowRight className="w-4 h-4 text-sky-200" />
          </button>
        </form>
      )}
    </div>
  );
};
