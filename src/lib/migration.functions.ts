import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

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
      if (!process.env['EXT_SUPABASE_SERVICE_ROLE_KEY']) {
        throw new Error("Service role key is not configured. Migration cannot run.");
      }

      const results = {
        categories: 0,
        tags: 0,
        products: 0,
        productTags: 0,
        siteContent: 0,
      };

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

      const { data: dbCategories, error: catError } = await supabaseAdmin
        .from("categories")
        .upsert(mainCategories, { onConflict: 'slug' })
        .select();
      
      if (catError) throw catError;
      results.categories = dbCategories?.length || 0;

      // 2. Tags Migration
      // Extracted from design and common crochet themes
      const tags = [
        { name: "Flower" },
        { name: "Kids" },
        { name: "Classic" },
        { name: "Lumba" },
        { name: "Handmade" },
        { name: "Cotton" },
        { name: "Gift" },
      ];

      const { data: dbTags, error: tagError } = await supabaseAdmin
        .from("tags")
        .upsert(tags, { onConflict: 'name' })
        .select();

      if (tagError) throw tagError;
      results.tags = dbTags?.length || 0;

      // 3. Products Migration
      const productsData = [
        { name: "Marigold Bloom Rakhi", slug: "marigold-bloom-rakhi", description: "Hand-crocheted marigold in scarlet and saffron cotton with gold beads.", price: 249, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.flower, active: true, tags: ["Flower", "Handmade"] },
        { name: "Little Bear Rakhi", slug: "little-bear-rakhi", description: "A soft amigurumi bear on a stretchy band — a favourite with tiny wrists.", price: 299, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.kids, active: true, tags: ["Kids", "Handmade"] },
        { name: "Pearl Heirloom Rakhi", slug: "pearl-heirloom-rakhi", description: "Ivory lace motif with a freshwater pearl centre and gold silk thread.", price: 349, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.classic, active: true, tags: ["Classic", "Handmade"] },
        { name: "Teal Rakhi & Lumba Set", slug: "teal-rakhi-lumba-set", description: "Matching rakhi and lumba braid for bhaiya-bhabhi, in teal and terracotta.", price: 499, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.lumba, active: true, tags: ["Lumba", "Handmade"] },
        { name: "Daisy Chain Rakhi", slug: "daisy-chain-rakhi", description: "Three tiny crochet daisies strung on a cream cotton cord.", price: 229, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.flower, active: true, tags: ["Flower", "Handmade"] },
        { name: "Bunny Kids Rakhi", slug: "bunny-kids-rakhi", description: "Soft crochet bear on a comfortable band for kids.", price: 449, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.kids, active: true, tags: ["Kids", "Handmade"] },
        { name: "Golden Star Rakhi", slug: "golden-star-rakhi", description: "Minimal star motif worked in gold zari thread — understated and elegant.", price: 279, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.classic, active: true, tags: ["Classic", "Handmade"] },
        { name: "Deluxe Lumba Set", slug: "deluxe-lumba-set", description: "A complete set of handmade crochet items for your loved ones.", price: 899, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.lumba, active: true, tags: ["Lumba", "Handmade"] },
        { name: "Tricolor Rakhi", slug: "tricolor-rakhi", description: "Special edition rakhi for Independence Day, made in saffron, white and green.", price: 269, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.flower, active: true, tags: ["Flower", "Handmade"] },
      ];

      for (const p of productsData) {
        const cat = dbCategories?.find((c: any) => c.slug === p.category_slug);
        if (cat) {
          const { category_slug, tags: pTags, ...pData } = p;
          const { data: dbProduct, error: pError } = await (supabaseAdmin.from("products") as any).upsert({
            ...pData,
            category_id: cat.id
          }, { onConflict: 'slug' }).select().single();

          if (pError) throw pError;
          results.products++;

          // 4. Product-Tags Relationship
          if (pTags && dbProduct) {
            const tagRelationships = pTags.map(tagName => {
              const tagObj = dbTags?.find(t => t.name === tagName);
              return tagObj ? { product_id: dbProduct.id, tag_id: tagObj.id } : null;
            }).filter(Boolean);

            if (tagRelationships.length > 0) {
              const { error: ptError } = await (supabaseAdmin.from("product_tags") as any)
                .upsert(tagRelationships, { onConflict: 'product_id,tag_id' });
              if (ptError) throw ptError;
              results.productTags += tagRelationships.length;
            }
          }
        }
      }

      // 5. Site Content Migration
      const content = [
        { key: "hero_title", value: "A rakhi made by hand, tied with love" },
        { key: "hero_description", value: "Every rakhi is crocheted one stitch at a time at home — soft on the wrist, gentle on the heart, and unlike anything from a store shelf." },
        { key: "whatsapp_number", value: "919876543210" },
        { key: "instagram_url", value: "https://www.instagram.com/crochet_by_prakrati/" },
        { key: "story_title", value: "Stitched with love, one hook at a time." },
        { key: "story_body", value: "What started as a hobby in a quiet corner of our home has grown into a small collection of handmade treasures. We believe that in a world of machines, something made by hand carries a soul of its own." },
        { key: "footer_about", value: "Handmade crochet rakhis and gifts made with love at home." }
      ];

      const { data: dbContent, error: contentError } = await (supabaseAdmin.from("site_content") as any)
        .upsert(content, { onConflict: 'key' })
        .select();

      if (contentError) throw contentError;
      results.siteContent = dbContent?.length || 0;

      return { success: true, results };
    } catch (err: any) {
      console.error("Migration Error:", err);
      return { success: false, error: err.message };
    }
  });
