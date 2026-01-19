
import React, { useState } from 'react';
// Add missing 'ShieldCheck' icon to lucide-react imports.
import { MapPin, Building, Banknote, Calendar, ChevronDown, ChevronUp, Copy, Check, Sparkles, Loader2, Clock, Globe, Target, Zap, ShieldCheck } from 'lucide-react';
import { JobListing, CandidateProfile } from '../types';
import { generateCoverLetter } from '../services/geminiService';

interface JobCardProps {
  job: JobListing;
  candidateProfile: CandidateProfile;
}

const JobCard: React.FC<JobCardProps> = ({ job, candidateProfile }) => {
  const [expanded, setExpanded] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [loadingCL, setLoadingCL] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateCoverLetter = async () => {
    if (coverLetter) return;
    setLoadingCL(true);
    const letter = await generateCoverLetter(job.title, job.company, candidateProfile);
    setCoverLetter(letter);
    setLoadingCL(false);
  };

  const copyToClipboard = () => {
    if (coverLetter) {
      navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-[40px] shadow-[0_16px_40px_rgba(0,0,0,0.03)] border border-slate-50 overflow-hidden hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)] transition-all duration-500 group animate-fade-up">
      <div className="p-10 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <span className="px-4 py-1.5 bg-brand-blue text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-lg">
                {job.industry}
              </span>
              <div className="flex items-center gap-2 px-4 py-1.5 bg-brand-orange/10 text-brand-orange text-[9px] font-black uppercase tracking-[0.2em] rounded-lg border border-brand-orange/10">
                <Target size={14} /> {job.matchScore}% Match
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                <Clock size={14} /> {job.postedDate}
              </div>
            </div>
            
            <h3 className="text-3xl font-black text-slate-900 group-hover:text-brand-blue transition-colors leading-tight italic uppercase tracking-tight">
              {job.title}
            </h3>
            
            <div className="flex flex-wrap items-center gap-10 text-sm font-bold text-slate-400">
              <div className="flex items-center gap-3">
                <Building size={18} className="text-brand-blue" />
                <span className="text-slate-900">{job.company}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-slate-400" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Banknote size={18} className="text-brand-orange" />
                <span className="text-brand-orange font-black">{job.salary}</span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-auto flex md:flex-col gap-4">
            <a 
              href={job.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 md:flex-none text-center px-10 py-5 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-black transition-all shadow-2xl"
            >
              Direct Apply
            </a>
            <button 
              onClick={() => setExpanded(!expanded)}
              className={`flex-1 md:flex-none px-10 py-5 text-xs font-black uppercase tracking-[0.2em] rounded-2xl border-2 transition-all flex items-center justify-center gap-2
                ${expanded ? 'bg-slate-50 border-slate-50 text-slate-900' : 'border-slate-100 text-slate-400 hover:border-brand-blue hover:text-brand-blue'}`}
            >
              {expanded ? 'CLOSE' : 'AGENT TOOL'}
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-50 rounded-[32px] space-y-4">
            <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Core Focus</h4>
            <ul className="space-y-3">
              {job.descriptionSummary.slice(0, 3).map((point, idx) => (
                <li key={idx} className="flex gap-4 text-sm text-slate-600 font-medium leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-2"></div>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 bg-slate-50 rounded-[32px] flex flex-col justify-between space-y-6">
            <div>
              <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4">Elite Benefits</h4>
              <div className="flex flex-wrap gap-2">
                {job.benefits.map((benefit, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white border border-slate-100 rounded-xl text-[10px] font-bold text-slate-500 uppercase">
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] font-black text-slate-300 uppercase tracking-widest">
              <span className="flex items-center gap-2"><Globe size={12} /> {job.source}</span>
              <span className="text-red-400">CLOSING: {job.closingDate}</span>
            </div>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="bg-brand-blue/5 p-10 md:p-14 border-t border-slate-50 animate-scale-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-8">
            <div className="space-y-2">
              <h4 className="font-black text-slate-900 flex items-center gap-3 text-2xl uppercase tracking-tighter italic">
                <Zap size={24} className="text-brand-orange fill-brand-orange" />
                AGENT COVER DRAFT
              </h4>
              <p className="text-sm text-slate-500 font-medium tracking-tight">Tailored for your {candidateProfile.seniorityLevel} level experience in the UK.</p>
            </div>
            {coverLetter && (
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl text-[11px] font-black text-brand-blue border border-brand-blue/10 hover:bg-brand-blue hover:text-white transition-all shadow-xl uppercase tracking-widest"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Copied' : 'Copy Draft'}
              </button>
            )}
          </div>
          
          {!coverLetter && !loadingCL && (
            <div className="text-center py-16 bg-white rounded-[40px] border-2 border-dashed border-slate-200">
              <p className="text-slate-500 mb-10 text-lg font-medium">Generate a precision, 2-paragraph executive pitch.</p>
              <button 
                onClick={handleGenerateCoverLetter}
                className="px-12 py-6 bg-brand-orange text-white font-black text-xl rounded-2xl hover:bg-orange-600 transition-all shadow-2xl shadow-orange-500/30 uppercase italic"
              >
                GENERATE DRAFT NOW
              </button>
            </div>
          )}

          {loadingCL && (
            <div className="flex flex-col items-center justify-center py-16 gap-6">
              <Loader2 className="animate-spin text-brand-blue" size={48} />
              <span className="text-xs font-black text-brand-blue uppercase tracking-[0.4em]">Optimizing Pitch...</span>
            </div>
          )}

          {coverLetter && (
            <div className="bg-white p-10 md:p-14 rounded-[40px] border border-slate-50 text-slate-800 text-lg font-medium italic whitespace-pre-wrap leading-relaxed shadow-inner">
              {coverLetter}
            </div>
          )}
          
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3 text-xs font-black text-slate-300 uppercase tracking-widest">
              <ShieldCheck size={18} /> Secured by Consumer Comms Agent
            </div>
             <a 
              href={job.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto text-center px-12 py-6 bg-brand-blue text-white font-black text-xl rounded-2xl hover:bg-blue-700 shadow-2xl shadow-blue-500/20 transition-all uppercase italic"
            >
              Continue to Application
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
