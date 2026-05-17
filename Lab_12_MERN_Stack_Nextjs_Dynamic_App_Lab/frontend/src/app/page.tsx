import HeroSlider from '../components/home/HeroSlider';
import CategoryShowcase from '../components/home/CategoryShowcase';
import ProductShowcase from '../components/home/ProductShowcase';
import PromoBanners from '../components/home/PromoBanners';
import BlogUpdates from '../components/home/BlogUpdates';

async function getFeaturedProduct() {
  try {
    const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${base}/products?featured=true&limit=1`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data?.[0] || null;
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const heroProduct = await getFeaturedProduct();

  return (
    <>
      <HeroSlider heroProduct={heroProduct} />
      <CategoryShowcase />
      <ProductShowcase />
      <PromoBanners />
      <BlogUpdates />
    </>
  );
}
