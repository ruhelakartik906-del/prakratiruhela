import { Button } from "@/components/ui/button";
import whatsappAsset from "@/assets/whatsapp.png.asset.json";
import { orderLink, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[16px] border border-[#EEE7E1] bg-white shadow-[0_4px_14px_rgba(70,45,30,0.08)] transition-all duration-300 h-full">
      {/* Image Wrapper */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={`${product.name} — handmade crochet rakhi`}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.04]"
        />
        {/* Bestseller Badge */}
        <div className="absolute top-[10px] left-[10px] z-10 rounded-full bg-[#C94F32] px-[10px] py-[5px] text-[11px] font-semibold text-white transition-all duration-[180ms] ease-in-out group-hover:invisible group-hover:opacity-0">
          Bestseller
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-end mb-3">
          <span className="font-display text-2xl font-semibold text-[#3F2A22]">₹{product.price}</span>
        </div>
        <h3 className="font-display text-xl font-semibold leading-snug text-[#3F2A22]">{product.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#3F2A22]/60 line-clamp-2">{product.description}</p>
        
        <div className="mt-auto pt-6">
          <Button asChild className="h-12 w-full rounded-full bg-[#25D366] px-6 text-sm font-semibold text-white shadow-md transition-all hover:brightness-110 active:scale-95">
            <a href={orderLink(product)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2">
              <img 
                src={whatsappAsset.url} 
                alt="WhatsApp" 
                className="h-5 w-5 object-contain"
              />
              <span>Order on WhatsApp</span>
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}