import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './MainLayout.module.css';

function MainLayout({ children }) {
  const location = useLocation();

  return (
    <div className={styles.appShell}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>
      <Navbar />
      <div id="main-content" className={styles.mainArea} key={location.pathname}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
