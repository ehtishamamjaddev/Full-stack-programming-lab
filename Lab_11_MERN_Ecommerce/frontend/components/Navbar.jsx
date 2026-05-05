import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="bg-cardBg border-b border-border text-light py-4 px-6 md:px-12 flex justify-between items-center shadow-sm">
      <Link href="/" className="text-2xl font-extrabold tracking-tight text-primary flex items-center gap-2">
        Bazaar<span className="text-gray-400 text-sm font-normal">.com</span>
      </Link>
      <div className="flex gap-6 font-medium text-sm">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <Link href="/products" className="hover:text-primary transition-colors">Shop</Link>
        <Link href="#" className="hover:text-primary transition-colors">Deals</Link>
      </div>
      <div className="flex gap-4 items-center">
         <div className="hidden md:flex relative">
            <input type="text" placeholder="Search..." className="bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-64"/>
         </div>
         <button className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition">Cart (0)</button>
      </div>
    </nav>
  );
}