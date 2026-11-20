import React, { useState } from 'react'
import {
  CheckCircle2,
  RotateCcw,
  Flag,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { ALL_MCQS } from '../data'
import { UserProgress } from '../types'
import { QuestionCard } from './QuestionCard'

interface RemediationQueueProps {
  remediationIds: string[]
  progress: UserProgress
  onRecordMCQ: (
    questionId: string,
    selected: ('A' | 'B' | 'C' | 'D')[],
    isCorrect: boolean
  ) => void
  onToggleFlag: (questionId: string) => void
  onRemoveMissed: (questionId: string) => void
  onBackToDrill: () => void
}

export const RemediationQueue: React.FC<RemediationQueueProps> = ({
  remediationIds,
  progress,
  onRecordMCQ,
  onToggleFlag,
  onRemoveMissed,
  onBackToDrill,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0)

  const queueQuestions = ALL_MCQS.filter((q) => remediationIds.includes(q.id))
  const safeIdx = Math.min(currentIdx, Math.max(0, queueQuestions.length - 1))
  const currentQ = queueQuestions[safeIdx]

  if (queueQuestions.length === 0) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-emerald-500/30 bg-[#111827] p-8 sm:p-12 text-center shadow-2xl space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/40 bg-emerald-500/15 text-emerald-300">
          <Sparkles className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-50">
          Remediation Queue Clear — 100% Accuracy Zone!
        </h2>
        <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          You have zero missed or flagged questions waiting for review. Keep pushing through Topic
          Drill or test your speed in the 40-minute Exam Simulator.
        </p>
        <div className="pt-2">
          <button
            onClick={onBackToDrill}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-[#090D16] hover:bg-cyan-300 transition-colors cursor-pointer"
          >
            Go to Topic Drill
          </button>
        </div>
      </div>
    )
  }

  const isMissed = progress.missedQueue.includes(currentQ.id)
  const isFlagged = progress.flaggedIds.includes(currentQ.id)

  const handleClear = () => {
    if (isMissed) onRemoveMissed(currentQ.id)
    if (isFlagged) onToggleFlag(currentQ.id)
    setCurrentIdx((i) => Math.max(0, Math.min(i, queueQuestions.length - 2)))
  }

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-rose-500/30 bg-[#111827] p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-500/40 bg-rose-500/15 text-rose-300">
            <RotateCcw className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-50">
              Missed &amp; Flagged Remediation Queue
            </h2>
            <p className="text-xs text-slate-400">
              {queueQuestions.length} weak-spot question{queueQuestions.length === 1 ? '' : 's'}{' '}
              remaining. Answer correctly and click &ldquo;Mark Remediated&rdquo; to drive this queue
              to zero.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="inline-flex items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-rose-300">
            <AlertCircle className="h-3.5 w-3.5" /> {progress.missedQueue.length} Missed
          </span>
          <span className="inline-flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-amber-300">
            <Flag className="h-3.5 w-3.5" /> {progress.flaggedIds.length} Flagged
          </span>
        </div>
      </div>

      {/* Queue Navigator */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#1F2937] bg-[#0D1322] px-4 py-3">
        <div className="flex flex-wrap gap-1.5">
          {queueQuestions.map((q, idx) => {
            const active = idx === safeIdx
            const qMissed = progress.missedQueue.includes(q.id)
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                className={`inline-flex h-7 min-w-[2.2rem] items-center justify-center gap-1 rounded-md border px-2 font-mono text-xs font-bold transition-all cursor-pointer ${
                  active
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200'
                    : qMissed
                    ? 'border-rose-500/40 bg-rose-500/12 text-rose-300'
                    : 'border-amber-500/40 bg-amber-500/12 text-amber-300'
                }`}
              >
                {idx + 1}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
            disabled={safeIdx === 0}
            className="inline-flex items-center gap-1 rounded-lg border border-[#1F2937] bg-[#111827] px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-cyan-400/50 disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" /> Prev
          </button>
          <button
            onClick={() => setCurrentIdx((i) => Math.min(queueQuestions.length - 1, i + 1))}
            disabled={safeIdx === queueQuestions.length - 1}
            className="inline-flex items-center gap-1 rounded-lg border border-[#1F2937] bg-[#111827] px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-cyan-400/50 disabled:opacity-40 cursor-pointer"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/40 bg-emerald-500/12 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 cursor-pointer"
            title="Remove this question from Remediation Queue"
          >
            <CheckCircle2 className="h-3.5 w-3.5" /> Dismiss
          </button>
        </div>
      </div>

      <QuestionCard
        question={currentQ}
        questionNumber={safeIdx + 1}
        totalQuestions={queueQuestions.length}
        mode="drill"
        onSubmitted={(selected, isCorrect) => onRecordMCQ(currentQ.id, selected, isCorrect)}
        isFlagged={isFlagged}
        onToggleFlag={() => onToggleFlag(currentQ.id)}
        showClearRemediation
        onClearRemediation={handleClear}
      />
    </div>
  )
}
