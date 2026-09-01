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
                <svg role="img" viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
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
