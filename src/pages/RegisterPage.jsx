import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import usePageTitle from '../hooks/usePageTitle';
import { useAuthStore } from '../store/authStore';
import { registerSchema } from '../utils/validationSchemas';
import styles from './AuthPage.module.css';
import pageStyles from './Page.module.css';

function RegisterPage() {
  usePageTitle('Register');
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  return (
    <PageTransition>
      <section className={`container ${pageStyles.page}`}>
        <div className={styles.wrap}>
          <h1 className="section-title">Create Account</h1>
          <Formik
            initialValues={{ fullName: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={registerSchema}
            onSubmit={(values) => {
              register(values);
              toast.success('Account created. You are now signed in.');
              navigate('/account');
            }}
          >
            {({ values, touched, errors, handleChange }) => (
              <Form>
                <label className={styles.field}>
                  Full Name
                  <input name="fullName" value={values.fullName} onChange={handleChange} />
                  {touched.fullName && errors.fullName && <span className={styles.error}>{errors.fullName}</span>}
                </label>
                <label className={styles.field}>
                  Email
                  <input name="email" type="email" value={values.email} onChange={handleChange} />
                  {touched.email && errors.email && <span className={styles.error}>{errors.email}</span>}
                </label>
                <label className={styles.field}>
                  Password
                  <input name="password" type="password" value={values.password} onChange={handleChange} />
                  {touched.password && errors.password && <span className={styles.error}>{errors.password}</span>}
                </label>
                <label className={styles.field}>
                  Confirm Password
                  <input
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <span className={styles.error}>{errors.confirmPassword}</span>
                  )}
                </label>
                <Button type="submit">Register</Button>
              </Form>
            )}
          </Formik>
          <p className={styles.meta}>
            Already a member? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </section>
    </PageTransition>
  );
}

export default RegisterPage;
