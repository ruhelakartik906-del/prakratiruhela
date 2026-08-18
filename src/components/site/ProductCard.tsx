import { Button } from "@/components/ui/button";
import whatsappAsset from "@/assets/whatsapp.png.asset.json";
import { orderLink, rakshaBandhanCategories, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  // Find the display label for the category
  const categoryLabel = rakshaBandhanCategories.find(c => c.id === product.category)?.label || product.category;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[20px] border border-[#EEE7E1] bg-white shadow-[0_4px_16px_rgba(60,40,25,0.06)] h-full min-h-[580px] transition-all duration-300">
      {/* Product Image area: Square container with more padding for a "framed" gallery look */}
      <div className="relative aspect-square overflow-hidden w-full bg-[#FBF6EE]/40 p-[22px]">
        <img
          src={product.image}
          alt={`${product.name} — handmade crochet rakhi`}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover rounded-[14px] transition-transform duration-500 ease-out group-hover:scale-[1.08]"
        />
        {/* Bestseller Badge: Very small, premium pill */}
        <div className="absolute top-[32px] left-[32px] z-10 rounded-full bg-[#C94F32] px-[10px] py-[4px] text-[9px] font-bold tracking-wider text-white transition-all duration-[250ms] ease-in-out group-hover:invisible group-hover:opacity-0 shadow-sm uppercase">
          Bestseller
        </div>
      </div>

      {/* Card Content Padding: Consistent editorial spacing */}
      <div className="flex flex-1 flex-col pt-[24px] px-[28px] pb-[28px] text-left">
        {/* Category Label: uppercase, 11px, #A85A18 */}
        <span className="text-[11px] font-bold tracking-[2px] text-[#A85A18] uppercase mb-[12px]">
          {categoryLabel}
        </span>
        
        {/* Product Title: Playfair Display, 24px, font-weight 700, #1A110D */}
        <h3 className="font-display text-[24px] font-bold leading-[1.15] text-[#1A110D]">
          {product.name}
        </h3>
        
        {/* Product Description: 15px, Inter, 1.6 line-height, #4A3B34 */}
        <p className="mt-[16px] text-[15px] font-medium leading-[1.6] text-[#4A3B34] line-clamp-3">
          {product.description}
        </p>
        
        {/* Price + Order Button on same bottom row */}
        <div className="mt-auto pt-[28px] flex items-center justify-between">
          {/* Price: 24px, bold, #1A110D */}
          <span className="text-[24px] font-bold text-[#1A110D]">₹{product.price}</span>
          
          {/* Order button: Prominent teal pill #087F6D, 16px, 700 */}
          <Button asChild className="h-[52px] rounded-full bg-[#087F6D] px-[32px] text-[16px] font-bold text-white border-none shadow-[0_6px_18px_rgba(8,127,109,0.2)] transition-all hover:bg-[#066a57] active:scale-95">
            <a href={orderLink(product)} target="_blank" rel="noreferrer">
              Order
            </a>
          </Button>
        </div>

      </div>
    </article>
  );
}