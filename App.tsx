
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Search, Globe, Users, Newspaper, ExternalLink, 
  ArrowRight, Sparkles, Briefcase, TrendingUp, CheckCircle2, 
  Target, Zap, Clock, ShieldCheck, Mail, Linkedin, Twitter,
  ChevronRight, Play, ArrowDown, FileText, BarChart3, Lightbulb,
  MessageSquare, Shield, Rocket, Heart
} from 'lucide-react';
import Onboarding from './components/Onboarding';
import JobCard from './components/JobCard';
import CVAnalyst from './components/CVAnalyst';
import { AppState, JobListing, UserProfile, UserPreferences, CandidateProfile } from './types';
import { MOCK_JOBS } from './services/mockData';
import { DEFAULT_PREFERENCES, DEFAULT_USER_PROFILE, LOGO_URL } from './constants';

const SEARCH_SOURCES = [
  'Executive Network', 'Direct Employer Portals', 'Hidden Market Signals', 'Tier 1 Job Boards'
];

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: "Navigating The 2026 UK Executive Market",
    excerpt: "Why traditional applications are failing and how AI agents are the new standard.",
    content: "The landscape of mid-to-senior hiring has shifted. In 2026, firms are moving away from massive public listings toward precision-based AI sourcing...",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    category: "Insights",
    author: "Career Desk",
    date: "March 2026"
  },
  {
    id: '2',
    title: "The Death of The Generic Application",
    excerpt: "How personalization is the only way to bypass modern ATS filters.",
    content: "Recruiters are spending less than 4 seconds on a first pass. If your profile isn't instantly aligned with their strategic goals, you're invisible...",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200",
    category: "Strategy",
    author: "James Lovell",
    date: "Feb 2026"
  },
  {
    id: '3',
    title: "Automation: Your Secret Career Weapon",
    excerpt: "Spend your time on interviews, not on endless job board scrolling.",
    content: "The average senior executive spends 15 hours a week searching. Our users spend that time preparing for the interviews we've automatically secured...",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200",
    category: "Technology",
    author: "Tech Insider",
    date: "Jan 2026"
  }
];

