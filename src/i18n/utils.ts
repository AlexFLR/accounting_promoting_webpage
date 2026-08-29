import { ui, defaultLang, routes } from './ui';
// services.ts imports only `type Lang` from here, which TypeScript erases —
// so this is not a runtime circular import.
import { services } from '@/data/services';

export type Lang = keyof typeof ui;
export type UIKey = keyof (typeof ui)[typeof defaultLang];
export type RouteKey = keyof (typeof routes)[typeof defaultLang];

/** Read the active language out of the URL: /ro/servicii -> "ro". */
export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  if (segment in ui) return segment as Lang;
  return defaultLang;
}

/** t('nav.home') inside any component. Falls back to the default language. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** Build a localised href: pathFor('services', 'ro') -> "/ro/servicii". */
export function pathFor(route: RouteKey, lang: Lang): string {
  const slug = routes[lang][route];
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  return slug ? `${prefix}/${slug}` : `${prefix}/`;
}

/** The same page in another language — powers the language switcher. */
export function switchLangPath(url: URL, from: Lang, to: Lang): string {
  if (from === to) return url.pathname;

  let path = url.pathname;
  if (from !== defaultLang) path = path.replace(`/${from}`, '') || '/';

  // Translate the first path segment if it is a known route.
  const [, segment, ...rest] = path.split('/');
  const routeKey = (Object.keys(routes[from]) as RouteKey[]).find(
    (k) => routes[from][k] === segment
  );

  const translated = routeKey ? routes[to][routeKey] : segment;

  /**
   * Service child slugs are translated too, not just the hub segment.
   * Without this, /servicii/contabilitate-srl would map to
   * /en/services/contabilitate-srl — a URL that does not exist, emitted as a
   * canonical hreflang alternate. The registry holds both slugs, so look the
   * pair up rather than passing the Romanian slug through untouched.
   */
  let tailParts = rest;
  if (routeKey === 'services' && rest.length > 0) {
    const match = services.find((s) => {
      const fromCopy = from === 'ro' ? s.ro : s.en;
      return fromCopy?.slug === rest[0];
    });
    const toCopy = match && (to === 'ro' ? match.ro : match.en);
    if (toCopy) tailParts = [toCopy.slug, ...rest.slice(1)];
  }

  const tail = tailParts.length ? `/${tailParts.join('/')}` : '';
  const prefix = to === defaultLang ? '' : `/${to}`;

  return translated ? `${prefix}/${translated}${tail}` : `${prefix}/`;
}
