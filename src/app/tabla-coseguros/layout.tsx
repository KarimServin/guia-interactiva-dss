import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tabla de Coseguros y Coberturas',
  description: 'Valores actualizados de coseguros, porcentajes a cargo del afiliado y comparación de coberturas entre Plan General y Plan Básico del DSS CPCE Santa Fe.',
  alternates: {
    canonical: 'https://dss.contadores.org.ar/tabla-coseguros',
  },
};

export default function TablaCosegurosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
