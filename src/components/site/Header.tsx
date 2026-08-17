import { useState } from "react";
import { Instagram, MessageCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/logo.png.asset.json";
import {
  categories,
  categoryCounts,
  INSTAGRAM_URL,
  waLink,
  type CategoryId,
} from "@/data/products";

type Props = {
  query: string;
  onQuery: (v: string) => void;
  category: CategoryId;
  onCategory: (c: CategoryId) => void;
};

export function Header({ query, onQuery, category, onCategory }: Props) {
  const counts = categoryCounts();
  const [logoError] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="mx-auto w-full px-4 pt-4 sm:px-6">
        {/* Brand Row */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-soft overflow-hidden ring-1 ring-black/5">
              <img 
                src={logoAsset.url} 
                alt="Crochet Craft Logo" 
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <span className="block font-display text-xl font-semibold tracking-tight text-[#3F2A22]">
                Crochet Craft
              </span>
              <span className="block text-[13px] font-medium text-[#3F2A22]/60">
                by Pooja Jain · Handmade Premium
              </span>
            </div>
          </a>
          
          <div className="flex items-center gap-3">
            <a 
              href={INSTAGRAM_URL} 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram"
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-soft ring-1 ring-black/5 transition-all hover:ring-terracotta/40 active:scale-95"
            >
              <Instagram className="h-4.5 w-4.5 text-[#3F2A22] transition-colors group-hover:text-terracotta" />
            </a>
            <Button asChild variant="whatsapp" className="h-10 rounded-full bg-[#087F69] px-6 text-sm font-semibold text-white shadow-soft transition-all hover:brightness-110 active:scale-95">
              <a href={waLink("Hi! I'd like to know more about your crochet rakhis.")} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4 fill-current" />
                <span>Order on WhatsApp</span>
              </a>
            </Button>
          </div>
        </div>

        {/* Search Bar Row */}
        <div className="mx-auto mt-4 max-w-[700px]">
          <div className="relative group">
            <Search className="pointer-events-none absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-[#3F2A22]/40 transition-colors group-focus-within:text-terracotta" />
            <input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              type="search"
              placeholder="Search all designs — try 'rose', 'bunny', 'kids'..."
              aria-label="Search products"
              className="h-[52px] w-full rounded-full border border-black/5 bg-white pr-6 pl-13 text-base shadow-soft outline-none transition-all placeholder:text-[#3F2A22]/40 focus:border-terracotta/40 focus:ring-4 focus:ring-terracotta/5"
            />
          </div>
        </div>

        {/* Category Slider Row */}
        <div className="mt-5 border-b border-black/5">
          <nav className="no-scrollbar flex w-full items-center gap-4 overflow-x-auto pt-2 pb-6 scroll-smooth">
            {categories.map((c) => {
              const active = c.id === category;
              const count = counts[c.id];
              return (
                <button
                  key={c.id}
                  onClick={() => onCategory(c.id)}
                  className={`flex h-[60px] shrink-0 items-center gap-3.5 rounded-full border px-6 text-[15px] font-semibold transition-all active:scale-95 lg:w-[calc((100%-80px)/6)] min-w-[200px] justify-center ${
                    active
                      ? "border-terracotta bg-terracotta text-white shadow-md"
                      : "border-black/5 bg-white text-[#3F2A22] hover:border-terracotta/40 hover:text-terracotta hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  {c.icon && (
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full text-base ${active ? 'bg-white/20' : 'bg-terracotta/5'}`}>
                      {c.icon}
                    </span>
                  )}
                  <span className="whitespace-nowrap">{c.label}</span>
                  <span className={`text-[13px] font-bold opacity-50 ${active ? "text-white" : "text-[#3F2A22]/60"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}