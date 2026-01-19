
import { JobListing } from '../types';

const getRelativeDate = (daysOffset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split('T')[0];
};

export const MOCK_JOBS: JobListing[] = [
  {
    id: '1',
    title: 'Marketing Director',
    company: 'Innovate UK Tech',
    location: 'London (Hybrid)',
    distance: 110,
    industry: 'Technology',
    salary: '£95,000 - £120,000',
    salaryMin: 95000,
    benefits: ['Equity Options', 'Private Health', 'Unlimited Holiday'],
    descriptionSummary: [
      'Scale the marketing function for a high-growth AI firm.',
      'Own the multi-million pound global brand budget.',
      'Report directly to the CEO on growth metrics.'
    ],
    closingDate: getRelativeDate(12),
    url: 'https://example.com/careers',
    source: 'Executive Search',
    matchScore: 96,
    postedDate: getRelativeDate(-1),
    isApplied: false,
    isSaved: false,
    isNotInterested: false
  },
  {
    id: '2',
    title: 'Head of Strategy',
    company: 'Blue Chip Agency',
    location: 'Manchester',
    distance: 80,
    industry: 'Marketing & Advertising',
    salary: '£85,000 - £105,000',
    salaryMin: 85000,
    benefits: ['Bonus Pool', 'Flexible Working', 'Personal Development Fund'],
    descriptionSummary: [
      'Lead a team of 12 strategists for tier-1 global brands.',
      'Drive innovation in consumer behavior modeling.',
      'Present at major industry conferences on behalf of the firm.'
    ],
    closingDate: getRelativeDate(15),
    url: 'https://example.com/careers',
    source: 'LinkedIn Exclusive',
    matchScore: 92,
    postedDate: getRelativeDate(-2),
    isApplied: false,
    isSaved: false,
    isNotInterested: false
  },
  {
    id: '3',
    title: 'Commercial Director',
    company: 'NextGen Retail',
    location: 'Birmingham',
    distance: 5,
    industry: 'Consumer Goods',
    salary: '£110,000 + OTE',
    salaryMin: 110000,
    benefits: ['Car Allowance', 'Executive Bonus', 'Family Medical'],
    descriptionSummary: [
      'Pioneer the UK market entry for a sustainable luxury brand.',
      'Negotiate major retail distribution contracts.',
      'Build out the UK commercial operations team.'
    ],
    closingDate: getRelativeDate(20),
    url: 'https://example.com/careers',
    source: 'Headhunters Portal',
    matchScore: 98,
    postedDate: getRelativeDate(-1),
    isApplied: false,
    isSaved: false,
    isNotInterested: false
  }
];
