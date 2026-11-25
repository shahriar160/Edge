import React from 'react';
import { Trade, Account } from '../types';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface TradingCalendarViewProps {
  trades: Trade[];
  selectedAccount: Account;
}

export const TradingCalendarView: React.FC<TradingCalendarViewProps> = ({
  trades,
  selectedAccount,
}) => {
  const accountTrades = trades.filter(t => t.accountId === selectedAccount.id);

  // Group trades by date YYYY-MM-DD
  const pnlByDate: Record<string, { pnl: number; count: number; wins: number }> = {};
  accountTrades.forEach(t => {
    if (!pnlByDate[t.date]) {
      pnlByDate[t.date] = { pnl: 0, count: 0, wins: 0 };
    }
    pnlByDate[t.date].pnl += t.netPnl;
    pnlByDate[t.date].count += 1;
    if (t.result === 'Win') pnlByDate[t.date].wins += 1;
  });

  // Days of November 2026
  const daysInMonth = Array.from({ length: 30 }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `2026-11-${dayNum < 10 ? '0' + dayNum : dayNum}`;
    const data = pnlByDate[dateStr] || { pnl: 0, count: 0, wins: 0 };
    return { dateStr, dayNum, ...data };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 rounded-xl bg-[#101318] border border-[#272D35]">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-5 h-5 text-[#00D084]" />
          <h2 className="text-base font-bold text-[#F4F6F8]">November 2026 Trading Calendar</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-[#15191F] border border-[#272D35] text-[#929BA6] hover:text-[#F4F6F8]">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold px-3 py-1 bg-[#15191F] border border-[#272D35] rounded-lg">Nov 2026</span>
          <button className="p-2 rounded-lg bg-[#15191F] border border-[#272D35] text-[#929BA6] hover:text-[#F4F6F8]">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div key={day} className="text-center text-xs font-semibold text-[#929BA6] py-2">
            {day}
          </div>
        ))}

        {/* Empty padding for start of month */}
        <div className="rounded-xl bg-[#101318]/40 border border-[#272D35]/30 h-28 opacity-30" />
        <div className="rounded-xl bg-[#101318]/40 border border-[#272D35]/30 h-28 opacity-30" />

        {daysInMonth.map(day => {
          const hasTrades = day.count > 0;
          const isProfitable = day.pnl >= 0;
          return (
            <div 
              key={day.dateStr}
              className={`rounded-xl border p-3 flex flex-col justify-between h-28 transition-all hover:border-[#00D084] cursor-pointer ${
                hasTrades 
                  ? isProfitable 
                    ? 'bg-[#00D084]/10 border-[#00D084]/30' 
                    : 'bg-[#FF4D5E]/10 border-[#FF4D5E]/30' 
                  : 'bg-[#101318] border-[#272D35]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#F4F6F8]">{day.dayNum}</span>
                {hasTrades && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isProfitable ? 'bg-[#00D084] text-[#0B0D10]' : 'bg-[#FF4D5E] text-[#0B0D10]'}`}>
                    {day.count} {day.count === 1 ? 'trade' : 'trades'}
                  </span>
                )}
              </div>

              {hasTrades ? (
                <div>
                  <p className={`text-sm font-bold font-mono ${isProfitable ? 'text-[#00D084]' : 'text-[#FF4D5E]'}`}>
                    {isProfitable ? '+' : ''}${day.pnl.toFixed(2)}
                  </p>
                  <p className="text-[10px] text-[#929BA6] mt-0.5">{day.wins} Wins ({Math.round(day.wins/day.count*100)}%)</p>
                </div>
              ) : (
                <p className="text-[10px] text-[#68727D] italic">No trades</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
