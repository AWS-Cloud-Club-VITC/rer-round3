import React from 'react';
import { X, Key, CheckCircle2, Terminal } from 'lucide-react';

interface OrganizerSpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerHiddenFeature: () => void;
}

export const OrganizerSpecsModal: React.FC<OrganizerSpecsModalProps> = ({
  isOpen,
  onClose,
  onTriggerHiddenFeature,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 sm:p-6 animate-fade-in select-none">
      <div className="w-full max-w-2xl bg-white border border-stone-200 rounded-3xl shadow-2xl overflow-hidden text-slate-900 flex flex-col justify-between max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-100 text-sky-800 border border-sky-200 uppercase">
                RER Round 3 — Master Evaluation Reference
              </span>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-1 font-display">
                AQUACITY Challenge Architecture Specs
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-xs text-slate-700 font-sans">
          
          {/* Team Reference */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5 font-mono text-[11px]">
            <span className="font-bold text-slate-900 uppercase">Team Members (Round 3):</span>
            <div className="grid grid-cols-2 gap-2 text-slate-600">
              <div>• Jyotish N</div>
              <div>• Prodhosh VS</div>
              <div>• Devadarrsha P D</div>
              <div>• Pavan S</div>
            </div>
            <div className="pt-2 text-slate-400 text-[10px]">
              Theme: SDG 06 (Clean Water & Sanitation) + SDG 11 (Sustainable Cities)
            </div>
          </div>

          {/* Assigned Challenge: Hidden Feature */}
          <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sky-950 text-sm flex items-center gap-2">
                <Key className="w-4 h-4 text-sky-600" />
                Assigned Challenge: Hidden Feature (Acoustic Leak Detection)
              </span>
              <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                EVALUATION READY
              </span>
            </div>

            <ul className="space-y-1.5 text-slate-600 text-xs list-disc pl-4 leading-relaxed font-mono text-[11px]">
              <li><strong>Discovery Location:</strong> Section 04 ("THE PROBLEM" pipe network animation).</li>
              <li><strong>Subtle Clue:</strong> Zone 04 Pressure Discrepancy node (pulsing red micro-sensor reading 2.1 bar vs 4.8 bar nominal).</li>
              <li><strong>Activation:</strong> Clicking the Zone 04 node triggers the <em>Zone 04 Sub-Surface Diagnostic Mode</em>.</li>
              <li><strong>Interactive Functionality:</strong> Deploying smart isolation valves and auxiliary loop rerouting resolves the leak, recalculates municipal loss, and awards efficiency gains.</li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => {
                  onClose();
                  onTriggerHiddenFeature();
                }}
                className="px-4 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
              >
                Test Trigger Hidden Feature →
              </button>
            </div>
          </div>

          {/* Scoring Rubric Alignment */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 font-mono text-[11px] text-emerald-950 space-y-2">
            <div className="font-bold font-sans flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Evaluation Rubric Allocation:
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-700">
              <div>• Visual Storytelling: 35 Pts</div>
              <div>• Interactive Architecture: 30 Pts</div>
              <div>• Hidden Feature: 20 Pts</div>
              <div>• Code & Build Quality: 15 Pts</div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-stone-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
          >
            Close Specs Window
          </button>
        </div>

      </div>
    </div>
  );
};
