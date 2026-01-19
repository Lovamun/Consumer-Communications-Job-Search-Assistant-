
import { UserPreferences, UserProfile } from './types';

export const LOGO_URL = "https://1drv.ms/i/c/a9f7c1e1ed4ef733/IQQpjv4M1C7bTY2EDFOvYZQtAdTThlDff6L56HTQhh_SN3k?width=2569&height=2635";

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: '',
  email: 'advice@consumercomms.co.uk',
  location: 'Birmingham, UK',
  postcode: 'B31 4LJ'
};

export const JOB_TITLE_OPTIONS = {
  senior: [
    'Marketing Director',
    'Commercial Director',
    'Head of Strategy',
    'Strategic Partnerships Lead',
    'Chief Marketing Officer',
    'Operations Director',
    'Head of Communications',
    'Creative Director'
  ],
  mid: [
    'Marketing Manager',
    'Account Director',
    'Senior Strategist',
    'PR Manager',
    'Business Development Manager',
    'Senior Brand Manager',
    'Content Lead',
    'Digital Specialist'
  ]
};

export const DEFAULT_PREFERENCES: UserPreferences = {
  radius: 50,
  minSalary: 55000,
  jobTitles: [
    'Marketing Director',
    'Head of Strategy'
  ],
  industries: [
    'Marketing & Advertising',
    'Consumer Goods',
    'Professional Services',
    'Technology'
  ],
  reportFrequency: 'Daily',
  weekendsOff: true
};

export const INDUSTRY_OPTIONS = [
  'Marketing & Advertising',
  'Consumer Goods',
  'Professional Services',
  'Technology',
  'Healthcare',
  'Financial Services',
  'Automotive',
  'Sports & Entertainment'
];

export const RADIUS_OPTIONS = [5, 10, 20, 50, 100];
