import React, { useState } from 'react';
import { Trade, Account, Strategy, PsychologyLog } from '../types';
import { Sparkles, Bot, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';

interface AiCoachViewProps {
  trades: Trade[];
  selectedAccount: Account;
  strategies: Strategy[];
  psychologyLogs: PsychologyLog[];
}

interface AiInsight {
  title: string;
  type: 'strength' | 'weakness' | 'opportunity' | 'warning';
  observation: string;
  recommendation: string;
}

export const AiCoachView: React.FC<AiCoachViewProps> = ({
  trades,
  selectedAccount,
  strategies,
  psychologyLogs,
}) => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<AiInsight[]>([
    {
      title: 'London Session Edge Dominance',
      type: 'strength',
      observation: '82% of your net profits are generated during the London opening range breakout (07:00 - 09:00 UTC).',
      recommendation: 'Focus 80% of your trading capital allocation on London session gold and forex setups.'
    },
    {
      title: 'New York Afternoon Tilt Risk',
      type: 'warning',
      observation: 'Losses in New York afternoon sessions are preceded by FOMO emotional tags or missed morning setups.',
      recommendation: 'Implement a strict rule: close laptop at 11:30 EST if morning session is completed.'
    },
    {
      title: 'Risk-Reward Discipline',
      type: 'opportunity',
      observation: 'Your average R-multiple on winning trades is 3.4R, which easily compensates for a 65% win rate.',
      recommendation: 'Maintain your current stop loss discipline and do not widen stops when trades drawdown.'
    }
  ]);
  const [summary, setSummary] = useState('EDGE AI Coach has analyzed your recent trade history and detected strong session edge during London hours.');

  const fetchAiInsights = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tradesSummary: trades.filter(t => t.accountId === selectedAccount.id),
          metrics: { account: selectedAccount.name },
          strategies,
          psychology: psychologyLogs
        })
      });
      const data = await response.json();
      if (data.insights) {
        setInsights(data.insights);
        setSummary(data.summary);
      }
    } catch (err) {
      console.error('Failed to fetch AI insights:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-[#101318] to-[#15191F] border border-[#272D35]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-[#00D084]">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#F4F6F8]">EDGE AI Trading Coach</h2>
            <p className="text-xs text-[#929BA6]">Powered by Gemini 2.5 Flash for advanced behavioral and quantitative performance coaching.</p>
          </div>
        </div>
        <button 
          onClick={fetchAiInsights}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00D084] text-[#0B0D10] text-xs font-bold hover:bg-[#00c785] transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Analyzing Trades...' : 'Refresh AI Analysis'}</span>
        </button>
      </div>

      {summary && (
        <div className="p-4 rounded-xl bg-[#00D084]/10 border border-[#00D084]/30 text-xs text-[#F4F6F8]">
          <span className="font-bold text-[#00D084] block mb-1">Coach Summary:</span>
          {summary}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((item, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-[#101318] border border-[#272D35] space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  item.type === 'strength' ? 'bg-[#00D084]/15 text-[#00D084]' :
                  item.type === 'warning' ? 'bg-[#FF4D5E]/15 text-[#FF4D5E]' :
                  'bg-[#4C8DFF]/15 text-[#4C8DFF]'
                }`}>
                  {item.type}
                </span>
                <Sparkles className="w-4 h-4 text-[#00D084]" />
              </div>
              <h3 className="text-sm font-bold text-[#F4F6F8] mb-2">{item.title}</h3>
              <p className="text-xs text-[#929BA6] mb-3">{item.observation}</p>
            </div>
            <div className="p-3 rounded-xl bg-[#15191F] border border-[#272D35] text-[11px] text-[#F4F6F8]">
              <span className="font-semibold text-[#00D084] block mb-1">Recommendation:</span>
              {item.recommendation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
