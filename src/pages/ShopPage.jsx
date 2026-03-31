import { useMemo, useState } from 'react';
import PageTransition from '../components/common/PageTransition';
import ProductGrid from '../components/shop/ProductGrid';
import { products } from '../data/products';
import usePageTitle from '../hooks/usePageTitle';
import styles from './ShopPage.module.css';
import pageStyles from './Page.module.css';

function ShopPage() {
  usePageTitle('Shop');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', ...new Set(products.map((product) => product.category))];

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchText = product.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'All' ? true : product.category === category;
      return matchText && matchCategory;
    });
  }, [search, category]);

  return (
    <PageTransition>
      <section className={`container ${pageStyles.page}`}>
        <header className={pageStyles.head}>
          <span className="kicker">Catalog</span>
          <h1 className="section-title">Shop HOTSPRING Models</h1>
        </header>

        <div className={styles.toolbar}>
          <input
            className="focus-ring"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by model name"
            aria-label="Search products"
          />
          <select
            className="focus-ring"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Filter by category"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <ProductGrid products={visibleProducts} />
      </section>
    </PageTransition>
  );
}

export default ShopPage;
