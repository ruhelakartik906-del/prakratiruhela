import { Button } from "@/components/ui/button";
import whatsappAsset from "@/assets/whatsapp.png.asset.json";
import { orderLink, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[16px] border border-[#EEE7E1] bg-white shadow-[0_3px_12px_rgba(60,40,25,0.06)] h-full transition-all duration-300">
      {/* Product Image area */}
      <div className="relative aspect-square overflow-hidden w-full block">
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

      {/* Card Content Padding: 14px 20px 16px */}
      <div className="flex flex-1 flex-col pt-[14px] px-[20px] pb-[16px] text-left">
        {/* Category Label: uppercase, 10px, spacing 1px, #A85A18 */}
        <span className="text-[10px] font-semibold tracking-[1px] text-[#A85A18] uppercase mb-[8px]">
          FOR KIDS
        </span>
        
        {/* Product Title: Playfair Display, 17px, font-weight 600, #3B2922 */}
        <h3 className="font-display text-[17px] font-semibold leading-[1.25] text-[#3B2922]">
          {product.name}
        </h3>
        
        {/* Product Description: 12px, Inter, 1.55 line-height, #8A776C, 3 lines clamp */}
        <p className="mt-[10px] text-[12px] font-normal leading-[1.55] text-[#8A776C] line-clamp-3">
          {product.description}
        </p>
        
        {/* Price + Order Button on same bottom row */}
        <div className="mt-auto pt-[16px] flex items-center justify-between">
          {/* Price: 15px, 600, #3B2922 */}
          <span className="text-[15px] font-semibold text-[#3B2922]">₹{product.price}</span>
          
          {/* Order button: Compact teal pill #087F6D, 12px, 600, 9px 17px padding */}
          <Button asChild className="h-[34px] rounded-full bg-[#087F6D] px-[17px] py-[9px] text-[12px] font-semibold text-white border-none shadow-none transition-all hover:bg-[#066a57] active:scale-95">
            <a href={orderLink(product)} target="_blank" rel="noreferrer">
              Order
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}