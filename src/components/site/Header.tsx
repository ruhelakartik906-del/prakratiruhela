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
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <a href="#top" className="flex min-w-0 items-center gap-2.5">
            <span
              aria-hidden={!logoError}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary font-display text-lg text-primary-foreground"
            >
              त
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-lg leading-tight font-semibold sm:text-xl">
                Taar &amp; Tale
              </span>
              <span className="hidden text-xs text-muted-foreground sm:block">
                Handmade crochet rakhis
              </span>
            </span>
          </a>
          <div className="flex shrink-0 items-center gap-2">
            <Button asChild variant="outline" size="icon" className="rounded-full">
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="whatsapp" className="rounded-full">
              <a href={waLink("Hi! I'd like to know more about your crochet rakhis.")} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Order on WhatsApp</span>
                <span className="sm:hidden">WhatsApp</span>
              </a>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-3 max-w-xl">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              type="search"
              placeholder="Search rakhis, motifs, colours…"
              aria-label="Search products"
              className="h-11 w-full rounded-full border border-border bg-card pr-4 pl-11 text-sm shadow-soft outline-none placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <nav className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:justify-center sm:px-0">
          {categories.map((c) => {
            const active = c.id === category;
            return (
              <button
                key={c.id}
                onClick={() => onCategory(c.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:bg-secondary"
                }`}
              >
                {c.label}
                <span className={active ? "ml-1.5 opacity-80" : "ml-1.5 text-muted-foreground"}>
                  {counts[c.id]}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}