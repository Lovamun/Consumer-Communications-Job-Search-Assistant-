
import React, { useState } from 'react';
import { Upload, Check, Loader2, Camera } from 'lucide-react';
import { UserProfile, UserPreferences, CandidateProfile } from '../types';
import { analyzeCV } from '../services/geminiService';
import { DEFAULT_PREFERENCES, INDUSTRY_OPTIONS, RADIUS_OPTIONS } from '../constants';

interface OnboardingProps {
  onComplete: (user: UserProfile, prefs: UserPreferences, candidate: CandidateProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // State for form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('jlelovell412@gmail.com');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const processCV = async () => {
    if (!cvFile) return;
    setIsAnalyzing(true);
    
    // Simulate reading file text (In real app, use pdf.js or similar)
    // Here we just send a dummy string + file name to our mock/AI service
    const mockText = "Senior Marketing Manager with 10 years experience in Automotive brand strategy..."; 
    const profile = await analyzeCV(mockText);
    
    setCandidateProfile(profile);
    setIsAnalyzing(false);
    setStep(2);
  };

  const toggleIndustry = (ind: string) => {
    setPreferences(prev => {
      const exists = prev.industries.includes(ind);
      if (exists) return { ...prev, industries: prev.industries.filter(i => i !== ind) };
      return { ...prev, industries: [...prev.industries, ind] };
    });
  };

  const finishOnboarding = () => {
    if (candidateProfile) {
      const userProfile: UserProfile = {
        name,
        email,
        location: 'Birmingham, UK',
        postcode: 'B31 4LJ',
        profileImage: profileImagePreview || undefined
      };
      onComplete(userProfile, preferences, candidateProfile);
    }
  };

  // Common input styles for white text on dark box
  const inputClasses = "w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none placeholder-gray-400";

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10 border-t-4 border-brand-orange">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Job Agent</h1>
      <p className="text-gray-600 mb-8">Let's set up your profile to find high-value senior roles.</p>

      {step === 1 && (
        <div className="space-y-6">
          
          {/* Profile Image Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300">
                {profileImagePreview ? (
                  <img src={profileImagePreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-3xl font-bold">{name ? name.charAt(0) : 'U'}</span>
                )}
              </div>
              <label 
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 bg-brand-orange text-white p-2 rounded-full cursor-pointer hover:bg-orange-600 shadow-sm"
              >
                <Camera size={16} />
                <input 
                  type="file" 
                  accept="image/*" 
                  id="profile-upload" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <span className="text-xs text-gray-500 mt-2">Upload Profile Photo (Optional)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                className={inputClasses}
                placeholder="e.g. Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email for Reports</label>
              <input 
                type="email" 
                className={inputClasses}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-brand-grey mb-3" />
            <h3 className="text-lg font-medium text-gray-900">Upload your CV</h3>
            <p className="text-sm text-gray-500 mb-4">PDF or DOCX accepted. We'll analyze your skills.</p>
            <input 
              type="file" 
              accept=".pdf,.docx,.doc" 
              onChange={handleFileUpload}
              className="hidden" 
              id="cv-upload"
            />
            <label 
              htmlFor="cv-upload"
              className="cursor-pointer bg-white text-brand-blue font-semibold py-2 px-4 border border-brand-blue rounded shadow-sm hover:bg-blue-50"
            >
              {cvFile ? cvFile.name : 'Select File'}
            </label>
          </div>

          <button 
            onClick={processCV}
            disabled={!cvFile || !name || isAnalyzing}
            className={`w-full py-3 px-4 rounded-lg text-white font-bold text-lg flex items-center justify-center gap-2
              ${!cvFile || !name ? 'bg-gray-300 cursor-not-allowed' : 'bg-brand-orange hover:bg-orange-600 shadow-md transform active:scale-95 transition-all'}
            `}
          >
            {isAnalyzing ? (
              <><Loader2 className="animate-spin" /> Analyzing...</>
            ) : (
              'Analyze & Continue'
            )}
          </button>
        </div>
      )}

      {step === 2 && candidateProfile && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-brand-blue flex items-center gap-2">
              <Check size={18} /> Analysis Complete
            </h3>
            <p className="text-sm text-gray-700 mt-1">
              We identified you as a <strong>{candidateProfile.seniorityLevel}</strong> level candidate
              {candidateProfile.yearsExperience > 0 && (
                <> with <strong>{candidateProfile.yearsExperience} years</strong> experience</>
              )}
              .
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Industries</label>
            <div className="flex flex-wrap gap-2">
              {INDUSTRY_OPTIONS.map(ind => (
                <button
                  key={ind}
                  onClick={() => toggleIndustry(ind)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors border
                    ${preferences.industries.includes(ind) 
                      ? 'bg-brand-blue text-white border-brand-blue' 
                      : 'bg-white text-gray-600 border-gray-300 hover:border-brand-blue'}`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Radius (from B31 4LJ)</label>
              <select 
                value={preferences.radius}
                onChange={(e) => setPreferences({...preferences, radius: Number(e.target.value)})}
                className={inputClasses}
              >
                {RADIUS_OPTIONS.map(r => (
                  <option key={r} value={r}>{r} Miles</option>
                ))}
              </select>
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Salary</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">£</span>
                <input 
                  type="number"
                  value={preferences.minSalary}
                  onChange={(e) => setPreferences({...preferences, minSalary: Number(e.target.value)})}
                  className={`${inputClasses} pl-8`}
                />
              </div>
            </div>
          </div>

          <button 
            onClick={finishOnboarding}
            className="w-full py-3 px-4 bg-brand-orange text-white font-bold rounded-lg hover:bg-orange-600 shadow-md mt-4"
          >
            Start Searching Jobs
          </button>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
