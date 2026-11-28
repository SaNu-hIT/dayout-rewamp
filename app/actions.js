'use server';

import { isBot, parseLead, toCrmPayload } from '@/lib/lead';

const LEAD_RECEIVED = 'Thank you! Your trip request has been received. Our team will contact you shortly.';
const CRM_TIMEOUT_MS = 10_000;

export async function submitLead(formData) {
  // Answer bots as if it worked so they get no signal to adapt; nothing reaches the CRM.
  if (formData instanceof FormData && isBot(formData)) return { success: true, message: LEAD_RECEIVED };

  const parsed = parseLead(formData);
  if (!parsed.ok) return { success: false, message: parsed.message };

  try {
    const res = await fetch(process.env.TRAVEL_CRM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.TRAVEL_CRM_API_KEY,
      },
      body: JSON.stringify(toCrmPayload(parsed.lead)),
      signal: AbortSignal.timeout(CRM_TIMEOUT_MS),
    });

    if (!res.ok) {
      // Status only: the CRM response body can echo the visitor's details.
      console.error('CRM error', { status: res.status });
      return { success: false, message: 'Something went wrong. Please try again or call us directly.' };
    }
  } catch (err) {
    console.error('CRM request failed', { name: err?.name, message: err?.message });
    return { success: false, message: 'Unable to reach our system. Please try again later.' };
  }

  return { success: true, message: LEAD_RECEIVED };
}

export async function subscribeNewsletter(email) {
  if (!email || !email.includes('@')) {
    return { success: false, message: 'Please provide a valid email address.' };
  }

  const payload = {
    name: 'Newsletter Subscriber',
    phone: 'N/A',
    email,
    customData: { source: 'newsletter' },
  };

  try {
    const res = await fetch(process.env.TRAVEL_CRM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.TRAVEL_CRM_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error('Newsletter CRM error:', res.status, await res.text());
      return { success: false, message: 'Subscription failed. Please try again.' };
    }
  } catch (err) {
    console.error('Newsletter CRM request failed:', err);
    return { success: false, message: 'Unable to subscribe. Please try again later.' };
  }

  return { success: true };
}
