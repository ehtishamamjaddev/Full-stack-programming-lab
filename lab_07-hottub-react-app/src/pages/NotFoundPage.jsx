import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import usePageTitle from '../hooks/usePageTitle';
import pageStyles from './Page.module.css';
import styles from './SimplePage.module.css';

function NotFoundPage() {
  usePageTitle('404');

  return (
    <PageTransition>
      <section className={`container ${pageStyles.page}`}>
        <article className={styles.card}>
          <h1 className="section-title">404 - Page not found</h1>
          <p>The page you requested does not exist or has been moved.</p>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </article>
      </section>
    </PageTransition>
  );
}

export default NotFoundPage;
