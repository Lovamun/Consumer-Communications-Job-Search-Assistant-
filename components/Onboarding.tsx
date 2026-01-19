
import React, { useState } from 'react';
// Add missing 'Zap' icon to lucide-react imports.
import { Upload, Check, Loader2, Camera, UserCircle, Briefcase, Map, Target, ArrowRight, Globe, Banknote, Zap } from 'lucide-react';
import { UserProfile, UserPreferences, CandidateProfile } from '../types';
import { analyzeCV } from '../services/geminiService';
import { DEFAULT_PREFERENCES, INDUSTRY_OPTIONS, RADIUS_OPTIONS, JOB_TITLE_OPTIONS, LOGO_URL } from '../constants';

interface OnboardingProps {
  onComplete: (user: UserProfile, prefs: UserPreferences, candidate: CandidateProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('advice@consumercomms.co.uk');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const processCV = async () => {
    if (!cvFile || !name) return;
    setIsAnalyzing(true);
    const mockText = "Senior executive experience..."; 
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

  const toggleJobTitle = (title: string) => {
    setPreferences(prev => {
      const exists = prev.jobTitles.includes(title);
      if (exists) return { ...prev, jobTitles: prev.jobTitles.filter(t => t !== title) };
      return { ...prev, jobTitles: [...prev.jobTitles, title] };
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

  const inputClasses = "w-full p-5 bg-slate-50 text-slate-900 border-2 border-slate-100 rounded-2xl focus:ring-0 focus:border-brand-blue outline-none placeholder-slate-400 transition-all font-bold text-sm";

  return (
    <div className="h-full flex flex-col p-10 md:p-14 animate-fade-up relative">
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">Search Agent Meta</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Step {step} of 2 • {step === 1 ? 'Legacy Validation' : 'Market Strategy'}</p>
        </div>
        <div className="flex gap-2 mb-1">
          <div className={`w-12 h-2 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-brand-blue' : 'bg-slate-100'}`}></div>
          <div className={`w-12 h-2 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-brand-blue' : 'bg-slate-100'}`}></div>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-10 flex-grow flex flex-col">
          <div className="space-y-6">
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Full Name</label>
               <input 
                  type="text" 
                  className={inputClasses}
                  placeholder="e.g. Lewis Hamilton"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Email Address</label>
               <input 
                  type="email" 
                  className={inputClasses}
                  placeholder="advice@consumercomms.co.uk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
            </div>
          </div>

          <div 
            className="border-2 border-dashed border-slate-200 rounded-[32px] p-10 text-center hover:border-brand-blue/30 hover:bg-brand-blue/[0.01] transition-all cursor-pointer group flex flex-col items-center justify-center" 
            onClick={() => document.getElementById('cv-onboard-upload')?.click()}
          >
            <div className="w-16 h-16 bg-white rounded-2xl shadow-xl shadow-slate-200/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Upload className="text-brand-blue" size={32} />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">Sync Your CV</h3>
            <p className="text-slate-500 font-medium text-sm">We'll extract your seniority & field data.</p>
            <input type="file" onChange={handleFileUpload} className="hidden" id="cv-onboard-upload" />
            {cvFile && (
              <div className="mt-6 px-4 py-2 bg-green-50 rounded-xl text-[10px] font-black text-green-700 border border-green-100 flex items-center gap-2">
                <Check size={14} /> {cvFile.name}
              </div>
            )}
          </div>

          <button 
            onClick={processCV}
            disabled={!cvFile || !name || isAnalyzing}
            className={`w-full py-6 rounded-2xl text-white font-black text-xl flex items-center justify-center gap-4 mt-auto transition-all active:scale-[0.98]
              ${!cvFile || !name ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-brand-blue hover:bg-blue-700 shadow-2xl shadow-blue-500/20'}
            `}
          >
            {isAnalyzing ? (
              <><Loader2 className="animate-spin" /> Validating...</>
            ) : (
              <>Proceed to Strategy <ArrowRight size={24} /></>
            )}
          </button>
        </div>
      )}

      {step === 2 && candidateProfile && (
        <div className="space-y-10 animate-fade-up flex-grow flex flex-col">
          <div className="p-8 bg-slate-900 rounded-[32px] text-white flex items-center justify-between shadow-2xl">
            <div>
              <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-1">Detected Level</span>
              <span className="text-3xl font-black italic">{candidateProfile.seniorityLevel}</span>
            </div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-brand-yellow">
              <Target size={32} />
            </div>
          </div>

          <div className="flex-grow overflow-y-auto space-y-10 scrollbar-hide pr-2">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Target Executive Roles</label>
              <div className="flex flex-wrap gap-2.5">
                {[...JOB_TITLE_OPTIONS.senior, ...JOB_TITLE_OPTIONS.mid].slice(0, 10).map(title => (
                  <button
                    key={title}
                    onClick={() => toggleJobTitle(title)}
                    className={`px-5 py-3 rounded-xl text-[11px] font-black tracking-widest transition-all border-2 uppercase
                      ${preferences.jobTitles.includes(title) 
                        ? 'bg-brand-blue border-brand-blue text-white shadow-xl shadow-blue-500/20' 
                        : 'bg-white border-slate-100 text-slate-500 hover:border-brand-blue hover:text-brand-blue'}`}
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Commute Radius</label>
                <select 
                  value={preferences.radius}
                  onChange={(e) => setPreferences({...preferences, radius: Number(e.target.value)})}
                  className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black outline-none focus:border-brand-blue transition-all cursor-pointer"
                >
                  {RADIUS_OPTIONS.map(r => <option key={r} value={r}>{r} Miles</option>)}
                </select>
              </div>
               <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Salary Floor</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-black">£</span>
                  <input 
                    type="number"
                    value={preferences.minSalary}
                    onChange={(e) => setPreferences({...preferences, minSalary: Number(e.target.value)})}
                    className="w-full p-5 pl-10 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black outline-none focus:border-brand-blue transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={finishOnboarding}
            className="w-full py-7 px-4 bg-brand-orange text-white font-black text-2xl rounded-3xl hover:bg-orange-600 shadow-2xl shadow-orange-500/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-4 uppercase italic"
          >
            Launch Agent <Zap size={28} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
