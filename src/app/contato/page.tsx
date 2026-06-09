'use client';

import { useState } from 'react';

export default function Contato() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <section className="mx-auto max-w-6xl space-y-10 rounded-[2rem] border border-white/10 bg-surface/80 p-10 shadow-soft">
      <div>
        <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-primary">Contato</span>
        <h1 className="mt-6 text-4xl font-semibold text-white">Vamos conversar sobre o seu próximo projeto?</h1>
        <p className="mt-4 max-w-3xl text-slate-300">Envie sua mensagem ou use nossos canais diretos para receber uma proposta rápida e personalizada.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-background/90 p-8">
          <div className="space-y-6 text-slate-300">
            <div>
              <h2 className="text-2xl font-semibold text-white">Escritório</h2>
              <p className="mt-3">Rua Exemplo, 123 · Rio de Janeiro, RJ</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">E-mail</h2>
              <p className="mt-3">contato@boninidigital.com</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Telefone</h2>
              <p className="mt-3">+55 21 97085-3896</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
            setName('');
            setEmail('');
            setMessage('');
          }}
          className="rounded-3xl border border-white/10 bg-background/90 p-8"
        >
          <div className="space-y-6">
            <label className="block text-sm font-semibold text-white">
              Nome
              <input value={name} onChange={(event) => setName(event.target.value)} required className="mt-3 w-full rounded-2xl border border-white/10 bg-[#161616] px-4 py-3 text-white outline-none transition focus:border-primary/70" />
            </label>
            <label className="block text-sm font-semibold text-white">
              E-mail
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required className="mt-3 w-full rounded-2xl border border-white/10 bg-[#161616] px-4 py-3 text-white outline-none transition focus:border-primary/70" />
            </label>
            <label className="block text-sm font-semibold text-white">
              Mensagem
              <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={6} required className="mt-3 w-full rounded-2xl border border-white/10 bg-[#161616] px-4 py-3 text-white outline-none transition focus:border-primary/70" />
            </label>
            <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-semibold text-black transition hover:bg-[#e6a712]">Enviar mensagem</button>
            {sent && <p className="text-sm text-emerald-400">Mensagem simulada enviada com sucesso! Em produção, conecte a um serviço real.</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
