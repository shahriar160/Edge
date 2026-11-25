import React from 'react';
import { Trade, Account } from '../types';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award, 
  AlertCircle,
  Plus
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface DashboardViewProps {
  trades: Trade[];
  selectedAccount: Account;
  onTradeClick: (trade: Trade) => void;
  onAddTradeClick: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  trades,
  selectedAccount,
  onTradeClick,
  onAddTradeClick,
}) => {
  // Filter trades for selected account
  const accountTrades = trades.filter(t => t.accountId === selectedAccount.id);

  // Compute metrics
  const totalTrades = accountTrades.length;
  const winningTrades = accountTrades.filter(t => t.result === 'Win');
  const losingTrades = accountTrades.filter(t => t.result === 'Loss');
  const winRate = totalTrades > 0 ? (winningTrades.length / totalTrades) * 100 : 0;

  const totalPnl = accountTrades.reduce((acc, t) => acc + t.netPnl, 0);
  const grossProfit = winningTrades.reduce((acc, t) => acc + t.netPnl, 0);
  const grossLoss = Math.abs(losingTrades.reduce((acc, t) => acc + t.netPnl, 0));
  const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? 99.9 : 0;

  const avgR = totalTrades > 0 ? accountTrades.reduce((acc, t) => acc + t.rMultiple, 0) / totalTrades : 0;
  const expectancy = totalTrades > 0 ? (winRate / 100 * (grossProfit / (winningTrades.length || 1))) - ((1 - winRate / 100) * (grossLoss / (losingTrades.length || 1))) : 0;

  // Prepare cumulative equity curve data starting at initial balance
  let cumulative = selectedAccount.initialBalance;
  const equityData = [{ date: 'Start', equity: selectedAccount.initialBalance, pnl: 0, instrument: '-' }];
  
  accountTrades.slice().sort((a, b) => a.date.localeCompare(b.date)).forEach(t => {
    cumulative += t.netPnl;
    equityData.push({
      date: t.date,
      equity: cumulative,
      pnl: t.netPnl,
      instrument: t.instrument
    });
  });

  return (
    <div className="space-y-6">
      {/* Zero State Notice if no trades */}
      {totalTrades === 0 && (
        <div className="p-8 rounded-2xl bg-white border border-[#E5E7EB] text-center shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#00A86B]/10 text-[#00A86B] flex items-center justify-center mx-auto">
            <Plus className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#1D1D1F]">Your Trading Journal is at Zero</h3>
            <p className="text-xs text-[#86868B] max-w-md mx-auto mt-1">
              Add your first trade or import a CSV statement to populate live performance analytics, equity curves, and AI coaching insights.
            </p>
          </div>
          <button 
            onClick={onAddTradeClick}
            className="px-5 py-2.5 rounded-xl bg-[#00A86B] text-white text-xs font-semibold hover:bg-[#00875A] transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Your First Trade</span>
          </button>
        </div>
      )}

      {/* Top Banner / Summary metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Net P&L Card */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#86868B]">Net P&L</span>
            <div className={`p-1.5 rounded-xl ${totalPnl >= 0 ? 'bg-[#00A86B]/10 text-[#00A86B]' : 'bg-[#E03E3E]/10 text-[#E03E3E]'}`}>
              {totalPnl >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className={`text-2xl font-bold font-mono ${totalPnl >= 0 ? 'text-[#00A86B]' : 'text-[#E03E3E]'}`}>
              {totalPnl >= 0 ? '+' : ''}${totalPnl.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h2>
          </div>
          <p className="text-[10px] text-[#86868B] mt-1">Across {totalTrades} trades</p>
        </div>

        {/* Win Rate Card */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#86868B]">Win Rate</span>
            <div className="p-1.5 rounded-xl bg-[#0066CC]/10 text-[#0066CC]">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-bold font-mono text-[#1D1D1F]">
              {winRate.toFixed(1)}%
            </h2>
          </div>
          <p className="text-[10px] text-[#86868B] mt-1">{winningTrades.length} Wins / {losingTrades.length} Losses</p>
        </div>

        {/* Profit Factor */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#86868B]">Profit Factor</span>
            <div className="p-1.5 rounded-xl bg-[#00A86B]/10 text-[#00A86B]">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-bold font-mono text-[#1D1D1F]">
              {profitFactor.toFixed(2)}
            </h2>
          </div>
          <p className="text-[10px] text-[#86868B] mt-1">Gross Win / Gross Loss</p>
        </div>

        {/* Average R Multiple */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#86868B]">Average R-Multiple</span>
            <div className="p-1.5 rounded-xl bg-[#0066CC]/10 text-[#0066CC]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-bold font-mono text-[#1D1D1F]">
              {avgR.toFixed(2)}R
            </h2>
          </div>
          <p className="text-[10px] text-[#86868B] mt-1">Expectancy: ${expectancy.toFixed(2)} / trade</p>
        </div>
      </div>

      {/* Equity Curve Chart */}
      <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-semibold text-[#1D1D1F]">Equity Curve & Cumulative P&L</h3>
            <p className="text-xs text-[#86868B]">Starts at initial balance and scales dynamically with trades</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB] text-xs font-semibold text-[#00A86B]">
              ${(selectedAccount.initialBalance + totalPnl).toLocaleString()} Equity
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={equityData}>
              <defs>
                <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00A86B" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#00A86B" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" stroke="#86868B" fontSize={11} />
              <YAxis stroke="#86868B" fontSize={11} domain={['auto', 'auto']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB', borderRadius: '12px', color: '#1D1D1F', fontSize: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                formatter={(val: any) => [`$${Number(val).toLocaleString()}`, 'Equity']}
              />
              <Area type="monotone" dataKey="equity" stroke="#00A86B" strokeWidth={2.5} fillOpacity={1} fill="url(#equityGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Trades Table */}
      {totalTrades > 0 && (
        <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#1D1D1F]">Recent Executions</h3>
            <span className="text-xs text-[#00A86B] font-semibold cursor-pointer hover:underline">View All</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E5E7EB] text-[#86868B]">
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Instrument</th>
                  <th className="pb-3 font-semibold">Type</th>
                  <th className="pb-3 font-semibold">Strategy</th>
                  <th className="pb-3 font-semibold text-right">Net P&L</th>
                  <th className="pb-3 font-semibold text-right">R-Multiple</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]/60">
                {accountTrades.slice(0, 5).map(trade => (
                  <tr 
                    key={trade.id}
                    onClick={() => onTradeClick(trade)}
                    className="hover:bg-[#F5F5F7] cursor-pointer transition-colors"
                  >
                    <td className="py-3 text-[#86868B]">{trade.date}</td>
                    <td className="py-3 font-bold text-[#1D1D1F]">{trade.instrument}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${trade.direction === 'Long' ? 'bg-[#00A86B]/10 text-[#00A86B]' : 'bg-[#E03E3E]/10 text-[#E03E3E]'}`}>
                        {trade.direction}
                      </span>
                    </td>
                    <td className="py-3 text-[#86868B] truncate max-w-[150px]">{trade.strategy}</td>
                    <td className={`py-3 text-right font-mono font-bold ${trade.netPnl >= 0 ? 'text-[#00A86B]' : 'text-[#E03E3E]'}`}>
                      {trade.netPnl >= 0 ? '+' : ''}${trade.netPnl.toFixed(2)}
                    </td>
                    <td className="py-3 text-right font-mono font-semibold text-[#0066CC]">{trade.rMultiple}R</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
