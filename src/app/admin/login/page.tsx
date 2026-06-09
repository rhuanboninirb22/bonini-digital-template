'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push('/admin/painel');
  };

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-lg items-center rounded-[2rem] border border-white/10 bg-surface/80 p-10 shadow-soft">
      <div className="w-full space-y-8">
        <div>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-primary">Painel Admin</span>
          <h1 className="mt-6 text-4xl font-semibold text-white">Acesse o painel da Bonini Digital</h1>
          <p className="mt-4 text-slate-300">Entre com seu e-mail e senha para editar o conteúdo do site e atualizar o portfólio.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block text-sm font-semibold text-white">
            E-mail
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required className="mt-3 w-full rounded-2xl border border-white/10 bg-[#161616] px-4 py-3 text-white outline-none transition focus:border-primary" />
          </label>
          <label className="block text-sm font-semibold text-white">
            Senha
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required className="mt-3 w-full rounded-2xl border border-white/10 bg-[#161616] px-4 py-3 text-white outline-none transition focus:border-primary" />
          </label>
          <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-semibold text-black transition hover:bg-[#e6a712] disabled:cursor-not-allowed disabled:opacity-70">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
          {error && <p className="text-sm text-rose-400">{error}</p>}
        </form>
      </div>
    </section>
  );
}
