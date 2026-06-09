'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Layers, Users, ShieldCheck } from 'lucide-react';

const services = [
  { title: 'Websites com conversão', description: 'Landing pages e sites institucionais com foco em resultados diretos.' },
  { title: 'Design de marca', description: 'Identidade visual premium alinhada ao posicionamento da sua empresa.' },
  { title: 'SEO e performance', description: 'Sites otimizados para buscas e carregamento rápido em desktop e mobile.' }
];

const testimonials = [
  { name: 'Marina Santos', quote: 'O site entregou a imagem que nossa marca precisava e dobrou o contato qualificado.' },
  { name: 'Carla Almeida', quote: 'Processo rápido, comunicação transparente e resultado impecável.' }
];

export default function Home() {
  return (
    <div className="space-y-24">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-surface/80 px-6 py-16 shadow-soft sm:px-10 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-primary">Template Mestre</span>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">Transformamos presença digital em autoridade, performance e novas vendas.</h1>
          <p className="mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">Bonini Digital entrega sites modernos em dark mode, projetados para pequenas empresas que querem crescer com presença online premium.</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/contato" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-semibold text-black transition hover:bg-[#e6a712]">Solicitar Proposta</Link>
            <Link href="/portfolio" className="inline-flex items-center justify-center rounded-full border border-white/10 px-8 py-4 text-sm font-semibold text-white transition hover:border-primary hover:text-primary">Ver Portfólio</Link>
          </div>
        </motion.div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Nossos serviços</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Soluções completas para empresas que buscam impacto.</h2>
            </div>
            <p className="max-w-xl text-slate-300">Cada serviço é pensado para gerar posicionamento de marca, engajamento e resultados reais no digital.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl border border-white/10 bg-surface/80 p-8 shadow-soft"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-slate-300">{service.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface/80">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Depoimentos</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Clientes que já viram a diferença.</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {testimonials.map((testimonial) => (
              <motion.article
                key={testimonial.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl border border-white/10 bg-background/80 p-8 shadow-soft"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-slate-400">Cliente satisfeito</p>
                  </div>
                </div>
                <p className="text-slate-300">“{testimonial.quote}”</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-surface/80 p-10 shadow-soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Por que escolher</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Uma agência focada em inovação, clareza e retorno.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Design estratégico', icon: <Sparkles className="h-5 w-5" /> },
              { label: 'Suporte dedicado', icon: <ShieldCheck className="h-5 w-5" /> },
              { label: 'Entrega no prazo', icon: <Sparkles className="h-5 w-5" /> }
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-background/80 px-5 py-5 text-center">
                <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">{item.icon}</div>
                <p className="text-base font-semibold text-white">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
