import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import usePageTitle from '../hooks/usePageTitle';
import { useAuthStore } from '../store/authStore';
import { useWishlistStore } from '../store/wishlistStore';
import pageStyles from './Page.module.css';
import styles from './SimplePage.module.css';

function AccountPage() {
  usePageTitle('Account');
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const wishlistCount = useWishlistStore((state) => state.ids.length);

  return (
    <PageTransition>
      <section className={`container ${pageStyles.page}`}>
        <div className={styles.card}>
          <h1 className="section-title">My Account</h1>
          {user ? (
            <>
              <p>
                Signed in as <strong>{user.fullName}</strong> ({user.email})
              </p>
              <p>Wishlist items: {wishlistCount}</p>
              <Button variant="secondary" onClick={logout}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <p>No active session. Login or create your account to continue.</p>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="ghost">Register</Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </PageTransition>
  );
}

export default AccountPage;
