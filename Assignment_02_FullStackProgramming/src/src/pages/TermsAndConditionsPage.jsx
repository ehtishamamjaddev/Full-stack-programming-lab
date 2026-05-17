import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import usePageTitle from '../hooks/usePageTitle';
import pageStyles from './Page.module.css';
import styles from './SimplePage.module.css';

function TermsAndConditionsPage() {
  usePageTitle('Terms & Conditions');

  return (
    <PageTransition>
      <section className={`container ${pageStyles.page}`}>
        <div className={styles.card}>
          <h1 className="section-title">Terms & Conditions</h1>

          <div style={{ lineHeight: '1.8', color: '#333' }}>
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>1. Acceptance of Terms</h2>
              <p>
                By accessing and using this HOTSPRING e-commerce platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on HOTSPRING for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul>
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on HOTSPRING</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>3. Disclaimer</h2>
              <p>
                The materials on HOTSPRING are provided on an 'as is' basis. HOTSPRING makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>4. Limitations</h2>
              <p>
                In no event shall HOTSPRING or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on HOTSPRING.
              </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>5. Accuracy of Materials</h2>
              <p>
                The materials appearing on HOTSPRING could include technical, typographical, or photographic errors. HOTSPRING does not warrant that any of the materials on its website are accurate, complete, or current. HOTSPRING may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>6. Links</h2>
              <p>
                HOTSPRING has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by HOTSPRING of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>7. Modifications</h2>
              <p>
                HOTSPRING may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.3rem', marginbottom: '0.5rem' }}>8. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of Pakistan, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>9. Product Information</h2>
              <p>
                All product descriptions, pricing, and availability information on HOTSPRING are subject to change without notice. We reserve the right to discontinue any product at any time.
              </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>10. Payment & Shipping</h2>
              <p>
                All purchases are subject to our shipping and handling terms. We reserve the right to refuse or cancel any order. Shipping times are estimates and are not guaranteed. HOTSPRING is not liable for any delays in shipping.
              </p>
            </section>
          </div>

          <div style={{
            padding: '1rem',
            backgroundColor: '#fef3c7',
            border: '1px solid #fcd34d',
            borderRadius: '0.5rem',
            marginTop: '2rem',
            marginBottom: '1.5rem'
          }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#92400e' }}>
              Last updated: March 31, 2026. For questions regarding these terms, please contact our support team.
            </p>
          </div>

          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}

export default TermsAndConditionsPage;
