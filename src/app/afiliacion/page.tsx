import type { Metadata } from 'next';
import React from 'react';
import { Header } from '@/components/Header';
import { AffiliationLanding } from '@/components/AffiliationLanding';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Afiliación y Normativa de Alta',
  description: 'Requisitos, documentación, categorías y preguntas frecuentes para la afiliación de titulares y grupo familiar al Departamento de Servicios Sociales (DSS) CPCE Santa Fe.',
  alternates: {
    canonical: 'https://dss.contadores.org.ar/afiliacion',
  },
};

export default function AfiliacionPage() {
  return (
    <div className="min-h-screen text-slate-900 font-sans flex flex-col antialiased selection:bg-blue-600 selection:text-white relative bg-white">
      <Header activeTab="afiliacion" />
      <main className="flex-1 relative z-10">
        <AffiliationLanding />
      </main>
      <Footer />
    </div>
  );
}
