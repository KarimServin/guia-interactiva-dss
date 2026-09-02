"use client";

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CoseguroTableInline } from '@/components/CoseguroTableInline';
import { Sparkles, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TablaCosegurosPage() {
  return (
    <div className="min-h-screen text-slate-900 font-sans flex flex-col antialiased selection:bg-blue-600 selection:text-white relative bg-slate-50/60">
      <Header activeTab="coberturas-planes" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
        
        {/* HERO BANNER */}
        <div className="relative bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl overflow-hidden border border-blue-800/40">
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="flex items-center gap-3">
              <Link 
                href="/?tab=coberturas-planes"
                className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-all border border-white/10 font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver a Coberturas y Planes</span>
              </Link>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Departamento de Servicios Sociales</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Tabla de Planes y Coseguros
            </h1>

            <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl">
              Consultá en tiempo real aranceles, porcentajes de cobertura y períodos de carencia comparativos entre el <strong className="text-white font-bold">Plan General</strong> y el <strong className="text-white font-bold">Plan Básico</strong> del DSS.
            </p>
          </div>
        </div>

        {/* Dynamic Coseguro Comparative Table */}
        <CoseguroTableInline />

      </main>

      <Footer />
    </div>
  );
}
