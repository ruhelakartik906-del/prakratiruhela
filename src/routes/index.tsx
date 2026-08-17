import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart, MessageCircle, Package, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/site/Header";
import { ProductCard } from "@/components/site/ProductCard";
import { CookieNotice } from "@/components/site/CookieNotice";
import {
  categories,
  customOrderLink,
  INSTAGRAM_URL,
  products,
  waLink,
  type CategoryId,
} from "@/data/products";
import flower from "@/assets/rakhi-flower.jpg";
import kids from "@/assets/rakhi-kids.jpg";
import classic from "@/assets/rakhi-classic.jpg";
import lumba from "@/assets/rakhi-lumba.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Crochet Craft — Handmade Crochet Rakhi Catalogue" },
      {
        name: "description",
        content:
          "Hand-crocheted rakhis, lumba sets and custom designs. Browse the Raksha Bandhan collection and order directly on WhatsApp.",
      },
      { property: "og:title", content: "Crochet Craft — Handmade Crochet Rakhis" },
      {
        property: "og:description",
        content:
          "A small-batch crochet rakhi catalogue. Flowers, kids' motifs, classics and rakhi + lumba sets, made by hand.",
      },
    ],
  }),
  component: Index,
});

const steps = [
  {
    icon: Sparkles,
    title: "Pick your design",
    body: "Browse the collection, or send us a picture of what you have in mind.",
  },
  {
    icon: MessageCircle,
    title: "Message us on WhatsApp",
    body: "Tap Order and we'll confirm colours, quantity and delivery date.",
  },
  {
    icon: Package,
    title: "Made and posted",
    body: "We crochet your order and ship it wrapped in handmade paper, all India.",
  },
];

