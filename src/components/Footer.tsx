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
                <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 shrink-0 aspect-square">
                    <path fill="#25D366" d="M12 2A10 10 0 0 0 2 12c0 1.77.46 3.44 1.27 4.9L2 22l5.22-1.37A9.95 9.95 0 0 0 12 22a10 10 0 0 0 10-10A10 10 0 0 0 12 2zm5.41 13.06c-.24.67-1.38 1.28-1.93 1.33-.5.05-1.15.08-3.32-.82-2.78-1.16-4.57-3.99-4.71-4.17-.14-.19-1.13-1.51-1.13-2.88 0-1.37.72-2.04.97-2.32.26-.27.56-.34.75-.34.19 0 .37.01.54.01.17.01.4-.07.62.48.23.56.78 1.9.85 2.04.07.14.11.29.02.48-.09.19-.14.3-.27.46-.14.17-.29.36-.41.48-.14.14-.28.29-.12.56.16.28.71 1.17 1.52 1.9.69.62 1.27.87 1.58 1.01.31.14.48.11.66-.09.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.15.28.11 1.8.85 2.11 1c.31.16.52.23.6.36.07.13.07.75-.17 1.42z" />
                  </svg>
                </div>
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
