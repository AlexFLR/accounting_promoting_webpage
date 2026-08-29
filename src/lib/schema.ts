import { site } from '@/data/site';

/**
 * JSON-LD structured data. For a local accounting firm this is the single
 * highest-leverage SEO addition — it feeds the Google business panel.
 */
/**
 * Stable identifier for the firm. Every Service on the site points its
 * `provider` at this @id, which is what tells a crawler the seven service
 * pages are one business's offerings rather than seven unrelated entities.
 */
export const ORG_ID = `${site.url}/#organization`;

export function localBusinessSchema(lang: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    '@id': ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    priceRange: site.priceRange,
    foundingDate: site.founded,
    inLanguage: lang,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: site.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
  };
}

/**
 * A single service page. `provider` is a reference to ORG_ID rather than a
 * repeated copy of the business details — duplicating the organisation on
 * every page invites a crawler to read them as separate entities.
 */
export function serviceSchema(entry: {
  name: string;
  description: string;
  url: string;
  /** Free-text category, e.g. "Contabilitate financiară". */
  serviceType: string;
  /** Ploiești + Prahova for local services; Romania for the national ones. */
  areaServed: string[];
  lang: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${entry.url}#service`,
    name: entry.name,
    description: entry.description,
    url: entry.url,
    serviceType: entry.serviceType,
    inLanguage: entry.lang,
    provider: { '@id': ORG_ID },
    areaServed: entry.areaServed.map((n) => ({ '@type': 'Place', name: n })),
  };
}

export function articleSchema(entry: {
  title: string;
  description: string;
  publishedAt: Date;
  updatedAt?: Date;
  author: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: entry.title,
    description: entry.description,
    datePublished: entry.publishedAt.toISOString(),
    dateModified: (entry.updatedAt ?? entry.publishedAt).toISOString(),
    author: { '@type': 'Person', name: entry.author },
    publisher: { '@type': 'Organization', name: site.name },
    mainEntityOfPage: entry.url,
  };
}
