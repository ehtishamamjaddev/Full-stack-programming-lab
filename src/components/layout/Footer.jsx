import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.wrap}`}>
        <p>HOTSPRING e-commerce React conversion for Lab 07.</p>
        <p>Air University Islamabad | BSSE-VI-B</p>
      </div>
    </footer>
  );
}

export default Footer;
