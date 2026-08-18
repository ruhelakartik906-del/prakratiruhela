import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client.server";

// Assets to be migrated/handled
const FAKE_IMAGES = {
  flower: "https://prakratiruhela.lovable.app/assets/rakhi-flower.jpg",
  kids: "https://prakratiruhela.lovable.app/assets/rakhi-kids.jpg",
  classic: "https://prakratiruhela.lovable.app/assets/rakhi-classic.jpg",
  lumba: "https://prakratiruhela.lovable.app/assets/rakhi-lumba.jpg"
};

export const migrateExistingData = createServerFn({ method: "POST" })
  .handler(async () => {
    try {
      // 1. Categories Migration
      const mainCategories = [
        { name: "Raksha Bandhan", slug: "raksha-bandhan" },
        { name: "Hair Accessories", slug: "hair-accessories" },
        { name: "Keychains", slug: "keychains" },
        { name: "Earbuds Covers", slug: "earbuds-covers" },
        { name: "Gift Combos", slug: "gift-combos" },
        { name: "Bangles & Custom", slug: "bangles-custom" },
        { name: "Independence Day", slug: "independence-day" },
      ];

      const { data: dbCategories, error: catError } = await (supabase.from("categories") as any)
        .upsert(mainCategories, { onConflict: 'slug' })
        .select();
      
      if (catError) throw catError;

      // 2. Products Migration
      const products = [
        { name: "Marigold Bloom Rakhi", description: "Hand-crocheted marigold in scarlet and saffron cotton with gold beads.", price: 249, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.flower },
        { name: "Little Bear Rakhi", description: "A soft amigurumi bear on a stretchy band — a favourite with tiny wrists.", price: 299, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.kids },
        { name: "Pearl Heirloom Rakhi", description: "Ivory lace motif with a freshwater pearl centre and gold silk thread.", price: 349, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.classic },
        { name: "Teal Rakhi & Lumba Set", description: "Matching rakhi and lumba braid for bhaiya-bhabhi, in teal and terracotta.", price: 499, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.lumba },
        { name: "Daisy Chain Rakhi", description: "Three tiny crochet daisies strung on a cream cotton cord.", price: 229, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.flower },
        { name: "Bunny Kids Rakhi", description: "Soft crochet bear on a comfortable band for kids.", price: 449, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.kids },
        { name: "Golden Star Rakhi", description: "Minimal star motif worked in gold zari thread — understated and elegant.", price: 279, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.classic },
        { name: "Deluxe Lumba Set", description: "A complete set of handmade crochet items for your loved ones.", price: 899, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.lumba },
        { name: "Tricolor Rakhi", description: "Special edition rakhi for Independence Day, made in saffron, white and green.", price: 269, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.flower },
      ];

      for (const p of products) {
        const cat = dbCategories?.find((c: any) => c.slug === p.category_slug);
        if (cat) {
          const { category_slug, ...pData } = p;
          await (supabase.from("products") as any).upsert({
            ...pData,
            category_id: cat.id
          }, { onConflict: 'name' });
        }
      }

      // 3. Site Content Migration
      const content = [
        { key: "hero_title", value: "A rakhi made by hand, tied with love" },
        { key: "hero_description", value: "Every rakhi is crocheted one stitch at a time at home — soft on the wrist, gentle on the heart, and unlike anything from a store shelf." },
        { key: "whatsapp_number", value: "919876543210" },
        { key: "instagram_url", value: "https://www.instagram.com/crochet_by_prakrati/" },
        { key: "story_title", value: "Stitched with love, one hook at a time." },
        { key: "story_body", value: "What started as a hobby in a quiet corner of our home has grown into a small collection of handmade treasures. We believe that in a world of machines, something made by hand carries a soul of its own." },
      ];

      await (supabase.from("site_content") as any).upsert(content, { onConflict: 'key' });

      return { success: true };
    } catch (err: any) {
      console.error("Migration Error:", err);
      return { success: false, error: err.message };
    }
  });
