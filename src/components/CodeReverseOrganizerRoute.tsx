import React from 'react';
import { Terminal, CheckCircle2, ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export const CodeReverseOrganizerRoute: React.FC<Props> = ({ onBack }) => {
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

        <span className="text-xs font-mono font-bold text-sky-800 uppercase tracking-widest border-b border-sky-300 pb-0.5">
          RER ROUND 3 · ORGANIZER ROUTE
        </span>
      </div>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-700">
          <Terminal className="w-4 h-4" />
          <span>SDG 06 CODE REVERSE ENGINEERING SPECIFICATION</span>
        </div>
        <h1 className="text-4xl font-black text-slate-950">Water Efficiency Score Calculation Engine</h1>
        <p className="text-slate-600 text-base font-light">
          Organizer & Judge reference for the Code Reverse Engineering challenge formula, variables, test cases, and calculation logic.
        </p>
      </div>

      {/* Formula & Variables (No Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-xs font-mono border-t border-slate-200 pt-8">
        <div className="space-y-4 border-l-2 border-sky-600 pl-6">
          <h2 className="font-bold text-slate-900 text-sm font-sans uppercase">Formula Breakdown</h2>
          <div className="text-lg font-bold text-sky-800">
            Score = Base(55) + (Recycling ? 15 : 0) + (Rainwater ? 12 : 0) + (Leakage ? 14 : 0)
          </div>
          <p className="text-slate-600 text-[11px] font-sans">
            The score dynamically evaluates infrastructure solution choices on the AQUACITY website. Maximum score capped at 96%.
          </p>
        </div>

        <div className="space-y-4 border-l-2 border-teal-600 pl-6">
          <h2 className="font-bold text-slate-900 text-sm font-sans uppercase">Variables & Weights</h2>
          <ul className="space-y-2 text-slate-700 font-mono text-xs">
            <li>• <strong className="text-slate-900">baseScore:</strong> 55%</li>
            <li>• <strong className="text-sky-700">waterRecycling:</strong> +15%</li>
            <li>• <strong className="text-cyan-700">rainwaterHarvesting:</strong> +12%</li>
            <li>• <strong className="text-teal-700 font-bold">leakDetection:</strong> +14%</li>
          </ul>
        </div>
      </div>

      {/* Test Cases Table */}
      <div className="space-y-4 border-t border-slate-200 pt-8">
        <h2 className="font-bold text-slate-900 text-sm font-sans uppercase">Validation Test Cases</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-300 text-slate-500 uppercase">
                <th className="py-3 px-2">Test Case</th>
                <th className="py-3 px-2">Recycling</th>
                <th className="py-3 px-2">Rainwater</th>
                <th className="py-3 px-2">Leak Detection</th>
                <th className="py-3 px-2 text-right">Expected Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="py-3 px-2 font-bold text-slate-900">1. Baseline (All OFF)</td>
                <td className="py-3 px-2 text-rose-600 font-bold">false</td>
                <td className="py-3 px-2 text-rose-600 font-bold">false</td>
                <td className="py-3 px-2 text-rose-600 font-bold">false</td>
                <td className="py-3 px-2 text-right font-bold text-slate-900">55%</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-bold text-slate-900">2. Recycling Only</td>
                <td className="py-3 px-2 text-emerald-600 font-bold">true</td>
                <td className="py-3 px-2 text-rose-600 font-bold">false</td>
                <td className="py-3 px-2 text-rose-600 font-bold">false</td>
                <td className="py-3 px-2 text-right font-bold text-slate-900">70%</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-bold text-slate-900">3. Recycling + Leak Detection</td>
                <td className="py-3 px-2 text-emerald-600 font-bold">true</td>
                <td className="py-3 px-2 text-rose-600 font-bold">false</td>
                <td className="py-3 px-2 text-emerald-600 font-bold">true</td>
                <td className="py-3 px-2 text-right font-bold text-slate-900">84%</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-bold text-slate-900">4. All Solutions Active</td>
                <td className="py-3 px-2 text-emerald-600 font-bold">true</td>
                <td className="py-3 px-2 text-emerald-600 font-bold">true</td>
                <td className="py-3 px-2 text-emerald-600 font-bold">true</td>
                <td className="py-3 px-2 text-right font-bold text-emerald-600">96%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200 flex items-center gap-2 text-xs text-emerald-800 font-mono">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
        <span>This calculation runs deterministically on the public AQUACITY website under Section 05: Impact.</span>
      </div>
    </div>
  );
};
