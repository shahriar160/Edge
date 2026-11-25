import React from 'react';
import { PlaybookSetup } from '../types';
import { BookmarkCheck, Plus, CheckSquare } from 'lucide-react';

interface PlaybookViewProps {
  playbooks: PlaybookSetup[];
}

export const PlaybookView: React.FC<PlaybookViewProps> = ({ playbooks }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 rounded-xl bg-[#101318] border border-[#272D35]">
        <div className="flex items-center gap-3">
          <BookmarkCheck className="w-5 h-5 text-[#00D084]" />
          <h2 className="text-base font-bold text-[#F4F6F8]">Visual Strategy Playbook</h2>
        </div>
        <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#00D084] text-[#0B0D10] text-xs font-bold hover:bg-[#00c785]">
          <Plus className="w-4 h-4" />
          <span>Add Playbook Setup</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {playbooks.map(pb => (
          <div key={pb.id} className="p-6 rounded-2xl bg-[#101318] border border-[#272D35] space-y-4">
            <h3 className="text-sm font-bold text-[#F4F6F8]">{pb.strategyName}</h3>
            <p className="text-xs text-[#929BA6]">{pb.setupDescription}</p>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-[#F4F6F8]">Pre-Trade Checklist:</p>
              {pb.checklist.map(item => (
                <div key={item.id} className="flex items-center gap-2 text-xs text-[#929BA6]">
                  <CheckSquare className="w-4 h-4 text-[#00D084]" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {pb.screenshots[0] && (
              <div className="rounded-xl overflow-hidden border border-[#272D35]">
                <img src={pb.screenshots[0]} alt="Setup" className="w-full h-40 object-cover" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
