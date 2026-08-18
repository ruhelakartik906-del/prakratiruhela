import { Button } from "@/components/ui/button";
import whatsappAsset from "@/assets/whatsapp.png.asset.json";
import { orderLink, customOrderLink, rakshaBandhanCategories, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  // Find the display label for the category
  const categoryLabel = rakshaBandhanCategories.find(c => c.id === product.category)?.label || product.category;

  const isCustom = product.id === 'custom-request';

  return (
    <article className={`group relative flex flex-col overflow-hidden rounded-[14px] border border-[#EEE7E1] bg-white shadow-[0_2px_8px_rgba(60,40,25,0.04)] h-full transition-all duration-300 hover:shadow-[0_8px_24px_rgba(60,40,25,0.08)] ${isCustom ? 'border-dashed border-2 border-[#EBD4BA]' : ''}`}>
      {/* Product Image area: Reference shows a very clean, tightly framed image */}
      <div className={`relative aspect-square overflow-hidden w-full p-3 ${isCustom ? 'bg-gradient-to-br from-[#FDF2F8] to-[#EEF2FF] flex items-center justify-center' : 'bg-[#FBF6EE]/30'}`}>
        {isCustom ? (
          <div className="text-center space-y-3 p-4">
            <div className="flex justify-center gap-2">
              <span className="text-3xl">🧶</span>
              <span className="text-3xl">✨</span>
            </div>
            <p className="text-[12px] font-bold text-[#A85A18] tracking-widest uppercase">Custom Design</p>
          </div>
        ) : (
          <img
            src={product.image}
            alt={`${product.name} — handmade crochet rakhi`}
            loading="lazy"
            width={800}
            height={800}
            className="h-full w-full object-cover rounded-[10px] transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          />
        )}
        
        {!isCustom && (
          <div className="absolute top-5 left-5 z-10 rounded-full bg-[#C94F32] px-2 py-0.5 text-[9px] font-bold text-white transition-opacity duration-300 group-hover:opacity-0 shadow-sm">
            Bestseller
          </div>
        )}
      </div>

      {/* Card Content Padding: Tight, clean layout per reference */}
      <div className="flex flex-1 flex-col pt-4 px-5 pb-5 text-left">
        {/* Category Label: subtle */}
        <span className="text-[10px] font-bold tracking-wider text-[#A85A18] uppercase mb-2 opacity-80">
          {isCustom ? "Personalized" : categoryLabel}
        </span>
        
        {/* Product Title: Elegant serif, medium size */}
        <h3 className="font-display text-[20px] font-bold leading-tight text-[#1D1613]">
          {isCustom ? "Have your own idea?" : product.name}
        </h3>
        
        {/* Product Description: Clean, readable */}
        <p className="mt-3 text-[13px] font-medium leading-relaxed text-[#5E4A40] line-clamp-2">
          {isCustom 
            ? "A favourite colour, a character, a name — we'll crochet a one-of-a-kind rakhi just for you." 
            : product.description}
        </p>
        
        {/* Price + Order Button: Horizontal alignment */}
        <div className="mt-auto pt-5 flex items-center justify-between">
          {/* Price: Bold, prominent or label for custom */}
          <span className="text-[20px] font-bold text-[#1D1613]">
            {isCustom ? "Custom" : `₹${product.price}`}
          </span>
          
          {/* Order button: Compact teal pill */}
          <Button asChild className="h-10 rounded-full bg-[#087F6D] px-6 text-[14px] font-bold text-white border-none shadow-md transition-all hover:bg-[#066a57] active:scale-95">
            <a href={isCustom ? customOrderLink() : orderLink(product)} target="_blank" rel="noreferrer">
              {isCustom ? "Message" : "Order"}
            </a>
          </Button>
        </div>

      </div>
    </article>
  );
}