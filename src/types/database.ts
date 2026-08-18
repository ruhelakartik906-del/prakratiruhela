import { Tables } from '../integrations/supabase/client';

export type Product = Tables['products']['Row'];
export type Category = Tables['categories']['Row'];
export type Tag = Tables['tags']['Row'];
export type SiteContent = Tables['site_content']['Row'];

export interface ProductWithTags extends Product {
  tags?: Tag[];
  category?: Category;
}
