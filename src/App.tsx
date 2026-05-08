/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, ArrowLeft, Send, ChevronRight, CheckCircle2, User, Calendar, Download, Languages, Lock, ThumbsUp, ThumbsDown } from 'lucide-react';
import { askGuru } from './services/gemini';

// --- Shared Components ---

const ProtocolItem = ({ index, title, description }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden cursor-pointer hover:border-saffron/30 transition-colors"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 bg-saffron/10 rounded-full flex items-center justify-center text-saffron text-[9px] font-black">{index}</span>
          <span className="text-[11px] font-bold text-slate-800">{title}</span>
        </div>
        <ChevronRight size={14} className={`text-slate-300 transition-transform ${isOpen ? 'rotate-90 text-saffron' : ''}`} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-4"
          >
            <p className="text-[10px] text-slate-500 leading-relaxed font-medium pl-8 border-l-2 border-saffron/20 ml-2.5">
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8 overflow-x-hidden">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-[420px] bg-white rounded-[48px] border-[6px] sm:border-[8px] border-slate-900 shadow-2xl relative flex flex-col overflow-hidden min-h-[640px] sm:h-[720px]"
    >
      <div className="flex-grow flex flex-col overflow-y-auto">
        {children}
      </div>
      {/* Home Indicator Style */}
      <div className="h-6 flex items-center justify-center shrink-0">
        <div className="w-24 h-1 bg-slate-100 rounded-full" />
      </div>
    </motion.div>
  </div>
);

const Button = ({ children, onClick, variant = 'primary', className = '' }: any) => {
  const base = "w-full py-4 px-6 rounded-2xl flex items-center justify-between transition-all duration-300 font-bold text-sm active:scale-95 group";
  const variants: any = {
    primary: "bg-saffron text-white shadow-lg shadow-orange-100 hover:bg-saffron-dark",
    secondary: "bg-white border-2 border-slate-100 text-slate-800 hover:border-saffron",
    outline: "bg-slate-900 text-white shadow-lg hover:bg-slate-800"
  };
  
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      <span className="flex items-center gap-3">{children}</span>
      <span className={variant === 'primary' ? 'opacity-80' : 'text-slate-400 group-hover:text-saffron'}>→</span>
    </button>
  );
};

// --- Home Page ---

const HomeView = () => (
  <PageTransition>
    <div className="p-8 flex flex-col items-center justify-center flex-grow text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6"
      >
        <div className="w-8 h-8 bg-saffron rounded-lg rotate-45" />
      </motion.div>
      
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">AtmaRise</h1>
      <p className="text-sm text-slate-500 leading-relaxed mb-12 px-6">
        Focus, Discipline & Inner Growth for Students
      </p>
      
      <div className="w-full space-y-4 px-4">
        <Link to="/ebook">
          <Button variant="secondary">
            📘 Get the Ebook
          </Button>
        </Link>
        <Link to="/guru-ai">
          <Button>
            🤖 Ask Guru AI
          </Button>
        </Link>
      </div>
    </div>
    
    <div className="pb-10 text-center">
      <p className="motto">Rise within. Win outside.</p>
      <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em] mt-8">Made by Anshpreet Singh</p>
    </div>
  </PageTransition>
);

// --- Ebook Page ---

