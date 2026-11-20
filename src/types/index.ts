export type ModuleId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface ModuleInfo {
  id: ModuleId
  shortTitle: string
  title: string
  subtitle: string
  accent: 'cyan' | 'amber' | 'violet' | 'emerald' | 'rose'
  highTrap?: boolean
  keyTopics: string[]
}

export type CircuitDiagramId =
  | 'm1-wire-field'
  | 'm1-varying-wire'
  | 'm2-cylinders'
  | 'm3-symbolic-resistors'
  | 'm3-symbolic-capacitors'
  | 'm3-cap-sets-ab'
  | 'm3-resistor-networks-rank'
  | 'm3-four-resistors'
  | 'm4-multi-switch-table'
  | 'm4-switch-turn-off'
  | 'm4-closing-switch-s'
  | 'm4-short-bulb'
  | 'm4-three-bulbs-rank'
  | 'm4-parallel-open-switch'
  | 'm5-multi-junction'
  | 'm5-wheatstone-bridge'
  | 'm5-two-loop-kirchhoff'
  | 'm5-v-pos-cw'
  | 'm5-v-pos-ccw'
  | 'm6-nonideal-battery'
  | 'm6-nonideal-voltmeter'
  | 'm6-nonideal-ammeter'
  | 'm6-three-setups-rank'
  | 'm7-motor-block'
  | 'm7-water-heaters'
  | 'm7-series-parallel-heaters'
  | 'm8-rc-bulb-charge'
  | 'm8-rc-multiloop-t0-inf'
  | 'm8-rc-voltage-divider'
  | 'm8-rc-tau-4-3'
  | 'm8-rc-tau-1-9'
  | 'm9-st-rc-loops'
  | 'm9-st-switch-s'
  | 'm9-st-meters'
  | 'm9-st-kirchhoff-nodes'
  | 'frq1-ohmic-test'
  | 'frq2-three-bulbs-switch'
  | 'frq2-capacitor-replace'
  | 'frq3-combo-circuit'
  | 'frq3-rc-steady-state'

export type PhysicsGraphId =
  | 'm1-q-vs-t'
  | 'm2-r-vs-unlabeled-l'
  | 'm2-r-vs-unlabeled-inv-a'
  | 'm5-v-vs-pos-cw'
  | 'm5-v-vs-pos-ccw'
  | 'm6-iv-nonohmic'
  | 'm8-rc-q-vs-t-rx-ry'
  | 'm9-st-iv-unlabeled'
  | 'frq1-inv-i-vs-r'

export interface QuestionOption {
  id: 'A' | 'B' | 'C' | 'D'
  text: string
  trapExplanation: string // Explanation of why this choice is correct OR why it is an AP trap
}

export interface MCQQuestion {
  id: string
  moduleId: ModuleId
  questionType: 'single' | 'select-two'
  difficulty: 'Core' | 'AP Standard' | 'High-Trap'
  title: string
  prompt: string
  tableData?: {
    headers: string[]
    rows: string[][]
    caption?: string
  }
  circuitId?: CircuitDiagramId
  graphId?: PhysicsGraphId
  options: QuestionOption[]
  correctAnswers: ('A' | 'B' | 'C' | 'D')[]
  hint: string
  solutionSummary: string
  apTip?: string
}

export interface FRQRubricPoint {
  id: string
  points: number
  criterion: string
}

export interface FRQPart {
  label: string // e.g., "(a)", "(b)(i)"
  prompt: string
  modelSolution: string
  solutionCircuitId?: CircuitDiagramId
  rubricPoints: FRQRubricPoint[]
}

export interface FRQQuestion {
  id: string
  number: number
  title: string
  subtitle: string
  totalPoints: number
  estimatedMinutes: number
  tags: string[]
  stem: string
  circuitId?: CircuitDiagramId
  graphId?: PhysicsGraphId
  parts: FRQPart[]
}

export interface QuestionAttempt {
  questionId: string
  correct: boolean
  selectedAnswers: ('A' | 'B' | 'C' | 'D')[]
  attemptsCount: number
  lastAttemptAt: number
}

export interface ExamRecord {
  id: string
  completedAt: number
  mcqScore: number
  mcqTotal: number
  frqId: string
  frqScore: number
  frqTotal: number
  percentScore: number
  timeUsedSeconds: number
  moduleBreakdown: Record<number, { correct: number; total: number }>
}

export interface UserProgress {
  attempts: Record<string, QuestionAttempt>
  missedQueue: string[] // Question IDs currently in remediation queue
  flaggedIds: string[] // User-flagged Question IDs
  streak: number
  bestStreak: number
  frqRubricChecked: Record<string, string[]> // frqId -> checked rubricPoint IDs
  frqDrafts: Record<string, Record<string, string>> // frqId -> partLabel -> student draft text
  examHistory: ExamRecord[]
}

export type AppView = 'dashboard' | 'drill' | 'exam' | 'remediation'
