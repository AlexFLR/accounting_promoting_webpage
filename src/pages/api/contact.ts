import type { APIRoute } from 'astro';
import { validateContact, isSpam, type ContactPayload } from '@/lib/validation';
import { site } from '@/data/site';

// This route must run on a server, so it opts out of prerendering.
// It needs an adapter in astro.config.mjs — see README ("Contact form").
// If you would rather stay 100% static, delete this file and point the
// form's `action` at Web3Forms/Formspree instead.
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();

  const payload: Partial<ContactPayload> = {
    name: String(form.get('name') ?? ''),
    email: String(form.get('email') ?? ''),
    phone: String(form.get('phone') ?? ''),
    company: String(form.get('company') ?? ''),
    message: String(form.get('message') ?? ''),
    website: String(form.get('website') ?? ''),
  };

  // Silently accept bot submissions so they do not retry.
  if (isSpam(payload)) {
    return Response.json({ ok: true });
  }

  const errors = validateContact(payload);
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 400 });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set — the enquiry was not delivered.');
    return Response.json({ ok: false }, { status: 500 });
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: import.meta.env.CONTACT_FROM_EMAIL,
      to: import.meta.env.CONTACT_TO_EMAIL ?? site.email,
      reply_to: payload.email,
      subject: `Website enquiry — ${payload.name}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone || '—'}`,
        `Company: ${payload.company || '—'}`,
        '',
        payload.message,
      ].join('\n'),
    }),
  });

  if (!response.ok) {
    console.error('Email delivery failed:', await response.text());
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
};
