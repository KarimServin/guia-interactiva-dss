"use client";

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CoseguroTableInline } from '@/components/CoseguroTableInline';
import { PageHeader } from '@/components/PageHeader';
import { Table } from 'lucide-react';

export default function TablaCosegurosPage() {
  return (
    <div className="min-h-screen text-slate-900 font-sans flex flex-col antialiased selection:bg-blue-600 selection:text-white relative bg-slate-50/60">
      <Header activeTab="coberturas-planes" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-6">
        <PageHeader
          badgeIcon={Table}
          badgeText="DSS • Aranceles y Planes"
          titlePrefix="Tabla de Planes y "
          titleHighlight="Coseguros"
          description={
            <>
              Consultá en tiempo real aranceles, porcentajes de cobertura y períodos de carencia comparativos entre el{' '}
              <strong className="text-slate-900 font-bold">Plan General</strong> y el{' '}
              <strong className="text-slate-900 font-bold">Plan Básico</strong> del DSS.
            </>
          }
          breadcrumbs={[
            { label: 'Inicio', href: '/' },
            { label: 'Coberturas', href: '/prestaciones' },
            { label: 'Planes y Coseguros' },
          ]}
        />

        {/* Dynamic Coseguro Comparative Table */}
        <CoseguroTableInline hideHeader={true} />
      </main>

      <Footer />
    </div>
  );
}
