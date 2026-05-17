import { Suspense } from 'react';
import ProductsContent from './ProductsContent';

export default function ProductsPage() {
  return (
    <Suspense fallback={<p className="mx-auto max-w-site px-4 py-20 text-center">Loading shop...</p>}>
      <ProductsContent />
    </Suspense>
  );
}
