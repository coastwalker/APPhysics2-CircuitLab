import { FRQQuestion } from '../types'

export const ALL_FRQS: FRQQuestion[] = [
  {
    id: 'frq-1',
    number: 1,
    title: 'Experimental Design & Linearization (Real Battery & Ohmic Test)',
    subtitle: 'AP Physics 2 FRQ Style • Experimental Design & Graph Linearization',
    totalPoints: 10,
    estimatedMinutes: 15,
    tags: ['Linearization', '1/I vs. R', 'Internal Resistance', 'Experimental Design', 'Ohmic Test'],
    stem: 'A student investigates a non-ideal battery with unknown emf $\\varepsilon$ and unknown internal resistance $r$. The student connects the battery in series with an ideal ammeter and various known external resistors $R$, measuring the steady current $I$ for each value of $R$. The student plots $\\frac{1}{I}$ versus $R$ and draws the best-fit line shown below.',
    graphId: 'frq1-inv-i-vs-r',
    parts: [
      {
        label: '(a)',
        prompt:
          'Starting from Kirchhoff\'s Loop Rule, derive a linear equation expressing $\\frac{1}{I}$ in terms of $R$, $\\varepsilon$, and $r$. Clearly identify what physical quantities correspond to the **slope** and the **vertical intercept** of the best-fit line.',
        modelSolution:
          'Applying Kirchhoff\'s Loop Rule around the single-loop circuit:\n$$\\varepsilon - I r - I R = 0 \\implies \\varepsilon = I(R + r)$$\nDividing both sides by $I \\varepsilon$:\n$$\\frac{1}{I} = \\left(\\frac{1}{\\varepsilon}\\right) R + \\frac{r}{\\varepsilon}$$\nComparing with $y = mx + b$ (with $y = \\frac{1}{I}$ and $x = R$):\n• **Slope:** $m = \\frac{1}{\\varepsilon}$\n• **Vertical intercept:** $b = \\frac{r}{\\varepsilon}$',
        rubricPoints: [
          {
            id: 'frq1-a1',
            points: 1,
            criterion: 'Correctly writes Kirchhoff\'s Loop Rule or Ohm\'s Law including internal resistance: $\\varepsilon = I(R + r)$.',
          },
          {
            id: 'frq1-a2',
            points: 1,
            criterion: 'Algebraically rearranges to $\\frac{1}{I} = \\frac{1}{\\varepsilon}R + \\frac{r}{\\varepsilon}$.',
          },
          {
            id: 'frq1-a3',
            points: 1,
            criterion: 'Explicitly identifies $\\text{slope} = \\frac{1}{\\varepsilon}$ AND $\\text{y-intercept} = \\frac{r}{\\varepsilon}$.',
          },
        ],
      },
      {
        label: '(b)',
        prompt:
          'Using the best-fit line on the graph, calculate numerical values for the battery\'s emf $\\varepsilon$ and internal resistance $r$. Show the points you read from the best-fit line.',
        modelSolution:
          'Select two widely spaced points ON THE BEST-FIT LINE (not raw data points), e.g., $(0\\,\\Omega,\\; 0.25\\text{ A}^{-1})$ and $(10\\,\\Omega,\\; 1.50\\text{ A}^{-1})$:\n$$\\text{slope} = \\frac{1.50 - 0.25\\text{ A}^{-1}}{10 - 0\\,\\Omega} = \\frac{1.25}{10} = 0.125\\text{ V}^{-1}$$\nSince $\\text{slope} = \\frac{1}{\\varepsilon}$:\n$$\\varepsilon = \\frac{1}{0.125\\text{ V}^{-1}} = 8.0\\text{ V}$$\nFrom the vertical intercept $b = 0.25\\text{ A}^{-1} = \\frac{r}{\\varepsilon}$:\n$$r = b \\cdot \\varepsilon = (0.25\\text{ A}^{-1})(8.0\\text{ V}) = 2.0\\,\\Omega$$',
        rubricPoints: [
          {
            id: 'frq1-b1',
            points: 1,
            criterion: 'Calculates slope using two points directly on the best-fit line: $m \\approx 0.125\\text{ A}^{-1}/\\Omega$ (accept $0.12$–$0.13$).',
          },
          {
            id: 'frq1-b2',
            points: 1,
            criterion: 'Calculates $\\varepsilon = 1/m = 8.0\\text{ V}$ (with correct units).',
          },
          {
            id: 'frq1-b3',
            points: 1,
            criterion: 'Reads vertical intercept $b = 0.25\\text{ A}^{-1}$ and solves $r = b\\varepsilon = 2.0\\,\\Omega$ (with correct units).',
          },
        ],
      },
      {
        label: '(c)',
        prompt:
          'The student is now given an unknown circuit element, **Resistor X**, and asked to determine experimentally whether Resistor X is **ohmic**. Describe a circuit (including proper placement of an ammeter and voltmeter) and a step-by-step experimental procedure and data analysis method to test whether Resistor X is ohmic.',
        modelSolution:
          '**Circuit Design:** Connect a variable DC power supply (or battery + variable resistor), an **ammeter in series** with Resistor X, and a **voltmeter in parallel** directly across Resistor X (see schematic below).\n\n**Procedure:**\n1. Set the power supply to a low voltage, close the switch, and record the current $I$ through X (ammeter) and potential difference $\\Delta V_X$ across X (voltmeter).\n2. Vary the power supply across at least $5$–$6$ different voltage settings, recording $(\\Delta V_X, I)$ pairs for each setting (opening the switch between trials if needed to check temperature effects).\n\n**Analysis:** Plot $I$ vs. $\\Delta V_X$ (or $\\Delta V_X$ vs. $I$). If the data form a **straight line passing through the origin** (constant ratio $R_X = \\Delta V_X / I$), then Resistor X is **ohmic**. If the graph curves (changing $\\Delta V_X / I$), Resistor X is **non-ohmic**.',
        solutionCircuitId: 'frq1-ohmic-test',
        rubricPoints: [
          {
            id: 'frq1-c1',
            points: 1,
            criterion: 'Places ammeter in SERIES with Resistor X and voltmeter in PARALLEL directly across Resistor X.',
          },
          {
            id: 'frq1-c2',
            points: 1,
            criterion: 'Includes a method to vary $\\Delta V_X$ and $I$ across multiple trials (variable power supply, multiple batteries, or rheostat) and record both $I$ and $\\Delta V_X$.',
          },
          {
            id: 'frq1-c3',
            points: 1,
            criterion: 'States valid analysis: plot $I$ vs. $\\Delta V_X$ (or $\\Delta V_X$ vs. $I$); ohmic if linear through the origin (constant $\\Delta V_X / I$).',
          },
        ],
      },
      {
        label: '(d)',
        prompt:
          'Suppose the power supply used in part (c) is **non-ideal** (has internal resistance $r$, or even non-ohmic internal behavior). Does this invalidate the student\'s procedure for testing whether Resistor X is ohmic? Justify your answer.',
        modelSolution:
          '**No, it does NOT invalidate the procedure.** Because the voltmeter is connected **directly across Resistor X** (not across the battery) and the ammeter is in **series** with Resistor X, the meters directly measure the true $\\Delta V_X$ across X and true current $I_X$ through X. Even if the battery\'s terminal voltage sags due to internal resistance $r$, each recorded pair $(\\Delta V_X, I_X)$ still satisfies $\\Delta V_X / I_X = R_X$ strictly for Resistor X, so an ohmic Resistor X will still yield a straight line through the origin on an $I_X$-vs.-$\\Delta V_X$ plot.',
        rubricPoints: [
          {
            id: 'frq1-d1',
            points: 1,
            criterion: 'Correctly states NO (does not invalidate) AND justifies that $\\Delta V_X$ and $I_X$ are measured directly at Resistor X, independent of internal voltage drops inside the power supply.',
          },
        ],
      },
    ],
  },
  {
    id: 'frq-2',
    number: 2,
    title: 'Qualitative / Quantitative Translation (Bulbs, Switch & Capacitor)',
    subtitle: 'AP Physics 2 FRQ Style • QQT (Student Claims, Derivation & RC Replacement)',
    totalPoints: 12,
    estimatedMinutes: 18,
    tags: ['QQT', 'Bulb Brightness', 'Power Derivation', 'RC Transients', 'Short Circuit'],
    stem: 'Three identical ohmic light bulbs (Bulb 1, Bulb 2, and Bulb 3, each of constant resistance $R$) are connected to an ideal battery of emf $\\varepsilon$ and an open switch S, as shown below.',
    circuitId: 'frq2-three-bulbs-switch',
    parts: [
      {
        label: '(a)',
        prompt:
          'When switch S is closed, two students make the following predictions:\n• **Student A:** *"Bulb 1 will get brighter because closing S gives the battery an extra branch, so more current leaves the battery."*\n• **Student B:** *"Bulb 2 will stay the exact same brightness because it is in parallel with Bulb 3, and parallel branches do not affect each other."*\n\nState whether you **agree or disagree** with each student\'s claim and reasoning, and explain clearly using circuit principles.',
        modelSolution:
          '• **Student A: AGREE.** Closing S connects Bulb 3 in parallel with Bulb 2, which decreases the total equivalent resistance of the circuit ($2R \\to \\frac{3}{2}R$). Because the battery is ideal ($\\varepsilon$ constant), total current $I_{\\text{batt}} = \\varepsilon / R_{eq}$ increases. All battery current passes through Bulb 1, so $P_1 = I_{\\text{batt}}^2 R$ increases and Bulb 1 gets brighter.\n\n• **Student B: DISAGREE.** Parallel branches are independent ONLY when connected directly across an ideal battery. Here, the parallel pair (Bulbs 2 & 3) is in **series with Bulb 1**. Because $I_{\\text{batt}}$ increases, the potential drop across Bulb 1 ($\\Delta V_1 = I_{\\text{batt}} R$) increases. By Kirchhoff\'s Loop Rule, $\\Delta V_2 = \\varepsilon - \\Delta V_1$ must **decrease**, so Bulb 2 becomes **dimmer**.',
        rubricPoints: [
          {
            id: 'frq2-a1',
            points: 1,
            criterion: 'Agrees with Student A AND explains that adding a parallel branch decreases $R_{eq}$, increasing $I_{\\text{batt}}$ through Bulb 1.',
          },
          {
            id: 'frq2-a2',
            points: 1,
            criterion: 'Disagrees with Student B and correctly states that Bulb 2 becomes DIMMER.',
          },
          {
            id: 'frq2-a3',
            points: 1,
            criterion: 'Correctly uses Kirchhoff\'s Loop Rule: increased $\\Delta V_1 = I_{\\text{batt}}R$ causes $\\Delta V_2 = \\varepsilon - \\Delta V_1$ to decrease (so $P_2 = \\Delta V_2^2/R$ decreases).',
          },
        ],
      },
      {
        label: '(b)',
        prompt:
          'Let $P_1$ be the power dissipated by Bulb 1 while switch S is **open**. Derive an expression for the new power dissipated by Bulb 1 after switch S is **closed**, $P_{1,\\text{new}}$, strictly in terms of $P_1$.',
        modelSolution:
          '**With switch S OPEN:** Bulb 1 and Bulb 2 are in series, so $R_{eq,\\text{open}} = 2R$.\n$$I_{\\text{open}} = \\frac{\\varepsilon}{2R} \\implies P_1 = I_{\\text{open}}^2 R = \\frac{\\varepsilon^2}{4R}$$\n\n**With switch S CLOSED:** Bulb 2 and Bulb 3 are in parallel ($R_{23} = R/2$), in series with Bulb 1:\n$$R_{eq,\\text{closed}} = R + \\frac{R}{2} = \\frac{3}{2}R \\implies I_{\\text{closed}} = \\frac{\\varepsilon}{\\frac{3}{2}R} = \\frac{2\\varepsilon}{3R}$$\n$$P_{1,\\text{new}} = I_{\\text{closed}}^2 R = \\left(\\frac{2\\varepsilon}{3R}\\right)^2 R = \\frac{4\\varepsilon^2}{9R}$$\nTaking the ratio $\\frac{P_{1,\\text{new}}}{P_1}$:\n$$\\frac{P_{1,\\text{new}}}{P_1} = \\frac{4/9}{1/4} = \\frac{16}{9} \\implies P_{1,\\text{new}} = \\frac{16}{9}P_1$$',
        rubricPoints: [
          {
            id: 'frq2-b1',
            points: 1,
            criterion: 'Finds open-switch $R_{eq} = 2R$ and $P_1 = \\frac{\\varepsilon^2}{4R}$.',
          },
          {
            id: 'frq2-b2',
            points: 1,
            criterion: 'Finds closed-switch $R_{eq} = \\frac{3}{2}R$ and $I_{\\text{closed}} = \\frac{2\\varepsilon}{3R}$.',
          },
          {
            id: 'frq2-b3',
            points: 1,
            criterion: 'Computes $P_{1,\\text{new}} = \\frac{4\\varepsilon^2}{9R}$.',
          },
          {
            id: 'frq2-b4',
            points: 1,
            criterion: 'Correctly expresses final answer purely in terms of $P_1$: $P_{1,\\text{new}} = \\frac{16}{9}P_1$.',
          },
        ],
      },
      {
        label: '(c)',
        prompt:
          'Switch S is reopened. Bulb 3 is now removed and replaced with an initially **uncharged capacitor $C$**. Switch S is closed at $t = 0$.\n(i) Describe the brightness of **Bulb 1** and **Bulb 2** immediately after switch S is closed ($t = 0$), comparing each to its brightness before S was closed.\n(ii) Describe the brightness of **Bulb 1** and **Bulb 2** a very long time after switch S is closed ($t \\to \\infty$), comparing each to its brightness at $t = 0$ and before S was closed.',
        modelSolution:
          '**(i) Immediately after closing S ($t = 0$):**\nAn uncharged capacitor has $\\Delta V_C = Q/C = 0$ and acts like an **ideal conducting wire** (zero resistance). Because $C$ is directly in parallel with Bulb 2, it **shorts out Bulb 2**: $\\Delta V_2 = 0$, so **Bulb 2 goes completely OUT** (dark). Meanwhile, the entire battery emf $\\varepsilon$ drops across Bulb 1 ($R_{eq} = R$), so **Bulb 1 becomes MUCH BRIGHTER** than before S was closed ($P_1(0) = \\varepsilon^2/R = 4P_1$).\n\n**(ii) Very long time later ($t \\to \\infty$, steady state):**\nOnce fully charged ($\\Delta V_C = \\Delta V_2 = \\varepsilon/2$), the capacitor acts like an **open switch** ($I_C = 0$). The circuit behaves identically to when switch S was open! Thus:\n• **Bulb 1 dims** from its $t = 0$ peak back to its original pre-switch brightness ($P_1$).\n• **Bulb 2 brightens** from dark ($t = 0$) back to its original pre-switch brightness ($P_1$), matching Bulb 1.',
        solutionCircuitId: 'frq2-capacitor-replace',
        rubricPoints: [
          {
            id: 'frq2-c1',
            points: 1,
            criterion: 'States that at $t = 0$, the uncharged capacitor has $\\Delta V_C = 0$ (acts as a wire / short circuit across Bulb 2).',
          },
          {
            id: 'frq2-c2',
            points: 1,
            criterion: 'Concludes at $t = 0$: Bulb 2 goes completely OUT (dark) AND Bulb 1 is brighter than before S was closed ($\\Delta V_1 = \\varepsilon$).',
          },
          {
            id: 'frq2-c3',
            points: 1,
            criterion: 'States that at $t \\to \\infty$, the charged capacitor blocks current ($I_C = 0$, acts as an open switch).',
          },
          {
            id: 'frq2-c4',
            points: 1,
            criterion: 'Concludes at $t \\to \\infty$: Bulb 1 dims back to its original (pre-switch) brightness.',
          },
          {
            id: 'frq2-c5',
            points: 1,
            criterion: 'Concludes at $t \\to \\infty$: Bulb 2 brightens from dark back to its original (pre-switch) brightness, equal to Bulb 1.',
          },
        ],
      },
    ],
  },
  {
    id: 'frq-3',
    number: 3,
    title: 'Combination Circuit, Thermal Energy & Steady-State RC Analysis',
    subtitle: 'AP Physics 2 FRQ Style • Quantitative Circuit & Capacitor Energy',
    totalPoints: 10,
    estimatedMinutes: 15,
    tags: ['Combination Circuit', 'Power & Heat', 'Steady-State RC', 'Capacitor Energy'],
    stem: 'An ideal $12.0\\text{ V}$ battery is connected to a $4.0\\,\\Omega$ resistor in series with a parallel combination of a $6.0\\,\\Omega$ resistor and an unknown resistor $R$, as shown below. An ideal ammeter measures the total current leaving the battery to be $2.0\\text{ A}$.',
    circuitId: 'frq3-combo-circuit',
    parts: [
      {
        label: '(a)',
        prompt: 'Calculate the resistance of the unknown resistor $R$.',
        modelSolution:
          'First find the total equivalent resistance from Ohm\'s Law:\n$$R_{eq} = \\frac{\\varepsilon}{I_{\\text{batt}}} = \\frac{12.0\\text{ V}}{2.0\\text{ A}} = 6.0\\,\\Omega$$\nSince the $4.0\\,\\Omega$ resistor is in series with the parallel combination ($R_{\\text{par}}$):\n$$R_{\\text{par}} = R_{eq} - 4.0\\,\\Omega = 6.0 - 4.0 = 2.0\\,\\Omega$$\nUsing the parallel resistor formula:\n$$\\frac{1}{R_{\\text{par}}} = \\frac{1}{6.0\\,\\Omega} + \\frac{1}{R} \\implies \\frac{1}{2.0} - \\frac{1}{6.0} = \\frac{1}{R} \\implies \\frac{2}{6.0} = \\frac{1}{R} \\implies R = 3.0\\,\\Omega$$',
        rubricPoints: [
          {
            id: 'frq3-a1',
            points: 1,
            criterion: 'Calculates $R_{eq} = 12.0 / 2.0 = 6.0\\,\\Omega$ (or finds $\\Delta V_{4\\Omega} = 8.0\\text{ V}$ and $\\Delta V_{\\text{par}} = 4.0\\text{ V}$).',
          },
          {
            id: 'frq3-a2',
            points: 1,
            criterion: 'Finds $R_{\\text{par}} = 2.0\\,\\Omega$ (or finds $I_{6\\Omega} = 4/6 = 0.67\\text{ A}$ and $I_R = 2.0 - 0.67 = 1.33\\text{ A}$).',
          },
          {
            id: 'frq3-a3',
            points: 1,
            criterion: 'Correctly solves $R = 3.0\\,\\Omega$ with units.',
          },
        ],
      },
      {
        label: '(b)',
        prompt:
          'Calculate (i) the electric power $P_R$ dissipated by resistor $R$, and (ii) the total thermal energy (heat) dissipated by resistor $R$ during $1.0\\text{ minute}$ of continuous operation.',
        modelSolution:
          '**(i) Power in $R$:**\nThe voltage drop across the $4.0\\,\\Omega$ resistor is $\\Delta V_{4\\Omega} = (2.0\\text{ A})(4.0\\,\\Omega) = 8.0\\text{ V}$, so the voltage across the parallel section (and across $R$) is:\n$$\\Delta V_R = 12.0\\text{ V} - 8.0\\text{ V} = 4.0\\text{ V}$$\n$$P_R = \\frac{\\Delta V_R^2}{R} = \\frac{(4.0\\text{ V})^2}{3.0\\,\\Omega} = \\frac{16}{3}\\text{ W} \\approx 5.33\\text{ W}$$\n\n**(ii) Thermal energy in $1.0\\text{ minute}$ ($60\\text{ s}$):**\n$$E_R = P_R \\Delta t = \\left(\\frac{16}{3}\\text{ W}\\right)(60\\text{ s}) = 320\\text{ J}$$',
        rubricPoints: [
          {
            id: 'frq3-b1',
            points: 1,
            criterion: 'Correctly determines $\\Delta V_R = 4.0\\text{ V}$ (or $I_R = 4/3\\text{ A}$).',
          },
          {
            id: 'frq3-b2',
            points: 1,
            criterion: 'Calculates $P_R = 5.33\\text{ W}$ (or $\\frac{16}{3}\\text{ W}$).',
          },
          {
            id: 'frq3-b3',
            points: 1,
            criterion: 'Converts $1.0\\text{ min} = 60\\text{ s}$ and calculates $E_R = P_R \\Delta t = 320\\text{ J}$ (consistent with $P_R$).',
          },
        ],
      },
      {
        label: '(c)',
        prompt:
          'Resistor $R$ is now removed and replaced by an uncharged $6.0\\,\\mu\\text{F}$ capacitor. The circuit is allowed to reach **steady state**. Calculate:\n(i) the steady-state current leaving the battery,\n(ii) the steady-state potential difference across the capacitor, and\n(iii) the electric potential energy $U_C$ stored in the capacitor.',
        modelSolution:
          '**(i) Steady-state battery current:**\nAt steady state, the capacitor acts as an open circuit ($I_C = 0$). Current flows solely through the $4.0\\,\\Omega$ and $6.0\\,\\Omega$ resistors in series:\n$$I_{\\infty} = \\frac{12.0\\text{ V}}{4.0\\,\\Omega + 6.0\\,\\Omega} = 1.2\\text{ A}$$\n\n**(ii) Steady-state voltage across the capacitor:**\nBecause the capacitor is in parallel with the $6.0\\,\\Omega$ resistor:\n$$\\Delta V_C = \\Delta V_{6\\Omega} = I_\\infty (6.0\\,\\Omega) = (1.2\\text{ A})(6.0\\,\\Omega) = 7.2\\text{ V}$$\n\n**(iii) Stored energy $U_C$:**\n$$U_C = \\frac{1}{2} C (\\Delta V_C)^2 = \\frac{1}{2}(6.0 \\times 10^{-6}\\text{ F})(7.2\\text{ V})^2 = 1.56 \\times 10^{-4}\\text{ J} = 155.5\\,\\mu\\text{J}$$',
        solutionCircuitId: 'frq3-rc-steady-state',
        rubricPoints: [
          {
            id: 'frq3-c1',
            points: 1,
            criterion: 'Recognizes $I_C = 0$ at steady state and calculates $I_\\infty = \\frac{12.0}{4.0 + 6.0} = 1.2\\text{ A}$.',
          },
          {
            id: 'frq3-c2',
            points: 1,
            criterion: 'Identifies $\\Delta V_C = \\Delta V_{6\\Omega}$ (NOT $12\\text{ V}$!) and calculates $\\Delta V_C = (1.2)(6.0) = 7.2\\text{ V}$.',
          },
          {
            id: 'frq3-c3',
            points: 1,
            criterion: 'Uses $U_C = \\frac{1}{2} C (\\Delta V_C)^2$ with microfarad conversion ($10^{-6}\\text{ F}$).',
          },
          {
            id: 'frq3-c4',
            points: 1,
            criterion: 'Arrives at $U_C = 1.56 \\times 10^{-4}\\text{ J}$ (or $155.5\\,\\mu\\text{J}$) with correct units.',
          },
        ],
      },
    ],
  },
]
