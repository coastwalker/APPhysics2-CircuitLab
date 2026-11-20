import React, { useState } from 'react'
import { Award, CheckSquare, Square, Eye, EyeOff, FileEdit, Clock } from 'lucide-react'
import { FRQQuestion } from '../types'
import { MathText } from './MathText'
import { CircuitDiagram } from './CircuitDiagram'
import { PhysicsGraph } from './PhysicsGraph'

interface FRQCardProps {
  frq: FRQQuestion
  checkedRubricIds: string[]
  onToggleRubricPoint: (pointId: string) => void
  drafts: Record<string, string>
  onSaveDraft: (partLabel: string, value: string) => void
  /** In 'exam-locked' mode, hides model solution and rubric until submitted */
  locked?: boolean
}

export const FRQCard: React.FC<FRQCardProps> = ({
  frq,
  checkedRubricIds,
  onToggleRubricPoint,
  drafts,
  onSaveDraft,
  locked = false,
}) => {
  const [revealedParts, setRevealedParts] = useState<Record<string, boolean>>({})

  const toggleReveal = (label: string) => {
    setRevealedParts((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  const revealAll = () => {
    const next: Record<string, boolean> = {}
    frq.parts.forEach((p) => {
      next[p.label] = true
    })
    setRevealedParts(next)
  }

  const earnedPoints = frq.parts.reduce(
    (sum, part) =>
      sum +
      part.rubricPoints.reduce(
        (pSum, rp) => pSum + (checkedRubricIds.includes(rp.id) ? rp.points : 0),
        0
      ),
    0
  )

  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#111827] shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1F2937] bg-[#0D1322] px-5 py-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="rounded-md border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-0.5 text-xs font-mono font-bold text-emerald-300">
              FRQ {frq.number}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-400">
              <Clock className="h-3.5 w-3.5" /> ~{frq.estimatedMinutes} min
            </span>
            <span className="text-xs font-mono text-amber-300 font-semibold">
              {frq.totalPoints} AP Points
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-50">{frq.title}</h3>
          <p className="text-xs text-slate-400">{frq.subtitle}</p>
        </div>

        {!locked && (
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-3.5 py-2 text-right">
              <div className="text-[10px] font-mono uppercase text-emerald-300">Self-Graded</div>
              <div className="text-base font-mono font-extrabold text-emerald-200">
                {earnedPoints} / {frq.totalPoints} pts
              </div>
            </div>
            <button
              type="button"
              onClick={revealAll}
              className="rounded-lg border border-cyan-500/40 bg-cyan-500/15 px-3 py-2 text-xs font-semibold text-cyan-200 hover:bg-cyan-500/25 transition-colors cursor-pointer"
            >
              Reveal All Rubrics
            </button>
          </div>
        )}
      </div>

      {/* Stem & Visuals */}
      <div className="p-5 sm:p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {frq.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[#1F2937] bg-[#0B1120] px-2 py-0.5 text-[11px] font-mono text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm sm:text-[15px] leading-relaxed text-slate-200">
            <MathText text={frq.stem} />
          </p>
          {frq.circuitId && <CircuitDiagram id={frq.circuitId} />}
          {frq.graphId && <PhysicsGraph id={frq.graphId} />}
        </div>

        {/* Parts */}
        <div className="space-y-5">
          {frq.parts.map((part) => {
            const isRevealed = !locked && !!revealedParts[part.label]
            const partMax = part.rubricPoints.reduce((s, r) => s + r.points, 0)
            const partEarned = part.rubricPoints.reduce(
              (s, r) => s + (checkedRubricIds.includes(r.id) ? r.points : 0),
              0
            )

            return (
              <div
                key={part.label}
                className="rounded-xl border border-[#1F2937] bg-[#0B1120] p-4 sm:p-5 space-y-4"
              >
                {/* Part prompt */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5 text-sm sm:text-[15px] leading-relaxed text-slate-100">
                    <span className="mt-0.5 rounded-md bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 font-mono text-xs font-bold text-cyan-300 shrink-0">
                      Part {part.label}
                    </span>
                    <div>
                      <MathText text={part.prompt} />
                    </div>
                  </div>
                  <span className="shrink-0 text-xs font-mono text-slate-400">
                    {locked ? `${partMax} pts` : `${partEarned}/${partMax} pts`}
                  </span>
                </div>

                {/* Student Scratchpad */}
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                    <FileEdit className="h-3.5 w-3.5 text-cyan-400" />
                    Your Response / Derivation Scratchpad
                  </label>
                  <textarea
                    rows={4}
                    value={drafts[part.label] ?? ''}
                    onChange={(e) => onSaveDraft(part.label, e.target.value)}
                    placeholder="Write your derivation, justification, and final numerical answer with units here before checking the AP Scoring Rubric..."
                    className="w-full rounded-xl border border-[#1F2937] bg-[#090D16] px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-cyan-400/60 focus:outline-none focus:ring-1 focus:ring-cyan-400/30"
                  />
                </div>

                {/* Toggle Model Solution & Rubric */}
                {!locked && (
                  <div>
                    <button
                      type="button"
                      onClick={() => toggleReveal(part.label)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-violet-500/40 bg-violet-500/12 px-3.5 py-1.5 text-xs font-semibold text-violet-200 hover:bg-violet-500/20 transition-colors cursor-pointer"
                    >
                      {isRevealed ? (
                        <>
                          <EyeOff className="h-3.5 w-3.5" /> Hide Model Solution &amp; AP Rubric
                        </>
                      ) : (
                        <>
                          <Eye className="h-3.5 w-3.5" /> Show Model Solution &amp; Self-Grade Rubric
                        </>
                      )}
                    </button>

                    {isRevealed && (
                      <div className="mt-4 space-y-4">
                        {/* Model Solution */}
                        <div className="rounded-xl border border-cyan-500/30 bg-[#111827] p-4 space-y-3">
                          <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                            Full AP Model Solution — Part {part.label}
                          </div>
                          <div className="text-sm leading-relaxed text-slate-200">
                            <MathText text={part.modelSolution} />
                          </div>
                          {part.solutionCircuitId && (
                            <CircuitDiagram
                              id={part.solutionCircuitId}
                              caption="Reference schematic for model solution"
                            />
                          )}
                        </div>

                        {/* Interactive AP Scoring Rubric */}
                        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/6 p-4 space-y-2.5">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                            <Award className="h-4 w-4 text-emerald-400" />
                            AP Scoring Guidelines (Check every point you earned)
                          </div>
                          <div className="space-y-2">
                            {part.rubricPoints.map((rp) => {
                              const checked = checkedRubricIds.includes(rp.id)
                              return (
                                <button
                                  key={rp.id}
                                  type="button"
                                  onClick={() => onToggleRubricPoint(rp.id)}
                                  className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-all cursor-pointer ${
                                    checked
                                      ? 'border-emerald-400/60 bg-emerald-500/15 text-emerald-100'
                                      : 'border-[#1F2937] bg-[#0B1120] text-slate-300 hover:border-emerald-500/40'
                                  }`}
                                >
                                  {checked ? (
                                    <CheckSquare className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                                  ) : (
                                    <Square className="h-4 w-4 shrink-0 text-slate-500 mt-0.5" />
                                  )}
                                  <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                                    <MathText text={rp.criterion} />
                                  </div>
                                  <span className="shrink-0 rounded bg-slate-800 px-2 py-0.5 font-mono text-[11px] font-bold text-emerald-300">
                                    +{rp.points} pt
                                  </span>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
