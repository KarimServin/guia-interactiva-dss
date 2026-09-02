"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
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
  ShieldCheck,
} from 'lucide-react';

interface ModuleDetailModalProps {
  module: ActionModule | null;
  onClose: () => void;
  onOpenForm?: (formId: string) => void;
  onQuickAction: (target: string) => void;
}

/* ─────────────────────────────────────────
   Link renderer helpers
───────────────────────────────────────── */
const parsePlainUrls = (text: string): (string | React.ReactNode)[] => {
  const urlRegex = /(https?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
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
                ? "inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all mx-1 no-underline shadow-xs"
                : "text-blue-600 hover:text-blue-800 underline font-semibold break-all inline-flex items-center gap-1 transition-colors mx-0.5"
            }
          >
            {isWa ? 'Contactar por WhatsApp' : cleanUrl}
            <ExternalLink className="w-3 h-3 inline shrink-0" />
          </a>
          {trailingPunct}
        </React.Fragment>
      );
    } else if (part.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      return (
        <a
          key={index}
          href={`mailto:${part}`}
          className="text-blue-600 hover:text-blue-800 underline font-semibold transition-colors mx-0.5"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

const renderTextWithLinks = (text: string) => {
  if (!text) return null;
  const mdLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+|mailto:[^\)]+)\)/g;
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
            ? "inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all mx-1 no-underline shadow-xs"
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
   Main Sheet component
