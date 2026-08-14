import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DSS CPCE Santa Fe Cámara I - Guía Interactiva de Autogestión y Cobertura Médica",
  description: "Guía interactiva oficial del Departamento de Servicios Sociales (DSS) del CPCE Santa Fe - Cámara I. Cartilla médica, buscador de farmacias, credencial digital, coseguros, formularios y simulador de autorizaciones.",
  keywords: [
    "DSS Santa Fe",
    "CPCE Santa Fe",
    "Servicios Sociales",
    "Cobertura Médica",
    "Cartilla Médica Santa Fe",
    "Farmacias Adheridas DSS",
    "Credencial Digital DSS",
    "Coseguros CPCE",
    "Ciencias Económicas Santa Fe"
  ],
  authors: [{ name: "Área de Sistemas - CPCE Santa Fe Cámara I" }],
  creator: "Consejo Profesional de Ciencias Económicas de Santa Fe Cámara I",
  publisher: "CPCE Santa Fe Cámara I",
  metadataBase: new URL("https://cpcesfe1.org.ar"),
  openGraph: {
    title: "DSS CPCE Santa Fe Cámara I - Guía Interactiva de Cobertura Médica",
    description: "Autogestión de servicios sociales, cartilla médica, credencial digital y trámites para profesionales matriculados.",
    url: "https://cpcesfe1.org.ar",
    siteName: "DSS CPCE Santa Fe - Cámara I",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/dss-logo.png",
        width: 1200,
        height: 630,
        alt: "DSS Santa Fe - Departamento de Servicios Sociales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DSS CPCE Santa Fe Cámara I - Guía Interactiva",
    description: "Servicios sociales y sistema solidario de salud para profesionales matriculados.",
    images: ["/dss-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/dss-logo.png",
    shortcut: "/dss-logo.png",
    apple: "/dss-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
