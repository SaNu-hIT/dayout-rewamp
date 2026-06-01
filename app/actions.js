'use server';

export async function submitLead(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const destination = formData.get('destination');
  const checkIn = formData.get('checkIn');
  const checkOut = formData.get('checkOut');
  const pkg = formData.get('package');
  const message = formData.get('message');

  const payload = {
    name,
    phone,
    email,
    notes: message || '',
    customData: {
      ...(destination && { destination }),
      ...(pkg && { package: pkg }),
      ...(checkIn && { checkIn }),
      ...(checkOut && { checkOut }),
    },
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
      const text = await res.text();
      console.error('CRM error:', res.status, text);
    }
  } catch (err) {
    console.error('CRM request failed:', err);
  }

  return { success: true, message: 'Thank you! Your trip request has been received. Our team will contact you shortly.' };
}
