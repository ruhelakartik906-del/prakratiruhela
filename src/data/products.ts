import flower from "@/assets/rakhi-flower.jpg";
import kids from "@/assets/rakhi-kids.jpg";
import classic from "@/assets/rakhi-classic.jpg";
import lumba from "@/assets/rakhi-lumba.jpg";

export const WHATSAPP_NUMBER = "919876543210";
export const INSTAGRAM_URL = "https://instagram.com";

export type CategoryId = "all" | "raksha-bandhan" | "hair-accessories" | "keychains" | "earbuds-cover" | "gift-combos" | "bangles-custom" | "independence-day";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Exclude<CategoryId, "all">;
  badge: string;
  image: string;
};

export const categories: { id: CategoryId; label: string; icon?: string }[] = [
  { id: "all", label: "All Items" },
  { id: "raksha-bandhan", label: "Raksha Bandhan", icon: "✨" },
  { id: "hair-accessories", label: "Hair Accessories", icon: "🌸" },
  { id: "keychains", label: "Keychains", icon: "🔑" },
  { id: "earbuds-cover", label: "Earbuds Cover", icon: "🎧" },
  { id: "gift-combos", label: "Gift Combos", icon: "🎁" },
  { id: "bangles-custom", label: "Bangles & Custom", icon: "🧶" },
  { id: "independence-day", label: "Independence Day", icon: "🇮🇳" },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Marigold Bloom Rakhi",
    description: "Hand-crocheted marigold in scarlet and saffron cotton with gold beads.",
    price: 249,
    category: "raksha-bandhan",
    badge: "Raksha Bandhan",
    image: flower,
  },
  {
    id: "p2",
    name: "Little Bear Rakhi",
    description: "A soft amigurumi bear on a stretchy band — a favourite with tiny wrists.",
    price: 299,
    category: "raksha-bandhan",
    badge: "Raksha Bandhan",
    image: kids,
  },
  {
    id: "p3",
    name: "Pearl Heirloom Rakhi",
    description: "Ivory lace motif with a freshwater pearl centre and gold silk thread.",
    price: 349,
    category: "raksha-bandhan",
    badge: "Raksha Bandhan",
    image: classic,
  },
  {
    id: "p4",
    name: "Teal Rakhi & Lumba Set",
    description: "Matching rakhi and lumba braid for bhaiya-bhabhi, in teal and terracotta.",
    price: 499,
    category: "raksha-bandhan",
    badge: "Raksha Bandhan",
    image: lumba,
  },
  {
    id: "p5",
    name: "Daisy Chain Accessories",
    description: "Three tiny crochet daisies strung on a cream cotton cord.",
    price: 229,
    category: "hair-accessories",
    badge: "Hair Accessories",
    image: flower,
  },
  {
    id: "p6",
    name: "Bunny Earbuds Cover",
    description: "Soft crochet case for your wireless earbuds with cute bunny ears.",
    price: 449,
    category: "earbuds-cover",
    badge: "Earbuds Cover",
    image: kids,
  },
  {
    id: "p7",
    name: "Golden Flower Keychain",
    description: "Minimal star motif worked in gold zari thread — understated and elegant.",
    price: 279,
    category: "keychains",
    badge: "Keychains",
    image: classic,
  },
  {
    id: "p8",
    name: "Gift Box Deluxe",
    description: "A complete set of handmade crochet items for your loved ones.",
    price: 899,
    category: "gift-combos",
    badge: "Gift Combos",
    image: lumba,
  },
  {
    id: "p9",
    name: "Tricolor Rakhi",
    description: "Special edition rakhi for Independence Day, made in saffron, white and green.",
    price: 269,
    category: "independence-day",
    badge: "Independence Day",
    image: flower,
  },
];

export const categoryCounts = (): Record<CategoryId, number> => {
  const counts: Record<string, number> = { all: products.length };
  categories.forEach(cat => {
    if (cat.id !== "all") {
      counts[cat.id] = products.filter(p => p.category === cat.id).length;
    }
  });
  return counts as Record<CategoryId, number>;
};

export const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const orderLink = (p: Product) =>
  waLink(
    `Hi! I'd like to order the "${p.name}" (₹${p.price}) from your collection. Is it available?`,
  );

export const customOrderLink = () =>
  waLink(
    "Hi! I have an idea for a custom crochet order. Can we discuss colours, motif and quantity?",
  );
