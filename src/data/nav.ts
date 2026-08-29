import type { Lang } from '@i18n/utils';
import type { RouteKey } from '@i18n/utils';

/**
 * Primary navigation, declared per language rather than filtered from one
 * list. The two sets genuinely differ — Romanian has an "Despre" group with
 * a team page behind it, English does not — and an explicit pair of arrays
 * is easier to read, and harder to get subtly wrong, than a clever filter.
 *
 * Nothing here may link to a page that does not exist in that language.
 */
export interface NavItem {
  key: RouteKey;
  /** A group renders as a label with a submenu, not as its own destination. */
  children?: NavItem[];
}

export const navItems: Record<Lang, NavItem[]> = {
  ro: [
    { key: 'home' },
    { key: 'services' },
    {
      // Groups the two pages that are about the firm rather than the work.
      // The parent links to the team page: on touch there is no hover, so a
      // group whose label goes nowhere is a dead tap.
      key: 'about',
      children: [{ key: 'team' }, { key: 'blog' }],
    },
  ],
  en: [
    { key: 'home' },
    { key: 'services' },
    // Mirrors the Romanian structure exactly — both locales have a team page
    // and a blog, so both get the same group.
    {
      key: 'about',
      children: [{ key: 'team' }, { key: 'blog' }],
    },
  ],
};
