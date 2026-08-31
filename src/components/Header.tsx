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
            <div className="w-5 h-5 rounded-md bg-emerald-500/20 flex items-center justify-center shrink-0">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-3.5 h-3.5 text-emerald-400"
              >
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.135-1.347a9.945 9.945 0 0 0 4.87 1.287h.005c5.505 0 9.99-4.478 9.99-9.985 0-2.67-1.037-5.18-2.92-7.065C17.198 3.007 14.685 2 12.012 2zm5.726 13.916c-.237.669-1.378 1.28-1.928 1.33-.495.045-1.146.08-3.32-.823-2.78-1.155-4.57-3.987-4.71-4.172-.14-.185-1.132-1.507-1.132-2.875 0-1.368.718-2.04.973-2.316.255-.275.56-.344.747-.344.188 0 .375.002.539.01.17.008.397-.065.62.482.23.564.78 1.902.846 2.04.067.136.11.294.02.48-.09.186-.137.3-.272.464-.136.162-.285.359-.408.482-.136.136-.28.285-.12.56.16.275.71 1.17 1.523 1.895.692.617 1.272.875 1.579 1.01.306.137.48.115.662-.093.18-.21.782-.907.992-1.218.21-.31.42-.26.703-.153.284.107 1.8.847 2.11 1.002.312.155.52.23.595.36.075.13.075.753-.162 1.422z" />
              </svg>
            </div>
            <span>3425 10-5675</span>
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
                        ? 'bg-blue-600 text-white shadow-xs' 
                        : 'text-slate-800 bg-transparent hover:bg-blue-600 hover:text-white'
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
                        className="w-full text-left px-4 py-2 text-[13px] font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        Ver coberturas y planes
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('materno')}
                        className="w-full text-left px-4 py-2 text-[13px] font-bold text-slate-800 hover:bg-rose-50 hover:text-rose-700 transition-colors flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        Plan Materno Infantil
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('cobertura-farmacias')}
                        className="w-full text-left px-4 py-2 text-[13px] font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 transition-colors flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Cobertura en farmacias
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('cobertura-odontologia')}
                        className="w-full text-left px-4 py-2 text-[13px] font-bold text-slate-800 hover:bg-cyan-50 hover:text-cyan-700 transition-colors flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        Cobertura odontología
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('nutricion-celiacos')}
                        className="w-full text-left px-4 py-2 text-[13px] font-bold text-slate-800 hover:bg-amber-50 hover:text-amber-700 transition-colors flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Nutrición y Celíacos
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('protesis')}
                        className="w-full text-left px-4 py-2 text-[13px] font-bold text-slate-800 hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        Prótesis y Órtesis
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('subsidio-sepelios')}
                        className="w-full text-left px-4 py-2 text-[13px] font-bold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors flex items-center gap-2"
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
                        ? 'bg-blue-600 text-white shadow-xs' 
                        : 'text-slate-800 bg-transparent hover:bg-blue-600 hover:text-white'
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
                        className="w-full text-left px-4 py-2.5 text-[13px] font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        Vademécum Básico
                      </button>
                      <button
                        onClick={() => {
                          router.push('/vademecum/anticonceptivos');
                          setIsVademecumDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-[13px] font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-2"
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
            className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-slate-700" /> : <Menu className="w-6 h-6 text-slate-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1 shadow-lg">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isVademecum = item.id === 'vademecum';
            const isCoberturas = item.id === 'coberturas-planes';
            const isActive = isVademecum
              ? (activeTab.startsWith('vademecum') && activeTab !== 'vademecum-farmacias')
              : isCoberturas
                ? ['coberturas-planes', 'subsidio-sepelios', 'cobertura-odontologia', 'chequeo-preventivo', 'vademecum-farmacias'].includes(activeTab)
                : activeTab === item.id;

            if (isCoberturas) {
              return (
                <div key={item.id} className="space-y-1">
                  <button
                    onClick={() => setIsMobileCoberturasOpen(!isMobileCoberturasOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-[13px] font-bold rounded-full transition-all group ${
                      isActive ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-800 bg-transparent active:bg-blue-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      isMobileCoberturasOpen ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {isMobileCoberturasOpen && (
                    <div className="pl-6 space-y-1 animate-in fade-in duration-200">
                      <button
                        onClick={() => handleSubMenuClick('coberturas-planes')}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-blue-700 transition-colors flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        Ver coberturas y planes
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('materno')}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-rose-700 transition-colors flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        Plan Materno Infantil
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('cobertura-farmacias')}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Cobertura en farmacias
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('cobertura-odontologia')}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-cyan-700 transition-colors flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        Cobertura odontología
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('nutricion-celiacos')}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-amber-700 transition-colors flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Nutrición y Celíacos
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('protesis')}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-purple-700 transition-colors flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        Prótesis y Órtesis
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('subsidio-sepelios')}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-indigo-700 transition-colors flex items-center gap-2"
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
                <div key={item.id} className="space-y-1">
                  <button
                    onClick={() => setIsMobileVademecumOpen(!isMobileVademecumOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-[13px] font-bold rounded-full transition-all group ${
                      isActive ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-800 bg-transparent active:bg-blue-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      isMobileVademecumOpen ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {isMobileVademecumOpen && (
                    <div className="pl-6 space-y-1 animate-in fade-in duration-200">
                      <button
                        onClick={() => {
                          router.push('/vademecum/basico');
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-blue-700 transition-colors flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        Vademécum Básico
                      </button>
                      <button
                        onClick={() => {
                          router.push('/vademecum/anticonceptivos');
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-rose-600 transition-colors flex items-center gap-2"
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
                className={`w-full flex items-center justify-between px-4 py-3 text-[13px] font-bold rounded-full transition-all group ${
                  isActive ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-800 bg-transparent active:bg-blue-50/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-active:text-blue-600 transition-colors" />
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
