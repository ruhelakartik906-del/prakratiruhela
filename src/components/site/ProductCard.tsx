import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { orderLink, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-transform duration-300 hover:-translate-y-1">
      <div className="aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={`${product.name} — handmade crochet rakhi`}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="w-fit rounded-full bg-secondary px-3 py-1 text-[11px] tracking-wide text-secondary-foreground uppercase">
          {product.badge}
        </span>
        <h3 className="font-display text-lg leading-snug font-semibold">{product.name}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <span className="font-display text-xl font-semibold">₹{product.price}</span>
          <Button asChild variant="whatsapp" className="pill-hover-effect rounded-full bg-[#075E54] px-5 py-2 hover:bg-[#128C7E] active:scale-95">
            <a href={orderLink(product)} target="_blank" rel="noreferrer" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 fill-current" />
              <span className="font-semibold">Order</span>
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}