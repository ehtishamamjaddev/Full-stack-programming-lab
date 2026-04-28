import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiHeart, FiMenu, FiShoppingCart, FiUser, FiX } from 'react-icons/fi';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import styles from './Navbar.module.css';

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const cartCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.qty, 0));
  const wishCount = useWishlistStore((state) => state.ids.length);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link to="/" className={styles.brand} aria-label="HOTSPRING Home">
          HOTSPRING
        </Link>

        <button
          className={styles.menuBtn}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-haspopup="true"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>

        <nav
          id="main-navigation"
          aria-label="Primary navigation"
          className={`${styles.nav} ${open ? styles.open : ''}`}
        >
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link to="/account" className={styles.iconBtn} aria-label="Account">
            <FiUser />
          </Link>
          <Link to="/shop" className={styles.iconBtn} aria-label="Wishlist items">
            <FiHeart />
            {wishCount > 0 && <span className={styles.badge}>{wishCount}</span>}
          </Link>
          <Link to="/cart" className={styles.iconBtn} aria-label="Cart items">
            <FiShoppingCart />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
