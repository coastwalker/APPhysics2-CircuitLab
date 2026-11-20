import { ModuleInfo } from '../types'

export const MODULES: ModuleInfo[] = [
  {
    id: 1,
    shortTitle: 'Charge & Current',
    title: 'Charge, Current & Microscopic Motion',
    subtitle: 'Electric field in wires, electron drift vs. conventional current, thermal motion, and Q-t slopes',
    accent: 'cyan',
    keyTopics: ['EMF & E-field', 'Drift vs. Conventional I', 'Thermal Motion', 'Q vs. t Slope'],
  },
  {
    id: 2,
    shortTitle: 'Resistivity & Graphs',
    title: 'Resistivity & Graph Linearization',
    subtitle: 'Proportional reasoning with R = ρL/A and interpreting unlabeled R vs. L or R vs. 1/A plots',
    accent: 'violet',
    keyTopics: ['R = ρL/A Scaling', 'Area vs. Diameter', 'Unlabeled Axes', 'Slope Interpretation'],
  },
  {
    id: 3,
    shortTitle: 'Symbolic Req & Ceq',
    title: 'Equivalent Resistance & Capacitance',
    subtitle: 'Purely symbolic Req and Ceq expressions, capacitor set ratios, and numberless network ranking',
    accent: 'cyan',
    keyTopics: ['Symbolic Req', 'Symbolic Ceq', 'Capacitor Ratios', 'Network Ranking'],
  },
  {
    id: 4,
    shortTitle: 'Switches & Bulbs',
    title: 'Switches, Closed Loops & Bulb Brightness',
    subtitle: 'Multi-switch logic tables, short-circuiting branches, and tracing current redistribution',
    accent: 'amber',
    keyTopics: ['Switch Logic Tables', 'Short Circuits', 'Brightness Shifts', 'Loop Continuity'],
  },
  {
    id: 5,
    shortTitle: 'Kirchhoff & V(x)',
    title: "Kirchhoff's Rules & Potential vs. Position",
    subtitle: 'Multi-junction puzzles, bridge circuits, series data tables, and CW/CCW V-vs-position graphs',
    accent: 'emerald',
    keyTopics: ['Junction Rule', 'Wheatstone Bridge', 'Symbolic Loop Rule', 'V vs. Position (CW/CCW)'],
  },
  {
    id: 6,
    shortTitle: 'Non-Ideal Traps',
    title: 'Non-Ideal Batteries & Non-Ideal Meters',
    subtitle: 'Terminal voltage ε − Ir, non-ohmic bulbs, and high-trap ammeter/voltmeter loading effects',
    accent: 'rose',
    highTrap: true,
    keyTopics: ['Terminal Voltage', 'Ohmic vs. Non-Ohmic', 'Non-Ideal Voltmeter', 'Current Ranking Traps'],
  },
  {
    id: 7,
    shortTitle: 'Power & Energy',
    title: 'Power, Motors & Thermal Energy',
    subtitle: 'Symbolic P = I²R and ΔV²/R ratios, E = Q²R/Δt, motor work, and insulated water heaters',
    accent: 'amber',
    keyTopics: ['Power Ratios', 'E = Q²R/Δt', 'Motor Energy', 'Water Heater Times'],
  },
  {
    id: 8,
    shortTitle: 'RC Circuits & τ',
    title: 'RC Circuits & Time Constant (τ = ReqCeq)',
    subtitle: 'Transient charging brightness, t = 0 vs. t → ∞ limits, τ ratios, and Q-vs-t comparisons',
    accent: 'violet',
    keyTopics: ['t = 0 & Steady State', 'Back-EMF Vc = Q/C', 'Complex τ Ratios', 'Q vs. t Half-Time'],
  },
  {
    id: 9,
    shortTitle: 'Select-2 & FRQs',
    title: 'AP "Select Two" & Multi-Part FRQ Simulator',
    subtitle: 'All-or-nothing AP Select-Two MCQs plus 3 full exam-style FRQs with interactive AP rubrics',
    accent: 'emerald',
    highTrap: true,
    keyTopics: ['Select-Two (All/Nothing)', 'FRQ 1: Linearization', 'FRQ 2: QQT Bulbs/RC', 'FRQ 3: Combo & RC'],
  },
]

export const getModuleById = (id: number): ModuleInfo =>
  MODULES.find((m) => m.id === id) ?? MODULES[0]
