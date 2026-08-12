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
  Sparkles
} from 'lucide-react';

interface ActionGridProps {
  modules: ActionModule[];
  onSelectModule: (module: ActionModule) => void;
  filteredModuleId?: string | null;
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
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
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {modules.map((mod) => {
          const Icon = getIconComponent(mod.iconName);
          const isHighlighted = filteredModuleId === mod.id;
          const badgeStyle = getModuleBadgeStyle(mod.buttonNumber);

          return (
            <div
              key={mod.id}
              onClick={() => onSelectModule(mod)}
              className={`group bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-blue-400 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between h-64 cursor-pointer ${
                isHighlighted ? 'ring-2 ring-blue-500 border-blue-500 bg-blue-50/20' : ''
              }`}
            >
              <div>
                {/* Header Row with Icon & Badge */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className={`w-11 h-11 rounded-2xl ${badgeStyle.iconBg} flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badgeStyle.bg}`}>
                    Módulo {mod.buttonNumber}
                  </span>
                </div>

                {/* Verb Title */}
                <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-blue-700 leading-snug mb-1 transition-colors">
                  {mod.verbTitle}
                </h3>

                {/* Subtitle */}
                <p className="text-xs font-semibold text-sky-700 mb-2">
                  {mod.title}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 font-normal">
                  {mod.shortDesc}
                </p>
              </div>

              {/* Action Link Row */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">
                  Consultar Trámite
                </span>
                <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-slate-500 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};


