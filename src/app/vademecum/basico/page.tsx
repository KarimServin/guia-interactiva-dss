"use client";

import React from 'react';
import { Header } from '@/components/Header';
import { VademecumBasico } from '@/components/VademecumBasico';
import { Footer } from '@/components/Footer';

export default function VademecumBasicoPage() {
  return (
    <div className="min-h-screen text-slate-900 font-sans flex flex-col antialiased selection:bg-blue-600 selection:text-white relative bg-white">
      <Header activeTab="vademecum-basico" />
      <main className="flex-1 relative z-10">
        <VademecumBasico />
      </main>
      <Footer />
    </div>
  );
}
