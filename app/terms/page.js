import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../privacy/page.module.css';

export const metadata = {
  title: 'Terms of Service',
  description: 'Read the DayOut Holidays terms of service — booking conditions, cancellation policy, and your rights when travelling with us in Goa.',
  alternates: { canonical: 'https://dayoutholidays.com/terms' },
};

export default function TermsPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <section className={styles.content}>
        <h1>Terms of Service</h1>
        <p className={styles.updated}>Last updated: June 2026</p>

        <h2>1. Agreement</h2>
        <p>By using dayoutholidays.com or booking a service with DayOut Holidays, you agree to these Terms of Service. Please read them carefully before submitting an enquiry or making a payment.</p>

        <h2>2. Bookings & Payments</h2>
        <p>All bookings are subject to availability. A booking is confirmed only after we receive a confirmation from our team and an advance payment (where applicable). Prices are in Indian Rupees (INR) and are per person unless stated otherwise.</p>

        <h2>3. Cancellation Policy</h2>
        <p>All advance payments made at the time of booking are <strong>non-refundable</strong>. Regardless of when a cancellation is made, the advance amount will not be returned under any circumstances.</p>
        <p>Pre-booked third-party services (flights, certain hotels) may have their own cancellation policies. We will communicate these clearly at booking.</p>

        <h2>4. Rescheduling</h2>
        <p>You may reschedule your trip once at no charge, provided you notify us at least 48 hours in advance and subject to availability at the new dates.</p>

        <h2>5. Inclusions & Exclusions</h2>
        <p>Each package clearly states what is included. Items not listed (personal expenses, tips, insurance, visa fees, optional activities) are excluded unless explicitly stated.</p>

        <h2>6. Our Responsibilities</h2>
        <p>DayOut Holidays acts as a travel coordinator and is not liable for events beyond our reasonable control — including flight delays, natural disasters, government restrictions, or actions of third-party vendors. We maintain strong relationships with vetted partners to minimise disruption.</p>

        <h2>7. Your Responsibilities</h2>
        <ul>
          <li>Provide accurate personal and travel information</li>
          <li>Carry valid government-issued ID during the trip</li>
          <li>Behave responsibly and respect local laws and customs</li>
          <li>Inform us of any medical conditions or dietary requirements before booking</li>
        </ul>

        <h2>8. Travel Insurance</h2>
        <p>We strongly recommend purchasing travel insurance covering medical emergencies, trip cancellation, and personal belongings. DayOut Holidays does not provide insurance.</p>

        <h2>9. Liability Limitation</h2>
        <p>Our liability is limited to the total amount paid to DayOut Holidays for the specific trip. We are not responsible for indirect, consequential, or incidental damages.</p>

        <h2>10. Governing Law</h2>
        <p>These terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts of Kerala, India.</p>

        <h2>11. Changes to Terms</h2>
        <p>We reserve the right to update these terms at any time. Continued use of our services after changes constitutes acceptance of the updated terms.</p>

        <h2>12. Contact</h2>
        <p>Questions? Email us at <a href="mailto:dayoutholidays@gmail.com">dayoutholidays@gmail.com</a> or call <a href="tel:+918848965352">+91 8848965352</a>.</p>
      </section>
      <Footer />
    </main>
  );
}
