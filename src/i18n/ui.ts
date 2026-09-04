/**
 * Every user-facing string on the site. Nothing hard-coded in components.
 *
 * Adding a language = add a key here + a folder under src/pages/ and
 * src/content/blog/. TypeScript will then flag any string you forgot.
 */

export const languages = {
  ro: 'Română',
  en: 'English',
} as const;

// Romanian is the default: it carries the traffic, so it gets the clean URLs.
// English is the secondary set and lives under /en/.
export const defaultLang = 'ro' satisfies keyof typeof languages;

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.team': 'Our team',
    'nav.blog': 'Tax Tips',
    'nav.contact': 'Contact',
    'nav.cta': 'Get a quote',

    // No trailing period — AnimatedHeadline supplies (and animates) it.
    // The RO original is a pun on "a pune la punct" / "punct" (full stop);
    // "on point" is the closest English equivalent that still pays off the dot.
    // Kept to the same length as the RO line: the headline is forced onto a
    // single line, so every extra character shrinks it on narrow screens.
    'hero.title': 'Your numbers, on point',
    'hero.subtitle':
      'Bookkeeping, payroll and tax filing for small companies and sole traders in Ploiești and Prahova county, Romania.',
    'hero.scrollHint': 'Scroll down',
    'hero.statsClientsTotal': 'Clients since 2017',
    'hero.statsClientsActive': 'Active clients',
    'hero.sectorsTitle': 'Areas of specialisation',
    'hero.sectorMedical': 'Medical services',
    'hero.sectorVet': 'Veterinary services',
    'hero.sectorLiberal': 'Liberal professions',
    'hero.sectorNgo': 'NGOs & associations',

    'contact.heading': 'Request a quote',
    'contact.name': 'Full name',
    'contact.email': 'Email address',
    'contact.phone': 'Phone (optional)',
    'contact.company': 'Company (optional)',
    'contact.message': 'How can we help?',
    'contact.submit': 'Send request',
    'contact.sending': 'Sending…',
    'contact.success': 'Thanks — we will reply within one working day.',
    'contact.error': 'Something went wrong. Please email us directly.',
    'contact.required': 'This field is required.',
    'contact.invalidEmail': 'Please enter a valid email address.',

    'blog.title': 'Tax Tips & Insights',
    'blog.description': 'Practical guidance for small business owners.',
    'blog.readMore': 'Read article',
    'blog.published': 'Published',
    'blog.readingTime': 'min read',
    'blog.empty': 'No articles yet — check back soon.',

    'footer.rights': 'All rights reserved.',
    'footer.hours': 'Opening hours',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy policy',
    'footer.cookies': 'Cookie policy',
    'footer.terms': 'Terms & conditions',

    'a11y.skipToContent': 'Skip to main content',
    'a11y.languagePicker': 'Choose language',
    'a11y.switchTo': 'Switch to',

    'a11y.sectionNav': 'Page sections',

    'home.allServices': 'All services, with detail and fees →',
    'home.enOnlyNote':
      'Payroll, annual accounts, tax returns and statutory audit reports are also available — those pages are written in Romanian.',
    'home.reviewsIntro':
      'Real reviews, verifiable any time on our Google profile.',
    'home.reviewsLink': 'See the reviews on Google',
    'home.handoverNote': 'The whole process takes',
    'home.replyTime': 'We reply within one working day.',
    'home.onGoogle': 'on Google',
    'home.reviewsWord': 'reviews',
    'home.ceccar': 'CECCAR member',
    'home.area': 'Ploiești and Prahova county',
    'office.address': 'Address',
    'office.city': 'City',
    'office.hours': 'Hours',
    'office.phone': 'Phone',
    'office.email': 'Email',
    'office.parking': 'Parking and access',
    'office.hoursValue': 'Monday–Friday',
    'map.load': 'Load the map',
    'map.open': 'Open in Google Maps',
    'map.privacy':
      'The map loads from Google. Pressing the button sends your IP address to Google and may set cookies.',

    'services.related': 'Related services',
    'services.backToHub': '← All services',
    'services.hubIntro': 'Choose the service that matches your situation.',

    'legal.updated': 'Last updated',
    'legal.draftNotice':
      'This is a working draft, not legal advice. Have it reviewed by a Romanian lawyer and fill in every highlighted to-be-completed item before publishing.',
  },
  ro: {
    'nav.home': 'Acasă',
    'nav.services': 'Servicii',
    'nav.about': 'Despre',
    'nav.team': 'Echipa',
    'nav.blog': 'Sfaturi fiscale',
    'nav.contact': 'Contact',
    'nav.cta': 'Cere o ofertă',

    'hero.title': 'Punem cifrele la punct',
    'hero.subtitle':
      'Evidență contabilă, salarizare și declarații fiscale pentru firme mici și PFA din Ploiești și județul Prahova.',
    'hero.scrollHint': 'Derulează în jos',
    'hero.statsClientsTotal': 'Clienți din 2017',
    'hero.statsClientsActive': 'Clienți activi',
    'hero.sectorsTitle': 'Domenii de specializare',
    'hero.sectorMedical': 'Servicii medicale',
    'hero.sectorVet': 'Servicii veterinare',
    'hero.sectorLiberal': 'Profesii liberale',
    'hero.sectorNgo': 'ONG-uri și asociații',

    'contact.heading': 'Cere o ofertă',
    'contact.name': 'Nume complet',
    'contact.email': 'Adresă de email',
    'contact.phone': 'Telefon (opțional)',
    'contact.company': 'Firmă (opțional)',
    'contact.message': 'Cu ce te putem ajuta?',
    'contact.submit': 'Trimite cererea',
    'contact.sending': 'Se trimite…',
    'contact.success': 'Mulțumim — răspundem în maximum o zi lucrătoare.',
    'contact.error': 'A apărut o eroare. Te rugăm să ne scrii direct pe email.',
    'contact.required': 'Acest câmp este obligatoriu.',
    'contact.invalidEmail': 'Introdu o adresă de email validă.',

    'blog.title': 'Sfaturi fiscale și noutăți',
    'blog.description': 'Ghiduri practice pentru antreprenori.',
    'blog.readMore': 'Citește articolul',
    'blog.published': 'Publicat',
    'blog.readingTime': 'min de citit',
    'blog.empty': 'Încă nu există articole — revino în curând.',

    'footer.rights': 'Toate drepturile rezervate.',
    'footer.hours': 'Program',
    'footer.legal': 'Legal',
    'footer.privacy': 'Politica de confidențialitate',
    'footer.cookies': 'Politica de cookie-uri',
    'footer.terms': 'Termeni și condiții',

    'a11y.skipToContent': 'Sari la conținutul principal',
    'a11y.languagePicker': 'Alege limba',
    'a11y.switchTo': 'Comută la',

    'a11y.sectionNav': 'Secțiunile paginii',

    'home.allServices': 'Toate serviciile, cu detalii și tarife →',
    'home.enOnlyNote': '',
    'home.reviewsIntro':
      'Recenzii reale, verificabile oricând pe profilul nostru de Google.',
    'home.reviewsLink': 'Vezi recenziile pe Google',
    'home.handoverNote': 'Tot procesul durează',
    'home.replyTime': 'Răspundem în maximum o zi lucrătoare.',
    'home.onGoogle': 'pe Google',
    'home.reviewsWord': 'recenzii',
    'home.ceccar': 'Membru CECCAR',
    'home.area': 'Ploiești și județul Prahova',
    'office.address': 'Adresă',
    'office.city': 'Localitate',
    'office.hours': 'Program',
    'office.phone': 'Telefon',
    'office.email': 'Email',
    'office.parking': 'Parcare și acces',
    'office.hoursValue': 'Luni–vineri',
    'map.load': 'Încarcă harta',
    'map.open': 'Deschide în Google Maps',
    'map.privacy':
      'Harta se încarcă de la Google. Apăsând butonul, adresa ta IP ajunge la Google și pot fi setate cookie-uri.',

    'services.related': 'Servicii conexe',
    'services.backToHub': '← Toate serviciile',
    'services.hubIntro': 'Alege serviciul care se potrivește situației tale.',

    'legal.updated': 'Ultima actualizare',
    'legal.draftNotice':
      'Acesta este un document în lucru, nu consultanță juridică. Solicită verificarea de către un jurist și completează fiecare element marcat ca fiind de completat înainte de publicare.',
  },
} as const;

/**
 * Translated URL slugs. Romanian visitors get /ro/servicii, not /ro/services —
 * localised URLs rank meaningfully better in local search.
 */
export const routes = {
  ro: { home: '', services: 'servicii', about: 'echipa', team: 'echipa', blog: 'blog', contact: 'contact', privacy: 'confidentialitate', cookies: 'cookies', terms: 'termeni' },
  en: { home: '', services: 'services', about: 'team', team: 'team', blog: 'blog', contact: 'contact', privacy: 'privacy', cookies: 'cookies', terms: 'terms' },
} as const;
