import { Button } from "@/components/ui/button";
import whatsappAsset from "@/assets/whatsapp.png.asset.json";
import { orderLink, rakshaBandhanCategories, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  // Find the display label for the category
  const categoryLabel = rakshaBandhanCategories.find(c => c.id === product.category)?.label || product.category;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[16px] border border-[#EEE7E1] bg-white shadow-[0_3px_12px_rgba(60,40,25,0.06)] h-full min-h-[540px] transition-all duration-300">
      {/* Product Image area: 1:1, cover, no padding */}
      <div className="relative aspect-square overflow-hidden w-full block">
        <img
          src={product.image}
          alt={`${product.name} — handmade crochet rakhi`}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.06]"
        />
        {/* Bestseller Badge: Small, top-left, disappears on hover */}
        <div className="absolute top-[12px] left-[12px] z-10 rounded-full bg-[#C94F32] px-[12px] py-[6px] text-[12px] font-bold text-white transition-all duration-[180ms] ease-in-out group-hover:invisible group-hover:opacity-0">
          Bestseller
        </div>
      </div>

      {/* Card Content Padding: 18px 24px 22px */}
      <div className="flex flex-1 flex-col pt-[20px] px-[26px] pb-[24px] text-left">
        {/* Category Label: uppercase, 12px, #A85A18 */}
        <span className="text-[12px] font-bold tracking-[1.5px] text-[#A85A18] uppercase mb-[10px]">
          {categoryLabel}
        </span>
        
        {/* Product Title: Playfair Display, 22px, font-weight 700, #2A1B15 */}
        <h3 className="font-display text-[22px] font-bold leading-[1.2] text-[#2A1B15]">
          {product.name}
        </h3>
        
        {/* Product Description: 14px, Inter, 1.6 line-height, #6B5A51 */}
        <p className="mt-[14px] text-[14px] font-medium leading-[1.6] text-[#6B5A51] line-clamp-3">
          {product.description}
        </p>
        
        {/* Price + Order Button on same bottom row */}
        <div className="mt-auto pt-[24px] flex items-center justify-between">
          {/* Price: 19px, bold, #2A1B15 */}
          <span className="text-[19px] font-bold text-[#2A1B15]">₹{product.price}</span>
          
          {/* Order button: Large teal pill #087F6D, 14px, 700, 12px 24px padding */}
          <Button asChild className="h-[44px] rounded-full bg-[#087F6D] px-[24px] py-[12px] text-[14px] font-bold text-white border-none shadow-lg transition-all hover:bg-[#066a57] active:scale-95">
            <a href={orderLink(product)} target="_blank" rel="noreferrer">
              Order
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}