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
                <svg viewBox="0 0 175.216 175.552" className="w-6 h-6 shrink-0 drop-shadow-2xs">
                  <path fill="#FFFFFF" d="M148.97 26.155C132.748 9.927 111.16 1 87.61 1 39.387 1 0.17 40.218 0.17 88.44c0 15.418 4.027 30.472 11.667 43.708L0.16 175.552l44.38-11.644c12.723 6.938 27.026 10.596 43.07 10.596h0.038c48.218 0 87.439-39.223 87.439-87.445 0-23.35-9.07-45.318-26.117-60.904z"/>
                  <path fill="#25D366" d="M87.61 13.86c-41.12 0-74.58 33.46-74.58 74.58 0 13.15 3.43 25.97 9.95 37.26l-6.58 24.01 24.58-6.44c10.84 5.92 23.05 9.04 36.5 9.04h0.03c41.12 0 74.58-33.46 74.58-74.58 0-19.91-7.75-38.62-21.82-52.69-14.07-14.07-32.78-21.82-52.69-21.82z"/>
                  <path fill="#FFFFFF" d="M123.63 103.75c-1.98-0.99-11.72-5.78-13.53-6.44-1.81-0.66-3.13-0.99-4.45 0.99-1.32 1.98-5.11 6.44-6.27 7.76-1.16 1.32-2.31 1.48-4.29 0.49-1.98-0.99-8.37-3.08-15.94-9.84-5.89-5.25-9.87-11.73-11.03-13.71-1.16-1.98-0.12-3.05 0.87-4.04 0.89-0.89 1.98-2.31 2.97-3.47 0.99-1.16 1.32-1.98 1.98-3.3 0.66-1.32 0.33-2.48-0.17-3.47-0.49-0.99-4.45-10.72-6.1-14.68-1.61-3.86-3.25-3.34-4.45-3.4-1.16-0.06-2.48-0.06-3.8-0.06-1.32 0-3.47 0.49-5.28 2.48-1.81 1.98-6.93 6.77-6.93 16.5 0 9.73 7.09 19.13 8.08 20.45 0.99 1.32 13.95 21.3 33.79 29.85 4.72 2.04 8.4 3.25 11.28 4.16 4.74 1.51 9.05 1.3 12.46 0.79 3.8-0.57 11.72-4.79 13.37-9.41 1.65-4.62 1.65-8.58 1.16-9.41-0.49-0.83-1.81-1.32-3.79-2.31z"/>
                </svg>
                <a href="https://wa.me/5493425105675" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700 transition-colors font-bold text-slate-800">
                  (342) 510-5675
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
