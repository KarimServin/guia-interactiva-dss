'use client';

import { Suspense, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FormsCenter } from '@/components/FormsCenter';

export default function FormulariosPage() {
  const [activeTab, setActiveTab] = useState<string>('formularios');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header activeTab={activeTab} onSelectNav={setActiveTab} />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<div className="p-8 text-center text-slate-500">Cargando formularios...</div>}>
          <FormsCenter />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
