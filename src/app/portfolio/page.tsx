import Link from 'next/link';
import { supabase } from '@/lib/supabase';

type PortfolioItem = {
  id: string;
  titulo: string;
  categoria: string;
  descricao: string;
  imagem_url: string;
  slug: string;
};

export default async function Portfolio() {
  const { data: projects, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .order('created_at', { ascending: false });

  const items = projects || [];

  return (
    <section className="mx-auto max-w-7xl space-y-10">
      <div className="rounded-[2rem] border border-white/10 bg-surface/80 p-10 shadow-soft">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-primary">Portfólio</span>
        <h1 className="mt-6 text-4xl font-semibold text-white">Projetos que mostram presença, clareza e impacto visual.</h1>
        <p className="mt-4 max-w-3xl text-slate-300">Galeria dos projetos cadastrados no painel administrativo. Clique em cada cartão para ver os detalhes.</p>
      </div>

      {error ? (
        <div className="rounded-[2rem] border border-rose-500/20 bg-[#1f1111] p-10 text-slate-300">Erro ao carregar portfólio: {error.message}</div>
      ) : items.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-background/90 p-10 text-slate-300">Nenhum item de portfólio encontrado. Adicione projetos no painel administrativo.</div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {items.map((project) => (
            <Link key={project.slug} href={`/portfolio/${project.slug}`} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#1e1e1e] to-[#111111] transition hover:-translate-y-1">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#111111]">
                {project.imagem_url ? (
                  <img src={project.imagem_url} alt={project.titulo} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[#121212] text-slate-500">Sem imagem disponível</div>
                )}
              </div>
              <div className="p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-primary">{project.categoria}</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">{project.titulo}</h2>
                <p className="mt-3 text-slate-300 line-clamp-3">{project.descricao}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">Ver detalhes</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
