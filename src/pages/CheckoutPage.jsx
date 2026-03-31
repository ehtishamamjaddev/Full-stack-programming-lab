import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import usePageTitle from '../hooks/usePageTitle';
import { cartSubtotalSelector, useCartStore } from '../store/cartStore';
import { checkoutSchema } from '../utils/validationSchemas';
import styles from './CheckoutPage.module.css';
import pageStyles from './Page.module.css';

function CheckoutPage() {
  usePageTitle('Checkout');
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore(cartSubtotalSelector);
  const clearCart = useCartStore((state) => state.clearCart);

  const initialValues = {
    fullName: '',
    phone: '',
    city: '',
    address: ''
  };

  return (
    <PageTransition>
      <section className={`container ${pageStyles.page}`}>
        <h1 className="section-title">Checkout</h1>
        <div className={styles.layout}>
          <div className={styles.box}>
            <Formik
              initialValues={initialValues}
              validationSchema={checkoutSchema}
              onSubmit={(values, { resetForm }) => {
                if (!items.length) {
                  toast.error('Cart is empty, add at least one product first.');
                  return;
                }

                // TODO: replace with API call once backend endpoint is available.
                console.log('Checkout payload', values);
                clearCart();
                resetForm();
                toast.success('Order confirmed. Our team will contact you shortly.');
              }}
            >
              {({ values, errors, touched, handleChange }) => (
                <Form noValidate aria-label="Checkout form">
                  <div className={styles.row}>
                    <label className={styles.field}>
                      Full Name
                      <input
                        id="checkout-fullName"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleChange}
                        aria-invalid={Boolean(touched.fullName && errors.fullName)}
                        aria-describedby={
                          touched.fullName && errors.fullName ? 'checkout-fullName-error' : undefined
                        }
                      />
                      {touched.fullName && errors.fullName && (
                        <span id="checkout-fullName-error" role="alert" className={styles.err}>
                          {errors.fullName}
                        </span>
                      )}
                    </label>
                    <label className={styles.field}>
                      Phone
                      <input
                        id="checkout-phone"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        aria-invalid={Boolean(touched.phone && errors.phone)}
                        aria-describedby={touched.phone && errors.phone ? 'checkout-phone-error' : undefined}
                      />
                      {touched.phone && errors.phone && (
                        <span id="checkout-phone-error" role="alert" className={styles.err}>
                          {errors.phone}
                        </span>
                      )}
                    </label>
                  </div>
                  <label className={styles.field}>
                    City
                    <input
                      id="checkout-city"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      aria-invalid={Boolean(touched.city && errors.city)}
                      aria-describedby={touched.city && errors.city ? 'checkout-city-error' : undefined}
                    />
                    {touched.city && errors.city && (
                      <span id="checkout-city-error" role="alert" className={styles.err}>
                        {errors.city}
                      </span>
                    )}
                  </label>
                  <label className={styles.field}>
                    Delivery Address
                    <textarea
                      id="checkout-address"
                      rows="4"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      aria-invalid={Boolean(touched.address && errors.address)}
                      aria-describedby={touched.address && errors.address ? 'checkout-address-error' : undefined}
                    />
                    {touched.address && errors.address && (
                      <span id="checkout-address-error" role="alert" className={styles.err}>
                        {errors.address}
                      </span>
                    )}
                  </label>
                  <Button type="submit">Place Order</Button>
                </Form>
              )}
            </Formik>
          </div>

          <aside className={styles.box}>
            <h2>Order Summary</h2>
            <p>{items.length} item(s)</p>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Delivery: $79.00</p>
            <p>
              <strong>Total: ${(subtotal + 79).toFixed(2)}</strong>
            </p>
          </aside>
        </div>
      </section>
    </PageTransition>
  );
}

export default CheckoutPage;
