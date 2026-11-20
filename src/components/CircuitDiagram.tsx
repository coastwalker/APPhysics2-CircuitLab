import React from 'react'
import { CircuitDiagramId } from '../types'

// Semantic Dark-Mode Circuit Palette
const COLORS = {
  wire: '#22D3EE',       // Cyan
  wireMuted: '#38BDF8',
  voltage: '#FBBF24',    // Amber
  bulbGlow: 'rgba(251, 191, 36, 0.22)',
  capacitor: '#A78BFA',  // Violet
  correct: '#34D399',    // Emerald
  trap: '#FB7185',       // Rose
  text: '#F8FAFC',
  subtext: '#94A3B8',
  bg: '#0B1120',
  surface: '#111827',
}

// ============================================================
// Reusable SVG Schematic Primitives
// ============================================================

export const Wire: React.FC<{ d: string; dashed?: boolean; color?: string; width?: number }> = ({
  d,
  dashed = false,
  color = COLORS.wire,
  width = 2.2,
}) => (
  <path
    d={d}
    fill="none"
    stroke={color}
    strokeWidth={width}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeDasharray={dashed ? '5 4' : undefined}
  />
)

export const Junction: React.FC<{ x: number; y: number; label?: string; dx?: number; dy?: number; color?: string }> = ({
  x,
  y,
  label,
  dx = 0,
  dy = -12,
  color = COLORS.wire,
}) => (
  <g>
    <circle cx={x} cy={y} r={3.8} fill={color} stroke={COLORS.bg} strokeWidth={1.2} />
    {label && (
      <text
        x={x + dx}
        y={y + dy}
        fill={COLORS.text}
        fontSize={12}
        fontWeight={700}
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
      >
        {label}
      </text>
    )}
  </g>
)

export const CurrentArrow: React.FC<{
  x: number
  y: number
  dir: 'right' | 'left' | 'up' | 'down'
  label?: string
  dx?: number
  dy?: number
  color?: string
}> = ({ x, y, dir, label, dx = 0, dy = -12, color = COLORS.voltage }) => {
  const rot = dir === 'right' ? 0 : dir === 'down' ? 90 : dir === 'left' ? 180 : -90
  return (
    <g>
      <g transform={`translate(${x}, ${y}) rotate(${rot})`}>
        <polygon points="7,0 -5,-5 -2,0 -5,5" fill={color} />
      </g>
      {label && (
        <text
          x={x + dx}
          y={y + dy}
          fill={color}
          fontSize={11.5}
          fontWeight={600}
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
        >
          {label}
        </text>
      )}
    </g>
  )
}

/**
 * Battery centered at (x, y).
 * orientation='vertical': top is + by default (flip=true puts + at bottom). Spans 24px (y-12 to y+12).
 * orientation='horizontal': right is + by default (flip=true puts + at left). Spans 24px (x-12 to x+12).
 */
export const Battery: React.FC<{
  x: number
  y: number
  orientation?: 'vertical' | 'horizontal'
  flip?: boolean
  label?: string
  labelDx?: number
  labelDy?: number
  sublabel?: string
}> = ({ x, y, orientation = 'vertical', flip = false, label, labelDx, labelDy, sublabel }) => {
  if (orientation === 'vertical') {
    const posY = flip ? y + 6 : y - 6
    const negY = flip ? y - 6 : y + 6
    return (
      <g>
        {/* Clear wire gap */}
        <line x1={x} y1={y - 12} x2={x} y2={y + 12} stroke={COLORS.bg} strokeWidth={6} />
        {/* Lead stubs */}
        <line x1={x} y1={y - 12} x2={x} y2={y - 6} stroke={COLORS.wire} strokeWidth={2.2} />
        <line x1={x} y1={y + 6} x2={x} y2={y + 12} stroke={COLORS.wire} strokeWidth={2.2} />
        {/* Long + plate */}
        <line x1={x - 16} y1={posY} x2={x + 16} y2={posY} stroke={COLORS.voltage} strokeWidth={2.6} strokeLinecap="round" />
        {/* Short thick - plate */}
        <line x1={x - 8} y1={negY} x2={x + 8} y2={negY} stroke={COLORS.subtext} strokeWidth={3.8} strokeLinecap="round" />
        {/* + / - signs */}
        <text x={x + 20} y={posY + 4} fill={COLORS.voltage} fontSize={12} fontWeight={700} fontFamily="JetBrains Mono, monospace">+</text>
        <text x={x + 20} y={negY + 4} fill={COLORS.subtext} fontSize={12} fontWeight={700} fontFamily="JetBrains Mono, monospace">−</text>
        {label && (
          <text
            x={x + (labelDx ?? -26)}
            y={y + (labelDy ?? 4)}
            fill={COLORS.voltage}
            fontSize={12.5}
            fontWeight={700}
            textAnchor="end"
            fontFamily="JetBrains Mono, monospace"
          >
            {label}
          </text>
        )}
        {sublabel && (
          <text
            x={x + (labelDx ?? -26)}
            y={y + (labelDy ?? 4) + 14}
            fill={COLORS.trap}
            fontSize={10.5}
            fontWeight={600}
            textAnchor="end"
            fontFamily="JetBrains Mono, monospace"
          >
            {sublabel}
          </text>
        )}
      </g>
    )
  }

  const posX = flip ? x - 6 : x + 6
  const negX = flip ? x + 6 : x - 6
  return (
    <g>
      <line x1={x - 12} y1={y} x2={x + 12} y2={y} stroke={COLORS.bg} strokeWidth={6} />
      <line x1={x - 12} y1={y} x2={x - 6} y2={y} stroke={COLORS.wire} strokeWidth={2.2} />
      <line x1={x + 6} y1={y} x2={x + 12} y2={y} stroke={COLORS.wire} strokeWidth={2.2} />
      <line x1={posX} y1={y - 16} x2={posX} y2={y + 16} stroke={COLORS.voltage} strokeWidth={2.6} strokeLinecap="round" />
      <line x1={negX} y1={y - 8} x2={negX} y2={y + 8} stroke={COLORS.subtext} strokeWidth={3.8} strokeLinecap="round" />
      <text x={posX + (flip ? -10 : 5)} y={y - 14} fill={COLORS.voltage} fontSize={11} fontWeight={700} fontFamily="JetBrains Mono, monospace">+</text>
      <text x={negX + (flip ? 4 : -11)} y={y - 14} fill={COLORS.subtext} fontSize={11} fontWeight={700} fontFamily="JetBrains Mono, monospace">−</text>
      {label && (
        <text
          x={x + (labelDx ?? 0)}
          y={y + (labelDy ?? 28)}
          fill={COLORS.voltage}
          fontSize={12}
          fontWeight={700}
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
        >
          {label}
        </text>
      )}
    </g>
  )
}

/**
 * Zig-zag Resistor centered at (x, y), total span 48px (-24 to +24).
 */
