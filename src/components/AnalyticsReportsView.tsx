import React from 'react';
import { Trade, Account } from '../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

interface AnalyticsReportsViewProps {
  trades: Trade[];
  selectedAccount: Account;
}

export const AnalyticsReportsView: React.FC<AnalyticsReportsViewProps> = ({
  trades,
  selectedAccount,
}) => {
  const accountTrades = trades.filter(t => t.accountId === selectedAccount.id);

  // Group by instrument
  const instrumentMap: Record<string, number> = {};
  accountTrades.forEach(t => {
    instrumentMap[t.instrument] = (instrumentMap[t.instrument] || 0) + t.netPnl;
  });

  const instrumentData = Object.keys(instrumentMap).map(inst => ({
    instrument: inst,
    pnl: instrumentMap[inst]
  }));

  const COLORS = ['#00D084', '#4C8DFF', '#9B7BFF', '#FF4D5E'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance by Instrument */}
        <div className="p-6 rounded-2xl bg-[#101318] border border-[#272D35]">
          <h3 className="text-sm font-bold text-[#F4F6F8] mb-4">Performance by Instrument</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={instrumentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#272D35" />
                <XAxis dataKey="instrument" stroke="#929BA6" fontSize={11} />
                <YAxis stroke="#929BA6" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#15191F', borderColor: '#272D35', borderRadius: '8px', color: '#F4F6F8', fontSize: '12px' }}
                  formatter={(val: any) => [`$${Number(val).toLocaleString()}`, 'Net P&L']}
                />
                <Bar dataKey="pnl" fill="#00D084" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Win vs Loss Distribution */}
        <div className="p-6 rounded-2xl bg-[#101318] border border-[#272D35]">
          <h3 className="text-sm font-bold text-[#F4F6F8] mb-4">Win / Loss Ratio</h3>
          <div className="space-y-4 pt-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#929BA6]">Winning Trades</span>
                <span className="font-bold text-[#00D084]">
                  {accountTrades.filter(t => t.result === 'Win').length} ({Math.round(accountTrades.filter(t => t.result === 'Win').length / (accountTrades.length || 1) * 100)}%)
                </span>
              </div>
              <div className="w-full bg-[#15191F] h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#00D084] h-full" 
                  style={{ width: `${(accountTrades.filter(t => t.result === 'Win').length / (accountTrades.length || 1)) * 100}%` }} 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#929BA6]">Losing Trades</span>
                <span className="font-bold text-[#FF4D5E]">
                  {accountTrades.filter(t => t.result === 'Loss').length} ({Math.round(accountTrades.filter(t => t.result === 'Loss').length / (accountTrades.length || 1) * 100)}%)
                </span>
              </div>
              <div className="w-full bg-[#15191F] h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#FF4D5E] h-full" 
                  style={{ width: `${(accountTrades.filter(t => t.result === 'Loss').length / (accountTrades.length || 1)) * 100}%` }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
