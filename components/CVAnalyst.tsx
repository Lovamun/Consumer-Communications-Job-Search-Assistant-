
import React, { useState } from 'react';
// Add missing 'Globe' icon to lucide-react imports.
import { Upload, Loader2, CheckCircle2, AlertCircle, BarChart3, MessageSquare, Lightbulb, FileText, ArrowRight, RefreshCcw, Target, Zap, ShieldCheck, Clock, Download, Globe } from 'lucide-react';
import { analyzeCVForFeedback } from '../services/geminiService';
import { INDUSTRY_OPTIONS } from '../constants';

const CVAnalyst: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [profession, setProfession] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file || !profession) return;
    setIsAnalyzing(true);
    try {
      const mockText = "Experience in senior level communication and marketing strategy for tier 1 automotive brands...";
      const feedback = await analyzeCVForFeedback(mockText, profession);
      setResult(feedback);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setResult(null);
  };

  if (result) {
    return (
      <div className="bg-white rounded-[48px] p-8 md:p-16 text-slate-900 shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-slate-100 animate-scale-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div className="space-y-3">
            <h4 className="text-xs font-black text-brand-blue uppercase tracking-[0.4em] italic">Analysis Result</h4>
            <h5 className="text-5xl md:text-6xl font-black tracking-tighter">Market Score: <span className="text-brand-orange">{result.marketabilityScore}%</span></h5>
          </div>
          <button onClick={reset} className="flex items-center gap-3 px-8 py-4 bg-slate-50 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-100 transition-all border border-slate-100">
            <RefreshCcw size={18} /> Rescan Legacy
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-10">
            <div className="bg-brand-offwhite p-10 rounded-[40px] border border-slate-100 space-y-6 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-blue/5 rounded-full blur-3xl group-hover:bg-brand-blue/10 transition-all"></div>
              <div className="flex items-center gap-4 text-brand-blue font-black uppercase text-xs tracking-widest">
                <MessageSquare size={20} /> Recruiter Verdict
              </div>
              <p className="text-2xl font-medium text-slate-800 leading-relaxed italic relative z-10">"{result.recruiterFeedback}"</p>
            </div>
            
            <div className="space-y-6">
              <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                <BarChart3 size={16} /> Technical Strengths & Gaps
              </h6>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {result.strengths.map((s: string, i: number) => (
                    <div key={i} className="px-6 py-3 bg-green-50 text-green-700 rounded-2xl text-[11px] font-black border border-green-100 uppercase tracking-widest">
                      + {s}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  {result.gaps.map((g: string, i: number) => (
                    <div key={i} className="px-6 py-3 bg-red-50 text-red-700 rounded-2xl text-[11px] font-black border border-red-100 uppercase tracking-widest">
                      - {g}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div className="space-y-6">
              <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                <Lightbulb size={16} /> Actionable Strategy
              </h6>
              <div className="space-y-4">
                {result.recommendations.map((rec: string, i: number) => (
                  <div key={i} className="flex gap-5 p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-brand-blue hover:bg-white transition-all">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-brand-orange shrink-0 group-hover:scale-110 transition-transform">
                      <CheckCircle2 size={24} />
                    </div>
                    <p className="text-slate-800 text-sm font-bold leading-relaxed">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-brand-blue p-10 rounded-[40px] text-white space-y-6 shadow-2xl shadow-blue-500/20 relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 opacity-5">
                <Zap size={200} />
              </div>
              <h6 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">Impact Rewrite Example</h6>
              <p className="text-xl font-medium leading-relaxed italic relative z-10">"{result.rewriteExample}"</p>
              <button className="pt-4 text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:gap-5 transition-all text-brand-yellow">
                Optimize CV Content <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-[48px] p-8 md:p-16 border border-slate-800 shadow-[0_40px_100px_rgba(0,0,0,0.3)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/10 blur-[100px] rounded-full -mr-40 -mt-40"></div>
      
      <div className="relative z-10 space-y-12">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 ml-2">Legacy Domain</label>
            <div className="relative">
              <select 
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full bg-slate-800 border-2 border-slate-700 rounded-3xl p-6 text-white font-bold focus:border-brand-orange outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="">Select Target Sector...</option>
                {INDUSTRY_OPTIONS.map(ind => <option key={ind} value={ind}>{ind}</option>)}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <ArrowRight size={20} className="rotate-90" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
             <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 ml-2">Legacy Document (PDF/Word)</label>
             <div 
               className={`relative border-2 border-dashed rounded-3xl p-6 flex items-center justify-center transition-all cursor-pointer h-[76px]
                 ${file ? 'border-brand-orange bg-brand-orange/5' : 'border-slate-700 hover:border-slate-500'}
               `}
               onClick={() => document.getElementById('cv-scan-upload')?.click()}
             >
                <input type="file" id="cv-scan-upload" className="hidden" onChange={handleFileUpload} />
                <div className="flex items-center gap-4 text-slate-400 font-bold">
                  {file ? <CheckCircle2 className="text-brand-orange" /> : <FileText />}
                  <span className={file ? 'text-white' : ''}>{file ? file.name : 'Upload Your Professional CV'}</span>
                </div>
             </div>
          </div>
        </div>

        <button 
          onClick={handleAnalyze}
          disabled={!file || !profession || isAnalyzing}
          className={`w-full py-8 rounded-[32px] font-black text-2xl flex items-center justify-center gap-5 shadow-2xl transition-all active:scale-[0.98]
            ${!file || !profession ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700' : 'bg-brand-orange text-white hover:bg-orange-600 shadow-orange-500/30'}
          `}
        >
          {isAnalyzing ? (
            <><Loader2 className="animate-spin" /> Running Deep Scan...</>
          ) : (
            <>Validate My CV <Zap size={28} /></>
          )}
        </button>
        
        <div className="flex flex-wrap items-center justify-center gap-10 pt-6 border-t border-slate-800/50">
          <div className="flex items-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck size={16} /> Tier 1 Encryption
          </div>
          <div className="flex items-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-widest">
            <Clock size={16} /> ~12s Latency
          </div>
          <div className="flex items-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-widest">
            <Globe size={16} /> UK Market Context
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVAnalyst;