const faqs = [
  {
    q: "How long does an order take?",
    a: "Ready designs ship within 2 working days. Custom pieces take 4-6 days depending on the motif and quantity.",
  },
  {
    q: "Do you take bulk orders?",
    a: "Yes. Orders of 10 or more rakhis get 15% off, and we can match a colour palette across the whole set.",
  },
  {
    q: "Are the rakhis safe for babies and toddlers?",
    a: "The kids' range uses soft cotton yarn with securely stitched features and no loose beads or glue.",
  },
  {
    q: "Can I request a colour that isn't shown?",
    a: "Almost always. Send us a reference on WhatsApp and we'll tell you what's in stock that week.",
  },
  {
    q: "How do I pay?",
    a: "We share a UPI link on WhatsApp once your order is confirmed. No payment happens on this website.",
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Index() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = category === "all" || p.category === category;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div id="top" className="min-h-screen bg-background">
      <Header query={query} onQuery={setQuery} category={category} onCategory={setCategory} />

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-terracotta/20 bg-terracotta/5 px-4 py-1.5 text-sm font-medium text-terracotta">
              ✨ Raksha Bandhan · 28 August 2026
            </span>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] font-semibold text-[#3F2A22] sm:text-6xl md:text-7xl">
              A rakhi made by hand, tied with <span className="italic text-terracotta font-normal">love</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#3F2A22]/70">
              Every piece is crocheted stitch by stitch in soft cotton yarn — no moulds, no machines.
              Choose from this year's collection or tell us your idea and we'll make it for you.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="xl" className="rounded-full bg-[#3F2A22] px-8 font-semibold text-white shadow-soft transition-all hover:translate-y-[-2px] hover:shadow-lg active:scale-95" onClick={() => scrollToId("collection")}>
                Browse Designs
              </Button>
              <Button asChild variant="secondary" size="xl" className="rounded-full border-black/5 bg-white px-8 font-semibold text-[#3F2A22] shadow-sm transition-all hover:border-terracotta/40 hover:text-terracotta active:scale-95">
                <a href={waLink("Hi! I'd love to know more about your handmade rakhis.")} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                    alt="WhatsApp" 
                    className="h-5 w-5"
                  />
                  <span>Chat with us</span>
                </a>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto h-[380px] w-full max-w-sm sm:h-[450px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={flower}
                alt="Handmade crochet flower rakhi"
                width={800}
                height={800}
                className="h-60 w-60 rounded-full border-8 border-white object-cover shadow-soft sm:h-72 sm:w-72"
              />
              <img
                src={classic}
                alt="Classic pearl crochet rakhi"
                loading="lazy"
                width={800}
                height={800}
                className="absolute top-10 right-0 h-44 w-44 rounded-full border-8 border-white object-cover shadow-soft sm:h-52 sm:w-52"
              />
              <img
                src={kids}
                alt="Crochet teddy bear rakhi for kids"
                loading="lazy"
                width={800}
                height={800}
                className="absolute bottom-10 left-0 h-40 w-40 rounded-full border-8 border-white object-cover shadow-soft sm:h-48 sm:w-48"
              />
            </div>
          </div>
        </section>

        <section id="collection" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-24 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-terracotta uppercase">Our Collection</span>
            <h2 className="mt-4 font-display text-4xl font-semibold text-[#3F2A22] sm:text-5xl">
              Raksha Bandhan • 28 August 2026
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-[#3F2A22]/70">
              This year's designs, crocheted in limited quantities. Once a colourway runs out, it's
              gone for the season.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-[#3F2A22] shadow-sm ring-1 ring-black/5">
                {products.length} designs
              </span>
              <span className="rounded-full bg-terracotta/10 px-4 py-1.5 text-sm font-bold text-terracotta">
                15% OFF ON 10+ RAKHIS
              </span>
            </div>
          </div>

          <div className="no-scrollbar mt-12 flex justify-start gap-3 overflow-x-auto pb-6 sm:justify-center">
            {categories.map((c) => {
              const active = c.id === category;
              return (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`shrink-0 rounded-full border px-6 py-3 text-sm font-semibold transition-all active:scale-95 ${
                    active
                      ? "border-terracotta bg-terracotta text-white shadow-md"
                      : "border-black/5 bg-white text-[#3F2A22]/80 hover:border-terracotta/40 hover:text-terracotta hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <p className="mt-20 text-center text-lg text-muted-foreground">
              No designs match that search. Try another colour or motif — or ask us on WhatsApp.
            </p>
          ) : (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>

        {/* Custom order */}
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-blush/60 px-6 py-16 text-center text-foreground sm:px-12">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-terracotta) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <h2 className="relative font-display text-4xl font-semibold sm:text-5xl">Have your own idea?</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground/90">
              Names, favourite characters, wedding colours, office sets — if it can be crocheted, we'll
              try. Send us a reference picture and we'll quote you the same day.
            </p>
            <Button asChild className="relative mt-10 h-14 rounded-full bg-[#25D366] px-10 text-base font-semibold text-white shadow-lg transition-all hover:brightness-110 hover:-translate-y-1 active:scale-95">
              <a href={customOrderLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                  alt="WhatsApp" 
                  className="h-5 w-5 invert brightness-0"
                />
                <span>Request a custom rakhi</span>
              </a>
            </Button>
          </div>
        </section>

        {/* Brand story */}
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div className="relative">
              <img
                src={classic}
                alt="Crochet work in progress on a cream cloth"
                loading="lazy"
                width={800}
                height={800}
                className="aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-soft ring-8 ring-white"
              />
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full border-8 border-white bg-terracotta/10 shadow-lg sm:h-40 sm:w-40" />
            </div>
            <div>
              <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
                Two hands, one hook, <br />a lot of chai
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground/90">
                Crochet Craft started at a kitchen table in 2019, with a ball of leftover cotton and
                one rakhi for a brother who lived too far away to visit. Word travelled, and the
                orders followed.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground/90">
                Today a small group of women crochet every piece at home, paid per piece and by name.
                Nothing here is mass produced, so no two rakhis are ever exactly alike.
              </p>
            </div>
          </div>
        </section>

        {/* How to order */}
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-terracotta uppercase">Process</span>
            <h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
              How to order
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="group relative rounded-[2rem] border border-border/40 bg-card p-8 shadow-soft transition-all hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-terracotta/10 text-terracotta font-bold text-lg">
                    {i + 1}
                  </span>
                  <span className="text-xs font-bold tracking-widest text-muted-foreground/60 uppercase">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">{s.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground/80">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-terracotta uppercase">FAQ</span>
            <h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
              Questions, answered
            </h2>
          </div>
          <Accordion type="single" collapsible className="mt-12 space-y-4">
            {faqs.map((f) => (
              <AccordionItem
                key={f.q}
                value={f.q}
                className="border-none"
              >
                <AccordionTrigger className="flex rounded-[1.25rem] border border-border/40 bg-card px-6 py-5 text-left font-display text-lg font-semibold text-foreground transition-all hover:border-terracotta/40 hover:no-underline data-[state=open]:border-terracotta/40 data-[state=open]:text-terracotta">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="mt-2 px-6 pb-4 text-base leading-relaxed text-muted-foreground/80">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <footer className="bg-[#3F2A22] py-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-3">
          <div>
            <h3 className="font-display text-3xl font-semibold">Crochet Craft</h3>
            <p className="mt-6 max-w-xs text-base leading-relaxed opacity-60">
              Handmade crochet rakhis, lumba sets and custom pieces. Shipped across India.
            </p>
          </div>
          <div className="text-base">
            <p className="text-xs font-bold tracking-[0.2em] opacity-40 uppercase">Explore</p>
            <div className="mt-6 flex flex-col items-start gap-4">
              <button onClick={() => scrollToId("collection")} className="opacity-70 transition-opacity hover:opacity-100">
                Collection
              </button>
              <a href={customOrderLink()} target="_blank" rel="noreferrer" className="opacity-70 transition-opacity hover:opacity-100">
                Custom orders
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 opacity-70 transition-opacity hover:opacity-100">
                Instagram
              </a>
            </div>
          </div>
          <div className="text-base">
            <p className="text-xs font-bold tracking-[0.2em] opacity-40 uppercase">Talk to us</p>
            <p className="mt-6 opacity-60">Mon–Sat, 10am to 7pm IST</p>
            <Button asChild className="mt-6 h-12 rounded-full bg-[#25D366] px-8 text-sm font-semibold text-white shadow-lg transition-all hover:brightness-110 active:scale-95">
              <a href={waLink("Hi! I'd like to place a rakhi order.")} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                  alt="WhatsApp" 
                  className="h-5 w-5 invert brightness-0"
                />
                <span>Order on WhatsApp</span>
              </a>
            </Button>
          </div>
        </div>
        <div className="mt-20 border-t border-white/10 pt-8 text-center text-sm opacity-40">
          © {new Date().getFullYear()} Crochet Craft. Made by hand.
        </div>
      </footer>

      <a
        href={waLink("Hi! I have a question about your crochet rakhis.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed right-6 bottom-6 z-40 grid h-16 w-16 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all hover:scale-110 hover:shadow-[#25D366]/20 active:scale-95 sm:right-8 sm:bottom-8"
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
          alt="WhatsApp" 
          className="h-8 w-8 invert brightness-0"
        />
      </a>

      <CookieNotice />
    </div>
  );
}
