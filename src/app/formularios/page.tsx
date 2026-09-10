import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FormsCenter } from '@/components/FormsCenter';

export const metadata: Metadata = {
  title: 'Centro de Descarga de Formularios',
  description: 'Descargá formularios oficiales de afiliación, subsidios, tratamientos prolongados, fichas odontológicas y declaraciones juradas del DSS CPCE Santa Fe.',
  alternates: {
    canonical: 'https://dss.contadores.org.ar/formularios',
  },
};

export default function FormulariosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header activeTab="formularios" />
      <main className="flex-grow">
        <Suspense fallback={<div className="p-8 text-center text-slate-500">Cargando formularios...</div>}>
          <FormsCenter />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
