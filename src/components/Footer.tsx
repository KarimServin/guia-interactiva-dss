"use client";

import React from 'react';
import { Mail, MapPin, Clock, ExternalLink, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-50 via-sky-50/60 to-orange-100/40 text-slate-700 pt-14 pb-10 border-t border-sky-200/70 shadow-inner overflow-hidden">
      {/* Avant-garde Gradient Top Border Accent */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-900 via-sky-500 to-orange-500"></div>
      
      {/* Ambient Orange Glow */}
      <div className="pointer-events-none absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-orange-200/35 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Col 1: Institutional & Dual Logos */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 flex-wrap">
              <a href="#" className="inline-block transition-transform hover:scale-[1.02]">
                <img 
                  src="/dss-logo.png" 
                  alt="DSS - Departamento de Servicios Sociales" 
                  className="h-12 sm:h-13 w-auto object-contain" 
                />
              </a>
              <div className="h-9 w-px bg-slate-300/80 hidden sm:block"></div>
              <a href="https://cpcesfe1.org.ar" target="_blank" rel="noopener noreferrer" className="inline-block transition-transform hover:scale-[1.02]">
                <img 
                  src="/cpce-logo.png" 
                  alt="CPCE Santa Fe - Cámara I" 
                  className="h-10 sm:h-11 w-auto object-contain" 
                />
              </a>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Sistema solidario de cobertura de salud creado y sostenido por los profesionales matriculados en Ciencias Económicas de la provincia de Santa Fe – Cámara I.
            </p>
          </div>

          {/* Col 2: Contacto y Sede */}
          <div className="md:pl-6 lg:pl-10">
            <h5 className="text-xs font-bold uppercase tracking-wider text-blue-950 mb-3.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Contacto y Sede
            </h5>
            <ul className="space-y-3 text-xs text-slate-600 font-medium">
              <li className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="leading-snug pt-1">San Lorenzo 1849 – Santa Fe – Cámara I</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-100/90 text-emerald-600 flex items-center justify-center shrink-0 shadow-2xs">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-4 h-4 text-emerald-600"
                  >
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.135-1.347a9.945 9.945 0 0 0 4.87 1.287h.005c5.505 0 9.99-4.478 9.99-9.985 0-2.67-1.037-5.18-2.92-7.065C17.198 3.007 14.685 2 12.012 2zm5.726 13.916c-.237.669-1.378 1.28-1.928 1.33-.495.045-1.146.08-3.32-.823-2.78-1.155-4.57-3.987-4.71-4.172-.14-.185-1.132-1.507-1.132-2.875 0-1.368.718-2.04.973-2.316.255-.275.56-.344.747-.344.188 0 .375.002.539.01.17.008.397-.065.62.482.23.564.78 1.902.846 2.04.067.136.11.294.02.48-.09.186-.137.3-.272.464-.136.162-.285.359-.408.482-.136.136-.28.285-.12.56.16.275.71 1.17 1.523 1.895.692.617 1.272.875 1.579 1.01.306.137.48.115.662-.093.18-.21.782-.907.992-1.218.21-.31.42-.26.703-.153.284.107 1.8.847 2.11 1.002.312.155.52.23.595.36.075.13.075.753-.162 1.422z" />
                  </svg>
                </div>
                <a href="https://wa.me/5493425105675" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700 transition-colors font-bold text-slate-800">
                  3425 10-5675
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <a href="mailto:dss@cpn.org.ar" className="hover:text-blue-800 transition-colors">
                  dss@cpn.org.ar
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Institucional & Web */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-blue-950 mb-3.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Institucional & Web
            </h5>
            <ul className="space-y-3 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span>Atención: Lunes a viernes de 7 a 15 hs</span>
              </li>
              <li>
                <a 
                  href="https://cpcesfe1.org.ar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 transition-colors font-bold hover:underline"
                >
                  <div className="w-7 h-7 rounded-lg bg-sky-100/80 text-sky-700 flex items-center justify-center shrink-0 shadow-2xs">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                  <span>Sitio Web: cpcesfe1.org.ar</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-sky-200/80 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-1.5 font-normal">
          <p>© 2026 Departamento de Servicios Sociales - CPCE Santa Fe Cámara I. Todos los derechos reservados.</p>
          <p className="text-[11px] text-slate-400 font-medium">
            Desarrollado por el Área de Sistemas del Consejo Profesional de Ciencias Económicas de Santa Fe - Cámara I
          </p>
        </div>
      </div>
    </footer>
  );
};
