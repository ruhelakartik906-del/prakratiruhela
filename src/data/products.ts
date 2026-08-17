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

export const categories: { id: CategoryId; label: string }[] = [
  { id: "all", label: "All Items" },
  { id: "flowers", label: "🌸 Hair Accessories" },
  { id: "classic", label: "🔑 Keychains" },
  { id: "kids", label: "🎧 Earbuds Covers" },
  { id: "lumba", label: "🎁 Gift Combos" },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Marigold Bloom Rakhi",
    description: "Hand-crocheted marigold in scarlet and saffron cotton with gold beads.",
    price: 249,
    category: "flowers",
    badge: "Flowers",
    image: flower,
  },
  {
    id: "p2",
    name: "Little Bear Rakhi",
    description: "A soft amigurumi bear on a stretchy band — a favourite with tiny wrists.",
    price: 299,
    category: "kids",
    badge: "For Kids",
    image: kids,
  },
  {
    id: "p3",
    name: "Pearl Heirloom Rakhi",
    description: "Ivory lace motif with a freshwater pearl centre and gold silk thread.",
    price: 349,
    category: "classic",
    badge: "Classic",
    image: classic,
  },
  {
    id: "p4",
    name: "Teal Rakhi & Lumba Set",
    description: "Matching rakhi and lumba braid for bhaiya-bhabhi, in teal and terracotta.",
    price: 499,
    category: "lumba",
    badge: "Rakhi + Lumba",
    image: lumba,
  },
  {
    id: "p5",
    name: "Daisy Chain Rakhi",
    description: "Three tiny crochet daisies strung on a cream cotton cord.",
    price: 229,
    category: "flowers",
    badge: "Flowers",
    image: flower,
  },
  {
    id: "p6",
    name: "Sunny Bear Duo",
    description: "Two mini bears for two little brothers, made in a matching pair.",
    price: 449,
    category: "kids",
    badge: "For Kids",
    image: kids,
  },
  {
    id: "p7",
    name: "Golden Zari Rakhi",
    description: "Minimal star motif worked in gold zari thread — understated and elegant.",
    price: 279,
    category: "classic",
    badge: "Classic",
    image: classic,
  },
  {
    id: "p8",
    name: "Festive Lumba Pair",
    description: "Bangle lumba with a bright crochet flower, paired with a slim rakhi.",
    price: 529,
    category: "lumba",
    badge: "Rakhi + Lumba",
    image: lumba,
  },
  {
    id: "p9",
    name: "Rose Petal Rakhi",
    description: "Layered rose in blush cotton, finished with a hand-knotted tassel.",
    price: 269,
    category: "flowers",
    badge: "Flowers",
    image: flower,
  },
];

export const categoryCounts = (): Record<CategoryId, number> => ({
  all: products.length,
  kids: products.filter((p) => p.category === "kids").length,
  flowers: products.filter((p) => p.category === "flowers").length,
  classic: products.filter((p) => p.category === "classic").length,
  lumba: products.filter((p) => p.category === "lumba").length,
});

export const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const orderLink = (p: Product) =>
  waLink(
    `Hi! I'd like to order the "${p.name}" (₹${p.price}) from your Raksha Bandhan collection. Is it available?`,
  );

export const customOrderLink = () =>
  waLink(
    "Hi! I have an idea for a custom crochet rakhi. Can we discuss colours, motif and quantity?",
  );