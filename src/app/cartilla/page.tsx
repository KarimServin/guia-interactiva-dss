import type { Metadata } from 'next';
import React from 'react';
import { Header } from '@/components/Header';
import { MedicalDirectory } from '@/components/MedicalDirectory';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Cartilla Médica y Prestadores',
  description: 'Buscador interactivo y listado completo de médicos, especialistas, sanatorios y centros de diagnóstico con cobertura del DSS CPCE Santa Fe.',
  alternates: {
    canonical: 'https://dss.contadores.org.ar/cartilla',
  },
};

export default function CartillaPage() {
  return (
    <div className="min-h-screen text-slate-900 font-sans flex flex-col antialiased selection:bg-blue-600 selection:text-white relative bg-white">
      <Header activeTab="cartilla" />
      <main className="flex-1 relative z-10">
        <MedicalDirectory />
      </main>
      <Footer />
    </div>
  );
}
