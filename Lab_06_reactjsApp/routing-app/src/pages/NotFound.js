import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <article>
      <h2>404 Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link className="inline-link" to="/">
        Return to Home
      </Link>
    </article>
  );
}

export default NotFound;
