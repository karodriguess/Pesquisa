-- Execute no SQL Editor do Supabase.

create table if not exists public.survey_responses (
  id uuid primary key,
  perfil text not null,
  uso_redes text not null,
  divulgacao text not null,
  dificuldade text not null,
  criacao text not null,
  investimento text not null,
  recurso text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.interested_leads (
  id uuid primary key default gen_random_uuid(),
  response_id uuid references public.survey_responses (id) on delete set null,
  instagram text not null,
  created_at timestamptz not null default now()
);

-- Visitantes anônimos podem apenas inserir (nunca ler, editar ou apagar).
alter table public.survey_responses enable row level security;
alter table public.interested_leads enable row level security;

create policy "anon insert responses"
  on public.survey_responses for insert to anon with check (true);

create policy "anon insert leads"
  on public.interested_leads for insert to anon with check (true);
