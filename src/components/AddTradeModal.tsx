import React, { useState } from 'react';
import { Account, Trade, TradeDirection, TradeResult, TradingSession } from '../types';
import { X } from 'lucide-react';

interface AddTradeModalProps {
  accounts: Account[];
  selectedAccount: Account;
  onClose: () => void;
  onSaveTrade: (trade: Trade) => void;
}

export const AddTradeModal: React.FC<AddTradeModalProps> = ({
  accounts,
  selectedAccount,
  onClose,
  onSaveTrade,
}) => {
  const [accountId, setAccountId] = useState(selectedAccount.id);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('09:30');
  const [instrument, setInstrument] = useState('XAU/USD');
  const [direction, setDirection] = useState<TradeDirection>('Long');
  const [entryPrice, setEntryPrice] = useState('2700.00');
  const [exitPrice, setExitPrice] = useState('2715.00');
  const [positionSize, setPositionSize] = useState('1.5');
  const [stopLoss, setStopLoss] = useState('2695.00');
  const [takeProfit, setTakeProfit] = useState('2720.00');
  const [commission, setCommission] = useState('5.00');
  const [strategy, setStrategy] = useState('London Opening Range Breakout (ORB)');
  const [session, setSession] = useState<TradingSession>('London');
  const [setupQuality, setSetupQuality] = useState<'A+' | 'A' | 'B' | 'C'>('A+');
  const [emotion, setEmotion] = useState<'Calm' | 'Confident' | 'Fearful' | 'Greedy' | 'Frustrated' | 'Impatient' | 'FOMO' | 'Revenge'>('Calm');
  const [tagsInput, setTagsInput] = useState('Breakout, Clean Execution');
  const [notes, setNotes] = useState('Clean setup with strong momentum.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const entry = parseFloat(entryPrice) || 0;
    const exit = parseFloat(exitPrice) || 0;
    const size = parseFloat(positionSize) || 1;
    const comm = parseFloat(commission) || 0;

    const multiplier = direction === 'Long' ? 1 : -1;
    const grossPnl = (exit - entry) * size * 100 * multiplier;
    const netPnl = grossPnl - comm;
    const result: TradeResult = netPnl > 0 ? 'Win' : netPnl < 0 ? 'Loss' : 'Breakeven';

    const sl = parseFloat(stopLoss) || entry;
    const riskAmount = Math.abs(entry - sl) * size * 100;
    const rMultiple = riskAmount > 0 ? Number((netPnl / riskAmount).toFixed(2)) : 0;

    const newTrade: Trade = {
      id: 't-' + Date.now(),
      accountId,
      date,
      time,
      instrument,
      direction,
      entryPrice: entry,
      exitPrice: exit,
      positionSize: size,
      stopLoss: sl,
      takeProfit: parseFloat(takeProfit) || exit,
      commission: comm,
      swap: 0,
      netPnl: Number(netPnl.toFixed(2)),
      rMultiple,
      strategy,
      session,
      durationMinutes: 45,
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
      result,
      setupQuality,
      emotion,
      notes,
      screenshots: {
        before: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80'
      },
      review: {
        setupValid: true,
        followedRules: true,
        entryRating: 'Good',
        exitRating: 'Good',
        lessonsLearned: 'Executed according to plan.'
      }
    };

    onSaveTrade(newTrade);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white border border-[#E5E7EB] rounded-3xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#86868B] hover:text-[#1D1D1F]"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold mb-1 text-[#1D1D1F]">Add New Trade</h2>
        <p className="text-xs text-[#86868B] mb-6">Manually record your execution details and trade metrics.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#86868B] mb-1">Account</label>
              <select 
                value={accountId} 
                onChange={e => setAccountId(e.target.value)}
                className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-[#1D1D1F]"
              >
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.id}>{acc.name} (${acc.currentBalance.toLocaleString()})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868B] mb-1">Instrument</label>
              <input 
                type="text" 
                value={instrument} 
                onChange={e => setInstrument(e.target.value)} 
                required
                className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-[#1D1D1F]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868B] mb-1">Date</label>
              <input 
                type="date" 
                value={date} 
                onChange={e => setDate(e.target.value)} 
                required
                className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-[#1D1D1F]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868B] mb-1">Time (HH:MM)</label>
              <input 
                type="text" 
                value={time} 
                onChange={e => setTime(e.target.value)} 
                required
                className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-[#1D1D1F]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868B] mb-1">Direction</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDirection('Long')}
                  className={`py-2 rounded-xl text-xs font-bold border transition-colors ${direction === 'Long' ? 'bg-[#00A86B]/10 border-[#00A86B] text-[#00A86B]' : 'bg-[#F5F5F7] border-[#E5E7EB] text-[#86868B]'}`}
                >
                  Long (Buy)
                </button>
                <button
                  type="button"
                  onClick={() => setDirection('Short')}
                  className={`py-2 rounded-xl text-xs font-bold border transition-colors ${direction === 'Short' ? 'bg-[#E03E3E]/10 border-[#E03E3E] text-[#E03E3E]' : 'bg-[#F5F5F7] border-[#E5E7EB] text-[#86868B]'}`}
                >
                  Short (Sell)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868B] mb-1">Session</label>
              <select 
                value={session} 
                onChange={e => setSession(e.target.value as TradingSession)}
                className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-[#1D1D1F]"
              >
                <option value="London">London</option>
                <option value="New York">New York</option>
                <option value="Asian">Asian</option>
                <option value="Overlap">Overlap</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868B] mb-1">Entry Price</label>
              <input 
                type="number" 
                step="any" 
                value={entryPrice} 
                onChange={e => setEntryPrice(e.target.value)} 
                required
                className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-[#1D1D1F]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868B] mb-1">Exit Price</label>
              <input 
                type="number" 
                step="any" 
                value={exitPrice} 
                onChange={e => setExitPrice(e.target.value)} 
                required
                className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-[#1D1D1F]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868B] mb-1">Position Size (Lots/Units)</label>
              <input 
                type="number" 
                step="any" 
                value={positionSize} 
                onChange={e => setPositionSize(e.target.value)} 
                required
                className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-[#1D1D1F]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868B] mb-1">Commission ($)</label>
              <input 
                type="number" 
                step="any" 
                value={commission} 
                onChange={e => setCommission(e.target.value)} 
                className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-[#1D1D1F]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868B] mb-1">Stop Loss</label>
              <input 
                type="number" 
                step="any" 
                value={stopLoss} 
                onChange={e => setStopLoss(e.target.value)} 
                className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-[#1D1D1F]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868B] mb-1">Take Profit</label>
              <input 
                type="number" 
                step="any" 
                value={takeProfit} 
                onChange={e => setTakeProfit(e.target.value)} 
                className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-[#1D1D1F]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868B] mb-1">Strategy</label>
              <input 
                type="text" 
                value={strategy} 
                onChange={e => setStrategy(e.target.value)} 
                className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-[#1D1D1F]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868B] mb-1">Emotional State</label>
              <select 
                value={emotion} 
                onChange={e => setEmotion(e.target.value as any)}
                className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-[#1D1D1F]"
              >
                <option value="Calm">Calm</option>
                <option value="Confident">Confident</option>
                <option value="Fearful">Fearful</option>
                <option value="Greedy">Greedy</option>
                <option value="Frustrated">Frustrated</option>
                <option value="Impatient">Impatient</option>
                <option value="FOMO">FOMO</option>
                <option value="Revenge">Revenge</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#86868B] mb-1">Tags (comma separated)</label>
            <input 
              type="text" 
              value={tagsInput} 
              onChange={e => setTagsInput(e.target.value)} 
              className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-[#1D1D1F]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#86868B] mb-1">Trade Notes & Observations</label>
            <textarea 
              rows={3}
              value={notes} 
              onChange={e => setNotes(e.target.value)} 
              className="w-full bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl p-2.5 text-xs text-[#1D1D1F]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#E5E7EB]">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#F5F5F7] text-[#86868B] hover:text-[#1D1D1F] text-xs font-semibold"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2 rounded-xl bg-[#00A86B] text-white text-xs font-bold hover:bg-[#00875A] shadow-sm"
            >
              Save Trade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
