import React from 'react'
import { X, BookOpen, Zap, AlertTriangle, Calculator } from 'lucide-react'
import { MathText } from './MathText'

interface EquationSheetDrawerProps {
  open: boolean
  onClose: () => void
}

const UNIT_11_EQUATIONS = [
  { label: 'Electric Current', formula: '$I = \\dfrac{\\Delta Q}{\\Delta t}$' },
  { label: 'Resistivity & Geometry', formula: '$R = \\dfrac{\\rho L}{A}$' },
  { label: "Ohm's Law", formula: '$I = \\dfrac{\\Delta V}{R}$' },
  { label: 'Electric Power', formula: '$P = I\\Delta V = I^2 R = \\dfrac{(\\Delta V)^2}{R}$' },
  { label: 'Thermal Energy', formula: '$E = P\\Delta t = I^2 R\\Delta t = \\dfrac{Q^2 R}{\\Delta t}$' },
  { label: 'Series Resistors', formula: '$R_{eq} = \\sum_i R_i$' },
  { label: 'Parallel Resistors', formula: '$\\dfrac{1}{R_{eq}} = \\sum_i \\dfrac{1}{R_i}$' },
  { label: 'Capacitance & Energy', formula: '$C = \\dfrac{Q}{\\Delta V}, \\quad U_C = \\dfrac{1}{2}Q\\Delta V = \\dfrac{1}{2}C(\\Delta V)^2$' },
  { label: 'Parallel-Plate Capacitor', formula: '$C = \\dfrac{\\kappa \\varepsilon_0 A}{d}$' },
  { label: 'Parallel Capacitors', formula: '$C_{eq} = \\sum_i C_i$' },
  { label: 'Series Capacitors', formula: '$\\dfrac{1}{C_{eq}} = \\sum_i \\dfrac{1}{C_i}$' },
  { label: 'RC Time Constant', formula: '$\\tau = R_{eq} C_{eq}$' },
  { label: "Kirchhoff's Rules", formula: '$\\sum I_{\\text{in}} = \\sum I_{\\text{out}}, \\quad \\sum \\Delta V_{\\text{loop}} = 0$' },
  { label: 'Real Battery Terminal Voltage', formula: '$\\Delta V_{\\text{term}} = \\varepsilon - I r$' },
]

const CONSTANTS = [
  { name: 'Vacuum Permittivity', value: '$\\varepsilon_0 = 8.85 \\times 10^{-12}\\text{ C}^2/(\\text{N}\\cdot\\text{m}^2)$' },
  { name: 'Elementary Charge', value: '$e = 1.60 \\times 10^{-19}\\text{ C}$' },
  { name: 'Coulomb Constant', value: '$k = \\frac{1}{4\\pi\\varepsilon_0} = 8.99 \\times 10^{9}\\text{ N}\\cdot\\text{m}^2/\\text{C}^2$' },
  { name: 'RC 1-Time-Constant Charge', value: '$1 - e^{-1} \\approx 63.2\\%, \\quad e^{-1} \\approx 36.8\\%$' },
]

const GOLDEN_RULES = [
  {
    title: 'Uncharged Capacitor ($t = 0$)',
    rule: 'Acts as an **ideal wire** ($\\Delta V_C = 0$). Can short-circuit any parallel bulb!',
    color: 'border-violet-500/40 bg-violet-500/10 text-violet-200',
  },
  {
    title: 'Charged Capacitor ($t \\to \\infty$)',
    rule: 'Acts as an **open switch** ($I_C = 0$). Its voltage equals $\\Delta V$ of whatever branch it parallels!',
    color: 'border-violet-500/40 bg-violet-500/10 text-violet-200',
  },
  {
    title: 'Ideal Ammeter vs. Non-Ideal Ammeter',
    rule: 'Ideal A = **$0\\,\\Omega$ in series**. Non-ideal A adds series $R_A \\implies$ lowers total current.',
    color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200',
  },
  {
    title: 'Ideal Voltmeter vs. Non-Ideal Voltmeter',
    rule: 'Ideal V = **$\\infty\\,\\Omega$ in parallel**. Non-ideal V acts as parallel $R_V \\implies$ lowers $R_{eq}$ and **increases** battery current!',
    color: 'border-rose-500/40 bg-rose-500/10 text-rose-200',
  },
  {
    title: 'Series vs. Parallel Power Trap',
    rule: 'Same current (series) $\\implies P = I^2 R \\propto R$. Same voltage (parallel) $\\implies P = \\Delta V^2 / R \\propto 1/R$.',
    color: 'border-amber-500/40 bg-amber-500/10 text-amber-200',
  },
  {
    title: 'Ohmic vs. Non-Ohmic $I$-$V$ Curve',
    rule: 'Ohmic = straight line through origin. Incandescent bulb bends down on $I$ vs. $\\Delta V$ ($R_{\\text{lit}} > R_{\\text{unlit}}$).',
    color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-200',
  },
]

export const EquationSheetDrawer: React.FC<EquationSheetDrawerProps> = ({ open, onClose }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      {/* Drawer panel */}
      <aside className="relative z-10 flex h-full w-full max-w-lg flex-col border-l border-[#1F2937] bg-[#0B1120] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#1F2937] bg-[#111827] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">AP Physics 2 Equation Sheet</h2>
              <p className="text-xs text-slate-400">Unit 11: Electric Circuits Reference</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-[#1F2937] bg-[#090D16] p-2 text-slate-400 hover:border-slate-600 hover:text-white transition-colors cursor-pointer"
            aria-label="Close equation sheet"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Core Equations */}
          <section>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
              <Calculator className="h-4 w-4" />
              Unit 11 Equations
            </div>
            <div className="grid grid-cols-1 gap-2">
              {UNIT_11_EQUATIONS.map((eq) => (
                <div
                  key={eq.label}
                  className="flex items-center justify-between gap-3 rounded-lg border border-[#1F2937] bg-[#111827] px-3.5 py-2.5"
                >
                  <span className="text-xs font-medium text-slate-400">{eq.label}</span>
                  <span className="text-sm text-slate-100">
                    <MathText text={eq.formula} />
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Constants */}
          <section>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Zap className="h-4 w-4" />
              Constants &amp; Useful Factors
            </div>
            <div className="space-y-2">
              {CONSTANTS.map((c) => (
                <div
                  key={c.name}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#1F2937] bg-[#111827] px-3.5 py-2.5"
                >
                  <span className="text-xs font-medium text-slate-400">{c.name}</span>
                  <span className="text-xs sm:text-sm text-amber-200">
                    <MathText text={c.value} />
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* High-Yield AP Golden Rules */}
          <section>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400">
              <AlertTriangle className="h-4 w-4" />
              High-Yield Exam Rules &amp; Traps
            </div>
            <div className="space-y-2.5">
              {GOLDEN_RULES.map((item) => (
                <div key={item.title} className={`rounded-lg border p-3 ${item.color}`}>
                  <div className="text-xs font-bold mb-1">
                    <MathText text={item.title} />
                  </div>
                  <div className="text-xs leading-relaxed opacity-95">
                    <MathText text={item.rule} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </aside>
    </div>
  )
}