export const Resistor: React.FC<{
  x: number
  y: number
  orientation?: 'horizontal' | 'vertical'
  label?: string
  labelDx?: number
  labelDy?: number
  color?: string
}> = ({ x, y, orientation = 'horizontal', label, labelDx, labelDy, color = COLORS.text }) => {
  if (orientation === 'horizontal') {
    const d = `M ${x - 24} ${y} L ${x - 18} ${y} L ${x - 15} ${y - 7} L ${x - 9} ${y + 7} L ${x - 3} ${y - 7} L ${x + 3} ${y + 7} L ${x + 9} ${y - 7} L ${x + 15} ${y + 7} L ${x + 18} ${y} L ${x + 24} ${y}`
    return (
      <g>
        <line x1={x - 23} y1={y} x2={x + 23} y2={y} stroke={COLORS.bg} strokeWidth={10} />
        <path d={d} fill="none" stroke={color} strokeWidth={2.2} strokeLinejoin="round" strokeLinecap="round" />
        {label && (
          <text
            x={x + (labelDx ?? 0)}
            y={y + (labelDy ?? -13)}
            fill={color}
            fontSize={12}
            fontWeight={600}
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
          >
            {label}
          </text>
        )}
      </g>
    )
  }

  const d = `M ${x} ${y - 24} L ${x} ${y - 18} L ${x + 7} ${y - 15} L ${x - 7} ${y - 9} L ${x + 7} ${y - 3} L ${x - 7} ${y + 3} L ${x + 7} ${y + 9} L ${x - 7} ${y + 15} L ${x} ${y + 18} L ${x} ${y + 24}`
  return (
    <g>
      <line x1={x} y1={y - 23} x2={x} y2={y + 23} stroke={COLORS.bg} strokeWidth={10} />
      <path d={d} fill="none" stroke={color} strokeWidth={2.2} strokeLinejoin="round" strokeLinecap="round" />
      {label && (
        <text
          x={x + (labelDx ?? 16)}
          y={y + (labelDy ?? 4)}
          fill={color}
          fontSize={12}
          fontWeight={600}
          textAnchor={(labelDx ?? 16) >= 0 ? 'start' : 'end'}
          fontFamily="JetBrains Mono, monospace"
        >
          {label}
        </text>
      )}
    </g>
  )
}

/**
 * Light Bulb centered at (x, y), radius 14px.
 */
export const Bulb: React.FC<{
  x: number
  y: number
  label?: string
  labelDx?: number
  labelDy?: number
  lit?: boolean
}> = ({ x, y, label, labelDx = 0, labelDy = -20, lit = true }) => (
  <g>
    {lit && <circle cx={x} cy={y} r={19} fill={COLORS.bulbGlow} />}
    <circle
      cx={x}
      cy={y}
      r={14}
      fill={COLORS.surface}
      stroke={lit ? COLORS.voltage : COLORS.subtext}
      strokeWidth={2.2}
    />
    {/* Classic filament loop inside bulb */}
    <path
      d={`M ${x - 9} ${y + 5} L ${x - 4} ${y - 4} Q ${x} ${y - 9} ${x + 4} ${y - 4} L ${x + 9} ${y + 5}`}
      fill="none"
      stroke={lit ? COLORS.voltage : COLORS.subtext}
      strokeWidth={1.9}
      strokeLinecap="round"
    />
    {label && (
      <text
        x={x + labelDx}
        y={y + labelDy}
        fill={lit ? COLORS.voltage : COLORS.subtext}
        fontSize={12}
        fontWeight={700}
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
      >
        {label}
      </text>
    )}
  </g>
)

/**
 * Capacitor centered at (x, y), gap 10px, plates 26px wide.
 */
export const Capacitor: React.FC<{
  x: number
  y: number
  orientation?: 'horizontal' | 'vertical'
  label?: string
  labelDx?: number
  labelDy?: number
}> = ({ x, y, orientation = 'vertical', label, labelDx, labelDy }) => {
  if (orientation === 'vertical') {
    return (
      <g>
        <line x1={x} y1={y - 12} x2={x} y2={y + 12} stroke={COLORS.bg} strokeWidth={8} />
        <line x1={x} y1={y - 12} x2={x} y2={y - 5} stroke={COLORS.wire} strokeWidth={2.2} />
        <line x1={x} y1={y + 5} x2={x} y2={y + 12} stroke={COLORS.wire} strokeWidth={2.2} />
        <line x1={x - 14} y1={y - 5} x2={x + 14} y2={y - 5} stroke={COLORS.capacitor} strokeWidth={2.8} strokeLinecap="round" />
        <line x1={x - 14} y1={y + 5} x2={x + 14} y2={y + 5} stroke={COLORS.capacitor} strokeWidth={2.8} strokeLinecap="round" />
        {label && (
          <text
            x={x + (labelDx ?? 20)}
            y={y + (labelDy ?? 4)}
            fill={COLORS.capacitor}
            fontSize={12}
            fontWeight={700}
            textAnchor={(labelDx ?? 20) >= 0 ? 'start' : 'end'}
            fontFamily="JetBrains Mono, monospace"
          >
            {label}
          </text>
        )}
      </g>
    )
  }

  return (
    <g>
      <line x1={x - 12} y1={y} x2={x + 12} y2={y} stroke={COLORS.bg} strokeWidth={8} />
      <line x1={x - 12} y1={y} x2={x - 5} y2={y} stroke={COLORS.wire} strokeWidth={2.2} />
      <line x1={x + 5} y1={y} x2={x + 12} y2={y} stroke={COLORS.wire} strokeWidth={2.2} />
      <line x1={x - 5} y1={y - 14} x2={x - 5} y2={y + 14} stroke={COLORS.capacitor} strokeWidth={2.8} strokeLinecap="round" />
      <line x1={x + 5} y1={y - 14} x2={x + 5} y2={y + 14} stroke={COLORS.capacitor} strokeWidth={2.8} strokeLinecap="round" />
      {label && (
        <text
          x={x + (labelDx ?? 0)}
          y={y + (labelDy ?? -19)}
          fill={COLORS.capacitor}
          fontSize={12}
          fontWeight={700}
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
        >
          {label}
        </text>
      )}
    </g>
  )
}

/**
 * Open or closed switch centered at (x, y), spans 30px (-15 to +15).
 */
export const Switch: React.FC<{
  x: number
  y: number
  orientation?: 'horizontal' | 'vertical'
  closed?: boolean
  label?: string
  labelDx?: number
  labelDy?: number
}> = ({ x, y, orientation = 'horizontal', closed = false, label, labelDx, labelDy }) => {
  if (orientation === 'horizontal') {
    return (
      <g>
        <line x1={x - 15} y1={y} x2={x + 15} y2={y} stroke={COLORS.bg} strokeWidth={8} />
        <circle cx={x - 13} cy={y} r={3} fill={COLORS.bg} stroke={COLORS.voltage} strokeWidth={2} />
        <circle cx={x + 13} cy={y} r={3} fill={COLORS.bg} stroke={COLORS.voltage} strokeWidth={2} />
        {closed ? (
          <line x1={x - 10} y1={y} x2={x + 10} y2={y} stroke={COLORS.correct} strokeWidth={2.4} strokeLinecap="round" />
        ) : (
          <line x1={x - 10} y1={y - 1} x2={x + 10} y2={y - 13} stroke={COLORS.voltage} strokeWidth={2.4} strokeLinecap="round" />
        )}
        {label && (
          <text
            x={x + (labelDx ?? 0)}
            y={y + (labelDy ?? -17)}
            fill={closed ? COLORS.correct : COLORS.voltage}
            fontSize={11.5}
            fontWeight={700}
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
          >
            {label}
          </text>
        )}
      </g>
    )
  }

  return (
    <g>
      <line x1={x} y1={y - 15} x2={x} y2={y + 15} stroke={COLORS.bg} strokeWidth={8} />
      <circle cx={x} cy={y - 13} r={3} fill={COLORS.bg} stroke={COLORS.voltage} strokeWidth={2} />
      <circle cx={x} cy={y + 13} r={3} fill={COLORS.bg} stroke={COLORS.voltage} strokeWidth={2} />
      {closed ? (
        <line x1={x} y1={y - 10} x2={x} y2={y + 10} stroke={COLORS.correct} strokeWidth={2.4} strokeLinecap="round" />
      ) : (
        <line x1={x} y1={y - 10} x2={x + 13} y2={y + 9} stroke={COLORS.voltage} strokeWidth={2.4} strokeLinecap="round" />
      )}
      {label && (
        <text
          x={x + (labelDx ?? 19)}
          y={y + (labelDy ?? 4)}
          fill={closed ? COLORS.correct : COLORS.voltage}
          fontSize={11.5}
          fontWeight={700}
          textAnchor="start"
          fontFamily="JetBrains Mono, monospace"
        >
          {label}
        </text>
      )}
    </g>
  )
}

