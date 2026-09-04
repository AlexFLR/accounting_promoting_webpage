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

  email: 'valvio.contexpert@gmail.com',
  phone: '+40 733 005 603',
  phoneHref: 'tel:+40733005603',

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

  /** Public Google Business Profile — the verifiable home of the reviews. */
  googleProfileUrl:
    'https://www.google.com/maps/place/Valvio+Contexpert+Business/@44.9334209,26.0194244,17z/data=!4m6!3m5!1s0x40b249a25e393b8d:0xd7d79f0f27272b08!8m2!3d44.9334209!4d26.0194244!16s%2Fg%2F11ybhtzjzz',

  // Used for LocalBusiness structured data — see src/lib/schema.ts
  founded: '2017',
  priceRange: '$$',

  /** Client counts shown as hero trust stats. Real figures — keep current. */
  clients: {
    total: 150, // firms + PFA served since founding
    active: 80, // currently active
  },

  /**
   * Statutory identification shown in the footer and legal pages, required by
   * Legea 365/2002 and Legea 31/1990. Fill every field before launch — while a
   * value is empty the UI renders a visible <Tbd/> marker rather than a
   * fabricated number, and `npm run tbd` lists what is still outstanding.
   */
  registration: {
    cui: '36904579' as string, // CUI / CIF
    tradeRegister: 'J2017000036294' as string, // Nr. Registrul Comerțului
    shareCapital: '' as string, // Capital social (nu se afișează în footer)
    ceccar: '12250' as string, // Nr. autorizație CECCAR (societate)
  },
} as const;
