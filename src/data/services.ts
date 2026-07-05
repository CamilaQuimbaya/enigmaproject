// Datos del landing — Enigma Capital Solutions (una marca de Enigma Enterprises LLC).

export type Card = { name: string; desc: string; img: string };
export type Exclusive = { n: number; name: string; desc: string };

// "Funding Solutions We Help Review" — categorías comerciales / de capital privado.
export const fundingSolutions: Card[] = [
  {
    name: 'Commercial Real Estate Financing',
    desc: 'Funding options for income-producing properties, acquisitions, refinances, bridge loans, and qualified real estate transactions.',
    img: '/img/1564013799919-ab600027ffc6.jpg',
  },
  {
    name: 'Business Funding & Working Capital',
    desc: 'Capital solutions for qualified businesses seeking expansion capital, operational funding, acquisition support, or growth financing.',
    img: '/img/1600880292203-757bb62b4baf.jpg',
  },
  {
    name: 'Private Capital Solutions',
    desc: 'Structured funding opportunities through private capital groups and strategic lending relationships for qualified transactions.',
    img: '/img/1449824913935-59a10b8d2000.jpg',
  },
  {
    name: 'Bridge & Asset-Based Funding',
    desc: 'Short-term and asset-backed funding options for borrowers with acceptable collateral, business assets, real estate, or project-based needs.',
    img: '/img/1497366216548-37526070297c.jpg',
  },
  {
    name: 'International Project Funding',
    desc: 'Funding review for qualified international projects, business expansion, real estate developments, and asset-backed opportunities.',
    img: '/img/1480714378408-67cf0d13bc1b.jpg',
  },
  {
    name: 'Broker & Referral Partner Support',
    desc: 'We work with brokers and referral partners who have qualified clients seeking commercial or private capital solutions.',
    img: '/img/1521791136064-7986c2920216.jpg',
  },
];

// Servicios complementarios (formación de entidad, impuestos, crédito, patrimonio).
export const exclusive: Exclusive[] = [
  { n: 1, name: 'Entity Formation', desc: 'LLC and corporation formation, structured correctly from day one.' },
  { n: 2, name: 'Tax Preparation', desc: 'Strategic filing and planning for businesses and their principals.' },
  { n: 3, name: 'Business Credit', desc: 'Establish a fundable corporate credit profile that scales with your company.' },
  { n: 4, name: 'Estate Planning', desc: 'Protect and transfer wealth across generations with proper structure.' },
];
