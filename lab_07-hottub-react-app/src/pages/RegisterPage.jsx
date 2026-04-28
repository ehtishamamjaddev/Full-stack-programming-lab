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
              <Form noValidate aria-label="Registration form">
                <label className={styles.field}>
                  Full Name
                  <input
                    id="register-fullName"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    aria-invalid={Boolean(touched.fullName && errors.fullName)}
                    aria-describedby={touched.fullName && errors.fullName ? 'register-fullName-error' : undefined}
                  />
                  {touched.fullName && errors.fullName && (
                    <span id="register-fullName-error" role="alert" className={styles.error}>
                      {errors.fullName}
                    </span>
                  )}
                </label>
                <label className={styles.field}>
                  Email
                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(touched.email && errors.email)}
                    aria-describedby={touched.email && errors.email ? 'register-email-error' : undefined}
                  />
                  {touched.email && errors.email && (
                    <span id="register-email-error" role="alert" className={styles.error}>
                      {errors.email}
                    </span>
                  )}
                </label>
                <label className={styles.field}>
                  Password
                  <input
                    id="register-password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    aria-invalid={Boolean(touched.password && errors.password)}
                    aria-describedby={touched.password && errors.password ? 'register-password-error' : undefined}
                  />
                  {touched.password && errors.password && (
                    <span id="register-password-error" role="alert" className={styles.error}>
                      {errors.password}
                    </span>
                  )}
                </label>
                <label className={styles.field}>
                  Confirm Password
                  <input
                    id="register-confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    aria-invalid={Boolean(touched.confirmPassword && errors.confirmPassword)}
                    aria-describedby={
                      touched.confirmPassword && errors.confirmPassword
                        ? 'register-confirmPassword-error'
                        : undefined
                    }
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <span id="register-confirmPassword-error" role="alert" className={styles.error}>
                      {errors.confirmPassword}
                    </span>
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
