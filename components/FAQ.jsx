'use client';
import { useState } from 'react';
import styles from './FAQ.module.css';

const FAQS = [
  {
    q: 'How much does a Goa trip cost?',
    a: 'Our packages start from ₹3,599 per person for budget-friendly trips and go up to ₹7,000 per person for premium romantic getaways. The cost depends on the duration, number of people, type of accommodation, and activities included. Contact us for a custom quote tailored to your group.',
  },
  {
    q: 'What is the best time to visit Goa?',
    a: 'October to February is the peak season — perfect weather, beach time, and festivals like Sunburn. March to May is warmer but less crowded with better deals. June to September is the monsoon season, ideal for waterfall visits and nature lovers who enjoy lush green Goa. We offer packages year-round.',
  },
  {
    q: 'Do you arrange airport transfers?',
    a: 'Yes! All our packages include or optionally include private AC cab transfers from Goa airport (GOI – Dabolim or Mopa) to your hotel and back. Just let us know your flight details and we handle the rest.',
  },
  {
    q: "What's included in the package price?",
    a: "Each package clearly lists what's included — typically accommodation, daily breakfast, local transfers or rental vehicles, and activity entries. Premium packages include spa treatments, candlelit dinners, or yacht cruises. Check each experience page for the full inclusions list.",
  },
  {
    q: 'Can I customise my itinerary?',
    a: 'Absolutely — every trip we plan is tailored to you. You can add or remove activities, upgrade accommodation, extend your stay, or merge packages. Use our contact form or WhatsApp to tell us your preferences and we will craft a custom plan within 24 hours.',
  },
  {
    q: 'Is Goa safe for solo travellers, couples, and families?',
    a: 'Goa is one of India\'s safest and most traveller-friendly destinations. We cater to solos, couples, families with kids, and large groups. Our local team is reachable 24/7 and we pre-vet all hotels, drivers, and activity operators for safety and quality.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Cancellations made 48 hours or more before the trip start date are fully refunded. Cancellations within 48 hours may incur a partial charge depending on pre-booked services. We also offer free rescheduling once per booking. Full terms are on our Terms of Service page.',
  },
  {
    q: 'Do you offer group and student discounts?',
    a: 'Yes — groups of 10 or more get special discounted rates. We have dedicated Student Group and College packages starting from ₹3,599/person that include accommodation, meals, transfers, and events. Get in touch for a group quotation.',
  },
  {
    q: 'How do I book a trip with DayOut?',
    a: "It's simple — fill out our enquiry form or WhatsApp us. Our team will respond within 2 hours with a customised itinerary and quote. Once you confirm, we secure your hotels and activities. No upfront full payment — just a small advance to lock in your dates.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-heading">
      <div className="section-tag" style={{ justifyContent: 'center' }}>Got Questions?</div>
      <h2 className="section-title" id="faq-heading">Frequently Asked<br />Questions</h2>
      <p className="section-sub" style={{ textAlign: 'center', margin: '0 auto 48px' }}>
        Everything you need to know before booking your Goa trip.
      </p>
      <div className={styles.list}>
        {FAQS.map((faq, i) => (
          <div key={i} className={`${styles.item} ${open === i ? styles.itemOpen : ''}`} role="listitem">
            <button
              className={styles.question}
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              aria-controls={`faq-answer-${i}`}
            >
              <span>{faq.q}</span>
              <span className={styles.icon} aria-hidden="true">{open === i ? '−' : '+'}</span>
            </button>
            <div
              id={`faq-answer-${i}`}
              className={styles.answer}
              style={{ maxHeight: open === i ? '400px' : '0' }}
            >
              <p>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