const EbookView = () => {
  const navigate = useNavigate();
  return (
    <PageTransition>
      <div className="h-48 bg-slate-900 flex items-center justify-center relative shrink-0">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-6 left-6 p-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="w-28 h-36 bg-black shadow-2xl rounded-r-lg border-l-4 border-saffron flex flex-col items-center justify-center p-4">
          <p className="text-[7px] font-bold text-center leading-tight text-saffron mb-1">ANSHPREET SINGH</p>
          <p className="text-[9px] font-black text-center leading-tight text-white uppercase italic">7 Days to<br/>Mental Clarity</p>
          <div className="mt-2 w-full h-[1px] bg-saffron/30" />
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-6">
          <h2 className="text-xl font-black text-slate-900 mb-1 uppercase tracking-tight">7 Days to Mental Clarity</h2>
          <p className="text-[10px] font-bold text-saffron uppercase tracking-[0.2em] mb-3">The Neuroscience of the Gita</p>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            A high-ticket dissertation by Anshpreet Singh. Install a new operating system for your consciousness to dismantle the novice architecture of your mind.
          </p>
        </div>
        
        <div className="space-y-3 mb-8">
          <h3 className="font-black text-slate-900 uppercase tracking-widest text-[10px]">The 7 Protocols (Preview)</h3>
          <div className="space-y-2">
            {[
              { title: "I: Amygdala Suppression", desc: "Master the 90-second refractory pause to dissolve stress spikes before they hijack your focus." },
              { title: "II: Prefrontal Supremacy", desc: "Instantiate the 'Observer Entity' to step outside emotional cascades and maintain logical dominance." },
              { title: "III: Dopaminergic Decoupling", desc: "Unlink your actions from immediate results to build bulletproof long-term consistency." },
              { title: "IV: Synaptic Equanimity", desc: "Maintain a binary abstraction of success and failure to protect your neurological bandwidth." },
              { title: "V: DMN Eradication", desc: "Quiet the Default Mode Network—the anatomical source of mind-wandering and self-criticism." },
              { title: "VI: Theta-Wave Induction", desc: "Utilize specific focus triggers to achieve a deep-state singularity of attention." },
              { title: "VII: The Ultimate Surrender", desc: "The final paradigm shift: transitioning from a reactive processor to an autonomous architect." }
            ].map((p, i) => (
              <ProtocolItem key={i} index={i + 1} title={p.title} description={p.desc} />
            ))}
          </div>
        </div>
        
          <div className="mt-auto flex flex-col gap-3 border-t border-slate-100 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Limited Offer</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-black text-slate-900">₹69</p>
                  <p className="text-xs text-slate-400 line-through font-bold">₹99</p>
                </div>
              </div>
              <button 
                onClick={() => window.open("https://rzp.io/rzp/o8IuvRO", "_blank")}
                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-xl active:scale-95 transition-transform"
              >
                Buy Now
              </button>
            </div>
            <button 
              onClick={() => alert("Ebook download will start after payment verification.")}
              className="w-full py-3 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
            >
              <Download size={14} /> Download Ebook
            </button>
          </div>
      </div>
    </PageTransition>
  );
};

// --- Guru AI Page ---

