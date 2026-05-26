import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if connection credentials are valid
export const isSupabaseConfigured = !!(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  supabaseUrl.trim() !== '' &&
  supabaseAnonKey.trim() !== ''
);

if (!isSupabaseConfigured) {
  console.warn(
    '⚠️ HECATE DATABASE WARNING: Supabase connection credentials (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) are not set.\n' +
    'The website is running in crash-proof LocalStorage fallback mode.\n' +
    'To activate live PostgreSQL integration, create a ".env" file in the project root containing your Supabase credentials.'
  );
}

// Initialize Supabase client if configured, otherwise export null
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
