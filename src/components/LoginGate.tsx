import React, { useState } from 'react'
import { Cpu, Lock, User, Eye, EyeOff, ShieldAlert, ArrowRight } from 'lucide-react'
import { persistAuthSession, verifyCredentials } from '../utils/auth'

interface LoginGateProps {
  onAuthenticated: () => void
}

export const LoginGate: React.FC<LoginGateProps> = ({ onAuthenticated }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (verifyCredentials(username, password)) {
      setError(null)
      persistAuthSession()
      onAuthenticated()
    } else {
      setError('Invalid username or password. Please try again.')
      setShake(true)
      window.setTimeout(() => setShake(false), 400)
    }
  }

  return (
    <div className="min-h-screen bg-[#090D16] bg-circuit-grid text-[#F8FAFC] flex items-center justify-center p-4">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div
        className={`relative w-full max-w-md rounded-2xl border border-[#1F2937] bg-[#111827]/95 p-7 sm:p-8 shadow-2xl backdrop-blur-md transition-transform ${
          shake ? 'translate-x-1' : ''
        }`}
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-7">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 border border-cyan-400/35 text-cyan-300 shadow-lg shadow-cyan-500/10">
            <Cpu className="h-7 w-7" />
          </div>
          <div>
            <span className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wider text-cyan-300">
              AP PHYSICS 2 • UNIT 11
            </span>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-50">
              CircuitLab Mastery
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Sign in to access your Electric Circuits exam prep &amp; mastery progress.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="space-y-1.5">
            <label htmlFor="cl-user" className="block text-xs font-semibold text-slate-300">
              Username
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                id="cl-user"
                type="text"
                autoComplete="username"
                autoFocus
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  if (error) setError(null)
                }}
                placeholder="Enter username"
                className="w-full rounded-xl border border-[#1F2937] bg-[#090D16] py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:border-cyan-400/70 focus:outline-none focus:ring-1 focus:ring-cyan-400/30"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="cl-pass" className="block text-xs font-semibold text-slate-300">
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                id="cl-pass"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (error) setError(null)
                }}
                placeholder="Enter password"
                className="w-full rounded-xl border border-[#1F2937] bg-[#090D16] py-2.5 pl-10 pr-11 text-sm text-slate-100 placeholder-slate-600 focus:border-cyan-400/70 focus:outline-none focus:ring-1 focus:ring-cyan-400/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/12 px-3.5 py-2.5 text-xs font-medium text-rose-200">
              <ShieldAlert className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-extrabold text-[#090D16] hover:bg-cyan-300 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            Unlock CircuitLab
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-[11px] font-mono text-slate-500">
          Protected Access • AP Physics 2 Unit 11
        </p>
      </div>
    </div>
  )
}
