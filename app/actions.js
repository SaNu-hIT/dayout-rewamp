'use server';

export async function submitLead(formData) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    destination: formData.get('destination'),
    dates: formData.get('dates'),
    budget: formData.get('budget'),
    message: formData.get('message'),
  };

  // In a real application, you would send this to a CRM, email service, or database.
  console.log('New Lead Received:', data);

  // Return success response
  return { success: true, message: 'Thank you! Your trip request has been received. Our team will contact you shortly.' };
}