/**
 * Ideal or Non-Ideal Ammeter / Voltmeter / Motor centered at (x, y), radius 14px.
 */
export const Meter: React.FC<{
  x: number
  y: number
  type: 'A' | 'V' | 'M'
  nonIdeal?: boolean
  label?: string
  labelDx?: number
  labelDy?: number
}> = ({ x, y, type, nonIdeal = false, label, labelDx = 0, labelDy = -20 }) => {
  const stroke = nonIdeal
    ? COLORS.trap
    : type === 'A'
    ? COLORS.correct
    : type === 'V'
    ? COLORS.voltage
    : COLORS.capacitor

  return (
    <g>
      <circle cx={x} cy={y} r={14} fill={COLORS.surface} stroke={stroke} strokeWidth={2.3} strokeDasharray={nonIdeal ? '4 2' : undefined} />
      <text
        x={x}
        y={y + 4.5}
        fill={stroke}
        fontSize={13}
        fontWeight={800}
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
      >
        {type}
      </text>
      {label && (
        <text
          x={x + labelDx}
          y={y + labelDy}
          fill={stroke}
          fontSize={10.5}
          fontWeight={600}
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
        >
          {label}
        </text>
      )}
    </g>
  )
}

// ============================================================
// Main CircuitDiagram Component
// ============================================================

interface CircuitDiagramProps {
  id: CircuitDiagramId
  caption?: string
  className?: string
}

