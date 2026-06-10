-- Cria a tabela de conteúdo do site usada pelo painel administrativo
CREATE TABLE IF NOT EXISTS public.conteudo_site (
  id TEXT PRIMARY KEY,
  content JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilita Row Level Security
ALTER TABLE public.conteudo_site ENABLE ROW LEVEL SECURITY;

-- Remove políticas antigas antes de criar novas para evitar conflito
DROP POLICY IF EXISTS conteudo_site_public_select ON public.conteudo_site;
DROP POLICY IF EXISTS conteudo_site_insert_authenticated ON public.conteudo_site;
DROP POLICY IF EXISTS conteudo_site_update_authenticated ON public.conteudo_site;
DROP POLICY IF EXISTS conteudo_site_delete_authenticated ON public.conteudo_site;

-- Permite leitura pública (SELECT) para todos
CREATE POLICY conteudo_site_public_select
  ON public.conteudo_site
  FOR SELECT
  USING (true);

-- Permite INSERT apenas para usuários autenticados
CREATE POLICY conteudo_site_insert_authenticated
  ON public.conteudo_site
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.role() = 'authenticated');

-- Permite UPDATE apenas para usuários autenticados
CREATE POLICY conteudo_site_update_authenticated
  ON public.conteudo_site
  FOR UPDATE
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Permite DELETE apenas para usuários autenticados
CREATE POLICY conteudo_site_delete_authenticated
  ON public.conteudo_site
  FOR DELETE
  TO authenticated
  USING (auth.role() = 'authenticated');

-- Exemplos de conteúdo inicial para a aplicação
INSERT INTO public.conteudo_site (id, content)
VALUES
  ('home_banner', '{"title": "Transformamos presença digital em autoridade e vendas.", "subtitle": "Atualize o texto do banner da home diretamente aqui.", "cta": "Solicitar Proposta"}'::jsonb)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.conteudo_site (id, content)
VALUES
  ('portfolio_images', '{"images": ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"]}'::jsonb)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.conteudo_site (id, content)
VALUES
  ('sobre', '{"title": "História da Bonini Digital", "description": "Somos uma equipe apaixonada por criar experiências digitais que unem estética, estratégia e performance."}'::jsonb)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.conteudo_site (id, content)
VALUES
  ('servicos', '{"items": [{"title": "Websites com conversão", "description": "Landing pages e sites institucionais com foco em resultados diretos."}, {"title": "Design de marca", "description": "Identidade visual premium alinhada ao posicionamento da sua empresa."}, {"title": "SEO e performance", "description": "Sites otimizados para buscas e carregamento rápido em desktop e mobile."}]}'::jsonb)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.conteudo_site (id, content)
VALUES
  ('contato', '{"whatsapp": "+5521970853896", "email": "contato@boninidigital.com", "footer": "© 2026 Bonini Digital. Todos os direitos reservados."}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Cria tabela de portfólio com imagens vinculadas ao Supabase Storage
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  categoria TEXT NOT NULL,
  descricao TEXT NOT NULL,
  imagem_url TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS portfolio_items_public_select ON public.portfolio_items;
DROP POLICY IF EXISTS portfolio_items_insert_authenticated ON public.portfolio_items;
DROP POLICY IF EXISTS portfolio_items_update_authenticated ON public.portfolio_items;
DROP POLICY IF EXISTS portfolio_items_delete_authenticated ON public.portfolio_items;

CREATE POLICY portfolio_items_public_select
  ON public.portfolio_items
  FOR SELECT
  USING (true);

CREATE POLICY portfolio_items_insert_authenticated
  ON public.portfolio_items
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY portfolio_items_update_authenticated
  ON public.portfolio_items
  FOR UPDATE
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY portfolio_items_delete_authenticated
  ON public.portfolio_items
  FOR DELETE
  TO authenticated
  USING (auth.role() = 'authenticated');

-- Exemplo de item de portfólio inicial. Atualize essa URL para sua imagem no bucket.
INSERT INTO public.portfolio_items (titulo, categoria, descricao, imagem_url, slug)
VALUES
  (
    'Cliente Premium',
    'Website Institucional',
    'Design dark mode com foco em conversão e identidade digital sofisticada.',
    'https://pkidzffffaigbvwzrqvf.supabase.co/storage/v1/object/public/portfolio/cliente-premium.jpg',
    'cliente-premium'
  )
ON CONFLICT (slug) DO NOTHING;
