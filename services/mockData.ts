
import { JobListing } from '../types';

// Helper to get a date string relative to today
const getRelativeDate = (daysOffset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split('T')[0];
};

export const MOCK_JOBS: JobListing[] = [
  {
    id: '1',
    title: 'Head of Global Marketing',
    company: 'JLR (Jaguar Land Rover)',
    location: 'Gaydon (Hybrid)',
    distance: 18,
    industry: 'Automotive',
    salary: '£75,000 - £90,000 + Car Scheme',
    salaryMin: 75000,
    benefits: ['Car Scheme', 'Bonus', 'Private Healthcare', 'Hybrid Working'],
    descriptionSummary: [
      'Lead global marketing strategy for the Defender brand.',
      'Manage a team of 12 marketing professionals.',
      'Oversee multi-channel campaigns and experiential activations.'
    ],
    closingDate: getRelativeDate(14), // Closes in 2 weeks
    url: 'https://www.jaguarlandrovercareers.com',
    source: 'Automotive Jobs UK',
    matchScore: 95,
    postedDate: getRelativeDate(-2), // Posted 2 days ago
    isApplied: false,
    isSaved: false,
    isNotInterested: false
  },
  {
    id: '2',
    title: 'Senior Brand Manager',
    company: 'Aston Villa FC',
    location: 'Birmingham',
    distance: 8,
    industry: 'Football',
    salary: '£55,000 - £65,000',
    salaryMin: 55000,
    benefits: ['Season Ticket', 'Pension', 'Performance Bonus'],
    descriptionSummary: [
      'Develop fan engagement strategies for the upcoming season.',
      'Manage club brand identity across all digital and physical touchpoints.',
      'Liaise with commercial partners for sponsorship activation.'
    ],
    closingDate: getRelativeDate(10), 
    url: 'https://careers.avfc.co.uk',
    source: 'Football Jobs UK',
    matchScore: 88,
    postedDate: getRelativeDate(-3),
    isApplied: false,
    isSaved: false,
    isNotInterested: false
  },
  {
    id: '3',
    title: 'Head of Communications',
    company: 'Williams F1',
    location: 'Grove (Remote Friendly)',
    distance: 65,
    industry: 'Motorsports',
    salary: '£85,000 - £100,000',
    salaryMin: 85000,
    benefits: ['Travel', 'Bonus', 'Healthcare'],
    descriptionSummary: [
      'Lead global press and media relations for the racing team.',
      'Manage crisis communications and driver media schedules.',
      'Strategize social media growth and fan interaction.'
    ],
    closingDate: getRelativeDate(25),
    url: 'https://williamsf1.com/careers',
    source: 'Motorsport Jobs',
    matchScore: 92,
    postedDate: getRelativeDate(-5),
    isApplied: false,
    isSaved: false,
    isNotInterested: false
  },
  {
    id: '4',
    title: 'Marketing Director',
    company: 'Red Bull Racing',
    location: 'Milton Keynes',
    distance: 70,
    industry: 'Motorsports',
    salary: '£110,000 - £130,000',
    salaryMin: 110000,
    benefits: ['Global Travel', 'Performance Bonus', 'Private Medical'],
    descriptionSummary: [
      'Oversee global brand positioning for Red Bull Racing.',
      'Direct partnership strategies with key sponsors.',
      'Lead a high-performance marketing team.'
    ],
    closingDate: getRelativeDate(15),
    url: 'https://www.redbullracing.com/careers',
    source: 'LinkedIn',
    matchScore: 96,
    postedDate: getRelativeDate(-1), // Posted yesterday
    isApplied: false,
    isSaved: false,
    isNotInterested: false
  },
  {
    id: '5',
    title: 'Communications Manager',
    company: 'KPMG',
    location: 'Birmingham',
    distance: 2,
    industry: 'Professional Services',
    salary: '£55,000 - £65,000',
    salaryMin: 55000,
    benefits: ['Flexible Working', 'Pension', 'Health Insurance'],
    descriptionSummary: [
      'Manage internal and external communications for the Midlands region.',
      'Support partners with thought leadership content.',
      'Coordinate media inquiries and press releases.'
    ],
    closingDate: getRelativeDate(20),
    url: 'https://home.kpmg/uk/en/home/careers.html',
    source: 'Topjobs',
    matchScore: 82,
    postedDate: getRelativeDate(-4),
    isApplied: false,
    isSaved: false,
    isNotInterested: false
  },
  {
    id: '6',
    title: 'Brand Marketing Lead',
    company: 'Gymshark',
    location: 'Solihull',
    distance: 8,
    industry: 'Sports',
    salary: '£50,000 - £60,000',
    salaryMin: 50000,
    benefits: ['Gym Membership', 'Bonus', 'Modern Office'],
    descriptionSummary: [
      'Drive brand campaigns for new product launches.',
      'Collaborate with athlete influencers.',
      'Analyze campaign performance and ROI.'
    ],
    closingDate: getRelativeDate(8),
    url: 'https://careers.gymshark.com',
    source: 'Indeed',
    matchScore: 85,
    postedDate: getRelativeDate(-2),
    isApplied: false,
    isSaved: false,
    isNotInterested: false
  },
  {
    id: '7',
    title: 'Senior Account Director (Auto)',
    company: 'M&C Saatchi Sport & Entertainment',
    location: 'London (Remote option)',
    distance: 100,
    industry: 'Agency',
    salary: '£70,000 - £80,000',
    salaryMin: 70000,
    benefits: ['Hybrid Working', 'Agency Perks'],
    descriptionSummary: [
      'Lead major automotive client accounts.',
      'Develop integrated sponsorship strategies.',
      'Manage account profitability and growth.'
    ],
    closingDate: getRelativeDate(28),
    url: '#',
    source: 'CV-Library',
    matchScore: 78,
    postedDate: getRelativeDate(-1),
    isApplied: false,
    isSaved: false,
    isNotInterested: false
  },
  {
    id: '8',
    title: 'Marketing Manager',
    company: 'PwC',
    location: 'Birmingham',
    distance: 2,
    industry: 'Professional Services',
    salary: '£52,000 - £64,000',
    salaryMin: 52000,
    benefits: ['Pension', 'Bonus', 'Flexible Benefits'],
    descriptionSummary: [
      'Lead marketing for the Tax practice.',
      'Execute B2B campaigns.',
      'Manage digital channels.'
    ],
    closingDate: getRelativeDate(29),
    url: '#',
    source: 'Google',
    matchScore: 75,
    postedDate: getRelativeDate(-3),
    isApplied: false,
    isSaved: false,
    isNotInterested: false
  },
  {
    id: '9',
    title: 'Digital Marketing Lead',
    company: 'Polestar Automotive',
    location: 'Bicester',
    distance: 45,
    industry: 'Automotive',
    salary: '£60,000 - £70,000',
    salaryMin: 60000,
    benefits: ['Car Allowance', 'Equity', 'Flexible Hours'],
    descriptionSummary: [
      'Drive digital adoption for Polestar UK.',
      'Manage paid media and SEO strategies.',
      'Analyze customer journey data.'
    ],
    closingDate: getRelativeDate(21),
    url: 'https://about.polestar.com/careers/',
    source: 'Automotive Jobs UK',
    matchScore: 90,
    postedDate: getRelativeDate(0), // Posted today
    isApplied: false,
    isSaved: false,
    isNotInterested: false
  }
];