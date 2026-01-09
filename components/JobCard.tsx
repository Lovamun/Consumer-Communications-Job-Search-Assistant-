import React, { useState } from 'react';
import { MapPin, Building, Banknote, Calendar, ChevronDown, ChevronUp, Copy, Check, Sparkles, Loader2, Clock } from 'lucide-react';
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

  const isSalaryDisclosed = job.salary.toLowerCase().includes('not disclosed');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-2 py-0.5 rounded">
                {job.industry}
              </span>
              <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded">
                {job.matchScore}% Match
              </span>
              <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                <Clock size={12} />
                Posted: {job.postedDate}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 leading-tight">{job.title}</h3>
            <div className="flex items-center text-gray-600 mt-1 gap-2">
              <Building size={16} />
              <span className="font-medium">{job.company}</span>
            </div>
          </div>
          <a 
            href={job.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center px-4 py-2 bg-brand-orange text-white text-sm font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
          >
            Apply Now
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-brand-grey" />
            <span>{job.location} ({job.distance} miles)</span>
          </div>
          <div className="flex items-center gap-2">
            <Banknote size={16} className="text-brand-grey" />
            <span className={!isSalaryDisclosed ? 'font-semibold text-gray-800' : 'italic'}>
              {job.salary}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-brand-grey" />
            <span className="text-red-600 font-medium">Closing: {job.closingDate || 'Not specified'}</span>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="sr-only">Description Summary</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            {job.descriptionSummary.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2 justify-between items-center">
          <div className="flex gap-2">
            <button 
              onClick={() => setExpanded(!expanded)}
              className="text-sm font-medium text-brand-blue hover:text-blue-700 flex items-center gap-1"
            >
              {expanded ? 'Hide Tools' : 'Show Cover Letter Tool'}
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
          <div className="text-xs text-gray-400">
            Source: {job.source}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-bold text-gray-900 flex items-center gap-2">
              <Sparkles size={16} className="text-brand-yellow text-yellow-500 fill-current" />
              AI Cover Letter Draft
            </h4>
            {coverLetter && (
              <button 
                onClick={copyToClipboard}
                className="text-xs font-bold text-brand-blue flex items-center gap-1 hover:underline"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy Text'}
              </button>
            )}
          </div>
          
          {!coverLetter && !loadingCL && (
            <div className="text-center py-6">
              <p className="text-sm text-gray-500 mb-3">Generate a tailored 2-paragraph cover letter based on your profile.</p>
              <button 
                onClick={handleGenerateCoverLetter}
                className="px-4 py-2 bg-white border border-brand-orange text-brand-orange font-semibold rounded-lg hover:bg-orange-50 transition-colors text-sm"
              >
                Generate Draft
              </button>
            </div>
          )}

          {loadingCL && (
            <div className="flex justify-center py-8 text-brand-grey">
              <Loader2 className="animate-spin h-6 w-6" />
            </div>
          )}

          {coverLetter && (
            <div className="bg-white p-4 rounded border border-gray-200 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
              {coverLetter}
            </div>
          )}
          
          <div className="mt-4 flex justify-end">
             <a 
              href={job.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-4 py-2 bg-brand-orange text-white text-sm font-bold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Proceed to Application
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;