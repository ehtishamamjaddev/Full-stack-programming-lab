import Image from 'next/image';
import Link from 'next/link';

export function ProductCard({ product }) {
  const roundedRating = Math.round(product.rating || 0);
  
  return (
    <div className="group relative rounded-2xl bg-white border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      {/* Decorative Bestseller Badge */}
      {product.rating >= 4.8 && (
         <div className="absolute top-4 left-4 z-10 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
            Top Rated
         </div>
      )}

      {/* Image Container with pure white background to mimic Apple/Amazon */}
      <div className="relative h-72 w-full bg-white flex items-center justify-center p-6 border-b border-gray-100">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        ) : (
           <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-400 font-medium rounded-lg">Image Not Available</div>
        )}
      </div>
      
      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col bg-white">
        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
          {product.category || 'Product'}
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
           {product.description}
        </p>
        
        {/* Ratings block */}
        <div className="flex items-center mb-6 text-sm">
          <div className="flex text-yellow-400 gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < roundedRating ? 'opacity-100' : 'opacity-30'}>★</span>
            ))}
          </div>
          <span className="text-gray-400 ml-2 text-xs font-semibold">({Math.floor(Math.random() * 500) + 50})</span>
        </div>

        {/* Pricing & CTA */}
        <div className="flex justify-between items-end mt-auto pt-4 border-t border-gray-100">
          <div>
             <span className="text-xs text-gray-400 font-medium uppercase block mb-1">Price</span>
             <span className="font-extrabold text-gray-900 text-2xl">${product.price?.toFixed(2)}</span>
          </div>
          <button className="bg-white text-gray-900 border-2 border-gray-900 text-sm font-bold rounded-xl px-5 py-2.5 hover:bg-gray-900 hover:text-white transition-all duration-300 active:scale-95 shadow-sm">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}