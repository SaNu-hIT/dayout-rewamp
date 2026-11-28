import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isBot, parseLead, toCrmPayload } from '../lib/lead.js';

const form = (fields) => {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.append(k, v);
  return fd;
};

const VALID = { name: 'Asha Menon', phone: '+91 98765 43210' };

test('parseLead accepts the minimum popup submission', () => {
  const r = parseLead(form(VALID));
  assert.equal(r.ok, true);
  assert.deepEqual(r.lead, { name: 'Asha Menon', phone: '+91 98765 43210' });
});

test('parseLead accepts a full contact form submission and trims values', () => {
  const r = parseLead(form({
    name: '  Asha Menon ',
    phone: '9876543210',
    email: ' asha@example.com ',
    destination: 'north_india',
    package: 'couples-package',
    checkIn: '2027-01-10',
    checkOut: '2027-01-14',
    message: ' Anniversary trip ',
  }));
  assert.equal(r.ok, true);
  assert.deepEqual(r.lead, {
    name: 'Asha Menon',
    phone: '9876543210',
    email: 'asha@example.com',
    destination: 'north_india',
    package: 'couples-package',
    checkIn: '2027-01-10',
    checkOut: '2027-01-14',
    message: 'Anniversary trip',
  });
});

test('parseLead treats empty optional fields as absent', () => {
  const r = parseLead(form({ ...VALID, email: '', destination: '', checkIn: '', message: '   ' }));
  assert.equal(r.ok, true);
  assert.deepEqual(r.lead, VALID);
});

test('parseLead accepts the legacy Goa destinations still on the contact page', () => {
  for (const destination of ['north_goa', 'south_goa', 'central_goa', 'dudhsagar']) {
    assert.equal(parseLead(form({ ...VALID, destination })).ok, true, destination);
  }
});

test('parseLead rejects a missing or blank name', () => {
  assert.deepEqual(parseLead(form({ phone: VALID.phone })), { ok: false, message: 'Please enter your name.' });
  assert.equal(parseLead(form({ ...VALID, name: '   ' })).ok, false);
});

test('parseLead rejects an oversized name', () => {
  const r = parseLead(form({ ...VALID, name: 'a'.repeat(81) }));
  assert.equal(r.ok, false);
  assert.equal(r.message, 'Please keep your name under 80 characters.');
});

test('parseLead rejects bad phone numbers', () => {
  for (const phone of ['', '12345', 'call me', '+91 98765 43210 98765 43210', '1'.repeat(16)]) {
    const r = parseLead(form({ ...VALID, phone }));
    assert.equal(r.ok, false, phone);
    assert.equal(r.message, 'Please enter a valid phone number.');
  }
});

test('parseLead rejects an invalid email', () => {
  const r = parseLead(form({ ...VALID, email: 'not-an-email' }));
  assert.deepEqual(r, { ok: false, message: 'Please enter a valid email address.' });
});

test('parseLead rejects unknown destinations and malformed package slugs', () => {
  assert.deepEqual(parseLead(form({ ...VALID, destination: 'mars' })), { ok: false, message: 'Please choose a destination from the list.' });
  for (const pkg of ['<script>', 'a'.repeat(61)]) {
    assert.deepEqual(parseLead(form({ ...VALID, package: pkg })), { ok: false, message: 'Please choose a package from the list.' });
  }
});

test('parseLead rejects impossible or reversed dates', () => {
  for (const checkIn of ['2027-02-30', '10/01/2027']) {
    assert.deepEqual(parseLead(form({ ...VALID, checkIn })), { ok: false, message: 'Please choose a valid date.' }, checkIn);
  }
  const reversed = parseLead(form({ ...VALID, checkIn: '2027-01-14', checkOut: '2027-01-10' }));
  assert.deepEqual(reversed, { ok: false, message: 'Check-out must be on or after check-in.' });
});

test('parseLead rejects an oversized message', () => {
  assert.equal(parseLead(form({ ...VALID, message: 'x'.repeat(1000) })).ok, true);
  assert.deepEqual(parseLead(form({ ...VALID, message: 'x'.repeat(1001) })), { ok: false, message: 'Please keep your message under 1000 characters.' });
});

test('parseLead rejects file uploads in text fields', () => {
  const fd = form({ phone: VALID.phone });
  fd.append('name', new Blob(['x']), 'x.txt');
  assert.equal(parseLead(fd).ok, false);
});

test('parseLead rejects input that is not FormData', () => {
  assert.equal(parseLead(null).ok, false);
  assert.equal(parseLead({ name: 'Asha', phone: '9876543210' }).ok, false);
});

test('isBot flags a filled honeypot only', () => {
  assert.equal(isBot(form(VALID)), false);
  assert.equal(isBot(form({ ...VALID, website: '' })), false);
  assert.equal(isBot(form({ ...VALID, website: 'http://spam.example' })), true);
});

test('toCrmPayload keeps the CRM shape and only sends present fields', () => {
  assert.deepEqual(toCrmPayload(VALID), VALID);
  assert.deepEqual(
    toCrmPayload({ ...VALID, email: 'a@b.co', destination: 'goa', package: 'family-package', checkIn: '2027-01-10', checkOut: '2027-01-12', message: 'Hi' }),
    {
      ...VALID,
      email: 'a@b.co',
      customData: { destination: 'goa', package: 'family-package', checkin: '2027-01-10', checkout: '2027-01-12', message: 'Hi' },
    },
  );
});
