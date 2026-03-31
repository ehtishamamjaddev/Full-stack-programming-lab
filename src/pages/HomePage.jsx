import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import ProductGrid from '../components/shop/ProductGrid';
import { products } from '../data/products';
import usePageTitle from '../hooks/usePageTitle';
import styles from './HomePage.module.css';
import pageStyles from './Page.module.css';

function HomePage() {
  usePageTitle('Home');

  return (
    <PageTransition>
      <section className={`container ${pageStyles.page}`}>
        <div className={styles.hero}>
          <div>
            <span className="kicker">Premium Hydrotherapy</span>
            <h1>Bring Resort-Level Relaxation Home</h1>
            <p>
              HOTSPRING blends elegant design with high-performance jets, insulation, and smart controls.
              Pick a model that fits your patio and your daily routine.
            </p>
            <div className={styles.ctaGroup}>
              <Link to="/shop">
                <Button>Explore Models</Button>
              </Link>
              <Link to="/about">
                <Button variant="ghost">Why HOTSPRING</Button>
              </Link>
            </div>
          </div>
          <img
            className={styles.heroImg}
            src="https://images.unsplash.com/photo-1600566752227-8f3272eacd1f?auto=format&fit=crop&w=1400&q=80"
            alt="Luxury hot tub setup in outdoor deck"
          />
        </div>

        <section className={styles.features}>
          <article>
            <h3>Energy Smart</h3>
            <p>Insulated shell + efficient heaters for lower monthly running costs.</p>
          </article>
          <article>
            <h3>Quiet Operation</h3>
            <p>Balanced pump profile means less noise during late-night sessions.</p>
          </article>
          <article>
            <h3>After-Sales Support</h3>
            <p>Dedicated maintenance guidance, installation checks, and warranty help.</p>
          </article>
        </section>

        <section style={{ marginTop: '1.2rem' }}>
          <h2 className="section-title">Popular Picks</h2>
          <ProductGrid products={products.slice(0, 3)} />
        </section>
      </section>
    </PageTransition>
  );
}

export default HomePage;
