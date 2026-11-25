export type AccountType = 'Personal' | 'Demo' | 'Live' | 'Prop Firm';

export interface Account {
  id: string;
  name: string;
  broker: string;
  type: AccountType;
  currency: string;
  initialBalance: number;
  currentBalance: number;
  isDefault?: boolean;
}

export type TradeDirection = 'Long' | 'Short';
export type TradeResult = 'Win' | 'Loss' | 'Breakeven';
export type TradingSession = 'London' | 'New York' | 'Asian' | 'Overlap';

export interface Trade {
  id: string;
  accountId: string;
  date: string; // ISO format YYYY-MM-DD
  time: string; // HH:MM
  instrument: string; // e.g. XAU/USD, EUR/USD, BTC/USD, NQ
  direction: TradeDirection;
  entryPrice: number;
  exitPrice: number;
  positionSize: number; // lots or units
  stopLoss: number;
  takeProfit: number;
  commission: number;
  swap: number;
  netPnl: number;
  rMultiple: number;
  strategy: string;
  session: TradingSession;
  durationMinutes: number;
  tags: string[];
  result: TradeResult;
  setupQuality: 'A+' | 'A' | 'B' | 'C';
  emotion: 'Calm' | 'Confident' | 'Fearful' | 'Greedy' | 'Frustrated' | 'Impatient' | 'FOMO' | 'Revenge';
  notes?: string;
  screenshots: {
    before?: string;
    during?: string;
    after?: string;
  };
  mistakes?: string[];
  review?: {
    setupValid: boolean;
    followedRules: boolean;
    entryRating: 'Good' | 'Average' | 'Poor';
    exitRating: 'Good' | 'Average' | 'Poor';
    lessonsLearned: string;
  };
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  instrument: string;
  timeframe: string;
  entryRules: string[];
  exitRules: string[];
  riskRules: string;
  confirmationRules: string[];
  imageUrl?: string;
}

export interface PlaybookSetup {
  id: string;
  strategyName: string;
  setupDescription: string;
  entryCriteria: string[];
  exitCriteria: string[];
  riskRules: string;
  marketConditions: string;
  checklist: { id: string; text: string; completed?: boolean }[];
  screenshots: string[];
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  category: 'Daily' | 'Weekly Review' | 'Monthly Review' | 'Psychology Note' | 'Market Analysis';
  content: string;
  mood: string;
  rating: number; // 1-5
  tags: string[];
}

export interface PsychologyLog {
  id: string;
  date: string;
  emotion: string;
  confidence: number; // 1-10
  stress: number; // 1-10
  focus: number; // 1-10
  sleepHours: number;
  disciplineRating: number; // 1-10
  notes: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  subscriptionPlan: 'Free' | 'Pro' | 'Premium';
  currency: string;
  timezone: string;
  darkMode: boolean;
}
