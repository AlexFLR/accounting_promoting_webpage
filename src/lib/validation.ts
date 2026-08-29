/**
 * Shared by the client-side form island and the server API route, so the
 * two can never disagree about what counts as valid.
 */

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  /** Honeypot — bots fill it in, humans never see it. */
  website?: string;
};

export type FieldErrors = Partial<Record<keyof ContactPayload, 'required' | 'invalidEmail'>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(data: Partial<ContactPayload>): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.name?.trim()) errors.name = 'required';
  if (!data.email?.trim()) errors.email = 'required';
  else if (!EMAIL.test(data.email.trim())) errors.email = 'invalidEmail';
  if (!data.message?.trim()) errors.message = 'required';

  return errors;
}

export function isSpam(data: Partial<ContactPayload>): boolean {
  return Boolean(data.website?.trim());
}
