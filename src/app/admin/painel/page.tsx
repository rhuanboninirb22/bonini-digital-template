'use client';

import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type ServiceItem = { title: string; description: string };

export default function AdminPainel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  // Home banner
  const [bannerTitle, setBannerTitle] = useState('Transformamos presença digital em autoridade e vendas.');
  const [bannerSubtitle, setBannerSubtitle] = useState('Atualize o texto do banner da home diretamente aqui.');
  const [bannerCta, setBannerCta] = useState('Solicitar Proposta');

  // Portfolio
  const [portfolioUrls, setPortfolioUrls] = useState<string[]>(['https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80']);

  // Sobre
  const [sobreTitle, setSobreTitle] = useState('História da Bonini Digital');
  const [sobreDescription, setSobreDescription] = useState('Somos uma equipe apaixonada por criar experiências digitais que unem estética, estratégia e performance.');

  // Serviços
  const [services, setServices] = useState<ServiceItem[]>([
    { title: 'Websites com conversão', description: 'Landing pages e sites institucionais com foco em resultados diretos.' }
  ]);

  // Contato
  const [whatsapp, setWhatsapp] = useState('+5521970853896');
  const [contactEmail, setContactEmail] = useState('contato@boninidigital.com');
  const [footerText, setFooterText] = useState('© 2026 Bonini Digital. Todos os direitos reservados.');

  // UI Tab
  const [activeTab, setActiveTab] = useState<'home' | 'portfolio' | 'sobre' | 'servicos' | 'contato'>('home');

  useEffect(() => {
    const loadContent = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        router.push('/admin/login');
        return;
      }

      const { data, error } = await supabase.from('conteudo_site').select('*');
      if (error) {
        console.error(error);
        setMessage('Não foi possível carregar o conteúdo. Verifique a tabela `conteudo_site` no Supabase.');
        setLoading(false);
        return;
      }

      const find = (id: string) => data?.find((row: any) => row.id === id)?.content;

      const bannerRow = find('home_banner');
      const imagesRow = find('portfolio_images');
      const sobreRow = find('sobre');
      const servicosRow = find('servicos');
      const contatoRow = find('contato');

      if (bannerRow) {
        setBannerTitle(bannerRow.title || bannerTitle);
        setBannerSubtitle(bannerRow.subtitle || bannerSubtitle);
        setBannerCta(bannerRow.cta || bannerCta);
      }

      if (imagesRow?.images) setPortfolioUrls(imagesRow.images);

      if (sobreRow) {
        setSobreTitle(sobreRow.title || sobreTitle);
        setSobreDescription(sobreRow.description || sobreDescription);
      }

      if (servicosRow?.items) setServices(servicosRow.items);

      if (contatoRow) {
        setWhatsapp(contatoRow.whatsapp || whatsapp);
        setContactEmail(contatoRow.email || contactEmail);
        setFooterText(contatoRow.footer || footerText);
      }

      setLoading(false);
    };

    loadContent();
  }, [router]);

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    const payloads = [
      { id: 'home_banner', content: { title: bannerTitle, subtitle: bannerSubtitle, cta: bannerCta } },
      { id: 'portfolio_images', content: { images: portfolioUrls } },
      { id: 'sobre', content: { title: sobreTitle, description: sobreDescription } },
      { id: 'servicos', content: { items: services } },
      { id: 'contato', content: { whatsapp, email: contactEmail, footer: footerText } }
    ];

    const { error } = await supabase.from('conteudo_site').upsert(payloads, { onConflict: 'id' });

    if (error) {
      setMessage(`Erro ao salvar: ${error.message}`);
      return;
    }

    setMessage('Conteúdo salvo com sucesso. Atualize a página pública para ver o resultado.');
  };

  const handleImageChange = (index: number, value: string) => {
    setPortfolioUrls((current) => {
      const next = [...current];
      next[index] = value;
      return next;
    });
  };

  const addImageField = () => setPortfolioUrls((current) => [...current, '']);
  const removeImageField = (index: number) => setPortfolioUrls((current) => current.filter((_, idx) => idx !== index));

  const updateService = (index: number, field: 'title' | 'description', value: string) => {
    setServices((cur) => cur.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const addService = () => setServices((cur) => [...cur, { title: '', description: '' }]);
  const removeService = (index: number) => setServices((cur) => cur.filter((_, i) => i !== index));

  return (
    <section className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-surface/80 p-10 shadow-soft">
      <div className="mb-8">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-primary">Administração</span>
        <h1 className="mt-6 text-4xl font-semibold text-white">Painel de Conteúdo</h1>
        <p className="mt-4 max-w-3xl text-slate-300">Edite o conteúdo do site: Home, Sobre, Serviços, Portfólio e Contato.</p>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-white/10 bg-background/90 p-10 text-slate-300">Carregando painel...</div>
      ) : (
        <form onSubmit={handleSave} className="space-y-8">
          <div className="flex w-full gap-4">
            <nav className="flex gap-2">
              {[
                { key: 'home', label: 'Home' },
                { key: 'portfolio', label: 'Portfólio' },
                { key: 'sobre', label: 'Sobre' },
                { key: 'servicos', label: 'Serviços' },
                { key: 'contato', label: 'Contato' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${activeTab === tab.key ? 'bg-primary text-black' : 'bg-background/70 text-slate-300'}`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {activeTab === 'home' && (
            <div className="rounded-3xl border border-white/10 bg-background/90 p-8">
              <h2 className="text-2xl font-semibold text-white">Banner da home</h2>
              <div className="mt-6 grid gap-6">
                <label className="block text-sm font-semibold text-white">
                  Título
                  <input value={bannerTitle} onChange={(event) => setBannerTitle(event.target.value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-[#161616] px-4 py-3 text-white outline-none focus:border-primary" />
                </label>
                <label className="block text-sm font-semibold text-white">
                  Subtítulo
                  <textarea value={bannerSubtitle} onChange={(event) => setBannerSubtitle(event.target.value)} rows={3} className="mt-3 w-full rounded-2xl border border-white/10 bg-[#161616] px-4 py-3 text-white outline-none focus:border-primary" />
                </label>
                <label className="block text-sm font-semibold text-white">
                  Texto do botão
                  <input value={bannerCta} onChange={(event) => setBannerCta(event.target.value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-[#161616] px-4 py-3 text-white outline-none focus:border-primary" />
                </label>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="rounded-3xl border border-white/10 bg-background/90 p-8">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold text-white">Imagens do portfólio</h2>
                <button type="button" onClick={addImageField} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#e6a712]">Adicionar</button>
              </div>
              <div className="mt-6 space-y-4">
                {portfolioUrls.map((url, index) => (
                  <div key={`image-${index}`} className="grid gap-3 sm:grid-cols-[1fr_auto]">
                    <input
                      value={url}
                      onChange={(event) => handleImageChange(index, event.target.value)}
                      placeholder="URL da imagem do projeto"
                      className="rounded-2xl border border-white/10 bg-[#161616] px-4 py-3 text-white outline-none focus:border-primary"
                    />
                    <button type="button" onClick={() => removeImageField(index)} className="rounded-full border border-white/10 px-4 py-3 text-sm text-slate-200 transition hover:border-rose-400 hover:text-rose-300">Remover</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sobre' && (
            <div className="rounded-3xl border border-white/10 bg-background/90 p-8">
              <h2 className="text-2xl font-semibold text-white">Seção Sobre</h2>
              <div className="mt-6 grid gap-6">
                <label className="block text-sm font-semibold text-white">
                  Título
                  <input value={sobreTitle} onChange={(e) => setSobreTitle(e.target.value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-[#161616] px-4 py-3 text-white outline-none focus:border-primary" />
                </label>
                <label className="block text-sm font-semibold text-white">
                  Descrição
                  <textarea value={sobreDescription} onChange={(e) => setSobreDescription(e.target.value)} rows={6} className="mt-3 w-full rounded-2xl border border-white/10 bg-[#161616] px-4 py-3 text-white outline-none focus:border-primary" />
                </label>
              </div>
            </div>
          )}

          {activeTab === 'servicos' && (
            <div className="rounded-3xl border border-white/10 bg-background/90 p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white">Serviços</h2>
                <button type="button" onClick={addService} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#e6a712]">Adicionar serviço</button>
              </div>
              <div className="mt-6 space-y-4">
                {services.map((s, idx) => (
                  <div key={`service-${idx}`} className="rounded-2xl border border-white/10 bg-[#111111] p-4">
                    <div className="grid gap-3">
                      <input value={s.title} onChange={(e) => updateService(idx, 'title', e.target.value)} placeholder="Título do serviço" className="w-full rounded-2xl border border-white/10 bg-[#161616] px-4 py-3 text-white outline-none focus:border-primary" />
                      <textarea value={s.description} onChange={(e) => updateService(idx, 'description', e.target.value)} rows={3} placeholder="Descrição" className="w-full rounded-2xl border border-white/10 bg-[#161616] px-4 py-3 text-white outline-none focus:border-primary" />
                      <div className="flex justify-end">
                        <button type="button" onClick={() => removeService(idx)} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-rose-400 hover:text-rose-300">Remover</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contato' && (
            <div className="rounded-3xl border border-white/10 bg-background/90 p-8">
              <h2 className="text-2xl font-semibold text-white">Contato</h2>
              <div className="mt-6 grid gap-6">
                <label className="block text-sm font-semibold text-white">
                  WhatsApp
                  <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-[#161616] px-4 py-3 text-white outline-none focus:border-primary" />
                </label>
                <label className="block text-sm font-semibold text-white">
                  E-mail
                  <input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-[#161616] px-4 py-3 text-white outline-none focus:border-primary" />
                </label>
                <label className="block text-sm font-semibold text-white">
                  Texto de rodapé
                  <input value={footerText} onChange={(e) => setFooterText(e.target.value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-[#161616] px-4 py-3 text-white outline-none focus:border-primary" />
                </label>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-semibold text-black transition hover:bg-[#e6a712]">Salvar alterações</button>
            {message && <p className="text-sm text-slate-300">{message}</p>}
          </div>
        </form>
      )}
    </section>
  );
}
