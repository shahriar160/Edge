import React from 'react';
import { Smile, HeartPulse, Brain, AlertTriangle } from 'lucide-react';

export const PsychologyView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-[#101318] border border-[#272D35] flex items-center gap-3">
        <Smile className="w-5 h-5 text-[#00D084]" />
        <div>
          <h2 className="text-base font-bold text-[#F4F6F8]">Trading Psychology & Emotional Analytics</h2>
          <p className="text-xs text-[#929BA6]">Track your emotional state, discipline ratings, and tilt patterns.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#101318] border border-[#272D35]">
          <h3 className="text-sm font-bold text-[#F4F6F8] mb-3">Emotion Breakdown</h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-[#00D084]">Calm / Focused</span>
              <span className="font-bold">72% win rate</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#FF4D5E]">FOMO / Impatient</span>
              <span className="font-bold">31% win rate</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#FF4D5E]">Revenge Trading</span>
              <span className="font-bold">14% win rate</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#101318] border border-[#272D35]">
          <h3 className="text-sm font-bold text-[#F4F6F8] mb-3">Average Discipline Rating</h3>
          <p className="text-3xl font-extrabold font-mono text-[#00D084] mb-2">8.4 / 10</p>
          <p className="text-xs text-[#929BA6]">Based on recent journal entries and rule adherence.</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#101318] border border-[#272D35]">
          <h3 className="text-sm font-bold text-[#F4F6F8] mb-3">Sleep & Focus Correlation</h3>
          <p className="text-xs text-[#929BA6]">Traders who sleep 7+ hours show a <span className="text-[#00D084] font-bold">+24% higher profit factor</span> than sleep-deprived sessions.</p>
        </div>
      </div>
    </div>
  );
};
