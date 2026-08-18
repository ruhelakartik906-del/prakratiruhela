import { Button } from "@/components/ui/button";
import whatsappAsset from "@/assets/whatsapp.png.asset.json";
import { orderLink, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[16px] border border-[#EEE7E1] bg-white shadow-[0_4px_14px_rgba(70,45,30,0.08)] h-full">
      {/* Image Wrapper */}
      <div className="relative aspect-square overflow-hidden bg-[#FBF7F0]">
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
      <div className="flex flex-1 flex-col p-[20px] text-left">
        {/* Category Label */}
        <span className="text-[11px] font-bold tracking-wider text-[#3F2A22]/40 uppercase mb-2">
          FOR KIDS
        </span>
        
        {/* Product Name */}
        <h3 className="text-[17px] font-bold leading-tight text-[#3F2A22] mb-3">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-[14px] leading-[1.5] text-[#3F2A22]/60 mb-5 line-clamp-2">
          {product.description}
        </p>
        
        {/* Price & Order Row */}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-[18px] font-bold text-[#3F2A22]">₹{product.price}</span>
          
          <Button asChild className="h-[38px] rounded-full bg-[#087F69] px-5 text-[14px] font-bold text-white shadow-none transition-all hover:bg-[#066a57] active:scale-95">
            <a href={orderLink(product)} target="_blank" rel="noreferrer">
              Order
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}