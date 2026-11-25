import React from 'react';
import { Search, Bell, Plus, Sparkles, Menu } from 'lucide-react';
import { Account } from '../types';

interface HeaderProps {
  title: string;
  subtitle?: string;
  selectedAccount: Account;
  onAddTradeClick: () => void;
  onAiCoachClick: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  selectedAccount,
  onAddTradeClick,
  onAiCoachClick,
  searchQuery,
  setSearchQuery,
  onToggleMobileMenu,
}) => {
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);

  return (
    <header className="h-16 bg-white border-b border-[#E5E7EB] ml-0 md:ml-64 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 select-none shadow-xs">
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB] text-[#86868B] hover:text-[#1D1D1F]"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-sm md:text-base font-semibold text-[#1D1D1F] tracking-tight">{title}</h1>
          {subtitle && <p className="text-[10px] md:text-xs text-[#86868B] hidden sm:block">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative w-48 md:w-64 hidden sm:block">
          <Search className="w-4 h-4 text-[#86868B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search trades, instruments..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl pl-9 pr-4 py-1.5 text-xs text-[#1D1D1F] placeholder-[#86868B] focus:outline-none focus:border-[#00A86B]"
          />
        </div>

        {/* AI Coach Button */}
        <button 
          onClick={onAiCoachClick}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00A86B]/10 border border-[#00A86B]/30 text-[#00A86B] text-xs font-semibold hover:bg-[#00A86B]/20 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">AI Coach</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB] text-[#86868B] hover:text-[#1D1D1F] relative transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00A86B]" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-12 w-80 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl z-50 p-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB] mb-2">
                <span className="text-xs font-bold text-[#1D1D1F]">Notifications</span>
                <span className="text-[10px] text-[#00A86B] cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]">
                  <p className="font-semibold text-[#1D1D1F]">Welcome to EDGE</p>
                  <p className="text-[11px] text-[#86868B]">Add your first trade or import CSV statements to begin analytics.</p>
                  <span className="text-[9px] text-[#86868B] mt-1 block">Just now</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add Trade CTA Button */}
        <button 
          onClick={onAddTradeClick}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#00A86B] text-white text-xs font-semibold hover:bg-[#00875A] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Trade</span>
        </button>
      </div>
    </header>
  );
};
