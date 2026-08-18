import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

export const getAdminStats = createServerFn({ method: "GET" })
  .handler(async () => {
    const [products, categories, tags] = await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("categories").select("id", { count: "exact", head: true }),
      supabase.from("tags").select("id", { count: "exact", head: true }),
    ]);

    return {
      productsCount: products.count || 0,
      categoriesCount: categories.count || 0,
      tagsCount: tags.count || 0,
    };
  });
