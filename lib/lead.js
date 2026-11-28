import { z } from 'zod';

/** Destinations offered by the enquiry popup and the contact page (the latter still lists Goa areas). */
const DESTINATIONS = [
  'north_india', 'kerala', 'goa', 'south_india',
  'north_goa', 'south_goa', 'central_goa', 'dudhsagar',
  'other',
];

const FIELDS = ['name', 'phone', 'email', 'destination', 'package', 'checkIn', 'checkOut', 'message'];

/** Hidden field real visitors never see or fill. */
const HONEYPOT = 'website';

const DATE_ERROR = { error: 'Please choose a valid date.' };
const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, DATE_ERROR)
  .refine((s) => {
    const d = new Date(`${s}T00:00:00Z`);
    return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
  }, DATE_ERROR);

const phone = z
  .string({ error: 'Please enter a valid phone number.' })
  .regex(/^\+?[\d\s()-]{7,20}$/, { error: 'Please enter a valid phone number.' })
  .refine((s) => {
    const digits = s.replace(/\D/g, '').length;
    return digits >= 7 && digits <= 15;
  }, { error: 'Please enter a valid phone number.' });

const leadSchema = z
  .object({
    name: z.string({ error: 'Please enter your name.' }).max(80, { error: 'Please keep your name under 80 characters.' }),
    phone,
    email: z.email({ error: 'Please enter a valid email address.' }).max(254, { error: 'Please enter a valid email address.' }).optional(),
    destination: z.enum(DESTINATIONS, { error: 'Please choose a destination from the list.' }).optional(),
    package: z.string().regex(/^[a-z0-9-]{1,60}$/, { error: 'Please choose a package from the list.' }).optional(),
    checkIn: isoDate.optional(),
    checkOut: isoDate.optional(),
    message: z.string().max(1000, { error: 'Please keep your message under 1000 characters.' }).optional(),
  })
  .refine((d) => !d.checkIn || !d.checkOut || d.checkOut >= d.checkIn, {
    error: 'Check-out must be on or after check-in.',
    path: ['checkOut'],
  });

/** Trimmed text, or undefined for missing, blank or non-text (file) values. */
function text(value) {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed === '' ? undefined : trimmed;
}

/**
 * Validates an enquiry form submission.
 * @returns {{ ok: true, lead: object } | { ok: false, message: string }} message is safe to show the visitor.
 */
export function parseLead(formData) {
  if (!(formData instanceof FormData)) return { ok: false, message: 'Please fill in the form and try again.' };
  const raw = {};
  for (const key of FIELDS) {
    const value = text(formData.get(key));
    if (value !== undefined) raw[key] = value;
  }
  const result = leadSchema.safeParse(raw);
  // Every rule above sets its own visitor-facing message.
  if (!result.success) return { ok: false, message: result.error.issues[0].message };
  return { ok: true, lead: result.data };
}

/** True when the hidden honeypot field was filled, which only bots do. */
export function isBot(formData) {
  return text(formData.get(HONEYPOT)) !== undefined;
}

/** Maps a validated lead to the TravelCRM request body. */
export function toCrmPayload(lead) {
  const customData = {
    ...(lead.destination && { destination: lead.destination }),
    ...(lead.package && { package: lead.package }),
    ...(lead.checkIn && { checkin: lead.checkIn }),
    ...(lead.checkOut && { checkout: lead.checkOut }),
    ...(lead.message && { message: lead.message }),
  };
  return {
    name: lead.name,
    phone: lead.phone,
    ...(lead.email && { email: lead.email }),
    ...(Object.keys(customData).length > 0 && { customData }),
  };
}
