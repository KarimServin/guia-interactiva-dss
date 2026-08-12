import React, { useState } from 'react';
import { ActionModule, FormItem } from '../types';
import { FORMS_DATA } from '../data/dssData';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  HelpCircle, 
  Send, 
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

interface ModuleDetailModalProps {
  module: ActionModule | null;
  onClose: () => void;
  onOpenForm: (formId: string) => void;
  onQuickAction: (target: string) => void;
}

export const ModuleDetailModal: React.FC<ModuleDetailModalProps> = ({
  module,
  onClose,
  onOpenForm,
  onQuickAction,
}) => {
  if (!module) return null;

  const [activeTab, setActiveTab] = useState<'info' | 'pasos' | 'faqs' | 'formularios'>('info');

  const relatedForms = FORMS_DATA.filter(f => 
    module.details.relatedFormIds?.includes(f.id)
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex items-start justify-between gap-4 relative">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-200 border border-slate-700">
                Módulo {module.buttonNumber}
              </span>
              <span className="text-xs font-semibold text-slate-300">
                {module.title}
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-white tracking-tight">
              {module.verbTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 font-normal">
              Guía de autogestión para afiliados del DSS CPCE Santa Fe • Cámara I
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="bg-slate-50 px-6 pt-3 border-b border-slate-200 flex items-center gap-4 text-xs font-semibold text-slate-700 overflow-x-auto">
          <button
            onClick={() => setActiveTab('info')}
            className={`pb-2.5 transition-all border-b-2 ${
              activeTab === 'info'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Resumen Cobertura
          </button>
          {module.details.steps && (
            <button
              onClick={() => setActiveTab('pasos')}
              className={`pb-2.5 transition-all border-b-2 ${
                activeTab === 'pasos'
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Paso a Paso
            </button>
          )}
          {module.details.faqs && (
            <button
              onClick={() => setActiveTab('faqs')}
              className={`pb-2.5 transition-all border-b-2 ${
                activeTab === 'faqs'
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Preguntas Frecuentes ({module.details.faqs.length})
            </button>
          )}
          {relatedForms.length > 0 && (
            <button
              onClick={() => setActiveTab('formularios')}
              className={`pb-2.5 transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === 'formularios'
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              Formularios ({relatedForms.length})
            </button>
          )}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: INFO & HIGHLIGHTS */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-100">
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                  {module.details.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  Aspectos Clave de la Cobertura
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {module.details.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <span className="text-xs text-slate-700 font-medium leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Forms quick widget */}
              {relatedForms.length > 0 && (
                <div className="p-5 bg-sky-50/80 rounded-2xl border border-sky-100">
                  <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-sky-600" />
                    Formularios relacionados
                  </h4>
                  <div className="space-y-2.5">
                    {relatedForms.map(form => (
                      <div key={form.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-sky-200/80 shadow-xs">
                        <div>
                          <p className="text-xs font-bold text-slate-800">{form.code}: {form.title}</p>
                          <p className="text-[11px] text-slate-500">{form.description}</p>
                        </div>
                        <button
                          onClick={() => {
                            onClose();
                            onOpenForm(form.id);
                          }}
                          className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                        >
                          Ver Formulario
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PASO A PASO */}
          {activeTab === 'pasos' && module.details.steps && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Guía de Tramitación Paso a Paso
              </h4>
              <div className="space-y-3">
                {module.details.steps.map(s => (
                  <div key={s.step} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm shrink-0 shadow-xs">
                      {s.step}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">
                        {s.title}
                      </h5>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FAQS */}
          {activeTab === 'faqs' && module.details.faqs && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Preguntas Frecuentes
              </h4>
              <div className="space-y-3">
                {module.details.faqs.map((faq, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                    <div className="flex items-start gap-2 text-blue-900 font-bold text-xs">
                      <HelpCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span>{faq.q}</span>
                    </div>
                    <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FORMULARIOS */}
          {activeTab === 'formularios' && relatedForms.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Formularios Disponibles
              </h4>
              {relatedForms.map(form => (
                <div key={form.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-blue-700 uppercase bg-blue-100/80 px-2.5 py-0.5 rounded-full">
                      {form.code}
                    </span>
                    <h5 className="text-xs font-bold text-slate-900 mt-1">{form.title}</h5>
                    <p className="text-xs text-slate-500 mt-0.5">{form.description}</p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenForm(form.id);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    Completar / Descargar
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer with Quick Action Button */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            Cerrar Ventana
          </button>

          {module.details.quickActionLabel && module.details.quickActionTarget && (
            <button
              onClick={() => {
                onClose();
                onQuickAction(module.details.quickActionTarget!);
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <span>{module.details.quickActionLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
