import React from 'react'
import { PhysicsGraphId } from '../types'

interface PhysicsGraphProps {
  id: PhysicsGraphId
  caption?: string
  className?: string
}

const GRID = '#1F2937'
const AXIS = '#94A3B8'
const TEXT = '#E2E8F0'
const CYAN = '#22D3EE'
const AMBER = '#FBBF24'
const VIOLET = '#A78BFA'
const EMERALD = '#34D399'
const ROSE = '#FB7185'

export const PhysicsGraph: React.FC<PhysicsGraphProps> = ({ id, caption, className = '' }) => {
  const renderGraph = () => {
    switch (id) {
      case 'm1-q-vs-t':
        return (
          <svg viewBox="0 0 430 245" className="w-full max-w-md mx-auto">
            {/* Grid */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <line key={`vx-${i}`} x1={65 + i * 52} y1={25} x2={65 + i * 52} y2={195} stroke={GRID} strokeWidth={1} />
            ))}
            {[0, 1, 2, 3, 4].map((j) => (
              <line key={`hy-${j}`} x1={65} y1={195 - j * 42} x2={377} y2={195 - j * 42} stroke={GRID} strokeWidth={1} />
            ))}
            {/* Axes */}
            <line x1={65} y1={195} x2={388} y2={195} stroke={AXIS} strokeWidth={2} />
            <line x1={65} y1={195} x2={65} y2={18} stroke={AXIS} strokeWidth={2} />
            {/* X ticks (0 to 6 s) */}
            {[0, 1, 2, 3, 4, 5, 6].map((t) => (
              <text key={`xt-${t}`} x={65 + t * 52} y={213} fill={AXIS} fontSize={11} textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                {t}
              </text>
            ))}
            {/* Y ticks (0, 4, 8, 12, 16 C) */}
            {[0, 4, 8, 12, 16].map((q, j) => (
              <text key={`yt-${q}`} x={56} y={199 - j * 42} fill={AXIS} fontSize={11} textAnchor="end" fontFamily="JetBrains Mono, monospace">
                {q}
              </text>
            ))}
            {/* Axis Labels */}
            <text x={225} y={235} fill={TEXT} fontSize={12} fontWeight={600} textAnchor="middle" fontFamily="Inter, sans-serif">
              Time t (s)
            </text>
            <text x={20} y={110} fill={TEXT} fontSize={12} fontWeight={600} textAnchor="middle" transform="rotate(-90 20 110)" fontFamily="Inter, sans-serif">
              Cumulative Charge Q (C)
            </text>
            {/* Curve: (0,0) -> (2,4) -> (4,12) -> (6,12) */}
            <polyline
              points="65,195 169,153 273,69 377,69"
              fill="none"
              stroke={CYAN}
              strokeWidth={3}
              strokeLinejoin="round"
            />
            {[
              [65, 195],
              [169, 153],
              [273, 69],
              [377, 69],
            ].map(([cx, cy], idx) => (
              <circle key={idx} cx={cx} cy={cy} r={4.5} fill={AMBER} stroke="#0B1120" strokeWidth={1.5} />
            ))}
            {/* Interval labels */}
            <text x={117} y={162} fill={AMBER} fontSize={11} fontWeight={700} textAnchor="middle" fontFamily="JetBrains Mono, monospace">I</text>
            <text x={212} y={102} fill={AMBER} fontSize={11} fontWeight={700} textAnchor="middle" fontFamily="JetBrains Mono, monospace">II</text>
            <text x={325} y={58} fill={AMBER} fontSize={11} fontWeight={700} textAnchor="middle" fontFamily="JetBrains Mono, monospace">III</text>
          </svg>
        )

      case 'm2-r-vs-unlabeled-l':
      case 'm2-r-vs-unlabeled-inv-a': {
        const isL = id === 'm2-r-vs-unlabeled-l'
        return (
          <svg viewBox="0 0 430 245" className="w-full max-w-md mx-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <line key={`vx-${i}`} x1={65 + i * 60} y1={25} x2={65 + i * 60} y2={195} stroke={GRID} strokeWidth={1} />
            ))}
            {[1, 2, 3, 4].map((j) => (
              <line key={`hy-${j}`} x1={65} y1={195 - j * 42} x2={375} y2={195 - j * 42} stroke={GRID} strokeWidth={1} />
            ))}
            <line x1={65} y1={195} x2={385} y2={195} stroke={AXIS} strokeWidth={2} />
            <line x1={65} y1={195} x2={65} y2={18} stroke={AXIS} strokeWidth={2} />
            <text x={225} y={230} fill={AMBER} fontSize={12} fontWeight={700} textAnchor="middle" fontFamily="JetBrains Mono, monospace">
              {isL ? 'Unlabeled Horizontal Axis (Quantity X)' : 'Unlabeled Horizontal Axis (Quantity Z)'}
            </text>
            <text x={24} y={110} fill={TEXT} fontSize={12} fontWeight={600} textAnchor="middle" transform="rotate(-90 24 110)" fontFamily="Inter, sans-serif">
              Resistance R (Ω)
            </text>
            {/* Set A steeper line */}
            <line x1={65} y1={195} x2={305} y2={35} stroke={CYAN} strokeWidth={2.8} />
            {[
              [125, 155],
              [185, 115],
              [245, 75],
              [305, 35],
            ].map(([cx, cy], idx) => (
              <circle key={`a-${idx}`} cx={cx} cy={cy} r={4.5} fill={CYAN} />
            ))}
            <text x={275} y={42} fill={CYAN} fontSize={12} fontWeight={700} fontFamily="JetBrains Mono, monospace">Set A</text>
            {/* Set B shallower line */}
            <line x1={65} y1={195} x2={365} y2={95} stroke={VIOLET} strokeWidth={2.8} />
            {[
              [125, 175],
              [185, 155],
              [245, 135],
              [305, 115],
              [365, 95],
            ].map(([cx, cy], idx) => (
              <rect key={`b-${idx}`} x={cx - 4} y={cy - 4} width={8} height={8} fill={VIOLET} />
            ))}
            <text x={320} y={128} fill={VIOLET} fontSize={12} fontWeight={700} fontFamily="JetBrains Mono, monospace">Set B</text>
          </svg>
        )
      }

      case 'm5-v-vs-pos-cw':
        return (
          <svg viewBox="0 0 430 240" className="w-full max-w-md mx-auto">
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={`vx-${i}`} x1={65 + i * 76} y1={25} x2={65 + i * 76} y2={190} stroke={GRID} strokeWidth={1} strokeDasharray="4 4" />
            ))}
            {[0, 4, 8, 12].map((v, j) => (
              <g key={`v-${v}`}>
                <line x1={65} y1={190 - j * 50} x2={375} y2={190 - j * 50} stroke={GRID} strokeWidth={1} />
                <text x={55} y={194 - j * 50} fill={AXIS} fontSize={11} textAnchor="end" fontFamily="JetBrains Mono, monospace">{v}</text>
              </g>
            ))}
            <line x1={65} y1={190} x2={385} y2={190} stroke={AXIS} strokeWidth={2} />
            <line x1={65} y1={190} x2={65} y2={20} stroke={AXIS} strokeWidth={2} />
            {['A', 'B', 'C', 'D', 'A'].map((pt, i) => (
              <text key={`pt-${i}`} x={65 + i * 76} y={210} fill={TEXT} fontSize={12} fontWeight={700} textAnchor="middle" fontFamily="JetBrains Mono, monospace">{pt}</text>
            ))}
            <text x={225} y={232} fill={TEXT} fontSize={12} fontWeight={600} textAnchor="middle" fontFamily="Inter, sans-serif">
              Position Around Loop (Clockwise)
            </text>
            <text x={20} y={108} fill={TEXT} fontSize={12} fontWeight={600} textAnchor="middle" transform="rotate(-90 20 108)" fontFamily="Inter, sans-serif">
              Electric Potential V (V)
            </text>
            {/* A(0) -> rise across battery to B(12) -> drop 4V across R1=2Ω to C(8) -> drop 8V across R2=4Ω to D(0) -> flat wire to A(0) */}
            <polyline
              points="65,190 95,190 112,40 141,40 168,40 192,90 217,90 245,90 268,190 293,190 369,190"
              fill="none"
              stroke={EMERALD}
              strokeWidth={3}
              strokeLinejoin="round"
            />
            {[
              [65, 190],
              [141, 40],
              [217, 90],
              [293, 190],
              [369, 190],
            ].map(([cx, cy], idx) => (
              <circle key={idx} cx={cx} cy={cy} r={4.5} fill={AMBER} stroke="#0B1120" strokeWidth={1.5} />
            ))}
          </svg>
        )

      case 'm5-v-vs-pos-ccw':
        return (
          <svg viewBox="0 0 430 240" className="w-full max-w-md mx-auto">
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={`vx-${i}`} x1={65 + i * 76} y1={25} x2={65 + i * 76} y2={190} stroke={GRID} strokeWidth={1} strokeDasharray="4 4" />
            ))}
            {[0, 4, 8, 12].map((v, j) => (
              <g key={`v-${v}`}>
                <line x1={65} y1={190 - j * 50} x2={375} y2={190 - j * 50} stroke={GRID} strokeWidth={1} />
                <text x={55} y={194 - j * 50} fill={AXIS} fontSize={11} textAnchor="end" fontFamily="JetBrains Mono, monospace">{v}</text>
              </g>
            ))}
            <line x1={65} y1={190} x2={385} y2={190} stroke={AXIS} strokeWidth={2} />
            <line x1={65} y1={190} x2={65} y2={20} stroke={AXIS} strokeWidth={2} />
            {['A', 'D', 'C', 'B', 'A'].map((pt, i) => (
              <text key={`pt-${i}`} x={65 + i * 76} y={210} fill={TEXT} fontSize={12} fontWeight={700} textAnchor="middle" fontFamily="JetBrains Mono, monospace">{pt}</text>
            ))}
            <text x={225} y={232} fill={TEXT} fontSize={12} fontWeight={600} textAnchor="middle" fontFamily="Inter, sans-serif">
              Position Around Loop (Counterclockwise)
            </text>
            <text x={20} y={108} fill={TEXT} fontSize={12} fontWeight={600} textAnchor="middle" transform="rotate(-90 20 108)" fontFamily="Inter, sans-serif">
              Electric Potential V (V)
            </text>
            {/* CCW: A(0) -> D(0) -> rise 8V across R2 to C(8) -> rise 4V across R1 to B(12) -> drop 12V across battery to A(0) */}
            <polyline
              points="65,190 141,190 165,190 190,90 217,90 245,90 268,40 293,40 318,40 338,190 369,190"
              fill="none"
              stroke={VIOLET}
              strokeWidth={3}
              strokeLinejoin="round"
            />
            {[
              [65, 190],
              [141, 190],
              [217, 90],
              [293, 40],
              [369, 190],
            ].map(([cx, cy], idx) => (
              <circle key={idx} cx={cx} cy={cy} r={4.5} fill={AMBER} stroke="#0B1120" strokeWidth={1.5} />
            ))}
          </svg>
        )

      case 'm6-iv-nonohmic':
      case 'm9-st-iv-unlabeled': {
        const unlabeled = id === 'm9-st-iv-unlabeled'
        return (
          <svg viewBox="0 0 430 245" className="w-full max-w-md mx-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <line key={`vx-${i}`} x1={65 + i * 60} y1={25} x2={65 + i * 60} y2={195} stroke={GRID} strokeWidth={1} />
            ))}
            {[1, 2, 3, 4].map((j) => (
              <line key={`hy-${j}`} x1={65} y1={195 - j * 42} x2={375} y2={195 - j * 42} stroke={GRID} strokeWidth={1} />
            ))}
            <line x1={65} y1={195} x2={385} y2={195} stroke={AXIS} strokeWidth={2} />
            <line x1={65} y1={195} x2={65} y2={18} stroke={AXIS} strokeWidth={2} />
            <text x={225} y={230} fill={TEXT} fontSize={12} fontWeight={600} textAnchor="middle" fontFamily="Inter, sans-serif">
              {unlabeled ? 'Potential Difference ΔV (V)' : 'Potential Difference ΔV (V)'}
            </text>
            <text x={22} y={110} fill={TEXT} fontSize={12} fontWeight={600} textAnchor="middle" transform="rotate(-90 22 110)" fontFamily="Inter, sans-serif">
              Current I (A)
            </text>
            {/* Ohmic Resistor: straight line */}
            <line x1={65} y1={195} x2={355} y2={35} stroke={CYAN} strokeWidth={2.8} />
            <text x={320} y={42} fill={CYAN} fontSize={11.5} fontWeight={700} fontFamily="JetBrains Mono, monospace">
              {unlabeled ? 'Device 1' : 'Ohmic Resistor'}
            </text>
            {/* Non-ohmic Incandescent Bulb: concave down (slope decreases as ΔV increases -> R = ΔV/I increases) */}
            <path
              d="M 65 195 Q 150 105 355 92"
              fill="none"
              stroke={AMBER}
              strokeWidth={3}
            />
            <text x={285} y={118} fill={AMBER} fontSize={11.5} fontWeight={700} fontFamily="JetBrains Mono, monospace">
              {unlabeled ? 'Device 2' : 'Incandescent Bulb'}
            </text>
            {!unlabeled && (
              <>
                <circle cx={125} cy={145} r={4} fill={ROSE} />
                <text x={135} y={156} fill={ROSE} fontSize={10.5} fontFamily="JetBrains Mono, monospace">Dim / Cool</text>
                <circle cx={315} cy={95} r={4} fill={AMBER} />
                <text x={315} y={84} fill={AMBER} fontSize={10.5} textAnchor="middle" fontFamily="JetBrains Mono, monospace">Bright / Hot</text>
              </>
            )}
          </svg>
        )
      }

      case 'm8-rc-q-vs-t-rx-ry': {
        // Exponential curves Q(t) = Qmax * (1 - exp(-t/tau))
        const buildCurve = (tauPx: number) => {
          const pts: string[] = []
          for (let dx = 0; dx <= 300; dx += 6) {
            const x = 65 + dx
            const frac = 1 - Math.exp(-dx / tauPx)
            const y = 195 - frac * 145
            pts.push(`${x.toFixed(1)},${y.toFixed(1)}`)
          }
          return pts.join(' ')
        }
        return (
          <svg viewBox="0 0 435 245" className="w-full max-w-md mx-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <line key={`vx-${i}`} x1={65 + i * 60} y1={25} x2={65 + i * 60} y2={195} stroke={GRID} strokeWidth={1} />
            ))}
            <line x1={65} y1={195} x2={385} y2={195} stroke={AXIS} strokeWidth={2} />
            <line x1={65} y1={195} x2={65} y2={18} stroke={AXIS} strokeWidth={2} />
            {/* Asymptote Q_max */}
            <line x1={65} y1={50} x2={375} y2={50} stroke={AXIS} strokeWidth={1.3} strokeDasharray="5 4" />
            <text x={58} y={54} fill={TEXT} fontSize={11} textAnchor="end" fontFamily="JetBrains Mono, monospace">Q_max</text>
            {/* 0.63 Q_max guide */}
            <line x1={65} y1={103.6} x2={375} y2={103.6} stroke={AMBER} strokeWidth={1.1} strokeDasharray="3 4" opacity={0.7} />
            <text x={58} y={107} fill={AMBER} fontSize={10} textAnchor="end" fontFamily="JetBrains Mono, monospace">0.63Q</text>
            {/* Curves: Curve Y faster (tau = 45px), Curve X slower (tau = 115px) */}
            <polyline points={buildCurve(45)} fill="none" stroke={EMERALD} strokeWidth={2.8} />
            <polyline points={buildCurve(115)} fill="none" stroke={VIOLET} strokeWidth={2.8} />
            {/* Time constant markers */}
            <line x1={110} y1={103.6} x2={110} y2={195} stroke={EMERALD} strokeWidth={1.2} strokeDasharray="3 3" />
            <line x1={180} y1={103.6} x2={180} y2={195} stroke={VIOLET} strokeWidth={1.2} strokeDasharray="3 3" />
            <circle cx={110} cy={103.6} r={4} fill={EMERALD} />
            <circle cx={180} cy={103.6} r={4} fill={VIOLET} />
            <text x={110} y={211} fill={EMERALD} fontSize={11} fontWeight={700} textAnchor="middle" fontFamily="JetBrains Mono, monospace">τ_Y</text>
            <text x={180} y={211} fill={VIOLET} fontSize={11} fontWeight={700} textAnchor="middle" fontFamily="JetBrains Mono, monospace">τ_X</text>
            <text x={135} y={76} fill={EMERALD} fontSize={11.5} fontWeight={700} fontFamily="JetBrains Mono, monospace">Circuit Y (R_Y)</text>
            <text x={242} y={118} fill={VIOLET} fontSize={11.5} fontWeight={700} fontFamily="JetBrains Mono, monospace">Circuit X (R_X)</text>
            <text x={225} y={234} fill={TEXT} fontSize={12} fontWeight={600} textAnchor="middle" fontFamily="Inter, sans-serif">
              Time t (s)
            </text>
            <text x={18} y={110} fill={TEXT} fontSize={12} fontWeight={600} textAnchor="middle" transform="rotate(-90 18 110)" fontFamily="Inter, sans-serif">
              Capacitor Charge Q
            </text>
          </svg>
        )
      }

      case 'frq1-inv-i-vs-r': {
        // 1/I = (1/eps) * R + r/eps
        // Let eps = 8.0 V -> slope = 1/8 = 0.125 A^-1/Ohm
        // Let r = 2.0 Ohm -> y-intercept = 2/8 = 0.25 A^-1
        // R from 0 to 10 Ohm:
        // R=0 -> 0.25; R=2 -> 0.50; R=4 -> 0.75; R=6 -> 1.00; R=8 -> 1.25; R=10 -> 1.50
        // X-axis: 65 to 365 (30px per Ohm -> 10 Ohm = 300px)
        // Y-axis: 195 down to 45 (100px per 1.0 A^-1 -> 1.5 A^-1 = 150px)
        const mapX = (r: number) => 65 + r * 30
        const mapY = (invI: number) => 195 - invI * 100
        const pts: [number, number][] = [
          [2, 0.52],
          [4, 0.73],
          [6, 1.02],
          [8, 1.24],
          [10, 1.51],
        ]
        return (
          <svg viewBox="0 0 430 250" className="w-full max-w-md mx-auto">
            {/* Vertical grid lines every 2 Ohm */}
            {[0, 2, 4, 6, 8, 10].map((r) => (
              <g key={`rx-${r}`}>
                <line x1={mapX(r)} y1={35} x2={mapX(r)} y2={195} stroke={GRID} strokeWidth={1} />
                <text x={mapX(r)} y={213} fill={AXIS} fontSize={11} textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                  {r}
                </text>
              </g>
            ))}
            {/* Horizontal grid lines every 0.25 A^-1 */}
            {[0, 0.25, 0.5, 0.75, 1.0, 1.25, 1.5].map((yVal) => (
              <g key={`ry-${yVal}`}>
                <line x1={65} y1={mapY(yVal)} x2={375} y2={mapY(yVal)} stroke={GRID} strokeWidth={1} />
                <text x={57} y={mapY(yVal) + 4} fill={AXIS} fontSize={10.5} textAnchor="end" fontFamily="JetBrains Mono, monospace">
                  {yVal.toFixed(2)}
                </text>
              </g>
            ))}
            {/* Axes */}
            <line x1={65} y1={195} x2={385} y2={195} stroke={AXIS} strokeWidth={2} />
            <line x1={65} y1={195} x2={65} y2={25} stroke={AXIS} strokeWidth={2} />
            {/* Best-fit line from (0, 0.25) to (10, 1.50) */}
            <line
              x1={mapX(0)}
              y1={mapY(0.25)}
              x2={mapX(10)}
              y2={mapY(1.5)}
              stroke={CYAN}
              strokeWidth={2.5}
            />
            {/* Highlight intercept */}
            <circle cx={mapX(0)} cy={mapY(0.25)} r={4.5} fill={ROSE} stroke="#0B1120" strokeWidth={1.2} />
            {/* Data points */}
            {pts.map(([r, yv], idx) => (
              <circle key={idx} cx={mapX(r)} cy={mapY(yv)} r={4.2} fill={AMBER} stroke="#0B1120" strokeWidth={1.3} />
            ))}
            <text x={220} y={238} fill={TEXT} fontSize={12} fontWeight={600} textAnchor="middle" fontFamily="Inter, sans-serif">
              External Resistance R (Ω)
            </text>
            <text x={16} y={115} fill={TEXT} fontSize={12} fontWeight={600} textAnchor="middle" transform="rotate(-90 16 115)" fontFamily="Inter, sans-serif">
              Inverse Current 1/I (A⁻¹)
            </text>
          </svg>
        )
      }
    }
  }

  return (
    <div
      className={`rounded-xl border border-[#1F2937] bg-[#0B1120] p-4 shadow-inner ${className}`}
    >
      {renderGraph()}
      {caption && (
        <p className="mt-2 text-center text-xs font-mono text-slate-400">{caption}</p>
      )}
    </div>
  )
}
