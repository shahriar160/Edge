import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar as CalendarIcon, 
  BarChart3, 
  Layers, 
  BookmarkCheck, 
  PlaySquare, 
  FileText, 
  Smile, 
  UploadCloud, 
  Sparkles, 
  Wallet, 
  Settings, 
  LogOut,
  ChevronDown,
  X,
  Plug
} from 'lucide-react';
import { Logo } from './Logo';
import { Account, UserProfile } from '../types';

export type ActiveTab = 
  | 'dashboard' 
  | 'trades' 
  | 'calendar' 
  | 'reports' 
  | 'strategies' 
  | 'playbook' 
  | 'replay' 
  | 'journal' 
  | 'psychology' 
  | 'import' 
  | 'ai-coach' 
  | 'accounts' 
  | 'integrations'
  | 'settings';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  accounts: Account[];
  selectedAccount: Account;
  setSelectedAccount: (acc: Account) => void;
  profile: UserProfile;
  onLogout: () => void;
  onUpgradeClick: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  accounts,
  selectedAccount,
  setSelectedAccount,
  profile,
  onLogout,
  onUpgradeClick,
  mobileOpen,
  setMobileOpen,
}) => {
  const [accountDropdownOpen, setAccountDropdownOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'trades', label: 'Trade Journal', icon: BookOpen },
    { id: 'calendar', label: 'Trading Calendar', icon: CalendarIcon },
    { id: 'reports', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'strategies', label: 'Strategies', icon: Layers },
    { id: 'playbook', label: 'Playbook', icon: BookmarkCheck },
    { id: 'replay', label: 'Trade Replay', icon: PlaySquare },
    { id: 'journal', label: 'Daily Journal', icon: FileText },
    { id: 'psychology', label: 'Psychology', icon: Smile },
    { id: 'import', label: 'Import Trades', icon: UploadCloud },
    { id: 'ai-coach', label: 'EDGE AI Coach', icon: Sparkles, badge: 'AI' },
    { id: 'accounts', label: 'Accounts', icon: Wallet },
    { id: 'integrations', label: 'App Integrations', icon: Plug },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      <aside className={`w-64 bg-white border-r border-[#E5E7EB] flex flex-col h-screen fixed left-0 top-0 z-50 select-none transition-transform duration-300 shadow-sm ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        {/* Top Branding / Logo */}
        <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <Logo size="md" />
          <button 
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1 text-[#86868B] hover:text-[#1D1D1F]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Account Switcher */}
        <div className="px-3 py-3 border-b border-[#E5E7EB] relative">
          <div 
            onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
            className="flex items-center justify-between p-2 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB] hover:border-[#00A86B]/40 cursor-pointer transition-all"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-2 h-2 rounded-full bg-[#00A86B]" />
              <div className="truncate">
                <p className="text-xs font-semibold text-[#1D1D1F] truncate">{selectedAccount.name}</p>
                <p className="text-[10px] text-[#86868B]">${selectedAccount.currentBalance.toLocaleString()} ({selectedAccount.broker})</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-[#86868B] transition-transform ${accountDropdownOpen ? 'rotate-180' : ''}`} />
          </div>

          {accountDropdownOpen && (
            <div className="absolute left-3 right-3 top-16 bg-white border border-[#E5E7EB] rounded-xl shadow-xl z-50 py-1">
              <div className="px-3 py-1.5 text-[10px] font-semibold text-[#86868B] uppercase tracking-wider border-b border-[#E5E7EB]">
                Switch Trading Account
              </div>
              {accounts.map(acc => (
                <div 
                  key={acc.id}
                  onClick={() => {
                    setSelectedAccount(acc);
                    setAccountDropdownOpen(false);
                  }}
                  className={`px-3 py-2 flex items-center justify-between hover:bg-[#F5F5F7] cursor-pointer text-xs ${selectedAccount.id === acc.id ? 'bg-[#F5F5F7] text-[#00A86B] font-semibold' : 'text-[#1D1D1F]'}`}
                >
                  <div>
                    <p className="font-medium">{acc.name}</p>
                    <p className="text-[10px] text-[#86868B]">${acc.currentBalance.toLocaleString()}</p>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F5F5F7] text-[#86868B]">{acc.type}</span>
                </div>
              ))}
              <div 
                onClick={() => {
                  setActiveTab('accounts');
                  setAccountDropdownOpen(false);
                  setMobileOpen(false);
                }}
                className="px-3 py-2 border-t border-[#E5E7EB] text-center text-xs text-[#00A86B] hover:bg-[#F5F5F7] cursor-pointer font-semibold"
              >
                + Manage Accounts
              </div>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as ActiveTab);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0 ${
                  isActive 
                    ? 'bg-[#00A86B]/10 text-[#00A86B] font-semibold shadow-xs' 
                    : 'text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#00A86B]' : 'text-[#86868B]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-[#00A86B] text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Upgrade banner */}
        {profile.subscriptionPlan !== 'Premium' && (
          <div className="mx-3 mb-3 p-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-[#00A86B]" />
              <span className="text-xs font-bold text-[#1D1D1F]">Upgrade to Premium</span>
            </div>
            <p className="text-[11px] text-[#86868B] mb-2.5">Unlock advanced AI coach insights & trade replay.</p>
            <button 
              onClick={() => {
                onUpgradeClick();
                setMobileOpen(false);
              }}
              className="w-full py-1.5 rounded-lg bg-[#00A86B] text-white text-xs font-bold hover:bg-[#00875A] transition-colors shadow-sm"
            >
              Upgrade Now
            </button>
          </div>
        )}

        {/* Bottom Profile & Settings */}
        <div className="p-3 border-t border-[#E5E7EB] bg-white">
          <div className="flex items-center justify-between">
            <div 
              onClick={() => {
                setActiveTab('settings');
                setMobileOpen(false);
              }}
              className="flex items-center gap-2.5 cursor-pointer overflow-hidden hover:opacity-80 transition-opacity"
            >
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                className="w-8 h-8 rounded-full object-cover border border-[#E5E7EB]"
              />
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-[#1D1D1F] truncate">{profile.name}</p>
                <p className="text-[10px] text-[#86868B] capitalize">{profile.subscriptionPlan} Plan</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => {
                  setActiveTab('settings');
                  setMobileOpen(false);
                }}
                className="p-1.5 rounded-lg text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
                title="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button 
                onClick={onLogout}
                className="p-1.5 rounded-lg text-[#E03E3E]/80 hover:text-[#E03E3E] hover:bg-[#F5F5F7] transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
