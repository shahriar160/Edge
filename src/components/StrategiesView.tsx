import React from 'react';
import { Strategy } from '../types';
import { Layers, Plus, CheckCircle2 } from 'lucide-react';

interface StrategiesViewProps {
  strategies: Strategy[];
}

export const StrategiesView: React.FC<StrategiesViewProps> = ({ strategies }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 rounded-xl bg-[#101318] border border-[#272D35]">
        <div className="flex items-center gap-3">
          <Layers className="w-5 h-5 text-[#00D084]" />
          <h2 className="text-base font-bold text-[#F4F6F8]">Trading Strategies Manager</h2>
        </div>
        <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#00D084] text-[#0B0D10] text-xs font-bold hover:bg-[#00c785]">
          <Plus className="w-4 h-4" />
          <span>New Strategy</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strategies.map(strat => (
          <div key={strat.id} className="p-6 rounded-2xl bg-[#101318] border border-[#272D35] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#00D084]/15 text-[#00D084]">{strat.instrument}</span>
                <span className="text-xs text-[#929BA6]">{strat.timeframe}</span>
              </div>
              <h3 className="text-sm font-bold text-[#F4F6F8] mb-2">{strat.name}</h3>
              <p className="text-xs text-[#929BA6] mb-4">{strat.description}</p>

              <div className="space-y-2 mb-6">
                <p className="text-xs font-semibold text-[#F4F6F8]">Entry Rules:</p>
                {strat.entryRules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#929BA6]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00D084] mt-0.5 shrink-0" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full py-2 rounded-lg bg-[#15191F] border border-[#272D35] text-xs font-semibold hover:border-[#00D084]">
              View Analytics & Trades
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
