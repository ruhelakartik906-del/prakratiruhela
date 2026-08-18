import { Button } from "@/components/ui/button";
import whatsappAsset from "@/assets/whatsapp.png.asset.json";
import { orderLink, customOrderLink, rakshaBandhanCategories, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  // Find the display label for the category
  const categoryLabel = rakshaBandhanCategories.find(c => c.id === product.category)?.label || product.category;

  const isCustom = product.id === 'custom-request';

  if (isCustom) {
    return (
      <article 
        className="relative overflow-hidden rounded-[2rem] p-8 text-center border-2 border-dashed border-[#EBD4BA] h-full flex flex-col items-center justify-center transition-all duration-300 hover:shadow-[0_8px_24px_rgba(60,40,25,0.08)]"
        style={{
          background: 'linear-gradient(135deg, #FDF2F8 0%, #EEF2FF 100%)'
        }}
      >
        <div className="flex justify-center gap-3 mb-6">
          <span className="text-3xl">🧶</span>
          <span className="text-3xl">✨</span>
        </div>
        
        <h3 className="font-display text-[24px] font-bold text-[#3B2922] leading-tight mb-4">
          Have your own idea?
        </h3>
        
        <p className="text-[14px] leading-relaxed text-[#5E4A40] mb-8 max-w-[280px]">
          A favourite colour, a cartoon character, a name — tell us and we'll crochet a one-of-a-kind rakhi just for you.
        </p>

        <Button asChild className="h-11 rounded-full bg-[#087F6D] px-8 text-[14px] font-bold text-white shadow-lg transition-all hover:brightness-110 active:scale-95 border-none mt-auto">
          <a href={customOrderLink()} target="_blank" rel="noreferrer">
            Request a custom rakhi
          </a>
        </Button>
      </article>
    );
  }

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[16px] sm:rounded-[18px] border border-[#EEE7E1] bg-white shadow-[0_2px_8px_rgba(60,40,25,0.04)] h-full transition-all duration-300 hover:shadow-[0_8px_24px_rgba(60,40,25,0.08)]">
      {/* Product Image area: Reference shows a very clean, tightly framed image */}
      <div className="relative aspect-square overflow-hidden w-full bg-[#FBF6EE]/30 p-3">
        <img
          src={product.image}
          alt={`${product.name} — handmade crochet rakhi`}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover rounded-[10px] transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />
        {/* Bestseller Badge: Small, simple pill */}
        <div className="absolute top-5 left-5 z-10 rounded-full bg-[#C94F32] px-2 py-0.5 text-[9px] font-bold text-white transition-opacity duration-300 group-hover:opacity-0 shadow-sm">
          Bestseller
        </div>
      </div>

      {/* Card Content Padding: Tight, clean layout per reference */}
      <div className="flex flex-1 flex-col pt-3 md:pt-4 px-3 sm:px-5 md:px-5 pb-3 md:pb-5 text-left">
        {/* Category Label: subtle */}
        <span className="text-[9px] md:text-[10px] font-bold tracking-wider text-[#A85A18] uppercase mb-1 md:mb-2 opacity-80">
          {categoryLabel}
        </span>
        
        {/* Product Title: Elegant serif, medium size */}
        <h3 className="font-display text-[16px] sm:text-[20px] md:text-[18px] font-bold leading-tight text-[#1D1613]">
          {product.name}
        </h3>
        
        {/* Product Description: Clean, readable */}
        <p className="mt-2 md:mt-3 text-[12px] sm:text-[14.5px] md:text-[12.5px] font-medium leading-relaxed text-[#806F64] line-clamp-2">
          {product.description}
        </p>
        
        {/* Price + Order Button: Horizontal alignment */}
        <div className="mt-auto pt-3 md:pt-5 flex items-center justify-between gap-2">
          {/* Price: Bold, prominent */}
          <span className="text-[16px] md:text-[20px] font-bold text-[#1D1613]">₹{product.price}</span>
          
          {/* Order button: Compact teal pill */}
          <Button asChild className="h-8 sm:h-[42px] md:h-10 rounded-full bg-[#087F6D] px-3 sm:px-5 md:px-6 text-[12px] sm:text-[14px] md:text-[14px] font-bold text-white border-none shadow-md transition-all hover:bg-[#066a57] active:scale-95">
            <a href={orderLink(product)} target="_blank" rel="noreferrer">
              Order
            </a>
          </Button>
        </div>


      </div>
    </article>
  );
}