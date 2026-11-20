import React, { useState, useEffect } from 'react'
import {
  CheckCircle2,
  XCircle,
  Flag,
  Lightbulb,
  AlertTriangle,
  Sparkles,
  CheckSquare,
  Circle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { MCQQuestion } from '../types'
import { MathText } from './MathText'
import { CircuitDiagram } from './CircuitDiagram'
import { PhysicsGraph } from './PhysicsGraph'
import { getModuleById } from '../data'

interface QuestionCardProps {
  question: MCQQuestion
  questionNumber?: number
  totalQuestions?: number
  /** 'drill' allows instant submit + hint + feedback. 'exam' locks feedback until review. 'exam-review' shows graded answers read-only. */
  mode: 'drill' | 'exam' | 'exam-review'
  selectedAnswers?: ('A' | 'B' | 'C' | 'D')[]
  onSelectChange?: (answers: ('A' | 'B' | 'C' | 'D')[]) => void
  onSubmitted?: (selected: ('A' | 'B' | 'C' | 'D')[], isCorrect: boolean) => void
  isFlagged?: boolean
  onToggleFlag?: () => void
  alreadyMastered?: boolean
  onClearRemediation?: () => void
  showClearRemediation?: boolean
}

export function isSelectionCorrect(
  selected: ('A' | 'B' | 'C' | 'D')[],
  correct: ('A' | 'B' | 'C' | 'D')[]
): boolean {
  if (selected.length !== correct.length) return false
  const s = [...selected].sort()
  const c = [...correct].sort()
  return s.every((val, idx) => val === c[idx])
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  mode,
  selectedAnswers: controlledSelected,
  onSelectChange,
  onSubmitted,
  isFlagged = false,
  onToggleFlag,
  alreadyMastered = false,
  onClearRemediation,
  showClearRemediation = false,
}) => {
  const [internalSelected, setInternalSelected] = useState<('A' | 'B' | 'C' | 'D')[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showTrapBreakdown, setShowTrapBreakdown] = useState(true)

  // Reset local state when question changes
  useEffect(() => {
    setInternalSelected([])
    setSubmitted(false)
    setShowHint(false)
    setShowTrapBreakdown(true)
  }, [question.id])

  const selected = controlledSelected ?? internalSelected
  const isSelectTwo = question.questionType === 'select-two'
  const mod = getModuleById(question.moduleId)
  const isGraded = mode === 'exam-review' || (mode === 'drill' && submitted)
  const isCorrect = isGraded ? isSelectionCorrect(selected, question.correctAnswers) : false

  const handleOptionClick = (optId: 'A' | 'B' | 'C' | 'D') => {
    if (isGraded) return

    let next: ('A' | 'B' | 'C' | 'D')[]
    if (isSelectTwo) {
      if (selected.includes(optId)) {
        next = selected.filter((id) => id !== optId)
      } else if (selected.length < 2) {
        next = [...selected, optId]
      } else {
        // Replace oldest selection so user doesn't get stuck
        next = [selected[1], optId]
      }
    } else {
      next = [optId]
    }

    if (onSelectChange) {
      onSelectChange(next)
    } else {
      setInternalSelected(next)
    }
  }

  const handleSubmit = () => {
    if (mode !== 'drill') return
    if (isSelectTwo && selected.length !== 2) return
    if (!isSelectTwo && selected.length !== 1) return

    const correct = isSelectionCorrect(selected, question.correctAnswers)
    setSubmitted(true)
    onSubmitted?.(selected, correct)
  }

  const handleRetry = () => {
    setInternalSelected([])
    setSubmitted(false)
  }

  const canSubmit = isSelectTwo ? selected.length === 2 : selected.length === 1

  const difficultyStyles =
    question.difficulty === 'High-Trap'
      ? 'border-rose-500/40 bg-rose-500/10 text-rose-300'
      : question.difficulty === 'AP Standard'
      ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
      : 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'

  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#111827] shadow-xl overflow-hidden">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1F2937] bg-[#0D1322] px-5 py-3.5">
        <div className="flex flex-wrap items-center gap-2">
          {questionNumber !== undefined && (
            <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs font-mono font-bold text-slate-200">
              Q{questionNumber}
              {totalQuestions ? `/${totalQuestions}` : ''}
            </span>
          )}
          <span className="rounded-md border border-[#1F2937] bg-[#111827] px-2.5 py-0.5 text-xs font-medium text-cyan-300">
            Mod {mod.id}: {mod.shortTitle}
          </span>
          <span className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold ${difficultyStyles}`}>
            {question.difficulty}
          </span>
          {isSelectTwo && (
            <span className="rounded-md border border-violet-500/40 bg-violet-500/15 px-2 py-0.5 text-[11px] font-bold text-violet-200">
              SELECT TWO (All-or-Nothing)
            </span>
          )}
          {alreadyMastered && mode === 'drill' && (
            <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
              <CheckCircle2 className="h-3 w-3" /> Mastered
            </span>
          )}
        </div>

        {onToggleFlag && (
          <button
            onClick={onToggleFlag}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
              isFlagged
                ? 'border-amber-400/50 bg-amber-500/15 text-amber-300'
                : 'border-[#1F2937] bg-[#111827] text-slate-400 hover:text-slate-200 hover:border-slate-600'
            }`}
          >
            <Flag className={`h-3.5 w-3.5 ${isFlagged ? 'fill-amber-400 text-amber-400' : ''}`} />
            {isFlagged ? 'Flagged' : 'Flag'}
          </button>
        )}
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 space-y-5">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-50 mb-2">
            <MathText text={question.title} />
          </h3>
          <div className="text-sm sm:text-[15px] leading-relaxed text-slate-200">
            <MathText text={question.prompt} />
          </div>
        </div>

        {/* Visuals (Circuit &/or Graph) */}
        {(question.circuitId || question.graphId) && (
          <div
            className={`grid gap-4 ${
              question.circuitId && question.graphId ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
            }`}
          >
            {question.circuitId && <CircuitDiagram id={question.circuitId} />}
            {question.graphId && <PhysicsGraph id={question.graphId} />}
          </div>
        )}

        {/* Optional Data Table */}
        {question.tableData && (
          <div className="overflow-x-auto rounded-xl border border-[#1F2937] bg-[#0B1120]">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#1F2937] bg-[#111827]">
                  {question.tableData.headers.map((h, i) => (
                    <th key={i} className="px-4 py-2.5 font-semibold text-cyan-300">
                      <MathText text={h} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2937]">
                {question.tableData.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-800/30">
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={`px-4 py-2.5 ${
                          cIdx === 0 ? 'font-mono font-bold text-slate-200' : 'text-slate-300'
                        }`}
                      >
                        <MathText text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Collapsible Hint (Drill mode only, before grading or anytime) */}
        {mode === 'drill' && (
          <div>
            <button
              onClick={() => setShowHint((h) => !h)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
            >
              <Lightbulb className="h-3.5 w-3.5" />
              {showHint ? 'Hide Strategy Hint' : 'Need a Hint?'}
              {showHint ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
            {showHint && (
              <div className="mt-2 rounded-xl border border-amber-500/30 bg-amber-500/8 px-4 py-3 text-xs sm:text-sm text-amber-100 leading-relaxed">
                <MathText text={question.hint} />
              </div>
            )}
          </div>
        )}

        {/* Options */}
        <div className="space-y-2.5">
          {isSelectTwo && !isGraded && (
            <p className="text-xs font-mono text-violet-300">
              Select exactly 2 choices ({selected.length}/2 selected)
            </p>
          )}
          {question.options.map((opt) => {
            const isPicked = selected.includes(opt.id)
            const isRightOption = question.correctAnswers.includes(opt.id)

            let cardClasses =
              'border-[#1F2937] bg-[#0B1120] hover:border-cyan-500/50 hover:bg-[#0F172A]'
            if (!isGraded && isPicked) {
              cardClasses = 'border-cyan-400 bg-cyan-500/12 ring-1 ring-cyan-400/30'
            } else if (isGraded) {
              if (isRightOption && isPicked) {
                cardClasses = 'border-emerald-400/70 bg-emerald-500/12'
              } else if (isRightOption && !isPicked) {
                cardClasses = 'border-emerald-400/60 bg-emerald-500/8 border-dashed'
              } else if (!isRightOption && isPicked) {
                cardClasses = 'border-rose-500/70 bg-rose-500/12'
              } else {
                cardClasses = 'border-[#1F2937] bg-[#0B1120]/60 opacity-75'
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                disabled={isGraded}
                onClick={() => handleOptionClick(opt.id)}
                className={`w-full rounded-xl border p-3.5 text-left transition-all ${cardClasses} ${
                  isGraded ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex items-center gap-2 shrink-0">
                    {isSelectTwo ? (
                      <CheckSquare
                        className={`h-4 w-4 ${
                          isPicked ? 'text-cyan-400' : 'text-slate-600'
                        }`}
                      />
                    ) : (
                      <Circle
                        className={`h-4 w-4 ${
                          isPicked ? 'fill-cyan-400 text-cyan-400' : 'text-slate-600'
                        }`}
                      />
                    )}
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-md font-mono text-xs font-bold ${
                        isGraded && isRightOption
                          ? 'bg-emerald-500/25 text-emerald-300'
                          : isGraded && isPicked && !isRightOption
                          ? 'bg-rose-500/25 text-rose-300'
                          : isPicked
                          ? 'bg-cyan-500/25 text-cyan-200'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {opt.id}
                    </span>
                  </div>
                  <div className="flex-1 text-sm leading-relaxed text-slate-100">
                    <MathText text={opt.text} />
                  </div>
                  {isGraded && isRightOption && (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" />
                  )}
                  {isGraded && isPicked && !isRightOption && (
                    <XCircle className="h-5 w-5 shrink-0 text-rose-400 mt-0.5" />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Drill Action Bar */}
        {mode === 'drill' && !submitted && (
          <div className="flex items-center justify-end pt-1">
            <button
              type="button"
              disabled={!canSubmit}
              onClick={handleSubmit}
              className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                canSubmit
                  ? 'bg-cyan-400 text-[#090D16] hover:bg-cyan-300 shadow-lg shadow-cyan-500/20 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Check Answer
            </button>
          </div>
        )}

        {/* Graded Feedback + Trap Breakdown */}
        {isGraded && (
          <div className="space-y-4 pt-2 border-t border-[#1F2937]">
            {/* Result Banner */}
            <div
              className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3.5 ${
                isCorrect
                  ? 'border-emerald-500/40 bg-emerald-500/12 text-emerald-200'
                  : 'border-rose-500/40 bg-rose-500/12 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-rose-400 shrink-0" />
                )}
                <div>
                  <div className="text-sm font-bold">
                    {isCorrect
                      ? 'Exact AP Mastery! +1 Streak'
                      : `Missed — Correct Answer: ${question.correctAnswers.join(' & ')}`}
                  </div>
                  {!isCorrect && mode === 'drill' && (
                    <p className="text-xs text-rose-200/80">
                      Automatically added to your Remediation Queue so you can master this trap.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {showClearRemediation && isCorrect && onClearRemediation && (
                  <button
                    onClick={onClearRemediation}
                    className="rounded-lg bg-emerald-400 px-3 py-1.5 text-xs font-bold text-[#090D16] hover:bg-emerald-300 transition-colors cursor-pointer"
                  >
                    Mark Remediated &amp; Remove
                  </button>
                )}
                {mode === 'drill' && !isCorrect && (
                  <button
                    onClick={handleRetry}
                    className="rounded-lg border border-rose-400/40 bg-rose-500/20 px-3 py-1.5 text-xs font-semibold text-rose-100 hover:bg-rose-500/30 transition-colors cursor-pointer"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>

            {/* Concise Solution Summary */}
            <div className="rounded-xl border border-cyan-500/25 bg-[#0B1120] p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <Sparkles className="h-3.5 w-3.5" />
                Physics Derivation &amp; Summary
              </div>
              <p className="text-sm leading-relaxed text-slate-200">
                <MathText text={question.solutionSummary} />
              </p>
              {question.apTip && (
                <div className="mt-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
                  <strong className="font-bold text-amber-300">AP 100% Tip: </strong>
                  <MathText text={question.apTip} />
                </div>
              )}
            </div>

            {/* "Why Other Choices Are Wrong" Trap Breakdown */}
            <div className="rounded-xl border border-[#1F2937] bg-[#0B1120] overflow-hidden">
              <button
                type="button"
                onClick={() => setShowTrapBreakdown((s) => !s)}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-rose-300 hover:bg-slate-800/40 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-rose-400" />
                  Why Other Choices Are Wrong (AP Trap Breakdown)
                </span>
                {showTrapBreakdown ? (
                  <ChevronUp className="h-4 w-4 text-slate-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                )}
              </button>

              {showTrapBreakdown && (
                <div className="divide-y divide-[#1F2937] border-t border-[#1F2937]">
                  {question.options.map((opt) => {
                    const right = question.correctAnswers.includes(opt.id)
                    return (
                      <div key={opt.id} className="flex items-start gap-3 px-4 py-3 text-xs sm:text-sm">
                        <span
                          className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded font-mono text-[11px] font-bold ${
                            right
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {opt.id}
                        </span>
                        <div className={right ? 'text-emerald-100 leading-relaxed' : 'text-slate-300 leading-relaxed'}>
                          <MathText text={opt.trapExplanation} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
