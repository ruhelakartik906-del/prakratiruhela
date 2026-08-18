import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client.server";

// Stats
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

// Products
export const getProducts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*), tags:product_tags(tag:tags(*))")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
});

export const upsertProduct = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    const { tag_ids, ...productData } = data;
    const { data: product, error } = await (supabase.from("products") as any).upsert(productData).select().single();
    if (error) throw error;

    if (tag_ids && product) {
      await (supabase.from("product_tags") as any).delete().eq("product_id", product.id);
      if (tag_ids.length > 0) {
        const { error: tagError } = await (supabase.from("product_tags") as any).insert(
          tag_ids.map((tag_id: string) => ({ product_id: product.id, tag_id }))
        );
        if (tagError) throw tagError;
      }
    }

    return { success: true, product };
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data: id }) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  });

// Categories
export const getCategories = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabase.from("categories").select("*").order("name");
  if (error) throw error;
  return data;
});

export const upsertCategory = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    const { error } = await (supabase.from("categories") as any).upsert(data);
    if (error) throw error;
    return { success: true };
  });

export const deleteCategory = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data: id }) => {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  });

// Tags
export const getTags = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabase.from("tags").select("*").order("name");
  if (error) throw error;
  return data;
});

export const upsertTag = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    const { error } = await (supabase.from("tags") as any).upsert(data);
    if (error) throw error;
    return { success: true };
  });

export const deleteTag = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data: id }) => {
    const { error } = await supabase.from("tags").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  });

// Site Content
export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabase.from("site_content").select("*");
  if (error) throw error;
  return data;
});

export const updateSiteContent = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    const { error } = await (supabase.from("site_content") as any).upsert({ 
      key: data.id, 
      value: data.value,
      updated_at: new Date().toISOString()
    }, { onConflict: 'key' });
    if (error) throw error;
    return { success: true };
  });
