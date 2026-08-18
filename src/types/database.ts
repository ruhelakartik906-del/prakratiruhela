import { Tables } from '../integrations/supabase/client';

export type Product = Tables<'products'>;
export type Category = Tables<'categories'>;
export type Tag = Tables<'tags'>;
export type SiteContent = Tables<'site_content'>;

export interface ProductWithTags extends Product {
  tags?: Tag[];
  category?: Category;
}
