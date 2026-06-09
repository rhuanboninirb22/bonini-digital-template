import { Briefcase, Code2, BarChart3 } from 'lucide-react';

const services = [
  { icon: <Briefcase className="h-6 w-6" />, title: 'Sites Institucionais', description: 'Layouts exclusivos e responsivos para apresentar serviços, equipe e diferenciais.' },
  { icon: <Code2 className="h-6 w-6" />, title: 'E-commerce leve', description: 'Lojas online simples, seguras e com foco em experiência do usuário para vender mais.' },
  { icon: <BarChart3 className="h-6 w-6" />, title: 'Otimização digital', description: 'SEO técnico, performance e ajustes que ajudam seu site a ser encontrado mais rápido.' }
];

export default function Servicos() {
  return (
    <section className="mx-auto max-w-6xl space-y-10">
      <div className="rounded-[2rem] border border-white/10 bg-surface/80 p-10 shadow-soft">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-primary">Serviços</span>
        <h1 className="mt-6 text-4xl font-semibold text-white">Ofertas completas para elevar sua presença digital.</h1>
        <p className="mt-4 max-w-3xl text-slate-300">Conteúdo, design e tecnologia pensados para capturar leads, fortalecer sua marca e aumentar conversões.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {services.map((item) => (
          <article key={item.title} className="rounded-3xl border border-white/10 bg-background/90 p-8 shadow-soft transition hover:-translate-y-1 hover:border-primary/50">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary">{item.icon}</div>
            <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
            <p className="mt-4 text-slate-300">{item.description}</p>
          </article>
        ))}
      </div>

      <div className="rounded-3xl border border-white/10 bg-background/90 p-8">
        <h2 className="text-3xl font-semibold text-white">Pacotes adaptáveis</h2>
        <p className="mt-4 text-slate-300">Desde landing pages até sites completos com formulário de contato, cada pacote é flexível para o seu orçamento.</p>
      </div>
    </section>
  );
}
