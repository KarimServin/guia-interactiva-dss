"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ActionGrid } from '@/components/ActionGrid';
import { ModuleDetailModal } from '@/components/ModuleDetailModal';
import { DigitalCredential } from '@/components/DigitalCredential';
import { MedicalDirectory } from '@/components/MedicalDirectory';
import { PharmacyDirectory } from '@/components/PharmacyDirectory';
import { FormsCenter } from '@/components/FormsCenter';
import { CoseguroTableModal } from '@/components/CoseguroTableModal';
import { AuthorizationSimulator } from '@/components/AuthorizationSimulator';
import { AffiliationLanding } from '@/components/AffiliationLanding';
import { CuotasValores } from '@/components/CuotasValores';
import { CoberturasPlanesView } from '@/components/CoberturasPlanesView';
import { Footer } from '@/components/Footer';

import { ACTION_MODULES, FORMS_DATA } from '@/data/dssData';
import { ActionModule } from '@/types';
import { Search, FileText, ClipboardCheck, ArrowRight, X, Headphones } from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>('guia');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();
  
  // Modals state
  const [selectedModule, setSelectedModule] = useState<ActionModule | null>(null);
  const [showCredentialModal, setShowCredentialModal] = useState<boolean>(false);
  const [showCoseguroModal, setShowCoseguroModal] = useState<boolean>(false);
  const [showAutorizadorModal, setShowAutorizadorModal] = useState<boolean>(false);
  const [targetFormForCenter, setTargetFormForCenter] = useState<string | null>(null);

  // Quick Action Handler inside Module Modal
  const handleQuickAction = (target: string) => {
    if (target.includes('tabla-coseguros')) {
      router.push('/tabla-coseguros');
      return;
    }
    if (target.startsWith('http')) {
      window.open(target, '_blank', 'noopener,noreferrer');
      return;
    }
    if (target === 'cartilla') {
      router.push('/cartilla');
    } else if (target === 'vademecum' || target === 'farmacias') {
      setActiveTab('cobertura-farmacias');
    } else if (target === 'formularios') {
      setActiveTab('formularios');
    } else if (target === 'autorizador') {
      setShowAutorizadorModal(true);
    } else if (target === 'coseguro-tabla') {
      router.push('/tabla-coseguros');
    }
  };

  // Card click in Hero Section
  const handleSelectCard = (cardId: string) => {
    if (cardId === 'que-es') {
      const mod = ACTION_MODULES.find(m => m.id === 'cobertura');
      if (mod) setSelectedModule(mod);
    } else if (cardId === 'soy-afiliado') {
      setShowCredentialModal(true);
    } else if (cardId === 'grupo-familiar') {
      const mod = ACTION_MODULES.find(m => m.id === 'grupofamiliar');
      if (mod) setSelectedModule(mod);
    }
  };

  // Global search match check
  const searchResultsModules = searchQuery.trim() ? ACTION_MODULES.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.verbTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.details.summary.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const searchResultsForms = searchQuery.trim() ? FORMS_DATA.filter(f => 
    f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const handleNavSelect = (navId: string) => {
    if (navId === 'guia') {
      setActiveTab('guia');
    } else if (navId === 'afiliacion') {
      setActiveTab('afiliacion');
    } else if (navId === 'cartilla') {
      router.push('/cartilla');
    } else if (navId === 'cuotas') {
      router.push('/cuotas');
    } else if (navId === 'formularios') {
      setActiveTab('formularios');
    } else {
      // Coberturas y Planes sub-tabs
      setActiveTab(navId);
      setTimeout(() => {
        const el = document.getElementById('coberturas-tab-content') || document.getElementById('coberturas-content');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  };

  return (
    <div 
      className="min-h-screen text-slate-900 font-sans flex flex-col antialiased selection:bg-blue-600 selection:text-white relative bg-white"
    >

      {/* Header */}
      <Header
        activeTab={activeTab}
        onSelectNav={handleNavSelect}
        onOpenCredential={() => setShowCredentialModal(true)}
      />

      {/* Main Body Content */}
      <main className="flex-1 relative z-10">
        
        {/* VIEW 1: GUÍA INTERACTIVA (Default) */}
        {activeTab === 'guia' && (
          <div>
            {/* Hero Banner */}
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onOpenCredential={() => setShowCredentialModal(true)}
              onSelectCard={handleSelectCard}
            />

            {/* If Search Query is Active: Search Results Overlay Panel */}
            {searchQuery.trim() !== '' && (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                    <Search className="w-5 h-5 text-orange-500" />
                    Resultados de búsqueda para &quot;{searchQuery}&quot;
                  </h3>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-orange-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Limpiar Búsqueda
                  </button>
                </div>

                {searchResultsModules.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Secciones y Guías Coincidentes ({searchResultsModules.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {searchResultsModules.map(m => (
                        <div
                          key={m.id}
                          onClick={() => setSelectedModule(m)}
                          className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md cursor-pointer transition-all flex items-center justify-between"
                        >
                          <div>
                            <span className="text-[10px] font-bold text-blue-700 uppercase bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                              {m.title}
                            </span>
                            <h5 className="font-bold text-slate-900 text-sm mt-1">{m.verbTitle}</h5>
                            <p className="text-xs text-slate-600 line-clamp-1">{m.shortDesc}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-blue-600 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {searchResultsForms.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Formularios Coincidentes ({searchResultsForms.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {searchResultsForms.map(f => (
                        <div
                          key={f.id}
                          onClick={() => {
                            setTargetFormForCenter(f.id);
                            setActiveTab('formularios');
                          }}
                          className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md cursor-pointer transition-all flex items-center justify-between"
                        >
                          <div>
                            <span className="text-[10px] font-bold text-slate-700 uppercase bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                              {f.code}
                            </span>
                            <h5 className="font-bold text-slate-900 text-sm mt-1">{f.title}</h5>
                            <p className="text-xs text-slate-600">{f.description}</p>
                          </div>
                          <FileText className="w-4 h-4 text-slate-600 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {searchResultsModules.length === 0 && searchResultsForms.length === 0 && (
                  <div className="p-8 bg-white rounded-2xl text-center border border-slate-200/80 shadow-2xs">
                    <p className="text-slate-600 text-xs font-medium">
                      No encontramos coincidencias exactas para &quot;{searchQuery}&quot;.
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* Interactive Action Buttons Grid (excluding banner & nav items) */}
            <ActionGrid
              modules={ACTION_MODULES.filter(m => m.id !== 'contacto' && m.id !== 'afiliacion')}
              onSelectModule={(mod) => setSelectedModule(mod)}
            />
            {/* Quick Access Floating Banners */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-4">
              {/* Banner 1: Autorización de Prácticas */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
                <div className="space-y-1 text-center md:text-left">
                  <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider">
                    Autorización de Prácticas
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                    ¿Necesitás autorizar un estudio o práctica médica?
                  </h3>
                  <p className="text-xs text-slate-300 max-w-xl font-normal leading-relaxed">
                    Consultá cuáles prácticas requieren autorización previa y la vía directa de WhatsApp para enviar tu indicación médica.
                  </p>
                </div>
                <button
                  onClick={() => setShowAutorizadorModal(true)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-2 active:scale-95"
                >
                  <ClipboardCheck className="w-4 h-4" />
                  Ver Información de Autorizaciones
                </button>
              </div>

              {/* Banner 2: Contacto y ayuda */}
              <div className="bg-white/80 backdrop-blur-md bg-gradient-to-r from-white via-orange-50/60 to-amber-50/80 rounded-2xl p-6 sm:p-8 shadow-sm border border-orange-200/70 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-orange-400/10 rounded-full blur-2xl pointer-events-none" />
                <div className="space-y-1.5 text-center md:text-left z-10">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 uppercase tracking-wider bg-orange-100/70 border border-orange-200/80 px-2.5 py-0.5 rounded-md">
                    Contacto y ayuda
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 max-w-2xl leading-snug">
                    Si aún no pudiste resolver tu duda o requerís una gestión asistida, nuestro equipo está a tu disposición.
                  </h3>
                </div>
                <a
                  href="https://wa.me/5493425105675"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="z-10 px-5 py-2.5 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold text-xs rounded-xl shadow-md hover:shadow-lg transition-all shrink-0 flex items-center gap-2 active:scale-95 cursor-pointer"
                >
                  <Headphones className="w-4 h-4" />
                  Contactar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: COBERTURAS Y PLANES */}
        {['coberturas-planes', 'subsidio-sepelios', 'sepelios', 'cobertura-odontologia', 'odontologia', 'chequeo-preventivo', 'medica', 'internaciones', 'materno', 'plan-materno', 'nutricion-celiacos', 'celiacos', 'nutricion', 'protesis', 'ortesis', 'farmacia', 'farmacias', 'cobertura-farmacias', 'cobertura-farmacia', 'vademecum-farmacias'].includes(activeTab) && (
          <CoberturasPlanesView 
            key={activeTab}
            initialSubTab={activeTab} 
            onOpenCosegurosModal={() => setShowCoseguroModal(true)}
            onGoToFormularios={(formId) => {
              if (formId) setTargetFormForCenter(formId);
              setActiveTab('formularios');
            }}
          />
        )}

        {/* VIEW 2: ¿CÓMO AFILIARME? LANDING VIEW */}
        {activeTab === 'afiliacion' && (
          <AffiliationLanding 
            onGoToFormularios={(formId) => {
              if (formId) setTargetFormForCenter(formId);
              setActiveTab('formularios');
            }}
          />
        )}

        {/* VIEW 3: CARTILLA MÉDICA */}
        {activeTab === 'cartilla' && (
          <MedicalDirectory />
        )}

        {/* VIEW 3: FARMACIAS Y MEDICAMENTOS */}
        {activeTab === 'vademecum' && (
          <PharmacyDirectory />
        )}

        {/* VIEW 4: DESCARGA DE FORMULARIOS */}
        {activeTab === 'formularios' && (
          <FormsCenter initialFormId={targetFormForCenter} />
        )}

        {/* VIEW 5: CUOTAS Y VALORES */}
        {activeTab === 'cuotas' && (
          <CuotasValores />
        )}

      </main>

      {/* Footer */}
      <Footer />

      {/* 1. Module Detail Sheet (Bottom Sheet mobile / Side Drawer desktop) */}
      <ModuleDetailModal
        module={selectedModule}
        onClose={() => setSelectedModule(null)}
        onOpenForm={(formId) => {
          setTargetFormForCenter(formId);
          setActiveTab('formularios');
        }}
        onQuickAction={handleQuickAction}
      />

      {/* 2. Digital Credential Modal (keeps overlay style for now) */}
      {showCredentialModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="w-full max-w-4xl my-auto">
            <DigitalCredential onClose={() => setShowCredentialModal(false)} />
          </div>
        </div>
      )}

      {/* 3. Coseguros Sheet */}
      <CoseguroTableModal
        isOpen={showCoseguroModal}
        onClose={() => setShowCoseguroModal(false)}
      />

      {/* 4. Authorization Simulator Sheet */}
      <AuthorizationSimulator
        isOpen={showAutorizadorModal}
        onClose={() => setShowAutorizadorModal(false)}
      />

    </div>
  );
}
