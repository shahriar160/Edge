import React from 'react';
import { JournalEntry } from '../types';
import { FileText, Plus } from 'lucide-react';

interface JournalViewProps {
  entries: JournalEntry[];
}

export const JournalView: React.FC<JournalViewProps> = ({ entries }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 rounded-xl bg-[#101318] border border-[#272D35]">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-[#00D084]" />
          <h2 className="text-base font-bold text-[#F4F6F8]">Daily Journal & Reflections</h2>
        </div>
        <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#00D084] text-[#0B0D10] text-xs font-bold hover:bg-[#00c785]">
          <Plus className="w-4 h-4" />
          <span>New Journal Entry</span>
        </button>
      </div>

      <div className="space-y-4">
        {entries.map(entry => (
          <div key={entry.id} className="p-6 rounded-2xl bg-[#101318] border border-[#272D35] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#4C8DFF]/15 text-[#4C8DFF]">{entry.category}</span>
                <h3 className="text-sm font-bold text-[#F4F6F8] mt-1">{entry.title}</h3>
              </div>
              <span className="text-xs text-[#929BA6] font-mono">{entry.date}</span>
            </div>
            <p className="text-xs text-[#929BA6] leading-relaxed">{entry.content}</p>
            <div className="flex items-center gap-2 pt-2 border-t border-[#272D35]">
              <span className="text-xs font-semibold text-[#00D084]">Mood: {entry.mood}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
