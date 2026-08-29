import React from 'react';
import { X, ShieldAlert, Key, CheckCircle2, Terminal } from 'lucide-react';

interface OrganizerSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrganizerSupportModal: React.FC<OrganizerSupportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-fade-in">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800 border border-blue-300 uppercase">
                RER Round 3 — Organizer & Judge Reference
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                CivicFlow — Hidden Feature Challenge Specification
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Team Details */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 text-slate-700">
          <div className="font-bold text-slate-900">Team Members (Round 3):</div>
          <div className="grid grid-cols-2 gap-2 font-mono text-[11px] text-slate-600">
            <div>• Jyotish N</div>
            <div>• Prodhosh VS</div>
            <div>• Devadarrsha P D</div>
            <div>• Pavan S</div>
          </div>
        </div>

        {/* Hidden Feature Specs */}
        <div className="mt-5 space-y-4 text-xs text-slate-700">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
            <Key className="w-4 h-4 text-blue-600" />
            Hidden Feature Discovery & Activation Guide
          </h3>

          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
            <div className="font-bold text-blue-950 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Primary Activation Clue:
            </div>
            <p className="text-slate-700">
              The status indicator in the top header and sidebar displays <code className="bg-white px-1.5 py-0.5 rounded border text-blue-900 font-mono">● GRID SYNCHRONIZED</code> or <code className="bg-white px-1.5 py-0.5 rounded border text-blue-900 font-mono">All systems operational</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              Tactical Incident Response Mode (Hidden Feature):
            </div>
            <ul className="space-y-1.5 font-mono text-[11px] text-slate-600 list-disc pl-4">
              <li><strong>Activation:</strong> Click the system status indicator in the header or sidebar.</li>
              <li><strong>Transition:</strong> Smooth blue pulse / ripple overlay transition into Tactical Incident Mode.</li>
              <li><strong>Telemetry Exposed:</strong> Active Incident (Power Grid Instability - Metro Core, 91% Grid Load, Emergency Routing ACTIVE).</li>
              <li><strong>Interactive Controls:</strong> Emergency Routing [ACTIVE], Grid Priority [Metro Core], Response Level [HIGH], Sectors Lockdown, Emergency Sirens.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2 font-mono text-[11px]">
            <div className="font-bold text-emerald-900 flex items-center gap-1.5 font-sans">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Evaluation Criteria Alignment (100 Pts):
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-700">
              <div>• Visual Accuracy: 30 Pts</div>
              <div>• Functionality: 25 Pts</div>
              <div>• Layout & Responsiveness: 20 Pts</div>
              <div>• Hidden Details: 15 Pts</div>
              <div>• Code Quality: 10 Pts</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
          >
            Close Specs Window
          </button>
        </div>
      </div>
    </div>
  );
};
