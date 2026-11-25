import { Account, Trade, Strategy, PlaybookSetup, JournalEntry, PsychologyLog, UserProfile } from '../types';

export const initialAccounts: Account[] = [
  {
    id: 'acc-1',
    name: 'FTMO Funded $100k',
    broker: 'FTMO',
    type: 'Prop Firm',
    currency: 'USD',
    initialBalance: 100000,
    currentBalance: 100000,
    isDefault: true,
  },
  {
    id: 'acc-2',
    name: 'Personal Live Account',
    broker: 'Pepperstone',
    type: 'Live',
    currency: 'USD',
    initialBalance: 25000,
    currentBalance: 25000,
    isDefault: false,
  },
  {
    id: 'acc-3',
    name: 'Crypto Futures (Binance)',
    broker: 'Binance',
    type: 'Live',
    currency: 'USD',
    initialBalance: 10000,
    currentBalance: 10000,
    isDefault: false,
  },
];

export const initialStrategies: Strategy[] = [
  {
    id: 'strat-1',
    name: 'London Opening Range Breakout (ORB)',
    description: 'Trading the breakout of the first 30-minute range of the London session on XAU/USD or EUR/USD.',
    instrument: 'XAU/USD',
    timeframe: '5m / 15m',
    entryRules: [
      'Identify high and low of first 30m of London session (07:00 - 07:30 UTC)',
      'Wait for 5m candle close outside the range',
      'Enter on retest or direct momentum breakout with volume confirmation'
    ],
    exitRules: [
      'Take Profit 1 at 1.5R (take 50% off)',
      'Take Profit 2 at 3.0R or trailing 10 EMA',
      'Stop Loss placed at opposite side of opening range'
    ],
    riskRules: 'Risk max 0.5% of account equity per trade.',
    confirmationRules: [
      'DXY correlation aligned',
      'No major high-impact news in next 15 mins'
    ]
  },
  {
    id: 'strat-2',
    name: 'NY Session Trend Pullback',
    description: 'Trading pullbacks to key 50 EMA or value areas during the New York morning session.',
    instrument: 'EUR/USD',
    timeframe: '15m / 1h',
    entryRules: [
      'Establish daily bias using 4H market structure',
      'Wait for NY open volatility flush (08:30 EST)',
      'Enter on limit order at 50 EMA / 61.8% Fibonacci retracement'
    ],
    exitRules: [
      'Target previous swing high/low liquidity pool (2R to 4R)',
      'Stop Loss placed below recent swing structure'
    ],
    riskRules: 'Risk max 1.0% per trade. Max 2 trades per session.',
    confirmationRules: [
      'RSI divergence on 5m timeframe',
      'Order block absorption present'
    ]
  }
];

export const initialTrades: Trade[] = [];

export const initialPlaybooks: PlaybookSetup[] = [
  {
    id: 'pb-1',
    strategyName: 'London Opening Range Breakout (ORB)',
    setupDescription: 'Capturing explosive directional momentum following the first 30 minutes of the London session.',
    entryCriteria: [
      'Mark 07:00 - 07:30 UTC high and low on 5m chart',
      'Volume on breakout candle > 1.5x average',
      'MACD histogram expanding in breakout direction'
    ],
    exitCriteria: [
      'Take 50% off at 1.5R',
      'Trail remaining position below 15 EMA'
    ],
    riskRules: 'Max risk 0.5% per trade. Hard stop loss at opposite boundary.',
    marketConditions: 'Best in trending markets with high volatility.',
    checklist: [
      { id: 'c1', text: 'Checked economic calendar for high impact news', completed: false },
      { id: 'c2', text: 'Identified 30m opening range highs/lows', completed: false },
      { id: 'c3', text: 'Confirmed volume surge on breakout', completed: false }
    ],
    screenshots: []
  }
];

export const initialJournalEntries: JournalEntry[] = [];
export const initialPsychologyLogs: PsychologyLog[] = [];

export const initialProfile: UserProfile = {
  name: 'Alex Vance',
  email: 'alex.vance@edge-trader.io',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  subscriptionPlan: 'Pro',
  currency: 'USD',
  timezone: 'UTC (London/New York)',
  darkMode: false,
};
