import React from 'react';
import { Trade } from '../types';
import { ArrowLeft, CheckCircle2, XCircle, Upload, Smile, Tag, Shield } from 'lucide-react';

interface TradeDetailViewProps {
  trade: Trade;
  onBack: () => void;
  onUpdateTrade: (trade: Trade) => void;
}

export const TradeDetailView: React.FC<TradeDetailViewProps> = ({
  trade,
  onBack,
  onUpdateTrade,
}) => {
  const [activeSubTab, setActiveSubTab] = React.useState<'overview' | 'review' | 'psychology' | 'screenshots'>('overview');
  const [notes, setNotes] = React.useState(trade.notes || '');

  const handleSaveNotes = () => {
    onUpdateTrade({ ...trade, notes });
    alert('Trade notes updated successfully.');
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#15191F] border border-[#272D35] text-xs font-semibold text-[#929BA6] hover:text-[#F4F6F8]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Journal</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#929BA6]">ID: {trade.id}</span>
          <span className={`px-2 py-0.5 rounded text-xs font-bold ${trade.netPnl >= 0 ? 'bg-[#00D084]/15 text-[#00D084]' : 'bg-[#FF4D5E]/15 text-[#FF4D5E]'}`}>
            {trade.netPnl >= 0 ? '+' : ''}${trade.netPnl.toFixed(2)} ({trade.rMultiple}R)
          </span>
        </div>
      </div>

      {/* Header card */}
      <div className="p-6 rounded-2xl bg-[#101318] border border-[#272D35] grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <p className="text-xs text-[#929BA6] mb-1">Instrument & Direction</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#F4F6F8]">{trade.instrument}</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${trade.direction === 'Long' ? 'bg-[#00D084]/15 text-[#00D084]' : 'bg-[#FF4D5E]/15 text-[#FF4D5E]'}`}>
              {trade.direction}
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs text-[#929BA6] mb-1">Entry / Exit Price</p>
          <p className="text-sm font-mono font-bold text-[#F4F6F8]">{trade.entryPrice} → {trade.exitPrice}</p>
        </div>

        <div>
          <p className="text-xs text-[#929BA6] mb-1">Strategy</p>
          <p className="text-sm font-bold text-[#4C8DFF] truncate">{trade.strategy}</p>
        </div>

        <div>
          <p className="text-xs text-[#929BA6] mb-1">Emotion & Setup</p>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#15191F] text-xs font-semibold text-[#F4F6F8]">{trade.emotion}</span>
            <span className="px-2 py-0.5 rounded bg-[#00D084]/15 text-xs font-bold text-[#00D084]">{trade.setupQuality}</span>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-[#272D35] pb-2">
        <button 
          onClick={() => setActiveSubTab('overview')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${activeSubTab === 'overview' ? 'bg-[#00D084]/15 text-[#00D084]' : 'text-[#929BA6] hover:text-[#F4F6F8]'}`}
        >
          Trade Chart & Metrics
        </button>
        <button 
          onClick={() => setActiveSubTab('review')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${activeSubTab === 'review' ? 'bg-[#00D084]/15 text-[#00D084]' : 'text-[#929BA6] hover:text-[#F4F6F8]'}`}
        >
          Review & Questionnaire
        </button>
        <button 
          onClick={() => setActiveSubTab('psychology')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${activeSubTab === 'psychology' ? 'bg-[#00D084]/15 text-[#00D084]' : 'text-[#929BA6] hover:text-[#F4F6F8]'}`}
        >
          Psychology & Mistakes
        </button>
        <button 
          onClick={() => setActiveSubTab('screenshots')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${activeSubTab === 'screenshots' ? 'bg-[#00D084]/15 text-[#00D084]' : 'text-[#929BA6] hover:text-[#F4F6F8]'}`}
        >
          Chart Screenshots
        </button>
      </div>

      {/* Tab Content */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#101318] border border-[#272D35]">
            <h3 className="text-sm font-bold text-[#F4F6F8] mb-4">Executed Price Action Chart</h3>
            <div className="h-80 w-full rounded-xl bg-[#15191F] border border-[#272D35] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#272D35_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="text-center z-10">
                <p className="text-sm font-mono text-[#00D084] font-bold">Entry: {trade.entryPrice} | Exit: {trade.exitPrice}</p>
                <p className="text-xs text-[#929BA6] mt-1">Interactive candlestick playback & price markers loaded successfully.</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#101318] border border-[#272D35]">
            <h3 className="text-sm font-bold text-[#F4F6F8] mb-3">Trade Notes & Reflections</h3>
            <textarea 
              rows={4}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full bg-[#15191F] border border-[#272D35] rounded-xl p-3 text-xs text-[#F4F6F8] mb-3"
            />
            <button 
              onClick={handleSaveNotes}
              className="px-4 py-2 rounded-lg bg-[#00D084] text-[#0B0D10] text-xs font-bold hover:bg-[#00c785]"
            >
              Save Notes
            </button>
          </div>
        </div>
      )}

      {activeSubTab === 'review' && (
        <div className="p-6 rounded-2xl bg-[#101318] border border-[#272D35] space-y-6">
          <h3 className="text-sm font-bold text-[#F4F6F8]">Trade Review Questionnaire</h3>
          
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-[#15191F] border border-[#272D35] flex items-center justify-between">
              <span>Was the setup valid according to your playbook?</span>
              <span className="px-3 py-1 rounded bg-[#00D084]/15 text-[#00D084] font-bold">Yes</span>
            </div>

            <div className="p-4 rounded-xl bg-[#15191F] border border-[#272D35] flex items-center justify-between">
              <span>Did you follow your risk management rules?</span>
              <span className="px-3 py-1 rounded bg-[#00D084]/15 text-[#00D084] font-bold">Yes</span>
            </div>

            <div className="p-4 rounded-xl bg-[#15191F] border border-[#272D35]">
              <p className="font-semibold text-[#F4F6F8] mb-1">Lessons Learned & Key Takeaways:</p>
              <p className="text-[#929BA6]">{trade.review?.lessonsLearned || 'No review notes recorded yet.'}</p>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'psychology' && (
        <div className="p-6 rounded-2xl bg-[#101318] border border-[#272D35] space-y-4">
          <h3 className="text-sm font-bold text-[#F4F6F8]">Psychology & Mistakes Log</h3>
          <div className="p-4 rounded-xl bg-[#15191F] border border-[#272D35]">
            <p className="text-xs text-[#929BA6] mb-1">Emotional State During Trade</p>
            <p className="text-sm font-bold text-[#00D084]">{trade.emotion}</p>
          </div>
          {trade.mistakes && trade.mistakes.length > 0 && (
            <div className="p-4 rounded-xl bg-[#FF4D5E]/10 border border-[#FF4D5E]/30">
              <p className="text-xs font-bold text-[#FF4D5E] mb-2">Recorded Mistakes:</p>
              <ul className="list-disc list-inside text-xs text-[#F4F6F8] space-y-1">
                {trade.mistakes.map((m, idx) => <li key={idx}>{m}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'screenshots' && (
        <div className="p-6 rounded-2xl bg-[#101318] border border-[#272D35] space-y-6">
          <h3 className="text-sm font-bold text-[#F4F6F8]">Attached Chart Screenshots</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trade.screenshots.before && (
              <div className="rounded-xl overflow-hidden border border-[#272D35] bg-[#15191F]">
                <img src={trade.screenshots.before} alt="Before Trade" className="w-full h-48 object-cover" />
                <div className="p-3 text-xs font-semibold text-[#929BA6]">Before Trade Entry</div>
              </div>
            )}
            <div className="rounded-xl border border-dashed border-[#272D35] p-8 flex flex-col items-center justify-center text-center hover:border-[#00D084] cursor-pointer">
              <Upload className="w-8 h-8 text-[#929BA6] mb-2" />
              <p className="text-xs font-semibold text-[#F4F6F8]">Upload New Screenshot</p>
              <p className="text-[10px] text-[#929BA6] mt-1">PNG, JPG up to 10MB</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
