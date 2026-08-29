/**
 * Single source of truth for business details.
 * Change the phone number here, not in six components.
 */
export const site = {
  /** Full name — page titles, footer, structured data. */
  name: 'Valvio Contexpert Business',
  /** Short form for tight spaces (the floating header). */
  shortName: 'Valvio Contexpert',
  legalName: 'Valvio Contexpert Business SRL',
  tagline: 'Small-business accounting, done properly.',

  // TODO: confirm the real domain before launch — this is a placeholder and
  // it also feeds canonical URLs, hreflang, sitemap and Open Graph tags.
  url: 'https://www.valviocontexpert.ro',

  email: 'office@valviocontexpert.ro',
  phone: '+40 000 000 000',
  phoneHref: 'tel:+40000000000',

  address: {
    street: 'Strada Alexandru Donici 5',
    city: 'Ploiești',
    region: 'Prahova',
    postalCode: '100025',
    country: 'RO',
  },

  hours: [{ days: 'Mo-Fr', opens: '09:00', closes: '17:00' }],

  social: {
    linkedin: '',
    facebook: '',
  },

  // Used for LocalBusiness structured data — see src/lib/schema.ts
  founded: '2015',
  priceRange: '$$',
} as const;
