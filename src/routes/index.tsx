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
import whatsappAsset from "@/assets/whatsapp.png.asset.json";
import instagramAsset from "@/assets/instagram.png.asset.json";
import logoAsset from "@/assets/logo-transparent.png.asset.json";
import { Header } from "@/components/site/Header";
import { ProductCard } from "@/components/site/ProductCard";
import { CookieNotice } from "@/components/site/CookieNotice";
import {
  mainCategories,
  rakshaBandhanCategories,
  customOrderLink,
  INSTAGRAM_URL,
  products,
  waLink,
  type MainCategoryId,
  type RakshaBandhanCategoryId,
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
    title: "Pick a design",
    body: "Browse the collection and tap \"Order\" on the rakhi you love.",
  },
  {
    title: "Message us on WhatsApp",
    body: "Your message opens ready-made. Add colours, quantity, or a custom idea.",
  },
  {
    title: "We make it & ship it",
    body: "We confirm the price and delivery date, then ship anywhere in India.",
  },
];

const faqs = [
  {
    q: "When should I order for Raksha Bandhan?",
    a: "Raksha Bandhan is on 28 August 2026. Since every rakhi is made to order and shipped by post, we recommend ordering by early August to be safe.",
  },
  {
    q: "Do you take custom designs?",
    a: "Yes! Favourite colours, cartoon characters, name initials — message us your idea on WhatsApp and we'll tell you if we can crochet it.",
  },
  {
    q: "How is the rakhi packed?",
    a: "Each rakhi comes mounted on a card in a clear protective sleeve, ready to gift or post onward to your brother.",
  },
  {
    q: "Do you ship across India?",
    a: "Yes, we ship pan-India. Shipping cost and delivery time are confirmed on WhatsApp when you order.",
  },
  {
    q: "Do you offer a discount on bulk orders?",
    a: "Yes — order 10 or more rakhis (any mix of designs) and get 10% off. Message us on WhatsApp with your quantity and we'll confirm the final price.",
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Index() {
  const [query, setQuery] = useState("");
  const [mainCategory, setMainCategory] = useState<MainCategoryId>("all");
  const [rakhiCategory, setRakhiCategory] = useState<RakshaBandhanCategoryId>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      const matchesRakhiCategory = rakhiCategory === "all" || p.category === rakhiCategory;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesRakhiCategory && matchesQuery;
    });

    // Add virtual custom order card at the end
    const customCard = {
      id: "custom-request",
      name: "Have your own idea?",
      description: "A favourite colour, a cartoon character, a name — tell us and we'll crochet a one-of-a-kind rakhi just for you.",
      price: 0,
      category: "classic", // dummy
      image: ""
    } as any;

    if (q === "" && rakhiCategory === "all") {
       list.push(customCard);
    }

    return list;
  }, [query, rakhiCategory]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: products.length };
    rakshaBandhanCategories.forEach(cat => {
      if (cat.id !== "all") {
        c[cat.id] = products.filter(p => p.category === cat.id).length;
      }
    });
    return c;
  }, []);

  return (
    <div id="top" className="min-h-screen bg-background overflow-x-hidden w-full">
      <Header query={query} onQuery={setQuery} category={mainCategory} onCategory={setMainCategory} />

      <main>
        <section 
          className="relative w-full overflow-hidden flex flex-col" 

          style={{ 
            backgroundColor: '#FBF6EE',
            background: `
              radial-gradient(
                ellipse 75% 55% at 50% 5%,
                rgba(248, 218, 195, 0.72) 0%,
                rgba(250, 229, 211, 0.52) 28%,
                rgba(251, 238, 224, 0.30) 50%,
                rgba(251, 246, 238, 0) 78%
              ),
              linear-gradient(
                to bottom,
                #FBE6CF 0%,
                #F9E9DA 18%,
                #FBF0E5 38%,
                #FBF5EC 65%,
                #FBF6EE 100%
              )`
          }}
        >
          {/* Optional overlay for smoother blending */}

          {/* Optional overlay for smoother blending */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{
              background: `
                radial-gradient(
                  ellipse 65% 45% at 50% 0%,
                  rgba(255, 224, 202, 0.22) 0%,
                  rgba(255, 239, 223, 0.10) 45%,
                  transparent 80%
                )`
            }}
          />

          <div className="relative z-10 desktop-container pt-8 md:pt-[80px] pb-12 md:pb-16 flex flex-col md:grid md:items-center gap-8 md:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            {/* Left Column */}
            <div className="max-w-[700px] text-center md:text-left">
              <div className="mx-auto md:mx-0 inline-flex items-center gap-2 rounded-full border border-[#3B2922]/10 bg-[#F5EFE6] px-3 py-1.5 text-[12px] md:text-[13px] font-medium text-[#3B2922]">
                <span className="text-base">✨</span>
                <span>Raksha Bandhan · 28 August 2026</span>
              </div>
              
              <h1 className="mt-6 md:mt-8 font-display text-[42px] leading-[1.05] md:text-[56px] lg:text-[70px] font-bold text-[#3B2922] max-w-[680px]">
                A rakhi made by hand,<br className="hidden md:block" />
                tied with <span className="italic font-normal text-[#C94F32] font-display">love</span>
              </h1>

              <p className="mt-5 md:mt-7 mx-auto md:mx-0 max-w-[650px] text-[18px] md:text-lg leading-[1.45] md:leading-[1.6] text-[#3B2922]/70 sm:text-[19px]">
                Every rakhi is crocheted one stitch at a time at home — soft on the wrist, gentle on the heart, and unlike anything from a store shelf.
              </p>

              <div className="mt-7 md:mt-9 flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start gap-[12px] md:gap-[14px]">
                <Button 
                  onClick={() => scrollToId("collection")}
                  className="h-[52px] md:h-14 flex-1 md:flex-none md:min-w-[190px] rounded-full bg-[#087F6D] text-[15px] md:text-[16px] font-bold text-white shadow-[0_4px_14px_rgba(8,127,109,0.25)] transition-all hover:scale-[1.02] active:scale-95"
                >
                  Browse Designs
                </Button>
                
                <a 
                  href={waLink("Hi! I'd love to know more about your handmade rakhis.")} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex h-[52px] md:h-14 flex-1 md:flex-none md:min-w-[190px] items-center justify-center gap-2 rounded-full border border-[#3B2922]/20 bg-transparent text-[15px] md:text-[16px] font-bold text-[#3B2922] transition-all hover:bg-[#3B2922]/5 active:scale-95"
                >
                  <img 
                    src={whatsappAsset.url} 
                    alt="WhatsApp" 
                    className="h-5 w-5"
                  />
                  <span>Chat with us</span>
                </a>
              </div>

              <div className="mt-7 md:mt-8 text-[15px] md:text-[16px] text-[#3B2922]/80 text-center md:text-left">
                Only 10 days left until Raksha Bandhan — order early, every piece is made by hand.
              </div>
            </div>

            {/* Right Column: Circular Image Composition */}
            <div className="order-last md:order-none relative aspect-square w-full max-w-[450px] md:max-w-[550px] mx-auto mt-4 md:mt-0">

              {/* Main Large Image */}
              <div className="absolute top-[10%] left-[20%] z-20 h-[50%] w-[50%] md:h-[300px] md:w-[300px] overflow-hidden rounded-full border-[4px] md:border-[6px] border-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                <img
                  src={flower}
                  alt="Handmade crochet flower rakhi"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>

              {/* Overlapping 1 */}
              <div className="absolute top-[5%] right-[5%] z-10 h-[40%] w-[40%] md:h-[180px] md:w-[180px] overflow-hidden rounded-full border-[4px] md:border-[6px] border-white shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
                <img
                  src={classic}
                  alt="Classic pearl crochet rakhi"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>

              {/* Overlapping 2 */}
              <div className="absolute bottom-[5%] right-[20%] z-30 h-[35%] w-[35%] md:h-[160px] md:w-[160px] overflow-hidden rounded-full border-[3px] md:border-[5px] border-white shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
                <img
                  src={lumba}
                  alt="Rakhi + Lumba set"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>

              {/* Small Circle */}
              <div className="absolute bottom-[20%] left-[5%] z-40 h-[30%] w-[30%] md:h-[140px] md:w-[140px] overflow-hidden rounded-full border-[3px] md:border-[5px] border-white shadow-[0_6px_15px_rgba(0,0,0,0.1)]">
                <img
                  src={kids}
                  alt="Crochet teddy bear rakhi for kids"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            </div>
          </div>
        </section>


        {/* Feature/Information Strip */}
        <section 
          className="w-full border-t border-b border-[#E8D5C1] bg-[#F8EBDD] py-4 md:py-0"
          style={{ minHeight: '72px', display: 'flex', alignItems: 'center' }}
        >
          <div className="w-full lg:desktop-container grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-x-4 md:gap-x-[55px] gap-y-6 md:gap-y-4 px-4 md:px-0">
            <div className="flex flex-col md:flex-row items-center md:items-center gap-1.5 md:gap-2.5 text-center md:text-left">
              <svg width="20" height="20" className="md:w-[22px] md:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="#C94F32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <span className="text-[14px] md:text-[17px] font-medium text-[#4A342A] leading-tight">Handmade to order</span>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-center gap-1.5 md:gap-2.5 text-center md:text-left">
              <svg width="20" height="20" className="md:w-[22px] md:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="#C94F32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polyline points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              <span className="text-[14px] md:text-[17px] font-medium text-[#4A342A] leading-tight">Pan-India shipping</span>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-center gap-1.5 md:gap-2.5 text-center md:text-left">
              <div className="h-5 w-5 md:h-[22px] md:w-[22px] flex items-center justify-center">
                <svg width="20" height="20" className="md:w-[22px] md:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="#C94F32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
              </div>
              <span className="text-[14px] md:text-[17px] font-medium text-[#4A342A] leading-tight">Gift-ready packaging</span>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-center gap-1.5 md:gap-2.5 text-center md:text-left">
              <svg width="20" height="20" className="md:w-[22px] md:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="#C94F32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
              <span className="text-[14px] md:text-[17px] font-medium text-[#4A342A] leading-tight">Custom colours welcome</span>
            </div>
          </div>
        </section>


        {/* Collection Section */}
        <section id="collection" className="scroll-mt-24 bg-[#FBF6EE] px-4 md:px-0 pt-12 md:pt-[65px] pb-12 lg:desktop-container">
          <div className="text-center">
            <span className="block mb-5 md:mb-7 text-[13px] md:text-[14px] font-semibold tracking-[3px] text-[#A85A18] uppercase">
              28 AUGUST
            </span>
            <h2 className="font-display text-[32px] md:text-[46px] font-semibold leading-[1.1] text-[#3B2922] sm:text-[48px]">
              Raksha Bandhan Collection
            </h2>
            <p className="mx-auto mt-4 md:mt-[22px] max-w-[650px] text-[15px] md:text-[18px] leading-[1.55] font-normal text-[#806F64]">
              Tap any design to order it on WhatsApp — tell us the colours you love and we'll make it yours.
            </p>
            <div className="mt-2 text-[15px] md:text-[16px] text-[#5E4A40]">
              {filtered.length} products
            </div>
            
            <div className="mt-5 md:mt-[25px]">
              <div className="inline-flex items-center justify-center rounded-2xl md:rounded-full border border-[#EBD4BA] bg-[#F8E9D8] px-5 md:px-6 py-2.5 md:py-3 text-[14px] md:text-[16px] font-semibold text-[#9A5A1B] leading-tight max-w-[90%] mx-auto">
                🎁 Bulk orders: 10% off on 10+ rakhis — mix & match any designs
              </div>
            </div>
          </div>


          <div className="mt-8 md:mt-[45px] flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {rakshaBandhanCategories.map((c) => {
              const active = c.id === rakhiCategory;
              const count = counts[c.id];
              return (
                <button
                  key={c.id}
                  onClick={() => setRakhiCategory(c.id)}
                  className={`h-[42px] md:h-[48px] rounded-full px-5 md:px-7 text-[13px] md:text-[15px] font-semibold transition-all active:scale-95 whitespace-nowrap ${
                    active
                      ? "bg-[#C94F32] text-white"
                      : "border border-[#D8CEC5] bg-white text-[#3F3028] hover:border-[#C94F32]/30"
                  }`}
                >
                  {c.label} {count}
                </button>
              );
            })}
          </div>


          {filtered.length === 0 ? (
            <p className="mt-20 text-center text-lg text-muted-foreground">
              No designs match that search. Try another colour or motif — or ask us on WhatsApp.
            </p>
          ) : (
            <div className="mt-[30px] md:mt-[40px] grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-[28px]">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>


        {/* Our Story Section */}
        <section className="story-section pt-[60px] md:pt-[80px] pb-[40px] md:pb-[60px] px-4 md:px-0 bg-[#FBF6EE]">
          <div 
            className="story-box mx-auto w-full flex flex-col items-center justify-center text-center"
            style={{
              width: 'min(900px, calc(100% - 32px))',
              minHeight: '225px',
              padding: '24px 20px',
              borderRadius: '18px',
              background: 'linear-gradient(105deg, #FDE3D7 0%, #F8DDE1 48%, #EBDDF7 100%)',
              border: '1px solid rgba(255,255,255,0.7)',
              boxShadow: '0 4px 14px rgba(70,45,30,0.05)',
            }}
          >
            <span 
              className="story-label"
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#A96516',
                marginBottom: '10px',
              }}
            >
              OUR STORY
            </span>
            <h2 
              className="story-title font-display"
              style={{
                fontSize: '20px',
                fontWeight: 600,
                lineHeight: '1.3',
                color: '#3B2922',
                margin: '0 0 12px',
              }}
            >
              Made at home, with a mother's patience
            </h2>
            <p 
              className="story-description"
              style={{
                fontSize: '14px',
                lineHeight: '1.55',
                fontWeight: 400,
                color: '#765F55',
                maxWidth: '620px',
                margin: '0 auto',
              }}
            >
              Every piece here is crocheted by hand at our home — no machines, no factories. Each one takes its own time and carries its own small imperfections, which is exactly what makes it yours alone. We also take custom orders: tell us a colour, a character, or an idea, and we'll crochet it.
            </p>
          </div>
        </section>


        {/* How to order */}
        <section className="mx-auto lg:desktop-container px-4 pt-16 md:pt-20 pb-20 md:pb-24 sm:px-6">
          <div className="text-center">
            <span 
              className="text-[11px] font-bold tracking-[2px] uppercase mb-3 block"
              style={{ color: '#A96516' }}
            >
              ORDERING
            </span>
            <h2 className="font-display text-[32px] md:text-[42px] font-semibold text-[#3B2922] sm:text-[48px]">
              How to order
            </h2>
            <p className="mt-4 text-[15px] md:text-[16px] leading-[1.55] text-[#765F55] max-w-[500px] mx-auto">
              No sign-ups, no checkout forms — just a WhatsApp message, the way you already shop with us.
            </p>
          </div>
          <div className="mt-12 md:mt-16 grid gap-10 md:gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="group relative rounded-[22px] border border-[#EEE7E1] bg-white p-8 md:p-10 pt-12 md:pt-14 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-1"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <span 
                    className="flex h-12 w-12 items-center justify-center rounded-full text-white font-bold text-lg shadow-md"
                    style={{ 
                      background: 'linear-gradient(135deg, #E29E6B 0%, #C94F32 100%)' 
                    }}
                  >
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-[20px] md:text-[22px] font-semibold text-[#3B2922]">{s.title}</h3>
                <p className="mt-4 text-[14px] md:text-[15px] leading-[1.6] text-[#765F55]">{s.body}</p>
              </div>
            ))}
          </div>
        </section>


        {/* FAQ */}
        <section className="mx-auto px-4 pt-[60px] md:pt-[80px] pb-20 md:pb-24 sm:px-6" style={{ width: 'min(900px, 100%)' }}>
          <div className="text-center">
            <span className="text-[11px] font-bold tracking-[2px] uppercase mb-3 block" style={{ color: '#A96516' }}>GOOD TO KNOW</span>
            <h2 className="font-display text-[32px] md:text-[42px] font-semibold text-[#3B2922] sm:text-[48px]">
              Common questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="mt-10 md:mt-12 space-y-4">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-[#EEE7E1] bg-white rounded-[14px] px-5 md:px-6 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all hover:border-[#EBD4BA]"
              >
                <AccordionTrigger className="hover:no-underline py-4 md:py-5 text-[15px] md:text-[17px] font-medium text-[#3B2922] text-left">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-4 md:pb-5 text-[14px] md:text-[15px] leading-[1.6] text-[#765F55]">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

      </main>

      <footer className="bg-[#3B2922] py-12 text-white">
        <div className="mx-auto flex flex-col items-center text-center px-4 max-w-4xl">
          {/* Logo Container */}
          <div className="h-20 w-20 md:h-28 md:w-28 rounded-full border border-white/20 mb-6 flex items-center justify-center overflow-hidden">
             <img 
               src={logoAsset.url} 
               alt="Crochet Craft" 
               className="h-full w-full object-contain"
             />
          </div>

          <h3 className="font-display text-[22px] md:text-[26px] font-semibold text-white mb-2">
            Crochet Craft by Prakrati Ruhela
          </h3>
          
          <p className="text-[15px] md:text-[18px] opacity-80 mb-6 max-w-lg leading-relaxed font-medium">
            Handmade crochet · Made with love at home · Shipping across India
          </p>


          <div className="flex flex-col items-center gap-6">
            <a 
              href={INSTAGRAM_URL} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-3 group transition-all hover:scale-105 active:scale-95"
            >
              <div 
                className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full shadow-lg"
                style={{
                  background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true">
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="white" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4.2" stroke="white" strokeWidth="2" />
                  <circle cx="17.6" cy="6.4" r="1.3" fill="white" />
                </svg>
              </div>
              <span className="text-[14px] md:text-[16px] font-semibold tracking-wide text-white/90 group-hover:text-white">@crochet_by_prakrati</span>

            </a>

            <a 
              href={waLink("Hi! I'd like to place an order.")} 
              target="_blank" 
              rel="noreferrer" 
              className="group relative flex h-12 md:h-14 items-center gap-3 overflow-hidden rounded-full border-none px-6 md:px-8 outline-none ring-0 transition-all hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(180deg, #12A66F 0%, #0B7C58 100%)",
                boxShadow: "0 8px 20px -8px rgba(11,124,88,0.6)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="white" className="relative h-5 w-5 md:h-6 md:w-6" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.25-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.25-.85.84-.85 2.04s.87 2.37 1 2.53c.12.17 1.72 2.62 4.16 3.67.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
              </svg>
              <span className="relative text-[14px] md:text-[16px] font-bold tracking-tight text-white">Order on WhatsApp</span>

            </a>
          </div>

        </div>
      </footer>

      <a
        href={waLink("Hi! I have a question about your crochet rakhis.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed right-6 bottom-6 z-40 group flex items-center justify-center transition-all hover:scale-110 active:scale-95 sm:right-8 sm:bottom-8"
      >
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-2 border-white/20">
          <svg viewBox="0 0 24 24" fill="white" className="h-9 w-9" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.25-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.25-.85.84-.85 2.04s.87 2.37 1 2.53c.12.17 1.72 2.62 4.16 3.67.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
          </svg>
        </div>
      </a>

      <CookieNotice />
    </div>
  );
}
