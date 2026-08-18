import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env['VITE_EXT_SUPABASE_URL'] || import.meta.env['EXT_SUPABASE_URL'];
const supabaseAnonKey = import.meta.env['VITE_EXT_SUPABASE_ANON_KEY'] || import.meta.env['EXT_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing from environment variables');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || '',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);

export type Tables = {
  products: {
    Row: {
      id: string;
      name: string;
      description: string | null;
      price: number;
      image_url: string | null;
      category_id: string | null;
      created_at: string;
    };
    Insert: {
      id?: string;
      name: string;
      description?: string | null;
      price: number;
      image_url?: string | null;
      category_id?: string | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      name?: string;
      description?: string | null;
      price?: number;
      image_url?: string | null;
      category_id?: string | null;
      created_at?: string;
    };
  };
  categories: {
    Row: {
      id: string;
      name: string;
      slug: string;
      created_at: string;
    };
    Insert: {
      id?: string;
      name: string;
      slug: string;
      created_at?: string;
    };
    Update: {
      id?: string;
      name?: string;
      slug?: string;
      created_at?: string;
    };
  };
  tags: {
    Row: {
      id: string;
      name: string;
      created_at: string;
    };
    Insert: {
      id?: string;
      name: string;
      created_at?: string;
    };
    Update: {
      id?: string;
      name?: string;
      slug?: string;
      created_at?: string;
    };
  };
  product_tags: {
    Row: {
      product_id: string;
      tag_id: string;
    };
    Insert: {
      product_id: string;
      tag_id: string;
    };
    Update: {
      product_id?: string;
      tag_id?: string;
    };
  };
  site_content: {
    Row: {
      id: string;
      key: string;
      value: any;
      updated_at: string;
    };
    Insert: {
      id?: string;
      key: string;
      value: any;
      updated_at?: string;
    };
    Update: {
      id?: string;
      key?: string;
      value?: any;
      updated_at?: string;
    };
  };
};