export const CircuitDiagram: React.FC<CircuitDiagramProps> = ({ id, caption, className = '' }) => {
  const renderSchematic = () => {
    switch (id) {
      case 'm1-wire-field':
        return (
          <svg viewBox="0 0 420 150" className="w-full max-w-md mx-auto">
            {/* Wire cylinder */}
            <rect x="65" y="42" width="290" height="58" rx="8" fill="#111827" stroke="#22D3EE" strokeWidth="2.2" />
            <text x="35" y="75" fill="#FBBF24" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">V+</text>
            <text x="385" y="75" fill="#94A3B8" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">V−</text>
            {/* Electric field arrow E */}
            <line x1="120" y1="24" x2="300" y2="24" stroke="#FBBF24" strokeWidth="2.2" />
            <polygon points="304,24 294,19 296,24 294,29" fill="#FBBF24" />
            <text x="210" y="16" fill="#FBBF24" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Electric Field E →</text>
            {/* Free electrons drifting left */}
            {[125, 200, 275].map((cx, i) => (
              <g key={i}>
                <circle cx={cx} cy={71} r={10} fill="#0F172A" stroke="#22D3EE" strokeWidth="1.8" />
                <text x={cx} y={75} fill="#22D3EE" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">e−</text>
                <line x1={cx - 14} y1={71} x2={cx - 32} y2={71} stroke="#22D3EE" strokeWidth="1.8" />
                <polygon points={`${cx - 35},71 ${cx - 27},67 ${cx - 29},71 ${cx - 27},75`} fill="#22D3EE" />
              </g>
            ))}
            <text x="210" y="126" fill="#94A3B8" fontSize="11.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
              Conventional current I points right; electrons drift left
            </text>
          </svg>
        )

      case 'm1-varying-wire':
        return (
          <svg viewBox="0 0 420 155" className="w-full max-w-md mx-auto">
            {/* Wide section X */}
            <rect x="45" y="34" width="145" height="72" fill="#111827" stroke="#22D3EE" strokeWidth="2.2" />
            {/* Narrow section Y */}
            <rect x="190" y="54" width="165" height="32" fill="#111827" stroke="#22D3EE" strokeWidth="2.2" />
            <text x="115" y="25" fill="#F8FAFC" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Section X (Area = 2A)</text>
            <text x="272" y="45" fill="#F8FAFC" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Section Y (Area = A)</text>
            <CurrentArrow x={115} y={70} dir="right" label="I_X" dy={-14} />
            <CurrentArrow x={272} y={70} dir="right" label="I_Y" dy={24} />
            <text x="210" y="135" fill="#94A3B8" fontSize="11.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
              Steady DC current flowing through two segments in series
            </text>
          </svg>
        )

      case 'm2-cylinders':
        return (
          <svg viewBox="0 0 420 160" className="w-full max-w-md mx-auto">
            {/* Wire 1 */}
            <text x="110" y="24" fill="#22D3EE" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Wire 1 (R)</text>
            <rect x="40" y="44" width="140" height="44" rx="4" fill="#1E293B" stroke="#22D3EE" strokeWidth="2" />
            <ellipse cx="40" cy="66" rx="8" ry="22" fill="#0F172A" stroke="#22D3EE" strokeWidth="2" />
            <ellipse cx="180" cy="66" rx="8" ry="22" fill="#1E293B" stroke="#22D3EE" strokeWidth="2" />
            <text x="110" y="112" fill="#F8FAFC" fontSize="11.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Length L, Radius r</text>
            {/* Wire 2 */}
            <text x="315" y="24" fill="#FBBF24" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Wire 2 (R′ = ?)</text>
            <rect x="280" y="55" width="70" height="22" rx="3" fill="#1E293B" stroke="#FBBF24" strokeWidth="2" />
            <ellipse cx="280" cy="66" rx="5" ry="11" fill="#0F172A" stroke="#FBBF24" strokeWidth="2" />
            <ellipse cx="350" cy="66" rx="5" ry="11" fill="#1E293B" stroke="#FBBF24" strokeWidth="2" />
            <text x="315" y="112" fill="#F8FAFC" fontSize="11.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Length L/2, Radius r/2</text>
            <text x="210" y="142" fill="#94A3B8" fontSize="11" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Same ohmic metal (identical resistivity ρ)</text>
          </svg>
        )

      case 'm3-symbolic-resistors':
        return (
          <svg viewBox="0 0 420 190" className="w-full max-w-md mx-auto">
            <Wire d="M 45 95 L 185 95 M 185 50 L 325 50 M 185 140 L 325 140 M 185 50 L 185 140 M 325 50 L 325 140 M 325 95 L 380 95" />
            <Resistor x={115} y={95} label="R₁" />
            <Resistor x={255} y={50} label="R₂" />
            <Resistor x={255} y={140} label="R₃" labelDy={24} />
            <Junction x={45} y={95} label="X" dy={-12} />
            <Junction x={185} y={95} />
            <Junction x={325} y={95} />
            <Junction x={380} y={95} label="Y" dy={-12} />
          </svg>
        )

      case 'm3-symbolic-capacitors':
        return (
          <svg viewBox="0 0 420 195" className="w-full max-w-md mx-auto">
            <Wire d="M 45 98 L 105 98 M 105 48 L 325 48 M 105 148 L 325 148 M 105 48 L 105 148 M 325 48 L 325 148 M 325 98 L 380 98" />
            <Capacitor x={215} y={48} orientation="horizontal" label="C₁" labelDy={-20} />
            <Capacitor x={170} y={148} orientation="horizontal" label="C₂" labelDy={28} />
            <Capacitor x={265} y={148} orientation="horizontal" label="C₃" labelDy={28} />
            <Junction x={45} y={98} label="A" dy={-12} />
            <Junction x={105} y={98} />
            <Junction x={325} y={98} />
            <Junction x={380} y={98} label="B" dy={-12} />
          </svg>
        )

      case 'm3-cap-sets-ab':
        return (
          <svg viewBox="0 0 460 190" className="w-full max-w-lg mx-auto">
            {/* Set A: 3 identical C in series */}
            <rect x="10" y="12" width="205" height="164" rx="10" fill="#0F172A" stroke="#1F2937" strokeWidth="1.5" />
            <text x="112" y="34" fill="#A78BFA" fontSize="12.5" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Set A (All Series)</text>
            <Wire d="M 28 102 L 196 102" />
            <Capacitor x={65} y={102} orientation="horizontal" label="C" />
            <Capacitor x={112} y={102} orientation="horizontal" label="C" />
            <Capacitor x={159} y={102} orientation="horizontal" label="C" />
            <Junction x={28} y={102} />
            <Junction x={196} y={102} />
            {/* Set B: 1 in series with 2 in parallel */}
            <rect x="235" y="12" width="215" height="164" rx="10" fill="#0F172A" stroke="#1F2937" strokeWidth="1.5" />
            <text x="342" y="34" fill="#22D3EE" fontSize="12.5" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Set B (Series + Parallel)</text>
            <Wire d="M 252 102 L 330 102 M 330 70 L 410 70 M 330 134 L 410 134 M 330 70 L 330 134 M 410 70 L 410 134 M 410 102 L 434 102" />
            <Capacitor x={290} y={102} orientation="horizontal" label="C" />
            <Capacitor x={370} y={70} orientation="horizontal" label="C" labelDy={-18} />
            <Capacitor x={370} y={134} orientation="horizontal" label="C" labelDy={26} />
            <Junction x={252} y={102} />
            <Junction x={330} y={102} />
            <Junction x={410} y={102} />
            <Junction x={434} y={102} />
          </svg>
        )

      case 'm3-resistor-networks-rank':
        return (
          <svg viewBox="0 0 480 230" className="w-full max-w-xl mx-auto">
            {/* Network 1: 3 in series */}
            <g transform="translate(8,8)">
              <rect width="222" height="100" rx="8" fill="#0F172A" stroke="#1F2937" />
              <text x="12" y="20" fill="#22D3EE" fontSize="11.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">Network I</text>
              <Wire d="M 16 62 L 206 62" />
              <Resistor x={54} y={62} label="R" />
              <Resistor x={111} y={62} label="R" />
              <Resistor x={168} y={62} label="R" />
            </g>
            {/* Network 2: 2 parallel + 1 series */}
            <g transform="translate(248,8)">
              <rect width="222" height="100" rx="8" fill="#0F172A" stroke="#1F2937" />
              <text x="12" y="20" fill="#FBBF24" fontSize="11.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">Network II</text>
              <Wire d="M 16 58 L 94 58 M 94 36 L 186 36 M 94 80 L 186 80 M 94 36 L 94 80 M 186 36 L 186 80 M 186 58 L 208 58" />
              <Resistor x={54} y={58} label="R" />
              <Resistor x={140} y={36} label="R" labelDy={-10} />
              <Resistor x={140} y={80} label="R" labelDy={18} />
            </g>
            {/* Network 3: 2 series in parallel with 1 */}
            <g transform="translate(8,120)">
              <rect width="222" height="100" rx="8" fill="#0F172A" stroke="#1F2937" />
              <text x="12" y="20" fill="#A78BFA" fontSize="11.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">Network III</text>
              <Wire d="M 16 58 L 38 58 M 38 36 L 184 36 M 38 80 L 184 80 M 38 36 L 38 80 M 184 36 L 184 80 M 184 58 L 206 58" />
              <Resistor x={80} y={36} label="R" labelDy={-10} />
              <Resistor x={142} y={36} label="R" labelDy={-10} />
              <Resistor x={111} y={80} label="R" labelDy={18} />
            </g>
            {/* Network 4: 3 in parallel */}
            <g transform="translate(248,120)">
              <rect width="222" height="100" rx="8" fill="#0F172A" stroke="#1F2937" />
              <text x="12" y="20" fill="#34D399" fontSize="11.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">Network IV</text>
              <Wire d="M 16 58 L 48 58 M 48 28 L 174 28 M 48 58 L 174 58 M 48 88 L 174 88 M 48 28 L 48 88 M 174 28 L 174 88 M 174 58 L 206 58" />
              <Resistor x={111} y={28} label="R" labelDy={-8} />
              <Resistor x={111} y={58} />
              <Resistor x={111} y={88} />
            </g>
          </svg>
        )

      case 'm3-four-resistors':
        return (
          <svg viewBox="0 0 420 200" className="w-full max-w-md mx-auto">
            <Wire d="M 45 100 L 125 100 M 125 50 L 305 50 M 125 150 L 305 150 M 125 50 L 125 150 M 305 50 L 305 150 M 305 100 L 375 100" />
            <Resistor x={85} y={100} label="R₁" />
            <Resistor x={175} y={50} label="R₂" />
            <Resistor x={255} y={50} label="R₃" />
            <Resistor x={215} y={150} label="R₄" labelDy={24} />
            <Junction x={45} y={100} label="A" />
            <Junction x={125} y={100} />
            <Junction x={305} y={100} />
            <Junction x={375} y={100} label="B" />
          </svg>
        )

      case 'm4-multi-switch-table':
        return (
          <svg viewBox="0 0 440 225" className="w-full max-w-md mx-auto">
            {/* Main rectangle */}
            <Wire d="M 75 45 L 365 45 L 365 180 L 75 180 Z" />
            {/* Middle bypass branch with S2 only */}
            <Wire d="M 225 45 L 225 180" />
            {/* Battery on left */}
            <Battery x={75} y={112} label="ε" />
            {/* S1 on top left main branch */}
            <Switch x={150} y={45} label="S₁" />
            {/* Bulb 1 on bottom left main branch */}
            <Bulb x={150} y={180} label="B₁" labelDy={28} />
            {/* Middle bypass branch: S2 only (shorts B2 & B3 when closed) */}
            <Switch x={225} y={112} orientation="vertical" label="S₂" />
            {/* Right loop: Bulb 2 on top, S3 & Bulb 3 on right */}
            <Bulb x={295} y={45} label="B₂" labelDy={-20} />
            <Switch x={365} y={84} orientation="vertical" label="S₃" />
            <Bulb x={365} y={142} label="B₃" labelDx={28} labelDy={4} />
            <Junction x={225} y={45} />
            <Junction x={225} y={180} />
          </svg>
        )

      case 'm4-switch-turn-off':
        return (
          <svg viewBox="0 0 440 220" className="w-full max-w-md mx-auto">
            {/* Outer loop */}
            <Wire d="M 70 40 L 370 40 L 370 185 L 70 185 Z" />
            {/* Middle branch */}
            <Wire d="M 225 40 L 225 185" />
            {/* Shorting bypass around Bulb X? No: clean 2-branch circuit with S1(main), S2(branch X), S3(bypass X), S4(branch Y) */}
            <Wire d="M 225 100 L 295 100 L 295 185" />
            <Battery x={70} y={112} label="ε" />
            <Switch x={145} y={40} closed label="S₁" />
            <Bulb x={225} y={142} label="X" labelDx={-24} labelDy={4} />
            <Switch x={225} y={70} orientation="vertical" closed label="S₂" />
            <Switch x={295} y={142} orientation="vertical" label="S₃" />
            <Bulb x={370} y={142} label="Y" labelDx={24} labelDy={4} />
            <Switch x={370} y={70} orientation="vertical" closed label="S₄" />
            <Junction x={225} y={40} />
            <Junction x={225} y={100} />
            <Junction x={225} y={185} />
            <Junction x={295} y={185} />
          </svg>
        )

      case 'm4-closing-switch-s':
      case 'frq2-three-bulbs-switch':
        return (
          <svg viewBox="0 0 440 220" className="w-full max-w-md mx-auto">
            <Wire d="M 75 45 L 365 45 L 365 180 L 75 180 Z" />
            <Wire d="M 245 45 L 245 180" />
            <Battery x={75} y={112} label="ε" />
            <Bulb x={160} y={45} label="Bulb 1" labelDy={-20} />
            <Bulb x={245} y={112} label="Bulb 2" labelDx={-38} labelDy={4} />
            <Switch x={305} y={45} label="S" />
            <Bulb x={365} y={112} label="Bulb 3" labelDx={38} labelDy={4} lit={false} />
            <CurrentArrow x={115} y={45} dir="right" label="I_B" dy={-12} />
            <CurrentArrow x={245} y={74} dir="down" label="I₂" dx={-18} dy={4} />
            <Junction x={245} y={45} />
            <Junction x={245} y={180} />
          </svg>
        )

      case 'm4-short-bulb':
        return (
          <svg viewBox="0 0 430 205" className="w-full max-w-md mx-auto">
            <Wire d="M 70 45 L 360 45 L 360 165 L 70 165 Z" />
            {/* Bypass wire with switch S across Bulb B */}
            <Wire d="M 215 45 L 215 110 L 330 110 L 330 45" />
            <Battery x={70} y={105} label="ε" />
            <Bulb x={145} y={45} label="Bulb A" />
            <Bulb x={272} y={45} label="Bulb B" />
            <Switch x={272} y={110} label="S (open → closed)" labelDy={22} />
            <Junction x={215} y={45} />
            <Junction x={330} y={45} />
          </svg>
        )

      case 'm4-three-bulbs-rank':
        return (
          <svg viewBox="0 0 430 210" className="w-full max-w-md mx-auto">
            <Wire d="M 70 45 L 355 45 L 355 170 L 70 170 Z" />
            <Wire d="M 240 45 L 240 170" />
            <Battery x={70} y={108} label="ε" />
            <Bulb x={155} y={45} label="B₁" />
            <Bulb x={240} y={108} label="B₂" labelDx={-28} labelDy={4} />
            <Bulb x={355} y={108} label="B₃" labelDx={28} labelDy={4} />
            <Junction x={240} y={45} />
            <Junction x={240} y={170} />
          </svg>
        )

      case 'm4-parallel-open-switch':
        return (
          <svg viewBox="0 0 430 205" className="w-full max-w-md mx-auto">
            <Wire d="M 75 42 L 350 42 L 350 170 L 75 170 Z" />
            <Wire d="M 215 42 L 215 170" />
            <Battery x={75} y={106} label="ε (ideal)" />
            <Bulb x={215} y={106} label="Bulb 1" labelDx={-38} labelDy={4} />
            <Switch x={285} y={42} closed label="S" />
            <Bulb x={350} y={106} label="Bulb 2" labelDx={38} labelDy={4} />
            <Junction x={215} y={42} />
            <Junction x={215} y={170} />
          </svg>
        )

      case 'm5-multi-junction':
        return (
          <svg viewBox="0 0 440 200" className="w-full max-w-md mx-auto">
            {/* Node P at (150, 100), Node Q at (290, 100) */}
            <Wire d="M 45 100 L 150 100 M 150 100 L 150 38 L 290 38 L 290 100 M 150 100 L 290 100 M 150 100 L 150 162 L 290 162 L 290 100 M 290 100 L 395 100" />
            <CurrentArrow x={95} y={100} dir="right" label="5.0 A" dy={-12} />
            <CurrentArrow x={220} y={38} dir="right" label="1.8 A" dy={-12} />
            <CurrentArrow x={220} y={100} dir="left" label="0.7 A" dy={-12} color="#FB7185" />
            <CurrentArrow x={220} y={162} dir="right" label="I₃ = ?" dy={20} color="#34D399" />
            <CurrentArrow x={345} y={100} dir="right" label="I_out" dy={-12} />
            <Junction x={150} y={100} label="P" dx={-14} dy={-12} />
            <Junction x={290} y={100} label="Q" dx={14} dy={-12} />
          </svg>
        )

      case 'm5-wheatstone-bridge':
        return (
          <svg viewBox="0 0 440 230" className="w-full max-w-md mx-auto">
            {/* Battery left */}
            <Wire d="M 65 45 L 370 45 L 370 190 L 65 190 Z" />
            {/* Left vertical branch with 2 resistors */}
            <Wire d="M 190 45 L 190 190" />
            {/* Right vertical branch with 2 resistors */}
            <Wire d="M 330 45 L 330 190" />
            {/* Bridge between Node X (190, 118) and Node Y (330, 118) */}
            <Wire d="M 190 118 L 330 118" color="#FBBF24" />
            <Battery x={65} y={118} label="12 V" />
            <Resistor x={190} y={80} orientation="vertical" label="2 Ω" labelDx={-18} />
            <Resistor x={190} y={154} orientation="vertical" label="4 Ω" labelDx={-18} />
            <Resistor x={330} y={80} orientation="vertical" label="4 Ω" labelDx={16} />
            <Resistor x={330} y={154} orientation="vertical" label="2 Ω" labelDx={16} />
            <Resistor x={260} y={118} label="R_bridge" labelDy={-12} color="#FBBF24" />
            <Junction x={190} y={118} label="X" dx={-14} dy={-8} color="#FBBF24" />
            <Junction x={330} y={118} label="Y" dx={14} dy={-8} color="#FBBF24" />
            <Junction x={190} y={45} />
            <Junction x={190} y={190} />
            <Junction x={330} y={45} />
            <Junction x={330} y={190} />
          </svg>
        )

      case 'm5-two-loop-kirchhoff':
        return (
          <svg viewBox="0 0 450 220" className="w-full max-w-md mx-auto">
            <Wire d="M 70 45 L 380 45 L 380 180 L 70 180 Z" />
            <Wire d="M 225 45 L 225 180" />
            <Battery x={70} y={112} label="ε₁" />
            <Battery x={380} y={112} label="ε₂" labelDx={38} />
            <Resistor x={148} y={45} label="R₁" />
            <Resistor x={225} y={112} orientation="vertical" label="R₂" labelDx={16} />
            <Resistor x={302} y={45} label="R₃" />
            <CurrentArrow x={105} y={45} dir="right" label="I₁" dy={-14} />
            <CurrentArrow x={225} y={70} dir="down" label="I₂" dx={-18} dy={4} />
            <CurrentArrow x={345} y={45} dir="left" label="I₃" dy={-14} />
            <Junction x={225} y={45} label="A" dy={-12} />
            <Junction x={225} y={180} label="B" dy={18} />
          </svg>
        )

      case 'm5-v-pos-cw':
      case 'm5-v-pos-ccw':
        return (
          <svg viewBox="0 0 430 205" className="w-full max-w-md mx-auto">
            <Wire d="M 85 45 L 355 45 L 355 165 L 85 165 Z" />
            <Battery x={85} y={105} label="12 V" />
            <Resistor x={220} y={45} label="R₁ = 2 Ω" />
            <Resistor x={355} y={105} orientation="vertical" label="R₂ = 4 Ω" labelDx={16} />
            <Junction x={85} y={165} label="A" dx={-14} dy={14} color="#34D399" />
            <Junction x={85} y={45} label="B" dx={-14} dy={-8} color="#FBBF24" />
            <Junction x={355} y={45} label="C" dx={14} dy={-8} color="#22D3EE" />
            <Junction x={355} y={165} label="D" dx={14} dy={14} color="#A78BFA" />
            <CurrentArrow x={150} y={45} dir="right" label="I = 2 A" dy={-14} />
            <text x="220" y="192" fill="#94A3B8" fontSize="11" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
              {id === 'm5-v-pos-cw' ? 'Path traced CLOCKWISE: A → B → C → D → A' : 'Path traced COUNTERCLOCKWISE: A → D → C → B → A'}
            </text>
          </svg>
        )

      case 'm6-nonideal-battery':
        return (
          <svg viewBox="0 0 440 215" className="w-full max-w-md mx-auto">
            {/* Dashed box around non-ideal battery */}
            <rect x="30" y="34" width="94" height="145" rx="8" fill="rgba(251,113,133,0.06)" stroke="#FB7185" strokeWidth="1.5" strokeDasharray="5 4" />
            <text x="77" y="25" fill="#FB7185" fontSize="10.5" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Real Battery</text>
            <Wire d="M 85 45 L 365 45 L 365 170 L 85 170 Z" />
            <Wire d="M 250 45 L 250 170" />
            <Battery x={85} y={132} label="ε" labelDx={-22} />
            <Resistor x={85} y={76} orientation="vertical" label="r" labelDx={-16} color="#FB7185" />
            <Resistor x={250} y={108} orientation="vertical" label="R₁" labelDx={-18} />
            <Switch x={308} y={45} label="S" />
            <Resistor x={365} y={108} orientation="vertical" label="R₂" labelDx={16} />
            {/* Voltmeter across battery terminals */}
            <Wire d="M 148 45 L 148 170" color="#FBBF24" dashed />
            <Meter x={148} y={108} type="V" label="V_term" labelDx={28} labelDy={4} />
            <Junction x={148} y={45} />
            <Junction x={148} y={170} />
            <Junction x={250} y={45} />
            <Junction x={250} y={170} />
          </svg>
        )

      case 'm6-nonideal-voltmeter':
        return (
          <svg viewBox="0 0 440 215" className="w-full max-w-md mx-auto">
            <Wire d="M 75 45 L 350 45 L 350 165 L 75 165 Z" />
            <Wire d="M 225 45 L 225 115 L 350 115" color="#FB7185" />
            <Battery x={75} y={105} label="ε (ideal)" />
            <Meter x={148} y={45} type="A" label="Ideal A" />
            <Resistor x={288} y={45} label="R" />
            <Meter x={288} y={115} type="V" nonIdeal label="Non-Ideal V (R_V finite)" labelDy={28} />
            <Junction x={225} y={45} />
            <Junction x={350} y={115} />
          </svg>
        )

      case 'm6-nonideal-ammeter':
        return (
          <svg viewBox="0 0 440 210" className="w-full max-w-md mx-auto">
            <Wire d="M 75 45 L 355 45 L 355 165 L 75 165 Z" />
            <Wire d="M 235 45 L 235 115 L 355 115" color="#FBBF24" />
            <Battery x={75} y={105} label="ε (ideal)" />
            <Meter x={155} y={45} type="A" nonIdeal label="Non-Ideal A (R_A > 0)" />
            <Resistor x={295} y={45} label="R" />
            <Meter x={295} y={115} type="V" label="Ideal V" labelDy={26} />
            <Junction x={235} y={45} />
            <Junction x={355} y={115} />
          </svg>
        )

      case 'm6-three-setups-rank':
        return (
          <svg viewBox="0 0 480 155" className="w-full max-w-xl mx-auto">
            {/* Setup 1: Ideal */}
            <g transform="translate(6,8)">
              <rect width="150" height="138" rx="8" fill="#0F172A" stroke="#1F2937" />
              <text x="75" y="20" fill="#34D399" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Setup 1: Ideal</text>
              <Wire d="M 28 45 L 125 45 L 125 118 L 28 118 Z" />
              <Battery x={28} y={82} label="ε" labelDx={-14} />
              <Resistor x={78} y={45} label="R" />
              <Meter x={125} y={82} type="A" />
            </g>
            {/* Setup 2: Non-ideal V */}
            <g transform="translate(165,8)">
              <rect width="150" height="138" rx="8" fill="#0F172A" stroke="#1F2937" />
              <text x="75" y="20" fill="#22D3EE" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Setup 2: Real V</text>
              <Wire d="M 28 45 L 125 45 L 125 118 L 28 118 Z" />
              <Wire d="M 52 45 L 52 86 L 106 86 L 106 45" color="#FB7185" />
              <Battery x={28} y={82} label="ε" labelDx={-14} />
              <Resistor x={79} y={45} label="R" />
              <Meter x={79} y={86} type="V" nonIdeal />
            </g>
            {/* Setup 3: Real Battery */}
            <g transform="translate(324,8)">
              <rect width="150" height="138" rx="8" fill="#0F172A" stroke="#1F2937" />
              <text x="75" y="20" fill="#FB7185" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Setup 3: Real Batt</text>
              <Wire d="M 32 45 L 125 45 L 125 118 L 32 118 Z" />
              <Battery x={32} y={92} label="ε" labelDx={-14} />
              <Resistor x={32} y={62} orientation="vertical" label="r" labelDx={12} color="#FB7185" />
              <Resistor x={80} y={45} label="R" />
            </g>
          </svg>
        )

      case 'm7-motor-block':
        return (
          <svg viewBox="0 0 440 190" className="w-full max-w-md mx-auto">
            <Wire d="M 55 45 L 220 45 L 220 150 L 55 150 Z" />
            <Battery x={55} y={98} label="ΔV" />
            <Meter x={135} y={45} type="A" label="I" />
            <Meter x={220} y={98} type="M" label="Motor" labelDx={-36} labelDy={4} />
            {/* String pulling block */}
            <line x1="234" y1="98" x2="318" y2="98" stroke="#FBBF24" strokeWidth="2.2" strokeDasharray="4 2" />
            <rect x="318" y="76" width="64" height="44" rx="6" fill="#1E293B" stroke="#22D3EE" strokeWidth="2.2" />
            <text x="350" y="102" fill="#F8FAFC" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">m</text>
            <line x1="290" y1="120" x2="410" y2="120" stroke="#475569" strokeWidth="2.5" />
            <text x="350" y="140" fill="#94A3B8" fontSize="10.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Frictionless track</text>
          </svg>
        )

      case 'm7-water-heaters':
        return (
          <svg viewBox="0 0 440 195" className="w-full max-w-md mx-auto">
            {/* Insulated tank X */}
            <rect x="20" y="25" width="180" height="145" rx="10" fill="#0F172A" stroke="#334155" strokeWidth="2.5" />
            <rect x="32" y="70" width="156" height="88" rx="6" fill="rgba(34,211,238,0.12)" stroke="#22D3EE" strokeWidth="1" strokeDasharray="3 3" />
            <text x="110" y="48" fill="#22D3EE" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Tank X (R_X &gt; R_Y)</text>
            <Wire d="M 65 25 L 65 115 L 155 115 L 155 25" />
            <Resistor x={110} y={115} label="R_X" color="#FBBF24" />
            <text x="110" y="185" fill="#94A3B8" fontSize="11" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Connected to ideal ΔV₀</text>
            {/* Insulated tank Y */}
            <rect x="240" y="25" width="180" height="145" rx="10" fill="#0F172A" stroke="#334155" strokeWidth="2.5" />
            <rect x="252" y="70" width="156" height="88" rx="6" fill="rgba(34,211,238,0.12)" stroke="#22D3EE" strokeWidth="1" strokeDasharray="3 3" />
            <text x="330" y="48" fill="#34D399" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Tank Y (R_Y)</text>
            <Wire d="M 285 25 L 285 115 L 375 115 L 375 25" />
            <Resistor x={330} y={115} label="R_Y" color="#FBBF24" />
            <text x="330" y="185" fill="#94A3B8" fontSize="11" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Connected to ideal ΔV₀</text>
          </svg>
        )

      case 'm7-series-parallel-heaters':
        return (
          <svg viewBox="0 0 440 165" className="w-full max-w-md mx-auto">
            <rect x="12" y="12" width="195" height="140" rx="8" fill="#0F172A" stroke="#1F2937" />
            <text x="110" y="32" fill="#FBBF24" fontSize="11.5" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Config 1: Series</text>
            <Wire d="M 35 55 L 185 55 L 185 130 L 35 130 Z" />
            <Battery x={35} y={92} label="ε" labelDx={-14} />
            <Resistor x={84} y={55} label="R" />
            <Resistor x={144} y={55} label="R" />

            <rect x="230" y="12" width="198" height="140" rx="8" fill="#0F172A" stroke="#1F2937" />
            <text x="329" y="32" fill="#34D399" fontSize="11.5" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Config 2: Parallel</text>
            <Wire d="M 255 55 L 405 55 L 405 130 L 255 130 Z M 335 55 L 335 130" />
            <Battery x={255} y={92} label="ε" labelDx={-14} />
            <Resistor x={335} y={92} orientation="vertical" label="R" labelDx={-15} />
            <Resistor x={405} y={92} orientation="vertical" label="R" labelDx={12} />
          </svg>
        )

      case 'm8-rc-bulb-charge':
        return (
          <svg viewBox="0 0 430 195" className="w-full max-w-md mx-auto">
            <Wire d="M 75 45 L 355 45 L 355 155 L 75 155 Z" />
            <Battery x={75} y={100} label="ε" />
            <Switch x={148} y={45} label="S" />
            <Bulb x={255} y={45} label="Bulb" />
            <Capacitor x={355} y={100} orientation="vertical" label="C (uncharged)" labelDx={-20} />
          </svg>
        )

      case 'm8-rc-multiloop-t0-inf':
        return (
          <svg viewBox="0 0 440 215" className="w-full max-w-md mx-auto">
            <Wire d="M 75 45 L 365 45 L 365 175 L 75 175 Z" />
            <Wire d="M 240 45 L 240 175" />
            <Battery x={75} y={110} label="ε" />
            <Switch x={120} y={45} label="S" />
            <Resistor x={182} y={45} label="R" />
            <Resistor x={240} y={110} orientation="vertical" label="R" labelDx={-18} />
            <Resistor x={365} y={82} orientation="vertical" label="R" labelDx={16} />
            <Capacitor x={365} y={140} orientation="vertical" label="C" labelDx={18} />
            <Junction x={240} y={45} />
            <Junction x={240} y={175} />
          </svg>
        )

      case 'm8-rc-voltage-divider':
        return (
          <svg viewBox="0 0 440 215" className="w-full max-w-md mx-auto">
            <Wire d="M 70 45 L 365 45 L 365 175 L 70 175 Z" />
            <Wire d="M 235 45 L 235 175" />
            <Battery x={70} y={110} label="12 V" />
            <Resistor x={152} y={45} label="2 kΩ" />
            <Resistor x={235} y={110} orientation="vertical" label="4 kΩ" labelDx={-20} />
            <Capacitor x={365} y={110} orientation="vertical" label="5 μF" labelDx={-20} />
            <Junction x={235} y={45} />
            <Junction x={235} y={175} />
          </svg>
        )

      case 'm8-rc-tau-4-3':
        return (
          <svg viewBox="0 0 460 190" className="w-full max-w-lg mx-auto">
            {/* Circuit 1: R + C -> tau1 = RC */}
            <rect x="8" y="10" width="190" height="170" rx="8" fill="#0F172A" stroke="#1F2937" />
            <text x="103" y="30" fill="#22D3EE" fontSize="11.5" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Circuit 1 (τ₁ = RC)</text>
            <Wire d="M 35 55 L 170 55 L 170 155 L 35 155 Z" />
            <Battery x={35} y={105} label="ε" labelDx={-14} />
            <Resistor x={102} y={55} label="R" />
            <Capacitor x={170} y={105} orientation="vertical" label="C" labelDx={-18} />
            {/* Circuit 2: 2 resistors in parallel (R/2) + R in series? Wait: Req = R + R/3 = 4R/3 or (2R/3)*(2C) = 4/3 RC! */}
            <rect x="214" y="10" width="238" height="170" rx="8" fill="#0F172A" stroke="#1F2937" />
            <text x="333" y="30" fill="#A78BFA" fontSize="11.5" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Circuit 2 (τ₂ = ?)</text>
            <Wire d="M 240 55 L 425 55 L 425 155 L 240 155 Z" />
            {/* Two parallel resistors (R and 2R -> 2R/3) in series with two parallel capacitors (C and C -> 2C) */}
            <Wire d="M 268 40 L 340 40 L 340 70 L 268 70 Z" />
            <Wire d="M 380 55 L 380 155" />
            <Battery x={240} y={105} label="ε" labelDx={-14} />
            <Resistor x={304} y={40} label="R" labelDy={-9} />
            <Resistor x={304} y={70} label="2R" labelDy={18} />
            <Capacitor x={380} y={105} orientation="vertical" label="C" labelDx={-16} />
            <Capacitor x={425} y={105} orientation="vertical" label="C" labelDx={-16} />
            <Junction x={268} y={55} />
            <Junction x={340} y={55} />
            <Junction x={380} y={55} />
            <Junction x={380} y={155} />
          </svg>
        )

      case 'm8-rc-tau-1-9':
        return (
          <svg viewBox="0 0 460 190" className="w-full max-w-lg mx-auto">
            {/* Circuit 1: 3R in series, 3C in parallel -> tau1 = (3R)(3C) = 9RC? Or 1R + 1C -> Circuit 2 has 3R in parallel (R/3) and 3C in series (C/3) -> tau2 = RC/9 = (1/9)tau1! */}
            <rect x="8" y="10" width="180" height="170" rx="8" fill="#0F172A" stroke="#1F2937" />
            <text x="98" y="30" fill="#22D3EE" fontSize="11.5" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Circuit 1 (τ₁ = RC)</text>
            <Wire d="M 32 55 L 164 55 L 164 155 L 32 155 Z" />
            <Battery x={32} y={105} label="ε" labelDx={-14} />
            <Resistor x={98} y={55} label="R" />
            <Capacitor x={164} y={105} orientation="vertical" label="C" labelDx={-18} />

            <rect x="202" y="10" width="250" height="170" rx="8" fill="#0F172A" stroke="#1F2937" />
            <text x="327" y="30" fill="#A78BFA" fontSize="11.5" fontWeight="700" textAnchor="middle" fontFamily="JetBrains Mono, monospace">Circuit 2 (3R ∥ &amp; 3C series)</text>
            <Wire d="M 225 65 L 432 65 L 432 155 L 225 155 Z" />
            <Wire d="M 254 42 L 328 42 L 328 88 L 254 88 Z" />
            <Battery x={225} y={110} label="ε" labelDx={-13} />
            <Resistor x={291} y={42} label="R" labelDy={-8} />
            <Resistor x={291} y={65} />
            <Resistor x={291} y={88} label="R" labelDy={16} />
            <Capacitor x={356} y={65} orientation="horizontal" label="C" labelDy={-16} />
            <Capacitor x={386} y={65} orientation="horizontal" label="C" labelDy={-16} />
            <Capacitor x={416} y={65} orientation="horizontal" label="C" labelDy={-16} />
          </svg>
        )

      case 'm9-st-rc-loops':
        return (
          <svg viewBox="0 0 440 215" className="w-full max-w-md mx-auto">
            <Wire d="M 70 45 L 370 45 L 370 175 L 70 175 Z" />
            <Wire d="M 235 45 L 235 175" />
            <Battery x={70} y={110} label="ε" />
            <Resistor x={152} y={45} label="R₁" />
            <Resistor x={235} y={110} orientation="vertical" label="R₂" labelDx={-18} />
            <Resistor x={370} y={82} orientation="vertical" label="R₃" labelDx={16} />
            <Capacitor x={370} y={142} orientation="vertical" label="C" labelDx={18} />
            <Junction x={235} y={45} />
            <Junction x={235} y={175} />
          </svg>
        )

      case 'm9-st-switch-s':
        return (
          <svg viewBox="0 0 440 215" className="w-full max-w-md mx-auto">
            <Wire d="M 75 45 L 365 45 L 365 175 L 75 175 Z" />
            <Wire d="M 240 45 L 240 175" />
            <Battery x={75} y={110} label="ε (ideal)" />
            <Resistor x={158} y={45} label="R₁" />
            <Resistor x={240} y={110} orientation="vertical" label="R₂" labelDx={-18} />
            <Switch x={302} y={45} label="S" />
            <Resistor x={365} y={110} orientation="vertical" label="R₃" labelDx={16} />
            <Junction x={240} y={45} />
            <Junction x={240} y={175} />
          </svg>
        )

      case 'm9-st-meters':
        return (
          <svg viewBox="0 0 440 210" className="w-full max-w-md mx-auto">
            <Wire d="M 70 45 L 365 45 L 365 170 L 70 170 Z" />
            <Wire d="M 245 45 L 245 120 L 365 120" color="#FBBF24" />
            <Battery x={70} y={126} label="ε" labelDx={-18} />
            <Resistor x={70} y={76} orientation="vertical" label="r" labelDx={-16} color="#FB7185" />
            <Meter x={155} y={45} type="A" label="A" />
            <Resistor x={305} y={45} label="R" />
            <Meter x={305} y={120} type="V" label="V" labelDy={26} />
            <Junction x={245} y={45} />
            <Junction x={365} y={120} />
          </svg>
        )

      case 'm9-st-kirchhoff-nodes':
        return (
          <svg viewBox="0 0 440 215" className="w-full max-w-md mx-auto">
            <Wire d="M 70 45 L 365 45 L 365 175 L 70 175 Z" />
            <Wire d="M 220 45 L 220 175" />
            <Battery x={70} y={110} label="10 V" />
            <Resistor x={145} y={45} label="2 Ω" />
            <Resistor x={220} y={110} orientation="vertical" label="6 Ω" labelDx={-18} />
            <Resistor x={365} y={110} orientation="vertical" label="3 Ω" labelDx={16} />
            <Junction x={220} y={45} label="P" dy={-12} />
            <Junction x={220} y={175} label="Q" dy={18} />
          </svg>
        )

      case 'frq1-ohmic-test':
        return (
          <svg viewBox="0 0 440 210" className="w-full max-w-md mx-auto">
            <Wire d="M 70 45 L 360 45 L 360 165 L 70 165 Z" />
            <Wire d="M 225 45 L 225 115 L 340 115 L 340 45" color="#FBBF24" />
            <Battery x={70} y={105} label="Variable ε" />
            <Meter x={145} y={45} type="A" label="Ammeter (series)" />
            <Resistor x={282} y={45} label="Resistor X" color="#22D3EE" />
            <Meter x={282} y={115} type="V" label="Voltmeter (parallel)" labelDy={26} />
            <Switch x={145} y={165} closed label="S" labelDy={20} />
            <Junction x={225} y={45} />
            <Junction x={340} y={45} />
          </svg>
        )

      case 'frq2-capacitor-replace':
        return (
          <svg viewBox="0 0 440 215" className="w-full max-w-md mx-auto">
            <Wire d="M 75 45 L 365 45 L 365 175 L 75 175 Z" />
            <Wire d="M 245 45 L 245 175" />
            <Battery x={75} y={110} label="ε" />
            <Bulb x={160} y={45} label="Bulb 1" />
            <Bulb x={245} y={110} label="Bulb 2" labelDx={-38} labelDy={4} />
            <Switch x={305} y={45} label="S" />
            <Capacitor x={365} y={110} orientation="vertical" label="C (uncharged)" labelDx={-20} />
            <Junction x={245} y={45} />
            <Junction x={245} y={175} />
          </svg>
        )

      case 'frq3-combo-circuit':
        return (
          <svg viewBox="0 0 440 215" className="w-full max-w-md mx-auto">
            <Wire d="M 75 45 L 365 45 L 365 175 L 75 175 Z" />
            <Wire d="M 245 45 L 245 175" />
            <Battery x={75} y={110} label="12 V" />
            <CurrentArrow x={115} y={45} dir="right" label="2.0 A" dy={-14} />
            <Resistor x={175} y={45} label="4 Ω" />
            <Resistor x={245} y={110} orientation="vertical" label="6 Ω" labelDx={-18} />
            <Resistor x={365} y={110} orientation="vertical" label="R = ?" labelDx={16} color="#FBBF24" />
            <Junction x={245} y={45} />
            <Junction x={245} y={175} />
          </svg>
        )

      case 'frq3-rc-steady-state':
        return (
          <svg viewBox="0 0 440 215" className="w-full max-w-md mx-auto">
            <Wire d="M 75 45 L 365 45 L 365 175 L 75 175 Z" />
            <Wire d="M 245 45 L 245 175" />
            <Battery x={75} y={110} label="12 V" />
            <Resistor x={165} y={45} label="4 Ω" />
            <Resistor x={245} y={110} orientation="vertical" label="6 Ω" labelDx={-18} />
            <Capacitor x={365} y={110} orientation="vertical" label="6 μF" labelDx={18} />
            <Junction x={245} y={45} />
            <Junction x={245} y={175} />
          </svg>
        )
    }
  }

  return (
    <div
      className={`rounded-xl border border-[#1F2937] bg-[#0B1120] p-4 shadow-inner ${className}`}
    >
      {renderSchematic()}
      {caption && (
        <p className="mt-2 text-center text-xs font-mono text-slate-400">{caption}</p>
      )}
    </div>
  )
}
