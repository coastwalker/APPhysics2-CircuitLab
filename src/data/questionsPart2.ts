import { MCQQuestion } from '../types'

export const QUESTIONS_PART_2: MCQQuestion[] = [
  // ============================================================
  // MODULE 4: Switches, Closed Loops & Bulb Brightness (6 MCQs)
  // ============================================================
  {
    id: 'm4-q1',
    moduleId: 4,
    questionType: 'single',
    difficulty: 'AP Standard',
    title: 'Multi-Switch Logic Table: Lighting Only One Bulb',
    prompt:
      'In the circuit shown, all three bulbs ($B_1, B_2, B_3$) are identical and the battery is ideal. Refer to the switch configuration table below. Which configuration results in **ONLY ONE bulb** glowing?',
    circuitId: 'm4-multi-switch-table',
    tableData: {
      headers: ['Option', 'Switch $S_1$', 'Switch $S_2$', 'Switch $S_3$'],
      rows: [
        ['A', 'Open', 'Closed', 'Closed'],
        ['B', 'Closed', 'Open', 'Closed'],
        ['C', 'Closed', 'Closed', 'Open'],
        ['D', 'Closed', 'Open', 'Open'],
      ],
    },
    options: [
      {
        id: 'A',
        text: 'Configuration A ($S_1$ Open, $S_2$ Closed, $S_3$ Closed)',
        trapExplanation:
          'AP Trap: Because $S_1$ is in the main battery branch, leaving $S_1$ open breaks EVERY possible loop through the battery—0 bulbs light!',
      },
      {
        id: 'B',
        text: 'Configuration B ($S_1$ Closed, $S_2$ Open, $S_3$ Closed)',
        trapExplanation:
          'AP Trap: With $S_2$ open and $S_1, S_3$ closed, current flows around the entire outer loop through $B_2$, $B_3$, AND $B_1$, lighting ALL THREE bulbs.',
      },
      {
        id: 'C',
        text: 'Configuration C ($S_1$ Closed, $S_2$ Closed, $S_3$ Open)',
        trapExplanation:
          'Correct! Closing $S_1$ and $S_2$ completes a closed loop through the battery, $S_1$, $S_2$, and $B_1$ only. The right branch ($B_2, B_3$) is both open at $S_3$ and shorted by $S_2$, so ONLY $B_1$ glows!',
      },
      {
        id: 'D',
        text: 'Configuration D ($S_1$ Closed, $S_2$ Open, $S_3$ Open)',
        trapExplanation:
          'AP Trap: With both $S_2$ and $S_3$ open, there is no complete return path to $B_1$ and the battery—0 bulbs light!',
      },
    ],
    correctAnswers: ['C'],
    hint: 'Trace a continuous conducting path starting at the $+$ terminal of the battery and returning to the $-$ terminal.',
    solutionSummary:
      'For any bulb to light, $S_1$ must be closed. With $S_1$ and $S_2$ closed and $S_3$ open, current flows exclusively through the left loop containing $B_1$, so only $B_1$ lights.',
  },
  {
    id: 'm4-q2',
    moduleId: 4,
    questionType: 'single',
    difficulty: 'High-Trap',
    title: 'Single-Switch Control Without Shorting the Battery',
    prompt:
      'Initially, switches $S_1, S_2,$ and $S_4$ are **CLOSED**, switch $S_3$ is **OPEN**, and both Bulb X and Bulb Y are glowing. Which single switch action will turn **OFF Bulb X** while keeping **Bulb Y glowing** at the same brightness?',
    circuitId: 'm4-switch-turn-off',
    options: [
      {
        id: 'A',
        text: 'Open switch $S_1$',
        trapExplanation:
          'AP Trap: $S_1$ is in the main trunk connected to the battery. Opening $S_1$ turns off BOTH Bulb X and Bulb Y.',
      },
      {
        id: 'B',
        text: 'Open switch $S_2$',
        trapExplanation:
          'Correct! $S_2$ is strictly in series with Bulb X\'s branch. Opening $S_2$ drops $I_X$ to zero while leaving Bulb Y connected directly across the ideal battery $\\varepsilon$ with unchanged brightness.',
      },
      {
        id: 'C',
        text: 'Close switch $S_3$',
        trapExplanation:
          'AP Trap (Deadly!): Because $S_2$ is closed and has zero resistance, closing $S_3$ creates a zero-resistance DEAD SHORT directly across the ideal battery terminals! That forces $\\Delta V = 0$ across Bulb Y too, turning off BOTH bulbs (and burning out the battery).',
      },
      {
        id: 'D',
        text: 'Open switch $S_4$',
        trapExplanation:
          'AP Trap: Opening $S_4$ turns off Bulb Y instead of Bulb X.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Beware of creating a zero-resistance path directly from the top rail to the bottom rail!',
    solutionSummary:
      'Opening $S_2$ isolates only the Bulb X branch. Closing $S_3$ while $S_2$ is closed would short-circuit the entire top rail to the bottom rail, turning off Bulb Y as well.',
    apTip: 'Whenever you see a switch in parallel with a bulb, check whether there is a series resistor protecting the battery—if not, closing it shorts the whole rail!',
  },
  {
    id: 'm4-q3',
    moduleId: 4,
    questionType: 'single',
    difficulty: 'High-Trap',
    title: 'Closing a Parallel Switch: Battery vs. Branch Current',
    prompt:
      'Three identical light bulbs are connected to an ideal battery as shown, with switch S initially open. When switch S is **CLOSED**, how do the battery current $I_B$ (through Bulb 1) and the current $I_2$ (through Bulb 2) change?',
    circuitId: 'm4-closing-switch-s',
    options: [
      {
        id: 'A',
        text: '$I_B$ increases and $I_2$ increases.',
        trapExplanation:
          'AP Trap: Assuming that because total current $I_B$ increases, every branch gets more current! In fact, the increased voltage drop across Bulb 1 leaves LESS voltage for Bulb 2.',
      },
      {
        id: 'B',
        text: '$I_B$ increases and $I_2$ decreases.',
        trapExplanation:
          'Correct! Closing S adds Bulb 3 in parallel with Bulb 2, decreasing $R_{eq}$ from $2R$ to $\\frac{3}{2}R$. Thus $I_B = \\varepsilon / R_{eq}$ INCREASES (Bulb 1 brightens). Because $\\Delta V_1 = I_B R$ increases, $\\Delta V_2 = \\varepsilon - \\Delta V_1$ DECREASES, so $I_2 = \\Delta V_2 / R$ DECREASES (Bulb 2 dims)!',
      },
      {
        id: 'C',
        text: '$I_B$ increases and $I_2$ remains the same.',
        trapExplanation:
          'AP Trap: $I_2$ would remain the same ONLY if Bulb 2 were connected directly across the ideal battery (with NO Bulb 1 in series). Here Bulb 1 acts like a voltage-dropping series resistor!',
      },
      {
        id: 'D',
        text: '$I_B$ decreases and $I_2$ decreases.',
        trapExplanation:
          'AP Trap: Adding a parallel branch ALWAYS lowers total resistance and INCREASES total battery current.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Follow the chain: Add parallel branch $\\implies R_{eq} \\downarrow \\implies I_B \\uparrow \\implies \\Delta V_1 \\uparrow \\implies \\Delta V_2 = \\varepsilon - \\Delta V_1 \\downarrow$.',
    solutionSummary:
      'With S open, $I_B = I_2 = \\frac{\\varepsilon}{2R}$. With S closed, $R_{eq} = \\frac{3}{2}R$, so $I_B = \\frac{2\\varepsilon}{3R}$ (increases!) and $I_2 = \\frac{1}{2}I_B = \\frac{\\varepsilon}{3R}$ (decreases!).',
    apTip: 'This is arguably the #1 most tested qualitative circuit question on AP Physics 2!',
  },
  {
    id: 'm4-q4',
    moduleId: 4,
    questionType: 'single',
    difficulty: 'AP Standard',
    title: 'Short-Circuiting a Series Bulb',
    prompt:
      'Two identical light bulbs A and B are connected in series to an ideal battery. An ideal wire containing an open switch S is connected in parallel across Bulb B. What happens to the brightness of Bulb A and Bulb B when switch S is closed?',
    circuitId: 'm4-short-bulb',
    options: [
      {
        id: 'A',
        text: 'Bulb A becomes brighter; Bulb B goes completely out.',
        trapExplanation:
          'Correct! Closing S creates a zero-resistance short across Bulb B, forcing $\\Delta V_B = 0$ (so $I_B = 0$, Bulb B goes out). Now Bulb A gets the full battery emf $\\varepsilon$ instead of $\\varepsilon / 2$, quadrupling its power!',
      },
      {
        id: 'B',
        text: 'Bulb A remains the same brightness; Bulb B goes completely out.',
        trapExplanation:
          'AP Trap: Forgetting that removing Bulb B\'s resistance cuts $R_{eq}$ in half ($2R \\to R$), doubling the current through Bulb A!',
      },
      {
        id: 'C',
        text: 'Bulb A becomes brighter; Bulb B becomes dimmer but stays lit.',
        trapExplanation:
          'AP Trap: An ideal closed switch has $R = 0$, so $\\Delta V_B = 0$ identically; zero current flows through Bulb B.',
      },
      {
        id: 'D',
        text: 'Both Bulb A and Bulb B go out because the battery is shorted.',
        trapExplanation:
          'AP Trap: Bulb A is still in series with the battery, so the battery is NOT shorted—current is simply limited by Bulb A ($I = \\varepsilon / R$).',
      },
    ],
    correctAnswers: ['A'],
    hint: 'An ideal closed switch across a component forces the potential difference across that component to be $0\\text{ V}$.',
    solutionSummary:
      'Closing S shorts Bulb B ($\\Delta V_B = 0$, Bulb B goes out) and reduces total resistance from $2R$ to $R$. Bulb A\'s voltage doubles from $\\varepsilon/2$ to $\\varepsilon$, making it much brighter.',
  },
  {
    id: 'm4-q5',
    moduleId: 4,
    questionType: 'single',
    difficulty: 'Core',
    title: 'Brightness Ranking in a Series-Parallel Network',
    prompt:
      'Three identical bulbs $B_1, B_2,$ and $B_3$ are connected to an ideal battery as shown. How do the brightnesses (power dissipated) of the three bulbs compare?',
    circuitId: 'm4-three-bulbs-rank',
    options: [
      {
        id: 'A',
        text: '$B_1 = B_2 = B_3$',
        trapExplanation:
          'AP Trap: Identical bulbs do NOT have equal brightness unless they carry equal current (or have equal voltage). Here $B_1$ carries the sum of $I_2$ and $I_3$.',
      },
      {
        id: 'B',
        text: '$B_1 > B_2 = B_3$, with $P_1 = 4P_2$',
        trapExplanation:
          'Correct! By symmetry and Kirchhoff\'s junction rule, $I_2 = I_3 = \\frac{1}{2}I_1$. Since $P = I^2 R$ and all resistances are equal, $P_1 = I_1^2 R = (2I_2)^2 R = 4P_2 = 4P_3$.',
      },
      {
        id: 'C',
        text: '$B_1 > B_2 = B_3$, with $P_1 = 2P_2$',
        trapExplanation:
          'AP Trap: Forgetting that power scales as $I^2$, not $I$! Twice the current through the same resistance produces FOUR times the power.',
      },
      {
        id: 'D',
        text: '$B_2 = B_3 > B_1$',
        trapExplanation:
          'AP Trap: Parallel bulbs split the current coming out of $B_1$, so each gets half of $I_1$ and must be dimmer than $B_1$.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Relate $I_1$ to $I_2$ using the junction rule, then apply $P = I^2 R$.',
    solutionSummary:
      'All battery current passes through $B_1$ before splitting equally between $B_2$ and $B_3$ ($I_1 = 2I_2 = 2I_3$). Because $P = I^2 R$, $P_1 = 4P_2 = 4P_3$.',
  },
  {
    id: 'm4-q6',
    moduleId: 4,
    questionType: 'single',
    difficulty: 'AP Standard',
    title: 'Opening a Branch Across an Ideal Battery',
    prompt:
      'Two identical light bulbs (Bulb 1 and Bulb 2) are connected in parallel directly across an **ideal** battery $\\varepsilon$, with switch S initially closed. If switch S is opened, what happens to the brightness of Bulb 1 and the total current leaving the battery?',
    circuitId: 'm4-parallel-open-switch',
    options: [
      {
        id: 'A',
        text: 'Bulb 1 becomes brighter; total battery current stays the same.',
        trapExplanation:
          'AP Trap: The classic "constant-current battery" misconception! An ideal battery is a constant-VOLTAGE source, NOT a constant-current source.',
      },
      {
        id: 'B',
        text: 'Bulb 1 stays the same brightness; total battery current decreases.',
        trapExplanation:
          'Correct! Bulb 1 remains connected directly across the ideal battery, so $\\Delta V_1 = \\varepsilon$ is unchanged and $P_1 = \\varepsilon^2 / R$ is unchanged. Because Bulb 2 no longer draws current, total battery current drops in half.',
      },
      {
        id: 'C',
        text: 'Bulb 1 becomes dimmer; total battery current decreases.',
        trapExplanation:
          'AP Trap: Opening a parallel branch does not reduce the voltage across remaining independent branches of an ideal battery.',
      },
      {
        id: 'D',
        text: 'Bulb 1 stays the same brightness; total battery current increases.',
        trapExplanation:
          'AP Trap: Removing a parallel path increases $R_{eq}$ ($R/2 \\to R$), which decreases total current.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Is an ideal battery a constant-voltage source or a constant-current source?',
    solutionSummary:
      'An ideal battery maintains constant $\\Delta V = \\varepsilon$ across each parallel branch independently. Opening S stops current in Bulb 2, leaving Bulb 1 unchanged while halving total battery current.',
  },

  // ============================================================
  // MODULE 5: Kirchhoff's Rules & Potential vs. Position (6 MCQs)
  // ============================================================
  {
    id: 'm5-q1',
    moduleId: 5,
    questionType: 'single',
    difficulty: 'AP Standard',
    title: 'Multi-Junction Current Puzzle',
    prompt:
      'In the circuit section shown, $5.0\\text{ A}$ enters junction P from the left, $1.8\\text{ A}$ leaves P along the top branch, and $0.7\\text{ A}$ flows **from right to left** along the middle branch into P. What are the magnitude of $I_3$ (bottom branch, directed right) and $I_{\\text{out}}$ leaving junction Q?',
    circuitId: 'm5-multi-junction',
    options: [
      {
        id: 'A',
        text: '$I_3 = 2.5\\text{ A}$ and $I_{\\text{out}} = 5.0\\text{ A}$',
        trapExplanation:
          'AP Trap: Subtracted $0.7\\text{ A}$ instead of adding it at junction P! Look closely at the red arrow: $0.7\\text{ A}$ enters P from the right.',
      },
      {
        id: 'B',
        text: '$I_3 = 3.9\\text{ A}$ and $I_{\\text{out}} = 5.0\\text{ A}$',
        trapExplanation:
          'Correct! At junction P: $\\sum I_{in} = \\sum I_{out} \\implies 5.0 + 0.7 = 1.8 + I_3 \\implies I_3 = 3.9\\text{ A}$. At junction Q: $1.8 + 3.9 = 0.7 + I_{\\text{out}} \\implies I_{\\text{out}} = 5.0\\text{ A}$ (also required by overall charge conservation!).',
      },
      {
        id: 'C',
        text: '$I_3 = 3.9\\text{ A}$ and $I_{\\text{out}} = 6.4\\text{ A}$',
        trapExplanation:
          'AP Trap: Violates global conservation of charge! Whatever $5.0\\text{ A}$ enters the entire network on the left must exit on the right.',
      },
      {
        id: 'D',
        text: '$I_3 = 3.2\\text{ A}$ and $I_{\\text{out}} = 4.3\\text{ A}$',
        trapExplanation:
          'AP Trap: Ignored the middle branch at junction P and subtracted it at junction Q.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Apply $\\sum I_{\\text{in}} = \\sum I_{\\text{out}}$ carefully at Node P, checking the direction of EVERY arrow.',
    solutionSummary:
      'At Node P: $5.0\\text{ A} + 0.7\\text{ A} = 1.8\\text{ A} + I_3 \\implies I_3 = 3.9\\text{ A}$. At Node Q: $1.8 + 3.9 = 0.7 + I_{\\text{out}} \\implies I_{\\text{out}} = 5.0\\text{ A}$.',
  },
  {
    id: 'm5-q2',
    moduleId: 5,
    questionType: 'single',
    difficulty: 'High-Trap',
    title: 'Unbalanced Wheatstone Bridge Direction',
    prompt:
      'Five resistors are connected in the bridge circuit shown across an ideal $12\\text{ V}$ battery. Which statement accurately describes the conventional current through the central bridge resistor $R_{\\text{bridge}}$?',
    circuitId: 'm5-wheatstone-bridge',
    options: [
      {
        id: 'A',
        text: 'Zero current flows through $R_{\\text{bridge}}$ because the left and right branches have the same total resistance ($6\\,\\Omega$).',
        trapExplanation:
          'AP Trap: Equal TOTAL branch resistance does NOT mean nodes X and Y are at the same potential! You must check the voltage divider ratio of each branch.',
      },
      {
        id: 'B',
        text: 'Nonzero current flows from **X to Y** (left to right) because node X is at a higher potential than node Y.',
        trapExplanation:
          'Correct! Before bridging, $V_X = 12\\left(\\frac{4}{2+4}\\right) = 8\\text{ V}$ while $V_Y = 12\\left(\\frac{2}{4+2}\\right) = 4\\text{ V}$. Because $V_X > V_Y$, conventional current flows from X to Y.',
      },
      {
        id: 'C',
        text: 'Nonzero current flows from **Y to X** (right to left) because the top-right resistor ($4\\,\\Omega$) is larger than the top-left resistor ($2\\,\\Omega$).',
        trapExplanation:
          'AP Trap: A larger top resistor causes a LARGER voltage drop from the $12\\text{ V}$ rail, leaving node Y at a LOWER potential ($4\\text{ V}$) than node X ($8\\text{ V}$)!',
      },
      {
        id: 'D',
        text: 'The direction cannot be determined without knowing the value of $R_{\\text{bridge}}$.',
        trapExplanation:
          'AP Trap: The magnitude of bridge current depends on $R_{\\text{bridge}}$, but its DIRECTION depends solely on whether $V_X > V_Y$ or $V_Y > V_X$.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Temporarily disconnect $R_{\\text{bridge}}$ and find the electric potential at node X and node Y relative to the negative battery terminal ($0\\text{ V}$).',
    solutionSummary:
      'Setting the bottom rail to $0\\text{ V}$ and top rail to $12\\text{ V}$: the left divider drops $4\\text{ V}$ across $2\\,\\Omega$, placing $V_X = 8\\text{ V}$. The right divider drops $8\\text{ V}$ across $4\\,\\Omega$, placing $V_Y = 4\\text{ V}$. Since $V_X > V_Y$, current flows from X to Y.',
  },
  {
    id: 'm5-q3',
    moduleId: 5,
    questionType: 'single',
    difficulty: 'AP Standard',
    title: 'Identifying Series & Parallel Resistors from a Data Table',
    prompt:
      'A student measures the steady current $I$ and potential difference $\\Delta V$ for four resistors ($R_1, R_2, R_3, R_4$) in a single-battery circuit and records the data below. Based strictly on Kirchhoff\'s rules, which two resistors **must be connected in series with each other**?',
    tableData: {
      headers: ['Resistor', 'Current $I$ (A)', 'Potential Diff. $\\Delta V$ (V)'],
      rows: [
        ['$R_1$', '$2.0$', '$4.0$'],
        ['$R_2$', '$1.2$', '$6.0$'],
        ['$R_3$', '$0.8$', '$2.0$'],
        ['$R_4$', '$0.8$', '$4.0$'],
      ],
    },
    options: [
      {
        id: 'A',
        text: '$R_1$ and $R_4$, because they have the same potential difference ($4.0\\text{ V}$).',
        trapExplanation:
          'AP Trap: Equal potential difference can occur in parallel (or by coincidence), NOT as a requirement for series! Series components MUST have identical current ($I$).',
      },
      {
        id: 'B',
        text: '$R_3$ and $R_4$, because they carry the exact same current ($0.8\\text{ A}$) and their voltage drops sum to $\\Delta V_2 = 6.0\\text{ V}$.',
        trapExplanation:
          'Correct! $R_3$ and $R_4$ both carry $0.8\\text{ A}$, and $\\Delta V_3 + \\Delta V_4 = 2.0 + 4.0 = 6.0\\text{ V} = \\Delta V_2$. Furthermore, $I_2 + I_{34} = 1.2 + 0.8 = 2.0\\text{ A} = I_1$, confirming $(R_3 + R_4) \\parallel R_2$ in series with $R_1$!',
      },
      {
        id: 'C',
        text: '$R_1$ and $R_2$, because $R_1$ and $R_2$ carry the two largest currents.',
        trapExplanation:
          'AP Trap: Resistors in series must carry the EXACT same current, whereas $2.0\\text{ A} \\neq 1.2\\text{ A}$.',
      },
      {
        id: 'D',
        text: '$R_2$ and $R_3$, because their currents sum to $2.0\\text{ A}$.',
        trapExplanation:
          'AP Trap: Currents summing to $I_1$ means those branches are in PARALLEL with each other (meeting at a junction), not in series!',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Check which resistors share identical current $I$ AND verify Kirchhoff\'s loop and junction rules across the table.',
    solutionSummary:
      'Series resistors share identical current ($I_3 = I_4 = 0.8\\text{ A}$). Their combined voltage drop ($2.0 + 4.0 = 6.0\\text{ V}$) matches $\\Delta V_2$, while $I_2 + I_{34} = 2.0\\text{ A} = I_1$, proving $(R_3 \\text{ in series with } R_4)$ is parallel to $R_2$.',
  },
  {
    id: 'm5-q4',
    moduleId: 5,
    questionType: 'single',
    difficulty: 'AP Standard',
    title: 'Symbolic Kirchhoff Loop Rule (Two-Battery Circuit)',
    prompt:
      'In the two-loop circuit shown, currents $I_1$, $I_2$, and $I_3$ are defined in the directions of the arrows. Applying Kirchhoff\'s Loop Rule **clockwise around the ENTIRE OUTER LOOP** (starting from the bottom-left corner), which equation is valid?',
    circuitId: 'm5-two-loop-kirchhoff',
    options: [
      {
        id: 'A',
        text: '$+\\varepsilon_1 - I_1 R_1 - I_3 R_3 - \\varepsilon_2 = 0$',
        trapExplanation:
          'AP Trap: Sign error on $I_3 R_3$! Moving clockwise across the top-right branch goes OPPOSITE to the arrow for $I_3$ (which points left), so potential RISES by $+I_3 R_3$.',
      },
      {
        id: 'B',
        text: '$+\\varepsilon_1 - I_1 R_1 + I_3 R_3 - \\varepsilon_2 = 0$',
        trapExplanation:
          'Correct! Going CW: ($-$ to $+$) across $\\varepsilon_1$ gives $+\\varepsilon_1$; WITH $I_1$ across $R_1$ gives $-I_1 R_1$; AGAINST $I_3$ across $R_3$ gives $+I_3 R_3$; ($+$ to $-$) down across $\\varepsilon_2$ gives $-\\varepsilon_2$.',
      },
      {
        id: 'C',
        text: '$+\\varepsilon_1 - I_1 R_1 + I_3 R_3 + \\varepsilon_2 = 0$',
        trapExplanation:
          'AP Trap: Going clockwise down the right side traverses $\\varepsilon_2$ from its $+$ terminal (top) to its $-$ terminal (bottom), which is a potential DROP ($-\\varepsilon_2$).',
      },
      {
        id: 'D',
        text: '$+\\varepsilon_1 - I_1 R_1 - I_2 R_2 + I_3 R_3 - \\varepsilon_2 = 0$',
        trapExplanation:
          'AP Trap: Included the middle branch ($I_2 R_2$), which is NOT part of the outer perimeter loop!',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Going WITH a resistor current arrow = potential drop ($-IR$). Going AGAINST a resistor current arrow = potential rise ($+IR$). Going $+$ to $-$ across a battery = $-\\varepsilon$.',
    solutionSummary:
      'Tracing clockwise around the outer loop: $+\\varepsilon_1$ (up through battery 1) $- I_1 R_1$ (with $I_1$) $+ I_3 R_3$ (against $I_3$) $- \\varepsilon_2$ (down from $+$ to $-$ through battery 2) $= 0$.',
  },
  {
    id: 'm5-q5',
    moduleId: 5,
    questionType: 'single',
    difficulty: 'AP Standard',
    title: 'Potential vs. Position Graph (Clockwise Traversal)',
    prompt:
      'The circuit contains a $12\\text{ V}$ ideal battery, $R_1 = 2\\,\\Omega$, and $R_2 = 4\\,\\Omega$. The graph shows electric potential $V$ vs. position traced **clockwise** ($A \\to B \\to C \\to D \\to A$) with $V_A = 0\\text{ V}$. If $R_1$ is replaced by a $6\\,\\Omega$ resistor (while $R_2$ stays $4\\,\\Omega$), what will be the new potential at point B and point C?',
    circuitId: 'm5-v-pos-cw',
    graphId: 'm5-v-vs-pos-cw',
    options: [
      {
        id: 'A',
        text: '$V_B = 12\\text{ V}$ and $V_C = 4.8\\text{ V}$',
        trapExplanation:
          'Correct! Total resistance becomes $R_{eq} = 6 + 4 = 10\\,\\Omega$, so $I = 12/10 = 1.2\\text{ A}$. $V_B$ remains $12\\text{ V}$ (ideal battery). Across $R_1$, $\\Delta V_1 = (1.2)(6) = 7.2\\text{ V}$, leaving $V_C = 12 - 7.2 = 4.8\\text{ V}$.',
      },
      {
        id: 'B',
        text: '$V_B = 12\\text{ V}$ and $V_C = 7.2\\text{ V}$',
        trapExplanation:
          'AP Trap: Confused the voltage DROP across $R_1$ ($7.2\\text{ V}$) with the remaining potential at point C ($12 - 7.2 = 4.8\\text{ V}$)!',
      },
      {
        id: 'C',
        text: '$V_B = 12\\text{ V}$ and $V_C = 0\\text{ V}$',
        trapExplanation:
          'AP Trap: Assuming the original current $I = 2\\text{ A}$ stays constant and multiplying $(2\\text{ A})(6\\,\\Omega) = 12\\text{ V}$. Increasing $R_1$ decreases the circuit current!',
      },
      {
        id: 'D',
        text: '$V_B = 8.0\\text{ V}$ and $V_C = 3.2\\text{ V}$',
        trapExplanation:
          'AP Trap: An ideal battery always raises potential from $0\\text{ V}$ to $12\\text{ V}$, regardless of external resistors.',
      },
    ],
    correctAnswers: ['A'],
    hint: 'First recalculate the new current $I\' = \\frac{12\\text{ V}}{6\\,\\Omega + 4\\,\\Omega}$, then find $V_C = V_B - I\' R_1$.',
    solutionSummary:
      'With $R_1 = 6\\,\\Omega$ and $R_2 = 4\\,\\Omega$, $I\' = 12/10 = 1.2\\text{ A}$. $V_B$ stays $12\\text{ V}$, and $V_C = 12 - (1.2)(6) = 4.8\\text{ V}$ (matching $I\' R_2 = (1.2)(4) = 4.8\\text{ V}$).',
  },
  {
    id: 'm5-q6',
    moduleId: 5,
    questionType: 'single',
    difficulty: 'High-Trap',
    title: 'Potential vs. Position Graph (Counterclockwise Traversal)',
    prompt:
      'A student traces the **same** $12\\text{ V}$ circuit ($R_1 = 2\\,\\Omega$, $R_2 = 4\\,\\Omega$) in the **COUNTERCLOCKWISE** direction ($A \\to D \\to C \\to B \\to A$), producing the purple $V$-vs.-position graph shown. Why does the potential **INCREASE** across $R_2$ ($D \\to C$) and $R_1$ ($C \\to B$) on this graph?',
    circuitId: 'm5-v-pos-ccw',
    graphId: 'm5-v-vs-pos-ccw',
    options: [
      {
        id: 'A',
        text: 'Because traversing the loop counterclockwise reverses the direction of current in the circuit.',
        trapExplanation:
          'AP Trap: Your choice of mathematical path NEVER changes the physical current! Current still flows clockwise ($B \\to C \\to D$).',
      },
      {
        id: 'B',
        text: 'Because the counterclockwise path moves **opposite** to the direction of conventional current through $R_2$ and $R_1$, moving from lower potential to higher potential.',
        trapExplanation:
          'Correct! Conventional current flows downhill in potential ($B \\to C \\to D$). Tracing counterclockwise ($D \\to C \\to B$) walks UPHILL against the current: $+8\\text{ V}$ across $R_2$ and $+4\\text{ V}$ across $R_1$, then drops $-12\\text{ V}$ from $+$ to $-$ across the battery.',
      },
      {
        id: 'C',
        text: 'Because $R_2$ and $R_1$ act as energy sources when traced counterclockwise.',
        trapExplanation:
          'AP Trap: Resistors always dissipate energy; a rising $V(x)$ graph simply reflects the direction of the measurement path relative to the current.',
      },
      {
        id: 'D',
        text: 'The graph is physically impossible; potential must always drop across every resistor regardless of path direction.',
        trapExplanation:
          'AP Trap: Potential drops IN THE DIRECTION OF CURRENT. Walking opposite to current MUST show a potential rise!',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Compare the counterclockwise path $D \\to C \\to B$ against the clockwise current arrow $I = 2\\text{ A}$.',
    solutionSummary:
      'Physical current always flows clockwise from high to low potential. Tracing counterclockwise moves opposite to $I$ through $R_2$ ($0 \\to 8\\text{ V}$) and $R_1$ ($8 \\to 12\\text{ V}$), then drops $12 \\to 0\\text{ V}$ from $+$ to $-$ across the battery.',
  },

  // ============================================================
  // MODULE 6: Non-Ideal Batteries & Non-Ideal Meters (6 MCQs)
  // ============================================================
  {
    id: 'm6-q1',
    moduleId: 6,
    questionType: 'single',
    difficulty: 'High-Trap',
    title: 'Terminal Voltage of a Non-Ideal Battery',
    prompt:
      'A real (non-ideal) battery with emf $\\varepsilon$ and internal resistance $r > 0$ is connected to $R_1$ and a parallel branch containing switch S and $R_2$. An ideal voltmeter $V_{\\text{term}}$ is connected across the battery terminals. When switch S is **CLOSED**, what happens to the voltmeter reading $\\Delta V_{\\text{term}}$?',
    circuitId: 'm6-nonideal-battery',
    options: [
      {
        id: 'A',
        text: '$\\Delta V_{\\text{term}}$ remains constant because battery voltage is fixed at $\\varepsilon$.',
        trapExplanation:
          'AP Trap: Only an IDEAL battery ($r = 0$) maintains constant terminal voltage $\\varepsilon$. For a real battery, $\\Delta V_{\\text{term}} = \\varepsilon - Ir$.',
      },
      {
        id: 'B',
        text: '$\\Delta V_{\\text{term}}$ **decreases** because closing S increases the total current $I$, increasing the internal potential drop $Ir$.',
        trapExplanation:
          'Correct! Adding $R_2$ in parallel lowers $R_{\\text{ext}}$, which increases battery current $I = \\varepsilon / (R_{\\text{ext}} + r)$. Therefore $\\Delta V_{\\text{term}} = \\varepsilon - Ir$ DECREASES (and $R_1$ actually dims slightly!).',
      },
      {
        id: 'C',
        text: '$\\Delta V_{\\text{term}}$ **increases** because the battery must supply more power to light two branches.',
        trapExplanation:
          'AP Trap: Higher current causes a LARGER internal voltage drop $Ir$, which subtracts MORE from $\\varepsilon$ and lowers terminal voltage.',
      },
      {
        id: 'D',
        text: '$\\Delta V_{\\text{term}}$ drops immediately to zero.',
        trapExplanation:
          'AP Trap: Terminal voltage drops to zero only if $R_{\\text{ext}} = 0$ (dead short). Here $R_{\\text{ext}} = R_1 \\parallel R_2 > 0$.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Use $\\Delta V_{\\text{term}} = \\varepsilon - Ir$. How does closing switch S affect total current $I$?',
    solutionSummary:
      'Closing S adds a parallel path, lowering external resistance and increasing total current $I$. Since $\\Delta V_{\\text{term}} = \\varepsilon - Ir$, a larger $I$ produces a larger internal drop $Ir$ and a smaller terminal voltage.',
  },
  {
    id: 'm6-q2',
    moduleId: 6,
    questionType: 'single',
    difficulty: 'High-Trap',
    title: 'Ohmic vs. Non-Ohmic $I$-$\\Delta V$ Curve (Incandescent Bulb)',
    prompt:
      'The graph compares current $I$ vs. potential difference $\\Delta V$ for an ohmic resistor and an incandescent light bulb. Which statement about the incandescent bulb is **TRUE**?',
    graphId: 'm6-iv-nonohmic',
    options: [
      {
        id: 'A',
        text: 'The bulb\'s resistance **decreases** as it gets brighter because the slope of the $I$-vs.-$\\Delta V$ curve decreases.',
        trapExplanation:
          'AP Trap (Huge!): On an $I$-vs.-$\\Delta V$ graph, $I / \\Delta V = 1/R$ (reciprocal of resistance!). A DECREASING slope / smaller $I/\\Delta V$ ratio means LARGER resistance $R = \\Delta V / I$!',
      },
      {
        id: 'B',
        text: 'The bulb\'s resistance is **greater when hot/lit** ($R_{\\text{lit}} > R_{\\text{unlit}}$) because the ratio $\\Delta V / I$ increases at higher potential differences.',
        trapExplanation:
          'Correct! As $\\Delta V$ rises, the filament heats up, increasing lattice vibrations and resistivity. On the graph, $I$ grows more slowly than $\\Delta V$, so $R = \\Delta V / I$ increases ($R_{\\text{lit}} > R_{\\text{unlit}}$).',
      },
      {
        id: 'C',
        text: 'The bulb obeys Ohm\'s law at high voltages where the curve flattens out.',
        trapExplanation:
          'AP Trap: Obeying Ohm\'s law requires a constant ratio $\\Delta V / I$ (a straight line passing through the ORIGIN). A flattening curve has rapidly increasing resistance!',
      },
      {
        id: 'D',
        text: 'The resistance of the bulb at any voltage equals the instantaneous tangent slope $\\Delta I / \\Delta V$.',
        trapExplanation:
          'AP Trap: Resistance is defined as the point ratio $R = \\Delta V / I$ (the reciprocal of the secant from the origin), NOT the tangent slope $\\Delta I / \\Delta V$.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Carefully check which variable is on the vertical axis! Here $I$ is vertical and $\\Delta V$ is horizontal, so $R = \\frac{\\Delta V}{I} = \\frac{x}{y}$.',
    solutionSummary:
      'Because $I$ is plotted on the y-axis and $\\Delta V$ on the x-axis, $R = \\Delta V / I$ is the inverse of the secant slope from the origin. As the bulb heats up and the curve bends down, $R$ increases ($R_{\\text{lit}} > R_{\\text{unlit}}$).',
  },
  {
    id: 'm6-q3',
    moduleId: 6,
    questionType: 'single',
    difficulty: 'High-Trap',
    title: 'The Non-Ideal Voltmeter Trap',
    prompt:
      'A student connects an **ideal battery** $\\varepsilon$, an **ideal ammeter** A, and a resistor $R$ in series, and then connects a **NON-IDEAL voltmeter** (with a finite internal resistance $R_V$ comparable to $R$) in parallel across $R$. Compared to using an ideal voltmeter, what happens?',
    circuitId: 'm6-nonideal-voltmeter',
    options: [
      {
        id: 'A',
        text: 'The voltmeter reads the **correct** potential difference across $R$ ($\\varepsilon$), the ammeter reads **higher** than the true current through $R$, and total battery current **increases**.',
        trapExplanation:
          'Correct! Because the battery and ammeter are ideal, the potential difference across $R$ is still $\\varepsilon$—so the voltmeter reads $\\Delta V_R = \\varepsilon$ accurately! However, the finite-$R_V$ voltmeter draws extra parallel current $I_V = \\varepsilon/R_V$, so battery current increases and the ammeter reads $I_A = I_R + I_V > I_R$!',
      },
      {
        id: 'B',
        text: 'The voltmeter reads **lower** than $\\varepsilon$, the ammeter reads the exact current through $R$, and total battery current **decreases**.',
        trapExplanation:
          'AP Trap: With an ideal battery and ideal ammeter, nothing drops voltage before the parallel pair, so $\\Delta V_R$ is still $\\varepsilon$. And adding a parallel path ALWAYS increases battery current.',
      },
      {
        id: 'C',
        text: 'Both meters read too low because the voltmeter steals energy from the resistor.',
        trapExplanation:
          'AP Trap: Parallel branches across an ideal battery do NOT steal voltage from each other; the voltmeter draws ADDITIONAL current from the battery.',
      },
      {
        id: 'D',
        text: 'The calculated resistance $R_{\\text{calc}} = V / I_A$ will be **greater** than the true resistance $R$.',
        trapExplanation:
          'AP Trap: Because $V = \\varepsilon$ is exact while $I_A = I_R + I_V$ is TOO LARGE, $R_{\\text{calc}} = V / I_A$ is actually LESS than $R$ (it equals $R \\parallel R_V < R$).',
      },
    ],
    correctAnswers: ['A'],
    hint: 'Treat the non-ideal voltmeter simply as an extra resistor $R_V$ wired in parallel with $R$. What happens to $R_{eq}$ and $I_{\\text{batt}}$?',
    solutionSummary:
      'A non-ideal voltmeter acts like a parallel resistor $R_V$. With an ideal battery and ideal ammeter, $\\Delta V_R = \\varepsilon$ is unchanged (correct $V$ reading), but $R_{eq} = R \\parallel R_V < R$ causes total battery current and ammeter reading $I_A = I_R + I_V$ to increase above $I_R$.',
    apTip: 'Golden AP Rule: Non-ideal Voltmeter = extra PARALLEL resistor ($R_{eq} \\downarrow, I_{\\text{batt}} \\uparrow$). Non-ideal Ammeter = extra SERIES resistor ($R_{eq} \\uparrow, I_{\\text{batt}} \\downarrow$).',
  },
  {
    id: 'm6-q4',
    moduleId: 6,
    questionType: 'single',
    difficulty: 'High-Trap',
    title: 'The Non-Ideal Ammeter Trap',
    prompt:
      'In the circuit shown, the battery $\\varepsilon$ and voltmeter V are **ideal**, but the ammeter A is **NON-IDEAL** (it has non-negligible internal resistance $R_A > 0$). Compared to an all-ideal circuit, how do the current through $R$, the voltmeter reading $V$, and the ratio $V/I_A$ behave?',
    circuitId: 'm6-nonideal-ammeter',
    options: [
      {
        id: 'A',
        text: 'Current through $R$ decreases, voltmeter reading $V$ decreases below $\\varepsilon$, and the ratio $V/I_A$ still equals the exact resistance $R$.',
        trapExplanation:
          'Correct! The series ammeter raises total resistance to $R + R_A$, decreasing current to $I_A = \\varepsilon / (R + R_A)$. Since the ideal voltmeter is connected strictly across $R$, it reads $V = I_A R < \\varepsilon$, and $V / I_A = (I_A R)/I_A = R$ exactly!',
      },
      {
        id: 'B',
        text: 'Current through $R$ decreases, voltmeter reading $V$ stays at $\\varepsilon$, and $V/I_A$ overestimates $R$.',
        trapExplanation:
          'AP Trap: Look at the voltmeter leads! The voltmeter is across $R$ ONLY, NOT across the battery or ammeter. Because the ammeter drops $I_A R_A$, the voltmeter reads $\\varepsilon - I_A R_A < \\varepsilon$.',
      },
      {
        id: 'C',
        text: 'Current through $R$ increases because the ammeter adds conductance.',
        trapExplanation:
          'AP Trap: An ammeter is wired in SERIES; any nonzero internal resistance $R_A$ increases total resistance and decreases current.',
      },
      {
        id: 'D',
        text: 'Current through $R$ is unchanged, and voltmeter reading $V$ decreases.',
        trapExplanation:
          'AP Trap: Adding series resistance $R_A$ directly reduces the loop current $I = \\varepsilon / (R + R_A)$.',
      },
    ],
    correctAnswers: ['A'],
    hint: 'Treat the non-ideal ammeter as a series resistor $R_A$ before $R$. Check which component(s) the ideal voltmeter spans!',
    solutionSummary:
      'The non-ideal ammeter acts as a series resistor $R_A$, reducing current to $I_A = \\varepsilon / (R + R_A)$ and reducing $\\Delta V_R = I_A R < \\varepsilon$. Because the ideal voltmeter spans only $R$ and draws zero current, $V / I_A = R$ remains exact.',
  },
  {
    id: 'm6-q5',
    moduleId: 6,
    questionType: 'single',
    difficulty: 'High-Trap',
    title: 'Ranking Battery Current: Real Voltmeter vs. Ideal vs. Real Battery',
    prompt:
      'Three circuits each contain the same resistor $R$ and a battery of emf $\\varepsilon$:\n• **Setup 1:** Ideal battery + ideal ammeter + $R$.\n• **Setup 2:** Ideal battery + $R$ with a **non-ideal voltmeter** ($R_V$ finite) across $R$.\n• **Setup 3:** **Non-ideal battery** (internal resistance $r > 0$) + $R$.\n\nRank the **total current leaving the battery** in the three setups from greatest to least.',
    circuitId: 'm6-three-setups-rank',
    options: [
      {
        id: 'A',
        text: '$I_{\\text{ideal}} > I_{\\text{nonideal\\_V}} > I_{\\text{nonideal\\_batt}}$',
        trapExplanation:
          'AP Trap: Thinking ANY non-ideal component must reduce current! A non-ideal voltmeter is in PARALLEL, so it lowers $R_{eq}$ and INCREASES battery current above $I_{\\text{ideal}}$!',
      },
      {
        id: 'B',
        text: '$I_{\\text{nonideal\\_V}} > I_{\\text{ideal}} > I_{\\text{nonideal\\_batt}}$',
        trapExplanation:
          'Correct! Setup 2 has $R_{eq} = R \\parallel R_V < R \\implies I_2 > \\varepsilon/R$. Setup 1 has $I_1 = \\varepsilon/R$. Setup 3 has $R_{eq} = R + r > R \\implies I_3 < \\varepsilon/R$. Therefore $I_{\\text{nonideal\\_V}} > I_{\\text{ideal}} > I_{\\text{nonideal\\_batt}}$.',
      },
      {
        id: 'C',
        text: '$I_{\\text{nonideal\\_batt}} > I_{\\text{ideal}} > I_{\\text{nonideal\\_V}}$',
        trapExplanation:
          'AP Trap: Completely backwards! Internal resistance $r$ is in SERIES (reduces $I$), while voltmeter resistance $R_V$ is in PARALLEL (increases $I$).',
      },
      {
        id: 'D',
        text: '$I_{\\text{nonideal\\_V}} = I_{\\text{ideal}} > I_{\\text{nonideal\\_batt}}$',
        trapExplanation:
          'AP Trap: Only an IDEAL voltmeter ($R_V = \\infty$) draws zero current and keeps $I = I_{\\text{ideal}}$.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Compare the equivalent resistance seen by the emf $\\varepsilon$ in each setup: $R \\parallel R_V$ vs. $R$ vs. $R + r$.',
    solutionSummary:
      'Setup 2 lowers resistance below $R$ (parallel $R_V$), Setup 1 equals $R$, and Setup 3 raises resistance above $R$ (series $r$). Hence $I_{\\text{nonideal\\_V}} > I_{\\text{ideal}} > I_{\\text{nonideal\\_batt}}$.',
  },
  {
    id: 'm6-q6',
    moduleId: 6,
    questionType: 'single',
    difficulty: 'AP Standard',
    title: 'Determining $\\varepsilon$ and Internal Resistance $r$',
    prompt:
      'When an ideal voltmeter is connected across the terminals of a disconnected (open-circuit) real battery, it reads $12.0\\text{ V}$. When a $5.0\\,\\Omega$ resistor is connected across the battery terminals, the voltmeter reading drops to $10.0\\text{ V}$. What are the emf $\\varepsilon$ and internal resistance $r$ of the battery?',
    options: [
      {
        id: 'A',
        text: '$\\varepsilon = 12.0\\text{ V},\\; r = 1.0\\,\\Omega$',
        trapExplanation:
          'Correct! With zero current, $\\Delta V_{\\text{term}} = \\varepsilon = 12.0\\text{ V}$. Under load, $I = \\Delta V_{\\text{term}} / R = 10.0 / 5.0 = 2.0\\text{ A}$. Then $Ir = \\varepsilon - \\Delta V_{\\text{term}} = 2.0\\text{ V} \\implies r = 2.0 / 2.0 = 1.0\\,\\Omega$.',
      },
      {
        id: 'B',
        text: '$\\varepsilon = 10.0\\text{ V},\\; r = 1.0\\,\\Omega$',
        trapExplanation:
          'AP Trap: $10.0\\text{ V}$ is the loaded terminal voltage, not the emf. The emf $\\varepsilon$ is the open-circuit voltage ($12.0\\text{ V}$).',
      },
      {
        id: 'C',
        text: '$\\varepsilon = 12.0\\text{ V},\\; r = 0.83\\,\\Omega$',
        trapExplanation:
          'AP Trap: Computed current using $12.0 / 5.0 = 2.4\\text{ A}$ instead of $10.0 / 5.0 = 2.0\\text{ A}$! Only $10.0\\text{ V}$ is across the $5.0\\,\\Omega$ resistor.',
      },
      {
        id: 'D',
        text: '$\\varepsilon = 12.0\\text{ V},\\; r = 2.0\\,\\Omega$',
        trapExplanation:
          'AP Trap: Confused the internal voltage drop ($Ir = 2.0\\text{ V}$) with the internal resistance $r$.',
      },
    ],
    correctAnswers: ['A'],
    hint: 'Find $I$ across the $5.0\\,\\Omega$ resistor using its actual voltage ($10.0\\text{ V}$), then solve $10.0 = 12.0 - I r$.',
    solutionSummary:
      'Open-circuit reading gives $\\varepsilon = 12.0\\text{ V}$. Loaded current $I = 10.0\\text{ V} / 5.0\\,\\Omega = 2.0\\text{ A}$. From $\\Delta V = \\varepsilon - Ir$, $10.0 = 12.0 - 2.0r \\implies r = 1.0\\,\\Omega$.',
  },
]
