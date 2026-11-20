import React from 'react'
import {
  Target,
  Flame,
  Timer,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Award,
  Trash2,
  Zap,
} from 'lucide-react'
import { ALL_MCQS, ALL_FRQS, MODULES } from '../data'
import { AppView, ModuleId, UserProgress } from '../types'

interface DashboardProps {
  progress: UserProgress
  remediationCount: number
  onSelectModule: (moduleId: ModuleId) => void
  onChangeView: (view: AppView) => void
  onResetProgress: () => void
}

const ACCENT_MAP = {
  cyan: {
    border: 'hover:border-cyan-400/50',
    badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    bar: 'bg-cyan-400',
  },
  amber: {
    border: 'hover:border-amber-400/50',
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    bar: 'bg-amber-400',
  },
  violet: {
    border: 'hover:border-violet-400/50',
    badge: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    bar: 'bg-violet-400',
  },
  emerald: {
    border: 'hover:border-emerald-400/50',
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    bar: 'bg-emerald-400',
  },
  rose: {
    border: 'hover:border-rose-400/50',
    badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    bar: 'bg-rose-400',
  },
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  remediationCount,
  onSelectModule,
  onChangeView,
  onResetProgress,
}) => {
  const totalMCQs = ALL_MCQS.length
  const masteredMCQs = ALL_MCQS.filter((q) => progress.attempts[q.id]?.correct).length

  const totalFRQPoints = ALL_FRQS.reduce((sum, f) => sum + f.totalPoints, 0)
  const earnedFRQPoints = ALL_FRQS.reduce((sum, f) => {
    const checked = progress.frqRubricChecked[f.id] ?? []
    return (
      sum +
      f.parts.reduce(
        (ps, p) =>
          ps + p.rubricPoints.reduce((rs, rp) => rs + (checked.includes(rp.id) ? rp.points : 0), 0),
        0
      )
    )
  }, 0)

  const overallMasteryPct = Math.round(
    ((masteredMCQs + earnedFRQPoints) / (totalMCQs + totalFRQPoints)) * 100
  )

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-[#1F2937] bg-gradient-to-br from-[#111827] via-[#0F172A] to-[#0B1120] p-6 sm:p-8 shadow-2xl">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative grid gap-6 lg:grid-cols-12 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono font-semibold text-cyan-300">
              <Zap className="h-3.5 w-3.5" />
              GOAL: 100% ON AP PHYSICS 2 UNIT 11 EXAM
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-50">
              AP Physics 2: Unit 11 Mastery{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">
                (CircuitLab)
              </span>
            </h1>
            <p className="max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
              Master every College Board Unit 11 concept—from non-ideal meter traps and CW/CCW
              potential graphs to complex RC time-constant ratios, AP &ldquo;Select Two&rdquo; items,
              and rubric-graded FRQs.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onChangeView('exam')}
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-[#090D16] hover:bg-cyan-300 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <Timer className="h-4 w-4" />
                Launch 40-Min Exam Simulator
              </button>
              <button
                onClick={() => onChangeView('remediation')}
                className="inline-flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/12 px-4 py-2.5 text-sm font-semibold text-rose-200 hover:bg-rose-500/20 transition-all cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                Remediation Queue ({remediationCount})
              </button>
            </div>
          </div>

          {/* Mastery Progress Card */}
          <div className="lg:col-span-4 rounded-2xl border border-[#1F2937] bg-[#090D16]/85 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Unit 11 Mastery
              </span>
              <span className="text-2xl font-mono font-extrabold text-cyan-300">
                {overallMasteryPct}%
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 transition-all duration-500"
                style={{ width: `${overallMasteryPct}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="rounded-xl border border-[#1F2937] bg-[#111827] p-3">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  MCQs Mastered
                </div>
                <div className="mt-1 font-mono text-lg font-bold text-slate-100">
                  {masteredMCQs}
                  <span className="text-xs text-slate-500">/{totalMCQs}</span>
                </div>
              </div>
              <div className="rounded-xl border border-[#1F2937] bg-[#111827] p-3">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Award className="h-3.5 w-3.5 text-violet-400" />
                  FRQ Rubric Pts
                </div>
                <div className="mt-1 font-mono text-lg font-bold text-slate-100">
                  {earnedFRQPoints}
                  <span className="text-xs text-slate-500">/{totalFRQPoints}</span>
                </div>
              </div>
              <div className="rounded-xl border border-[#1F2937] bg-[#111827] p-3">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Flame className="h-3.5 w-3.5 text-amber-400" />
                  Best Streak
                </div>
                <div className="mt-1 font-mono text-lg font-bold text-amber-300">
                  {progress.bestStreak}
                </div>
              </div>
              <div className="rounded-xl border border-[#1F2937] bg-[#111827] p-3">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Target className="h-3.5 w-3.5 text-rose-400" />
                  Weak Spots
                </div>
                <div className="mt-1 font-mono text-lg font-bold text-rose-300">
                  {remediationCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9 Targeted Modules Grid */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-50">9 Targeted AP Unit 11 Modules</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {totalMCQs} AP-accurate MCQs + {ALL_FRQS.length} full rubric-graded FRQs. Click any
              module to start drilling.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((mod) => {
            const modQs = ALL_MCQS.filter((q) => q.moduleId === mod.id)
            const modMastered = modQs.filter((q) => progress.attempts[q.id]?.correct).length
            const pct = modQs.length > 0 ? Math.round((modMastered / modQs.length) * 100) : 0
            const style = ACCENT_MAP[mod.accent]

            return (
              <button
                key={mod.id}
                onClick={() => onSelectModule(mod.id)}
                className={`group flex flex-col justify-between rounded-2xl border border-[#1F2937] bg-[#111827] p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl ${style.border} cursor-pointer`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-mono font-bold ${style.badge}`}
                    >
                      MODULE {mod.id}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {mod.highTrap && (
                        <span className="inline-flex items-center gap-1 rounded-md border border-rose-500/40 bg-rose-500/12 px-2 py-0.5 text-[10px] font-bold uppercase text-rose-300">
                          <AlertTriangle className="h-3 w-3" /> High-Trap
                        </span>
                      )}
                      {pct === 100 && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-200 transition-colors">
                      {mod.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{mod.subtitle}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {mod.keyTopics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-md bg-[#090D16] border border-[#1F2937] px-2 py-0.5 text-[10.5px] font-mono text-slate-400"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#1F2937] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400">
                      {modMastered}/{modQs.length} MCQs
                      {mod.id === 9 ? ' + 3 FRQs' : ''}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-cyan-300 group-hover:translate-x-0.5 transition-transform">
                      {pct}% <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        pct === 100 ? 'bg-emerald-400' : style.bar
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Recent Exam Simulator History & Reset */}
      <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#1F2937] bg-[#111827] p-5">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-slate-100">Exam Simulator History</h3>
          {progress.examHistory.length === 0 ? (
            <p className="text-xs text-slate-400">
              No timed exams completed yet. Take the 40-minute Perfect Score Simulator when ready!
            </p>
          ) : (
            <div className="flex flex-wrap gap-2 pt-1">
              {progress.examHistory.slice(0, 5).map((ex) => (
                <div
                  key={ex.id}
                  className="rounded-lg border border-[#1F2937] bg-[#0B1120] px-3 py-1.5 text-xs font-mono"
                >
                  <span
                    className={
                      ex.percentScore >= 90
                        ? 'text-emerald-400 font-bold'
                        : ex.percentScore >= 75
                        ? 'text-amber-300 font-bold'
                        : 'text-rose-400 font-bold'
                    }
                  >
                    {ex.percentScore}%
                  </span>
                  <span className="text-slate-500">
                    {' '}
                    ({ex.mcqScore}/{ex.mcqTotal} MCQ • {ex.frqScore}/{ex.frqTotal} FRQ)
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => {
            if (window.confirm('Reset all saved mastery scores, streaks, and FRQ rubrics?')) {
              onResetProgress()
            }
          }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#1F2937] bg-[#090D16] px-3 py-1.5 text-xs font-medium text-slate-400 hover:border-rose-500/40 hover:text-rose-300 transition-colors cursor-pointer"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Reset Progress
        </button>
      </section>
    </div>
  )
}
