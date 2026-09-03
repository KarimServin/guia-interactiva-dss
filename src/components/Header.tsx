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
  { id: 'formularios', label: 'Formularios', icon: FileText }
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
    if (subTabKey === 'prestaciones') {
      router.push('/prestaciones');
      return;
    }
    if (subTabKey === 'tabla-coseguros') {
      router.push('/tabla-coseguros');
      return;
    }
    if (subTabKey === 'cuotas') {
      router.push('/cuotas');
      return;
    }
    if (onSelectNav) {
      onSelectNav(subTabKey);
    } else {
      router.push('/?tab=' + subTabKey);
    }

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
    } else if (id === 'afiliacion') {
      router.push('/afiliacion');
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
    }

    if (onSelectNav) {
      onSelectNav(id);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-sky-50 via-blue-50 to-orange-100 text-slate-900 border-b border-sky-200/80 shadow-sm">
      {/* Top Thin Institutional Bar */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-amber-950/90 text-slate-100 text-sm py-2 border-b border-blue-900/40 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-end gap-6">
          <div className="flex items-center gap-6 text-sm font-medium text-slate-200">
            <a 
              href="https://wa.me/5493425105675" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-emerald-300 flex items-center gap-1.5 transition-colors font-semibold leading-none"
            >
              <svg role="img" viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
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
      </div>

      {/* Main Navbar Container (Centered with max-w-7xl) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-6">
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
                ? ['coberturas-planes', 'subsidio-sepelios', 'sepelios', 'cobertura-odontologia', 'odontologia', 'chequeo-preventivo', 'vademecum-farmacias', 'cobertura-farmacias', 'farmacia', 'materno', 'nutricion-celiacos', 'protesis', 'tabla-coseguros', 'cuotas'].includes(activeTab)
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
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-xs lg:text-[13px] font-bold rounded-full transition-all duration-150 group cursor-pointer ${
                      isActive 
                        ? 'bg-gradient-to-r from-slate-800 to-indigo-900 text-white shadow-xs' 
                        : 'text-slate-800 bg-transparent hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 transition-colors duration-150 ${
                      isActive ? 'text-white' : 'text-blue-600 group-hover:text-white'
                    }`} />
                    <span>{item.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      isCoberturasDropdownOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* Dropdown Card */}
                  {isCoberturasDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <button
                        onClick={() => handleSubMenuClick('prestaciones')}
                        className="w-full text-left px-4 py-2 text-xs lg:text-[13px] font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        Prestaciones
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('tabla-coseguros')}
                        className="w-full text-left px-4 py-2 text-xs lg:text-[13px] font-bold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                        Tabla de Planes y Coseguros
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('cuotas')}
                        className="w-full text-left px-4 py-2 text-xs lg:text-[13px] font-bold text-slate-800 hover:bg-sky-50 hover:text-sky-700 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                        Valores de cuota
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
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-xs lg:text-[13px] font-bold rounded-full transition-all duration-150 group cursor-pointer ${
                      isActive 
                        ? 'bg-gradient-to-r from-slate-800 to-indigo-900 text-white shadow-xs' 
                        : 'text-slate-800 bg-transparent hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 transition-colors duration-150 ${
                      isActive ? 'text-white' : 'text-blue-600 group-hover:text-white'
                    }`} />
                    <span>{item.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      isVademecumDropdownOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* Dropdown Card */}
                  {isVademecumDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <button
                        onClick={() => {
                          router.push('/vademecum/basico');
                          setIsVademecumDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs lg:text-[13px] font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        Vademécum Básico
                      </button>
                      <button
                        onClick={() => {
                          router.push('/vademecum/anticonceptivos');
                          setIsVademecumDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs lg:text-[13px] font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
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
                className={`flex items-center gap-2 px-3.5 py-2 text-xs lg:text-[13px] font-bold rounded-full transition-all duration-150 active:scale-95 group cursor-pointer ${
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
      <div
        className={`md:hidden overflow-hidden transition-all duration-[180ms] ease-in-out ${
          isMobileMenuOpen
            ? 'max-h-[600px] opacity-100'
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="border-b border-slate-200/60 bg-white/95 backdrop-blur-xl px-3.5 py-3 space-y-1 shadow-2xl">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isVademecum = item.id === 'vademecum';
            const isCoberturas = item.id === 'coberturas-planes';
            const isActive = isVademecum
              ? (activeTab.startsWith('vademecum') && activeTab !== 'vademecum-farmacias')
              : isCoberturas
                ? ['coberturas-planes', 'subsidio-sepelios', 'cobertura-odontologia', 'chequeo-preventivo', 'vademecum-farmacias', 'cobertura-farmacias', 'farmacia', 'materno', 'nutricion-celiacos', 'protesis', 'tabla-coseguros', 'cuotas'].includes(activeTab)
                : activeTab === item.id;

            if (isCoberturas) {
              return (
                <div key={item.id} className="space-y-0.5">
                  <button
                    onClick={() => setIsMobileCoberturasOpen(!isMobileCoberturasOpen)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 text-sm sm:text-base font-bold rounded-xl transition-all cursor-pointer ${
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
                        onClick={() => handleSubMenuClick('prestaciones')}
                        className="w-full text-left px-3 py-2 text-[13px] sm:text-sm font-bold text-slate-700 hover:text-blue-700 hover:bg-blue-50/70 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                        <span>Prestaciones</span>
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('tabla-coseguros')}
                        className="w-full text-left px-3 py-2 text-[13px] sm:text-sm font-bold text-slate-700 hover:text-indigo-700 hover:bg-indigo-50/70 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                        <span>Tabla de Planes y Coseguros</span>
                      </button>
                      <button
                        onClick={() => handleSubMenuClick('cuotas')}
                        className="w-full text-left px-3 py-2 text-[13px] sm:text-sm font-bold text-slate-700 hover:text-sky-700 hover:bg-sky-50/70 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-600 shrink-0" />
                        <span>Valores de cuota</span>
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
                    className={`w-full flex items-center justify-between px-3.5 py-3 text-sm sm:text-base font-bold rounded-xl transition-all cursor-pointer ${
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
                        className="w-full text-left px-3 py-2 text-[13px] sm:text-sm font-bold text-slate-700 hover:text-blue-700 hover:bg-blue-50/70 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                        <span>Vademécum Básico</span>
                      </button>
                      <button
                        onClick={() => {
                          router.push('/vademecum/anticonceptivos');
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-[13px] sm:text-sm font-bold text-slate-700 hover:text-rose-700 hover:bg-rose-50/70 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
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
                className={`w-full flex items-center justify-between px-3.5 py-3 text-sm sm:text-base font-bold rounded-xl transition-all cursor-pointer ${
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
      </div>
    </header>
  );
};
