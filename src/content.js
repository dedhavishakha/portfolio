// Everything the hero says lives here, so copy changes never touch layout code.

export const profile = {
  firstName: 'Vishakha',
  lastName: 'Dedha',
  handle: 'vishakha',
  tld: '.dev',
  role: 'shopify developer',
  location: 'based in india',
  year: 2026,
  status: 'open to work',
}

export const hero = {
  tagline: ['shopify developer —', 'themes, apps & storefronts'],
  services: ['Shopify Themes', 'Shopify Apps', 'Storefronts'],
  accent: 'based in india',
  cta: { label: 'View my work', href: '#work' },
}

// Contact icons in the nav.
export const contact = {
  email: 'vishakhaaryavrat@gmail.com',
  linkedin: 'https://www.linkedin.com/in/vishakha-dedha-a14b09290/',
  // wa.me needs the number with the country code and no + or spaces
  whatsapp: 'https://wa.me/916396921240',
}

export const terminal = {
  title: '~/vishakha — zsh',
  history: [
    { cmd: 'whoami', out: 'shopify developer — custom themes, apps & storefronts' },
    // `wide` entries only show on desktop; the mobile terminal keeps to one entry
    { cmd: 'stack --list', out: 'liquid · shopify cli · remix · react · node · graphql', wide: true },
  ],
  typed: ['shopify theme dev', 'shopify app init', 'git push origin launch'],
}

export const ctas = [
  { label: './view-work', href: '#work', primary: true },
  { label: './contact', href: '#contact' },
]