const GuruAIView = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: '',
    dob: '',
    pob: '',
    tob: '',
    language: 'English'
  });
  const [showModal, setShowModal] = useState(true);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'guru', content: string, feedback?: 'positive' | 'negative' | null }[]>([
    { role: 'guru', content: "Namaste. I am Guru AI, your celestial guide. To align our path, please share your details." }
  ]);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); 
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [transactionId, setTransactionId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Persistence and Live Timer Logic
  React.useEffect(() => {
    // 1. Check Subscription
    const subscribed = localStorage.getItem('guru_subscribed') === 'true';
    setIsSubscribed(subscribed);

    // 2. Load Usage Data
    const startTime = localStorage.getItem('guru_usage_start');
    const cooldown = localStorage.getItem('guru_cooldown');

    if (subscribed) {
      setTimeLeft(9999);
      return;
    }

    if (cooldown && Number(cooldown) > Date.now()) {
      setCooldownUntil(Number(cooldown));
      setTimeLeft(0);
      setShowPaywall(true);
    } else if (startTime) {
      const elapsed = Math.floor((Date.now() - Number(startTime)) / 1000);
      const remaining = Math.max(0, 120 - elapsed);
      setTimeLeft(remaining);
      
      if (remaining <= 0) {
        setShowPaywall(true);
      }
    }
  }, []);

  // Live countdown
  React.useEffect(() => {
    if (isSubscribed) return;

    let intervalColor: any;
    if (timeLeft > 0 && localStorage.getItem('guru_usage_start')) {
      intervalColor = setInterval(() => {
        const startTime = Number(localStorage.getItem('guru_usage_start'));
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remaining = Math.max(0, 120 - elapsed);
        
        setTimeLeft(remaining);
        
        if (remaining <= 0) {
          const cooldown = Date.now() + 2 * 60 * 60 * 1000;
          setCooldownUntil(cooldown);
          localStorage.setItem('guru_cooldown', cooldown.toString());
          setShowPaywall(true);
          clearInterval(intervalColor);
        }
      }, 1000);
    }
    return () => clearInterval(intervalColor);
  }, [timeLeft, isSubscribed]);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    if (isSubscribed) {
      // Proceed without limits
    } else {
      if (cooldownUntil && cooldownUntil > Date.now()) {
        setShowPaywall(true);
        return;
      }
      
      if (!localStorage.getItem('guru_usage_start')) {
        localStorage.setItem('guru_usage_start', Date.now().toString());
      }
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    const res = await askGuru(userMessage, {
      name: userDetails.name,
      birthDate: userDetails.dob,
      birthPlace: userDetails.pob,
      birthTime: userDetails.tob,
      language: userDetails.language
    });
    
    setMessages(prev => [...prev, { role: 'guru', content: res }]);
    setLoading(false);
  };

  return (
    <PageTransition>
      <div className="p-6 border-b border-slate-50 flex items-center gap-4 shrink-0 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-colors mr-1">
          <ArrowLeft className="w-5 h-5 text-slate-400" />
        </button>
        <div className="w-10 h-10 rounded-full bg-saffron flex items-center justify-center text-white text-xl">✨</div>
        <div className="flex-grow">
          <h3 className="font-bold text-sm text-slate-900">Guru AI</h3>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">Reading the Stars</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 px-2 py-1 rounded-lg flex items-center gap-1.5">
            <Sparkles size={10} className="text-saffron animate-pulse" />
            <span className="text-[10px] font-bold text-slate-600">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <button onClick={() => setShowModal(true)} className="p-2 text-slate-400 hover:text-saffron transition-colors">
            <Languages size={18} />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-6 space-y-6 no-scrollbar"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex flex-col gap-2 max-w-[85%]">
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-slate-900 text-white rounded-tr-none ml-auto' 
                  : 'bg-orange-50 text-slate-800 border border-orange-100 rounded-tl-none italic mr-auto'
                }`}>
                  {msg.content}
                </div>
                {msg.role === 'guru' && i > 0 && (
                  <div className="flex gap-2 ml-1">
                    <button 
                      onClick={() => {
                        const newMessages = [...messages];
                        newMessages[i].feedback = 'positive';
                        setMessages(newMessages);
                      }}
                      className={`p-1.5 rounded-lg transition-colors ${msg.feedback === 'positive' ? 'bg-saffron text-white' : 'bg-slate-100 text-slate-400 hover:text-saffron'}`}
                    >
                      <ThumbsUp size={12} />
                    </button>
                    <button 
                      onClick={() => {
                        const newMessages = [...messages];
                        newMessages[i].feedback = 'negative';
                        setMessages(newMessages);
                      }}
                      className={`p-1.5 rounded-lg transition-colors ${msg.feedback === 'negative' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-400 hover:text-slate-600'}`}
                    >
                      <ThumbsDown size={12} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-orange-50 p-4 rounded-2xl rounded-tl-none border border-orange-100">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-saffron rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-saffron rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-saffron rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showPaywall && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-sm bg-white rounded-[40px] p-8 shadow-2xl text-center border-[4px] border-saffron/20"
            >
              <div className="w-16 h-16 bg-saffron/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="text-saffron w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Celestial Access Locked</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Your 2-minute daily reflection has concluded. Return in 2 hours or unlock unlimited wisdom.
              </p>
              
              <div className="space-y-4">
                <button 
                  onClick={() => window.open("https://rzp.io/rzp/Cco6z0d", "_blank")}
                  className="w-full bg-saffron text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-200 active:scale-95 transition-transform"
                >
                  Pay ₹35 for Unlimited
                </button>
                
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Already Paid?</p>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Transaction ID"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="flex-grow bg-slate-50 border-none rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-saffron outline-none"
                    />
                    <button 
                      onClick={async () => {
                        if (!transactionId.trim() || isVerifying) return;
                        setIsVerifying(true);
                        try {
                          // Real-world companies use Webhooks (Razorpay/Stripe) 
                          // to confirm payments securely on the backend.
                          // Here we simulate the cosmic verification delay.
                          await new Promise(resolve => setTimeout(resolve, 2000));
                          
                          // Mock verification logic
                          const isSuccess = transactionId.length >= 8;

                          if (isSuccess) {
                            const authId = `GURU_${Math.random().toString(36).substring(7).toUpperCase()}`;
                            setIsSubscribed(true);
                            localStorage.setItem('guru_subscribed', 'true');
                            localStorage.setItem('guru_auth_id', authId);
                            setShowPaywall(false);
                            alert("Verification successful! The stars have aligned. Infinite access granted.");
                          } else {
                            alert("Verification failed. The Transaction ID seems invalid.");
                          }
                        } catch (error) {
                          alert("Cosmic connection interrupted. Try again later.");
                        } finally {
                          setIsVerifying(false);
                        }
                      }}
                      className="bg-slate-900 text-white px-4 rounded-xl text-[10px] font-bold active:scale-90 transition-transform"
                    >
                      {isVerifying ? "Verifying..." : "Verify"}
                    </button>
                  </div>
                </div>

                <button 
                  onClick={() => setShowPaywall(false)}
                  className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2 hover:text-slate-600"
                >
                  Return to Home
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-sm bg-white rounded-[32px] p-8 shadow-2xl space-y-6"
            >
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900">Celestial Chart</h3>
                <p className="text-xs text-slate-400 mt-1">Provide your birth details for cosmic alignment</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider ml-1">Name</label>
                  <input 
                    type="text" 
                    placeholder="Arjun"
                    value={userDetails.name}
                    onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider ml-1">Date of Birth</label>
                  <input 
                    type="date" 
                    value={userDetails.dob}
                    onChange={(e) => setUserDetails({ ...userDetails, dob: e.target.value })}
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider ml-1">Place of Birth</label>
                  <input 
                    type="text" 
                    placeholder="Varanasi, India"
                    value={userDetails.pob}
                    onChange={(e) => setUserDetails({ ...userDetails, pob: e.target.value })}
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider ml-1">Time of Birth (Optional)</label>
                  <input 
                    type="time" 
                    value={userDetails.tob}
                    onChange={(e) => setUserDetails({ ...userDetails, tob: e.target.value })}
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider ml-1">Preferred Language</label>
                  <select 
                    value={userDetails.language}
                    onChange={(e) => setUserDetails({ ...userDetails, language: e.target.value })}
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-200 outline-none appearance-none"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Sanskrit">Sanskrit</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Bengali">Bengali</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="Marathi">Marathi</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={() => {
                  if (userDetails.name.trim() && userDetails.dob && userDetails.pob) {
                    setShowModal(false);
                  } else {
                    alert("Please fill in your name, date, and place of birth.");
                  }
                }}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-transform"
              >
                Consult the Stars
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="p-4 pb-2 border-t border-slate-50 bg-white/50 backdrop-blur-sm">
        <form onSubmit={handleAsk} className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Type your question..."
            className="flex-grow bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-orange-200 outline-none placeholder:text-slate-400 transition-all"
          />
          <button 
            type="submit"
            disabled={loading || !input.trim()}
            className="p-4 bg-slate-900 text-white rounded-2xl shadow-xl active:scale-95 transition-all disabled:opacity-50 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-center text-slate-400 mt-3 uppercase tracking-widest font-black opacity-80">
          Made with cosmic intent by Anshpreet Singh
        </p>
      </div>
    </PageTransition>
  );
};

// --- App Root ---

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white selection:bg-saffron/20">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/ebook" element={<EbookView />} />
          <Route path="/guru-ai" element={<GuruAIView />} />
        </Routes>
      </div>
    </Router>
  );
}
