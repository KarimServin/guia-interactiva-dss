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
  CreditCard
} from 'lucide-react';

interface HeaderProps {
  activeTab?: string;
  onSelectNav?: (navId: string) => void;
  onOpenCredential?: () => void;
  onOpenAssistant?: () => void;
}

const NAV_ITEMS = [
  { id: 'afiliacion', label: '¿Cómo afiliarme?', icon: UserCheck },
  { id: 'cartilla', label: 'Cartilla Médica', icon: Users },
  { id: 'vademecum', label: 'Vademecum', icon: Pill },
  { id: 'formularios', label: 'Formularios', icon: FileText },
  { id: 'cuotas', label: 'Cuotas y Valores', icon: CreditCard }
];

export const Header: React.FC<HeaderProps> = ({ activeTab = 'guia', onSelectNav }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVademecumDropdownOpen, setIsVademecumDropdownOpen] = useState(false);
  const [isMobileVademecumOpen, setIsMobileVademecumOpen] = useState(false);
  const router = useRouter();

  const handleNavClick = (id: string) => {
    if (id === 'cartilla') {
      router.push('/cartilla');
    } else if (id === 'guia') {
      router.push('/');
    } else if (id === 'vademecum') {
      // Toggle dropdown instead of default route
      setIsVademecumDropdownOpen(!isVademecumDropdownOpen);
      return;
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
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
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
          <div className="h-8 sm:h-10 w-px bg-slate-300/80 shrink-0"></div>
          <a href="https://cpcesfe1.org.ar" target="_blank" rel="noopener noreferrer" className="flex items-center shrink-0">
            <img 
              src="/cpce-logo-header.png" 
              alt="Consejo Profesional de Ciencias Económicas - Cámara I" 
              className="h-9 sm:h-[40px] w-auto object-contain block" 
            />
          </a>
        </div>

        {/* Desktop Transparent Nav Buttons with Hover Fill */}
        <nav className="hidden md:flex items-center gap-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isVademecum = item.id === 'vademecum';
            const isActive = isVademecum
              ? activeTab.startsWith('vademecum')
              : activeTab === item.id;

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
                      <button
                        onClick={() => {
                          router.push('/vademecum/farmacias');
                          setIsVademecumDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-[13px] font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Farmacias Adheridas
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
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1 shadow-lg">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isVademecum = item.id === 'vademecum';
            const isActive = isVademecum
              ? activeTab.startsWith('vademecum')
              : activeTab === item.id;

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
                      <button
                        onClick={() => {
                          router.push('/vademecum/farmacias');
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Farmacias Adheridas
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
