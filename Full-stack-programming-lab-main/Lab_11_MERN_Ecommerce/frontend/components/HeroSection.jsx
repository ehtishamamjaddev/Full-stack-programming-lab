import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="w-full bg-gray-100 py-16 px-6 border-b border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 text-left mb-10 md:mb-0">
          <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">New Arrivals Every Day</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-light mb-6 leading-tight">
            Shop the very best <br/>in tech & lifestyle.
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md">
            Find everything you need with fast shipping, reliable customer service, and unbeatable prices.
          </p>
          <div className="flex gap-4">
            <Link href="/products">
              <button className="bg-primary text-white font-semibold rounded-lg px-8 py-3 hover:bg-blue-700 transition shadow-md">
                Shop Now
              </button>
            </Link>
            <button className="bg-white text-light font-semibold rounded-lg px-8 py-3 border border-border hover:bg-gray-50 transition">
              Explore Deals
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
            {/* Minimal abstract shapes or pure CSS illustration since we don't have a hero image */}
            <div className="relative w-full max-w-md aspect-square bg-white rounded-full shadow-2xl flex items-center justify-center p-8 border border-gray-100">
               <div className="w-full h-full rounded-full border-4 border-dashed border-primary opacity-20 animate-[spin_10s_linear_infinite]"></div>
               <div className="absolute text-2xl font-bold text-gray-300">Bazaar Premium</div>
            </div>
        </div>
      </div>
    </section>
  );
}