import { createClient } from '@supabase/supabase-js';
import { Database } from './client';

const supabaseUrl = process.env['EXT_SUPABASE_URL'] || process.env['VITE_EXT_SUPABASE_URL'];
const supabaseAnonKey = process.env['EXT_SUPABASE_ANON_KEY'] || process.env['VITE_EXT_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Server Supabase credentials missing');
}

export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder',
  {
    auth: {
      persistSession: false
    }
  }
);
