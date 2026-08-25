"use client";

import React from 'react';
import { Header } from '@/components/Header';
import { VademecumAnticonceptivos } from '@/components/VademecumAnticonceptivos';
import { Footer } from '@/components/Footer';

export default function VademecumAnticonceptivosPage() {
  return (
    <div className="min-h-screen text-slate-900 font-sans flex flex-col antialiased selection:bg-blue-600 selection:text-white relative bg-white">
      <Header activeTab="vademecum-anticonceptivos" />
      <main className="flex-1 relative z-10">
        <VademecumAnticonceptivos />
      </main>
      <Footer />
    </div>
  );
}
