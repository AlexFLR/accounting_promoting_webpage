import type { Lang } from '@i18n/utils';

/**
 * The seven services, and the single source of truth for how they relate.
 *
 * Registry rather than a content collection because these pages have genuinely
 * different shapes — the SRL page splits on VAT status, the e-Factura page is
 * a guide with the offer at the bottom — so each gets its own .astro file.
 * What lives here is everything that must stay consistent BETWEEN them:
 * slugs, titles, meta descriptions, grouping, cross-links, and which
 * languages a page actually exists in.
 *
 * `locales` is load-bearing. A page listed as ['ro'] emits no English
 * hreflang and shows no language switch, because pointing an `en` alternate
 * at a Romanian page is worse than having no alternate at all.
 */

export type ServiceGroup = 'segment' | 'recurring' | 'deliverable' | 'compliance';

export interface ServiceCopy {
  /** Slug within the services hub. */
  slug: string;
  /** <title>. City included only where the SEO plan calls for it. */
  title: string;
  /** Own meta description — never shared, never derived from the H1. */
  description: string;
  /** Descriptive H1, not a bare keyword. */
  h1: string;
  /**
   * Compact label for nav and teaser lists. The H1 is written for search
   * and runs to 60 characters — seven of those in a list is a wall of text.
   */
  short: string;
  /** One line on the hub. Must not restate the page's own opening. */
  teaser: string;
}

export interface Service {
  id: string;
  group: ServiceGroup;
  /** Languages this page exists in. Drives hreflang and the language switch. */
  locales: Lang[];
  /** Order within its group on the hub. */
  order: number;
  /** 1–2 most related services, by id. Sideways links only, never the hub. */
  related: string[];
  ro: ServiceCopy;
  en?: ServiceCopy;
}

/**
 * Ploiești appears in the title tag and H1 of exactly three pages — SRL, PFA
 * and salarizare, the three with real local search volume. On the other four
 * the city appears in body copy only. Three pages competing for
 * "<service> Ploiești" is a set; seven is keyword cannibalisation.
 */
