import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/logo-transparent.png.asset.json";
import {
  mainCategories,
  getMainCategoryCounts,
  INSTAGRAM_URL,
  waLink,
  type MainCategoryId,
} from "@/data/products";

type Props = {
  query: string;
  onQuery: (v: string) => void;
  category: MainCategoryId;
  onCategory: (c: MainCategoryId) => void;
};

export function Header({ query, onQuery, category, onCategory }: Props) {
  const counts = getMainCategoryCounts();

  return (
    <header className="sticky top-0 z-40 bg-[#FBF6EE]/92 backdrop-blur-md border-b border-[#EBE3D5]/50 shadow-sm">
      <div className="w-full pt-2 lg:desktop-container tablet-container">
        {/* Brand Row */}
        <div className="flex items-center justify-between gap-3 px-4 lg:px-8 md:px-0">
          <a href="#top" className="flex items-center gap-2 md:gap-3">
            <div className="flex h-12 w-12 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-[#EBE3D5] overflow-hidden">
              <img 
                src={logoAsset.url} 
                alt="Crochet Craft Logo" 
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <span className="block font-display text-[15px] sm:text-[26px] md:text-lg font-semibold tracking-tight text-[#3F2A22]">
                Crochet Craft
              </span>
              <span className="block text-[10px] sm:text-[15px] md:text-[12px] font-medium text-[#3F2A22]/60">
                by Prakrati Ruhela
              </span>
            </div>
          </a>
          
          <div className="flex items-center gap-2 md:gap-3">
            <a 
              href={INSTAGRAM_URL} 
              target="_blank" 
              rel="noopener noreferrer" 

              aria-label="Instagram"
              className="flex h-8 w-8 sm:h-[70px] sm:w-[70px] md:h-10 md:w-10 items-center justify-center rounded-full transition-all hover:scale-105 active:scale-95 sm:order-first"
              style={{
                background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true">
                <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="white" strokeWidth="2" />
                <circle cx="12" cy="12" r="4.2" stroke="white" strokeWidth="2" />
                <circle cx="17.6" cy="6.4" r="1.3" fill="white" />
              </svg>
            </a>
            <a 
              href={waLink("Hi! I'd like to know more about your crochet products.")} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex h-8 sm:h-[70px] sm:w-[220px] md:h-10 items-center justify-center gap-1.5 md:gap-2 rounded-full px-3 sm:px-8 md:px-5 transition-all hover:brightness-105 active:scale-95"
              style={{
                background: "linear-gradient(180deg, #12A66F 0%, #0B7C58 100%)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="white" className="h-[14px] w-[14px] md:h-[18px] md:w-[18px]" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.25-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.25-.85.84-.85 2.04s.87 2.37 1 2.53c.12.17 1.72 2.62 4.16 3.67.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
              </svg>
              <span className="text-[11px] sm:text-[16px] md:text-[14px] font-bold text-white hidden sm:block">Order on WhatsApp</span>
            </a>
          </div>
        </div>
 
        {/* Search Bar Row */}
        <div className="mt-3 md:mt-4 lg:mt-5 flex justify-center px-4 lg:px-8 md:px-0">
          <div className="relative w-full md:w-[620px] tablet-container md:tablet-auto">
            <Search className="pointer-events-none absolute top-1/2 left-4 md:left-5 h-4 w-4 md:h-5 md:w-5 -translate-y-1/2 text-[#3F2A22]/40" />
            <input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              type="search"
              placeholder="Search designs..."
              className="h-[50px] sm:h-[76px] md:h-[54px] w-full rounded-full border border-black/5 bg-[#FFFDF9] pr-4 pl-10 sm:pl-16 md:pr-6 md:pl-13 text-[14px] sm:text-[25px] md:text-base shadow-sm outline-none transition-all placeholder:text-[#3F2A22]/40 focus:border-terracotta/40"
            />
          </div>
        </div>
 
        {/* Category Slider Row */}
        <div className="mt-2 md:mt-3 sm:mt-16 border-b border-black/5 px-4 md:px-0 tablet-container md:tablet-auto">
          <nav className="no-scrollbar flex w-full items-center gap-2 md:gap-3 overflow-x-auto pb-3 md:pb-4">
            {mainCategories.map((c) => {
              const active = c.id === category;
              const count = counts[c.id];
              return (
                <button
                  key={c.id}
                  onClick={() => onCategory(c.id)}
                  className={`flex h-[48px] sm:h-[76px] md:h-[54px] shrink-0 items-center rounded-full border px-3 sm:px-7 md:px-4 transition-all active:scale-95 ${
                    active
                      ? "border-terracotta bg-terracotta text-white"
                      : "border-black/5 bg-[#FFFDF9] text-[#3F2A22] hover:border-terracotta/40"
                  }`}
                >
                  {c.icon && (
                    <span className="flex h-7 w-7 sm:h-[34px] sm:w-[34px] md:h-9 md:w-9 shrink-0 items-center justify-center text-[16px] sm:text-[28px] md:text-[20px]">
                      {c.icon}
                    </span>
                  )}
                  <span className="ml-2 sm:ml-4 md:ml-3 whitespace-nowrap text-[13px] sm:text-[20px] md:text-[14px] font-semibold">
                    {c.label}
                  </span>
                  <span className={`ml-2 pl-2 border-l border-current/20 text-[11px] sm:text-[17px] md:text-[12px] font-bold opacity-60`}>
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