import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

function ProductGrid({ products }) {
  return (
    <section className={styles.grid} aria-label="Products">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </section>
  );
}

export default ProductGrid;
