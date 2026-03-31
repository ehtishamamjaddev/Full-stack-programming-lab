import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import CartItem from '../components/shop/CartItem';
import usePageTitle from '../hooks/usePageTitle';
import { cartSubtotalSelector, useCartStore } from '../store/cartStore';
import styles from './CartPage.module.css';
import pageStyles from './Page.module.css';

function CartPage() {
  usePageTitle('Cart');
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const subtotal = useCartStore(cartSubtotalSelector);

  return (
    <PageTransition>
      <section className={`container ${pageStyles.page}`}>
        <header className={pageStyles.head}>
          <h1 className="section-title">Your Cart</h1>
        </header>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <p>Cart is empty right now. Browse our hot tubs and come back.</p>
            <Link to="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.list}>
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQty={setQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
            <aside className={styles.summary}>
              <p>
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </p>
              <p>
                <span>Estimated Shipping</span>
                <span>$79.00</span>
              </p>
              <p>
                <span>Total</span>
                <strong>${(subtotal + 79).toFixed(2)}</strong>
              </p>
              <Link to="/checkout">
                <Button>Proceed to Checkout</Button>
              </Link>
            </aside>
          </>
        )}
      </section>
    </PageTransition>
  );
}

export default CartPage;
