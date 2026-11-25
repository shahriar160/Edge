import React, { useState } from 'react';
import { Trade, Account } from '../types';
import { Search, Filter, Download, Trash2, Copy, Eye, Plus, ArrowUpDown } from 'lucide-react';

interface TradeJournalViewProps {
  trades: Trade[];
  selectedAccount: Account;
  onTradeClick: (trade: Trade) => void;
  onAddTradeClick: () => void;
  onDeleteTrade: (id: string) => void;
  onDuplicateTrade: (trade: Trade) => void;
}

export const TradeJournalView: React.FC<TradeJournalViewProps> = ({
  trades,
  selectedAccount,
  onTradeClick,
  onAddTradeClick,
  onDeleteTrade,
  onDuplicateTrade,
}) => {
  const [filterResult, setFilterResult] = useState<string>('All');
  const [filterInstrument, setFilterInstrument] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const accountTrades = trades.filter(t => t.accountId === selectedAccount.id);

  // Filtering
  const filteredTrades = accountTrades.filter(t => {
    const matchesResult = filterResult === 'All' || t.result === filterResult;
    const matchesInstrument = filterInstrument === 'All' || t.instrument === filterInstrument;
    const matchesSearch = searchQuery === '' || 
      t.instrument.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.strategy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesResult && matchesInstrument && matchesSearch;
  });

  const instruments = Array.from(new Set(accountTrades.map(t => t.instrument)));

  const exportCSV = () => {
    const headers = ['ID', 'Date', 'Instrument', 'Direction', 'Entry', 'Exit', 'Net PnL', 'R-Multiple', 'Strategy', 'Result'];
    const rows = filteredTrades.map(t => [t.id, t.date, t.instrument, t.direction, t.entryPrice, t.exitPrice, t.netPnl, t.rMultiple, t.strategy, t.result]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `edge_trades_${selectedAccount.name}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Controls / Filter Bar */}
      <div className="p-4 rounded-xl bg-[#101318] border border-[#272D35] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-[#929BA6] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search instrument, strategy, tags..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#15191F] border border-[#272D35] rounded-lg pl-9 pr-4 py-1.5 text-xs text-[#F4F6F8] focus:outline-none focus:border-[#00D084]"
            />
          </div>

          <select 
            value={filterResult}
            onChange={e => setFilterResult(e.target.value)}
            className="bg-[#15191F] border border-[#272D35] rounded-lg px-3 py-1.5 text-xs text-[#F4F6F8]"
          >
            <option value="All">All Results</option>
            <option value="Win">Wins Only</option>
            <option value="Loss">Losses Only</option>
          </select>

          <select 
            value={filterInstrument}
            onChange={e => setFilterInstrument(e.target.value)}
            className="bg-[#15191F] border border-[#272D35] rounded-lg px-3 py-1.5 text-xs text-[#F4F6F8]"
          >
            <option value="All">All Instruments</option>
            {instruments.map(inst => (
              <option key={inst} value={inst}>{inst}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button 
            onClick={exportCSV}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#15191F] border border-[#272D35] text-xs font-semibold text-[#F4F6F8] hover:border-[#00D084]"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>

          <button 
            onClick={onAddTradeClick}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#00D084] text-[#0B0D10] text-xs font-bold hover:bg-[#00c785]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Trade</span>
          </button>
        </div>
      </div>

      {/* Trades Table */}
      <div className="rounded-2xl bg-[#101318] border border-[#272D35] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#272D35] text-[#929BA6] bg-[#15191F]/50">
                <th className="p-4 font-semibold">Date & Time</th>
                <th className="p-4 font-semibold">Instrument</th>
                <th className="p-4 font-semibold">Direction</th>
                <th className="p-4 font-semibold">Entry / Exit</th>
                <th className="p-4 font-semibold">Strategy</th>
                <th className="p-4 font-semibold">Tags</th>
                <th className="p-4 font-semibold text-right">Net P&L</th>
                <th className="p-4 font-semibold text-right">R-Multiple</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#272D35]/50">
              {filteredTrades.map(trade => (
                <tr key={trade.id} className="hover:bg-[#15191F] transition-colors">
                  <td className="p-4 text-[#929BA6]">
                    <p className="font-semibold text-[#F4F6F8]">{trade.date}</p>
                    <p className="text-[10px]">{trade.time} ({trade.session})</p>
                  </td>
                  <td className="p-4 font-bold text-[#F4F6F8]">{trade.instrument}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${trade.direction === 'Long' ? 'bg-[#00D084]/15 text-[#00D084]' : 'bg-[#FF4D5E]/15 text-[#FF4D5E]'}`}>
                      {trade.direction}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[#929BA6]">
                    <p>{trade.entryPrice}</p>
                    <p>{trade.exitPrice}</p>
                  </td>
                  <td className="p-4 text-[#929BA6] max-w-[180px] truncate">{trade.strategy}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {trade.tags.map((tag, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-[#1B2027] text-[#929BA6] text-[10px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className={`p-4 text-right font-mono font-bold ${trade.netPnl >= 0 ? 'text-[#00D084]' : 'text-[#FF4D5E]'}`}>
                    {trade.netPnl >= 0 ? '+' : ''}${trade.netPnl.toFixed(2)}
                  </td>
                  <td className="p-4 text-right font-mono font-bold text-[#4C8DFF]">
                    {trade.rMultiple}R
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button 
                        onClick={() => onTradeClick(trade)}
                        className="p-1 rounded bg-[#15191F] hover:bg-[#222831] text-[#929BA6] hover:text-[#F4F6F8]"
                        title="Review / Edit"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => onDuplicateTrade(trade)}
                        className="p-1 rounded bg-[#15191F] hover:bg-[#222831] text-[#929BA6] hover:text-[#F4F6F8]"
                        title="Duplicate"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => onDeleteTrade(trade.id)}
                        className="p-1 rounded bg-[#15191F] hover:bg-[#222831] text-[#929BA6] hover:text-[#FF4D5E]"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTrades.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-[#929BA6]">
                    No trades match your current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
