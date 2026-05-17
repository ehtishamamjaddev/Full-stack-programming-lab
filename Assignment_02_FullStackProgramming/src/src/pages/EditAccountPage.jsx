import { useState } from 'react';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import usePageTitle from '../hooks/usePageTitle';
import { useAuthStore } from '../store/authStore';
import pageStyles from './Page.module.css';
import styles from './SimplePage.module.css';

function EditAccountPage() {
  usePageTitle('Edit Account');
  const user = useAuthStore((state) => state.user);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [activeTab, setActiveTab] = useState('profile');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', { fullName: formData.fullName, email: formData.email });
    alert('Profile updated successfully!');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    console.log('Password changed');
    alert('Password changed successfully!');
    setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
  };

  return (
    <PageTransition>
      <section className={`container ${pageStyles.page}`}>
        <div className={styles.card}>
          <h1 className="section-title">Edit Account</h1>

          <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
            <button
              onClick={() => setActiveTab('profile')}
              style={{
                padding: '0.75rem 1rem',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                borderBottom: activeTab === 'profile' ? '2px solid #3b82f6' : 'none',
                color: activeTab === 'profile' ? '#3b82f6' : '#666',
                fontWeight: activeTab === 'profile' ? '600' : '400'
              }}
            >
              Personal Information
            </button>
            <button
              onClick={() => setActiveTab('password')}
              style={{
                padding: '0.75rem 1rem',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                borderBottom: activeTab === 'password' ? '2px solid #3b82f6' : 'none',
                color: activeTab === 'password' ? '#3b82f6' : '#666',
                fontWeight: activeTab === 'password' ? '600' : '400'
              }}
            >
              Change Password
            </button>
          </div>

          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
                <Button type="submit">Save Changes</Button>
                <Button variant="ghost" type="button" onClick={() => window.history.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="currentPassword">Current Password *</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                  placeholder="Enter your current password"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="newPassword">New Password *</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  placeholder="Enter new password"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm new password"
                />
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
                <Button type="submit">Change Password</Button>
                <Button variant="ghost" type="button" onClick={() => window.history.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>
    </PageTransition>
  );
}

export default EditAccountPage;
