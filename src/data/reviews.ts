/**
 * Client reviews — the single source of truth for the Google Business Profile
 * testimonials and their summary rating.
 *
 * Real reviews only, copied verbatim from site.googleProfileUrl (quotes stay in
 * the reviewer's own words, diacritics and all). Both the Reviews section and
 * the homepage hero's social-proof line read from here, so the rating shown in
 * two places can never drift.
 *
 * 5,0 from 3 reviews as of August 2026.
 */
import type { ImageMetadata } from 'astro';
import sturmPhoto from '../assets/images/reviews/sturm-mihaela.png';
import alinaPhoto from '../assets/images/reviews/alina-dragomir.jpg';
import victorPhoto from '../assets/images/reviews/victor-bucur.png';

export interface Review {
  author: string;
  photo: ImageMetadata;
  rating: number;
  quote: string;
  /** ISO date — shown as month + year, which does not go stale on a static build. */
  date: string;
  /** Review count if the author is a Google Local Guide. Never invented. */
  localGuide?: number;
}

export const reviews: Review[] = [
  {
    author: 'Sturm Mihaela',
    photo: sturmPhoto,
    rating: 5,
    date: '2026-08-30',
    quote:
      'Un contabil deosebit, profesionist și, mai ales, atent la nevoile clienților. Recomand cu toată încrederea acest contabil oricui își dorește servicii contabile de calitate, corectitudine și implicare. 😉',
  },
  {
    author: 'Alina Gabriela Dragomir',
    photo: alinaPhoto,
    rating: 5,
    date: '2026-08-30',
    localGuide: 14,
    quote:
      'Colaborez cu mare drag cu Viorica pentru serviciile de contabilitate și pot spune că am fost întotdeauna foarte mulțumită. Este o persoană serioasă, atentă la detalii, promptă și foarte bine organizată. Îmi oferă mereu explicații clare și răspunde cu răbdare la orice întrebare, ceea ce îmi dă multă încredere și liniște în ceea ce privește partea contabilă a activității mele. O recomand cu toată încrederea tuturor celor care își doresc un contabil profesionist, implicat și de încredere!',
  },
  {
    author: 'Victor Bucur',
    photo: victorPhoto,
    rating: 5,
    date: '2026-08-30',
    localGuide: 195,
    quote: 'Recomand cu incredere. Un profesionist desavarsit!',
  },
];

/** Derived summary — consumed by the hero and the Reviews section header. */
export const reviewCount = reviews.length;
export const reviewAverage =
  reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
