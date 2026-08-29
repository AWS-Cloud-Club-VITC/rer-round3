import React from 'react';
import { ShieldAlert, CheckCircle2, ArrowLeft, Key } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export const HiddenFeatureOrganizerRoute: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#faf9f5] p-6 lg:p-12 text-slate-900 font-sans space-y-12 max-w-5xl mx-auto">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 uppercase cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to AQUACITY Main Site</span>
        </button>

        <span className="text-xs font-mono font-bold text-rose-700 uppercase tracking-widest border-b border-rose-300 pb-0.5">
          RER ROUND 3 · ORGANIZER ROUTE
        </span>
      </div>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-600">
          <Key className="w-4 h-4" />
          <span>SDG 06 HIDDEN FEATURE CHALLENGE SPECIFICATION</span>
        </div>
        <h1 className="text-4xl font-black text-slate-950">Acoustic Leak Detection Mode Guide</h1>
        <p className="text-slate-600 text-base font-light">
          Organizer & Judge reference for evaluating participant discovery of the hidden leak detection feature in AQUACITY.
        </p>
      </div>

      {/* Feature Details (No Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-xs font-mono border-t border-slate-200 pt-8">
        <div className="space-y-3 border-l-2 border-rose-600 pl-6">
          <h2 className="font-bold text-slate-900 text-sm font-sans uppercase flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            Clue & Activation Hotspot
          </h2>
          <p className="text-slate-700 leading-relaxed font-sans text-xs">
            Under <strong>Section 03: The Problem</strong> ("THE CITY LOSES WATER"), there is a flowing water pipe stream.
          </p>
          <div className="text-rose-700 font-bold font-mono">
            Subtle Clue: Pulsing red indicator on [ PRESSURE ANOMALY DETECTED ] pipe node.
          </div>
        </div>

        <div className="space-y-3 border-l-2 border-emerald-600 pl-6">
          <h2 className="font-bold text-slate-900 text-sm font-sans uppercase flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Expected Revealed Behavior
          </h2>
          <ul className="space-y-2 text-slate-700 font-sans text-xs">
            <li>• Traces blue/red leaking flow line along the pipe.</li>
            <li>• Reveals 1,240,000 L/day estimated water loss telemetry.</li>
            <li>• Exposes network pressure (4.2 Bar) & acoustic frequency (840 Hz).</li>
            <li>• Displays isolation status (VALVE SHUT / REROUTED).</li>
          </ul>
        </div>
      </div>

      {/* Judging Criteria */}
      <div className="space-y-4 border-t border-slate-200 pt-8 font-mono text-xs">
        <h2 className="font-bold text-slate-900 text-sm font-sans uppercase">RER Round 3 Scoring Checklist (100 Pts Total)</h2>
        <div className="grid grid-cols-2 gap-6 text-slate-700">
          <div>• Visual Accuracy: 30 Pts</div>
          <div>• Functionality: 25 Pts</div>
          <div>• Responsive Layout: 20 Pts</div>
          <div>• Hidden Leak Discovery: 15 Pts</div>
          <div>• Code Quality: 10 Pts</div>
        </div>
      </div>

    </div>
  );
};
