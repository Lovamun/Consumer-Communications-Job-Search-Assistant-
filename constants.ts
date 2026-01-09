import { UserPreferences, UserProfile } from './types';

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: '',
  email: 'jlelovell412@gmail.com',
  location: 'Birmingham, UK',
  postcode: 'B31 4LJ'
};

export const DEFAULT_PREFERENCES: UserPreferences = {
  radius: 50,
  minSalary: 40000,
  jobTitles: [
    'Head of Marketing',
    'Marketing Manager',
    'Brand Manager',
    'Head of Communications',
    'Communications Manager'
  ],
  industries: [
    'Automotive',
    'Motorsports',
    'Sports',
    'Football',
    'Professional Services'
  ],
  reportFrequency: 'Daily',
  weekendsOff: true
};

export const INDUSTRY_OPTIONS = [
  'Automotive',
  'Motorsports',
  'Sports',
  'Football',
  'Professional Services',
  'Agency',
  'Consumer Goods',
  'Technology'
];

export const RADIUS_OPTIONS = [5, 10, 20, 50];