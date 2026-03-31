import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import usePageTitle from '../hooks/usePageTitle';
import { contactSchema } from '../utils/validationSchemas';
import styles from './AuthPage.module.css';
import pageStyles from './Page.module.css';

function ContactPage() {
  usePageTitle('Contact');

  return (
    <PageTransition>
      <section className={`container ${pageStyles.page}`}>
        <div className={styles.wrap}>
          <h1 className="section-title">Contact Us</h1>
          <p className={styles.meta}>Need installation guidance or product recommendations? Send us a note.</p>
          <Formik
            initialValues={{ name: '', email: '', message: '' }}
            validationSchema={contactSchema}
            onSubmit={(values, { resetForm }) => {
              console.log('Contact message', values);
              resetForm();
              toast.success('Message sent. We will get back to you soon.');
            }}
          >
            {({ values, touched, errors, handleChange }) => (
              <Form>
                <label className={styles.field}>
                  Name
                  <input name="name" value={values.name} onChange={handleChange} />
                  {touched.name && errors.name && <span className={styles.error}>{errors.name}</span>}
                </label>
                <label className={styles.field}>
                  Email
                  <input name="email" type="email" value={values.email} onChange={handleChange} />
                  {touched.email && errors.email && <span className={styles.error}>{errors.email}</span>}
                </label>
                <label className={styles.field}>
                  Message
                  <textarea rows="5" name="message" value={values.message} onChange={handleChange} />
                  {touched.message && errors.message && <span className={styles.error}>{errors.message}</span>}
                </label>
                <Button type="submit">Send Message</Button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </PageTransition>
  );
}

export default ContactPage;
