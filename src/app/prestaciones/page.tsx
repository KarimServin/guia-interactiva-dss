'use client';

import { Suspense, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CoberturasPlanesView } from '@/components/CoberturasPlanesView';

export default function PrestacionesPage() {
  const [activeTab, setActiveTab] = useState<string>('coberturas-planes');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header activeTab={activeTab} onSelectNav={setActiveTab} />
      <main className="flex-grow pt-8 pb-16">
        <Suspense fallback={<div className="p-8 text-center text-slate-500">Cargando prestaciones...</div>}>
          <CoberturasPlanesView initialSubTab="planes" />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
