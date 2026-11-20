import { useState, useEffect, useCallback } from 'react'
import { ExamRecord, UserProgress } from '../types'

const STORAGE_KEY = 'ap_physics2_circuitlab_progress_v1'

const DEFAULT_PROGRESS: UserProgress = {
  attempts: {},
  missedQueue: [],
  flaggedIds: [],
  streak: 0,
  bestStreak: 0,
  frqRubricChecked: {},
  frqDrafts: {},
  examHistory: [],
}

function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_PROGRESS
    const parsed = JSON.parse(raw) as Partial<UserProgress>
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      attempts: parsed.attempts ?? {},
      missedQueue: Array.isArray(parsed.missedQueue) ? parsed.missedQueue : [],
      flaggedIds: Array.isArray(parsed.flaggedIds) ? parsed.flaggedIds : [],
      frqRubricChecked: parsed.frqRubricChecked ?? {},
      frqDrafts: parsed.frqDrafts ?? {},
      examHistory: Array.isArray(parsed.examHistory) ? parsed.examHistory : [],
    }
  } catch {
    return DEFAULT_PROGRESS
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch {
      // Ignore storage quota errors
    }
  }, [progress])

  const recordMCQAttempt = useCallback(
    (
      questionId: string,
      selectedAnswers: ('A' | 'B' | 'C' | 'D')[],
      isCorrect: boolean,
      options?: { autoClearMissed?: boolean }
    ) => {
      setProgress((prev) => {
        const existing = prev.attempts[questionId]
        const nextStreak = isCorrect ? prev.streak + 1 : 0
        const nextBest = Math.max(prev.bestStreak, nextStreak)

        let nextMissed = [...prev.missedQueue]
        if (!isCorrect) {
          if (!nextMissed.includes(questionId)) {
            nextMissed.push(questionId)
          }
        } else if (options?.autoClearMissed) {
          nextMissed = nextMissed.filter((id) => id !== questionId)
        }

        return {
          ...prev,
          streak: nextStreak,
          bestStreak: nextBest,
          missedQueue: nextMissed,
          attempts: {
            ...prev.attempts,
            [questionId]: {
              questionId,
              correct: isCorrect,
              selectedAnswers,
              attemptsCount: (existing?.attemptsCount ?? 0) + 1,
              lastAttemptAt: Date.now(),
            },
          },
        }
      })
    },
    []
  )

  const toggleFlag = useCallback((questionId: string) => {
    setProgress((prev) => {
      const exists = prev.flaggedIds.includes(questionId)
      return {
        ...prev,
        flaggedIds: exists
          ? prev.flaggedIds.filter((id) => id !== questionId)
          : [...prev.flaggedIds, questionId],
      }
    })
  }, [])

  const removeFromMissedQueue = useCallback((questionId: string) => {
    setProgress((prev) => ({
      ...prev,
      missedQueue: prev.missedQueue.filter((id) => id !== questionId),
    }))
  }, [])

  const toggleFRQRubricPoint = useCallback((frqId: string, pointId: string) => {
    setProgress((prev) => {
      const current = prev.frqRubricChecked[frqId] ?? []
      const next = current.includes(pointId)
        ? current.filter((id) => id !== pointId)
        : [...current, pointId]
      return {
        ...prev,
        frqRubricChecked: {
          ...prev.frqRubricChecked,
          [frqId]: next,
        },
      }
    })
  }, [])

  const saveFRQDraft = useCallback((frqId: string, partLabel: string, value: string) => {
    setProgress((prev) => ({
      ...prev,
      frqDrafts: {
        ...prev.frqDrafts,
        [frqId]: {
          ...(prev.frqDrafts[frqId] ?? {}),
          [partLabel]: value,
        },
      },
    }))
  }, [])

  const recordExam = useCallback((record: ExamRecord, missedQuestionIds: string[]) => {
    setProgress((prev) => {
      const mergedMissed = Array.from(new Set([...prev.missedQueue, ...missedQuestionIds]))
      return {
        ...prev,
        missedQueue: mergedMissed,
        examHistory: [record, ...prev.examHistory].slice(0, 15),
      }
    })
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  const remediationIds = Array.from(new Set([...progress.missedQueue, ...progress.flaggedIds]))

  return {
    progress,
    remediationIds,
    recordMCQAttempt,
    toggleFlag,
    removeFromMissedQueue,
    toggleFRQRubricPoint,
    saveFRQDraft,
    recordExam,
    resetProgress,
  }
}
