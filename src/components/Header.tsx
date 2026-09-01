"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MapPin, 
  Globe, 
  MessageCircle, 
  Menu, 
  X, 
  ChevronRight,
  ChevronDown,
  UserCheck,
  Users,
  Pill,
  FileText,
  CreditCard,
  Home,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  activeTab?: string;
  onSelectNav?: (navId: string) => void;
  onOpenCredential?: () => void;
  onOpenAssistant?: () => void;
}

const NAV_ITEMS = [
  { id: 'guia', label: 'Home', icon: Home },
  { id: 'afiliacion', label: '¿Cómo afiliarme?', icon: UserCheck },
  { id: 'coberturas-planes', label: 'Coberturas y planes', icon: ShieldCheck },
  { id: 'cartilla', label: 'Cartilla Médica', icon: Users },
  { id: 'vademecum', label: 'Vademecum', icon: Pill },
  { id: 'formularios', label: 'Formularios', icon: FileText },
  { id: 'cuotas', label: 'Cuotas y Valores', icon: CreditCard }
];

export const Header: React.FC<HeaderProps> = ({ activeTab = 'guia', onSelectNav }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVademecumDropdownOpen, setIsVademecumDropdownOpen] = useState(false);
  const [isMobileVademecumOpen, setIsMobileVademecumOpen] = useState(false);
  const [isCoberturasDropdownOpen, setIsCoberturasDropdownOpen] = useState(false);
  const [isMobileCoberturasOpen, setIsMobileCoberturasOpen] = useState(false);
  const router = useRouter();

  const handleSubMenuClick = (subTabKey: string) => {
    setIsCoberturasDropdownOpen(false);
    setIsMobileMenuOpen(false);
    if (onSelectNav) {
      onSelectNav(subTabKey);
    }
    router.push(`/?tab=${subTabKey}`);

    setTimeout(() => {
      const el = document.getElementById('coberturas-tab-content') || document.getElementById('coberturas-content');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const handleNavClick = (id: string) => {
    if (id === 'cartilla') {
      router.push('/cartilla');
    } else if (id === 'guia') {
      router.push('/');
    } else if (id === 'vademecum') {
      setIsVademecumDropdownOpen(!isVademecumDropdownOpen);
      return;
    } else if (id === 'coberturas-planes') {
      setIsCoberturasDropdownOpen(!isCoberturasDropdownOpen);
      return;
    } else if (id === 'cuotas') {
      router.push('/cuotas');
    } else {
      router.push(`/?tab=${id}`);
    }

    if (onSelectNav) {
      onSelectNav(id);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-sky-50 via-blue-50 to-orange-100 text-slate-900 border-b border-sky-200/80 shadow-sm">
      {/* Top Thin Institutional Bar */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-amber-950/90 text-slate-100 text-sm py-2 px-4 sm:px-8 flex items-center justify-end gap-6 border-b border-blue-900/40 shadow-inner">
        <div className="flex items-center gap-6 text-sm font-medium text-slate-200">
          <a 
            href="https://wa.me/5493425105675" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-emerald-300 flex items-center gap-1.5 transition-colors font-semibold leading-none"
          >
            <svg viewBox="0 0 175.216 175.552" className="w-5 h-5 shrink-0">
              <path fill="#FFFFFF" d="M148.97 26.155C132.748 9.927 111.16 1 87.61 1 39.387 1 0.17 40.218 0.17 88.44c0 15.418 4.027 30.472 11.667 43.708L0.16 175.552l44.38-11.644c12.723 6.938 27.026 10.596 43.07 10.596h0.038c48.218 0 87.439-39.223 87.439-87.445 0-23.35-9.07-45.318-26.117-60.904z"/>
              <path fill="#25D366" d="M87.61 13.86c-41.12 0-74.58 33.46-74.58 74.58 0 13.15 3.43 25.97 9.95 37.26l-6.58 24.01 24.58-6.44c10.84 5.92 23.05 9.04 36.5 9.04h0.03c41.12 0 74.58-33.46 74.58-74.58 0-19.91-7.75-38.62-21.82-52.69-14.07-14.07-32.78-21.82-52.69-21.82z"/>
              <path fill="#FFFFFF" d="M123.63 103.75c-1.98-0.99-11.72-5.78-13.53-6.44-1.81-0.66-3.13-0.99-4.45 0.99-1.32 1.98-5.11 6.44-6.27 7.76-1.16 1.32-2.31 1.48-4.29 0.49-1.98-0.99-8.37-3.08-15.94-9.84-5.89-5.25-9.87-11.73-11.03-13.71-1.16-1.98-0.12-3.05 0.87-4.04 0.89-0.89 1.98-2.31 2.97-3.47 0.99-1.16 1.32-1.98 1.98-3.3 0.66-1.32 0.33-2.48-0.17-3.47-0.49-0.99-4.45-10.72-6.1-14.68-1.61-3.86-3.25-3.34-4.45-3.4-1.16-0.06-2.48-0.06-3.8-0.06-1.32 0-3.47 0.49-5.28 2.48-1.81 1.98-6.93 6.77-6.93 16.5 0 9.73 7.09 19.13 8.08 20.45 0.99 1.32 13.95 21.3 33.79 29.85 4.72 2.04 8.4 3.25 11.28 4.16 4.74 1.51 9.05 1.3 12.46 0.79 3.8-0.57 11.72-4.79 13.37-9.41 1.65-4.62 1.65-8.58 1.16-9.41-0.49-0.83-1.81-1.32-3.79-2.31z"/>
            </svg>
            <span>(342) 510-5675</span>
          </a>
          <span className="hidden sm:flex items-center gap-2 text-slate-200">
            <MapPin className="w-4 h-4 text-sky-400" />
            <span>San Lorenzo 1849 – Santa Fe</span>
          </span>
          <a 
            href="https://cpcesfe1.org.ar" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hidden lg:flex items-center gap-2 text-sky-300 hover:text-white transition-colors font-medium"
          >
            <Globe className="w-4 h-4 text-sky-400" />
            <span>cpcesfe1.org.ar</span>
          </a>
        </div>
      </div>

      {/* Main Navbar Container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-6">
        {/* Brand & Identity */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={() => handleNavClick('guia')} 
            className="flex items-center shrink-0 cursor-pointer focus:outline-none"
          >
            <img 
              src="/dss-logo.png" 
              alt="DSS - Departamento de Servicios Sociales - CPCE Santa Fe" 
              className="h-11 sm:h-12 w-auto object-contain block" 
            />
          </button>
        </div>

        {/* Desktop Transparent Nav Buttons with Hover Fill */}
        <nav className="hidden md:flex items-center justify-end ml-auto gap-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isVademecum = item.id === 'vademecum';
            const isCoberturas = item.id === 'coberturas-planes';
            const isActive = isVademecum
              ? (activeTab.startsWith('vademecum') && activeTab !== 'vademecum-farmacias' && activeTab !== 'cobertura-farmacias')
              : isCoberturas
                ? ['coberturas-planes', 'subsidio-sepelios', 'sepelios', 'cobertura-odontologia', 'odontologia', 'chequeo-preventivo', 'vademecum-farmacias', 'cobertura-farmacias', 'farmacia', 'materno', 'nutricion-celiacos', 'protesis'].includes(activeTab)
                : activeTab === item.id;

            if (isCoberturas) {
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setIsCoberturasDropdownOpen(true)}
                  onMouseLeave={() => setIsCoberturasDropdownOpen(false)}
                >
                  <button
                    id="nav-coberturas-trigger"
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-xs lg:text-[13px] font-bold rounded-full transition-all duration-200 group cursor-pointer ${
                      isActive 
                        ? 'bg-gradient-to-r from-slate-800 to-indigo-900 text-white shadow-xs' 
                        : 'text-slate-800 bg-transparent hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 transition-colors duration-250 ${
                      isActive ? 'text-white' : 'text-blue-600 group-hover:text-white'
                    }`} />
                    <span>{item.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-250 ${
                      isCoberturasDropdownOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* Dropdown Card */}
                  {isCoberturasDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <button
                        onClick={() => handleSubMenuClick('coberturas-planes')}
                        className="w-full text-left px-4 py-2 text-[13px] font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        Ver coberturas y planes
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('materno')}
                        className="w-full text-left px-4 py-2 text-[13px] font-bold text-slate-800 hover:bg-rose-50 hover:text-rose-700 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        Plan Materno Infantil
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('cobertura-farmacias')}
                        className="w-full text-left px-4 py-2 text-[13px] font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Cobertura en farmacias
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('cobertura-odontologia')}
                        className="w-full text-left px-4 py-2 text-[13px] font-bold text-slate-800 hover:bg-cyan-50 hover:text-cyan-700 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        Cobertura odontología
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('nutricion-celiacos')}
                        className="w-full text-left px-4 py-2 text-[13px] font-bold text-slate-800 hover:bg-amber-50 hover:text-amber-700 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Nutrición y Celíacos
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('protesis')}
                        className="w-full text-left px-4 py-2 text-[13px] font-bold text-slate-800 hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        Prótesis y Órtesis
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('subsidio-sepelios')}
                        className="w-full text-left px-4 py-2 text-[13px] font-bold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        Subsidio sepelios
                      </button>
                    </div>
                  )}
                </div>
              );
            }

            if (isVademecum) {
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setIsVademecumDropdownOpen(true)}
                  onMouseLeave={() => setIsVademecumDropdownOpen(false)}
                >
                  <button
                    id="nav-vademecum-trigger"
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-xs lg:text-[13px] font-bold rounded-full transition-all duration-200 group cursor-pointer ${
                      isActive 
                        ? 'bg-gradient-to-r from-slate-800 to-indigo-900 text-white shadow-xs' 
                        : 'text-slate-800 bg-transparent hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 transition-colors duration-250 ${
                      isActive ? 'text-white' : 'text-blue-600 group-hover:text-white'
                    }`} />
                    <span>{item.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-250 ${
                      isVademecumDropdownOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* Dropdown Card */}
                  {isVademecumDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <button
                        onClick={() => {
                          router.push('/vademecum/basico');
                          setIsVademecumDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-[13px] font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        Vademécum Básico
                      </button>
                      <button
                        onClick={() => {
                          router.push('/vademecum/anticonceptivos');
                          setIsVademecumDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-[13px] font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        Anticonceptivos
                      </button>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs lg:text-[13px] font-bold rounded-full transition-all duration-200 active:scale-95 group cursor-pointer ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'text-slate-800 bg-transparent hover:bg-blue-600 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-blue-600 group-hover:text-white'
                }`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Hamburger Menu Button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-slate-700" /> : <Menu className="w-6 h-6 text-slate-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200/60 bg-white/95 backdrop-blur-xl px-3.5 py-3 space-y-1 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isVademecum = item.id === 'vademecum';
            const isCoberturas = item.id === 'coberturas-planes';
            const isActive = isVademecum
              ? (activeTab.startsWith('vademecum') && activeTab !== 'vademecum-farmacias')
              : isCoberturas
                ? ['coberturas-planes', 'subsidio-sepelios', 'cobertura-odontologia', 'chequeo-preventivo', 'vademecum-farmacias', 'cobertura-farmacias', 'farmacia', 'materno', 'nutricion-celiacos', 'protesis'].includes(activeTab)
                : activeTab === item.id;

            if (isCoberturas) {
              return (
                <div key={item.id} className="space-y-0.5">
                  <button
                    onClick={() => setIsMobileCoberturasOpen(!isMobileCoberturasOpen)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 text-xs sm:text-[13px] font-bold rounded-xl transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-slate-700 hover:bg-slate-100/70 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      isActive ? 'text-blue-600' : 'text-slate-400'
                    } ${isMobileCoberturasOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isMobileCoberturasOpen && (
                    <div className="ml-5 pl-3 border-l-2 border-slate-100 py-1 space-y-0.5 animate-in fade-in duration-200">
                      <button
                        onClick={() => handleSubMenuClick('coberturas-planes')}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 hover:text-blue-700 hover:bg-blue-50/70 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                        <span>Ver coberturas y planes</span>
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('materno')}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 hover:text-rose-700 hover:bg-rose-50/70 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                        <span>Plan Materno Infantil</span>
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('cobertura-farmacias')}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span>Cobertura en farmacias</span>
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('cobertura-odontologia')}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 hover:text-cyan-700 hover:bg-cyan-50/70 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                        <span>Cobertura odontología</span>
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('nutricion-celiacos')}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 hover:text-amber-700 hover:bg-amber-50/70 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span>Nutrición y Celíacos</span>
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('protesis')}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 hover:text-purple-700 hover:bg-purple-50/70 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                        <span>Prótesis y Órtesis</span>
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('subsidio-sepelios')}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 hover:text-indigo-700 hover:bg-indigo-50/70 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                        <span>Subsidio sepelios</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            }

            if (isVademecum) {
              return (
                <div key={item.id} className="space-y-0.5">
                  <button
                    onClick={() => setIsMobileVademecumOpen(!isMobileVademecumOpen)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 text-xs sm:text-[13px] font-bold rounded-xl transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-slate-700 hover:bg-slate-100/70 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      isActive ? 'text-blue-600' : 'text-slate-400'
                    } ${isMobileVademecumOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isMobileVademecumOpen && (
                    <div className="ml-5 pl-3 border-l-2 border-slate-100 py-1 space-y-0.5 animate-in fade-in duration-200">
                      <button
                        onClick={() => {
                          router.push('/vademecum/basico');
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 hover:text-blue-700 hover:bg-blue-50/70 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                        <span>Vademécum Básico</span>
                      </button>
                      <button
                        onClick={() => {
                          router.push('/vademecum/anticonceptivos');
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 hover:text-rose-700 hover:bg-rose-50/70 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                        <span>Anticonceptivos</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 text-xs sm:text-[13px] font-bold rounded-xl transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-slate-700 hover:bg-slate-100/70 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-blue-600' : 'text-slate-400'
                }`} />
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
