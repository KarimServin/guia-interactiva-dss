"use client";

import React, { useState } from 'react';
import { FORMS_DATA } from '../data/dssData';
import { 
  FileText, 
  Download, 
  Search, 
  Clock, 
  AlertCircle, 
  Filter
} from 'lucide-react';

interface FormsCenterProps {
  initialFormId?: string | null;
}

export const FormsCenter: React.FC<FormsCenterProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const categories = ['Todas', 'Afiliación', 'Grupo Familiar', 'Medicamentos', 'Autorizaciones', 'Reembolsos y Pagos', 'Subsidios'];

  const filteredForms = FORMS_DATA.filter(f => {
    const matchesSearch = f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 text-white shadow-md relative overflow-hidden border border-slate-800/80">
        <div className="absolute right-0 top-0 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-2.5 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-semibold text-sky-200">
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span>Repositorio Oficial de Documentos DSS</span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Formularios y Solicitudes Oficiales
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal">
            Descargá los formularios en formato PDF oficial para presentar en el Departamento de Servicios Sociales. 
            Podés completarlos en forma impresa o digitalmente y enviarlos por correo electrónico a <strong className="text-white">dss@cpn.org.ar</strong>.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar formulario por título o código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
            />
          </div>

          {/* Categories Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1 hidden sm:block" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredForms.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-slate-100 space-y-3">
            <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">No se encontraron formularios</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No hay documentos que coincidan con la búsqueda &quot;{searchTerm}&quot; en la categoría seleccionada.
            </p>
          </div>
        ) : (
          filteredForms.map(f => (
            <div 
              key={f.id} 
              id={f.id}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all flex flex-col justify-between space-y-5 group"
            >
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
                    Documentación Obligatoria a Acompañar:
                  </p>
                  <ul className="text-xs text-slate-600 space-y-1 pl-4 list-disc font-normal">
                    {f.requiredDocs.map((doc, idx) => (
                      <li key={idx}>{doc}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Download Action Button */}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href={f.fileUrl || `/formularios/${f.title}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="w-full py-3 px-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg active:scale-[0.99]"
                >
                  <Download className="w-4.5 h-4.5 text-sky-200 shrink-0" />
                  <span>Descargar Formulario PDF Oficial</span>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
