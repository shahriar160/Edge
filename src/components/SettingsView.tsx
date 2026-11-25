import React from 'react';
import { UserProfile } from '../types';
import { Settings as SettingsIcon, Shield, User, Bell, CreditCard } from 'lucide-react';

interface SettingsViewProps {
  profile: UserProfile;
  onUpdateProfile: (p: UserProfile) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ profile, onUpdateProfile }) => {
  const [name, setName] = React.useState(profile.name);
  const [email, setEmail] = React.useState(profile.email);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ ...profile, name, email });
    alert('Settings updated successfully.');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="p-4 rounded-xl bg-[#101318] border border-[#272D35] flex items-center gap-3">
        <SettingsIcon className="w-5 h-5 text-[#00D084]" />
        <div>
          <h2 className="text-base font-bold text-[#F4F6F8]">Platform Settings & Preferences</h2>
          <p className="text-xs text-[#929BA6]">Manage your profile, subscription tier, and trading preferences.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-[#101318] border border-[#272D35] space-y-6">
        <h3 className="text-sm font-bold text-[#F4F6F8]">Personal Profile</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[#929BA6] mb-1">Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="w-full bg-[#15191F] border border-[#272D35] rounded-lg p-2 text-[#F4F6F8]"
            />
          </div>

          <div>
            <label className="block text-[#929BA6] mb-1">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full bg-[#15191F] border border-[#272D35] rounded-lg p-2 text-[#F4F6F8]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-[#272D35]">
          <button 
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-[#00D084] text-[#0B0D10] font-bold text-xs hover:bg-[#00c785]"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
