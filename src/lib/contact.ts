// Contact form submission - single source of truth for both the contact form
// and the side drawer form.
//
// Uses Netlify Forms rather than a third-party form API: the site is hosted on
// Netlify, so submissions are same-origin (no CORS, no domain allowlisting) and
// every submission is also stored in the Netlify dashboard, so a mail delivery
// problem can no longer silently lose a lead.
//
// The form is declared statically in public/__forms.html - Netlify detects forms
// by parsing HTML at deploy time, which does not reliably pick up React-rendered
// markup on a static export. Any field added below must also exist there.

const ENDPOINT = '/__forms.html';
const FORM_NAME = 'contact';

export type ContactPayload = {
  name: string;
  phone: string;
  subject: string;
  message: string;
};

/**
 * Sends a contact submission. Throws on failure so the caller can surface an
 * error and log the real reason.
 */
export async function sendContact(payload: ContactPayload): Promise<void> {
  const body = new URLSearchParams({
    'form-name': FORM_NAME,
    ...payload,
  }).toString();

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
}
