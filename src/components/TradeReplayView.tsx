import React, { useState } from 'react';
import { PlaySquare, Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';

export const TradeReplayView: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState('1x');
  const [candleIndex, setCandleIndex] = useState(42);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 rounded-xl bg-[#101318] border border-[#272D35]">
        <div className="flex items-center gap-3">
          <PlaySquare className="w-5 h-5 text-[#00D084]" />
          <div>
            <h2 className="text-base font-bold text-[#F4F6F8]">Historical Trade Replay Simulator</h2>
            <p className="text-xs text-[#929BA6]">Practice your execution and backtest strategies candle by candle.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={speed} 
            onChange={e => setSpeed(e.target.value)}
            className="bg-[#15191F] border border-[#272D35] rounded-lg px-3 py-1.5 text-xs text-[#F4F6F8]"
          >
            <option value="1x">1x Speed</option>
            <option value="2x">2x Speed</option>
            <option value="5x">5x Speed</option>
          </select>
        </div>
      </div>

      {/* Simulator Candlestick Window */}
      <div className="p-6 rounded-2xl bg-[#101318] border border-[#272D35] space-y-4">
        <div className="h-96 w-full rounded-xl bg-[#15191F] border border-[#272D35] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#272D35_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="text-center z-10">
            <p className="text-sm font-mono text-[#00D084] font-bold">XAU/USD 15M Replay - Candle {candleIndex} / 120</p>
            <p className="text-xs text-[#929BA6] mt-1">Use playback controls below to advance historical price action.</p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-4 py-2">
          <button 
            onClick={() => setCandleIndex(Math.max(1, candleIndex - 5))}
            className="p-2.5 rounded-xl bg-[#15191F] border border-[#272D35] text-[#F4F6F8] hover:border-[#00D084]"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 rounded-xl bg-[#00D084] text-[#0B0D10] font-bold hover:bg-[#00c785]"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => setCandleIndex(Math.min(120, candleIndex + 5))}
            className="p-2.5 rounded-xl bg-[#15191F] border border-[#272D35] text-[#F4F6F8] hover:border-[#00D084]"
          >
            <SkipForward className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setCandleIndex(1)}
            className="p-2.5 rounded-xl bg-[#15191F] border border-[#272D35] text-[#929BA6] hover:text-[#F4F6F8]"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
