import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>Routing App</h1>
        <nav>
          <ul className="nav-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
        </nav>
      </header>
      <section className="page-card">{children}</section>
    </main>
  );
}

export default Layout;
