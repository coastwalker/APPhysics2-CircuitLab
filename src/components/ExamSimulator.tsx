import React, { useState, useEffect, useCallback } from 'react'
import {
  Timer,
  Play,
  Send,
  Flag,
  CheckCircle2,
  XCircle,
  BarChart3,
  Award,
  RotateCcw,
  FileSpreadsheet,
  Lock,
} from 'lucide-react'
import { ALL_MCQS, ALL_FRQS, MODULES } from '../data'
import { ExamRecord, FRQQuestion, MCQQuestion } from '../types'
import { QuestionCard, isSelectionCorrect } from './QuestionCard'
import { FRQCard } from './FRQCard'

const EXAM_DURATION_SECONDS = 40 * 60 // 40 minutes

interface ExamSimulatorProps {
  onCompleteExam: (record: ExamRecord, missedIds: string[]) => void
  onGoToRemediation: () => void
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/**
 * Generates a balanced 20-MCQ exam across all 9 modules:
 * 2 from each of Modules 1-8 (16) + 2 additional random from Modules 1-8 (18) + 2 "Select Two" from Module 9 (20).
 */
function buildExamMCQs(): MCQQuestion[] {
  const picked: MCQQuestion[] = []
  const leftovers: MCQQuestion[] = []

  for (let m = 1; m <= 8; m++) {
    const modQs = shuffleArray(ALL_MCQS.filter((q) => q.moduleId === m))
    picked.push(...modQs.slice(0, 2))
    leftovers.push(...modQs.slice(2))
  }

  picked.push(...shuffleArray(leftovers).slice(0, 2))
  const selectTwos = shuffleArray(ALL_MCQS.filter((q) => q.moduleId === 9)).slice(0, 2)
  // Put single-choice shuffled first, then the 2 AP "Select Two" items at Q19-Q20 just like the real AP exam!
  return [...shuffleArray(picked), ...selectTwos]
}

function formatClock(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function getAPScoreEstimate(pct: number): { ap: number; label: string; color: string } {
  if (pct >= 92) return { ap: 5, label: '5 — Perfect Score Mastery Zone', color: 'text-emerald-400' }
  if (pct >= 76) return { ap: 5, label: '5 — Extremely Well Qualified', color: 'text-emerald-300' }
  if (pct >= 62) return { ap: 4, label: '4 — Well Qualified', color: 'text-cyan-300' }
  if (pct >= 48) return { ap: 3, label: '3 — Qualified', color: 'text-amber-300' }
  if (pct >= 34) return { ap: 2, label: '2 — Possibly Qualified', color: 'text-orange-400' }
  return { ap: 1, label: '1 — Needs Focused Remediation', color: 'text-rose-400' }
}

export const ExamSimulator: React.FC<ExamSimulatorProps> = ({
  onCompleteExam,
  onGoToRemediation,
}) => {
  const [stage, setStage] = useState<'intro' | 'active' | 'self-grade' | 'report'>('intro')
  const [selectedFRQChoice, setSelectedFRQChoice] = useState<'random' | string>('random')

  const [examMCQs, setExamMCQs] = useState<MCQQuestion[]>([])
  const [examFRQ, setExamFRQ] = useState<FRQQuestion>(ALL_FRQS[0])
  const [answers, setAnswers] = useState<Record<string, ('A' | 'B' | 'C' | 'D')[]>>({})
  const [flagged, setFlagged] = useState<string[]>([])
  const [frqDrafts, setFrqDrafts] = useState<Record<string, string>>({})
  const [frqCheckedIds, setFrqCheckedIds] = useState<string[]>([])
  const [activeSlot, setActiveSlot] = useState<number | 'frq'>(0)
  const [secondsLeft, setSecondsLeft] = useState(EXAM_DURATION_SECONDS)
  const [reviewIdx, setReviewIdx] = useState<number>(0)

  const startExam = () => {
    const mcqs = buildExamMCQs()
    const frq =
      selectedFRQChoice === 'random'
        ? ALL_FRQS[Math.floor(Math.random() * ALL_FRQS.length)]
        : ALL_FRQS.find((f) => f.id === selectedFRQChoice) ?? ALL_FRQS[0]

    setExamMCQs(mcqs)
    setExamFRQ(frq)
    setAnswers({})
    setFlagged([])
    setFrqDrafts({})
    setFrqCheckedIds([])
    setActiveSlot(0)
    setSecondsLeft(EXAM_DURATION_SECONDS)
    setStage('active')
  }

  const handleEnterSelfGrade = useCallback(() => {
    setStage('self-grade')
  }, [])

  // Countdown timer
  useEffect(() => {
    if (stage !== 'active') return
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer)
          handleEnterSelfGrade()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [stage, handleEnterSelfGrade])

  const finalizeReport = () => {
    const mcqResults = examMCQs.map((q) => ({
      q,
      correct: isSelectionCorrect(answers[q.id] ?? [], q.correctAnswers),
    }))
    const mcqScore = mcqResults.filter((r) => r.correct).length
    const missedIds = mcqResults.filter((r) => !r.correct).map((r) => r.q.id)

    const frqScore = examFRQ.parts.reduce(
      (s, p) =>
        s +
        p.rubricPoints.reduce(
          (ps, rp) => ps + (frqCheckedIds.includes(rp.id) ? rp.points : 0),
          0
        ),
      0
    )

    // AP-style 50% MCQ + 50% FRQ weighting
    const mcqPct = mcqScore / examMCQs.length
    const frqPct = frqScore / examFRQ.totalPoints
    const percentScore = Math.round(((mcqPct + frqPct) / 2) * 100)

    const moduleBreakdown: Record<number, { correct: number; total: number }> = {}
    mcqResults.forEach(({ q, correct }) => {
      if (!moduleBreakdown[q.moduleId]) {
        moduleBreakdown[q.moduleId] = { correct: 0, total: 0 }
      }
      moduleBreakdown[q.moduleId].total += 1
      if (correct) moduleBreakdown[q.moduleId].correct += 1
    })

    const record: ExamRecord = {
      id: `exam-${Date.now()}`,
      completedAt: Date.now(),
      mcqScore,
      mcqTotal: examMCQs.length,
      frqId: examFRQ.id,
      frqScore,
      frqTotal: examFRQ.totalPoints,
      percentScore,
      timeUsedSeconds: EXAM_DURATION_SECONDS - secondsLeft,
      moduleBreakdown,
    }

    onCompleteExam(record, missedIds)
    setReviewIdx(0)
    setStage('report')
  }

  // ==================== STAGE 1: INTRO ====================
  if (stage === 'intro') {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-500/15 text-cyan-300">
              <Timer className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                Mode 2 • Timed Assessment
              </span>
              <h2 className="text-2xl font-extrabold text-slate-50">
                &ldquo;Perfect Score&rdquo; Exam Simulator
              </h2>
              <p className="mt-1 text-sm text-slate-300 leading-relaxed">
                Replicates true AP Physics 2 Unit 11 exam pressure. Answers, hints, and solutions stay{' '}
                <strong className="text-slate-100">strictly locked</strong> until you submit, then
                you self-grade your FRQ with the official AP Rubric to generate a diagnostic report.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#1F2937] bg-[#0B1120] p-4">
              <div className="text-xs font-mono text-cyan-300 font-bold">TIME LIMIT</div>
              <div className="mt-1 text-2xl font-mono font-extrabold text-slate-50">40:00</div>
              <p className="mt-1 text-xs text-slate-400">Auto-submits when clock hits 00:00</p>
            </div>
            <div className="rounded-xl border border-[#1F2937] bg-[#0B1120] p-4">
              <div className="text-xs font-mono text-amber-300 font-bold">SECTION I: MCQ</div>
              <div className="mt-1 text-2xl font-mono font-extrabold text-slate-50">20 Qs</div>
              <p className="mt-1 text-xs text-slate-400">
                18 Single-Choice + 2 All-or-Nothing Select-Two
              </p>
            </div>
            <div className="rounded-xl border border-[#1F2937] bg-[#0B1120] p-4">
              <div className="text-xs font-mono text-emerald-300 font-bold">SECTION II: FRQ</div>
              <div className="mt-1 text-2xl font-mono font-extrabold text-slate-50">1 FRQ</div>
              <p className="mt-1 text-xs text-slate-400">
                Multi-part AP FRQ + interactive rubric grading
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Choose FRQ Assignment
            </label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                onClick={() => setSelectedFRQChoice('random')}
                className={`rounded-xl border p-3 text-left text-xs font-semibold transition-all cursor-pointer ${
                  selectedFRQChoice === 'random'
                    ? 'border-cyan-400 bg-cyan-500/15 text-cyan-200'
                    : 'border-[#1F2937] bg-[#0B1120] text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold text-sm">Random FRQ (Recommended)</div>
                <div className="mt-0.5 opacity-80">Surprise selection from FRQ 1, 2, or 3</div>
              </button>
              {ALL_FRQS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFRQChoice(f.id)}
                  className={`rounded-xl border p-3 text-left text-xs font-semibold transition-all cursor-pointer ${
                    selectedFRQChoice === f.id
                      ? 'border-emerald-400 bg-emerald-500/15 text-emerald-200'
                      : 'border-[#1F2937] bg-[#0B1120] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-bold text-sm">
                    FRQ {f.number} ({f.totalPoints} pts)
                  </div>
                  <div className="mt-0.5 opacity-80 truncate">{f.title}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startExam}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3.5 text-base font-extrabold text-[#090D16] hover:bg-cyan-300 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Play className="h-5 w-5 fill-current" />
            Begin 40-Minute Unit 11 Exam
          </button>
        </div>
      </div>
    )
  }

  // ==================== STAGE 2: ACTIVE TIMED EXAM ====================
  if (stage === 'active') {
    const answeredCount = examMCQs.filter((q) => {
      const sel = answers[q.id] ?? []
      return q.questionType === 'select-two' ? sel.length === 2 : sel.length === 1
    }).length

    const timerColor =
      secondsLeft <= 180
        ? 'border-rose-500/60 bg-rose-500/15 text-rose-300 animate-pulse'
        : secondsLeft <= 600
        ? 'border-amber-500/50 bg-amber-500/15 text-amber-300'
        : 'border-cyan-500/40 bg-cyan-500/12 text-cyan-200'

    return (
      <div className="space-y-5">
        {/* Sticky Exam Control Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#1F2937] bg-[#111827] px-5 py-3.5 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-[#090D16] px-2.5 py-1 text-xs font-mono text-slate-300">
              <Lock className="h-3.5 w-3.5 text-amber-400" />
              Answers Locked
            </span>
            <span className="text-xs font-mono text-slate-400">
              MCQs Answered:{' '}
              <strong className="text-slate-100">
                {answeredCount}/{examMCQs.length}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-1.5 font-mono text-base font-extrabold ${timerColor}`}
            >
              <Timer className="h-4 w-4" />
              {formatClock(secondsLeft)}
            </div>
            <button
              onClick={() => {
                if (
                  answeredCount < examMCQs.length &&
                  !window.confirm(
                    `You have answered ${answeredCount}/${examMCQs.length} MCQs. Submit exam now and proceed to FRQ rubric grading?`
                  )
                ) {
                  return
                }
                handleEnterSelfGrade()
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-400 px-4 py-2 text-xs sm:text-sm font-extrabold text-[#090D16] hover:bg-emerald-300 transition-colors cursor-pointer"
            >
              <Send className="h-4 w-4" />
              Submit Exam
            </button>
          </div>
        </div>

        {/* Question Palette */}
        <div className="rounded-xl border border-[#1F2937] bg-[#0D1322] p-3.5 flex flex-wrap items-center gap-1.5">
          {examMCQs.map((q, idx) => {
            const sel = answers[q.id] ?? []
            const isComplete =
              q.questionType === 'select-two' ? sel.length === 2 : sel.length === 1
            const isFlagged = flagged.includes(q.id)
            const isCurrent = activeSlot === idx

            return (
              <button
                key={q.id}
                onClick={() => setActiveSlot(idx)}
                className={`relative inline-flex h-8 w-9 items-center justify-center rounded-lg border font-mono text-xs font-bold transition-all cursor-pointer ${
                  isCurrent
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 ring-1 ring-cyan-400/40'
                    : isComplete
                    ? 'border-emerald-500/40 bg-emerald-500/12 text-emerald-300'
                    : 'border-[#1F2937] bg-[#111827] text-slate-400 hover:text-slate-200'
                }`}
              >
                {idx + 1}
                {isFlagged && (
                  <Flag className="absolute -right-1 -top-1 h-3 w-3 fill-amber-400 text-amber-400" />
                )}
              </button>
            )
          })}
          <button
            onClick={() => setActiveSlot('frq')}
            className={`ml-1 inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 font-mono text-xs font-bold transition-all cursor-pointer ${
              activeSlot === 'frq'
                ? 'border-violet-400 bg-violet-500/20 text-violet-200 ring-1 ring-violet-400/40'
                : 'border-violet-500/30 bg-[#111827] text-violet-300 hover:border-violet-400'
            }`}
          >
            <FileSpreadsheet className="h-3.5 w-3.5" />
            FRQ {examFRQ.number}
          </button>
        </div>

        {/* Active Item */}
        {activeSlot === 'frq' ? (
          <FRQCard
            frq={examFRQ}
            checkedRubricIds={[]}
            onToggleRubricPoint={() => {}}
            drafts={frqDrafts}
            onSaveDraft={(partLabel, val) =>
              setFrqDrafts((prev) => ({ ...prev, [partLabel]: val }))
            }
            locked
          />
        ) : (
          <div className="space-y-4">
            <QuestionCard
              question={examMCQs[activeSlot]}
              questionNumber={activeSlot + 1}
              totalQuestions={examMCQs.length}
              mode="exam"
              selectedAnswers={answers[examMCQs[activeSlot].id] ?? []}
              onSelectChange={(next) =>
                setAnswers((prev) => ({ ...prev, [examMCQs[activeSlot].id]: next }))
              }
              isFlagged={flagged.includes(examMCQs[activeSlot].id)}
              onToggleFlag={() =>
                setFlagged((prev) =>
                  prev.includes(examMCQs[activeSlot].id)
                    ? prev.filter((id) => id !== examMCQs[activeSlot].id)
                    : [...prev, examMCQs[activeSlot].id]
                )
              }
            />
            <div className="flex items-center justify-between">
              <button
                disabled={activeSlot === 0}
                onClick={() => setActiveSlot((s) => (typeof s === 'number' ? Math.max(0, s - 1) : 0))}
                className="rounded-xl border border-[#1F2937] bg-[#111827] px-4 py-2 text-xs font-semibold text-slate-200 hover:border-cyan-400/50 disabled:opacity-40 cursor-pointer"
              >
                ← Previous Question
              </button>
              <button
                onClick={() =>
                  setActiveSlot((s) =>
                    typeof s === 'number' && s < examMCQs.length - 1 ? s + 1 : 'frq'
                  )
                }
                className="rounded-xl bg-cyan-500/15 border border-cyan-400/40 px-4 py-2 text-xs font-bold text-cyan-200 hover:bg-cyan-500/25 cursor-pointer"
              >
                {activeSlot < examMCQs.length - 1 ? 'Next Question →' : 'Proceed to FRQ →'}
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // ==================== STAGE 3: FRQ SELF-GRADING ====================
  if (stage === 'self-grade') {
    return (
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5">
          <div>
            <div className="text-xs font-mono font-bold uppercase text-emerald-300">
              Step 2 of 2 • Official AP Self-Grading
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-50">
              Grade Your FRQ Using the AP Scoring Rubric
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-0.5">
              Reveal each part&rsquo;s model solution, compare with your written response, check the
              rubric points you earned, then generate your diagnostic report.
            </p>
          </div>
          <button
            onClick={finalizeReport}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-extrabold text-[#090D16] hover:bg-emerald-300 shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <BarChart3 className="h-4 w-4" />
            Generate AP Diagnostic Report
          </button>
        </div>

        <FRQCard
          frq={examFRQ}
          checkedRubricIds={frqCheckedIds}
          onToggleRubricPoint={(pointId) =>
            setFrqCheckedIds((prev) =>
              prev.includes(pointId) ? prev.filter((id) => id !== pointId) : [...prev, pointId]
            )
          }
          drafts={frqDrafts}
          onSaveDraft={(partLabel, val) =>
            setFrqDrafts((prev) => ({ ...prev, [partLabel]: val }))
          }
        />
      </div>
    )
  }

  // ==================== STAGE 4: DIAGNOSTIC REPORT ====================
  const mcqResults = examMCQs.map((q) => ({
    q,
    selected: answers[q.id] ?? [],
    correct: isSelectionCorrect(answers[q.id] ?? [], q.correctAnswers),
  }))
  const mcqScore = mcqResults.filter((r) => r.correct).length
  const frqScore = examFRQ.parts.reduce(
    (s, p) =>
      s +
      p.rubricPoints.reduce(
        (ps, rp) => ps + (frqCheckedIds.includes(rp.id) ? rp.points : 0),
        0
      ),
    0
  )
  const percentScore = Math.round(((mcqScore / examMCQs.length + frqScore / examFRQ.totalPoints) / 2) * 100)
  const apEst = getAPScoreEstimate(percentScore)
  const missedCount = examMCQs.length - mcqScore

  return (
    <div className="space-y-6">
      {/* Top Score Banner */}
      <div className="rounded-2xl border border-[#1F2937] bg-gradient-to-br from-[#111827] to-[#0B1120] p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/12 px-3 py-1 text-xs font-mono font-bold text-cyan-300">
              <Award className="h-3.5 w-3.5" /> AP PHYSICS 2 DIAGNOSTIC REPORT
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-50">
              Composite Score: <span className="font-mono text-cyan-300">{percentScore}%</span>
            </h2>
            <p className={`text-sm font-bold ${apEst.color}`}>Estimated AP Score: {apEst.label}</p>
            <p className="text-xs text-slate-400">
              Time used: <span className="font-mono text-slate-200">{formatClock(EXAM_DURATION_SECONDS - secondsLeft)}</span> •{' '}
              {missedCount > 0
                ? `${missedCount} missed MCQ(s) have been automatically added to your Remediation Queue.`
                : 'Flawless MCQ section! Zero missed questions!'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-[#1F2937] bg-[#090D16] px-4 py-3 text-center">
              <div className="text-[11px] font-mono text-slate-400">SECTION I (MCQ)</div>
              <div className="mt-1 text-2xl font-mono font-extrabold text-cyan-300">
                {mcqScore}/{examMCQs.length}
              </div>
              <div className="text-xs text-slate-400">
                {Math.round((mcqScore / examMCQs.length) * 100)}%
              </div>
            </div>
            <div className="rounded-xl border border-[#1F2937] bg-[#090D16] px-4 py-3 text-center">
              <div className="text-[11px] font-mono text-slate-400">SECTION II (FRQ)</div>
              <div className="mt-1 text-2xl font-mono font-extrabold text-emerald-300">
                {frqScore}/{examFRQ.totalPoints}
              </div>
              <div className="text-xs text-slate-400">
                {Math.round((frqScore / examFRQ.totalPoints) * 100)}%
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {missedCount > 0 && (
            <button
              onClick={onGoToRemediation}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-rose-400 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              Drill {missedCount} Missed Questions Now
            </button>
          )}
          <button
            onClick={() => setStage('intro')}
            className="inline-flex items-center gap-2 rounded-xl border border-[#1F2937] bg-[#090D16] px-4 py-2.5 text-sm font-semibold text-slate-200 hover:border-cyan-400/50 transition-colors cursor-pointer"
          >
            Take Another Practice Exam
          </button>
        </div>
      </div>

      {/* Module Breakdown */}
      <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-5 space-y-4">
        <h3 className="text-base font-bold text-slate-100">Accuracy Breakdown by Unit 11 Module</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((mod) => {
            const items = mcqResults.filter((r) => r.q.moduleId === mod.id)
            if (items.length === 0) return null
            const right = items.filter((r) => r.correct).length
            const pct = Math.round((right / items.length) * 100)
            return (
              <div key={mod.id} className="rounded-xl border border-[#1F2937] bg-[#0B1120] p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">
                    Mod {mod.id}: {mod.shortTitle}
                  </span>
                  <span
                    className={`font-mono font-bold ${
                      pct === 100 ? 'text-emerald-400' : pct >= 50 ? 'text-amber-300' : 'text-rose-400'
                    }`}
                  >
                    {right}/{items.length} ({pct}%)
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full ${
                      pct === 100 ? 'bg-emerald-400' : pct >= 50 ? 'bg-amber-400' : 'bg-rose-400'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Question-by-Question Review */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-bold text-slate-100">
            Full MCQ Review &amp; AP Trap Breakdowns
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {mcqResults.map((r, idx) => (
              <button
                key={r.q.id}
                onClick={() => setReviewIdx(idx)}
                className={`inline-flex h-8 w-9 items-center justify-center gap-0.5 rounded-lg border font-mono text-xs font-bold cursor-pointer ${
                  idx === reviewIdx
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200'
                    : r.correct
                    ? 'border-emerald-500/40 bg-emerald-500/12 text-emerald-300'
                    : 'border-rose-500/40 bg-rose-500/15 text-rose-300'
                }`}
              >
                {idx + 1}
                {r.correct ? (
                  <CheckCircle2 className="h-2.5 w-2.5" />
                ) : (
                  <XCircle className="h-2.5 w-2.5" />
                )}
              </button>
            ))}
          </div>
        </div>

        {mcqResults[reviewIdx] && (
          <QuestionCard
            question={mcqResults[reviewIdx].q}
            questionNumber={reviewIdx + 1}
            totalQuestions={examMCQs.length}
            mode="exam-review"
            selectedAnswers={mcqResults[reviewIdx].selected}
          />
        )}
      </div>
    </div>
  )
}
