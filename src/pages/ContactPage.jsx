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
              <Form noValidate aria-label="Contact form">
                <label className={styles.field}>
                  Name
                  <input
                    id="contact-name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(touched.name && errors.name)}
                    aria-describedby={touched.name && errors.name ? 'contact-name-error' : undefined}
                  />
                  {touched.name && errors.name && (
                    <span id="contact-name-error" role="alert" className={styles.error}>
                      {errors.name}
                    </span>
                  )}
                </label>
                <label className={styles.field}>
                  Email
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(touched.email && errors.email)}
                    aria-describedby={touched.email && errors.email ? 'contact-email-error' : undefined}
                  />
                  {touched.email && errors.email && (
                    <span id="contact-email-error" role="alert" className={styles.error}>
                      {errors.email}
                    </span>
                  )}
                </label>
                <label className={styles.field}>
                  Message
                  <textarea
                    id="contact-message"
                    rows="5"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(touched.message && errors.message)}
                    aria-describedby={touched.message && errors.message ? 'contact-message-error' : undefined}
                  />
                  {touched.message && errors.message && (
                    <span id="contact-message-error" role="alert" className={styles.error}>
                      {errors.message}
                    </span>
                  )}
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
