import { createClient } from '@supabase/supabase-js';
import { Tables } from './client';

const supabaseUrl = process.env['EXT_SUPABASE_URL'] || process.env['VITE_EXT_SUPABASE_URL'];
const supabaseAnonKey = process.env['EXT_SUPABASE_ANON_KEY'] || process.env['VITE_EXT_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Server Supabase credentials missing');
}

export const supabase = createClient<Tables>(
  supabaseUrl || '',
  supabaseAnonKey || '',
  {
    auth: {
      persistSession: false
    }
  }
);
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
