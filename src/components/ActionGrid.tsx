"use client";

import React from 'react';
import { ActionModule } from '../types';
import {
  Headphones,
  Stethoscope,
  Pill,
  ClipboardCheck,
  DollarSign,
  ShieldCheck,
  Users,
  CreditCard,
  ChevronRight,
  Sparkles,
  UserCheck,
  Baby,
  HeartPulse,
  Smile,
  BookOpen,
  Scale
} from 'lucide-react';

interface ActionGridProps {
  modules: ActionModule[];
  onSelectModule: (module: ActionModule) => void;
  filteredModuleId?: string | null;
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'UserCheck': return UserCheck;
    case 'Stethoscope': return Stethoscope;
    case 'Pill': return Pill;
    case 'ClipboardCheck': return ClipboardCheck;
    case 'DollarSign': return DollarSign;
    case 'ShieldCheck': return ShieldCheck;
    case 'Users': return Users;
    case 'CreditCard': return CreditCard;
    case 'Baby': return Baby;
    case 'HeartPulse': return HeartPulse;
    case 'Smile': return Smile;
    case 'BookOpen': return BookOpen;
    case 'Scale': return Scale;
    case 'Headphones': default: return Headphones;
  }
};

const getModuleBadgeStyle = (num: number) => {
  switch (num) {
    case 1: return { bg: 'bg-blue-50 text-blue-700 border-blue-100', iconBg: 'bg-blue-100 text-blue-700' };
    case 2: return { bg: 'bg-emerald-50 text-emerald-700 border-emerald-100', iconBg: 'bg-emerald-100 text-emerald-700' };
    case 3: return { bg: 'bg-sky-50 text-sky-700 border-sky-100', iconBg: 'bg-sky-100 text-sky-700' };
    case 4: return { bg: 'bg-indigo-50 text-indigo-700 border-indigo-100', iconBg: 'bg-indigo-100 text-indigo-700' };
    case 5: return { bg: 'bg-teal-50 text-teal-700 border-teal-100', iconBg: 'bg-teal-100 text-teal-700' };
    case 6: return { bg: 'bg-amber-50 text-amber-800 border-amber-100', iconBg: 'bg-amber-100 text-amber-800' };
    case 7: return { bg: 'bg-violet-50 text-violet-700 border-violet-100', iconBg: 'bg-violet-100 text-violet-700' };
    case 8: return { bg: 'bg-cyan-50 text-cyan-700 border-cyan-100', iconBg: 'bg-cyan-100 text-cyan-700' };
    case 9: return { bg: 'bg-rose-50 text-rose-700 border-rose-100', iconBg: 'bg-rose-100 text-rose-700' };
    case 10: return { bg: 'bg-pink-50 text-pink-700 border-pink-100', iconBg: 'bg-pink-100 text-pink-700' };
    default: return { bg: 'bg-blue-50 text-blue-700 border-blue-100', iconBg: 'bg-blue-100 text-blue-700' };
  }
};

export const ActionGrid: React.FC<ActionGridProps> = ({
  modules,
  onSelectModule,
  filteredModuleId,
}) => {
  return (
    <section id="servicios" className="relative pt-8 pb-16 sm:pt-10 sm:pb-20 scroll-mt-28 sm:scroll-mt-32 overflow-hidden bg-slate-50/60">
      {/* ─────────── BACKGROUND LAYER: Very Light Background + Subtle Blobs (Optimized with radial gradients) ─────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/80 to-blue-50/30 pointer-events-none" />
      <div className="pointer-events-none absolute -top-28 left-1/6 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-blue-200/40 to-transparent" />
      <div className="pointer-events-none absolute top-1/3 right-10 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-sky-200/40 to-transparent" />
      <div className="pointer-events-none absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-indigo-100/40 to-transparent" />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Central Separator Section */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2454B8] uppercase tracking-wider bg-blue-50/80 border border-blue-100/80 px-3 py-1 rounded-full backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#2454B8]" />
            Servicios y Gestión de Coberturas
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-3">
            ¿En qué te podemos ayudar hoy?
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1.5 max-w-xl mx-auto font-normal">
            Accedé a guías paso a paso, consultas de coseguro y solicitudes en línea.
          </p>
        </div>

        {/* The 8 Interactive Action Buttons Grid */}
        <div id="action-cards-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {modules.map((mod) => {
            const Icon = getIconComponent(mod.iconName);
            const isHighlighted = filteredModuleId === mod.id;
            const badgeStyle = getModuleBadgeStyle(mod.buttonNumber);

            return (
              <div
                key={mod.id}
                onClick={() => onSelectModule(mod)}
                className={`group bg-white/85 backdrop-blur-md p-6 rounded-2xl border border-white/90 shadow-[0_4px_24px_rgba(16,26,53,0.03)] hover:bg-white hover:border-[#93C5FD] hover:shadow-[0_10px_30px_rgba(36,84,184,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center justify-between text-center min-h-[200px] cursor-pointer ${isHighlighted ? 'ring-2 ring-blue-500 border-blue-500 bg-blue-50/40' : ''
                  }`}
              >
                <div className="flex flex-col items-center text-center w-full">
                  {/* Centered Icon Logo */}
                  <div className={`w-12 h-12 rounded-2xl ${badgeStyle.iconBg} flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#2454B8] group-hover:text-white transition-colors duration-300 mb-3.5`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Centered Verb Title */}
                  <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-[#2454B8] leading-snug mb-1 transition-colors text-center">
                    {mod.verbTitle}
                  </h3>

                  {/* Centered Subtitle */}
                  <p className="text-xs font-semibold text-sky-700 text-center">
                    {mod.title}
                  </p>
                </div>

                {/* Action Link Row Centered */}
                <div className="pt-3 border-t border-slate-200/50 flex items-center justify-center gap-1.5 w-full mt-4">
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-[#2454B8] transition-colors">
                    Consultar Trámite
                  </span>
                  <div className="w-5 h-5 rounded-full bg-slate-100/80 group-hover:bg-[#2454B8] group-hover:text-white flex items-center justify-center text-slate-500 transition-colors">
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


