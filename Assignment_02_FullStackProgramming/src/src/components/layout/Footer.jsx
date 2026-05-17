import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.wrap}`}>
        <div className={styles.topRow}>
          <p className={styles.title}>HOTSPRING e-commerce React conversion for Lab 07.</p>
          <div className={styles.meta}>
            <span>Section: BSSE-VI-B</span>
            <span>Instructor: Sir Shareef Hussain</span>
          </div>
        </div>

        <div className={styles.creditsRow}>
          <span className={styles.creditsLabel}>Credits</span>
          <p className={styles.creditsText}>
            M Ehtisham Amjad (231996), M Abdullah Fawad (232052), Aman Mir (233002)
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
