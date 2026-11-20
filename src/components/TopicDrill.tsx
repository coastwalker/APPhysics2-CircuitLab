import React, { useState, useMemo, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Layers, FileSpreadsheet, CheckCircle2, XCircle } from 'lucide-react'
import { ALL_MCQS, ALL_FRQS, MODULES } from '../data'
import { ModuleId, UserProgress } from '../types'
import { QuestionCard } from './QuestionCard'
import { FRQCard } from './FRQCard'

interface TopicDrillProps {
  initialModule: ModuleId | 'all'
  progress: UserProgress
  onRecordMCQ: (
    questionId: string,
    selected: ('A' | 'B' | 'C' | 'D')[],
    isCorrect: boolean
  ) => void
  onToggleFlag: (questionId: string) => void
  onToggleFRQRubric: (frqId: string, pointId: string) => void
  onSaveFRQDraft: (frqId: string, partLabel: string, value: string) => void
}

export const TopicDrill: React.FC<TopicDrillProps> = ({
  initialModule,
  progress,
  onRecordMCQ,
  onToggleFlag,
  onToggleFRQRubric,
  onSaveFRQDraft,
}) => {
  const [selectedModule, setSelectedModule] = useState<ModuleId | 'all'>(initialModule)
  const [subTab, setSubTab] = useState<'mcq' | 'frq'>('mcq')
  const [currentIdx, setCurrentIdx] = useState(0)
  const [activeFRQIdx, setActiveFRQIdx] = useState(0)

  useEffect(() => {
    setSelectedModule(initialModule)
    setCurrentIdx(0)
    if (initialModule !== 9) {
      setSubTab('mcq')
    }
  }, [initialModule])

  const filteredQuestions = useMemo(() => {
    if (selectedModule === 'all') return ALL_MCQS
    return ALL_MCQS.filter((q) => q.moduleId === selectedModule)
  }, [selectedModule])

  const safeIdx = Math.min(currentIdx, Math.max(0, filteredQuestions.length - 1))
  const currentQuestion = filteredQuestions[safeIdx]

  const handleModuleChange = (mod: ModuleId | 'all') => {
    setSelectedModule(mod)
    setCurrentIdx(0)
    if (mod !== 9 && mod !== 'all') {
      setSubTab('mcq')
    }
  }

  return (
    <div className="space-y-6">
      {/* Module Selector Strip */}
      <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <Layers className="h-4 w-4" />
            Filter by Unit 11 Module
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-[#1F2937] bg-[#090D16] p-1">
            <button
              onClick={() => setSubTab('mcq')}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                subTab === 'mcq'
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              MCQs ({filteredQuestions.length})
            </button>
            <button
              onClick={() => setSubTab('frq')}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                subTab === 'frq'
                  ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <FileSpreadsheet className="h-3.5 w-3.5" />
              3 Full FRQs + Rubrics
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => handleModuleChange('all')}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              selectedModule === 'all' && subTab === 'mcq'
                ? 'border-cyan-400 bg-cyan-500/15 text-cyan-200'
                : 'border-[#1F2937] bg-[#0B1120] text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({ALL_MCQS.length})
          </button>
          {MODULES.map((m) => {
            const modQs = ALL_MCQS.filter((q) => q.moduleId === m.id)
            const done = modQs.filter((q) => progress.attempts[q.id]?.correct).length
            const active = selectedModule === m.id && subTab === 'mcq'
            return (
              <button
                key={m.id}
                onClick={() => {
                  handleModuleChange(m.id)
                  setSubTab('mcq')
                }}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  active
                    ? 'border-cyan-400 bg-cyan-500/15 text-cyan-200'
                    : 'border-[#1F2937] bg-[#0B1120] text-slate-400 hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                <span className="font-mono text-[11px] opacity-75 mr-1">{m.id}.</span>
                {m.shortTitle}
                <span
                  className={`ml-1.5 font-mono text-[10px] ${
                    done === modQs.length ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                >
                  {done}/{modQs.length}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {subTab === 'mcq' && currentQuestion ? (
        <div className="space-y-4">
          {/* Question Navigator Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#1F2937] bg-[#0D1322] px-4 py-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {filteredQuestions.map((q, idx) => {
                const attempt = progress.attempts[q.id]
                const isCurrent = idx === safeIdx
                let pillClass = 'border-[#1F2937] bg-[#111827] text-slate-400 hover:text-slate-200'
                if (isCurrent) {
                  pillClass = 'border-cyan-400 bg-cyan-500/20 text-cyan-200 ring-1 ring-cyan-400/40'
                } else if (attempt?.correct) {
                  pillClass = 'border-emerald-500/40 bg-emerald-500/12 text-emerald-300'
                } else if (attempt && !attempt.correct) {
                  pillClass = 'border-rose-500/40 bg-rose-500/12 text-rose-300'
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`inline-flex h-7 min-w-[2rem] items-center justify-center gap-0.5 rounded-md border px-1.5 font-mono text-xs font-bold transition-all cursor-pointer ${pillClass}`}
                    title={q.title}
                  >
                    {idx + 1}
                    {attempt?.correct && !isCurrent && <CheckCircle2 className="h-2.5 w-2.5" />}
                    {attempt && !attempt.correct && !isCurrent && <XCircle className="h-2.5 w-2.5" />}
                  </button>
                )
              })}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                disabled={safeIdx === 0}
                className="inline-flex items-center gap-1 rounded-lg border border-[#1F2937] bg-[#111827] px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-cyan-400/50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" /> Prev
              </button>
              <button
                onClick={() =>
                  setCurrentIdx((i) => Math.min(filteredQuestions.length - 1, i + 1))
                }
                disabled={safeIdx === filteredQuestions.length - 1}
                className="inline-flex items-center gap-1 rounded-lg border border-[#1F2937] bg-[#111827] px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-cyan-400/50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <QuestionCard
            question={currentQuestion}
            questionNumber={safeIdx + 1}
            totalQuestions={filteredQuestions.length}
            mode="drill"
            onSubmitted={(selected, isCorrect) =>
              onRecordMCQ(currentQuestion.id, selected, isCorrect)
            }
            isFlagged={progress.flaggedIds.includes(currentQuestion.id)}
            onToggleFlag={() => onToggleFlag(currentQuestion.id)}
            alreadyMastered={!!progress.attempts[currentQuestion.id]?.correct}
          />
        </div>
      ) : (
        /* FRQ Studio */
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {ALL_FRQS.map((frq, idx) => {
              const checked = progress.frqRubricChecked[frq.id] ?? []
              const earned = frq.parts.reduce(
                (s, p) =>
                  s +
                  p.rubricPoints.reduce(
                    (ps, rp) => ps + (checked.includes(rp.id) ? rp.points : 0),
                    0
                  ),
                0
              )
              const active = idx === activeFRQIdx
              return (
                <button
                  key={frq.id}
                  onClick={() => setActiveFRQIdx(idx)}
                  className={`rounded-xl border p-4 text-left transition-all cursor-pointer ${
                    active
                      ? 'border-emerald-400 bg-emerald-500/12 ring-1 ring-emerald-400/30'
                      : 'border-[#1F2937] bg-[#111827] hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-emerald-300">
                      FRQ {frq.number}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-300">
                      {earned}/{frq.totalPoints} pts
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-100 line-clamp-2">{frq.title}</div>
                </button>
              )
            })}
          </div>

          <FRQCard
            frq={ALL_FRQS[activeFRQIdx]}
            checkedRubricIds={progress.frqRubricChecked[ALL_FRQS[activeFRQIdx].id] ?? []}
            onToggleRubricPoint={(pointId) =>
              onToggleFRQRubric(ALL_FRQS[activeFRQIdx].id, pointId)
            }
            drafts={progress.frqDrafts[ALL_FRQS[activeFRQIdx].id] ?? {}}
            onSaveDraft={(partLabel, val) =>
              onSaveFRQDraft(ALL_FRQS[activeFRQIdx].id, partLabel, val)
            }
          />
        </div>
      )}
    </div>
  )
}
