import { useState } from 'react'
import { AppView, ModuleId } from './types'
import { useProgress } from './hooks/useProgress'
import { clearAuthSession, isAuthenticated } from './utils/auth'
import { LoginGate } from './components/LoginGate'
import { Navbar } from './components/Navbar'
import { EquationSheetDrawer } from './components/EquationSheetDrawer'
import { Dashboard } from './components/Dashboard'
import { TopicDrill } from './components/TopicDrill'
import { ExamSimulator } from './components/ExamSimulator'
import { RemediationQueue } from './components/RemediationQueue'

export default function App() {
  const [authed, setAuthed] = useState<boolean>(() => isAuthenticated())
  const [activeView, setActiveView] = useState<AppView>('dashboard')
  const [drillModule, setDrillModule] = useState<ModuleId | 'all'>('all')
  const [equationDrawerOpen, setEquationDrawerOpen] = useState(false)

  const {
    progress,
    remediationIds,
    recordMCQAttempt,
    toggleFlag,
    removeFromMissedQueue,
    toggleFRQRubricPoint,
    saveFRQDraft,
    recordExam,
    resetProgress,
  } = useProgress()

  if (!authed) {
    return <LoginGate onAuthenticated={() => setAuthed(true)} />
  }

  const handleSelectModule = (moduleId: ModuleId) => {
    setDrillModule(moduleId)
    setActiveView('drill')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleChangeView = (view: AppView) => {
    setActiveView(view)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLogout = () => {
    clearAuthSession()
    setAuthed(false)
  }

  return (
    <div className="min-h-screen bg-[#090D16] bg-circuit-grid text-[#F8FAFC] flex flex-col">
      <Navbar
        activeView={activeView}
        onChangeView={handleChangeView}
        streak={progress.streak}
        remediationCount={remediationIds.length}
        onOpenEquations={() => setEquationDrawerOpen(true)}
        onLogout={handleLogout}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {activeView === 'dashboard' && (
          <Dashboard
            progress={progress}
            remediationCount={remediationIds.length}
            onSelectModule={handleSelectModule}
            onChangeView={handleChangeView}
            onResetProgress={resetProgress}
          />
        )}

        {activeView === 'drill' && (
          <TopicDrill
            initialModule={drillModule}
            progress={progress}
            onRecordMCQ={(qId, selected, isCorrect) =>
              recordMCQAttempt(qId, selected, isCorrect)
            }
            onToggleFlag={toggleFlag}
            onToggleFRQRubric={toggleFRQRubricPoint}
            onSaveFRQDraft={saveFRQDraft}
          />
        )}

        {activeView === 'exam' && (
          <ExamSimulator
            onCompleteExam={(record, missedIds) => recordExam(record, missedIds)}
            onGoToRemediation={() => handleChangeView('remediation')}
          />
        )}

        {activeView === 'remediation' && (
          <RemediationQueue
            remediationIds={remediationIds}
            progress={progress}
            onRecordMCQ={(qId, selected, isCorrect) =>
              recordMCQAttempt(qId, selected, isCorrect)
            }
            onToggleFlag={toggleFlag}
            onRemoveMissed={removeFromMissedQueue}
            onBackToDrill={() => handleChangeView('drill')}
          />
        )}
      </main>

      <footer className="border-t border-[#1F2937] bg-[#090D16]/90 py-4 text-center text-xs font-mono text-slate-500">
        AP Physics 2: Unit 11 Mastery (CircuitLab) • 54 Exam-Accurate MCQs + 3 Rubric-Graded FRQs • Progress saved locally
      </footer>

      <EquationSheetDrawer
        open={equationDrawerOpen}
        onClose={() => setEquationDrawerOpen(false)}
      />
    </div>
  )
}