const App = () => {
  const [state, setState] = useState<AppState>({
    isOnboarded: false,
    userProfile: DEFAULT_USER_PROFILE,
    candidateProfile: null,
    preferences: DEFAULT_PREFERENCES,
    jobs: []
  });

  const [isSearching, setIsSearching] = useState(false);
  const [currentSearchSource, setCurrentSearchSource] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  
  const assistantRef = useRef<HTMLDivElement>(null);
  const analystRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const performSearch = async (user: UserProfile, prefs: UserPreferences, candidate: CandidateProfile) => {
    setIsSearching(true);
    for (const source of SEARCH_SOURCES) {
      setCurrentSearchSource(source);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    const filtered = MOCK_JOBS.filter(job => job.salaryMin >= prefs.minSalary);
    setState({
      isOnboarded: true,
      userProfile: user,
      preferences: prefs,
      candidateProfile: candidate,
      jobs: filtered
    });
    setIsSearching(false);
    assistantRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen bg-brand-offwhite text-slate-900 font-sans selection:bg-brand-orange selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-100 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <img src={LOGO_URL} alt="Logo" className="w-6 h-6 object-contain brightness-0 invert" />
            </div>
            <span className={`font-extrabold text-xl tracking-tight transition-colors ${scrolled ? 'text-brand-blue' : 'text-white'}`}>Consumer Comms.</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['Analyst', 'Assistant', 'Blog'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`text-xs font-bold uppercase tracking-widest hover:text-brand-orange transition-colors ${scrolled ? 'text-slate-600' : 'text-white/80'}`}
              >
                {item}
              </a>
            ))}
            <button 
              onClick={() => analystRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-xl shadow-brand-blue/10
                ${scrolled ? 'bg-brand-blue text-white' : 'bg-white text-brand-blue'}`}
            >
              Scan CV
            </button>
          </div>
          
          <button className="md:hidden text-white bg-brand-blue p-2 rounded-xl">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] pt-32 pb-20 flex items-center justify-center bg-brand-blue text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f5850022,transparent_40%)]"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-md mb-8 animate-fade-up">
            <Sparkles className="text-brand-yellow" size={16} />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]">Personal Job Search Assistant</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-[1.1] tracking-widest mb-8 animate-fade-up text-balance mt-4">
            End the Endless Search. <br />
            <span className="text-brand-orange italic">AI Engineer Your Next Career.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto font-medium leading-relaxed mb-12 animate-fade-up [animation-delay:200ms]">
            Application fatigue is real. In the 2026 UK market, finding the right role shouldn't take hours of manual research. Our system automates the grind, mapping your skills and experience to your precise career goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-up [animation-delay:400ms]">
            <button 
              onClick={() => assistantRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-10 py-4 bg-brand-orange text-white rounded-2xl font-bold text-lg hover:bg-orange-600 shadow-2xl shadow-orange-500/30 transition-all flex items-center justify-center gap-3 group"
            >
              Start My Search Now <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => analystRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-10 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all backdrop-blur-md"
            >
              Analyze My CV
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <ArrowDown size={32} />
        </div>
      </section>

      {/* Awareness Section */}
      <section className="section-spacing px-6 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-brand-blue font-black uppercase tracking-[0.3em] text-sm italic">The 2026 Reality</h2>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Stop Wasting Hours on <span className="text-brand-orange">Generic Boards.</span>
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                The average mid-to-senior executive spends 15+ hours a week filtering through noise. Our personalized agent does this in seconds, ensuring every minute you spend is on high-value interactions, not filling out redundant forms.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                {[
                  { icon: <Clock className="text-brand-blue" />, title: "Time Reclaimed", desc: "Automate discovery, research, and initial tailoring 24/7." },
                  { icon: <Target className="text-brand-orange" />, title: "Precision Mapping", desc: "Every match is based on your specific experience and wishes." }
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center">{item.icon}</div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-brand-orange rounded-[40px] opacity-10 blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000" 
                alt="Productivity" 
                className="relative z-10 rounded-[32px] shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Validation Stage */}
      <section id="analyst" ref={analystRef} className="section-spacing px-6 bg-slate-100 relative">
        <div className="max-w-5xl mx-auto text-center mb-12 space-y-4">
          <h2 className="text-brand-orange font-black uppercase tracking-[0.3em] text-sm">Stage 1: Validation</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">The Legacy Scanner.</h3>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Find out exactly how the 2026 UK market sees your profile. Get instant feedback on your marketability and strategic gaps.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <CVAnalyst />
        </div>
      </section>

      {/* Transformation Stage */}
      <section id="assistant" ref={assistantRef} className="section-spacing px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="text-brand-blue font-black uppercase tracking-[0.3em] text-sm">Stage 2: Transformation</h2>
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-[0.95]">
                  The Assistant <span className="text-brand-blue">Job Search Agent.</span>
                </h3>
              </div>
              <p className="text-slate-600 text-lg font-medium leading-relaxed">
                Stop hunting. Start being matched. Your autonomous agent monitors exclusive executive networks and signal-rich job data based on your unique goals.
              </p>
              
              <div className="space-y-6">
                {[
                  { step: "01", title: "Target Definition", desc: "Map your skills, experience, and 2026 career wishes." },
                  { step: "02", title: "System Activation", desc: "Set your agent to scan premium markets and exclusive lists." },
                  { step: "03", title: "Smart Matches", desc: "Review only high-quality roles with auto-drafted executive pitches." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <span className="text-4xl font-black text-brand-blue group-hover:text-brand-orange transition-colors duration-300 cursor-default">{item.step}</span>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => assistantRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-4 text-brand-blue font-black tracking-widest text-sm hover:gap-6 transition-all uppercase"
              >
                Launch Your Assistant Now <ArrowRight size={20} />
              </button>
            </div>
            
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[40px] shadow-[0_32px_80px_rgba(0,0,0,0.06)] border border-slate-100 min-h-[600px] overflow-hidden relative">
                {isSearching ? (
                  <div className="h-[600px] flex flex-col items-center justify-center p-12 text-center animate-fade-up">
                    <div className="w-24 h-24 border-8 border-slate-50 rounded-full animate-spin border-t-brand-blue mb-8"></div>
                    <h4 className="text-3xl font-black text-slate-900 mb-2 italic">Scanning Markets...</h4>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Accessing {currentSearchSource}</p>
                  </div>
                ) : !state.isOnboarded ? (
                  <Onboarding onComplete={performSearch} />
                ) : (
                  <div className="flex flex-col h-[750px]">
                    <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-brand-blue text-white flex items-center justify-center font-black text-3xl shadow-2xl shadow-blue-500/20">
                          {state.userProfile.name.charAt(0)}
                        </div>
                        <div>
                          <span className="block font-black text-slate-900 text-xl">{state.userProfile.name}</span>
                          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest flex items-center gap-2">
                            <Rocket size={12} /> Search Agent Active
                          </span>
                        </div>
                      </div>
                      <button onClick={() => setState({...state, isOnboarded: false})} className="p-4 rounded-2xl hover:bg-slate-100 transition-all text-slate-400">
                        <X size={24} />
                      </button>
                    </div>
                    <div className="flex-grow overflow-y-auto p-10 space-y-8 scrollbar-hide">
                      {state.jobs.length > 0 ? (
                        state.jobs.map(job => (
                          <JobCard key={job.id} job={job} candidateProfile={state.candidateProfile!} />
                        ))
                      ) : (
                        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                          <p className="font-bold text-slate-400">No matching executive roles found.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section id="blog" className="section-spacing px-6 bg-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-8">
            <div className="space-y-4">
              <h2 className="text-brand-orange font-black uppercase tracking-[0.3em] text-sm italic">Market Intelligence</h2>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">Executive Insights.</h3>
            </div>
            <button className="flex items-center gap-3 text-brand-blue font-black text-lg group">
              View All <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {BLOG_POSTS.map((post) => (
              <div 
                key={post.id} 
                className="bg-white rounded-[40px] overflow-hidden shadow-xl hover:shadow-2xl transition-all group cursor-pointer border border-white"
                onClick={() => setSelectedBlog(post)}
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-8 left-8 px-4 py-2 bg-brand-blue text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-brand-blue/40">
                    {post.category}
                  </div>
                </div>
                <div className="p-10 space-y-6">
                  <h4 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-brand-orange transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-slate-500 font-medium line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="pt-6 flex items-center justify-between border-t border-slate-50">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{post.date}</span>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-brand-darkblue py-16 px-6 text-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-16 mb-16">
            <div className="md:col-span-5 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                  <img src={LOGO_URL} alt="Logo" className="w-10 h-10 object-contain brightness-0 invert" />
                </div>
                <span className="text-3xl font-black tracking-tighter uppercase italic">Consumer Comms.</span>
              </div>
              <p className="text-white/60 text-lg leading-relaxed max-w-sm font-medium">
                The UK's premier destination for personalized career engineering in 2026.
              </p>
              <div className="flex gap-4">
                {[Linkedin, Twitter, Mail].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-orange transition-all hover:-translate-y-1">
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-3 space-y-6">
              <h5 className="font-black text-xs tracking-[0.4em] uppercase text-brand-yellow">Explore</h5>
              <ul className="space-y-4 text-white/50 font-bold text-lg">
                <li><a href="#" className="hover:text-white transition-colors">Legacy Scan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Search Assistant</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Market Map</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
            
            <div className="md:col-span-4 space-y-8">
               <div className="space-y-3">
                <h5 className="font-black text-xs tracking-[0.4em] uppercase text-brand-yellow">Headquarters</h5>
                <p className="text-white/80 font-bold text-xl">Birmingham, UK</p>
                <p className="text-white font-black text-xl lowercase italic">advice@consumercomms.co.uk</p>
              </div>
              <div className="pt-4">
                <a 
                  href="https://consumercomms.co.uk" 
                  target="_blank"
                  className="inline-flex items-center justify-center px-10 py-4 bg-white text-brand-darkblue font-black text-sm rounded-xl hover:bg-brand-orange hover:text-white transition-all shadow-xl shadow-black/20 uppercase tracking-widest"
                >
                  Visit Main Site <ExternalLink size={18} className="ml-3" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-[10px] font-black tracking-widest uppercase">
            <span>© {new Date().getFullYear()} Consumer Communications. For the Elite.</span>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">GDPR</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">Built with <Heart size={10} className="text-brand-orange" /></a>
            </div>
          </div>
        </div>
      </footer>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-10">
          <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-md" onClick={() => setSelectedBlog(null)}></div>
          <div className="relative bg-white w-full max-w-5xl h-full max-h-[90vh] rounded-[48px] shadow-2xl overflow-hidden flex flex-col animate-scale-in">
            <button 
              onClick={() => setSelectedBlog(null)}
              className="absolute top-10 right-10 z-10 w-12 h-12 bg-brand-dark text-white rounded-full flex items-center justify-center hover:bg-brand-orange transition-all shadow-xl"
            >
              <X size={24} />
            </button>
            <div className="overflow-y-auto scrollbar-hide">
              <div className="h-[450px] relative">
                <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              </div>
              <div className="p-12 md:p-24 -mt-32 relative bg-white rounded-t-[48px]">
                <div className="flex items-center gap-6 mb-10">
                  <span className="px-6 py-2 bg-brand-blue text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em]">
                    {selectedBlog.category}
                  </span>
                  <span className="text-slate-400 font-black text-xs tracking-widest uppercase">
                    {selectedBlog.date}
                  </span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-12 leading-[1] tracking-tighter uppercase italic">{selectedBlog.title}</h2>
                <div className="flex items-center gap-6 mb-16 py-10 border-y border-slate-100">
                   <div className="w-20 h-20 rounded-3xl bg-brand-orange flex items-center justify-center text-white font-black text-3xl shadow-2xl shadow-orange-500/30">
                    {selectedBlog.author.charAt(0)}
                  </div>
                  <div>
                    <span className="block font-black text-slate-900 text-2xl tracking-tight uppercase">{selectedBlog.author}</span>
                    <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">Lead Strategist</span>
                  </div>
                </div>
                <div className="prose prose-2xl text-slate-600 font-medium space-y-12 leading-relaxed max-w-none">
                  <p className="text-3xl font-black text-slate-900 leading-tight border-l-[12px] border-brand-orange pl-10 italic">
                    "{selectedBlog.excerpt}"
                  </p>
                  <p>{selectedBlog.content}</p>
                  <div className="bg-slate-50 p-16 rounded-[48px] border border-slate-100 mt-20 text-center">
                    <h4 className="text-3xl font-black text-slate-900 mb-6 uppercase italic">Secure Your Legacy.</h4>
                    <p className="mb-10 text-xl">The market doesn't wait for manual applications. Start your agent.</p>
                    <button 
                      onClick={() => {
                        setSelectedBlog(null);
                        assistantRef.current?.scrollIntoView({behavior: 'smooth'});
                      }}
                      className="bg-brand-blue text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20"
                    >
                      Start Assistant Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
