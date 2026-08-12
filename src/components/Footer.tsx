import React from 'react';
import { Shield, Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Institutional */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-sky-400 to-blue-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-md">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-white text-base leading-tight">DSS SANTA FE</h4>
                <p className="text-xs text-sky-400 font-semibold">CPCE Santa Fe Cámara I</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Sistema solidario de cobertura de salud creado y sostenido por los profesionales matriculados en Ciencias Económicas de la provincia de Santa Fe.
            </p>
          </div>

          {/* Col 2: Contact Info */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Contacto y Sede
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400 font-normal">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>San Lorenzo 1849 – Santa Fe – Cámara I</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>WA 3425 10-5675</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>dss@cpcesfe1.org.ar</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Attention Hours */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Horarios de Atención
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400 font-normal">
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Lunes a viernes | 7 a 15 hs</span>
              </li>
              <li className="flex items-center gap-2 text-sky-300 font-semibold text-xs">
                <Shield className="w-4 h-4 shrink-0 text-sky-400" />
                <span>Guardia Sanatorial 24hs con Matrícula</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Más Información
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400 font-normal">
              <li>
                <a 
                  href="https://cpcesfe1.org.ar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-sky-300 flex items-center gap-1.5 transition-colors font-semibold text-sky-400"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Web: cpcesfe1.org.ar
                </a>
              </li>
              <li className="text-slate-400 text-[11px]">
                Más información en: <a href="https://cpcesfe1.org.ar" target="_blank" rel="noopener noreferrer" className="text-sky-300 underline font-semibold">cpcesfe1.org.ar</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4 font-normal">
          <p>© 2026 Departamento de Servicios Sociales - CPCE Santa Fe Cámara I. Todos los derechos reservados.</p>
          <p className="text-xs text-sky-400 font-semibold">
            Guía Interactiva de Autogestión para Afiliados
          </p>
        </div>
      </div>
    </footer>
  );
};
