'use client';

import { Suspense, useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CoberturasPlanesView } from '@/components/CoberturasPlanesView';

export default function PrestacionDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'planes';
  const [activeTab, setActiveTab] = useState<string>('coberturas-planes');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header activeTab={activeTab} onSelectNav={setActiveTab} />
      <main className="flex-grow pt-8 pb-16">
        <Suspense fallback={<div className="p-8 text-center text-slate-500">Cargando prestación...</div>}>
          <CoberturasPlanesView initialSubTab={slug} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
