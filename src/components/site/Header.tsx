import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/logo.png.asset.json";
import instagramAsset from "@/assets/instagram.png.asset.json";
import whatsappAsset from "@/assets/whatsapp.png.asset.json";
import whatsappChatAsset from "@/assets/whatsapp-chat.png.asset.json";
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
                by Prakrati Ruhela
              </span>
            </div>
          </a>
          
          <div className="flex items-center gap-1.5">
            <a 
              href={INSTAGRAM_URL} 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram"
              className="group flex h-11 w-11 items-center justify-center transition-all active:scale-95 hover:scale-105"
            >
              <img 
                src={instagramAsset.url} 
                alt="Instagram" 
                className="h-11 w-11 rounded-full object-contain"
              />
            </a>
            <Button asChild variant="whatsapp" className="h-11 rounded-full bg-[#075E54] px-5 text-sm font-semibold text-white shadow-soft transition-all hover:brightness-110 active:scale-95">
              <a href={waLink("Hi! I'd like to know more about your crochet rakhis.")} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                <img 
                  src={whatsappNewAsset.url} 
                  alt="WhatsApp" 
                  className="h-7 w-7 object-contain"
                />
                <span className="text-[15px] font-bold">Chat on WhatsApp</span>
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
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base ${active ? 'bg-white/20' : 'bg-terracotta/5'}`}>
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