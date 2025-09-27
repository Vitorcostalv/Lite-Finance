// Copie este arquivo para .env.local na raiz do projeto
// e configure suas variáveis de ambiente

export const envExample = {
  // Supabase Configuration
  VITE_SUPABASE_URL: 'your_supabase_url_here',
  VITE_SUPABASE_ANON_KEY: 'your_supabase_anon_key_here',
  
  // API Configuration  
  VITE_API_URL: 'http://localhost:3000',
}

// Para usar no código:
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
// const apiUrl = import.meta.env.VITE_API_URL
