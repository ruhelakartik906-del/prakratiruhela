
export const WHATSAPP_NUMBER = "919876543210";
export const INSTAGRAM_URL = "https://www.instagram.com/crochet_by_prakrati/";

export type MainCategoryId = "all" | "raksha-bandhan" | "hair-accessories" | "keychains" | "earbuds-covers" | "gift-combos" | "bangles-custom" | "independence-day";
export type RakshaBandhanCategoryId = "all" | "kids" | "flowers" | "classic" | "lumba-sets";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Exclude<RakshaBandhanCategoryId, "all">;
  image: string;
};

export const mainCategories: { id: MainCategoryId; label: string; icon?: string }[] = [
  { id: "all", label: "All Designs", icon: "✨" },
  { id: "raksha-bandhan", label: "Raksha Bandhan", icon: "🧵" },
  { id: "hair-accessories", label: "Hair Accessories", icon: "🌸" },
  { id: "keychains", label: "Keychains", icon: "🔑" },
  { id: "earbuds-covers", label: "Earbuds Covers", icon: "🎧" },
  { id: "gift-combos", label: "Gift Combos", icon: "🎁" },
  { id: "bangles-custom", label: "Bangles & Custom", icon: "🧶" },
  { id: "independence-day", label: "Independence Day", icon: "🇮🇳" },
];

export const rakshaBandhanCategories: { id: RakshaBandhanCategoryId; label: string; icon?: string }[] = [
  { id: "all", label: "All", icon: "✨" },
  { id: "kids", label: "For Kids", icon: "🧸" },
  { id: "flowers", label: "Flowers", icon: "🌸" },
  { id: "classic", label: "Classic", icon: "✨" },
  { id: "lumba-sets", label: "Rakhi + Lumba Sets", icon: "🧶" },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Marigold Bloom Rakhi",
    description: "Hand-crocheted marigold in scarlet and saffron cotton with gold beads.",
    price: 249,
    category: "flowers",
    image: "/assets/rakhi-flower.jpg",
  },
  {
    id: "p2",
    name: "Little Bear Rakhi",
    description: "A soft amigurumi bear on a stretchy band — a favourite with tiny wrists.",
    price: 299,
    category: "kids",
    image: "/assets/rakhi-kids.jpg",
  },
  {
    id: "p3",
    name: "Pearl Heirloom Rakhi",
    description: "Ivory lace motif with a freshwater pearl centre and gold silk thread.",
    price: 349,
    category: "classic",
    image: "/assets/rakhi-classic.jpg",
  },
  {
    id: "p4",
    name: "Teal Rakhi & Lumba Set",
    description: "Matching rakhi and lumba braid for bhaiya-bhabhi, in teal and terracotta.",
    price: 499,
    category: "lumba-sets",
    image: "/assets/rakhi-lumba.jpg",
  },
  {
    id: "p5",
    name: "Daisy Chain Rakhi",
    description: "Three tiny crochet daisies strung on a cream cotton cord.",
    price: 229,
    category: "flowers",
    image: "/assets/rakhi-flower.jpg",
  },
  {
    id: "p6",
    name: "Bunny Kids Rakhi",
    description: "Soft crochet bear on a comfortable band for kids.",
    price: 449,
    category: "kids",
    image: "/assets/rakhi-kids.jpg",
  },
  {
    id: "p7",
    name: "Golden Star Rakhi",
    description: "Minimal star motif worked in gold zari thread — understated and elegant.",
    price: 279,
    category: "classic",
    image: "/assets/rakhi-classic.jpg",
  },
  {
    id: "p8",
    name: "Deluxe Lumba Set",
    description: "A complete set of handmade crochet items for your loved ones.",
    price: 899,
    category: "lumba-sets",
    image: "/assets/rakhi-lumba.jpg",
  },
  {
    id: "p9",
    name: "Tricolor Rakhi",
    description: "Special edition rakhi for Independence Day, made in saffron, white and green.",
    price: 269,
    category: "flowers",
    image: "/assets/rakhi-flower.jpg",
  },
];

export const getRakshaBandhanCounts = (): Record<RakshaBandhanCategoryId, number> => {
  const counts: Record<string, number> = { all: products.length };
  rakshaBandhanCategories.forEach(cat => {
    if (cat.id !== "all") {
      counts[cat.id] = products.filter(p => p.category === cat.id).length;
    }
  });
  return counts as Record<RakshaBandhanCategoryId, number>;
};

export const getMainCategoryCounts = (): Record<MainCategoryId, number> => {
  // Mock counts for main categories since all demo products are Rakhi
  const counts: Record<string, number> = {
    all: products.length,
    "raksha-bandhan": products.length,
    "hair-accessories": 0,
    "keychains": 0,
    "earbuds-covers": 0,
    "gift-combos": 0,
    "bangles-custom": 0,
    "independence-day": 0
  };
  return counts as Record<MainCategoryId, number>;
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
