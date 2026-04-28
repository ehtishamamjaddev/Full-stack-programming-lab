import PageTransition from '../components/common/PageTransition';
import usePageTitle from '../hooks/usePageTitle';
import pageStyles from './Page.module.css';
import styles from './SimplePage.module.css';

function AboutPage() {
  usePageTitle('About');

  return (
    <PageTransition>
      <section className={`container ${pageStyles.page}`}>
        <article className={styles.card}>
          <h1 className="section-title">About HOTSPRING</h1>
          <p>
            HOTSPRING curates premium hot tubs for modern homes, with a focus on comfort, efficient heating,
            and elegant outdoor aesthetics. We blend durable engineering with a clean design language.
          </p>
          <p>
            For this Lab 07 conversion, we moved the original static website into a scalable React architecture
            with routes, reusable components, and state-driven user flows.
          </p>
        </article>
      </section>
    </PageTransition>
  );
}

export default AboutPage;
