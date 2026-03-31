import { useParams, Link } from 'react-router-dom';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import usePageTitle from '../hooks/usePageTitle';
import pageStyles from './Page.module.css';
import styles from './SimplePage.module.css';

function OrderDetailsPage() {
  usePageTitle('Order Details');
  const { orderId } = useParams();

  // Mock order data
  const order = {
    orderId: orderId || 'ORD-2026-001',
    status: 'Shipped',
    orderDate: '2026-03-25',
    estimatedDelivery: '2026-03-31',
    items: [
      {
        id: 1,
        name: 'HOTSPRING Zenith 8',
        price: 1849000,
        quantity: 1,
        image: 'https://images.pexels.com/photos/261403/pexels-photo-261403.jpeg?auto=compress&cs=tinysrgb&w=200'
      }
    ],
    subtotal: 1849000,
    tax: 147920,
    shipping: 0,
    total: 1996920,
    shippingAddress: {
      fullName: 'John Doe',
      address: '123 Main Street',
      city: 'Islamabad',
      state: 'Islamabad',
      postalCode: '44000',
      country: 'Pakistan'
    },
    trackingNumber: 'TR-2026-987654'
  };

  const formatPrice = (price) => `Rs ${price.toLocaleString('en-US')}`;

  return (
    <PageTransition>
      <section className={`container ${pageStyles.page}`}>
        <div className={styles.card}>
          <h1 className="section-title">Order Details</h1>

          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              padding: '1rem',
              backgroundColor: '#f9fafb',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              <div>
                <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>Order ID</p>
                <p style={{ fontWeight: '600', margin: 0 }}>{order.orderId}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>Status</p>
                <p style={{ fontWeight: '600', margin: 0, color: '#16a34a' }}>{order.status}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>Order Date</p>
                <p style={{ fontWeight: '600', margin: 0 }}>{order.orderDate}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>Est. Delivery</p>
                <p style={{ fontWeight: '600', margin: 0 }}>{order.estimatedDelivery}</p>
              </div>
            </div>

            <div style={{
              padding: '1rem',
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              <p style={{ fontSize: '0.9rem', color: '#1e40af', margin: 0 }}>
                📦 Tracking Number: <strong>{order.trackingNumber}</strong>
              </p>
            </div>
          </div>

          <h3 style={{ marginBottom: '1rem' }}>Order Items</h3>
          <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            overflow: 'hidden',
            marginBottom: '2rem'
          }}>
            {order.items.map(item => (
              <div key={item.id} style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr auto',
                gap: '1rem',
                padding: '1rem',
                borderBottom: '1px solid #e5e7eb',
                alignItems: 'center'
              }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', borderRadius: '0.25rem' }} />
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0' }}>{item.name}</h4>
                  <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>Qty: {item.quantity}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: '600', margin: 0 }}>{formatPrice(item.price)}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '1rem',
            padding: '1.5rem',
            backgroundColor: '#f9fafb',
            borderRadius: '0.5rem',
            marginBottom: '2rem'
          }}>
            <div>
              <p style={{ color: '#666', margin: '0.5rem 0' }}>Subtotal:</p>
              <p style={{ color: '#666', margin: '0.5rem 0' }}>Tax:</p>
              <p style={{ color: '#666', margin: '0.5rem 0' }}>Shipping:</p>
              <p style={{ fontWeight: '600', fontSize: '1.1rem', margin: '0.75rem 0 0 0', paddingTop: '0.75rem', borderTop: '1px solid #e5e7eb' }}>Total:</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: '#666', margin: '0.5rem 0' }}>{formatPrice(order.subtotal)}</p>
              <p style={{ color: '#666', margin: '0.5rem 0' }}>{formatPrice(order.tax)}</p>
              <p style={{ color: '#666', margin: '0.5rem 0' }}>Free</p>
              <p style={{ fontWeight: '600', fontSize: '1.1rem', margin: '0.75rem 0 0 0', paddingTop: '0.75rem', borderTop: '1px solid #e5e7eb' }}>{formatPrice(order.total)}</p>
            </div>
          </div>

          <h3 style={{ marginBottom: '1rem' }}>Shipping Address</h3>
          <div style={{
            padding: '1rem',
            backgroundColor: '#f9fafb',
            borderRadius: '0.5rem',
            marginBottom: '2rem'
          }}>
            <p style={{ margin: '0.5rem 0', fontWeight: '500' }}>{order.shippingAddress.fullName}</p>
            <p style={{ margin: '0.5rem 0', color: '#666' }}>{order.shippingAddress.address}</p>
            <p style={{ margin: '0.5rem 0', color: '#666' }}>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
            <p style={{ margin: '0.5rem 0', color: '#666' }}>{order.shippingAddress.country}</p>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <Link to="/shop">
              <Button variant="ghost">Continue Shopping</Button>
            </Link>
            <Link to="/account">
              <Button>Back to Account</Button>
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default OrderDetailsPage;
