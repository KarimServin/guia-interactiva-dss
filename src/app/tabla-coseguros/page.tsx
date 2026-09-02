"use client";

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CoseguroTableInline } from '@/components/CoseguroTableInline';
import { Table } from 'lucide-react';

export default function TablaCosegurosPage() {
  return (
    <div className="min-h-screen text-slate-900 font-sans flex flex-col antialiased selection:bg-blue-600 selection:text-white relative bg-slate-50/60">
      <Header activeTab="coberturas-planes" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-300">
        
        {/* UNIFIED HERO HEADER */}
        <div className="relative bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl overflow-hidden border border-blue-800/40">
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight flex items-center gap-3">
              <Table className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400 shrink-0" />
              <span>Tabla de Planes y Coseguros</span>
            </h1>

            <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl pt-1">
              Consultá en tiempo real aranceles, porcentajes de cobertura y períodos de carencia comparativos entre el <strong className="text-white font-bold">Plan General</strong> y el <strong className="text-white font-bold">Plan Básico</strong> del DSS.
            </p>
          </div>
        </div>

        {/* Dynamic Coseguro Comparative Table (Header hidden to prevent duplication) */}
        <CoseguroTableInline hideHeader={true} />

      </main>

      <Footer />
    </div>
  );
}
