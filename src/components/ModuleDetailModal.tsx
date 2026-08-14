"use client";

import React from 'react';
import { ActionModule } from '../types';
import { FORMS_DATA } from '../data/dssData';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  HelpCircle, 
  ChevronRight,
  ListOrdered,
  Clock,
  Smartphone,
  Download,
  ExternalLink
} from 'lucide-react';

interface ModuleDetailModalProps {
  module: ActionModule | null;
  onClose: () => void;
  onOpenForm: (formId: string) => void;
  onQuickAction: (target: string) => void;
}

const parsePlainUrls = (text: string): (string | React.ReactNode)[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const rawParts = text.split(urlRegex);

  return rawParts.map((part, index) => {
    if (part.match(/^https?:\/\//)) {
      let cleanUrl = part;
      let trailingPunct = '';
      if (/[.,)]$/.test(cleanUrl)) {
        trailingPunct = cleanUrl.slice(-1);
        cleanUrl = cleanUrl.slice(0, -1);
      }

      const isWa = cleanUrl.includes('wa.me');

      return (
        <React.Fragment key={index}>
          <a
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={
              isWa
                ? "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all mx-1 no-underline shadow-2xs"
                : "text-blue-600 hover:text-blue-800 underline font-semibold break-all inline-flex items-center gap-1 transition-colors mx-0.5"
            }
          >
            {isWa ? 'Contactar por WhatsApp' : cleanUrl}
            <ExternalLink className="w-3 h-3 inline shrink-0" />
          </a>
          {trailingPunct}
        </React.Fragment>
      );
    }
    return part;
  });
};

const renderTextWithLinks = (text: string) => {
  if (!text) return null;

  const mdLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = mdLinkRegex.exec(text)) !== null) {
    const [fullMatch, anchorText, url] = match;
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      const plainText = text.substring(lastIndex, matchIndex);
      parts.push(...parsePlainUrls(plainText));
    }

    const isWa = url.includes('wa.me');

    parts.push(
      <a
        key={matchIndex}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={
          isWa
            ? "inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all mx-1 no-underline shadow-2xs"
            : "text-blue-600 hover:text-blue-800 underline font-semibold inline-flex items-center gap-1 transition-colors mx-0.5"
        }
      >
        {anchorText}
        <ExternalLink className="w-3 h-3 inline shrink-0" />
      </a>
    );

    lastIndex = matchIndex + fullMatch.length;
  }

  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    parts.push(...parsePlainUrls(remainingText));
  }

  return parts;
};

export const ModuleDetailModal: React.FC<ModuleDetailModalProps> = ({
  module,
  onClose,
  onOpenForm,
  onQuickAction,
}) => {
  if (!module) return null;

  const relatedForms = FORMS_DATA.filter(f => 
    module.details.relatedFormIds?.includes(f.id)
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex items-start justify-between gap-4 relative">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-slate-800 text-sky-300 border border-slate-700">
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

        {/* Modal Body Content (Continuous Scrolling Flow) */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Summary Box */}
          <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-100">
            <p className="text-sm text-slate-800 leading-relaxed font-medium whitespace-pre-line">
              {renderTextWithLinks(module.details.summary)}
            </p>
          </div>

          {/* Highlights */}
          {module.details.highlights && module.details.highlights.length > 0 && (
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
                      {renderTextWithLinks(item)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* App Download Buttons */}
          {module.details.appLinks && (
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-blue-600" />
                Descargar App Institucional del Consejo
              </h4>
              <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                <div>
                  <p className="text-sm font-bold text-white mb-1">
                    Credencial Digital DSS en tu Celular
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Descargá la aplicación oficial para acceder a tu credencial digital y la de tu grupo familiar.
                  </p>
                </div>
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 w-full sm:w-auto">
                  {module.details.appLinks.android && (
                    <a
                      href={module.details.appLinks.android}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Obtener para Android
                    </a>
                  )}
                  {module.details.appLinks.ios && (
                    <a
                      href={module.details.appLinks.ios}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Obtener para iOS
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Carencias Table */}
          {module.details.carenciasTable && module.details.carenciasTable.length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                Períodos de Carencia (Grupo Familiar)
              </h4>
              <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
                <div className="max-h-80 overflow-y-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100/80 text-slate-700 sticky top-0 font-bold border-b border-slate-200/80">
                      <tr>
                        <th className="py-2.5 px-4">Prestación / Servicio</th>
                        <th className="py-2.5 px-4 text-right">Período de Carencia</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {module.details.carenciasTable.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-2.5 px-4 font-medium text-slate-800">{item.prestacion}</td>
                          <td className="py-2.5 px-4 text-right font-bold text-blue-700">
                            {item.carencia ? (
                              <span className="inline-block bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-100">
                                {item.carencia}
                              </span>
                            ) : (
                              <span className="text-slate-400 font-normal">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Cobertura Table */}
          {module.details.coberturaTable && module.details.coberturaTable.length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Tabla Detallada de Coberturas y Planes
              </h4>
              <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
                <div className="max-h-96 overflow-y-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-900 text-white sticky top-0 font-bold z-10">
                      <tr>
                        <th className="py-3 px-4">Prestación</th>
                        <th className="py-3 px-4">Descripción</th>
                        <th className="py-3 px-4 text-right">Plan General</th>
                        <th className="py-3 px-4 text-right">Plan Básico</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {module.details.coberturaTable.map((item, idx) => {
                        if (item.isHeader) {
                          return (
                            <tr key={idx} className="bg-slate-100/90 font-bold text-slate-900">
                              <td colSpan={4} className="py-2.5 px-4 uppercase tracking-wider text-[11px] border-y border-slate-200">
                                {item.prestacion}
                              </td>
                            </tr>
                          );
                        }
                        return (
                          <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-2.5 px-4 font-semibold text-slate-800">{item.prestacion}</td>
                            <td className="py-2.5 px-4 text-slate-500 leading-normal">{item.descripcion || '-'}</td>
                            <td className="py-2.5 px-4 text-right font-bold text-blue-700">{item.general || '-'}</td>
                            <td className="py-2.5 px-4 text-right font-bold text-indigo-700">{item.basico || '-'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Step-by-Step Guide */}
          {module.details.steps && module.details.steps.length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-blue-600" />
                Guía de Tramitación Paso a Paso
              </h4>
              <div className="space-y-3">
                {module.details.steps.map(s => (
                  <div key={s.step} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs shrink-0 shadow-xs">
                      {s.step}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">
                        {s.title}
                      </h5>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed whitespace-pre-line">
                        {renderTextWithLinks(s.desc)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Frequently Asked Questions */}
          {module.details.faqs && module.details.faqs.length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-sky-600" />
                Preguntas Frecuentes
              </h4>
              <div className="space-y-3">
                {module.details.faqs.map((faq, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 shadow-2xs space-y-1.5">
                    <div className="flex items-start gap-2 text-blue-900 font-bold text-xs">
                      <HelpCircle className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                      <span>{faq.q}</span>
                    </div>
                    <p className="text-xs text-slate-600 pl-5 leading-relaxed font-normal">
                      {renderTextWithLinks(faq.a)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Forms */}
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
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-bold transition-all shadow-xs flex items-center gap-1 shrink-0"
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