───────────────────────────────────────── */
export const ModuleDetailModal: React.FC<ModuleDetailModalProps> = ({
  module,
  onClose,
  onOpenForm,
  onQuickAction,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const [fetchedCarencias, setFetchedCarencias] = useState<{ prestacion: string; carencia: string }[] | null>(null);

  useEffect(() => {
    if (module?.id === 'grupofamiliar' || module?.details?.carenciasTable) {
      fetch('/api/carencias')
        .then(res => res.json())
        .then(resData => {
          if (resData.success && Array.isArray(resData.data)) {
            setFetchedCarencias(resData.data);
          }
        })
        .catch(err => console.error('Error fetching /api/carencias:', err));
    }
  }, [module?.id]);

  useEffect(() => {
    if (module && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
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

  const carenciasToDisplay = (module.id === 'grupofamiliar' && fetchedCarencias)
    ? fetchedCarencias
    : module.details.carenciasTable;

  const hasSteps = !!(module.details.steps && module.details.steps.length > 0);
  const hasFaqs = !!(module.details.faqs && module.details.faqs.length > 0);

  const content = (
    <>
      {/* ── Drag Handle Bar (Mobile Drag Target) ── */}
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        className="md:hidden flex justify-center py-2.5 shrink-0 bg-sky-100/90 touch-none cursor-grab active:cursor-grabbing border-b border-sky-200/80"
      >
        <div className="w-12 h-1.5 rounded-full bg-slate-400/60 group-active:bg-slate-500 transition-colors" />
      </div>

      {/* ── Desktop Top Close Bar ── */}
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        className="hidden md:flex items-center justify-between px-6 py-3 bg-sky-100/90 shrink-0 touch-none border-b border-sky-200/80"
      >
        <div className="flex items-center gap-2 text-slate-800 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Información de Cobertura DSS</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-xl bg-white hover:bg-sky-200/60 text-slate-700 border border-sky-200/80 shadow-2xs transition-all cursor-pointer"
          aria-label="Cerrar panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* ── Panel Header: Celeste Claro Pastel y Suave ── */}
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        className="shrink-0 bg-gradient-to-r from-sky-50 via-blue-50/90 to-sky-100/80 border-b border-sky-200/80 px-6 py-5 md:py-6 cursor-grab active:cursor-grabbing touch-none select-none shadow-2xs"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1.5">
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-100/90 text-blue-800 border border-blue-200/80">
              {module.title}
            </span>
            <h2 className="text-lg md:text-xl font-extrabold text-slate-900 leading-snug tracking-tight">
              {module.verbTitle}
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              DSS · CPCE Santa Fe · Cámara I
            </p>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-xl bg-white hover:bg-sky-200/60 text-slate-700 border border-sky-200/80 shadow-2xs transition-colors shrink-0 mt-0.5 cursor-pointer"
            aria-label="Cerrar panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── PANEL BODY CONTENT: VISTA CONTINUA Y DE CORRIDA ── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain p-5 md:p-6 space-y-6 bg-slate-50/50">

        {/* 1. RESUMEN / SÍNTESIS GENERAL */}
        {module.details.summary && (
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-sky-100 shadow-2xs space-y-2">
            <h4 className="text-xs font-extrabold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-600 shrink-0" />
              Descripción General
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line">
              {renderTextWithLinks(module.details.summary)}
            </p>
          </div>
        )}

        {/* 2. ASPECTOS CLAVE */}
        {module.details.highlights && module.details.highlights.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Aspectos Clave
            </h4>
            <div className="space-y-2.5">
              {module.details.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed whitespace-pre-line">
                    {renderTextWithLinks(item)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. GUÍA PASO A PASO (DE CORRIDA) */}
        {hasSteps && (
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <ListOrdered className="w-4 h-4 text-blue-600 shrink-0" />
              Guía Paso a Paso
            </h4>
            <div className="space-y-3">
              {module.details.steps!.map((s) => (
                <div
                  key={s.step}
                  className="flex gap-3.5 p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs shrink-0 shadow-xs">
                    {s.step}
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900">{s.title}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {renderTextWithLinks(s.desc)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. PERÍODOS DE CARENCIA */}
        {carenciasToDisplay && carenciasToDisplay.length > 0 && (
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
              Períodos de Carencia (Grupo Familiar)
            </h4>
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs divide-y divide-slate-100 overflow-hidden">
              {carenciasToDisplay.map((item, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors">
                  <span className="text-xs font-semibold text-slate-800 leading-snug">
                    {item.prestacion}
                  </span>
                  <div className="shrink-0">
                    {item.carencia ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60 shadow-2xs">
                        {item.carencia}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        Sin carencia
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. TABLA DE COBERTURAS */}
        {module.details.coberturaTable && module.details.coberturaTable.length > 0 && (
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              Tabla de Coberturas
            </h4>
            
            {/* Mobile View: Fluid Cards */}
            <div className="sm:hidden space-y-2.5">
              {module.details.coberturaTable.map((item, idx) => {
                if (item.isHeader) {
                  return (
                    <div key={idx} className="bg-slate-800 text-white px-3 py-1.5 rounded-xl font-bold text-[10px] uppercase tracking-wider mt-3">
                      {item.prestacion}
                    </div>
                  );
                }
                return (
                  <div key={idx} className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900">{item.prestacion}</span>
                    </div>
                    {item.descripcion && (
                      <p className="text-[11px] text-slate-500 leading-snug">{item.descripcion}</p>
                    )}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                      <span className="text-[11px] text-slate-500">Plan General: <strong className="text-blue-700 font-bold">{item.general || '—'}</strong></span>
                      <span className="text-[11px] text-slate-500">Plan Básico: <strong className="text-indigo-700 font-bold">{item.basico || '—'}</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden sm:block overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
              <table className="w-full text-xs border-collapse min-w-[460px]">
                <thead className="bg-slate-800 text-white font-bold">
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
                        <tr key={idx} className="bg-slate-100">
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

        {/* 6. APP MOBILE DOWNLOAD (SI APLICA) */}
        {module.details.appLinks && (
          <div className="rounded-2xl bg-gradient-to-r from-sky-50 via-blue-50/90 to-sky-100/80 border border-sky-200/80 p-5 text-slate-800 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-blue-600 shrink-0" />
              <p className="text-xs sm:text-sm font-extrabold text-slate-900">Credencial Digital en tu Celular</p>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Descargá la app oficial para acceder a tu credencial digital y la de tu grupo familiar.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              {module.details.appLinks.android && (
                <a
                  href={module.details.appLinks.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-xs"
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
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-2xs font-bold text-xs transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  Obtener para iOS
                </a>
              )}
            </div>
          </div>
        )}

        {/* 7. PREGUNTAS FRECUENTES (DE CORRIDA) */}
        {hasFaqs && (
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
              Preguntas Frecuentes
            </h4>
            <div className="space-y-2.5">
              {module.details.faqs!.map((faq, i) => (
                <AccordionFaq key={i} q={faq.q} a={faq.a} index={i} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── FOOTER CTA (BOTÓN SUAVE Y ELEGANTE) ── */}
      {module.details.quickActionLabel && module.details.quickActionTarget && (
        <div className="shrink-0 p-4 bg-white border-t border-slate-200/80 shadow-md">
          <button
            onClick={() => { onClose(); onQuickAction(module.details.quickActionTarget!); }}
            className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-sky-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs sm:text-sm font-bold transition-all shadow-2xs active:scale-[0.98] cursor-pointer"
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
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* ── MOBILE: Bottom Sheet ── */}
          <motion.div
            key="bottom-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 40, mass: 0.8 }}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.8 }}
            onDragEnd={(_e, info) => {
              if (info.offset.y > 60 || info.velocity.y > 200) {
                onClose();
              }
            }}
            className="md:hidden fixed bottom-0 inset-x-0 z-50 flex flex-col bg-white rounded-t-[24px] shadow-2xl overflow-hidden"
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
            transition={{ type: 'spring', stiffness: 360, damping: 38, mass: 0.9 }}
            drag="x"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0, right: 0.8 }}
            onDragEnd={(_e, info) => {
              if (info.offset.x > 60 || info.velocity.x > 200) {
                onClose();
              }
            }}
            className="hidden md:flex fixed right-0 top-0 bottom-0 z-50 flex-col bg-white shadow-2xl border-l border-slate-200/80 overflow-hidden rounded-l-[24px]"
            style={{ width: 'min(520px, 90vw)' }}
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
    <div
      className="rounded-xl border border-slate-200/90 bg-white shadow-2xs overflow-hidden transition-colors"
    >
      <button
        className="w-full flex items-center justify-between gap-3 p-3.5 text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        <div className="flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">{q}</span>
        </div>
        <ChevronRight className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-90 text-blue-600' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
              {renderTextWithLinks(a)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
