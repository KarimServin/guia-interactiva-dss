import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Listado de Prestaciones y Coberturas',
  description: 'Detalle integral de prestaciones médicas, odontología, farmacia, prótesis, internación y subsidios del DSS CPCE Santa Fe.',
  alternates: {
    canonical: 'https://dss.contadores.org.ar/prestaciones',
  },
};

export default function PrestacionesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
