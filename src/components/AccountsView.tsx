import React from 'react';
import { Account } from '../types';
import { Wallet, Plus, Check } from 'lucide-react';

interface AccountsViewProps {
  accounts: Account[];
  selectedAccount: Account;
  onSelectAccount: (acc: Account) => void;
}

export const AccountsView: React.FC<AccountsViewProps> = ({
  accounts,
  selectedAccount,
  onSelectAccount,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 rounded-xl bg-[#101318] border border-[#272D35]">
        <div className="flex items-center gap-3">
          <Wallet className="w-5 h-5 text-[#00D084]" />
          <h2 className="text-base font-bold text-[#F4F6F8]">Trading Accounts Management</h2>
        </div>
        <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#00D084] text-[#0B0D10] text-xs font-bold hover:bg-[#00c785]">
          <Plus className="w-4 h-4" />
          <span>Add Account</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accounts.map(acc => {
          const isSelected = acc.id === selectedAccount.id;
          return (
            <div 
              key={acc.id} 
              onClick={() => onSelectAccount(acc)}
              className={`p-6 rounded-2xl bg-[#101318] border transition-all cursor-pointer ${isSelected ? 'border-[#00D084] bg-[#00D084]/5' : 'border-[#272D35] hover:border-[#00D084]/50'}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#15191F] text-[#929BA6]">{acc.type}</span>
                {isSelected && (
                  <span className="flex items-center gap-1 text-xs font-bold text-[#00D084]">
                    <Check className="w-3.5 h-3.5" /> Active Account
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-[#F4F6F8] mb-1">{acc.name}</h3>
              <p className="text-xs text-[#929BA6] mb-4">Broker: {acc.broker}</p>

              <div className="flex items-baseline justify-between pt-4 border-t border-[#272D35]">
                <div>
                  <p className="text-[10px] text-[#929BA6]">Current Balance</p>
                  <p className="text-xl font-mono font-bold text-[#00D084]">${acc.currentBalance.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#929BA6]">Initial Capital</p>
                  <p className="text-sm font-mono text-[#F4F6F8]">${acc.initialBalance.toLocaleString()}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
