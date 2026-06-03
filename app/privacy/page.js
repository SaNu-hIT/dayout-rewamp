import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Read the DayOut Holidays privacy policy — how we collect, use, and protect your personal information when you book a Goa travel experience with us.',
  alternates: { canonical: 'https://dayoutholidays.com/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <section className={styles.content}>
        <h1>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: June 2026</p>

        <h2>1. Who We Are</h2>
        <p>DayOut Holidays ("DayOut", "we", "our", "us") operates the website <strong>dayoutholidays.com</strong> and provides travel planning services for Goa, India. We are based in Rajakumary, Kerala 685619. Contact: dayoutholidays@gmail.com | +91 8848965352.</p>

        <h2>2. Information We Collect</h2>
        <p>We collect information you voluntarily provide when you fill out an enquiry form, contact us, or subscribe to our newsletter. This includes:</p>
        <ul>
          <li>Full name</li>
          <li>Phone number</li>
          <li>Email address</li>
          <li>Travel preferences (destination, dates, package type)</li>
        </ul>
        <p>We may also collect non-personal technical data such as browser type, device type, and pages visited via analytics tools (e.g., Google Analytics).</p>

        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To respond to your travel enquiries and provide quotations</li>
          <li>To plan and coordinate your trip</li>
          <li>To send you relevant travel offers and updates (only if you have opted in)</li>
          <li>To improve our website and services</li>
        </ul>

        <h2>4. Data Sharing</h2>
        <p>We do not sell or rent your personal data. We may share your information with trusted partners (hotels, transport operators) strictly to fulfil your travel booking. All partners are contractually required to keep your data confidential.</p>

        <h2>5. Data Retention</h2>
        <p>We retain your data for as long as necessary to provide our services or as required by law. You may request deletion at any time by emailing us.</p>

        <h2>6. Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal data at any time. Contact us at <a href="mailto:dayoutholidays@gmail.com">dayoutholidays@gmail.com</a> to exercise these rights.</p>

        <h2>7. Cookies</h2>
        <p>Our website uses cookies for analytics and to remember your preferences. You can disable cookies in your browser settings at any time.</p>

        <h2>8. Security</h2>
        <p>We use industry-standard security measures to protect your data. All form submissions are transmitted over HTTPS.</p>

        <h2>9. Changes to This Policy</h2>
        <p>We may update this policy occasionally. We will notify you of significant changes by updating the date at the top of this page.</p>

        <h2>10. Contact</h2>
        <p>For any privacy-related questions, contact us at <a href="mailto:dayoutholidays@gmail.com">dayoutholidays@gmail.com</a> or call <a href="tel:+918848965352">+91 8848965352</a>.</p>
      </section>
      <Footer />
    </main>
  );
}
