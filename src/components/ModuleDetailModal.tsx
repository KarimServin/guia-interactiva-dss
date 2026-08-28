"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ExternalLink,
  Info,
  BookOpen,
  MessageCircle,
  GripHorizontal,
} from 'lucide-react';

interface ModuleDetailModalProps {
  module: ActionModule | null;
  onClose: () => void;
  onOpenForm: (formId: string) => void;
  onQuickAction: (target: string) => void;
}

/* ─────────────────────────────────────────
   Link renderer helpers (unchanged logic)
───────────────────────────────────────── */
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
                ? "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all mx-1 no-underline shadow-sm"
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
      parts.push(...parsePlainUrls(text.substring(lastIndex, matchIndex)));
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
            ? "inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all mx-1 no-underline shadow-sm"
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
    parts.push(...parsePlainUrls(text.substring(lastIndex)));
  }
  return parts;
};

/* ─────────────────────────────────────────
   Tab pill component
───────────────────────────────────────── */
interface TabBtnProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}
const TabBtn: React.FC<TabBtnProps> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
      active
        ? 'bg-blue-600 text-white shadow-sm shadow-blue-300/40'
        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
    }`}
  >
    {icon}
    {label}
  </button>
);

/* ─────────────────────────────────────────
   Main Sheet component
───────────────────────────────────────── */
export const ModuleDetailModal: React.FC<ModuleDetailModalProps> = ({
  module,
  onClose,
  onOpenForm,
  onQuickAction,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'pasos' | 'faqs'>('info');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (module) {
      setActiveTab('info');
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }
  }, [module?.id]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    if (module) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [module]);

  if (!module) return null;

  const relatedForms = FORMS_DATA.filter(f =>
    module.details.relatedFormIds?.includes(f.id)
  );
  const hasSteps = !!(module.details.steps && module.details.steps.length > 0);
  const hasFaqs = !!(module.details.faqs && module.details.faqs.length > 0);

  /* ── Color accent per module ── */
  const accentColor =
    module.colorClass.text.includes('emerald') || module.colorClass.text.includes('green')
      ? 'from-emerald-600 to-teal-600'
      : module.colorClass.text.includes('amber') || module.colorClass.text.includes('orange')
      ? 'from-amber-500 to-orange-600'
      : module.colorClass.text.includes('purple') || module.colorClass.text.includes('violet')
      ? 'from-violet-600 to-purple-700'
      : 'from-blue-600 to-indigo-700';

  /* ── Shared content block ── */
  const content = (
    <>
      {/* ── Drag handle (mobile only) ── */}
      <div className="md:hidden flex justify-center pt-3 pb-1 shrink-0">
        <div className="w-10 h-1 rounded-full bg-slate-300" />
      </div>

      {/* ── Panel header ── */}
      <div className={`shrink-0 bg-gradient-to-r ${accentColor} px-5 pt-4 pb-5 md:pt-6 md:pb-6`}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md bg-white/20 text-white/90 mb-2">
              {module.title}
            </span>
            <h2 className="text-base md:text-lg font-extrabold text-white leading-snug tracking-tight">
              {module.verbTitle}
            </h2>
            <p className="text-[11px] text-white/70 mt-1 font-normal">
              DSS · CPCE Santa Fe · Cámara I
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/15 hover:bg-white/30 text-white transition-colors shrink-0 mt-0.5"
            aria-label="Cerrar panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab pills */}
        {(hasSteps || hasFaqs) && (
          <div className="flex gap-1.5 mt-4 flex-wrap">
            <TabBtn
              active={activeTab === 'info'}
              onClick={() => setActiveTab('info')}
              icon={<Info className="w-3.5 h-3.5" />}
              label="Info"
            />
            {hasSteps && (
              <TabBtn
                active={activeTab === 'pasos'}
                onClick={() => setActiveTab('pasos')}
                icon={<BookOpen className="w-3.5 h-3.5" />}
                label="Paso a Paso"
              />
            )}
            {hasFaqs && (
              <TabBtn
                active={activeTab === 'faqs'}
                onClick={() => setActiveTab('faqs')}
                icon={<MessageCircle className="w-3.5 h-3.5" />}
                label="FAQs"
              />
            )}
          </div>
        )}
      </div>

      {/* ── Scrollable body ── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain p-4 md:p-5 space-y-4">

        {/* TAB: Info */}
        {activeTab === 'info' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="space-y-4"
            >
              {module.details.summary && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <p className="text-xs text-slate-700 leading-relaxed font-medium whitespace-pre-line">
                    {renderTextWithLinks(module.details.summary)}
                  </p>
                </div>
              )}

              {module.details.highlights && module.details.highlights.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    Aspectos Clave
                  </h4>
                  <div className="space-y-2">
                    {module.details.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${accentColor} mt-1.5 shrink-0`} />
                        <span className="text-xs text-slate-700 font-medium leading-relaxed">
                          {renderTextWithLinks(item)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* App Download */}
              {module.details.appLinks && (
                <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 p-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="w-4 h-4 text-sky-400 shrink-0" />
                    <p className="text-xs font-bold text-white">Credencial Digital en tu Celular</p>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                    Descargá la app oficial para acceder a tu credencial digital y la de tu grupo familiar.
                  </p>
                  <div className="flex flex-col gap-2">
                    {module.details.appLinks.android && (
                      <a
                        href={module.details.appLinks.android}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all"
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
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Obtener para iOS
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Carencias Table */}
              {module.details.carenciasTable && module.details.carenciasTable.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    Períodos de Carencia
                  </h4>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                    <table className="w-full text-xs border-collapse min-w-[380px]">
                      <thead className="bg-slate-100 text-slate-600 font-bold">
                        <tr>
                          <th className="py-2.5 px-3 text-left">Prestación</th>
                          <th className="py-2.5 px-3 text-right">Carencia</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {module.details.carenciasTable.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="py-2.5 px-3 font-medium text-slate-800">{item.prestacion}</td>
                            <td className="py-2.5 px-3 text-right">
                              {item.carencia
                                ? <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold border border-blue-100">{item.carencia}</span>
                                : <span className="text-slate-400">—</span>
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Cobertura Table */}
              {module.details.coberturaTable && module.details.coberturaTable.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    Tabla de Coberturas
                  </h4>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                    <table className="w-full text-xs border-collapse min-w-[460px]">
                      <thead className="bg-slate-900 text-white font-bold">
                        <tr>
                          <th className="py-2.5 px-3 text-left">Prestación</th>
                          <th className="py-2.5 px-3 text-left">Descripción</th>
                          <th className="py-2.5 px-3 text-right">General</th>
                          <th className="py-2.5 px-3 text-right">Básico</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {module.details.coberturaTable.map((item, idx) => {
                          if (item.isHeader) {
                            return (
                              <tr key={idx} className="bg-slate-100/90">
                                <td colSpan={4} className="py-2 px-3 font-bold text-slate-600 text-[10px] uppercase tracking-wider">
                                  {item.prestacion}
                                </td>
                              </tr>
                            );
                          }
                          return (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="py-2.5 px-3 font-semibold text-slate-800">{item.prestacion}</td>
                              <td className="py-2.5 px-3 text-slate-500">{item.descripcion || '—'}</td>
                              <td className="py-2.5 px-3 text-right font-bold text-blue-700">{item.general || '—'}</td>
                              <td className="py-2.5 px-3 text-right font-bold text-indigo-700">{item.basico || '—'}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* TAB: Pasos */}
        {activeTab === 'pasos' && hasSteps && (
          <AnimatePresence mode="wait">
            <motion.div
              key="pasos"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="space-y-3"
            >
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <ListOrdered className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                Guía Paso a Paso
              </h4>
              {module.details.steps!.map((s, idx) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.2 }}
                  className="flex gap-3 p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-sm"
                >
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${accentColor} text-white font-extrabold flex items-center justify-center text-xs shrink-0 shadow-sm`}>
                    {s.step}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{s.title}</h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {renderTextWithLinks(s.desc)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* TAB: FAQs */}
        {activeTab === 'faqs' && hasFaqs && (
          <AnimatePresence mode="wait">
            <motion.div
              key="faqs"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="space-y-3"
            >
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                Preguntas Frecuentes
              </h4>
              {module.details.faqs!.map((faq, i) => (
                <AccordionFaq key={i} q={faq.q} a={faq.a} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Related Forms */}
        {relatedForms.length > 0 && (
          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              Formularios Relacionados
            </h4>
            <div className="space-y-2">
              {relatedForms.map(form => (
                <div key={form.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 p-3.5 bg-sky-50/80 rounded-xl border border-sky-100">
                  <div>
                    <p className="text-xs font-bold text-slate-800">{form.code}: {form.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{form.description}</p>
                  </div>
                  <button
                    onClick={() => { onClose(); onOpenForm(form.id); }}
                    className="w-full sm:w-auto flex items-center justify-center gap-1 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-bold transition-all shrink-0"
                  >
                    Ver
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Footer CTA ── */}
      {module.details.quickActionLabel && module.details.quickActionTarget && (
        <div className="shrink-0 p-4 bg-white border-t border-slate-100">
          <button
            onClick={() => { onClose(); onQuickAction(module.details.quickActionTarget!); }}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r ${accentColor} text-white text-sm font-bold transition-all shadow-md hover:opacity-90 active:scale-[0.98]`}
          >
            {module.details.quickActionLabel}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );

  return (
    <AnimatePresence>
      {module && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* ── MOBILE: Bottom Sheet ── */}
          <motion.div
            key="bottom-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38, mass: 0.8 }}
            className="md:hidden fixed bottom-0 inset-x-0 z-50 flex flex-col bg-white rounded-t-3xl shadow-2xl overflow-hidden"
            style={{ maxHeight: '92dvh' }}
          >
            {content}
          </motion.div>

          {/* ── DESKTOP: Right Side Drawer ── */}
          <motion.div
            key="side-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 36, mass: 0.9 }}
            className="hidden md:flex fixed right-0 top-0 bottom-0 z-50 flex-col bg-white shadow-2xl border-l border-slate-200/80 overflow-hidden"
            style={{ width: 'min(480px, 90vw)' }}
          >
            {content}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ─────────────────────────────────────────
   Accordion FAQ item
───────────────────────────────────────── */
const AccordionFaq: React.FC<{ q: string; a: string; index: number }> = ({ q, a, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.18 }}
      className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden"
    >
      <button
        className="w-full flex items-center justify-between gap-3 p-3.5 text-left hover:bg-slate-50 transition-colors"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        <div className="flex items-start gap-2">
          <HelpCircle className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
          <span className="text-xs font-bold text-blue-900 leading-snug">{q}</span>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-slate-400"
        >
          <ChevronRight className="w-4 h-4 rotate-90" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
              <div className="pt-3">{renderTextWithLinks(a)}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
