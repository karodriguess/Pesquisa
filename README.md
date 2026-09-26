# Pesquisa sobre criação de conteúdo

Pesquisa em formato de onboarding (uma pergunta por tela), feita com React, Vite, Tailwind e Supabase.

## Rodando localmente

```bash
npm install
cp .env.example .env   # preencha com os dados do seu projeto Supabase
npm run dev
```

Sem o `.env`, a pesquisa funciona normalmente, mas as respostas não são salvas.

## Supabase

1. Crie um projeto em https://supabase.com
2. Abra **SQL Editor** e execute [`supabase/schema.sql`](supabase/schema.sql)
3. Em **Project Settings → API**, copie a *Project URL* e a chave *anon public* para o `.env`

Tabelas criadas:

- `survey_responses`: uma linha por pesquisa concluída
- `interested_leads`: @ do Instagram de quem clicou em "Tenho interesse", ligado à resposta

Visitantes só podem **inserir** dados (RLS). Para ver os resultados, use o **Table Editor** do Supabase.

## Editando perguntas

Todas as perguntas ficam em [`src/data/questions.js`](src/data/questions.js). Se mudar o `id` de uma pergunta, ajuste também a coluna correspondente no banco.

## Build

```bash
npm run build   # gera a pasta dist/ para publicar (Vercel, Netlify etc.)
```