export const services: Service[] = [
  {
    id: 'srl',
    group: 'segment',
    locales: ['ro', 'en'],
    order: 1,
    related: ['declaratii', 'efactura'],
    ro: {
      slug: 'contabilitate-srl',
      title: 'Contabilitate SRL Ploiești',
      description:
        'Evidență contabilă lunară pentru SRL-uri din Ploiești și Prahova, pentru firme plătitoare și neplătitoare de TVA. Preluăm evidența de la contabilul anterior.',
      h1: 'Contabilitate pentru SRL în Ploiești',
      short: 'SRL',
      teaser: 'Evidență lunară pentru societăți cu răspundere limitată, plătitoare și neplătitoare de TVA.',
    },
    en: {
      slug: 'accounting-srl',
      title: 'Accounting for Romanian SRL Companies',
      description:
        'Monthly bookkeeping and tax filing for Romanian limited companies (SRL), including foreign-owned entities in Prahova. Reporting in English.',
      h1: 'Accounting for a Romanian SRL',
      short: 'SRL accounting',
      teaser: 'Monthly bookkeeping and filing for Romanian limited companies, including foreign-owned ones.',
    },
  },
  {
    id: 'pfa',
    group: 'segment',
    locales: ['ro'],
    order: 2,
    related: ['declaratii', 'efactura'],
    ro: {
      slug: 'contabilitate-pfa',
      title: 'Contabilitate PFA Ploiești',
      description:
        'Contabilitate în partidă simplă pentru PFA, II și profesii liberale din Ploiești: registru de încasări și plăți, Declarația Unică, contribuții CAS și CASS.',
      h1: 'Contabilitate pentru PFA și profesii liberale în Ploiești',
      short: 'PFA și profesii liberale',
      teaser: 'Partidă simplă, Declarația Unică și contribuții pentru PFA, II și profesii liberale.',
    },
  },
  {
    id: 'salarizare',
    group: 'recurring',
    locales: ['ro'],
    order: 1,
    related: ['srl', 'declaratii'],
    ro: {
      slug: 'salarizare-resurse-umane',
      title: 'Salarizare și resurse umane Ploiești',
      description:
        'State de plată, REVISAL, contracte de muncă și D112 pentru firme din Ploiești. Lucrăm de la un salariat în sus.',
      h1: 'Salarizare și administrare de personal în Ploiești',
      short: 'Salarizare și personal',
      teaser: 'State de plată, REVISAL, contracte și D112 — de la un salariat în sus.',
    },
  },
  {
    id: 'declaratii',
    group: 'recurring',
    locales: ['ro'],
    order: 2,
    related: ['srl', 'efactura'],
    ro: {
      slug: 'declaratii-fiscale-tva',
      title: 'Declarații fiscale și TVA — D112, D300, D394',
      description:
        'Întocmirea și depunerea declarațiilor D112, D300 și D394 prin SPV, cu un calendar al termenelor și verificare înainte de depunere.',
      h1: 'Declarații fiscale: D112, D300, D394 și calendarul termenelor',
      short: 'Declarații fiscale',
      teaser: 'D112, D300, D394 și calendarul lunar al termenelor de depunere.',
    },
  },
  {
    id: 'bilant',
    group: 'deliverable',
    locales: ['ro'],
    order: 1,
    related: ['srl', 'raport-cenzor'],
    ro: {
      slug: 'bilant-situatii-financiare',
      title: 'Bilanț și situații financiare anuale',
      description:
        'Întocmirea și depunerea situațiilor financiare anuale: bilanț, cont de profit și pierdere, note explicative și raportul administratorului.',
      h1: 'Bilanț și situații financiare anuale',
      short: 'Bilanț anual',
      teaser: 'Bilanț, cont de profit și pierdere, note explicative și depunerea la termen.',
    },
  },
  {
    id: 'raport-cenzor',
    group: 'deliverable',
    locales: ['ro'],
    order: 2,
    related: ['bilant'],
    ro: {
      slug: 'raport-cenzor',
      title: 'Raport de cenzor pentru asociații, cooperative și societăți',
      description:
        'Servicii de cenzor și raport de cenzor pentru asociații, fundații, cooperative și societăți care depășesc pragurile legale. Lucrăm la nivel național.',
      h1: 'Raport de cenzor pentru asociații, cooperative și societăți',
      short: 'Raport de cenzor',
      teaser: 'Mandat de cenzor și raport anual pentru entități care au obligația legală.',
    },
  },
  {
    id: 'efactura',
    group: 'compliance',
    locales: ['ro', 'en'],
    order: 1,
    related: ['srl', 'declaratii'],
    ro: {
      slug: 'e-factura-spv',
      title: 'e-Factura și SPV: ghid complet și servicii de conformare',
      description:
        'Ce este RO e-Factura, cine are obligația, ce termene se aplică și ce sancțiuni există. Ghid practic, plus serviciul de înrolare în SPV și transmitere.',
      h1: 'e-Factura și SPV: ce trebuie să faci și până când',
      short: 'e-Factura și SPV',
      teaser: 'Ghid despre obligația RO e-Factura, plus înrolarea în SPV și transmiterea facturilor.',
    },
    en: {
      slug: 'e-invoicing-spv',
      title: 'RO e-Factura and SPV: A Guide for Foreign-Owned Companies',
      description:
        'What RO e-Factura requires, who it applies to, the deadlines and the penalties — explained for foreign-owned companies operating in Romania.',
      h1: 'RO e-Factura and SPV explained',
      short: 'e-Factura and SPV',
      teaser: 'What the Romanian e-invoicing mandate requires of a foreign-owned company.',
    },
  },
];

/**
 * Hub grouping. These four headings are the reason the hub is worth having:
 * seven links in one list is a menu, but seven links sorted into what they
 * actually ARE helps a visitor find the one that matches their situation.
 */
export const groupLabels: Record<ServiceGroup, Record<Lang, string>> = {
  segment: { ro: 'După forma de organizare', en: 'By company type' },
  recurring: { ro: 'Servicii lunare', en: 'Monthly services' },
  deliverable: { ro: 'Lucrări anuale', en: 'Annual reports' },
  compliance: { ro: 'Conformare', en: 'Compliance' },
};

export const groupOrder: ServiceGroup[] = ['segment', 'recurring', 'deliverable', 'compliance'];

/** Services available in a given language, grouped and ordered for the hub. */
export function servicesByGroup(lang: Lang) {
  return groupOrder
    .map((group) => ({
      group,
      label: groupLabels[group][lang],
      items: services
        .filter((s) => s.group === group && s.locales.includes(lang))
        .sort((a, b) => a.order - b.order),
    }))
    .filter((g) => g.items.length > 0);
}

export function getService(id: string): Service {
  const found = services.find((s) => s.id === id);
  if (!found) throw new Error(`Unknown service id: ${id}`);
  return found;
}

/** Copy for a language, falling back to nothing — callers must check locales. */
export function copy(service: Service, lang: Lang): ServiceCopy | undefined {
  return lang === 'ro' ? service.ro : service.en;
}
