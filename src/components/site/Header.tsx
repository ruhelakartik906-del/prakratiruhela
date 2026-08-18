import { Search } from "lucide-react";
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

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="mx-auto w-full px-4 pt-4 sm:px-6">
        {/* Brand Row */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-[#EBE3D5] overflow-hidden">
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
          
          <div className="flex items-center gap-3 bg-transparent border-none p-0 m-0 shadow-none outline-none ring-0">
            <a 
              href={INSTAGRAM_URL} 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram"
              className="group relative flex h-12 w-12 items-center justify-center rounded-full border-none p-0 outline-none ring-0 transition-all hover:scale-105 active:scale-95"
              style={{
                background:
                  "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                boxShadow:
                  "0 6px 16px -4px rgba(214,36,159,0.45), inset 0 1px 1px rgba(255,255,255,0.45)",
              }}
            >
              <span className="pointer-events-none absolute inset-x-1 top-0.5 h-1/2 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
              <svg viewBox="0 0 24 24" fill="none" className="relative h-6 w-6" aria-hidden="true">
                <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="white" strokeWidth="2" />
                <circle cx="12" cy="12" r="4.2" stroke="white" strokeWidth="2" />
                <circle cx="17.6" cy="6.4" r="1.3" fill="white" />
              </svg>
            </a>
            <a 
              href={waLink("Hi! I'd like to know more about your crochet products.")} 
              target="_blank" 
              rel="noreferrer" 
              className="group relative flex h-12 items-center gap-2.5 overflow-hidden rounded-full border-none px-6 outline-none ring-0 transition-all hover:brightness-105 active:scale-95"
              style={{
                background: "linear-gradient(180deg, #12A66F 0%, #0B7C58 100%)",
                boxShadow:
                  "0 8px 20px -8px rgba(11,124,88,0.6), inset 0 1px 1px rgba(255,255,255,0.35)",
              }}
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/18 to-transparent" />
              <svg viewBox="0 0 24 24" fill="white" className="relative h-[22px] w-[22px]" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.25-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.25-.85.84-.85 2.04s.87 2.37 1 2.53c.12.17 1.72 2.62 4.16 3.67.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
              </svg>
              <span className="relative text-[15px] font-bold tracking-tight text-white">Order on WhatsApp</span>
            </a>
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
          <nav className="no-scrollbar flex w-full items-center gap-3.5 overflow-x-auto px-4 pt-2 pb-6 scroll-smooth">
            {categories.map((c) => {
              const active = c.id === category;
              const count = counts[c.id];
              return (
                <button
                  key={c.id}
                  onClick={() => onCategory(c.id)}
                  className={`flex min-h-[64px] shrink-0 items-center rounded-full border px-[18px] transition-all active:scale-95 ${
                    active
                      ? "border-terracotta bg-terracotta text-white shadow-md"
                      : "border-black/5 bg-white text-[#3F2A22] hover:border-terracotta/40 hover:text-terracotta hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  {/* Icon Circle */}
                  {c.icon && (
                    <span className={`flex h-10 w-10 min-w-[40px] shrink-0 items-center justify-center rounded-full text-base ${active ? 'bg-white/20' : 'bg-terracotta/5'}`}>
                      {c.icon}
                    </span>
                  )}
                  
                  {/* Category Name */}
                  <span className="ml-[14px] whitespace-nowrap text-[15px] font-semibold leading-none">
                    {c.label}
                  </span>
                  
                  {/* Count */}
                  <span className={`ml-auto pl-3 whitespace-nowrap text-[13px] font-bold opacity-50 ${active ? "text-white" : "text-[#3F2A22]/60"}`}>
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