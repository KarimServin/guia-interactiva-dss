"use client";

import React, { useState } from 'react';
import { FORMS_DATA } from '../data/dssData';
import { FormItem } from '../types';
import { jsPDF } from 'jspdf';
import { 
  FileText, 
  Download, 
  PenTool, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  X, 
  Printer, 
  Copy, 
  Check,
  Send,
  Filter
} from 'lucide-react';

interface FormsCenterProps {
  initialFormId?: string | null;
}

export const FormsCenter: React.FC<FormsCenterProps> = ({ initialFormId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [activeFormModal, setActiveFormModal] = useState<FormItem | null>(
    initialFormId ? FORMS_DATA.find(f => f.id === initialFormId) || null : null
  );

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categories = ['Todas', 'Afiliación', 'Grupo Familiar', 'Medicamentos', 'Autorizaciones', 'Reembolsos y Pagos', 'Subsidios'];

  const filteredForms = FORMS_DATA.filter(f => {
    const matchesSearch = f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  // Generate Blank or Pre-filled PDF using jsPDF
  const generatePDF = (form: FormItem, isPrefilled = false) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Institutional Header
    doc.setFillColor(30, 58, 138); // blue-900
    doc.rect(0, 0, 210, 28, 'F');

    doc.setFillColor(14, 165, 233); // sky-500
    doc.rect(0, 28, 210, 2, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('CONSEJO PROFESIONAL DE CIENCIAS ECONOMICAS DE SANTA FE', 14, 12);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('CAMARA I - DEPARTAMENTO DE SERVICIOS SOCIALES (DSS)', 14, 18);
    doc.setFontSize(8);
    doc.text('San Jerónimo 3121, S3000 Santa Fe - Tel. (0342) 457-7000', 14, 23);

    // Form Code Badge
    doc.setTextColor(30, 58, 138);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`FORMULARIO: ${form.code}`, 14, 40);

    // Title
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(form.title.toUpperCase(), 14, 48);

    doc.setDrawColor(203, 213, 225);
    doc.line(14, 52, 196, 52);

    let currentY = 60;

    // Description
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const splitDesc = doc.splitTextToSize(`Finalidad: ${form.description}`, 180);
    doc.text(splitDesc, 14, currentY);
    currentY += splitDesc.length * 5 + 6;

    // If prefilled, display filled fields
    if (isPrefilled && form.fields) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, currentY, 182, 10 + form.fields.length * 10, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.rect(14, currentY, 182, 10 + form.fields.length * 10, 'D');

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text('DATOS DECLARADOS POR EL AFILIADO (AUTOGESTION DIGITAL):', 18, currentY + 7);
      currentY += 14;

      form.fields.forEach(field => {
        const val = formData[field.id] || '(No especificado)';
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(71, 85, 105);
        doc.text(`${field.label.toUpperCase()}:`, 18, currentY);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(15, 23, 42);
        doc.text(`${val}`, 80, currentY);
        currentY += 8;
      });

      currentY += 8;
    } else if (form.fields) {
      // Blank Form fields structure for manual handwriting
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text('CAMPOS A COMPLETAR POR EL AFILIADO:', 14, currentY);
      currentY += 8;

      form.fields.forEach(field => {
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(71, 85, 105);
        doc.text(`${field.label}:`, 14, currentY);
        doc.setDrawColor(148, 163, 184);
        doc.line(65, currentY, 196, currentY);
        currentY += 10;
      });
    }

    // Required Documents Box
    currentY += 6;
    doc.setFillColor(254, 243, 199); // amber-100
    doc.rect(14, currentY, 182, 22, 'F');
    doc.setDrawColor(251, 191, 36);
    doc.rect(14, currentY, 182, 22, 'D');

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(146, 64, 14);
    doc.text('DOCUMENTACION OBLIGATORIA A ADJUNTAR:', 18, currentY + 6);

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 53, 15);
    let docLineY = currentY + 11;
    form.requiredDocs.forEach(d => {
      doc.text(`• ${d}`, 20, docLineY);
      docLineY += 4.5;
    });

    // Signatures
    currentY += 45;
    doc.setDrawColor(148, 163, 184);
    doc.line(30, currentY, 90, currentY);
    doc.line(120, currentY, 180, currentY);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('Firma del Profesional Matriculado', 35, currentY + 5);
    doc.text('Sello y Recepción DSS CPCE Santa Fe', 123, currentY + 5);

    // Save PDF
    doc.save(`${form.code}_${isPrefilled ? 'Completado' : 'Oficial'}.pdf`);
  };

  const copyFormSummary = (form: FormItem) => {
    let summary = `*${form.code}: ${form.title}*\n`;
    summary += `Departamento de Servicios Sociales - CPCE Santa Fe Cámara I\n\n`;
    if (form.fields) {
      form.fields.forEach(f => {
        summary += `• *${f.label}:* ${formData[f.id] || 'No informado'}\n`;
      });
    }
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
        <span className="inline-block bg-sky-400/20 text-sky-200 border border-sky-300/30 text-xs font-semibold px-3 py-1 rounded-full mb-3 shadow-xs">
          Trámites y Autogestión
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
          Centro de Descarga de Formularios DSS
        </h2>
        <p className="text-sky-100/90 text-xs sm:text-sm max-w-2xl leading-relaxed font-normal">
          Accedé a todos los formularios oficiales del Departamento de Servicios Sociales. Podés descargarlos en blanco o completarlos directamente online para generar el PDF listo para firmar y presentar.
        </p>
      </div>

      {/* Search & Category Tabs */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-100 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por código, nombre o trámite (ej. 'FORM-02', 'familiar')..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Mostrando <strong className="text-blue-900 font-bold">{filteredForms.length}</strong> formularios
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-3 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-bold uppercase text-[10px] pr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Categoría:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-semibold text-xs whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredForms.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-100">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Sección de Formularios en Actualización</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-normal">
              Próximamente se subirán los formularios originales del Departamento de Servicios Sociales en formato PDF oficial.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-800 bg-sky-50 px-4 py-2 rounded-full border border-sky-100">
              <span>Para consultas o solicitudes urgentes, escribinos a: <strong>dss@cpn.org.ar</strong></span>
            </div>
          </div>
        ) : (
          filteredForms.map(f => (
            <div key={f.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all flex flex-col justify-between space-y-4 group">
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="inline-block px-3 py-1 bg-sky-50 text-blue-700 font-bold text-xs rounded-full border border-sky-100">
                    {f.code}
                  </span>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100/80 px-3 py-1 rounded-full border border-slate-200/60 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {f.estimatedDays}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-lg leading-snug mb-2 group-hover:text-blue-600 transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-normal">
                  {f.description}
                </p>

                {/* Required docs box */}
                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/60 space-y-1.5">
                  <p className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-sky-600" />
                    Documentación Obligatoria:
                  </p>
                  <ul className="text-xs text-slate-600 space-y-1 pl-4 list-disc font-normal">
                    {f.requiredDocs.map((doc, idx) => (
                      <li key={idx}>{doc}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action buttons */}
              <div className={`pt-4 border-t border-slate-100 ${f.isFillable ? 'grid grid-cols-1 sm:grid-cols-2 gap-2.5' : 'flex'}`}>
                {f.fileUrl ? (
                  <a
                    href={f.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className={`py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${f.isFillable ? '' : 'w-full'}`}
                  >
                    <Download className="w-4 h-4 text-sky-200" />
                    Descargar PDF Oficial
                  </a>
                ) : (
                  <button
                    onClick={() => generatePDF(f, false)}
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-semibold text-xs flex items-center justify-center gap-2 transition-all border border-slate-200/80"
                  >
                    <Download className="w-4 h-4 text-slate-500" />
                    Descargar en Blanco
                  </button>
                )}

                {f.isFillable && (
                  <button
                    onClick={() => {
                      setActiveFormModal(f);
                      setFormData({});
                      setSubmitted(false);
                    }}
                    className="py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <PenTool className="w-4 h-4 text-sky-200" />
                    Completar Online
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Interactive Form Fill Modal */}
      {activeFormModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-2xl overflow-hidden my-8">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white p-6 flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-400/20 text-sky-200 border border-sky-300/30">
                  {activeFormModal.code} • {activeFormModal.category}
                </span>
                <h3 className="text-xl font-extrabold text-white mt-2">
                  Completar {activeFormModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveFormModal(null)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields Body */}
            <div className="p-6 max-h-[65vh] overflow-y-auto space-y-4">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-10 h-10 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900">¡Formulario Generado con Éxito!</h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-normal">
                    Tus datos fueron procesados. Podés descargar el PDF completado listo para firmar, o copiar el resumen impreso para enviar por correo a <strong>dss@cpn.org.ar</strong>.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                    <button
                      onClick={() => generatePDF(activeFormModal, true)}
                      className="py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
                    >
                      <Download className="w-4 h-4 text-sky-200" />
                      Descargar PDF Completado
                    </button>

                    <button
                      onClick={() => copyFormSummary(activeFormModal)}
                      className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-semibold text-xs flex items-center gap-2 border border-slate-200 transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-sky-600" /> : <Copy className="w-4 h-4" />}
                      {copied ? '¡Copiado al Portapapeles!' : 'Copiar Resumen de Datos'}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xs text-blue-950 bg-sky-50/80 p-4 rounded-2xl border border-sky-100 leading-relaxed font-medium">
                    Ingresá la información requerida. Los datos ingresados se integrarán automáticamente en el formulario PDF descargable para presentar en el DSS.
                  </p>

                  {activeFormModal.fields?.map(field => (
                    <div key={field.id} className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-700">
                        {field.label} {field.required && <span className="text-rose-500">*</span>}
                      </label>

                      {field.type === 'select' ? (
                        <select
                          value={formData[field.id] || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all"
                        >
                          <option value="">Seleccionar opción...</option>
                          {field.options?.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          rows={3}
                          value={formData[field.id] || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all"
                        />
                      ) : (
                        <input
                          type={field.type}
                          value={formData[field.id] || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all"
                        />
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Modal Footer */}
            {!submitted && (
              <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveFormModal(null)}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Cancelar
                </button>

                <button
                  onClick={() => setSubmitted(true)}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full text-xs font-bold shadow-md flex items-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4 text-sky-200" />
                  Generar Formulario Final
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
