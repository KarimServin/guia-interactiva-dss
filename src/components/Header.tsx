"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MapPin, 
  Menu, 
  X, 
  ChevronDown,
  UserCheck,
  Users,
  Pill,
  FileText,
  CreditCard,
  Home,
  ShieldCheck,
  Activity,
  Layers,
  Heart
} from 'lucide-react';

interface HeaderProps {
  activeTab?: string;
  onSelectNav?: (navId: string) => void;
  onOpenCredential?: () => void;
  onOpenAssistant?: () => void;
}

const NAV_ITEMS = [
  { id: 'guia', label: 'Inicio', icon: Home },
  { id: 'afiliacion', label: '¿Cómo afiliarme?', icon: UserCheck },
  { id: 'coberturas-planes', label: 'Coberturas', icon: ShieldCheck },
  { id: 'cartilla', label: 'Cartilla Médica', icon: Users },
  { id: 'vademecum', label: 'Vademecum', icon: Pill },
  { id: 'formularios', label: 'Formularios', icon: FileText }
];

export const Header: React.FC<HeaderProps> = ({ activeTab = 'guia', onSelectNav }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVademecumDropdownOpen, setIsVademecumDropdownOpen] = useState(false);
  const [isMobileVademecumOpen, setIsMobileVademecumOpen] = useState(false);
  const [isCoberturasDropdownOpen, setIsCoberturasDropdownOpen] = useState(false);
  const [isMobileCoberturasOpen, setIsMobileCoberturasOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsPastHero(window.scrollY > 320);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubMenuClick = (subTabKey: string) => {
    setIsCoberturasDropdownOpen(false);
    setIsMobileMenuOpen(false);
    if (subTabKey === 'prestaciones') { router.push('/prestaciones'); return; }
    if (subTabKey === 'tabla-coseguros') { router.push('/tabla-coseguros'); return; }
    if (subTabKey === 'cuotas') { router.push('/cuotas'); return; }
    if (onSelectNav) onSelectNav(subTabKey);
    else router.push('/?tab=' + subTabKey);
    setTimeout(() => {
      const el = document.getElementById('coberturas-tab-content') || document.getElementById('coberturas-content');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const handleNavClick = (id: string) => {
    if (id === 'cartilla') router.push('/cartilla');
    else if (id === 'afiliacion') router.push('/afiliacion');
    else if (id === 'guia') router.push('/');
    else if (id === 'vademecum') { setIsVademecumDropdownOpen(!isVademecumDropdownOpen); return; }
    else if (id === 'coberturas-planes') { setIsCoberturasDropdownOpen(!isCoberturasDropdownOpen); return; }
    else if (id === 'cuotas') router.push('/cuotas');
    else if (id === 'formularios') router.push('/formularios');
    if (onSelectNav) onSelectNav(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Institutional top bar — soft muted light blue gradient with subtle transparency */}
      <div
        className="text-slate-700 text-[11px] sm:text-xs py-1.5 border-b border-blue-200/50 shadow-2xs backdrop-blur-xs"
        style={{
          background: 'linear-gradient(90deg, rgba(214, 229, 247, 0.85) 0%, rgba(200, 220, 242, 0.75) 45%, rgba(188, 212, 238, 0.8) 75%, rgba(205, 224, 245, 0.85) 100%)'
        }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-end gap-4 sm:gap-6">
          <a href="https://wa.me/5493425105675" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-800 hover:text-emerald-700 transition-colors font-semibold">
            <svg role="img" viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="#16a34a" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>(342) 510-5675</span>
          </a>
          <span className="hidden sm:flex items-center gap-1.5 text-slate-600 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>San Lorenzo 1849 – Santa Fe</span>
          </span>
        </div>
      </div>

      {/* Main navbar — subtle bluish gradient glass, extra transparent on mobile */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isPastHero
            ? 'bg-gradient-to-r from-white/30 via-blue-50/35 to-sky-50/25 md:from-white/95 md:via-blue-50/90 md:to-white/95 backdrop-blur-xs md:backdrop-blur-xl border-b border-blue-200/40 md:border-blue-100/80 shadow-xs md:shadow-md'
            : 'bg-gradient-to-b from-blue-50/25 via-sky-50/15 to-transparent md:bg-transparent backdrop-blur-xs md:backdrop-blur-md border-b border-transparent shadow-none'
        }`}
        style={
          !isPastHero
            ? { background: 'linear-gradient(180deg, rgba(238, 246, 255, 0.35) 0%, rgba(224, 238, 255, 0.12) 70%, rgba(255, 255, 255, 0) 100%)' }
            : undefined
        }>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] sm:h-[78px] flex items-center justify-between gap-4">
          
          {/* Logo */}
          <button onClick={() => handleNavClick('guia')} className="shrink-0 cursor-pointer focus:outline-none">
            <img src="/dss-logo.png" alt="DSS - Departamento de Servicios Sociales"
              className="h-11 sm:h-12 md:h-14 lg:h-[54px] w-auto object-contain block transition-all" />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1.5 ml-auto">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isVademecum = item.id === 'vademecum';
              const isCoberturas = item.id === 'coberturas-planes';
              const isActive = isVademecum
                ? activeTab.startsWith('vademecum') && activeTab !== 'vademecum-farmacias'
                : isCoberturas
                  ? ['coberturas-planes','subsidio-sepelios','sepelios','cobertura-odontologia','odontologia','chequeo-preventivo','vademecum-farmacias','cobertura-farmacias','farmacia','materno','nutricion-celiacos','protesis','tabla-coseguros','cuotas'].includes(activeTab)
                  : activeTab === item.id;

              const baseBtn = `relative flex items-center gap-2 px-3.5 lg:px-4 py-2.5 text-sm lg:text-[15px] font-bold rounded-xl transition-all duration-200 cursor-pointer group`;
              
              // Styles for Hero (semi-transparent white) vs Scrolled (solid white)
              const activeStyle = 'text-blue-700 bg-blue-50 border border-blue-200/80 shadow-xs';

              const inactiveStyle = isPastHero
                ? 'text-slate-700 hover:text-blue-700 hover:bg-slate-100/80'
                : 'text-slate-800 hover:text-blue-700 hover:bg-white/90';

              if (isCoberturas) {
                return (
                  <div key={item.id} className="relative"
                    onMouseEnter={() => setIsCoberturasDropdownOpen(true)}
                    onMouseLeave={() => setIsCoberturasDropdownOpen(false)}>
                    <button id="nav-coberturas-trigger"
                      onClick={() => handleNavClick(item.id)}
                      className={`${baseBtn} ${isActive ? activeStyle : inactiveStyle}`}>
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? (isPastHero ? 'text-blue-600' : 'text-white') : 'text-blue-600'}`} />
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCoberturasDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isCoberturasDropdownOpen && (
                      <div className="absolute top-full left-0 pt-2 w-64 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="bg-white/98 backdrop-blur-2xl border border-slate-200/80 rounded-2xl shadow-2xl shadow-slate-400/20 py-2 overflow-hidden">
                          {[
                            { key: 'prestaciones', icon: Activity, label: 'Listado de Prestaciones', color: 'text-blue-600', hover: 'hover:bg-blue-50 hover:text-blue-700' },
                            { key: 'tabla-coseguros', icon: Layers, label: 'Planes y Coseguros', color: 'text-indigo-600', hover: 'hover:bg-indigo-50 hover:text-indigo-700' },
                            { key: 'cuotas', icon: CreditCard, label: 'Valores de cuota', color: 'text-sky-600', hover: 'hover:bg-sky-50 hover:text-sky-700' },
                          ].map(({ key, icon: DI, label, color, hover }) => (
                            <button key={key} onClick={() => handleSubMenuClick(key)}
                              className={`w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 ${hover} transition-colors flex items-center gap-2.5 cursor-pointer`}>
                              <DI className={`w-4 h-4 shrink-0 ${color}`} />
                              <span>{label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              if (isVademecum) {
                return (
                  <div key={item.id} className="relative"
                    onMouseEnter={() => setIsVademecumDropdownOpen(true)}
                    onMouseLeave={() => setIsVademecumDropdownOpen(false)}>
                    <button id="nav-vademecum-trigger"
                      className={`${baseBtn} ${isActive ? activeStyle : inactiveStyle}`}>
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? (isPastHero ? 'text-blue-600' : 'text-white') : 'text-blue-600'}`} />
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isVademecumDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isVademecumDropdownOpen && (
                      <div className="absolute top-full left-0 pt-2 w-56 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="bg-white/98 backdrop-blur-2xl border border-slate-200/80 rounded-2xl shadow-2xl shadow-slate-400/20 py-2">
                          <button onClick={() => { router.push('/vademecum/basico'); setIsVademecumDropdownOpen(false); }}
                            className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-2.5 cursor-pointer">
                            <Pill className="w-4 h-4 text-blue-600 shrink-0" /><span>Vademécum Básico</span>
                          </button>
                          <button onClick={() => { router.push('/vademecum/anticonceptivos'); setIsVademecumDropdownOpen(false); }}
                            className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-700 transition-colors flex items-center gap-2.5 cursor-pointer">
                            <Heart className="w-4 h-4 text-rose-500 shrink-0" /><span>Anticonceptivos</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button key={item.id} onClick={() => handleNavClick(item.id)}
                  className={`${baseBtn} ${isActive ? activeStyle : inactiveStyle}`}>
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? (isPastHero ? 'text-blue-600' : 'text-white') : 'text-blue-600'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
            aria-label="Toggle Menu">
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (GPU-accelerated Grid transition for instantaneous 60fps response) */}
      <div className={`md:hidden grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
        isMobileMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
      }`}>
        <div className="overflow-hidden">
          <div className="bg-gradient-to-b from-white/65 via-blue-50/65 to-sky-50/60 backdrop-blur-md border-b border-blue-200/50 shadow-xl px-3 py-3 space-y-0.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isVademecum = item.id === 'vademecum';
              const isCoberturas = item.id === 'coberturas-planes';
              const isActive = isVademecum
                ? activeTab.startsWith('vademecum') && activeTab !== 'vademecum-farmacias'
                : isCoberturas
                  ? ['coberturas-planes','subsidio-sepelios','cobertura-odontologia','chequeo-preventivo','vademecum-farmacias','cobertura-farmacias','farmacia','materno','nutricion-celiacos','protesis','tabla-coseguros','cuotas'].includes(activeTab)
                  : activeTab === item.id;

              const mobileBase = `w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-all cursor-pointer`;
              const mobileActive = 'bg-blue-50 text-blue-700';
              const mobileInactive = 'text-slate-700 hover:bg-slate-50 hover:text-slate-900';

              if (isCoberturas) return (
                <div key={item.id}>
                  <button onClick={() => setIsMobileCoberturasOpen(!isMobileCoberturasOpen)}
                    className={`${mobileBase} ${isActive ? mobileActive : mobileInactive}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isActive ? 'bg-blue-100' : 'bg-slate-100'}`}>
                        <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                      </div>
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isMobileCoberturasOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isMobileCoberturasOpen && (
                    <div className="ml-11 mt-0.5 mb-1 space-y-0.5 animate-in fade-in duration-200">
                      {[
                        { key: 'prestaciones', icon: Activity, label: 'Listado de Prestaciones', color: 'text-blue-600' },
                        { key: 'tabla-coseguros', icon: Layers, label: 'Planes y Coseguros', color: 'text-indigo-600' },
                        { key: 'cuotas', icon: CreditCard, label: 'Valores de cuota', color: 'text-sky-600' },
                      ].map(({ key, icon: DI, label, color }) => (
                        <button key={key} onClick={() => handleSubMenuClick(key)}
                          className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer">
                          <DI className={`w-4 h-4 shrink-0 ${color}`} /><span>{label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );

              if (isVademecum) return (
                <div key={item.id}>
                  <button onClick={() => setIsMobileVademecumOpen(!isMobileVademecumOpen)}
                    className={`${mobileBase} ${isActive ? mobileActive : mobileInactive}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isActive ? 'bg-blue-100' : 'bg-slate-100'}`}>
                        <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                      </div>
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isMobileVademecumOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isMobileVademecumOpen && (
                    <div className="ml-11 mt-0.5 mb-1 space-y-0.5 animate-in fade-in duration-200">
                      <button onClick={() => { router.push('/vademecum/basico'); setIsMobileMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer">
                        <Pill className="w-4 h-4 text-blue-600 shrink-0" /><span>Vademécum Básico</span>
                      </button>
                      <button onClick={() => { router.push('/vademecum/anticonceptivos'); setIsMobileMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer">
                        <Heart className="w-4 h-4 text-rose-500 shrink-0" /><span>Anticonceptivos</span>
                      </button>
                    </div>
                  )}
                </div>
              );

              return (
                <button key={item.id} onClick={() => handleNavClick(item.id)}
                  className={`${mobileBase} ${isActive ? mobileActive : mobileInactive}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isActive ? 'bg-blue-100' : 'bg-slate-100'}`}>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                    </div>
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
