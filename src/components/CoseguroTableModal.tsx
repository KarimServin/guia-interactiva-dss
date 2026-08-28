"use client";

import React from 'react';
import { COSEGUROS_TABLE } from '../data/dssData';
import { X, DollarSign, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

interface CoseguroTableModalProps {
  onClose: () => void;
}

export const CoseguroTableModal: React.FC<CoseguroTableModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 w-full max-w-3xl overflow-hidden my-auto max-h-[92vh] sm:max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white p-4 sm:p-6 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 sm:py-1 rounded-full bg-sky-400/20 text-sky-200 border border-sky-300/30">
                Valores Oficiales DSS
              </span>
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
              Tabla Informativa de Coseguros
            </h3>
            <p className="text-[11px] sm:text-xs text-sky-200 mt-0.5">
              CPCE Santa Fe • Cámara I • Sistema Solidario de Salud
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all shrink-0"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 flex-1 overflow-y-auto">
          <div className="p-4 sm:p-5 bg-sky-50/80 rounded-2xl border border-sky-100 text-xs text-blue-950 leading-relaxed space-y-2">
            <p className="font-bold flex items-center gap-2 text-blue-900 text-xs sm:text-sm">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 shrink-0" />
              ¿Cómo funciona el coseguro?
            </p>
            <p className="text-slate-700 text-xs">
              Cuando una práctica es autorizada, el DSS cubre el porcentaje correspondiente según el plan y el saldo restante se incorpora automáticamente a la cuenta corriente del afiliado.
            </p>
            <p className="text-blue-900 font-semibold bg-white/90 p-3 rounded-xl border border-sky-200/80 text-xs">
              Importante: no es necesario abonar importes en clínicas, sanatorios o centros médicos al momento de realizar la prestación. El coseguro se liquida junto con la cuota mensual siguiente.
            </p>
            <div className="text-slate-600 text-[11px] pt-1">
              <span className="font-bold text-slate-800">Ejemplo: una ecografía</span><br />
              • Plan General - cobertura del 70%<br />
              • Plan Básico - cobertura del 60%<br />
              La diferencia restante se registra como coseguro.
            </div>
          </div>

          <div className="border border-slate-200/80 rounded-2xl overflow-x-auto shadow-xs">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
                  <th className="p-3 sm:p-3.5">Práctica / Atención</th>
                  <th className="p-3 sm:p-3.5">Valor Coseguro</th>
                  <th className="p-3 sm:p-3.5">Modalidad de Cobro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-800 font-normal">
                {COSEGUROS_TABLE.map((row, idx) => (
                  <tr key={idx} className={row.coseguro.includes('$0') ? 'bg-sky-50/60 font-semibold' : 'hover:bg-slate-50/80'}>
                    <td className="p-3 sm:p-3.5 font-semibold text-slate-900">{row.practica}</td>
                    <td className="p-3 sm:p-3.5 font-bold text-blue-600">{row.coseguro}</td>
                    <td className="p-3 sm:p-3.5 text-slate-600">
                      <div>{row.cobro}</div>
                      <span className="text-[11px] text-slate-400">{row.nota}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full text-xs font-bold transition-all shadow-md text-center"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};
