import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import usePageTitle from '../hooks/usePageTitle';
import pageStyles from './Page.module.css';
import styles from './SimplePage.module.css';

function OrderSummaryPage() {
  usePageTitle('Order Summary');

  const orders = [
    {
      id: 'ORD-2026-001',
      date: '2026-03-25',
      status: 'Shipped',
      total: 1996920,
      items: 1
    },
    {
      id: 'ORD-2026-002',
      date: '2026-03-20',
      status: 'Delivered',
      total: 2149000,
      items: 1
    },
    {
      id: 'ORD-2026-003',
      date: '2026-03-15',
      status: 'Delivered',
      total: 1399000,
      items: 1
    }
  ];

  const formatPrice = (price) => `Rs ${price.toLocaleString('en-US')}`;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Shipped': return '#f59e0b';
      case 'Delivered': return '#16a34a';
      case 'Cancelled': return '#dc2626';
      default: return '#666';
    }
  };

  return (
    <PageTransition>
      <section className={`container ${pageStyles.page}`}>
        <div className={styles.card}>
          <h1 className="section-title">Order Summary</h1>

          {orders.length > 0 ? (
            <>
              <div style={{
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '1rem',
                  padding: '1rem',
                  backgroundColor: '#f9fafb',
                  fontWeight: '600',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <div>Order ID</div>
                  <div>Date</div>
                  <div>Status</div>
                  <div>Items</div>
                  <div style={{ textAlign: 'right' }}>Total</div>
                </div>

                {orders.map(order => (
                  <div key={order.id} style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: '1rem',
                    padding: '1rem',
                    borderBottom: '1px solid #e5e7eb',
                    alignItems: 'center'
                  }}>
                    <div style={{ fontWeight: '500' }}>{order.id}</div>
                    <div>{order.date}</div>
                    <div style={{
                      color: getStatusColor(order.status),
                      fontWeight: '500',
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#f0f9ff',
                      borderRadius: '0.25rem'
                    }}>
                      {order.status}
                    </div>
                    <div>{order.items}</div>
                    <div style={{ textAlign: 'right', fontWeight: '500' }}>
                      {formatPrice(order.total)}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                padding: '1rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{ margin: '0 0 1rem 0' }}>Summary Statistics</h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem'
                }}>
                  <div>
                    <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>Total Orders</p>
                    <p style={{ fontWeight: '600', fontSize: '1.5rem', margin: 0 }}>{orders.length}</p>
                  </div>
                  <div>
                    <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>Total Spent</p>
                    <p style={{ fontWeight: '600', fontSize: '1.5rem', margin: 0 }}>Rs {orders.reduce((sum, o) => sum + o.total, 0).toLocaleString('en-US')}</p>
                  </div>
                  <div>
                    <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>Delivered</p>
                    <p style={{ fontWeight: '600', fontSize: '1.5rem', margin: 0, color: '#16a34a' }}>{orders.filter(o => o.status === 'Delivered').length}</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <Link to="/account">
                  <Button>Back to Account</Button>
                </Link>
                <Link to="/shop">
                  <Button variant="ghost">Continue Shopping</Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <p style={{ color: '#666', textAlign: 'center', marginBottom: '1.5rem' }}>
                You haven't placed any orders yet.
              </p>
              <Link to="/shop" style={{ textAlign: 'center', display: 'block' }}>
                <Button>Start Shopping</Button>
              </Link>
            </>
          )}
        </div>
      </section>
    </PageTransition>
  );
}

export default OrderSummaryPage;
