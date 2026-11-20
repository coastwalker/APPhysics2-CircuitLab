import { MCQQuestion } from '../types'

export const QUESTIONS_PART_3: MCQQuestion[] = [
  // ============================================================
  // MODULE 7: Power, Motors & Thermal Energy (6 MCQs)
  // ============================================================
  {
    id: 'm7-q1',
    moduleId: 7,
    questionType: 'single',
    difficulty: 'AP Standard',
    title: 'Symbolic Power Ratios: Series vs. Parallel',
    prompt:
      'Two ohmic resistors have resistances $R_1 = R$ and $R_2 = 3R$. First they are connected in **series** to a battery, and later they are connected in **parallel** to the same battery. What is the power ratio $P_1 / P_2$ in the series circuit and in the parallel circuit, respectively?',
    options: [
      {
        id: 'A',
        text: 'Series: $\\frac{1}{3}$; Parallel: $3$',
        trapExplanation:
          'Correct! In SERIES, both carry the same current $I$, so use $P = I^2 R \\implies P_1 / P_2 = R / (3R) = \\frac{1}{3}$. In PARALLEL, both have the same $\\Delta V$, so use $P = \\frac{\\Delta V^2}{R} \\implies P_1 / P_2 = (1/R) / (1/3R) = 3$.',
      },
      {
        id: 'B',
        text: 'Series: $3$; Parallel: $\\frac{1}{3}$',
        trapExplanation:
          'AP Trap: Swapped the series and parallel formulas! Larger $R$ dissipates MORE power in series (same $I$) and LESS power in parallel (same $\\Delta V$).',
      },
      {
        id: 'C',
        text: 'Series: $\\frac{1}{9}$; Parallel: $9$',
        trapExplanation:
          'AP Trap: Squared the resistance ratio! Power is linear in $R$ (for fixed $I$) and linear in $1/R$ (for fixed $\\Delta V$).',
      },
      {
        id: 'D',
        text: 'Series: $\\frac{1}{3}$; Parallel: $\\frac{1}{3}$',
        trapExplanation:
          'AP Trap: Used $P = I^2 R$ for parallel resistors without realizing their currents are NOT equal ($I_1 = 3I_2$).',
      },
    ],
    correctAnswers: ['A'],
    hint: 'Pick the power equation whose OTHER variable is held constant: $P = I^2 R$ for series (constant $I$), $P = \\frac{\\Delta V^2}{R}$ for parallel (constant $\\Delta V$).',
    solutionSummary:
      'In series ($I$ constant): $P \\propto R$, giving $P_1/P_2 = 1/3$. In parallel ($\\Delta V$ constant): $P \\propto 1/R$, giving $P_1/P_2 = 3$.',
  },
  {
    id: 'm7-q2',
    moduleId: 7,
    questionType: 'single',
    difficulty: 'AP Standard',
    title: 'Thermal Energy in Terms of $Q$, $R$, and $\\Delta t$',
    prompt:
      'A total electric charge $Q$ flows at a constant rate through a resistor of resistance $R$ during a time interval $\\Delta t$. Which expression correctly gives the total thermal energy $E$ dissipated by the resistor in terms of $Q$, $R$, and $\\Delta t$?',
    options: [
      {
        id: 'A',
        text: '$E = Q^2 R \\Delta t$',
        trapExplanation:
          'AP Trap: Substituted $Q$ directly for $I$ in $E = I^2 R \\Delta t$! Remember $I = Q / \\Delta t$, NOT $Q$.',
      },
      {
        id: 'B',
        text: '$E = \\frac{Q^2 R}{\\Delta t}$',
        trapExplanation:
          'Correct! Since $I = Q / \\Delta t$, power is $P = I^2 R = \\frac{Q^2 R}{(\\Delta t)^2}$. Multiplying by time $\\Delta t$ gives $E = P \\Delta t = \\frac{Q^2 R}{\\Delta t}$.',
      },
      {
        id: 'C',
        text: '$E = \\frac{Q^2 R}{(\\Delta t)^2}$',
        trapExplanation:
          'AP Trap: That is the POWER $P$ (Watts), not the ENERGY $E$ (Joules)! You still need to multiply by $\\Delta t$.',
      },
      {
        id: 'D',
        text: '$E = \\frac{Q R}{\\Delta t}$',
        trapExplanation:
          'AP Trap: That equals $I R = \\Delta V$ (potential difference in Volts), not energy!',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Start with $E = P\\Delta t = I^2 R \\Delta t$ and substitute $I = Q / \\Delta t$.',
    solutionSummary:
      'Substituting $I = Q / \\Delta t$ into $E = I^2 R \\Delta t$ yields $E = \\left(\\frac{Q}{\\Delta t}\\right)^2 R \\Delta t = \\frac{Q^2 R}{\\Delta t}$.',
  },
  {
    id: 'm7-q3',
    moduleId: 7,
    questionType: 'single',
    difficulty: 'AP Standard',
    title: 'Electric Motor Accelerating a Block',
    prompt:
      'An ideal electric motor (100% efficient) connected to a constant potential difference $\\Delta V$ draws a steady current $I$ for time $\\Delta t$ while pulling a block of mass $m$ from rest across a frictionless horizontal track, giving the block final kinetic energy $K_0$ and speed $v_0$. In a second trial, the same block starts from rest while the motor operates at the same $\\Delta V$ for the same time $\\Delta t$, but draws current $2I$. What are the block\'s new final kinetic energy and speed?',
    circuitId: 'm7-motor-block',
    options: [
      {
        id: 'A',
        text: 'Kinetic energy $= 2K_0$; Speed $= 2v_0$',
        trapExplanation:
          'AP Trap: Kinetic energy doubles ($K = \\frac{1}{2}mv^2$), so speed scales as $\\sqrt{2}$, NOT $2$!',
      },
      {
        id: 'B',
        text: 'Kinetic energy $= 2K_0$; Speed $= \\sqrt{2}\\,v_0$',
        trapExplanation:
          'Correct! Electrical energy converted to kinetic energy is $K = E_{\\text{elec}} = I \\Delta V \\Delta t$. Doubling $I$ doubles $K$ to $2K_0$. Since $K = \\frac{1}{2}mv^2$, $v = \\sqrt{2K/m}$ increases by $\\sqrt{2}$.',
      },
      {
        id: 'C',
        text: 'Kinetic energy $= 4K_0$; Speed $= 2v_0$',
        trapExplanation:
          'AP Trap: Applied $E = I^2 R \\Delta t$ as if the motor were a simple resistor! Here $\\Delta V$ is explicitly held constant, so $E = I \\Delta V \\Delta t \\propto I$, not $I^2$.',
      },
      {
        id: 'D',
        text: 'Kinetic energy $= K_0$; Speed $= v_0$',
        trapExplanation:
          'AP Trap: Doubling the current at fixed voltage doubles the electrical power input $P = I\\Delta V$.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Use conservation of energy: $K = E_{\\text{elec}} = I \\Delta V \\Delta t$. Then solve for $v$ from $K = \\frac{1}{2}mv^2$.',
    solutionSummary:
      'With $\\Delta V$ and $\\Delta t$ constant, $E = I \\Delta V \\Delta t$ doubles when $I \\to 2I$, so $K = 2K_0$. Because $K \\propto v^2$, the new speed is $\\sqrt{2}\\,v_0$.',
  },
  {
    id: 'm7-q4',
    moduleId: 7,
    questionType: 'single',
    difficulty: 'High-Trap',
    title: 'Insulated Water Heaters: Comparing Boiling Times',
    prompt:
      'Two identical, well-insulated tanks contain equal masses of water at $20^\\circ\\text{C}$. Immersion Heater X (resistance $R_X$) and Immersion Heater Y (resistance $R_Y$) are each connected separately to identical ideal voltage sources $\\Delta V_0$. Given that $R_X > R_Y$, how do the times $t_X$ and $t_Y$ required to heat the water to $100^\\circ\\text{C}$ compare?',
    circuitId: 'm7-water-heaters',
    options: [
      {
        id: 'A',
        text: '$t_X < t_Y$, because larger resistance generates more heat per second ($P = I^2 R$).',
        trapExplanation:
          'AP Trap (Classic!): Both heaters are connected to the SAME voltage $\\Delta V_0$, NOT the same current! Larger $R_X$ reduces the current so much that $P = \\Delta V_0^2 / R$ is SMALLER.',
      },
      {
        id: 'B',
        text: '$t_X > t_Y$, because $P = \\frac{\\Delta V_0^2}{R}$ is smaller for the larger resistance $R_X$, requiring more time to deliver the same thermal energy.',
        trapExplanation:
          'Correct! Both tanks require the same thermal energy $Q = mc\\Delta T$. Since $\\Delta V_0$ is identical, $P = \\frac{\\Delta V_0^2}{R}$, so $R_X > R_Y \\implies P_X < P_Y \\implies t_X = Q/P_X > t_Y = Q/P_Y$.',
      },
      {
        id: 'C',
        text: '$t_X = t_Y$, because both voltage sources supply the same $\\Delta V_0$.',
        trapExplanation:
          'AP Trap: Equal voltage does not mean equal power when resistances differ.',
      },
      {
        id: 'D',
        text: '$t_X > t_Y$ only if the tanks are connected in series.',
        trapExplanation:
          'AP Trap: In series (same current), $P = I^2 R$ would actually make $R_X$ heat FASTER ($t_X < t_Y$)! It is specifically under constant voltage that $R_X > R_Y \\implies t_X > t_Y$.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Same voltage source $\\Delta V_0$! Which power formula isolates $\\Delta V_0$ and $R$?',
    solutionSummary:
      'Both tanks need the same energy $Q = mc\\Delta T$. At constant $\\Delta V_0$, heating rate is $P = \\Delta V_0^2 / R$, so time $t = \\frac{Q R}{\\Delta V_0^2} \\propto R$. Since $R_X > R_Y$, $t_X > t_Y$.',
  },
  {
    id: 'm7-q5',
    moduleId: 7,
    questionType: 'single',
    difficulty: 'AP Standard',
    title: 'Series vs. Parallel Heating Elements',
    prompt:
      'Two identical heating coils of resistance $R$ are immersed in a water tank and connected to an ideal battery $\\varepsilon$. In Config 1 (series), it takes time $t_1$ to boil the water. If rewired into Config 2 (parallel) with the same battery and same amount of water, how long does it take to boil?',
    circuitId: 'm7-series-parallel-heaters',
    options: [
      {
        id: 'A',
        text: '$\\frac{1}{4}t_1$',
        trapExplanation:
          'Correct! In series, $R_{eq,1} = 2R \\implies P_1 = \\frac{\\varepsilon^2}{2R}$. In parallel, $R_{eq,2} = R/2 \\implies P_2 = \\frac{\\varepsilon^2}{R/2} = \\frac{2\\varepsilon^2}{R} = 4P_1$. Four times the power boils the water in $\\frac{1}{4}$ the time!',
      },
      {
        id: 'B',
        text: '$\\frac{1}{2}t_1$',
        trapExplanation:
          'AP Trap: Forgot that $R_{eq}$ drops by a factor of FOUR ($2R \\to R/2$), not two!',
      },
      {
        id: 'C',
        text: '$2t_1$',
        trapExplanation:
          'AP Trap: Parallel configuration draws MORE current and delivers MORE power, so boiling time must DECREASE.',
      },
      {
        id: 'D',
        text: '$4t_1$',
        trapExplanation:
          'AP Trap: Inverted the ratio—series takes $4$ times longer than parallel, not vice versa.',
      },
    ],
    correctAnswers: ['A'],
    hint: 'Compare $R_{eq,\\text{series}} = 2R$ with $R_{eq,\\text{parallel}} = R/2$, then use $P_{\\text{tot}} = \\frac{\\varepsilon^2}{R_{eq}}$.',
    solutionSummary:
      'Moving from series ($2R$) to parallel ($R/2$) reduces $R_{eq}$ by a factor of $4$, quadrupling total power $P = \\varepsilon^2 / R_{eq}$ and cutting boiling time to $t_1 / 4$.',
  },
  {
    id: 'm7-q6',
    moduleId: 7,
    questionType: 'single',
    difficulty: 'Core',
    title: 'Total Power When a Parallel Bulb Burns Out',
    prompt:
      'Three identical bulbs are connected in **parallel** across an ideal battery $\\varepsilon$, dissipating a combined total power $P_0$. If one bulb burns out (creating an open circuit in its branch), what is the new total power dissipated by the remaining two bulbs?',
    options: [
      {
        id: 'A',
        text: '$P_0$',
        trapExplanation:
          'AP Trap: Total power is NOT constant! The ideal battery simply delivers less total current when a parallel path is removed.',
      },
      {
        id: 'B',
        text: '$\\frac{2}{3}P_0$',
        trapExplanation:
          'Correct! Each parallel bulb dissipates $P_{\\text{bulb}} = \\frac{\\varepsilon^2}{R}$ independently. Going from $3$ bulbs to $2$ bulbs changes total power from $3P_{\\text{bulb}}$ to $2P_{\\text{bulb}} = \\frac{2}{3}P_0$.',
      },
      {
        id: 'C',
        text: '$\\frac{3}{2}P_0$',
        trapExplanation:
          'AP Trap: Removing a parallel path increases $R_{eq}$ ($R/3 \\to R/2$), which DECREASES total power $P = \\varepsilon^2 / R_{eq}$.',
      },
      {
        id: 'D',
        text: '$\\frac{4}{9}P_0$',
        trapExplanation:
          'AP Trap: Squared the fraction $2/3$ unnecessarily. The voltage across each remaining bulb stays at $\\varepsilon$.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Since the battery is ideal, does the power of each surviving parallel bulb change?',
    solutionSummary:
      'Each parallel bulb remains at $\\Delta V = \\varepsilon$ and dissipates $P_0 / 3$. With two bulbs left, total power is $2(P_0 / 3) = \\frac{2}{3}P_0$.',
  },

  // ============================================================
  // MODULE 8: RC Circuits & Time Constant (6 MCQs)
  // ============================================================
  {
    id: 'm8-q1',
    moduleId: 8,
    questionType: 'single',
    difficulty: 'AP Standard',
    title: 'Qualitative Bulb Brightness During Capacitor Charging',
    prompt:
      'An ideal battery $\\varepsilon$, an open switch S, a light bulb, and an initially **uncharged** capacitor $C$ are connected in series. After switch S is closed, which explanation best accounts for the bulb\'s brightness over time?',
    circuitId: 'm8-rc-bulb-charge',
    options: [
      {
        id: 'A',
        text: 'The bulb starts completely dark and gradually brightens as charge builds up on the capacitor.',
        trapExplanation:
          'AP Trap: Reversed! An uncharged capacitor has $\\Delta V_C = 0$ and acts like a WIRE at $t=0$ (maximum current, brightest bulb), then approaches an open switch as $t \\to \\infty$.',
      },
      {
        id: 'B',
        text: 'The bulb is initially brightest and gradually dims to dark because the rising capacitor voltage $\\Delta V_C = Q/C$ opposes the battery emf $\\varepsilon$, reducing the loop current toward zero.',
        trapExplanation:
          'Correct! By Kirchhoff\'s loop rule, $\\varepsilon - \\Delta V_{\\text{bulb}} - Q/C = 0 \\implies \\Delta V_{\\text{bulb}} = \\varepsilon - Q/C$. At $t=0$, $Q=0$ so current is max. As $Q$ increases, $\\Delta V_C$ grows until $Q/C = \\varepsilon$ and $I \\to 0$.',
      },
      {
        id: 'C',
        text: 'The bulb stays at constant brightness until the capacitor is full, and then instantly shuts off.',
        trapExplanation:
          'AP Trap: Charging is exponential ($I(t) = I_0 e^{-t/\\tau}$), not a step function. Brightness decreases smoothly from the very first instant.',
      },
      {
        id: 'D',
        text: 'The bulb never lights because the gap between the capacitor plates prevents any electrons from moving in the wire.',
        trapExplanation:
          'AP Trap: Although electrons do not cross the dielectric gap, the battery moves electrons OFF the positive plate and ONTO the negative plate through the wire and bulb until $Q = C\\varepsilon$!',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Apply Kirchhoff\'s Loop Rule: $\\varepsilon - I R_{\\text{bulb}} - \\frac{Q}{C} = 0$. What happens to $I$ as $Q$ increases from $0$?',
    solutionSummary:
      'At $t=0$, $Q=0 \\implies \\Delta V_C = 0$ and $I$ is maximum (brightest). As charge accumulates, $\\Delta V_C = Q/C$ opposes $\\varepsilon$, causing $I(t) = (\\varepsilon/R)e^{-t/RC}$ and bulb brightness to decay exponentially to zero.',
  },
  {
    id: 'm8-q2',
    moduleId: 8,
    questionType: 'single',
    difficulty: 'High-Trap',
    title: 'Immediate ($t=0$) vs. Steady-State ($t \\to \\infty$) RC Currents',
    prompt:
      'In the circuit shown, all three resistors have resistance $R$ and the capacitor $C$ is initially uncharged. Switch S is closed at $t = 0$. What is the ratio of the battery current immediately after closing S ($I_0$) to the battery current a very long time later ($I_\\infty$)?',
    circuitId: 'm8-rc-multiloop-t0-inf',
    options: [
      {
        id: 'A',
        text: '$\\frac{I_0}{I_\\infty} = \\frac{4}{3}$',
        trapExplanation:
          'Correct! At $t = 0$, uncharged $C$ acts as a wire: $R_{eq,0} = R + (R \\parallel R) = \\frac{3}{2}R \\implies I_0 = \\frac{2\\varepsilon}{3R}$. At $t \\to \\infty$, charged $C$ acts as an open switch: $R_{eq,\\infty} = R + R = 2R \\implies I_\\infty = \\frac{\\varepsilon}{2R}$. Ratio: $\\frac{2/3}{1/2} = \\frac{4}{3}$.',
      },
      {
        id: 'B',
        text: '$\\frac{I_0}{I_\\infty} = \\frac{3}{4}$',
        trapExplanation:
          'AP Trap: Inverted the ratio ($R_{eq,0} / R_{eq,\\infty}$ instead of $I_0 / I_\\infty$). Battery current is ALWAYS larger at $t=0$ than at $t \\to \\infty$.',
      },
      {
        id: 'C',
        text: '$\\frac{I_0}{I_\\infty} = 2$',
        trapExplanation:
          'AP Trap: Forgot the series resistor $R$ in the right branch with $C$! Because there is an $R$ in series with $C$, the capacitor does NOT short out the middle resistor at $t=0$.',
      },
      {
        id: 'D',
        text: '$I_\\infty = 0$, so the ratio is undefined.',
        trapExplanation:
          'AP Trap: Only the CAPACITOR branch drops to zero current at steady state! Current continues to flow steadily through the left + middle loop ($R + R = 2R$).',
      },
    ],
    correctAnswers: ['A'],
    hint: 'Replace the capacitor with a WIRE at $t=0$, and with an OPEN SWITCH at $t \\to \\infty$. Compute $R_{eq}$ in both limits!',
    solutionSummary:
      'At $t=0$: $C$ is a wire $\\implies R_{eq,0} = \\frac{3}{2}R, I_0 = \\frac{2\\varepsilon}{3R}$. At $t\\to\\infty$: $C$ is open $\\implies R_{eq,\\infty} = 2R, I_\\infty = \\frac{\\varepsilon}{2R}$. Thus $I_0 / I_\\infty = 4/3$.',
  },
  {
    id: 'm8-q3',
    moduleId: 8,
    questionType: 'single',
    difficulty: 'High-Trap',
    title: 'Steady-State Charge in a Multi-Loop RC Divider',
    prompt:
      'The circuit shown has been connected for a very long time (steady state reached). What is the magnitude of the charge $Q$ stored on the $5\\,\\mu\\text{F}$ capacitor?',
    circuitId: 'm8-rc-voltage-divider',
    options: [
      {
        id: 'A',
        text: '$60\\,\\mu\\text{C}$',
        trapExplanation:
          'AP Trap (Classic!): Assumed the capacitor charges to the full battery voltage $12\\text{ V}$ ($5 \\times 12 = 60\\,\\mu\\text{C}$)! In steady state, current still flows through the $2\\text{ k}\\Omega$ and $4\\text{ k}\\Omega$ resistors, so the capacitor is only at the potential difference across the $4\\text{ k}\\Omega$ resistor!',
      },
      {
        id: 'B',
        text: '$40\\,\\mu\\text{C}$',
        trapExplanation:
          'Correct! At steady state, $I_C = 0$, so $I = \\frac{12\\text{ V}}{2\\text{ k}\\Omega + 4\\text{ k}\\Omega} = 2.0\\text{ mA}$. Since $C$ is in parallel with the $4\\text{ k}\\Omega$ resistor, $\\Delta V_C = (2.0\\text{ mA})(4\\text{ k}\\Omega) = 8.0\\text{ V}$. Thus $Q = C\\Delta V_C = (5\\,\\mu\\text{F})(8.0\\text{ V}) = 40\\,\\mu\\text{C}$.',
      },
      {
        id: 'C',
        text: '$20\\,\\mu\\text{C}$',
        trapExplanation:
          'AP Trap: Used the potential drop across the $2\\text{ k}\\Omega$ resistor ($4.0\\text{ V}$) instead of the parallel $4\\text{ k}\\Omega$ resistor ($8.0\\text{ V}$).',
      },
      {
        id: 'D',
        text: '$0\\,\\mu\\text{C}$',
        trapExplanation:
          'AP Trap: Confusing zero steady-state CURRENT ($I_C = 0$) with zero steady-state CHARGE! A fully charged capacitor holds constant nonzero charge $Q = C\\Delta V_C$.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Find the steady-state voltage across the $4\\text{ k}\\Omega$ resistor—the capacitor is in parallel with it, so they have identical $\\Delta V$!',
    solutionSummary:
      'Steady-state current through the $2\\text{ k}\\Omega$ and $4\\text{ k}\\Omega$ resistors is $12\\text{ V} / 6\\text{ k}\\Omega = 2\\text{ mA}$, giving $\\Delta V_{4\\text{k}\\Omega} = \\Delta V_C = 8.0\\text{ V}$. Hence $Q = (5\\,\\mu\\text{F})(8.0\\text{ V}) = 40\\,\\mu\\text{C}$.',
  },
  {
    id: 'm8-q4',
    moduleId: 8,
    questionType: 'single',
    difficulty: 'High-Trap',
    title: 'Complex RC Time Constant Ratio ($\\frac{4}{3}\\tau_1$)',
    prompt:
      'Circuit 1 consists of one resistor $R$ and one capacitor $C$, with time constant $\\tau_1 = RC$. Circuit 2 connects a parallel resistor pair ($R$ and $2R$) in series with a parallel capacitor pair ($C$ and $C$), as shown. What is the time constant $\\tau_2$ of Circuit 2 in terms of $\\tau_1$?',
    circuitId: 'm8-rc-tau-4-3',
    options: [
      {
        id: 'A',
        text: '$\\tau_2 = \\frac{1}{3}\\tau_1$',
        trapExplanation:
          'AP Trap: Treated the two parallel capacitors as $C/2$ instead of $2C$! Parallel capacitors ADD: $C_{eq} = C + C = 2C$.',
      },
      {
        id: 'B',
        text: '$\\tau_2 = \\frac{4}{3}\\tau_1$',
        trapExplanation:
          'Correct! For the parallel resistors, $R_{eq} = \\left(\\frac{1}{R} + \\frac{1}{2R}\\right)^{-1} = \\frac{2}{3}R$. For the parallel capacitors, $C_{eq} = C + C = 2C$. Therefore $\\tau_2 = R_{eq} C_{eq} = \\left(\\frac{2}{3}R\\right)(2C) = \\frac{4}{3}RC = \\frac{4}{3}\\tau_1$.',
      },
      {
        id: 'C',
        text: '$\\tau_2 = 6\\tau_1$',
        trapExplanation:
          'AP Trap: Added the resistors ($R + 2R = 3R$) as if they were in series instead of parallel.',
      },
      {
        id: 'D',
        text: '$\\tau_2 = \\frac{3}{2}\\tau_1$',
        trapExplanation:
          'AP Trap: Computed $1/R_{eq} = 3/(2R)$ and forgot to invert it, or used $R_{eq} = 3R$ with $C_{eq} = C/2$.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Compute $R_{eq}$ (parallel resistors) and $C_{eq}$ (parallel capacitors) separately, then multiply $\\tau_2 = R_{eq}C_{eq}$.',
    solutionSummary:
      'Parallel resistors $R \\parallel 2R$ yield $R_{eq} = \\frac{2}{3}R$. Parallel capacitors $C \\parallel C$ yield $C_{eq} = 2C$. Thus $\\tau_2 = (\\frac{2}{3}R)(2C) = \\frac{4}{3}\\tau_1$.',
  },
  {
    id: 'm8-q5',
    moduleId: 8,
    questionType: 'single',
    difficulty: 'High-Trap',
    title: 'Complex RC Time Constant Ratio ($\\frac{1}{9}\\tau_1$)',
    prompt:
      'Circuit 1 has a single resistor $R$ and single capacitor $C$ (time constant $\\tau_1 = RC$). Circuit 2 has **three identical resistors $R$ in parallel** connected in series with **three identical capacitors $C$ in series**. What is the time constant $\\tau_2$ of Circuit 2 in terms of $\\tau_1$?',
    circuitId: 'm8-rc-tau-1-9',
    options: [
      {
        id: 'A',
        text: '$\\tau_2 = \\tau_1$',
        trapExplanation:
          'AP Trap: Thinking the factors of $3$ cancel out! Parallel resistors DIVIDE by $3$ ($R/3$) AND series capacitors ALSO DIVIDE by $3$ ($C/3$)!',
      },
      {
        id: 'B',
        text: '$\\tau_2 = \\frac{1}{9}\\tau_1$',
        trapExplanation:
          'Correct! Three resistors $R$ in parallel give $R_{eq} = R/3$. Three capacitors $C$ in series give $C_{eq} = C/3$. Multiplying gives $\\tau_2 = R_{eq}C_{eq} = \\left(\\frac{R}{3}\\right)\\left(\\frac{C}{3}\\right) = \\frac{1}{9}RC = \\frac{1}{9}\\tau_1$!',
      },
      {
        id: 'C',
        text: '$\\tau_2 = 9\\tau_1$',
        trapExplanation:
          'AP Trap: Used series resistor ($3R$) and parallel capacitor ($3C$) formulas—both reversed!',
      },
      {
        id: 'D',
        text: '$\\tau_2 = \\frac{1}{3}\\tau_1$',
        trapExplanation:
          'AP Trap: Only divided one of $R$ or $C$ by $3$ instead of both.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Check both rules carefully: 3 equal resistors in parallel $= R/3$; 3 equal capacitors in series $= C/3$.',
    solutionSummary:
      'Parallel resistors reduce $R_{eq}$ to $R/3$, and series capacitors reduce $C_{eq}$ to $C/3$. Thus $\\tau_2 = (R/3)(C/3) = \\frac{1}{9}\\tau_1$.',
  },
  {
    id: 'm8-q6',
    moduleId: 8,
    questionType: 'single',
    difficulty: 'AP Standard',
    title: 'Comparing $R_X$ vs. $R_Y$ from RC Charging $Q$-vs.-$t$ Graphs',
    prompt:
      'Two RC charging circuits, Circuit X (resistor $R_X$) and Circuit Y (resistor $R_Y$), use **identical ideal batteries $\\varepsilon$** and **identical uncharged capacitors $C$**. The graph shows capacitor charge $Q$ versus time $t$ for both circuits. How do $R_X$ and $R_Y$ compare, and why?',
    graphId: 'm8-rc-q-vs-t-rx-ry',
    options: [
      {
        id: 'A',
        text: '$R_X > R_Y$, because Circuit X takes longer to reach $63\\%$ (or $50\\%$) of $Q_{\\max}$, meaning $\\tau_X > \\tau_Y$.',
        trapExplanation:
          'Correct! Both curves approach the same $Q_{\\max} = C\\varepsilon$. Circuit X takes longer to reach $0.63 Q_{\\max}$ (one time constant $\\tau = RC$). Since $C$ is identical, $\\tau_X > \\tau_Y \\implies R_X > R_Y$.',
      },
      {
        id: 'B',
        text: '$R_X < R_Y$, because Circuit Y rises faster and therefore has a larger resistance.',
        trapExplanation:
          'AP Trap: Higher resistance restricts charging current ($I_0 = \\varepsilon/R$), making the capacitor charge SLOWER (longer $\\tau$), not faster!',
      },
      {
        id: 'C',
        text: '$R_X = R_Y$, because both circuits reach the same maximum charge $Q_{\\max}$.',
        trapExplanation:
          'AP Trap: Maximum charge $Q_{\\max} = C\\varepsilon$ depends only on $C$ and $\\varepsilon$, NOT on $R$! Resistance controls HOW FAST the capacitor charges ($\\tau = RC$).',
      },
      {
        id: 'D',
        text: '$R_X > R_Y$, because Circuit X stores less total energy at steady state.',
        trapExplanation:
          'AP Trap: Since both reach the same $Q_{\\max}$ on identical capacitors $C$, both store the EXACT same steady-state energy $U = \\frac{Q_{\\max}^2}{2C}$.',
      },
    ],
    correctAnswers: ['A'],
    hint: 'Find the time required for each curve to reach $0.63 Q_{\\max}$ (which equals $\\tau = RC$).',
    solutionSummary:
      'The time constant $\\tau = RC$ is the time to reach $1 - e^{-1} \\approx 63\\%$ of $Q_{\\max}$. From the graph, $\\tau_X > \\tau_Y$. With identical capacitance $C$, $R_X > R_Y$.',
  },

  // ============================================================
  // MODULE 9: AP "Select Two" MCQs (6 All-or-Nothing MCQs)
  // ============================================================
  {
    id: 'm9-q1',
    moduleId: 9,
    questionType: 'select-two',
    difficulty: 'High-Trap',
    title: 'Select Two: Steady-State RC Loop Equations',
    prompt:
      'The RC circuit shown has been connected for a very long time so that **steady state** has been reached. Let $I_1$ be the current through $R_1$, $I_2$ the current through $R_2$, $I_3$ the current through $R_3$, and $Q$ the charge on capacitor $C$. **Select TWO** equations that are valid at steady state.',
    circuitId: 'm9-st-rc-loops',
    options: [
      {
        id: 'A',
        text: '$\\varepsilon - I_1 R_1 - I_2 R_2 = 0$',
        trapExplanation:
          'Correct! Kirchhoff\'s Loop Rule around the left loop is ALWAYS valid, including at steady state (where $I_1 = I_2$).',
      },
      {
        id: 'B',
        text: '$I_2 R_2 - \\frac{Q}{C} = 0$',
        trapExplanation:
          'Correct! Applying the Loop Rule around the right loop gives $+I_2 R_2 - I_3 R_3 - Q/C = 0$. At steady state $I_3 = 0$, leaving $I_2 R_2 = Q/C$ (the capacitor voltage equals the voltage across $R_2$).',
      },
      {
        id: 'C',
        text: '$\\varepsilon - \\frac{Q}{C} = 0$',
        trapExplanation:
          'AP Trap: Because $I_1 \\neq 0$ flows through $R_1$, there is a nonzero voltage drop $I_1 R_1$! The outer loop gives $\\varepsilon - I_1 R_1 - Q/C = 0$, so $Q/C < \\varepsilon$.',
      },
      {
        id: 'D',
        text: '$I_1 = I_2 + I_3$ with $I_3 = \\frac{\\varepsilon}{R_1 + R_3}$',
        trapExplanation:
          'AP Trap: At steady state, a fully charged capacitor blocks DC current completely, so $I_3 = 0$ and $I_1 = I_2$.',
      },
    ],
    correctAnswers: ['A', 'B'],
    hint: 'At steady state, set $I_3 = 0$ (no current in the capacitor branch), then write Kirchhoff\'s Loop Rule for the left and right loops.',
    solutionSummary:
      'At steady state $I_3 = 0$, so $I_1 = I_2$ and $\\Delta V_{R_3} = 0$. Left loop: $\\varepsilon - I_1 R_1 - I_2 R_2 = 0$. Right loop: $I_2 R_2 - Q/C = 0$.',
  },
  {
    id: 'm9-q2',
    moduleId: 9,
    questionType: 'select-two',
    difficulty: 'High-Trap',
    title: 'Select Two: Unlabeled Ohmic vs. Lightbulb $I$-$\\Delta V$ Graph',
    prompt:
      'The graph shows current $I$ vs. potential difference $\\Delta V$ for two unidentified circuit elements (Device 1 and Device 2). **Select TWO** statements that are supported by the graph.',
    graphId: 'm9-st-iv-unlabeled',
    options: [
      {
        id: 'A',
        text: 'Device 1 is ohmic because the ratio $\\Delta V / I$ is constant across all tested potential differences.',
        trapExplanation:
          'Correct! Device 1 is a straight line passing through the origin, meaning $I \\propto \\Delta V$ and $R_1 = \\Delta V / I$ is constant (definition of an ohmic resistor).',
      },
      {
        id: 'B',
        text: 'Device 2 has a resistance that **increases** as $\\Delta V$ increases, consistent with a tungsten lightbulb filament heating up.',
        trapExplanation:
          'Correct! As $\\Delta V$ increases, the curve bends downward, meaning $I / \\Delta V$ gets smaller and therefore $R_2 = \\Delta V / I$ gets LARGER.',
      },
      {
        id: 'C',
        text: 'Device 2 has a resistance that **decreases** as $\\Delta V$ increases because its curve becomes flatter.',
        trapExplanation:
          'AP Trap: Flatter slope on an $I$-vs.-$\\Delta V$ graph means smaller $I/\\Delta V = 1/R$, which means LARGER resistance, not smaller!',
      },
      {
        id: 'D',
        text: 'At very low potential differences near the origin, Device 2 has a much larger resistance than Device 1.',
        trapExplanation:
          'AP Trap: Near the origin, Device 2 is STEEPER than Device 1 (larger $I$ for the same small $\\Delta V$), meaning Device 2\'s cold/unlit resistance is SMALLER than Device 1\'s!',
      },
    ],
    correctAnswers: ['A', 'B'],
    hint: 'Remember $R = \\Delta V / I$ is the inverse of the slope from the origin on an $I$-vs.-$\\Delta V$ graph.',
    solutionSummary:
      'Device 1 is a straight line through the origin (ohmic, constant $R$). Device 2 bends downward as $\\Delta V$ increases, showing $R = \\Delta V / I$ increases with voltage/temperature (typical incandescent bulb).',
  },
  {
    id: 'm9-q3',
    moduleId: 9,
    questionType: 'select-two',
    difficulty: 'AP Standard',
    title: 'Select Two: Effects of Closing Switch S',
    prompt:
      'In the circuit shown, the battery is ideal and switch S is initially open. **Select TWO** quantities that **INCREASE** after switch S is closed.',
    circuitId: 'm9-st-switch-s',
    options: [
      {
        id: 'A',
        text: 'The total power delivered by the ideal battery',
        trapExplanation:
          'Correct! Closing S lowers $R_{eq}$, which increases total battery current $I_{\\text{batt}}$ and total power $P_{\\text{batt}} = \\varepsilon I_{\\text{batt}}$.',
      },
      {
        id: 'B',
        text: 'The potential difference across resistor $R_1$',
        trapExplanation:
          'Correct! Because $I_{\\text{batt}}$ increases and all battery current passes through $R_1$, $\\Delta V_1 = I_{\\text{batt}} R_1$ increases.',
      },
      {
        id: 'C',
        text: 'The potential difference across resistor $R_2$',
        trapExplanation:
          'AP Trap: By the Loop Rule, $\\Delta V_2 = \\varepsilon - \\Delta V_1$. Because $\\Delta V_1$ increases, $\\Delta V_2$ MUST DECREASE!',
      },
      {
        id: 'D',
        text: 'The equivalent resistance of the circuit',
        trapExplanation:
          'AP Trap: Adding a parallel resistor ($R_3$) ALWAYS decreases equivalent resistance.',
      },
    ],
    correctAnswers: ['A', 'B'],
    hint: 'Trace $R_{eq} \\to I_{\\text{batt}} \\to \\Delta V_1 \\to \\Delta V_2$ and $P_{\\text{batt}} = \\varepsilon I_{\\text{batt}}$.',
    solutionSummary:
      'Closing S lowers $R_{eq}$, increasing $I_{\\text{batt}}$, $P_{\\text{batt}} = \\varepsilon I_{\\text{batt}}$, and $\\Delta V_1 = I_{\\text{batt}} R_1$, while decreasing $\\Delta V_2 = \\varepsilon - \\Delta V_1$.',
  },
  {
    id: 'm9-q4',
    moduleId: 9,
    questionType: 'select-two',
    difficulty: 'High-Trap',
    title: 'Select Two: Increasing Ammeter Reading (Real Battery & Meters)',
    prompt:
      'A real battery ($\\varepsilon, r$) is connected to an ideal ammeter A, resistor $R$, and ideal voltmeter V across $R$. **Select TWO** independent modifications that would **INCREASE** the reading of ammeter A.',
    circuitId: 'm9-st-meters',
    options: [
      {
        id: 'A',
        text: 'Connecting a second resistor $R_2$ in parallel with $R$',
        trapExplanation:
          'Correct! Adding a parallel resistor lowers external resistance $R_{\\text{ext}}$, increasing total current $I_A = \\varepsilon / (R_{\\text{ext}} + r)$.',
      },
      {
        id: 'B',
        text: 'Replacing the ideal voltmeter V with a **non-ideal voltmeter** of finite resistance $R_V$',
        trapExplanation:
          'Correct! A non-ideal voltmeter acts just like a parallel resistor $R_V$ across $R$, lowering $R_{\\text{ext}}$ and increasing the current through the main branch and ammeter A!',
      },
      {
        id: 'C',
        text: 'Replacing the ideal ammeter A with a **non-ideal ammeter** of nonzero resistance $R_A$',
        trapExplanation:
          'AP Trap: A non-ideal ammeter adds SERIES resistance $R_A$, which DECREASES the current.',
      },
      {
        id: 'D',
        text: 'Increasing the battery\'s internal resistance $r$',
        trapExplanation:
          'AP Trap: Internal resistance $r$ is in series with the loop; increasing $r$ decreases $I_A = \\varepsilon / (R + r)$.',
      },
    ],
    correctAnswers: ['A', 'B'],
    hint: 'To increase $I_A$, you must DECREASE the total equivalent resistance of the circuit.',
    solutionSummary:
      'Both adding a parallel resistor $R_2$ and swapping in a finite-resistance voltmeter add a parallel path across $R$, reducing $R_{eq}$ and increasing the ammeter reading $I_A$.',
  },
  {
    id: 'm9-q5',
    moduleId: 9,
    questionType: 'select-two',
    difficulty: 'AP Standard',
    title: 'Select Two: Kirchhoff Analysis of a Combination Circuit',
    prompt:
      'An ideal $10\\text{ V}$ battery is connected to a $2\\,\\Omega$ resistor in series with parallel $6\\,\\Omega$ and $3\\,\\Omega$ resistors as shown. **Select TWO** true statements about this circuit.',
    circuitId: 'm9-st-kirchhoff-nodes',
    options: [
      {
        id: 'A',
        text: 'The potential difference between junctions P and Q is $\\Delta V_{PQ} = 5.0\\text{ V}$.',
        trapExplanation:
          'Correct! $R_{\\text{par}} = (1/6 + 1/3)^{-1} = 2\\,\\Omega$, so $R_{eq} = 2 + 2 = 4\\,\\Omega$ and $I_{\\text{batt}} = 10/4 = 2.5\\text{ A}$. The $2\\,\\Omega$ series resistor drops $(2.5)(2) = 5.0\\text{ V}$, leaving $\\Delta V_{PQ} = 5.0\\text{ V}$.',
      },
      {
        id: 'B',
        text: 'The current through the $3\\,\\Omega$ resistor is twice the current through the $6\\,\\Omega$ resistor.',
        trapExplanation:
          'Correct! Because the $6\\,\\Omega$ and $3\\,\\Omega$ resistors are in parallel (same $\\Delta V_{PQ}$), $I = \\Delta V / R \\implies I_{3\\Omega} = \\frac{5}{3}\\text{ A} = 2\\left(\\frac{5}{6}\\text{ A}\\right) = 2 I_{6\\Omega}$.',
      },
      {
        id: 'C',
        text: 'The current through the $2\\,\\Omega$ resistor is $5.0\\text{ A}$.',
        trapExplanation:
          'AP Trap: Computed $10\\text{ V} / 2\\,\\Omega = 5.0\\text{ A}$ while ignoring the parallel block! Total resistance is $4\\,\\Omega$, so $I = 2.5\\text{ A}$.',
      },
      {
        id: 'D',
        text: 'The $6\\,\\Omega$ resistor dissipates twice as much power as the $3\\,\\Omega$ resistor.',
        trapExplanation:
          'AP Trap: In parallel (same $\\Delta V$), $P = \\Delta V^2 / R$, so the SMALLER $3\\,\\Omega$ resistor dissipates twice as much power as the $6\\,\\Omega$ resistor!',
      },
    ],
    correctAnswers: ['A', 'B'],
    hint: 'Find $R_{\\text{par}}$ of $6\\,\\Omega$ and $3\\,\\Omega$ first, then find $I_{\\text{batt}}$ and $\\Delta V_{PQ}$.',
    solutionSummary:
      '$6\\,\\Omega \\parallel 3\\,\\Omega = 2\\,\\Omega$, giving $R_{eq} = 4\\,\\Omega$ and $I_{\\text{batt}} = 2.5\\text{ A}$. Thus $\\Delta V_{PQ} = 5.0\\text{ V}$ and $I_{3\\Omega} = 2 I_{6\\Omega}$.',
  },
  {
    id: 'm9-q6',
    moduleId: 9,
    questionType: 'select-two',
    difficulty: 'High-Trap',
    title: 'Select Two: Doubling Stored Capacitor Energy',
    prompt:
      'A capacitor of capacitance $C$ is connected in series with a resistor $R$ and an ideal battery of emf $\\varepsilon$. After steady state is reached, the capacitor stores energy $U_0 = \\frac{1}{2}C\\varepsilon^2$. Starting from an uncharged state, **select TWO** individual modifications that would result in a steady-state stored energy of **$2U_0$**.',
    options: [
      {
        id: 'A',
        text: 'Doubling the capacitance to $2C$ (keeping $R$ and $\\varepsilon$ unchanged)',
        trapExplanation:
          'Correct! $U = \\frac{1}{2}(2C)\\varepsilon^2 = 2U_0$. (At constant voltage $\\varepsilon$, doubling $C$ doubles both $Q$ and $U$.)',
      },
      {
        id: 'B',
        text: 'Increasing the battery emf to $\\sqrt{2}\\,\\varepsilon$ (keeping $C$ and $R$ unchanged)',
        trapExplanation:
          'Correct! $U = \\frac{1}{2}C(\\sqrt{2}\\,\\varepsilon)^2 = \\frac{1}{2}C(2\\varepsilon^2) = 2U_0$.',
      },
      {
        id: 'C',
        text: 'Doubling the battery emf to $2\\varepsilon$ (keeping $C$ and $R$ unchanged)',
        trapExplanation:
          'AP Trap: Because $U \\propto \\varepsilon^2$, doubling $\\varepsilon$ QUADRUPLES stored energy to $4U_0$, not $2U_0$!',
      },
      {
        id: 'D',
        text: 'Halving the resistance to $R/2$ (keeping $C$ and $\\varepsilon$ unchanged)',
        trapExplanation:
          'AP Trap: Changing $R$ changes the charging time constant $\\tau = RC$, NOT the steady-state voltage $\\varepsilon$ or stored energy $U_0$!',
      },
    ],
    correctAnswers: ['A', 'B'],
    hint: 'Inspect $U = \\frac{1}{2}C\\varepsilon^2$: $U$ is linear in $C$, quadratic in $\\varepsilon$, and independent of $R$.',
    solutionSummary:
      'Because $U = \\frac{1}{2}C\\varepsilon^2$, doubling $U$ requires either doubling $C$ (to $2C$) or multiplying $\\varepsilon$ by $\\sqrt{2}$. Resistance $R$ does not affect steady-state stored energy.',
  },
]
