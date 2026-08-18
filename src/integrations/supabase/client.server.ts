import { createClient } from '@supabase/supabase-js';
import { Database } from './client';

const supabaseUrl = process.env['EXT_SUPABASE_URL'] || process.env['VITE_EXT_SUPABASE_URL'];
const supabaseServiceRoleKey = process.env['EXT_SUPABASE_SERVICE_ROLE_KEY'];

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Server Supabase credentials missing (URL or SERVICE_ROLE_KEY)');
}

// This client uses the service role key and should ONLY be used in server functions
// to bypass RLS for administrative tasks like migration.
export const supabaseAdmin = createClient<Database>(
  supabaseUrl || 'https://wxqzyvrvaflenisqsahz.supabase.co',
  supabaseServiceRoleKey || '',
  {
    auth: {
      persistSession: false
    }
  }
);

// We keep a standard client for normal server operations that should respect RLS
const supabaseAnonKey = process.env['EXT_SUPABASE_ANON_KEY'] || process.env['VITE_EXT_SUPABASE_ANON_KEY'];

export const supabase = createClient<Database>(
  supabaseUrl || 'https://wxqzyvrvaflenisqsahz.supabase.co',
  supabaseAnonKey || 'sb_publishable_uw68otvfEAlQLMVoR4YW1Q_Q-_NqLLN',
  {
    auth: {
      persistSession: false
    }
  }
);
