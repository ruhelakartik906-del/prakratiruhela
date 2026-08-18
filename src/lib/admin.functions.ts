import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

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

export const deleteProduct = createServerFn({ method: "POST" })
  .input(z.string())
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
  .input(z.object({
    id: z.string().optional(),
    name: z.string(),
    slug: z.string(),
    image_url: z.string().optional().nullable(),
  }))
  .handler(async ({ data }) => {
    const { error } = await supabase.from("categories").upsert(data);
    if (error) throw error;
    return { success: true };
  });

// Tags
export const getTags = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabase.from("tags").select("*").order("name");
  if (error) throw error;
  return data;
});

// Site Content
export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabase.from("site_content").select("*");
  if (error) throw error;
  return data;
});

export const updateSiteContent = createServerFn({ method: "POST" })
  .input(z.object({ id: z.string(), value: z.any() }))
  .handler(async ({ data }) => {
    const { error } = await supabase.from("site_content").update({ value: data.value }).eq("id", data.id);
    if (error) throw error;
    return { success: true };
  });
