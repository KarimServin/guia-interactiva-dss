import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Figtree } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-heading",
  display: "swap",
  preload: false,
});


export const metadata: Metadata = {
  title: {
    default: "DSS CPCE Santa Fe Cámara I - Guía Interactiva de Cobertura Médica",
    template: "%s | DSS CPCE Santa Fe"
  },
  description: "Guía interactiva oficial del Departamento de Servicios Sociales (DSS) del CPCE Santa Fe - Cámara I. Cartilla médica, buscador de farmacias, credencial digital, coseguros, formularios y trámites.",
  keywords: [
    "DSS Santa Fe",
    "CPCE Santa Fe",
    "Servicios Sociales",
    "Cobertura Médica",
    "Cartilla Médica Santa Fe",
    "Cobertura en Farmacias DSS",
    "Credencial Digital DSS",
    "Coseguros CPCE",
    "Ciencias Económicas Santa Fe",
    "Vademecum DSS",
    "Valores de Cuota DSS"
  ],
  authors: [{ name: "Área de Sistemas - CPCE Santa Fe Cámara I" }],
  creator: "Consejo Profesional de Ciencias Económicas de Santa Fe Cámara I",
  publisher: "CPCE Santa Fe Cámara I",
  metadataBase: new URL("https://dss.contadores.org.ar"),
  alternates: {
    canonical: "https://dss.contadores.org.ar",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DSS CPCE Santa Fe",
  },
  openGraph: {
    title: "DSS CPCE Santa Fe Cámara I - Guía Interactiva",
    description: "Autogestión de servicios sociales, cartilla médica, credencial digital y trámites para profesionales matriculados.",
    url: "https://dss.contadores.org.ar",
    siteName: "DSS CPCE Santa Fe - Cámara I",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DSS - Departamento de Servicios Sociales - Guía interactiva",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DSS CPCE Santa Fe Cámara I - Guía Interactiva",
    description: "Servicios sociales y sistema solidario de salud para profesionales matriculados.",
    images: ["/og-image.png"],
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
    icon: "/dss-icon.png",
    shortcut: "/dss-icon.png",
    apple: "/dss-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalOrganization",
      "@id": "https://dss.contadores.org.ar/#organization",
      "name": "Departamento de Servicios Sociales - CPCE Santa Fe Cámara I",
      "alternateName": "DSS Santa Fe",
      "url": "https://dss.contadores.org.ar",
      "logo": "https://dss.contadores.org.ar/dss-logo.png",
      "image": "https://dss.contadores.org.ar/og-image.png",
      "telephone": "+54-342-510-5675",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "San Lorenzo 1849",
        "addressLocality": "Santa Fe",
        "addressRegion": "Santa Fe",
        "postalCode": "S3000",
        "addressCountry": "AR"
      },
      "areaServed": "Santa Fe, Argentina",
      "description": "Sistema solidario de cobertura médica y servicios sociales para profesionales en ciencias económicas matriculados en la Cámara I."
    },
    {
      "@type": "WebSite",
      "@id": "https://dss.contadores.org.ar/#website",
      "url": "https://dss.contadores.org.ar",
      "name": "Guía Interactiva DSS",
      "publisher": {
        "@id": "https://dss.contadores.org.ar/#organization"
      },
      "inLanguage": "es-AR"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${plusJakartaSans.variable} ${figtree.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        {/* Preload hero image only on non-mobile — mobile hero image is hidden */}
        <link rel="preload" href="/hero-bg.webp" as="image" type="image/webp" fetchPriority="high" media="(min-width: 641px)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-slate-900 min-h-dvh flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