// Work section. Projects without an `href` render without a link; projects
// without an `image` show their `screen` lines in a terminal-style frame.
export const work = {
  kicker: ['Apps, stores', '& software I’ve', 'built and shipped'],
  projects: [
    {
      id: 'noodle',
      name: 'Noodle',
      subtitle: 'ai negotiation',
      kind: 'shopify app',
      status: 'live',
      statusLabel: 'live on app store',
      href: 'https://apps.shopify.com/scopegen-negotiator',
      host: 'apps.shopify.com/scopegen-negotiator',
      image: '/work/noodle.webp',
      imageAlt: 'Noodle – AI Negotiation listing on the Shopify App Store',
      description:
        'Lets shoppers negotiate prices in a live chat widget. Merchants cap the discount, scope rules to products or collections, and every accepted offer becomes a draft order.',
      tags: ['ai negotiation', 'live chat widget', 'discount rules', 'draft orders'],
      linkLabel: './view-on-app-store',
      featured: true,
    },
    {
      id: 'scopegen',
      name: 'ScopeGen',
      kind: 'company website',
      status: 'live',
      statusLabel: 'live',
      href: 'https://scopegen.in',
      host: 'scopegen.in',
      image: '/work/scopegen.webp',
      imageAlt: 'ScopeGen homepage: “We build growth systems through creative”',
      description:
        'Website for ScopeGen, a consulting and performance-marketing company that builds growth systems through data, automation and creative.',
      tags: ['marketing site', 'services', 'portfolio'],
      linkLabel: './visit',
    },
    {
      id: 'appsy',
      name: 'Appsy',
      kind: 'shopify app builder',
      status: 'wip',
      statusLabel: 'in progress',
      host: 'appsy — building',
      description: 'A Shopify app builder that turns a store into iOS and Android apps. Currently in development.',
      tags: ['shopify', 'ios', 'android', 'app builder'],
      screen: [
        ['$', 'appsy build --ios --android'],
        ['→', 'shopify store → mobile apps'],
        ['→', 'status: in progress'],
      ],
      progress: true,
    },
    {
      id: 'denti',
      name: 'Denti',
      kind: 'saas · dental cms',
      status: 'live',
      statusLabel: 'live',
      href: 'https://denti.scopegen.in',
      host: 'denti.scopegen.in',
      image: '/work/denti.webp',
      imageAlt: 'Denti homepage: “Run your dental clinic in one place”',
      description:
        'A CMS for walk-in dental clinics: patients, consultations, prescriptions, treatments, bills, X-rays and WhatsApp reminders in one place, set up in two minutes.',
      tags: ['saas', 'clinic management', 'whatsapp reminders'],
      linkLabel: './visit',
    },
    {
      id: 'ranco',
      name: 'Ranco Dental',
      kind: 'custom dental cms',
      status: 'private',
      statusLabel: 'private · client',
      host: 'admin.rancodental.com',
      // patient names and phone numbers are blurred in this screenshot — keep it that way
      image: '/work/ranco.webp',
      imageAlt: 'Ranco Dental admin panel: patient list and clinic stats, with patient details blurred',
      description:
        'A dental CMS built for Ranco Dental clinic: patient records with search and date filters, treatment tracking, and a list of patients due for a follow-up call.',
      tags: ['cms', 'admin panel', 'healthcare'],
    },
    {
      id: 'niit',
      name: 'NIIT.ai',
      subtitle: 'event tracking',
      kind: 'analytics · gtm',
      status: 'live',
      statusLabel: 'live',
      href: 'https://niit.ai',
      host: 'niit.ai',
      image: '/work/niit.webp',
      imageAlt: 'niit.ai homepage: “Think AI-First. Build Next-Gen AI-Native Skills.”',
      overlay: 'gtm · events tracked',
      description:
        'Event tracking for niit.ai — NIIT’s tech and GenAI courses platform — set up in Google Tag Manager.',
      tags: ['google tag manager', 'event tracking', 'analytics'],
      linkLabel: './visit',
      featured: true,
      reverse: true,
    },
  ],
  // Shown as a row, like the projects above (numbering continues after them).
  themes: [
    {
      id: 'flaire',
      name: 'Flaire',
      kind: 'shopify theme',
      statusLabel: 'built in liquid',
      description: 'A Shopify theme built in Liquid.',
      screen: [
        ['$', 'shopify theme push --theme flaire'],
        ['→', 'custom shopify theme'],
        ['→', 'built with liquid'],
      ],
    },
  ],
  // Shown as a grid of store cards.
  stores: {
    items: [
      {
        id: 'austinbazaar',
        name: 'Austin Bazaar',
        kind: 'shopify store',
        href: 'https://austinbazaar.com',
        host: 'austinbazaar.com',
        image: '/work/austinbazaar.webp',
        imageAlt: 'Austin Bazaar storefront',
        description: 'Musical instruments and pro audio for the US.',
      },
      {
        id: 'seeaash',
        name: 'Seeaash',
        kind: 'shopify store',
        href: 'https://seeaash.in',
        host: 'seeaash.in',
        image: '/work/seeaash.webp',
        imageAlt: 'Seeaash storefront',
        description: 'Contemporary Indian wear.',
      },
      {
        id: 'ambrosia',
        name: 'Ambrosia India',
        kind: 'shopify store',
        href: 'https://ambrosiaindia.in',
        host: 'ambrosiaindia.in',
        image: '/work/ambrosia.webp',
        imageAlt: 'Ambrosia India storefront',
        description: 'Handcrafted clothing for women and men.',
      },
      {
        id: 'dalchinii',
        name: 'Dalchinii',
        kind: 'shopify store',
        href: 'https://www.dalchinii.com',
        host: 'dalchinii.com',
        image: '/work/dalchinii.webp',
        imageAlt: 'Dalchinii storefront',
        description: 'Clothing where Indian craft meets modern form, made with no waste.',
      },
      {
        id: 'barrox',
        name: 'Barrox Shoes',
        kind: 'shopify store',
        href: 'https://barroxshoes.com',
        host: 'barroxshoes.com',
        image: '/work/barrox.webp',
        imageAlt: 'Barrox Shoes storefront',
        description: 'Street-style sneakers in suede, PU leather and tech mesh.',
      },
    ],
  },
}

export const skills = [
  'Shopify Themes',
  'Liquid',
  'Shopify Apps',
  'Remix',
  'Polaris',
  'GraphQL',
  'Storefront API',
  'Checkout Extensions',
]
