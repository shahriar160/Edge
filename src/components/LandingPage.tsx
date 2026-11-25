import React from 'react';
import { Logo } from './Logo';
import { 
  BarChart3, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen,
  Calendar,
  Layers,
  Smile
} from 'lucide-react';

interface LandingPageProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
  onDemoExplore: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLoginClick,
  onSignupClick,
  onDemoExplore,
}) => {
  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] selection:bg-[#00A86B] selection:text-white font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between">
        <Logo size="lg" />
        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-[#86868B]">
          <a href="#features" className="hover:text-[#1D1D1F] transition-colors">Features</a>
          <a href="#pricing" className="hover:text-[#1D1D1F] transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onLoginClick}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all"
          >
            Sign In
          </button>
          <button 
            onClick={onSignupClick}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#00A86B] text-white hover:bg-[#00875A] transition-colors shadow-sm"
          >
            Start Free Trial
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 max-w-7xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-xs font-medium text-[#00A86B] mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Apple-Grade Precision Trading Journal</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-tight mb-6">
          Find Your <span className="text-[#00A86B]">Trading Edge.</span>
        </h1>

        <p className="text-lg md:text-xl text-[#86868B] max-w-2xl mx-auto mb-10">
          Every trade tells a story. EDGE helps you uncover the patterns, mistakes, and strategies that transform you into a consistently profitable trader.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button 
            onClick={onSignupClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#00A86B] text-white font-semibold text-sm hover:bg-[#00875A] transition-all shadow-md flex items-center justify-center gap-2 group"
          >
            <span>Start Journaling Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={onDemoExplore}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white border border-[#E5E7EB] text-[#1D1D1F] font-semibold text-sm hover:border-[#00A86B]/50 transition-all shadow-xs"
          >
            Explore Live Workspace
          </button>
        </div>

        {/* Hero Preview */}
        <div className="relative mx-auto max-w-5xl rounded-3xl border border-[#E5E7EB] bg-white p-4 shadow-xl">
          <div className="absolute top-0 left-0 right-0 h-10 bg-[#F5F5F7] border-b border-[#E5E7EB] rounded-t-3xl flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-[#E03E3E]" />
            <div className="w-3 h-3 rounded-full bg-[#F5A623]" />
            <div className="w-3 h-3 rounded-full bg-[#00A86B]" />
            <span className="ml-4 text-[11px] font-mono text-[#86868B]">edge-terminal.io/workspace</span>
          </div>
          <div className="pt-12 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 text-left">
            <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB]">
              <p className="text-xs text-[#86868B] mb-1">Starting Balance</p>
              <p className="text-2xl font-bold font-mono text-[#1D1D1F]">$100,000.00</p>
              <span className="text-[10px] text-[#00A86B] font-medium">Ready for execution</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB]">
              <p className="text-xs text-[#86868B] mb-1">Win Rate</p>
              <p className="text-2xl font-bold font-mono text-[#1D1D1F]">0.0%</p>
              <span className="text-[10px] text-[#86868B]">Zero state active</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB]">
              <p className="text-xs text-[#86868B] mb-1">Profit Factor</p>
              <p className="text-2xl font-bold font-mono text-[#1D1D1F]">0.00</p>
              <span className="text-[10px] text-[#86868B]">Dynamic scaling</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB]">
              <p className="text-xs text-[#86868B] mb-1">Total Trades</p>
              <p className="text-2xl font-bold font-mono text-[#0066CC]">0</p>
              <span className="text-[10px] text-[#86868B]">Add data to grow</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Crafted for Professional Traders</h2>
          <p className="text-[#86868B]">Minimalist design meets high-performance analytical tools.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#00A86B]/10 text-[#00A86B] flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Precision Journal</h3>
            <p className="text-sm text-[#86868B]">Log entries, exits, strategies, and psychological states effortlessly.</p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#0066CC]/10 text-[#0066CC] flex items-center justify-center mb-6">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Dynamic Analytics</h3>
            <p className="text-sm text-[#86868B]">Graphs scale dynamically as you add trades, tracking your true equity curve.</p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#00A86B]/10 text-[#00A86B] flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">EDGE AI Coach</h3>
            <p className="text-sm text-[#86868B]">Get real-time insights powered by Gemini AI on your trading habits and risk management.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB] py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo size="md" />
          <p className="text-xs text-[#86868B]">© 2026 EDGE Technologies Inc. Find Your Trading Edge.</p>
          <div className="flex items-center gap-6 text-xs text-[#86868B]">
            <a href="#" className="hover:text-[#1D1D1F]">Privacy Policy</a>
            <a href="#" className="hover:text-[#1D1D1F]">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
