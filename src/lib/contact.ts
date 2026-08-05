// Contact form submission - single source of truth for both the contact form
// and the side drawer form.
//
// The Web3Forms access key is a public, client-side identifier by design: it is
// shipped in the browser bundle on every site that uses Web3Forms. It is
// hardcoded here (rather than read only from env) because this site is a static
// export - an unset build-time env var silently produced an empty key in
// production, which made every submission fail. An env var, when present, still
// wins so the key can be rotated without a code change.
export const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '86a0a05c-e052-4b63-b5c2-28da3d1837c8';

const ENDPOINT = 'https://api.web3forms.com/submit';

export type ContactPayload = {
  name: string;
  phone: string;
  subject: string;
  message: string;
};

/**
 * Sends a contact submission. Throws with a descriptive message on failure so
 * the caller can surface an error (and log the real reason to the console).
 */
export async function sendContact(payload: ContactPayload): Promise<void> {
  if (!WEB3FORMS_KEY) {
    throw new Error('Web3Forms access key is missing');
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      from_name: 'אתר כנפיים לעוף',
      ...payload,
    }),
  });

  let json: { success?: boolean; message?: string } = {};
  try {
    json = await res.json();
  } catch {
    // Non-JSON response - fall through to the status check below.
  }

  if (!res.ok || !json.success) {
    throw new Error(json.message || `HTTP ${res.status}`);
  }
}
