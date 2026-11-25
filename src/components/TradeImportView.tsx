import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface TradeImportViewProps {
  onImportComplete: () => void;
}

export const TradeImportView: React.FC<TradeImportViewProps> = ({ onImportComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [fileSelected, setFileSelected] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="p-4 rounded-xl bg-[#101318] border border-[#272D35] flex items-center gap-3">
        <UploadCloud className="w-5 h-5 text-[#00D084]" />
        <div>
          <h2 className="text-base font-bold text-[#F4F6F8]">Professional Broker & CSV Trade Import</h2>
          <p className="text-xs text-[#929BA6]">Import execution statements from MetaTrader 4/5, TradingView, or generic CSV exports.</p>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-[#101318] border border-[#272D35] text-center space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div 
              onClick={() => {
                setFileSelected(true);
                setStep(2);
              }}
              className="border-2 border-dashed border-[#272D35] rounded-2xl p-12 hover:border-[#00D084] cursor-pointer transition-all bg-[#15191F]/50"
            >
              <FileText className="w-12 h-12 text-[#00D084] mx-auto mb-3" />
              <p className="text-sm font-bold text-[#F4F6F8]">Drop your CSV statement here, or browse files</p>
              <p className="text-xs text-[#929BA6] mt-1">Supports MT4, MT5, cTrader, TradingView, and generic CSV</p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 text-left">
            <h3 className="text-sm font-bold text-[#F4F6F8]">Column Mapping & Validation</h3>
            <p className="text-xs text-[#929BA6]">Detected 24 trades in statement. Map columns correctly before final confirmation.</p>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#15191F] rounded-lg border border-[#272D35]">
                <span className="text-[#929BA6] block mb-1">Date Column</span>
                <span className="font-bold text-[#F4F6F8]">Column A (Open Time)</span>
              </div>
              <div className="p-3 bg-[#15191F] rounded-lg border border-[#272D35]">
                <span className="text-[#929BA6] block mb-1">Instrument Column</span>
                <span className="font-bold text-[#F4F6F8]">Column B (Symbol)</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button 
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-lg bg-[#00D084] text-[#0B0D10] font-bold text-xs hover:bg-[#00c785]"
              >
                Confirm & Import Trades
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 py-8">
            <CheckCircle2 className="w-16 h-16 text-[#00D084] mx-auto" />
            <h3 className="text-lg font-bold text-[#F4F6F8]">Import Successful!</h3>
            <p className="text-xs text-[#929BA6]">24 trades have been successfully imported and analyzed into your active account.</p>
            <button 
              onClick={onImportComplete}
              className="px-6 py-2.5 rounded-lg bg-[#00D084] text-[#0B0D10] font-bold text-xs hover:bg-[#00c785]"
            >
              Go to Trade Journal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
