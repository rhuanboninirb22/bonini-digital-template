import Link from 'next/link';

export default function Sobre() {
  return (
    <section className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-surface/80 p-10 shadow-soft">
      <div className="mb-10 max-w-3xl">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-primary">Sobre Nós</span>
        <h1 className="mt-6 text-4xl font-semibold text-white">História da Bonini Digital</h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">Somos uma equipe apaixonada por criar experiências digitais que unem estética, estratégia e performance. Cada projeto nasce de um planejamento sólido e de um olhar atento para os resultados.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-background/90 p-8">
          <h2 className="text-2xl font-semibold text-white">Nossa missão</h2>
          <p className="mt-4 text-slate-300">Ajudar pequenas e médias empresas a se posicionarem de forma profissional online, com sites modernos, rápidos e visualmente impactantes.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-background/90 p-8">
          <h2 className="text-2xl font-semibold text-white">Nossos valores</h2>
          <ul className="mt-4 space-y-4 text-slate-300">
            <li>• Transparência e comunicação direta.</li>
            <li>• Resultados mensuráveis e design com propósito.</li>
            <li>• Entrega ágil sem perder a qualidade.</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 rounded-3xl border border-white/10 bg-background/90 p-8 text-slate-300">
        <h2 className="text-2xl font-semibold text-white">O que nos diferencia</h2>
        <p className="mt-4 leading-8">Desenvolvemos sites prontos para apresentar marcas com autoridade. Cada detalhe da interface é pensado para converter visitantes em clientes, enquanto a estética dark mode cria uma identidade premium e memorável.</p>
        <Link href="/contato" className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#e6a712]">Fale com um especialista</Link>
      </div>
    </section>
  );
}
