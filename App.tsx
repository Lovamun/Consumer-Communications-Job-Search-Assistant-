
import React, { useState, useEffect } from 'react';
import { Menu, Settings, LogOut, Bell, X, Filter, Search, Loader2 } from 'lucide-react';
import Onboarding from './components/Onboarding';
import JobCard from './components/JobCard';
import { AppState, JobListing, UserProfile, UserPreferences, CandidateProfile } from './types';
import { MOCK_JOBS } from './services/mockData';
import { DEFAULT_PREFERENCES, DEFAULT_USER_PROFILE } from './constants';

const SEARCH_SOURCES = [
  'LinkedIn',
  'Google',
  'Indeed',
  'Topjobs',
  'CV-Library',
  'Automotive Jobs UK',
  'Motorsport Jobs',
  'Football Jobs UK'
];

const App = () => {
  const [state, setState] = useState<AppState>({
    isOnboarded: false,
    userProfile: DEFAULT_USER_PROFILE,
    candidateProfile: null,
    preferences: DEFAULT_PREFERENCES,
    jobs: []
  });

  const [showSettings, setShowSettings] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [currentSearchSource, setCurrentSearchSource] = useState('');

  // Filter jobs based on preferences and closing date logic
  const filterJobs = (jobs: JobListing[], prefs: UserPreferences) => {
    const today = new Date();
    // Reset time to start of day for accurate comparison
    today.setHours(0, 0, 0, 0);

    const thirtyDaysFromNow = new Date(today);
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    return jobs.filter(job => {
      // 1. Salary Check
      const matchesSalary = job.salaryMin >= prefs.minSalary;
      
      // 2. Radius Check (Mock logic: if prefs.radius is 50, show all < 50)
      // In a real app this would use lat/long. 
      // For this demo, we assume the distance property in MOCK_JOBS is accurate.
      const matchesRadius = job.distance <= prefs.radius;
      
      // 3. Industry Check
      // We check if the job industry matches user preferences OR is a related "catch-all" like Agency
      const matchesIndustry = prefs.industries.some(ind => 
        job.industry.toLowerCase().includes(ind.toLowerCase()) || 
        job.industry === 'Agency' || 
        job.industry === 'Professional Services'
      );

      // 4. Closing Date Check: strictly future and within 30 days
      let matchesDate = false;
      if (job.closingDate) {
        const closeDate = new Date(job.closingDate);
        if (!isNaN(closeDate.getTime())) {
          // STRICTLY EXCLUDE EXPIRED JOBS: closeDate must be >= today
          const isNotExpired = closeDate >= today;
          const isWithinMonth = closeDate <= thirtyDaysFromNow;
          matchesDate = isNotExpired && isWithinMonth;
        }
      }

      return matchesSalary && matchesRadius && matchesIndustry && matchesDate;
    });
  };

  const performSearch = async (user: UserProfile, prefs: UserPreferences, candidate: CandidateProfile) => {
    setIsSearching(true);
    
    // Simulate searching through sources
    for (const source of SEARCH_SOURCES) {
      setCurrentSearchSource(source);
      await new Promise(resolve => setTimeout(resolve, 600)); // Delay for visual effect
    }

    const filtered = filterJobs(MOCK_JOBS, prefs);
    setState({
      isOnboarded: true,
      userProfile: user,
      preferences: prefs,
      candidateProfile: candidate,
      jobs: filtered
    });
    setIsSearching(false);
  };

  const handleOnboardingComplete = (user: UserProfile, prefs: UserPreferences, candidate: CandidateProfile) => {
    performSearch(user, prefs, candidate);
  };

  const handleUpdatePreferences = (newPrefs: UserPreferences) => {
    const filtered = filterJobs(MOCK_JOBS, newPrefs);
    setState(prev => ({
      ...prev,
      preferences: newPrefs,
      jobs: filtered
    }));
  };

  // Styles for inputs with white text on dark background
  const inputClasses = "w-full p-2 bg-gray-700 text-white border border-gray-600 rounded outline-none focus:border-brand-blue";

  // Loading Screen
  if (isSearching) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center border-t-4 border-brand-orange">
          <Loader2 className="w-12 h-12 text-brand-blue animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Searching Job Markets...</h2>
          <p className="text-gray-600 mb-6">Scanning for senior roles matching your profile.</p>
          
          <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-center gap-3">
            <Search size={18} className="text-brand-grey" />
            <span className="font-medium text-brand-blue animate-pulse">
              Querying {currentSearchSource}...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (!state.isOnboarded) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center text-white font-bold text-xl">
              C
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Consumer Comms <span className="text-brand-blue">Job Search</span></h1>
          </div>
        </header>
        <main className="flex-grow">
          <Onboarding onComplete={handleOnboardingComplete} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center text-white font-bold">
                C
              </div>
              <span className="font-bold text-lg hidden sm:block">Consumer Comms Jobs</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-500 hover:text-brand-blue relative">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button 
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-medium overflow-hidden border border-gray-200">
                  {state.userProfile.profileImage ? (
                    <img src={state.userProfile.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    state.userProfile.name.charAt(0)
                  )}
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">{state.userProfile.name}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Main Feed */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Recommended Roles</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Found {state.jobs.length} high-value matches for you.
                </p>
              </div>
              <button 
                onClick={() => setShowSettings(true)}
                className="md:hidden p-2 bg-white border border-gray-300 rounded shadow-sm"
              >
                <Filter size={18} />
              </button>
            </div>

            {state.jobs.length === 0 ? (
              <div className="bg-white p-12 rounded-xl border border-gray-200 text-center">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No active jobs found matching your filters.</p>
                <p className="text-xs text-gray-400 mt-2">
                  (Showing only jobs closing within 30 days from {new Date().toLocaleDateString()})
                </p>
                <button 
                  onClick={() => setShowSettings(true)}
                  className="mt-4 text-brand-blue font-semibold hover:underline"
                >
                  Adjust filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {state.jobs.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    candidateProfile={state.candidateProfile!} 
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar / Quick Stats */}
          <div className="hidden md:block w-80 space-y-6">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Your Profile</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="font-medium text-brand-blue">Active Search</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Min Salary</span>
                  <span className="font-medium">£{state.preferences.minSalary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Radius</span>
                  <span className="font-medium">{state.preferences.radius} miles</span>
                </div>
                 <div className="flex justify-between">
                  <span className="text-gray-500">Sources</span>
                  <span className="font-medium text-right text-xs max-w-[120px] truncate">
                    LinkedIn, Indeed +6 more
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setShowSettings(true)}
                className="w-full mt-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Settings size={14} /> Manage Preferences
              </button>
            </div>

            <div className="bg-brand-blue p-5 rounded-xl text-white shadow-lg relative overflow-hidden">
               {/* Decorative circle */}
               <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500 rounded-full opacity-50"></div>
               
               <h3 className="font-bold text-lg relative z-10">Email Report</h3>
               <p className="text-blue-100 text-sm mt-2 relative z-10">
                 Next report scheduled for tomorrow at 08:00 AM.
               </p>
               <div className="mt-4 pt-4 border-t border-blue-500 relative z-10">
                 <div className="flex justify-between text-xs text-blue-200">
                   <span>Frequency</span>
                   <span>{state.preferences.reportFrequency}</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold">Preferences</h3>
              <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search Radius (Miles)</label>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 10, 20, 50].map(r => (
                    <button
                      key={r}
                      onClick={() => handleUpdatePreferences({...state.preferences, radius: r})}
                      className={`py-2 rounded border text-sm font-medium ${
                        state.preferences.radius === r 
                        ? 'bg-brand-blue text-white border-brand-blue' 
                        : 'bg-white text-gray-700 border-gray-300'
                      }`}
                    >
                      {r}m
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Annual Salary</label>
                 <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">£</span>
                  <input 
                    type="number"
                    value={state.preferences.minSalary}
                    onChange={(e) => handleUpdatePreferences({...state.preferences, minSalary: Number(e.target.value)})}
                    className={`${inputClasses} pl-8`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Report Frequency</label>
                <select 
                  value={state.preferences.reportFrequency}
                  onChange={(e) => handleUpdatePreferences({...state.preferences, reportFrequency: e.target.value as any})}
                  className={inputClasses}
                >
                  <option>Daily</option>
                  <option>Every 3 days</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>

               <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Do not send on Weekends</span>
                <button 
                  onClick={() => handleUpdatePreferences({...state.preferences, weekendsOff: !state.preferences.weekendsOff})}
                  className={`w-11 h-6 flex items-center rounded-full transition-colors ${state.preferences.weekendsOff ? 'bg-brand-blue' : 'bg-gray-300'}`}
                >
                  <span className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${state.preferences.weekendsOff ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button 
                  onClick={() => setShowSettings(false)}
                  className="w-full py-2 bg-brand-orange text-white font-bold rounded-lg hover:bg-orange-600"
                >
                  Save & Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
