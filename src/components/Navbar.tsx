import React from 'react'
import {
  Cpu,
  LayoutDashboard,
  BookOpenCheck,
  Timer,
  RotateCcw,
  Flame,
  FileText,
  LogOut,
} from 'lucide-react'
import { AppView } from '../types'

interface NavbarProps {
  activeView: AppView
  onChangeView: (view: AppView) => void
  streak: number
  remediationCount: number
  onOpenEquations: () => void
  onLogout: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onChangeView,
  streak,
  remediationCount,
  onOpenEquations,
  onLogout,
}) => {
  const navItems: Array<{
    id: AppView
    label: string
    icon: React.ReactNode
    badge?: number
  }> = [
    { id: 'dashboard', label: 'Mastery Hub', icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: 'drill', label: 'Topic Drill', icon: <BookOpenCheck className="h-4 w-4" /> },
    { id: 'exam', label: 'Exam Simulator', icon: <Timer className="h-4 w-4" /> },
    {
      id: 'remediation',
      label: 'Remediation',
      icon: <RotateCcw className="h-4 w-4" />,
      badge: remediationCount,
    },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-[#1F2937] bg-[#090D16]/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        {/* Brand */}
        <button
          onClick={() => onChangeView('dashboard')}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 border border-cyan-400/30 text-cyan-300 group-hover:border-cyan-300/60 transition-colors">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-extrabold tracking-tight text-slate-50">
                CircuitLab
              </span>
              <span className="hidden sm:inline-flex rounded-md border border-cyan-500/30 bg-cyan-500/10 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-cyan-300">
                AP PHYS 2 • UNIT 11
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block">
              Electric Circuits 100% Mastery Suite
            </p>
          </div>
        </button>

        {/* Center nav */}
        <nav className="flex items-center gap-1 rounded-xl border border-[#1F2937] bg-[#111827] p-1">
          {navItems.map((item) => {
            const active = activeView === item.id
            return (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id)}
                className={`relative flex items-center gap-1.5 rounded-lg px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  active
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-0.5 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-rose-500/20 border border-rose-500/40 px-1 text-[10px] font-mono font-bold text-rose-300">
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Right utilities */}
        <div className="flex items-center gap-2">
          <div
            title="Current correct answer streak"
            className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1.5 text-xs font-mono font-bold text-amber-300"
          >
            <Flame className="h-3.5 w-3.5 text-amber-400" />
            <span>{streak}</span>
          </div>

          <button
            onClick={onOpenEquations}
            className="flex items-center gap-1.5 rounded-lg border border-violet-500/40 bg-violet-500/15 px-3 py-1.5 text-xs sm:text-sm font-semibold text-violet-200 hover:bg-violet-500/25 hover:border-violet-400 transition-colors cursor-pointer"
          >
            <FileText className="h-4 w-4 text-violet-300" />
            <span className="hidden md:inline">Equation Sheet</span>
            <span className="md:hidden">Eqs</span>
          </button>

          <button
            onClick={onLogout}
            title="Sign out"
            aria-label="Sign out"
            className="flex items-center justify-center rounded-lg border border-[#1F2937] bg-[#111827] p-2 text-slate-400 hover:border-rose-500/40 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
