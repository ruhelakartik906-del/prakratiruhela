import { Button } from "@/components/ui/button";
import whatsappAsset from "@/assets/whatsapp.png.asset.json";
import { orderLink, rakshaBandhanCategories, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  // Find the display label for the category
  const categoryLabel = rakshaBandhanCategories.find(c => c.id === product.category)?.label || product.category;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[16px] border border-[#EEE7E1] bg-white shadow-[0_3px_12px_rgba(60,40,25,0.06)] h-full min-h-[500px] transition-all duration-300">
      {/* Product Image area: 1:1, cover, no padding */}
      <div className="relative aspect-square overflow-hidden w-full block">
        <img
          src={product.image}
          alt={`${product.name} — handmade crochet rakhi`}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.04]"
        />
        {/* Bestseller Badge: Small, top-left, disappears on hover */}
        <div className="absolute top-[10px] left-[10px] z-10 rounded-full bg-[#C94F32] px-[10px] py-[5px] text-[11px] font-bold text-white transition-all duration-[180ms] ease-in-out group-hover:invisible group-hover:opacity-0">
          Bestseller
        </div>
      </div>

      {/* Card Content Padding: 14px 20px 16px */}
      <div className="flex flex-1 flex-col pt-[18px] px-[24px] pb-[20px] text-left">
        {/* Category Label: uppercase, 10px, spacing 1px, #A85A18 */}
        <span className="text-[11px] font-bold tracking-[1.2px] text-[#A85A18] uppercase mb-[8px]">
          {categoryLabel}
        </span>
        
        {/* Product Title: Playfair Display, 17px, font-weight 600, #3B2922 */}
        <h3 className="font-display text-[19px] font-bold leading-[1.25] text-[#2A1B15]">
          {product.name}
        </h3>
        
        {/* Product Description: 12px, Inter, 1.55 line-height, #8A776C, 3 lines clamp */}
        <p className="mt-[12px] text-[13px] font-medium leading-[1.6] text-[#6B5A51] line-clamp-3">
          {product.description}
        </p>
        
        {/* Price + Order Button on same bottom row */}
        <div className="mt-auto pt-[20px] flex items-center justify-between">
          {/* Price: 15px, 600, #3B2922 */}
          <span className="text-[17px] font-bold text-[#2A1B15]">₹{product.price}</span>
          
          {/* Order button: Compact teal pill #087F6D, 12px, 600, 9px 17px padding */}
          <Button asChild className="h-[38px] rounded-full bg-[#087F6D] px-[20px] py-[10px] text-[13px] font-bold text-white border-none shadow-md transition-all hover:bg-[#066a57] active:scale-95">
            <a href={orderLink(product)} target="_blank" rel="noreferrer">
              Order
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}