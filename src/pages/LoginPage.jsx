import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import usePageTitle from '../hooks/usePageTitle';
import { useAuthStore } from '../store/authStore';
import { loginSchema } from '../utils/validationSchemas';
import styles from './AuthPage.module.css';
import pageStyles from './Page.module.css';

function LoginPage() {
  usePageTitle('Login');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  return (
    <PageTransition>
      <section className={`container ${pageStyles.page}`}>
        <div className={styles.wrap}>
          <h1 className="section-title">Welcome Back</h1>
          <p className={styles.meta}>Use your HOTSPRING account to track orders and save favorites.</p>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              login(values);
              toast.success('Logged in successfully');
              navigate('/account');
            }}
          >
            {({ values, touched, errors, handleChange }) => (
              <Form>
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
                <Button type="submit">Login</Button>
              </Form>
            )}
          </Formik>
          <p className={styles.meta}>
            New here? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </section>
    </PageTransition>
  );
}

export default LoginPage;
