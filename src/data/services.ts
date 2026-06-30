// Datos del landing — extraídos del diseño "Enigma Landing" (Claude Design).

export type Card = { name: string; desc: string; img: string };
export type Spec = { k: string; v: string };
export type Product = { name: string; desc: string; specs: Spec[] };
export type Exclusive = { n: number; name: string; desc: string };

export const financing: Card[] = [
  { name: 'Personal Financing', desc: 'Flexible personal capital for life’s pivotal moments, backed by our network of licensed lenders.', img: '/img/1454165804606-c3d57bc86b40.jpg' },
  { name: 'Business Financing', desc: 'Working capital and growth funding structured around your company’s real cash flow.', img: '/img/1600880292203-757bb62b4baf.jpg' },
  { name: 'Business Credit', desc: 'Build and leverage corporate credit profiles that scale alongside your enterprise.', img: '/img/1542744173-8e7e53415bb0.jpg' },
  { name: 'Hard Money Loans', desc: 'Fast, asset-based bridge capital for time-sensitive opportunities.', img: '/img/1497366216548-37526070297c.jpg' },
  { name: 'Real Estate Financing', desc: 'Acquisition and refinance solutions across residential and commercial property.', img: '/img/1564013799919-ab600027ffc6.jpg' },
];

export const realEstate: Card[] = [
  { name: 'Fix and Flip', desc: 'Short-term capital to acquire, renovate, and resell — funded for speed.', img: '/img/1560518883-ce09059eeffa.jpg' },
  { name: 'Cash-Out Refinance', desc: 'Unlock trapped equity and redeploy it into your next opportunity.', img: '/img/1568605114967-8130f3a36994.jpg' },
  { name: 'Buy and Hold', desc: 'Long-term financing built for portfolio investors and steady yield.', img: '/img/1554469384-e58fac16e23a.jpg' },
  { name: 'Commercial Real Estate Loan', desc: 'Institutional-grade capital for multifamily, retail, and mixed-use assets.', img: '/img/1486406146926-c627a92ad1ab.jpg' },
];

export const products: Product[] = [
  { name: 'Merchant Cash Advance', desc: 'Revenue-based funding with rapid approval.', specs: [{ k: 'Amount', v: '$10K – $5M' }, { k: 'Min FICO', v: '500' }, { k: 'Time in business', v: '6+ months' }] },
  { name: 'Personal Funding', desc: 'Unsecured personal capital lines.', specs: [{ k: 'Amount', v: 'Up to $250K individual / $500K household' }, { k: 'Min FICO', v: '680' }, { k: 'Documentation', v: 'Streamlined' }] },
  { name: 'Equipment Financing', desc: 'Finance machinery, vehicles, and technology.', specs: [{ k: 'Amount', v: '$15K – $2M' }, { k: 'Min FICO', v: '600' }, { k: 'Time in business', v: '1+ year' }] },
  { name: 'Business Lines of Credit', desc: 'Flexible revolving capital, available on demand.', specs: [{ k: 'Amount', v: '$10K – $500K' }, { k: 'Min FICO', v: '620' }, { k: 'Time in business', v: '6+ months' }] },
  { name: 'Term Loan', desc: 'Lump-sum capital with fixed, predictable terms.', specs: [{ k: 'Amount', v: '$25K – $1M' }, { k: 'Min FICO', v: '640' }, { k: 'Time in business', v: '2+ years' }] },
];

export const exclusive: Exclusive[] = [
  { n: 1, name: 'Form an Entity', desc: 'LLC and corporation formation, done right from day one.' },
  { n: 2, name: 'Tax Preparation', desc: 'Strategic filing and planning for individuals and businesses.' },
  { n: 3, name: 'Business Credit', desc: 'Establish a fundable corporate credit identity.' },
  { n: 4, name: 'Estate Planning', desc: 'Protect and transfer wealth across generations.' },
];
