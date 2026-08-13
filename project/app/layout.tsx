import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Verde. — Catálogo de Plantas Ornamentais',
  description:
    'Catálogo completo com 30 espécies de plantas ornamentais: fichas técnicas, métricas de cuidado e guias de cultivo passo a passo.',
  openGraph: {
    title: 'Verde. — Catálogo de Plantas Ornamentais',
    description:
      'Encontre a planta perfeita para o seu espaço com fichas de cuidado e guias de cultivo.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} bg-neutral-950 text-white antialiased`}>{children}</body>
    </html>
  );
}
