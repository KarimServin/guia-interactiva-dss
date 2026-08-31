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
  UserCheck
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
    case 8: default: return { bg: 'bg-blue-50 text-blue-700 border-blue-100', iconBg: 'bg-blue-100 text-blue-700' };
  }
};

export const ActionGrid: React.FC<ActionGridProps> = ({
  modules,
  onSelectModule,
  filteredModuleId,
}) => {
  return (
    <section id="servicios" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Central Separator Section */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
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

          return (
            <div
              key={mod.id}
              onClick={() => onSelectModule(mod)}
              className={`group relative bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 rounded-2xl border border-slate-700/80 shadow-md hover:shadow-xl hover:border-slate-500 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-between text-center min-h-[200px] cursor-pointer overflow-hidden ${
                isHighlighted ? 'ring-2 ring-sky-400 border-sky-400' : ''
              }`}
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-sky-500/10 rounded-full blur-xl pointer-events-none" />

              <div className="flex flex-col items-center text-center w-full relative z-10">
                {/* Centered Icon Logo */}
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-sky-300 border border-white/15 flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-white/20 group-hover:text-white group-hover:scale-105 transition-all duration-200 mb-3.5">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Centered Verb Title */}
                <h3 className="font-heading font-extrabold text-base text-white leading-snug mb-1 text-center">
                  {mod.verbTitle}
                </h3>

                {/* Centered Subtitle */}
                <p className="text-xs font-medium text-slate-300 text-center">
                  {mod.title}
                </p>
              </div>

              {/* Action Link Row Centered */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-1.5 w-full mt-4 relative z-10">
                <span className="text-xs font-semibold text-sky-300 group-hover:text-white transition-colors">
                  Consultar Trámite
                </span>
                <div className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};


