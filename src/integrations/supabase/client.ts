import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env['VITE_EXT_SUPABASE_URL'] || import.meta.env['EXT_SUPABASE_URL'] || (typeof process !== 'undefined' ? process.env['EXT_SUPABASE_URL'] : undefined)) as string;
const supabaseAnonKey = (import.meta.env['VITE_EXT_SUPABASE_ANON_KEY'] || import.meta.env['EXT_SUPABASE_ANON_KEY'] || (typeof process !== 'undefined' ? process.env['EXT_SUPABASE_ANON_KEY'] : undefined)) as string;

if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== 'undefined') {
    console.error('Supabase credentials missing from environment variables');
  }
}

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          image_url: string | null;
          category_id: string | null;
          active: boolean;
          bestseller: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price?: number;
          image_url?: string | null;
          category_id?: string | null;
          active?: boolean;
          bestseller?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          price?: number;
          image_url?: string | null;
          category_id?: string | null;
          active?: boolean;
          bestseller?: boolean;
          created_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          image_url?: string | null;
          created_at?: string;
        };
      };
      tags: {
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
  };
};

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

export const supabase = createClient<Database>(
  supabaseUrl || 'https://wxqzyvrvaflenisqsahz.supabase.co',
  supabaseAnonKey || 'sb_publishable_uw68otvfEAlQLMVoR4YW1Q_Q-_NqLLN',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);
