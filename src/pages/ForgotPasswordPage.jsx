import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import usePageTitle from '../hooks/usePageTitle';
import pageStyles from './Page.module.css';
import styles from './SimplePage.module.css';

function ForgotPasswordPage() {
  usePageTitle('Forgot Password');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset email sent to:', email);
    setSubmitted(true);
  };

  return (
    <PageTransition>
      <section className={`container ${pageStyles.page}`}>
        <div className={styles.card} style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h1 className="section-title">Forgot Password</h1>

          {!submitted ? (
            <>
              <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your registered email"
                  />
                </div>

                <Button type="submit" style={{ width: '100%', marginTop: '1rem' }}>
                  Send Password Reset Link
                </Button>
              </form>

              <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#666' }}>
                Remember your password?{' '}
                <Link to="/login" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                  Login here
                </Link>
              </p>
            </>
          ) : (
            <>
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#f0fdf4',
                border: '1px solid #86efac',
                borderRadius: '0.5rem',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{ color: '#16a34a', marginTop: 0 }}>Check Your Email</h3>
                <p style={{ color: '#166534', marginBottom: 0 }}>
                  We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions.
                </p>
              </div>

              <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                Didn't receive the email? Check your spam folder or try again with another email address.
              </p>

              <Button
                variant="ghost"
                onClick={() => setSubmitted(false)}
                style={{ width: '100%' }}
              >
                Try Another Email
              </Button>

              <Link to="/" style={{ textDecoration: 'none', display: 'block', textAlign: 'center', marginTop: '1rem' }}>
                <Button variant="ghost" style={{ width: '100%' }}>
                  Back to Home
                </Button>
              </Link>
            </>
          )}
        </div>
      </section>
    </PageTransition>
  );
}

export default ForgotPasswordPage;
