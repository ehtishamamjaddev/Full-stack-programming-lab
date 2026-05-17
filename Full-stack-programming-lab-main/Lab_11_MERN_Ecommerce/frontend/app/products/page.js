import { ProductCard } from '../../components/ProductCard';
import { fetchProducts } from '../../lib/api';
import Link from 'next/link';

export default async function ProductsPage({ searchParams }) {
  const category = searchParams?.category || '';
  const products = await fetchProducts(category);

  const categories = ['All', 'Electronics', 'Fashion', 'Footwear', 'Accessories'];

  return (
    <div className="w-full max-w-screen-2xl mx-auto py-16 px-6 lg:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 border-b border-gray-200 pb-8">
        <div>
           <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">Shop Collection</h1>
           <p className="text-gray-500 font-medium">Showing top-tier essentials across all categories.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {categories.map(cat => {
            const isActive = category === cat || (!category && cat === 'All');
            return (
              <Link 
                key={cat} 
                href={cat === 'All' ? '/products' : `/products?category=${encodeURIComponent(cat)}`}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border shadow-sm ${
                  isActive 
                    ? 'bg-black text-white border-black shadow-md' 
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </div>
      
      {products.length === 0 ? (
        <div className="py-32 text-center text-gray-500">
            <p className="text-2xl font-semibold mb-2">No products found.</p>
            <p className="font-medium text-gray-400">Try selecting a different category to see our stock.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}