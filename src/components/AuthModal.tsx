import React, { useState } from 'react';
import { Logo } from './Logo';
import { Lock, Mail, User, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  initialMode?: 'login' | 'signup';
  onLoginSuccess: (email: string) => void;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  initialMode = 'login',
  onLoginSuccess,
  onClose,
}) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [email, setEmail] = useState('alex.vance@edge-trader.io');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Alex Vance');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(email || 'trader@edge-trader.io');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white border border-[#E5E7EB] rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left branding visual */}
        <div className="p-8 bg-[#F5F5F7] border-r border-[#E5E7EB] hidden md:flex flex-col justify-between">
          <Logo size="lg" />
          
          <div className="my-auto py-10">
            <h2 className="text-2xl font-bold mb-3 text-[#1D1D1F]">Find Your Trading Edge.</h2>
            <p className="text-sm text-[#86868B] mb-6">
              Professional traders use EDGE to track performance, eliminate emotional mistakes, and scale their accounts.
            </p>
            <div className="space-y-3 text-xs text-[#1D1D1F]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A86B]" />
                <span>Zero-state equity curve tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A86B]" />
                <span>EDGE AI Coach personalized insights</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A86B]" />
                <span>Interactive trading calendar & playbook</span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-[#86868B]">© 2026 EDGE Technologies Inc.</p>
        </div>

        {/* Right Form */}
        <div className="p-8 flex flex-col justify-between relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-[#86868B] hover:text-[#1D1D1F] text-sm font-bold"
          >
            ✕
          </button>

          <div className="mb-6">
            <div className="md:hidden mb-4">
              <Logo size="md" />
            </div>
            <h3 className="text-xl font-bold mb-1 text-[#1D1D1F]">
              {isLogin ? 'Welcome back to EDGE' : 'Create your EDGE account'}
            </h3>
            <p className="text-xs text-[#86868B]">
              {isLogin ? 'Enter your credentials to access your workspace' : 'Start your 14-day free trial. No credit card required.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-medium text-[#86868B] mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#86868B] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    required
                    className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl pl-9 pr-4 py-2 text-xs text-[#1D1D1F] focus:outline-none focus:border-[#00A86B]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-[#86868B] mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#86868B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required
                  className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl pl-9 pr-4 py-2 text-xs text-[#1D1D1F] focus:outline-none focus:border-[#00A86B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868B] mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#86868B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required
                  className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl pl-9 pr-4 py-2 text-xs text-[#1D1D1F] focus:outline-none focus:border-[#00A86B]"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-3 rounded-xl bg-[#00A86B] text-white font-semibold text-xs hover:bg-[#00875A] transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>{isLogin ? 'Sign In to Workspace' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-[#86868B]">
            {isLogin ? (
              <p>
                Don't have an account?{' '}
                <button onClick={() => setIsLogin(false)} className="text-[#00A86B] font-semibold hover:underline">
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button onClick={() => setIsLogin(true)} className="text-[#00A86B] font-semibold hover:underline">
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
