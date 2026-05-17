export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-border py-12 px-6 text-center text-gray-500">
      <div className="mb-6 flex justify-center items-center gap-2">
         <span className="text-2xl font-extrabold text-light">Bazaar<span className="text-gray-400 text-sm font-normal">.com</span></span>
      </div>
      <p className="mb-8 max-w-sm mx-auto text-sm">Your reliable destination for everyday essentials and premium technology.</p>
      <div className="flex justify-center gap-6 mb-8 text-sm font-medium">
        <a href="/products" className="hover:text-primary transition-colors">Shop</a>
        <a href="#" className="hover:text-primary transition-colors">Customer Service</a>
        <a href="#" className="hover:text-primary transition-colors">Returns</a>
      </div>
      <div className="border-t border-gray-100 pt-8 text-xs text-gray-400">
        © 2026 Bazaar. All rights reserved.
      </div>
    </footer>
  );
}