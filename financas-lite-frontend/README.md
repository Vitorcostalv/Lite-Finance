# Lite Finance - Frontend

Frontend do sistema Lite Finance desenvolvido em React + TypeScript + Tailwind CSS.

## 🚀 Tecnologias

- **React 18** com TypeScript
- **Vite** para build e desenvolvimento
- **Tailwind CSS** para estilização
- **React Router** para navegação
- **Zustand** para gerenciamento de estado
- **TanStack Query** para cache e sincronização de dados
- **Supabase** para autenticação
- **Lucide React** para ícones

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local com suas credenciais do Supabase
```

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
VITE_API_URL=http://localhost:3000
```

### 2. Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Copie a URL e a chave anônima para o arquivo `.env.local`
3. Configure as políticas de autenticação no Supabase

### 3. Backend

Certifique-se de que o backend está rodando na porta 3000:

```bash
cd ../api
npm run dev
```

## 🏃‍♂️ Executando

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📱 Funcionalidades

### ✅ Implementadas

- **Autenticação**: Login/signup com Supabase
- **Layout Responsivo**: Sidebar + topbar com tema dark
- **Dashboard**: KPIs, gráficos e metas
- **Transações**: Lista, filtros e ações em lote
- **Navegação**: Rotas protegidas e navegação fluida

### 🚧 Em Desenvolvimento

- **Categorias**: Gerenciamento de categorias
- **Contas**: Gerenciamento de contas e transferências
- **Recorrências**: Transações recorrentes
- **Configurações**: Preferências do usuário

## 🎨 Design System

### Cores

- **Background**: `#0B0F14` (dark)
- **Card**: `#0F141A`
- **Muted**: `#9AA4B2`
- **Primary**: `#22C55E` (verde)
- **Despesa**: `#EF4444` (vermelho)
- **Receita**: `#10B981` (verde)
- **Accent**: `#6366F1` (roxo)

### Componentes

- **Botões**: `.btn`, `.btn-primary`, `.btn-secondary`
- **Cards**: `.card`
- **Inputs**: Estilizados com Tailwind

## 🔧 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── Layout.tsx      # Layout principal
├── pages/              # Páginas da aplicação
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   └── Transacoes.tsx
├── stores/             # Estado global (Zustand)
│   ├── auth.ts         # Estado de autenticação
│   └── global.ts       # Estado global (mês, busca, etc.)
├── lib/                # Utilitários
│   └── supabase.ts     # Configuração do Supabase
└── App.tsx             # Componente principal
```

## 🚀 Próximos Passos

1. **Categorias**: Implementar CRUD de categorias
2. **Contas**: Implementar CRUD de contas
3. **Modal Nova Transação**: Formulário completo
4. **API Integration**: Conectar com o backend
5. **Skeletons**: Estados de loading
6. **Toasts**: Notificações de sucesso/erro
7. **Atalhos**: Teclado para ações rápidas

## 📝 Notas

- O projeto usa dados mockados para demonstração
- A autenticação está configurada mas precisa das credenciais do Supabase
- O tema dark é aplicado por padrão
- Responsivo para mobile e desktop