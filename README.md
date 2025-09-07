# Lite Finance

App de finanças pessoal. **Stack**: Vite + React (TS) no front, **Node + Express (TS)** no back, **Supabase (Postgres + Auth)** no BD.

## Status

* ✅ **BD**: Supabase criado (tabelas com RLS).
* ✅ **Back**: Express + supabase-js (service\_role) rodando.
* ⏳ **Front**: a fazer (Vite + React + TS).

## Como rodar

### 1) Backend (API)

```bash
cd api
npm i
npm run dev
# http://localhost:3000/health
```

**Variáveis (.env)** – `api/.env`

```env
PORT=3000
WEB_ORIGIN=http://localhost:5173

SUPABASE_URL=https://<SEU-REF>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=***apenas-no-backend***

# opcional pra dev sem login:
# DEV_FAKE_USER_ID=<UUID de um user do Supabase>
```

### 2) Frontend (em breve)

```bash
cd frontend
npm i
npm run dev
# http://localhost:5173
```

**Variáveis (.env)** – `frontend/.env`

```env
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_URL=https://<SEU-REF>.supabase.co
VITE_SUPABASE_ANON_KEY=***segura mas pode ficar no front***
```

## Endpoints (v1)

Base URL: `http://localhost:3000`

* `GET /health` → `{ status, timestamp, service }`
* `GET /me` *(auth)* → dados básicos do usuário
* `GET /categorias` *(auth)* → lista categorias do usuário
* `POST /categorias` *(auth)*
  Body:

  ```json
  { "nome": "Energia", "tipo": "DESPESA" }
  ```
* `GET /transacoes?mes=YYYY-MM&categoriaId=1&contaId=1` *(auth)*
* `POST /transacoes` *(auth)*
  Body:

  ```json
  {
    "valor": 99.90,
    "data": "2025-09-07",
    "descricao": "Conta de luz",
    "categoriaId": 2,
    "contaId": 1,
    "status": "confirmado",
    "tags": ["casa"]
  }
  ```
* `GET /resumos/mensal?mes=YYYY-MM` *(auth)* → total por categoria no mês

> **Auth:** enviar `Authorization: Bearer <access_token>` do Supabase. Em dev dá pra usar `DEV_FAKE_USER_ID` no `.env` do back e chamar sem header.

### Curl de teste

```bash
# health
curl http://localhost:3000/health

# com token
TOKEN="coloque_o_access_token_aqui"
curl -H "Authorization: Bearer $TOKEN" http://localhost:3000/me
curl -H "Authorization: Bearer $TOKEN" "http://localhost:3000/transacoes?mes=2025-09"
```

## Banco de dados (Supabase)

Tabelas principais:

* `profiles(user_id, display_name, ...)`
* `contas(id, user_id, nome, tipo, ...)`
* `categorias(id, user_id, nome, tipo)`
* `transacoes(id, user_id, valor, data, categoria_id, conta_id, status, tags[])`
* Extras: `metas_mensais`, `recorrencias`, `transferencias`, `tags`, `transacao_tag`, `anexos`, `importacoes_csv`.

**RLS** ligado em tudo; o back usa **service\_role** mas sempre filtra por `user_id`.

## Estrutura do projeto

```
financas-lite/
  api/
    src/
      index.ts            # bootstrap do servidor
      routes.ts           # rotas /categorias, /transacoes, /resumos
      middlewares/auth.ts # valida Bearer token (ou DEV_FAKE_USER_ID)
      supabase.ts         # client admin (service_role)
    .env
    package.json
    tsconfig.json
  frontend/               # (a criar)
  README.md
```

## Scripts úteis (API)

`package.json`:

```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

## Roadmap curto (próximas tasks)

* [ ] **Frontend**: login, layout base (shadcn/ui + Tailwind).
* [ ] Tela **Transações**: grid com filtro `mes`, criação rápida.
* [ ] **Dashboard**: receita x despesa do mês (+ resumo por categoria).
* [ ] **Categorias/Contas**: CRUD simples.
* [ ] **Importar CSV** (opcional).
* [ ] Deploy: Front (Netlify/Vercel), API (Render/Railway), BD (Supabase).

## Convenções

* **TypeScript** em tudo.
* API REST simples, JSON sempre.
* Padrão de datas: `YYYY-MM-DD` (ou ISO) no trânsito.
* Sempre filtrar por `user_id` no back.

## Troubleshooting

* **`jwt expired`**: relogar no front; no back dá pra usar `DEV_FAKE_USER_ID` pra dev.
* **CORS**: ajuste `WEB_ORIGIN` no `.env` do back (URL do front).
* **400/403**: checar body/headers; no Supabase, ver policies/constraints.
* **Porta ocupada**: mude `PORT` no `.env`.
