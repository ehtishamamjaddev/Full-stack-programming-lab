import { HeroSection } from '../components/HeroSection';
import { ProductCard } from '../components/ProductCard';
import { fetchProducts } from '../lib/api';
import Link from 'next/link';

export default async function HomePage() {
  const products = await fetchProducts();
  const featured = products.slice(0, 4);

  return (
    <div className="w-full">
      <HeroSection />
      
      <section className="py-24 px-6 md:px-12 max-w-screen-2xl mx-auto w-full">
        <div className="flex justify-between items-end mb-10 pb-4 border-b border-gray-200">
            <div>
               <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">Featured Products</h2>
               <p className="text-gray-500 font-medium">Handpicked gadgets and gear for your everyday life.</p>
            </div>
            <Link href="/products" className="text-primary text-sm font-bold uppercase tracking-widest hover:text-blue-800 transition-colors flex items-center gap-1">
                View All Collection <span aria-hidden="true">&rarr;</span>
            </Link>
        </div>
        
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featured.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-400">Loading featured products...</div>
        )}
      </section>
    </div>
  );
}