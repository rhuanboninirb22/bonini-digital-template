const projects = [
  { title: 'Cliente Premium', category: 'Website Institucional', description: 'Design dark mode com foco em conversão e identidade digital sofisticada.' },
  { title: 'Loja Local', category: 'E-commerce leve', description: 'Experiência de compra simples e rápida para público mobile e desktop.' },
  { title: 'Agência Criativa', category: 'Portfólio Online', description: 'Projeto visual elegante para reforçar posicionamento de marca.' },
  { title: 'Startup Tech', category: 'Landing Page', description: 'Página otimizada para captura de leads de forma eficiente.' }
];

export default function Portfolio() {
  return (
    <section className="mx-auto max-w-7xl space-y-10">
      <div className="rounded-[2rem] border border-white/10 bg-surface/80 p-10 shadow-soft">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-primary">Portfólio</span>
        <h1 className="mt-6 text-4xl font-semibold text-white">Projetos que mostram presença, clareza e impacto visual.</h1>
        <p className="mt-4 max-w-3xl text-slate-300">Galeria de projetos e propostas de layout para inspirar sua próxima identidade digital.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <article key={project.title} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#1e1e1e] to-[#111111] p-0 shadow-soft transition hover:-translate-y-1">
            <div className="aspect-[16/10] bg-[radial-gradient(circle_at_top_left,_rgba(253,184,19,0.18),_transparent_38%)] p-6">
              <div className="flex h-full flex-col justify-end rounded-[2rem] border border-white/5 bg-surface/90 p-6 backdrop-blur-md">
                <p className="text-sm uppercase tracking-[0.3em] text-primary">{project.category}</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">{project.title}</h2>
                <p className="mt-3 text-slate-300">{project.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">Ver detalhes</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
