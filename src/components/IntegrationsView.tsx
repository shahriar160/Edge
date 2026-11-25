import React, { useState } from 'react';
import { 
  Plug, 
  CheckCircle2, 
  Plus, 
  Key, 
  Search, 
  Globe, 
  ShieldCheck, 
  X, 
  Terminal,
  Cpu,
  Layers,
  Webhook
} from 'lucide-react';

interface IntegrationApp {
  id: string;
  name: string;
  category: string;
  description: string;
  badge: string;
  badgeBg: string;
  isConnected: boolean;
  apiKeyNeeded: boolean;
  logoUrl?: string;
}

export const IntegrationsView: React.FC = () => {
  const [apps, setApps] = useState<IntegrationApp[]>([
    {
      id: 'mt5',
      name: 'MetaTrader 5 (MT5)',
      category: 'Broker & Execution',
      description: 'Real-time synchronization of forex & CFD executions, pending orders, and balances.',
      badge: 'MT5',
      badgeBg: 'bg-blue-600 text-white',
      isConnected: true,
      apiKeyNeeded: true,
    },
    {
      id: 'mt4',
      name: 'MetaTrader 4 (MT4)',
      category: 'Broker & Execution',
      description: 'Automated trade history import and live socket connection for MT4 accounts.',
      badge: 'MT4',
      badgeBg: 'bg-blue-800 text-white',
      isConnected: false,
      apiKeyNeeded: true,
    },
    {
      id: 'tradingview',
      name: 'TradingView Webhooks',
      category: 'Charting & Alerts',
      description: 'Trigger automated trade journaling instantly from TradingView Pine Script alerts.',
      badge: 'TV',
      badgeBg: 'bg-emerald-600 text-white',
      isConnected: true,
      apiKeyNeeded: true,
    },
    {
      id: 'binance',
      name: 'Binance Futures',
      category: 'Crypto Exchange',
      description: 'Sync crypto perpetual futures, position margins, and funding fee settlements.',
      badge: 'BN',
      badgeBg: 'bg-amber-500 text-white',
      isConnected: false,
      apiKeyNeeded: true,
    },
    {
      id: 'bybit',
      name: 'Bybit Derivatives',
      category: 'Crypto Exchange',
      description: 'Connect Bybit API v5 for automated fill imports and P&L tracking.',
      badge: 'BY',
      badgeBg: 'bg-neutral-900 text-white',
      isConnected: false,
      apiKeyNeeded: true,
    },
    {
      id: 'ibkr',
      name: 'Interactive Brokers (IBKR)',
      category: 'Institutional Broker',
      description: 'Global multi-asset execution sync for stocks, options, futures, and forex.',
      badge: 'IB',
      badgeBg: 'bg-red-700 text-white',
      isConnected: false,
      apiKeyNeeded: true,
    },
    {
      id: 'discord',
      name: 'Discord Community Bot',
      category: 'Community & Alerts',
      description: 'Broadcast trade milestones and daily P&L updates to private Discord channels.',
      badge: 'DC',
      badgeBg: 'bg-indigo-600 text-white',
      isConnected: true,
      apiKeyNeeded: false,
    },
    {
      id: 'telegram',
      name: 'Telegram Bot Alerts',
      category: 'Notifications',
      description: 'Receive instant Telegram push notifications whenever a trade is logged or reviewed.',
      badge: 'TG',
      badgeBg: 'bg-sky-500 text-white',
      isConnected: false,
      apiKeyNeeded: false,
    },
    {
      id: 'notion',
      name: 'Notion Workspace Sync',
      category: 'Productivity',
      description: 'Two-way sync between your EDGE trading journal and custom Notion databases.',
      badge: 'NO',
      badgeBg: 'bg-neutral-800 text-white',
      isConnected: false,
      apiKeyNeeded: true,
    },
    {
      id: 'slack',
      name: 'Slack Webhook',
      category: 'Collaboration',
      description: 'Send trade executions and daily recaps directly to team Slack channels.',
      badge: 'SL',
      badgeBg: 'bg-purple-700 text-white',
      isConnected: false,
      apiKeyNeeded: true,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [configApp, setConfigApp] = useState<IntegrationApp | null>(null);

  // New custom app form state
  const [newAppName, setNewAppName] = useState('');
  const [newAppCategory, setNewAppCategory] = useState('Custom Webhook');
  const [newAppDesc, setNewAppDesc] = useState('');
  const [newAppApiKey, setNewAppApiKey] = useState('');

  const categories = ['All', 'Broker & Execution', 'Charting & Alerts', 'Crypto Exchange', 'Community & Alerts', 'Productivity'];

  const filteredApps = apps.filter(app => {
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggleConnect = (id: string) => {
    setApps(apps.map(a => a.id === id ? { ...a, isConnected: !a.isConnected } : a));
  };

  const handleAddCustomApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppName) return;

    const customApp: IntegrationApp = {
      id: 'custom-' + Date.now(),
      name: newAppName,
      category: newAppCategory,
      description: newAppDesc || 'Custom integrated application via EDGE secure API bridge.',
      badge: newAppName.substring(0, 2).toUpperCase(),
      badgeBg: 'bg-[#00A86B] text-white',
      isConnected: true,
      apiKeyNeeded: true,
    };

    setApps([customApp, ...apps]);
    setShowAddModal(false);
    setNewAppName('');
    setNewAppDesc('');
    setNewAppApiKey('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-[#1D1D1F]">Professional App Integrations</h2>
          <p className="text-xs text-[#86868B] mt-1">Connect any broker, exchange, charting software, webhook, or productivity tool to EDGE.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00A86B] text-white text-xs font-semibold hover:bg-[#00875A] transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom App</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat 
                  ? 'bg-[#00A86B] text-white shadow-xs' 
                  : 'bg-white border border-[#E5E7EB] text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#86868B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Search brokers, apps, tools..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#E5E7EB] rounded-xl pl-9 pr-4 py-2 text-xs text-[#1D1D1F] focus:outline-none focus:border-[#00A86B]"
          />
        </div>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map(app => (
          <div 
            key={app.id} 
            className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm tracking-wider shadow-xs ${app.badgeBg}`}>
                  {app.badge}
                </div>
                {app.isConnected ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00A86B]/10 text-[#00A86B] text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5F5F7] text-[#86868B] text-xs font-medium">
                    Disconnected
                  </span>
                )}
              </div>

              <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider">{app.category}</span>
              <h3 className="text-base font-semibold text-[#1D1D1F] mt-0.5 mb-2">{app.name}</h3>
              <p className="text-xs text-[#86868B] mb-6 leading-relaxed">{app.description}</p>
            </div>

            <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
              {app.apiKeyNeeded && app.isConnected ? (
                <button 
                  onClick={() => setConfigApp(app)}
                  className="text-xs text-[#0066CC] font-semibold hover:underline flex items-center gap-1"
                >
                  <Key className="w-3.5 h-3.5" /> Configure API
                </button>
              ) : <span />}

              <button 
                onClick={() => handleToggleConnect(app.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs ${
                  app.isConnected 
                    ? 'bg-[#F5F5F7] text-[#1D1D1F] border border-[#E5E7EB] hover:bg-red-50 hover:text-red-600 hover:border-red-200' 
                    : 'bg-[#00A86B] text-white hover:bg-[#00875A]'
                }`}
              >
                {app.isConnected ? 'Disconnect' : 'Connect App'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom App Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white border border-[#E5E7EB] rounded-3xl shadow-2xl p-6 relative">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-[#86868B] hover:text-[#1D1D1F]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-semibold text-[#1D1D1F] mb-1">Add Custom App Integration</h3>
            <p className="text-xs text-[#86868B] mb-6">Integrate any custom broker, webhook endpoint, or trading bot with EDGE.</p>

            <form onSubmit={handleAddCustomApp} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#86868B] mb-1">App Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. MetaTrader 4, Custom Pine Bot, cTrader"
                  value={newAppName}
                  onChange={e => setNewAppName(e.target.value)}
                  required
                  className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-[#1D1D1F] focus:outline-none focus:border-[#00A86B]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#86868B] mb-1">Category</label>
                <select 
                  value={newAppCategory}
                  onChange={e => setNewAppCategory(e.target.value)}
                  className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-[#1D1D1F]"
                >
                  <option value="Broker & Execution">Broker & Execution</option>
                  <option value="Charting & Alerts">Charting & Alerts</option>
                  <option value="Crypto Exchange">Crypto Exchange</option>
                  <option value="Custom Webhook">Custom Webhook / API</option>
                  <option value="Community & Alerts">Community & Alerts</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#86868B] mb-1">Description</label>
                <input 
                  type="text" 
                  placeholder="Briefly describe what this app syncs"
                  value={newAppDesc}
                  onChange={e => setNewAppDesc(e.target.value)}
                  className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-[#1D1D1F]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#86868B] mb-1">API Token / Webhook Secret</label>
                <input 
                  type="password" 
                  placeholder="edge_hook_sec_****************"
                  value={newAppApiKey}
                  onChange={e => setNewAppApiKey(e.target.value)}
                  className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-[#1D1D1F]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E5E7EB]">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#F5F5F7] text-[#86868B] text-xs font-semibold hover:text-[#1D1D1F]"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#00A86B] text-white text-xs font-semibold hover:bg-[#00875A] shadow-sm"
                >
                  Save & Connect App
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Config Modal */}
      {configApp && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-3xl shadow-2xl p-6 space-y-4">
            <h3 className="text-base font-semibold text-[#1D1D1F]">Configure {configApp.name}</h3>
            <p className="text-xs text-[#86868B]">Manage API keys and secure sync parameters for {configApp.name}.</p>
            
            <div>
              <label className="block text-xs font-medium text-[#86868B] mb-1">API Key / Secret Token</label>
              <input 
                type="password" 
                placeholder="edge_live_sec_****************"
                defaultValue="edge_live_sec_89f74b2190"
                className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-[#1D1D1F]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => setConfigApp(null)}
                className="px-4 py-2 rounded-xl bg-[#F5F5F7] text-[#86868B] text-xs font-semibold hover:text-[#1D1D1F]"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  alert(`${configApp.name} configuration saved successfully.`);
                  setConfigApp(null);
                }}
                className="px-5 py-2 rounded-xl bg-[#00A86B] text-white text-xs font-semibold hover:bg-[#00875A]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
