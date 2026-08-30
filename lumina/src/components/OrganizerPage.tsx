import React from 'react';
import {
  CheckCircle2,
  FileCode,
  Award,
  ArrowLeft,
  Building2,
  SunMedium,
  BookOpen,
  Zap,
} from 'lucide-react';

interface OrganizerPageProps {
  onBackToApp: () => void;
}

export const OrganizerPage: React.FC<OrganizerPageProps> = ({ onBackToApp }) => {
  const rubrics = [
    {
      category: '1. Energy Generation & Available Supply Logic',
      marks: 15,
      description:
        'Participant identifies that Available Energy = Solar Generation + Battery Discharge + Constant Base Grid Feed (350 kWh).',
      keyCheck: 'Available = Solar + Battery + 350 kWh',
    },
    {
      category: '2. Infrastructure Priority Hierarchy Logic',
      marks: 20,
      description:
        'Participant discovers the strict 5-tier priority sequence: P1 Hospitals (Highest) → P2 Transit → P3 Lighting → P4 Residential → P5 Offices (Lowest).',
      keyCheck: 'Priority order: Hospital > Transit > Lighting > Residential > Offices',
    },
    {
      category: '3. Allocation & Dependency Waterfall Logic',
      marks: 20,
      description:
        'Participant explains that higher tiers receive 100% demand before remaining power cascades downstream; partial power is given to the boundary tier, and remaining downstream tiers are completely shed (0% / offline).',
      keyCheck: 'Sequential waterfall allocation with boundary partial allocation',
    },
    {
      category: '4. City Energy Resilience Score Logic',
      marks: 20,
      description:
        'Participant breaks down the 0–100 resilience composite: Weighted Infrastructure Preservation (up to 60 pts) + Clean Energy Share (up to 25 pts) + Battery Reserve Buffer (up to 15 pts) minus Critical Infrastructure Failure Penalties.',
      keyCheck: 'Composite of weighted powered fraction + clean share + battery margin',
    },
    {
      category: '5. State & Interaction Understanding',
      marks: 10,
      description:
        'Participant demonstrates how slider inputs propagate through simulateEnergyGrid() to trigger immediate deterministic updates across the city, energy flow, and crisis telemetry.',
      keyCheck: 'Deterministic reactive state pipeline without random numbers',
    },
    {
      category: '6. Threshold & Time Behavior',
      marks: 5,
      description:
        'Participant understands how diurnal phases (DAWN, DAYLIGHT, DUSK, NIGHT) and threshold states (OPTIMAL, BALANCED, STRAINED, CRITICAL) react to grid conditions.',
      keyCheck: 'Threshold state triggers tied to shortfall & critical tier fulfillment',
    },
    {
      category: '7. Code Reasoning & Technical Walkthrough',
      marks: 10,
      description:
        'Participant provides a clear, structured technical explanation of src/utils/energyEngine.ts during the 3-minute challenge evaluation.',
      keyCheck: 'Clarity of technical verbalization and reverse-engineering confidence',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans py-12 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Top Circuit Bar */}
        <div className="flex items-center justify-between border-b border-[#222222] pb-4">
          <button
            type="button"
            onClick={onBackToApp}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#888888] hover:text-[#00A8FF] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← RETURN TO LUMINA CONTROL SYSTEM</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-[#888888]">
            <Zap className="w-3.5 h-3.5 text-[#00A8FF] animate-pulse" />
            <span className="font-extrabold uppercase tracking-widest text-white">
              ORGANIZER & JUDGE EVALUATION PORTAL
            </span>
          </div>
        </div>

        {/* Title Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-[#00A8FF] font-bold tracking-wider uppercase">
            <span>RER ROUND 3 • CODE REVERSE ENGINEERING</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight uppercase">
            LUMINA — EVALUATION RUBRIC
          </h1>
          <p className="text-[#888888] text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
            Marking breakdown, deterministic formulas, and expected solution guide for the 3-minute reverse-engineering challenge.
          </p>

          {/* SDG Badges */}
          <div className="flex flex-wrap items-center gap-6 pt-2 font-mono text-xs text-[#666666]">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#FFB000]" />
              <span>SDG 11: Sustainable Cities & Communities</span>
            </div>
            <div className="flex items-center gap-2">
              <SunMedium className="w-4 h-4 text-[#00A8FF]" />
              <span>SDG 7: Affordable & Clean Energy</span>
            </div>
          </div>
        </div>

        {/* Challenge Overview */}
        <div className="border-t border-b border-[#222222] py-6 space-y-4 font-mono text-xs">
          <div className="flex items-center gap-2 font-bold text-white uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-[#00A8FF]" />
            <span>Challenge Overview & Target</span>
          </div>
          <p className="text-[#888888] font-sans text-xs sm:text-sm leading-relaxed">
            Participants interact with the Lumina urban energy platform, observing changes in energy generation, BESS storage, load shedding, and resilience scoring. They must inspect the codebase to discover the exact deterministic formulas governing the system.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div>
              <span className="text-[#666666] text-[10px] block uppercase">Target Source File</span>
              <strong className="text-[#00A8FF] text-xs">src/utils/energyEngine.ts</strong>
            </div>
            <div>
              <span className="text-[#666666] text-[10px] block uppercase">Target Duration</span>
              <strong className="text-[#00FF88] text-xs">~3 Minutes</strong>
            </div>
            <div>
              <span className="text-[#666666] text-[10px] block uppercase">Target Audience</span>
              <strong className="text-white text-xs">Freshers (Beginner → Intermediate)</strong>
            </div>
          </div>
        </div>

        {/* Marks Breakdown Section */}
        <div className="space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#222222] pb-3">
            <div className="flex items-center gap-2 font-bold text-white uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#00FF88]" />
              <span>Evaluation Rubric (100 Total Marks)</span>
            </div>
            <strong className="text-[#00FF88] font-black text-sm">
              TOTAL: 100 MARKS
            </strong>
          </div>

          <div className="space-y-6">
            {rubrics.map((item, index) => (
              <div key={index} className="space-y-1.5 border-b border-[#1A1A1A] pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="font-bold text-sm text-white">
                    {item.category}
                  </h4>
                  <span className="font-black text-[#00A8FF]">
                    {item.marks} Marks
                  </span>
                </div>
                <p className="text-[#888888] font-sans text-xs leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-[#666666] pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF88] shrink-0" />
                  <span>Key Check: <strong className="text-white">{item.keyCheck}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expected Solution Reference */}
        <div className="space-y-6 font-mono text-xs border-t border-[#222222] pt-6">
          <div className="flex items-center gap-2 font-bold text-white uppercase tracking-wider">
            <FileCode className="w-4 h-4 text-[#00A8FF]" />
            <span>Deterministic Solution Reference (src/utils/energyEngine.ts)</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[#00A8FF] font-bold block">1. Available Supply Formula:</span>
              <pre className="text-white text-[11px] overflow-x-auto bg-[#0F0F0F] border border-[#1E1E1E] p-3 rounded-none">
                availableEnergyKwh = solarGenerationKwh + batteryReserveKwh + 350 (Base Grid)
              </pre>
            </div>

            <div className="space-y-1">
              <span className="text-[#00FF88] font-bold block">2. Infrastructure Demands & Criticality:</span>
              <ul className="text-[#888888] text-[11px] space-y-1 list-disc pl-4 font-sans">
                <li><strong className="text-white">Tier 1: HOSPITALS & EMERGENCY</strong> (220 kWh) • Criticality: 1.0 (Highest)</li>
                <li><strong className="text-white">Tier 2: PUBLIC TRANSIT & MONORAIL</strong> (180 kWh) • Criticality: 0.85 (High)</li>
                <li><strong className="text-white">Tier 3: STREET LIGHTING NETWORK</strong> (90 kWh * intensity) • Criticality: 0.70</li>
                <li><strong className="text-white">Tier 4: RESIDENTIAL DISTRICTS</strong> (210 kWh) • Criticality: 0.55 (Medium)</li>
                <li><strong className="text-white">Tier 5: COMMERCIAL & OFFICES</strong> (120 kWh) • Criticality: 0.35 (Commercial)</li>
              </ul>
            </div>

            <div className="space-y-1">
              <span className="text-[#00E5FF] font-bold block">3. Sequential Waterfall Allocation:</span>
              <p className="text-[#888888] text-[11px] leading-relaxed font-sans">
                For each sector in ascending priority: if (remaining &gt;= demand) allocation = demand; else allocation = max(0, remaining), and remaining drops to 0.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[#FFB000] font-bold block">4. City Energy Resilience Score (0–100):</span>
              <pre className="text-white text-[11px] overflow-x-auto bg-[#0F0F0F] border border-[#1E1E1E] p-3 rounded-none">
                Resilience = (WeightedInfraFulfillment * 60) + (RenewableShare * 25) + (BatteryRatio * 15) - CriticalPenalty
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
