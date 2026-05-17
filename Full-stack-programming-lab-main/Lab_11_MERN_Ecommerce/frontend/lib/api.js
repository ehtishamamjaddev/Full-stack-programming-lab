const BASE_URL = 'http://localhost:5000/api';

export async function fetchProducts(category = '') {
  try {
    const url = category && category !== 'All' ? `${BASE_URL}/products?category=${encodeURIComponent(category)}` : `${BASE_URL}/products`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchProductById(id) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}