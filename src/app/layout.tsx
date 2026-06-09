import type { ReactNode } from 'react';
import './globals.css';
import Link from 'next/link';
import WhatsAppFloat from '@/components/whatsapp-float';

export const metadata = {
  title: 'Bonini Digital | Template Mestre',
  description: 'Template mestre para pequenas empresas com Next.js, Tailwind CSS e Supabase.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="min-h-screen bg-background text-white">
          <header className="sticky top-0 z-40 border-b border-white/10 bg-background/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
              <Link href="/" className="text-lg font-semibold tracking-[0.24em] text-primary">BONINI DIGITAL</Link>
              <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
                <Link href="/" className="transition hover:text-primary">Home</Link>
                <Link href="/sobre" className="transition hover:text-primary">Sobre</Link>
                <Link href="/servicos" className="transition hover:text-primary">Serviços</Link>
                <Link href="/portfolio" className="transition hover:text-primary">Portfólio</Link>
                <Link href="/contato" className="transition hover:text-primary">Contato</Link>
              </nav>
            </div>
          </header>

          <main>{children}</main>
          <footer className="border-t border-white/10 bg-surface px-6 py-8 text-center text-sm text-slate-400">
            <div className="mx-auto max-w-7xl">Bonini Digital Template — Design escuro, moderno e pronto para Vercel.</div>
          </footer>
          <WhatsAppFloat />
        </div>
      </body>
    </html>
  );
}
