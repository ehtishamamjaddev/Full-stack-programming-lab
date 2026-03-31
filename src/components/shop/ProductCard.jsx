import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiUsers } from 'react-icons/fi';
import { useWishlistStore } from '../../store/wishlistStore';
import { useCartStore } from '../../store/cartStore';
import Button from '../common/Button';
import styles from './ProductCard.module.css';

function ProductCard({ product, index = 0 }) {
  const ids = useWishlistStore((state) => state.ids);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const addToCart = useCartStore((state) => state.addToCart);
  const active = ids.includes(product.id);

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.2 }}
    >
      <img src={product.image} alt={product.name} className={styles.cover} loading="lazy" />
      <button
        className={`${styles.heart} ${active ? styles.hearted : ''}`}
        onClick={() => toggleWishlist(product.id)}
        aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <FiHeart />
      </button>
      <div className={styles.body}>
        <div className={styles.row}>
          <h3>{product.name}</h3>
          <p className={styles.price}>${product.price}</p>
        </div>
        <p className={styles.copy}>{product.short}</p>
        <p className={styles.meta}>
          <FiUsers /> {product.seats} Seats
        </p>
        <div className={styles.actions}>
          <Link className={styles.detailLink} to={`/product/${product.id}`}>
            Details
          </Link>
          <Button variant="secondary" onClick={() => addToCart(product)}>
            <FiShoppingBag /> Add
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

export default ProductCard;
