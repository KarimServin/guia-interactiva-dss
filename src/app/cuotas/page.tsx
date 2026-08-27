"use client";

import React from 'react';
import { Header } from '@/components/Header';
import { CuotasValores } from '@/components/CuotasValores';
import { Footer } from '@/components/Footer';

export default function CuotasPage() {
  return (
    <div className="min-h-screen text-slate-900 font-sans flex flex-col antialiased selection:bg-blue-600 selection:text-white relative bg-white">
      <Header activeTab="cuotas" />
      <main className="flex-1 relative z-10">
        <CuotasValores />
      </main>
      <Footer />
    </div>
  );
}
