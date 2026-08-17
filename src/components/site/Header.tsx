import { useState } from "react";
import { Instagram, MessageCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/95 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-card shadow-soft ring-1 ring-border/20">
              <span className="font-display text-2xl text-primary">त</span>
            </div>
            <div>
              <span className="block font-display text-2xl leading-none font-semibold text-foreground">
                Crochet Craft
              </span>
              <span className="mt-1 block text-sm text-muted-foreground/80">
                by Pooja Jain · Handmade Premium
              </span>
            </div>
          </a>
          
          <div className="flex items-center gap-4">
            <a 
              href={INSTAGRAM_URL} 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram"
              className="group flex h-11 w-11 items-center justify-center rounded-full bg-card shadow-soft ring-1 ring-border/20 transition-all hover:ring-terracotta/40 active:scale-95"
            >
              <Instagram className="h-5 w-5 text-foreground transition-colors group-hover:text-terracotta" />
            </a>
            <Button asChild variant="whatsapp" className="h-11 rounded-full bg-whatsapp px-8 text-sm font-semibold shadow-soft transition-all hover:brightness-110 active:scale-95">
              <a href={waLink("Hi! I'd like to know more about your crochet rakhis.")} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4 fill-current" />
                <span>Order on WhatsApp</span>
              </a>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-[680px]">
          <div className="relative group">
            <Search className="pointer-events-none absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-terracotta" />
            <input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              type="search"
              placeholder="Search all designs — try 'rose', 'bunny', 'kids'..."
              aria-label="Search products"
              className="h-[58px] w-full rounded-full border border-border/60 bg-card pr-6 pl-13 text-base shadow-soft outline-none transition-all placeholder:text-muted-foreground/50 focus:border-terracotta/40 focus:bg-white focus:ring-4 focus:ring-terracotta/5"
            />
          </div>
        </div>

        <nav className="no-scrollbar -mx-4 mt-8 flex gap-3 overflow-x-auto px-4 pb-4 sm:mx-0 sm:justify-center sm:px-0">
          {categories.map((c) => {
            const active = c.id === category;
            const count = counts[c.id];
            return (
              <button
                key={c.id}
                onClick={() => onCategory(c.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-medium transition-all active:scale-95 ${
                  active
                    ? "border-terracotta/40 bg-white text-terracotta shadow-md ring-1 ring-terracotta/20"
                    : "border-border/60 bg-card text-foreground/80 hover:border-terracotta/40 hover:text-terracotta hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                {c.icon && <span className="text-base">{c.icon}</span>}
                {c.label}
                <span className={`text-[11px] font-semibold opacity-60 ${active ? "text-terracotta" : "text-muted-foreground"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}