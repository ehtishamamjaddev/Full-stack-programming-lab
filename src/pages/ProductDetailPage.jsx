import { Link, useParams } from 'react-router-dom';
import { FiShoppingBag, FiStar } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';
import usePageTitle from '../hooks/usePageTitle';
import styles from './ProductDetailPage.module.css';
import pageStyles from './Page.module.css';

function ProductDetailPage() {
  const { productId } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const product = products.find((item) => item.id === productId);

  usePageTitle(product?.name || 'Product');

  if (!product) {
    return (
      <PageTransition>
        <section className={`container ${pageStyles.page}`}>
          <div className={pageStyles.card}>
            <h1>Product not found</h1>
            <p>The requested model may have been removed from catalog.</p>
            <Link to="/shop">Back to shop</Link>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className={`container ${pageStyles.page}`}>
        <div className={styles.layout}>
          <img src={product.image} alt={product.name} className={styles.hero} />

          <article className={`${styles.side} ${pageStyles.card}`}>
            <span className="kicker">{product.category}</span>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>
              <FiStar /> {product.rating} Rating | {product.seats} Seats
            </p>
            <p className={styles.price}>${product.price}</p>
            <Button
              onClick={() => {
                addToCart(product);
                toast.success('Ready for checkout whenever you are.');
              }}
            >
              <FiShoppingBag /> Add to Cart
            </Button>
          </article>
        </div>
      </section>
    </PageTransition>
  );
}

export default ProductDetailPage;
