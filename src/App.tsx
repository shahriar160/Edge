import React, { useState } from 'react';
import { 
  initialTrades, 
  initialAccounts, 
  initialStrategies, 
  initialPlaybooks, 
  initialJournalEntries, 
  initialPsychologyLogs, 
  initialProfile 
} from './data/mockData';
import { Trade, Account, Strategy, PlaybookSetup, JournalEntry, PsychologyLog, UserProfile } from './types';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { AddTradeModal } from './components/AddTradeModal';

import { DashboardView } from './components/DashboardView';
import { TradeJournalView } from './components/TradeJournalView';
import { TradeDetailView } from './components/TradeDetailView';
import { TradingCalendarView } from './components/TradingCalendarView';
import { AnalyticsReportsView } from './components/AnalyticsReportsView';
import { StrategiesView } from './components/StrategiesView';
import { PlaybookView } from './components/PlaybookView';
import { TradeReplayView } from './components/TradeReplayView';
import { PsychologyView } from './components/PsychologyView';
import { TradeImportView } from './components/TradeImportView';
import { JournalView } from './components/JournalView';
import { AccountsView } from './components/AccountsView';
import { AiCoachView } from './components/AiCoachView';
import { SettingsView } from './components/SettingsView';
import { IntegrationsView } from './components/IntegrationsView';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [showLanding, setShowLanding] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const [showAddTradeModal, setShowAddTradeModal] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const [trades, setTrades] = useState<Trade[]>(initialTrades);
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [selectedAccount, setSelectedAccount] = useState<Account>(initialAccounts[0]);
  const [strategies, setStrategies] = useState<Strategy[]>(initialStrategies);
  const [playbooks, setPlaybooks] = useState<PlaybookSetup[]>(initialPlaybooks);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(initialJournalEntries);
  const [psychologyLogs, setPsychologyLogs] = useState<PsychologyLog[]>(initialPsychologyLogs);
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSaveNewTrade = (newTrade: Trade) => {
    setTrades([newTrade, ...trades]);
    setShowAddTradeModal(false);
  };

  const handleDeleteTrade = (id: string) => {
    setTrades(trades.filter(t => t.id !== id));
    if (selectedTrade?.id === id) setSelectedTrade(null);
  };

  const handleDuplicateTrade = (trade: Trade) => {
    const duplicated: Trade = {
      ...trade,
      id: 't-' + Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    setTrades([duplicated, ...trades]);
  };

  const handleUpdateTrade = (updated: Trade) => {
    setTrades(trades.map(t => t.id === updated.id ? updated : t));
    setSelectedTrade(updated);
  };

  // If viewing landing page
  if (showLanding && !isAuthenticated) {
    return (
      <LandingPage 
        onLoginClick={() => {
          setAuthMode('login');
          setShowAuthModal(true);
        }}
        onSignupClick={() => {
          setAuthMode('signup');
          setShowAuthModal(true);
        }}
        onDemoExplore={() => {
          setIsAuthenticated(true);
          setShowLanding(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans selection:bg-[#00A86B] selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedTrade(null);
        }}
        accounts={accounts}
        selectedAccount={selectedAccount}
        setSelectedAccount={setSelectedAccount}
        profile={profile}
        onLogout={() => {
          setIsAuthenticated(false);
          setShowLanding(true);
        }}
        onUpgradeClick={() => setActiveTab('settings')}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Header */}
      <Header 
        title={
          selectedTrade ? 'Trade Review & Detail' :
          activeTab === 'dashboard' ? 'Performance Dashboard' :
          activeTab === 'trades' ? 'Trade Journal' :
          activeTab === 'calendar' ? 'Trading Calendar' :
          activeTab === 'reports' ? 'Analytics & Reports' :
          activeTab === 'strategies' ? 'Strategies' :
          activeTab === 'playbook' ? 'Strategy Playbook' :
          activeTab === 'replay' ? 'Trade Replay Simulator' :
          activeTab === 'journal' ? 'Daily Journal' :
          activeTab === 'psychology' ? 'Psychology & Mood' :
          activeTab === 'import' ? 'Import Trades' :
          activeTab === 'ai-coach' ? 'EDGE AI Coach' :
          activeTab === 'accounts' ? 'Trading Accounts' :
          activeTab === 'integrations' ? 'App Integrations' : 'Platform Settings'
        }
        subtitle={`${selectedAccount.name} — ${selectedAccount.broker}`}
        selectedAccount={selectedAccount}
        onAddTradeClick={() => setShowAddTradeModal(true)}
        onAiCoachClick={() => setActiveTab('ai-coach')}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onToggleMobileMenu={() => setMobileOpen(!mobileOpen)}
      />

      {/* Main Workspace Body */}
      <main className="ml-0 md:ml-64 p-4 md:p-8 min-h-[calc(100vh-4rem)]">
        {selectedTrade ? (
          <TradeDetailView 
            trade={selectedTrade}
            onBack={() => setSelectedTrade(null)}
            onUpdateTrade={handleUpdateTrade}
          />
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <DashboardView 
                trades={trades}
                selectedAccount={selectedAccount}
                onTradeClick={(t) => setSelectedTrade(t)}
                onAddTradeClick={() => setShowAddTradeModal(true)}
              />
            )}
            {activeTab === 'trades' && (
              <TradeJournalView 
                trades={trades}
                selectedAccount={selectedAccount}
                onTradeClick={(t) => setSelectedTrade(t)}
                onAddTradeClick={() => setShowAddTradeModal(true)}
                onDeleteTrade={handleDeleteTrade}
                onDuplicateTrade={handleDuplicateTrade}
              />
            )}
            {activeTab === 'calendar' && (
              <TradingCalendarView trades={trades} selectedAccount={selectedAccount} />
            )}
            {activeTab === 'reports' && (
              <AnalyticsReportsView trades={trades} selectedAccount={selectedAccount} />
            )}
            {activeTab === 'strategies' && (
              <StrategiesView strategies={strategies} />
            )}
            {activeTab === 'playbook' && (
              <PlaybookView playbooks={playbooks} />
            )}
            {activeTab === 'replay' && (
              <TradeReplayView />
            )}
            {activeTab === 'journal' && (
              <JournalView entries={journalEntries} />
            )}
            {activeTab === 'psychology' && (
              <PsychologyView />
            )}
            {activeTab === 'import' && (
              <TradeImportView onImportComplete={() => setActiveTab('trades')} />
            )}
            {activeTab === 'ai-coach' && (
              <AiCoachView 
                trades={trades}
                selectedAccount={selectedAccount}
                strategies={strategies}
                psychologyLogs={psychologyLogs}
              />
            )}
            {activeTab === 'accounts' && (
              <AccountsView 
                accounts={accounts}
                selectedAccount={selectedAccount}
                onSelectAccount={setSelectedAccount}
              />
            )}
            {activeTab === 'integrations' && (
              <IntegrationsView />
            )}
            {activeTab === 'settings' && (
              <SettingsView profile={profile} onUpdateProfile={setProfile} />
            )}
          </>
        )}
      </main>

      {/* Modals */}
      {showAddTradeModal && (
        <AddTradeModal 
          accounts={accounts}
          selectedAccount={selectedAccount}
          onClose={() => setShowAddTradeModal(false)}
          onSaveTrade={handleSaveNewTrade}
        />
      )}

      {showAuthModal && (
        <AuthModal 
          initialMode={authMode}
          onLoginSuccess={(email) => {
            setProfile(prev => ({ ...prev, email }));
            setIsAuthenticated(true);
            setShowAuthModal(false);
          }}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
}
