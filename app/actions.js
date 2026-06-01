'use server';

export async function submitLead(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const destination = formData.get('destination');
  const checkIn = formData.get('checkIn');
  const checkOut = formData.get('checkOut');
  const pkg = formData.get('package');

  const customData = {
    ...(destination && { destination }),
    ...(pkg && { package: pkg }),
    ...(checkIn && { checkin: checkIn }),
    ...(checkOut && { checkout: checkOut }),
  };

  const payload = {
    name,
    phone,
    ...(email && { email }),
    ...(Object.keys(customData).length > 0 && { customData }),
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
      return { success: false, message: 'Something went wrong. Please try again or call us directly.' };
    }
  } catch (err) {
    console.error('CRM request failed:', err);
    return { success: false, message: 'Unable to reach our system. Please try again later.' };
  }

  return { success: true, message: 'Thank you! Your trip request has been received. Our team will contact you shortly.' };
}
