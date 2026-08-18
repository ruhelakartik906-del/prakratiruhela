import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Assets to be migrated/handled
const SUPABASE_URL = "https://wxqzyvrvaflenisqsahz.supabase.co";
const STORAGE_BUCKET = "website-images";

const getPublicUrl = (path: string) => `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${path}`;

const FAKE_IMAGES = {
  flower: getPublicUrl("products/rakhi-flower.jpg"),
  kids: getPublicUrl("products/rakhi-kids.jpg"),
  classic: getPublicUrl("products/rakhi-classic.jpg"),
  lumba: getPublicUrl("products/rakhi-lumba.jpg")
};

export const migrateExistingData = createServerFn({ method: "POST" })
  .handler(async () => {
    try {
      if (!process.env['EXT_SUPABASE_SERVICE_ROLE_KEY']) {
        throw new Error("Service role key is not configured. Migration cannot run.");
      }

      const results: any = {
        categories: 0,
        tags: 0,
        products: 0,
        productTags: 0,
        siteContent: 0,
        details: []
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

      const { data: dbCategories, error: catError } = await (supabaseAdmin.from("categories") as any)
        .upsert(mainCategories, { onConflict: 'slug' })
        .select();
      
      if (catError) {
        results.details.push(`Category migration error: ${catError.message}`);
        throw catError;
      }
      results.categories = dbCategories?.length || 0;
      results.details.push(`Successfully migrated ${results.categories} categories.`);

      // 2. Tags Migration
      // Extracted from design and common crochet themes
      const tags = [
        { name: "Flower", slug: "flower" },
        { name: "Kids", slug: "kids" },
        { name: "Classic", slug: "classic" },
        { name: "Lumba", slug: "lumba" },
        { name: "Handmade", slug: "handmade" },
        { name: "Cotton", slug: "cotton" },
        { name: "Gift", slug: "gift" },
      ];

      const { data: dbTags, error: tagError } = await (supabaseAdmin.from("tags") as any)
        .upsert(tags, { onConflict: 'slug' })
        .select();

      if (tagError) {
        results.details.push(`Tag migration error: ${tagError.message}`);
        throw tagError;
      }
      results.tags = dbTags?.length || 0;
      results.details.push(`Successfully migrated ${results.tags} tags.`);

      // 3. Products Migration
      const productsData = [
        { name: "Marigold Bloom Rakhi", slug: "marigold-bloom-rakhi", description: "Hand-crocheted marigold in scarlet and saffron cotton with gold beads.", price: 249, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.flower, tags: ["Flower", "Handmade"] },
        { name: "Little Bear Rakhi", slug: "little-bear-rakhi", description: "A soft amigurumi bear on a stretchy band — a favourite with tiny wrists.", price: 299, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.kids, tags: ["Kids", "Handmade"] },
        { name: "Pearl Heirloom Rakhi", slug: "pearl-heirloom-rakhi", description: "Ivory lace motif with a freshwater pearl centre and gold silk thread.", price: 349, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.classic, tags: ["Classic", "Handmade"] },
        { name: "Teal Rakhi & Lumba Set", slug: "teal-rakhi-lumba-set", description: "Matching rakhi and lumba braid for bhaiya-bhabhi, in teal and terracotta.", price: 499, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.lumba, tags: ["Lumba", "Handmade"] },
        { name: "Daisy Chain Rakhi", slug: "daisy-chain-rakhi", description: "Three tiny crochet daisies strung on a cream cotton cord.", price: 229, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.flower, tags: ["Flower", "Handmade"] },
        { name: "Bunny Kids Rakhi", slug: "bunny-kids-rakhi", description: "Soft crochet bear on a comfortable band for kids.", price: 449, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.kids, tags: ["Kids", "Handmade"] },
        { name: "Golden Star Rakhi", slug: "golden-star-rakhi", description: "Minimal star motif worked in gold zari thread — understated and elegant.", price: 279, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.classic, tags: ["Classic", "Handmade"] },
        { name: "Deluxe Lumba Set", slug: "deluxe-lumba-set", description: "A complete set of handmade crochet items for your loved ones.", price: 899, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.lumba, tags: ["Lumba", "Handmade"] },
        { name: "Tricolor Rakhi", slug: "tricolor-rakhi", description: "Special edition rakhi for Independence Day, made in saffron, white and green.", price: 269, category_slug: "raksha-bandhan", image_url: FAKE_IMAGES.flower, tags: ["Flower", "Handmade"] },
      ];

      for (const p of productsData) {
        const cat = (dbCategories as any[])?.find((c: any) => c.slug === p.category_slug);
        if (!cat) {
          console.warn(`Skipping product ${p.name}: Category slug ${p.category_slug} not found.`);
          continue;
        }

        const { category_slug, tags: pTags, ...pData } = p;
        const { data: dbProduct, error: pError } = await (supabaseAdmin.from("products") as any)
          .upsert({
            ...pData,
            category_id: cat.id
          }, { onConflict: 'slug' })
          .select()
          .single();

        if (pError) {
          results.details.push(`Error migrating product ${p.name}: ${pError.message}`);
          console.error(`Error migrating product ${p.name}:`, pError);
          throw new Error(`Product migration failed for ${p.name}: ${pError.message}`);
        }

        results.products++;
        results.details.push(`Migrated product: ${p.name}`);

        // 4. Product-Tags Relationship
        if (pTags && dbProduct) {
          const tagRelationships = pTags.map(tagName => {
            const tagObj = (dbTags as any[])?.find(t => t.name === tagName);
            return tagObj ? { product_id: (dbProduct as any).id, tag_id: tagObj.id } : null;
          }).filter(Boolean);

          if (tagRelationships.length > 0) {
            const { error: ptError } = await (supabaseAdmin.from("product_tags") as any)
              .upsert(tagRelationships, { onConflict: 'product_id,tag_id' });
            if (ptError) {
              console.error(`Error migrating tags for ${p.name}:`, ptError);
              throw new Error(`Product-Tag relationship failed for ${p.name}: ${ptError.message}`);
            }
            results.productTags += tagRelationships.length;
          }
        }
      }

      // 5. Site Content Migration
      const content = [
        { section: "hero", content_key: "hero_title", content_value: "A rakhi made by hand, tied with love", content_type: "text" },
        { section: "hero", content_key: "hero_description", content_value: "Every rakhi is crocheted one stitch at a time at home — soft on the wrist, gentle on the heart, and unlike anything from a store shelf.", content_type: "text" },
        { section: "social", content_key: "whatsapp_number", content_value: "919876543210", content_type: "text" },
        { section: "social", content_key: "instagram_handle", content_value: "@crochet_by_prakrati", content_type: "text" },
        { section: "social", content_key: "instagram_url", content_value: "https://www.instagram.com/crochet_by_prakrati/", content_type: "text" },
        { section: "story", content_key: "story_title", content_value: "Stitched with love, one hook at a time.", content_type: "text" },
        { section: "story", content_key: "story_body", content_value: "What started as a hobby in a quiet corner of our home has grown into a small collection of handmade treasures. We believe that in a world of machines, something made by hand carries a soul of its own.", content_type: "text" },
        { section: "footer", content_key: "footer_about", content_value: "Handmade crochet rakhis and gifts made with love at home.", content_type: "text" }
      ];
      
      const { data: dbContent, error: contentError } = await (supabaseAdmin.from("site_content") as any)
        .upsert(content, { onConflict: 'section,content_key' })
        .select();

      if (contentError) {
        results.details.push(`Content migration error: ${contentError.message}`);
        console.error("Error migrating site content:", contentError);
        throw new Error(`Site content migration failed: ${contentError.message}`);
      }
      results.siteContent = dbContent?.length || 0;
      results.details.push(`Successfully migrated ${results.siteContent} content records.`);

      return { success: true, results };
    } catch (err: any) {
      console.error("Migration Error:", err);
      return { success: false, error: err.message };
    }
  });
