import type { Lang } from '@i18n/utils';

/**
 * The homepage's snap sections, in order.
 *
 * Single source of truth: the sections themselves and the dot navigation
 * both read this, so a dot can never point at a section that moved, was
 * renamed, or no longer exists.
 *
 * `theme` names a step on the ledger scale rather than an arbitrary colour.
 * Each section gets a distinct ground, but they are all drawn from the same
 * ramp — which is what stops a multi-coloured page reading as five unrelated
 * templates stacked on top of each other.
 *
 * Ids stay the same across languages. They are internal anchors, not URLs,
 * and keeping them shared means the observer and the dot nav need no
 * per-language branching.
 */
export type SectionTheme = 'paper' | 'band' | 'well' | 'ink';

export interface HomeSection {
  id: string;
  /** Marginal reference. The hero has none — it is the masthead, not entry 01. */
  index?: string;
  /** Short category label, for the rail and the dot's accessible name. */
  label: Record<Lang, string>;
  /** Visible heading. Absent for the hero, which supplies its own. */
  title?: Record<Lang, string>;
  theme: SectionTheme;
}

export const homeSections: HomeSection[] = [
  {
    id: 'inceput',
    label: { ro: 'Început', en: 'Start' },
    theme: 'paper',
  },
  {
    id: 'ce-facem',
    index: '01',
    label: { ro: 'Servicii', en: 'Services' },
    title: { ro: 'Ce facem', en: 'What we do' },
    theme: 'band',
  },
  {
    id: 'preluare',
    index: '02',
    label: { ro: 'Preluare', en: 'Handover' },
    title: {
      ro: 'Cum decurge schimbarea contabilului',
      en: 'Changing accountants, step by step',
    },
    theme: 'well',
  },
  {
    id: 'referinte',
    index: '03',
    label: { ro: 'Referințe', en: 'References' },
    title: { ro: 'Ce spun clienții', en: 'What clients say' },
    theme: 'ink',
  },
  {
    id: 'birou',
    index: '04',
    label: { ro: 'Birou', en: 'Office' },
    title: { ro: 'Unde ne găsești', en: 'Where to find us' },
    theme: 'paper',
  },
];

export function homeSection(id: string): HomeSection {
  const found = homeSections.find((s) => s.id === id);
  if (!found) throw new Error(`Unknown home section: ${id}`);
  return found;
}
