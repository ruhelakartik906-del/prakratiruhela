import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { orderLink, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={`${product.name} — handmade crochet rakhi`}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between">
          <span className="w-fit rounded-full bg-terracotta/10 px-3 py-1 text-[11px] font-bold tracking-wider text-terracotta uppercase">
            {product.badge}
          </span>
          <span className="font-display text-2xl font-semibold text-[#3F2A22]">₹{product.price}</span>
        </div>
        <h3 className="font-display text-xl leading-snug font-semibold text-[#3F2A22]">{product.name}</h3>
        <p className="text-sm leading-relaxed text-[#3F2A22]/60">{product.description}</p>
        <div className="mt-auto pt-4">
          <Button asChild className="h-12 w-full rounded-full bg-[#087F69] px-6 text-sm font-semibold text-white shadow-md transition-all hover:brightness-110 hover:shadow-lg active:scale-95">
            <a href={orderLink(product)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2">
              <MessageCircle className="h-4 w-4 fill-current" />
              <span>Order on WhatsApp</span>
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}