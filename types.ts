
export interface UserProfile {
  name: string;
  email: string;
  location: string;
  postcode: string;
  profileImage?: string; // URL or Base64 string
}

export interface CandidateProfile {
  summary: string;
  skills: string[];
  yearsExperience: number;
  seniorityLevel: 'Manager' | 'Senior Manager' | 'Head' | 'Director';
  industries: string[];
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  distance: number; // miles from B31 4LJ
  industry: string;
  salary: string;
  salaryMin: number; // for filtering
  benefits: string[];
  descriptionSummary: string[];
  closingDate?: string;
  url: string;
  source: string;
  matchScore: number;
  postedDate: string;
  isApplied: boolean;
  isSaved: boolean;
  isNotInterested: boolean;
}

export interface UserPreferences {
  radius: number; // 5, 10, 20, 50
  minSalary: number;
  jobTitles: string[];
  industries: string[];
  reportFrequency: 'Daily' | 'Every 3 days' | 'Weekly' | 'Every 2 weeks' | 'Monthly';
  weekendsOff: boolean;
}

export interface AppState {
  isOnboarded: boolean;
  userProfile: UserProfile;
  candidateProfile: CandidateProfile | null;
  preferences: UserPreferences;
  jobs: JobListing[];
}
