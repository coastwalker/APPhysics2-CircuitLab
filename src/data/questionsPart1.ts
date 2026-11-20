import { MCQQuestion } from '../types'

export const QUESTIONS_PART_1: MCQQuestion[] = [
  // ============================================================
  // MODULE 1: Charge, Current & Microscopic Motion (6 MCQs)
  // ============================================================
  {
    id: 'm1-q1',
    moduleId: 1,
    questionType: 'single',
    difficulty: 'Core',
    title: 'Microscopic Cause of Steady Current',
    prompt:
      'A copper wire is connected across the terminals of an ideal battery, establishing a steady current $I$ in the wire. Which of the following best explains what directly causes the mobile charge carriers throughout the wire to experience a net drift?',
    options: [
      {
        id: 'A',
        text: 'The battery injects new electrons at the negative terminal that physically push neighboring electrons like billiard balls down the wire.',
        trapExplanation:
          'AP Trap: Batteries are charge pumps, not electron reservoirs that "inject" excess net charge to mechanically push electrons. The wire remains electrically neutral overall; electric forces via a field—not contact collisions—drive drift.',
      },
      {
        id: 'B',
        text: 'The battery maintains a potential difference $\\varepsilon$, establishing an electric field $\\vec{E}$ throughout the conducting wire that exerts an electric force on the free charge carriers.',
        trapExplanation:
          'Correct! The potential difference maintained by the battery creates surface charge distributions that produce a nearly uniform electric field $\\vec{E}$ inside the wire, exerting $\\vec{F} = q\\vec{E}$ on conduction electrons everywhere in the loop.',
      },
      {
        id: 'C',
        text: 'A magnetic field created by the battery pulls free electrons from the positive terminal to the negative terminal.',
        trapExplanation:
          'AP Trap: Static batteries do not drive DC current via a magnetic field, and a magnetic force $\\vec{F} = q\\vec{v} \\times \\vec{B}$ does zero work and cannot initiate drift from rest.',
      },
      {
        id: 'D',
        text: 'The temperature difference between the positive and negative terminals causes thermal diffusion of electrons along the wire.',
        trapExplanation:
          'AP Trap: Random thermal motion occurs in all directions equally and produces zero net current without an applied electric field.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Think about what physical field exists inside a current-carrying conductor when a potential difference $\\Delta V$ is maintained across its ends.',
    solutionSummary:
      'In a closed circuit, the battery\'s emf $\\varepsilon$ establishes an electric potential gradient and therefore an electric field $\\vec{E}$ along the wire (propagating near the speed of light). This field exerts an electric force on conduction electrons everywhere in the wire, producing a steady net drift.',
    apTip: 'Inside an electrostatic conductor ($I=0$), $\\vec{E}=0$. Inside a current-carrying conductor ($I \\neq 0$), $\\vec{E} \\neq 0$!',
  },
  {
    id: 'm1-q2',
    moduleId: 1,
    questionType: 'single',
    difficulty: 'Core',
    title: 'Conventional Current vs. Electron Drift',
    prompt:
      'In the metallic wire segment shown below, the left end is maintained at a higher electric potential ($V_+$) than the right end ($V_-$). Which statement correctly describes the directions of the electric field $\\vec{E}$, the conventional current $I$, and the net drift velocity $\\vec{v}_d$ of the free electrons?',
    circuitId: 'm1-wire-field',
    options: [
      {
        id: 'A',
        text: '$\\vec{E}$ points right, conventional current $I$ points right, and electrons drift to the left.',
        trapExplanation:
          'Correct! Electric field $\\vec{E}$ points from higher potential to lower potential (right). Conventional current is defined in the direction positive charges would move (right). Because electrons have negative charge ($q = -e$), $\\vec{F} = -e\\vec{E}$ points left, so electrons drift left.',
      },
      {
        id: 'B',
        text: '$\\vec{E}$ points left, conventional current $I$ points right, and electrons drift to the right.',
        trapExplanation:
          'AP Trap: Electric field always points from high potential ($V_+$) toward low potential ($V_-$), which is to the right here.',
      },
      {
        id: 'C',
        text: '$\\vec{E}$ points right, conventional current $I$ points left, and electrons drift to the left.',
        trapExplanation:
          'AP Trap: Conventional current $I$ ALWAYS points in the same direction as $\\vec{E}$ inside a resistor—opposite to electron drift.',
      },
      {
        id: 'D',
        text: '$\\vec{E}$ points right, conventional current $I$ points right, and electrons also drift to the right.',
        trapExplanation:
          'AP Trap: Electrons carry negative charge, so they experience a force opposite to $\\vec{E}$ and drift toward the higher-potential ($V_+$) end.',
      },
    ],
    correctAnswers: ['A'],
    hint: 'Recall that $\\vec{E}$ points downhill in potential ($V_+ \\to V_-$), conventional current follows positive charge flow, and electrons are negative.',
    solutionSummary:
      'High potential is on the left and low potential is on the right, so $\\vec{E}$ points right. Conventional current $I$ follows $\\vec{E}$ (right), whereas negatively charged electrons experience $\\vec{F} = -e\\vec{E}$ and drift to the left.',
  },
  {
    id: 'm1-q3',
    moduleId: 1,
    questionType: 'single',
    difficulty: 'AP Standard',
    title: 'Zero-Current Microscopic Motion',
    prompt:
      'A copper wire rests on a wooden table at room temperature ($300\\text{ K}$) and is NOT connected to any battery or power supply. Which of the following best describes the motion of the free conduction electrons inside the copper wire?',
    options: [
      {
        id: 'A',
        text: 'The free electrons are completely stationary because the net current in the wire is zero.',
        trapExplanation:
          'AP Trap: Zero net current means zero net DRIFT velocity, NOT zero instantaneous speed! At room temperature, conduction electrons move at huge random thermal speeds (~$10^5\\text{ m/s}$).',
      },
      {
        id: 'B',
        text: 'The free electrons move rapidly in random directions due to thermal energy, with an average net displacement of zero over time.',
        trapExplanation:
          'Correct! With no applied electric field, free electrons undergo rapid, random thermal motion and frequent lattice collisions. Equally many cross any plane left-to-right as right-to-left, so $I = \\Delta Q / \\Delta t = 0$.',
      },
      {
        id: 'C',
        text: 'The free electrons drift slowly around the wire in a closed loop, but their charge is canceled by moving copper ions.',
        trapExplanation:
          'AP Trap: Copper ions are locked in a solid metallic lattice and do not drift around the wire; there is no net drift of electrons either without an emf.',
      },
      {
        id: 'D',
        text: 'All free electrons migrate to the outer surface of the wire and stop moving once electrostatic equilibrium is reached.',
        trapExplanation:
          'AP Trap: Excess charge resides on the surface of a conductor, but a neutral copper wire has conduction electrons distributed uniformly throughout its volume, constantly moving thermally.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Distinguish between instantaneous microscopic thermal speed and macroscopic net drift velocity.',
    solutionSummary:
      'Even when $I = 0$, free electrons possess significant thermal kinetic energy and move randomly at high speeds. Because there is no preferred direction without an electric field, their average velocity (drift velocity) is zero.',
  },
  {
    id: 'm1-q4',
    moduleId: 1,
    questionType: 'single',
    difficulty: 'AP Standard',
    title: 'Interpreting a Cumulative Charge vs. Time Graph',
    prompt:
      'The graph shows the cumulative electric charge $Q$ that has passed a cross-section of a wire as a function of time $t$. What is the maximum instantaneous current during the $6\\text{ s}$ interval, and what is the current during Interval III ($4\\text{ s} < t < 6\\text{ s}$)?',
    graphId: 'm1-q-vs-t',
    options: [
      {
        id: 'A',
        text: 'Maximum current $= 12\\text{ A}$; Interval III current $= 12\\text{ A}$.',
        trapExplanation:
          'AP Trap: Reading the vertical coordinate $Q = 12\\text{ C}$ directly as the current! Current is the SLOPE $I = \\Delta Q / \\Delta t$, not the height $Q$.',
      },
      {
        id: 'B',
        text: 'Maximum current $= 4.0\\text{ A}$; Interval III current $= 0\\text{ A}$.',
        trapExplanation:
          'Correct! Since $I = \\Delta Q / \\Delta t$, Interval I has slope $\\frac{4-0}{2-0} = 2.0\\text{ A}$, Interval II has slope $\\frac{12-4}{4-2} = 4.0\\text{ A}$ (maximum), and Interval III is horizontal so slope $= \\frac{12-12}{6-4} = 0\\text{ A}$.',
      },
      {
        id: 'C',
        text: 'Maximum current $= 3.0\\text{ A}$; Interval III current $= 2.0\\text{ A}$.',
        trapExplanation:
          'AP Trap: Dividing total $Q/t$ at $t=4\\text{ s}$ ($12/4 = 3\\text{ A}$) and $t=6\\text{ s}$ ($12/6 = 2\\text{ A}$) computes average current from $t=0$, NOT the instantaneous slope in each interval.',
      },
      {
        id: 'D',
        text: 'Maximum current $= 4.0\\text{ A}$; Interval III current $= 6.0\\text{ A}$.',
        trapExplanation:
          'AP Trap: A flat horizontal segment on a $Q$-vs-$t$ graph means no additional charge is passing the cross-section, so $I = 0$.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Recall the definition of current: $I = \\frac{\\Delta Q}{\\Delta t}$. On a $Q$-vs-$t$ graph, that is the slope of the line.',
    solutionSummary:
      'Current equals the slope of the $Q$-vs-$t$ graph: $I_I = 4/2 = 2.0\\text{ A}$, $I_{II} = (12 - 4)/(4 - 2) = 4.0\\text{ A}$, and $I_{III} = (12 - 12)/(6 - 4) = 0\\text{ A}$.',
  },
  {
    id: 'm1-q5',
    moduleId: 1,
    questionType: 'single',
    difficulty: 'Core',
    title: 'Counting Conduction Electrons',
    prompt:
      'A steady current of $3.2\\text{ A}$ flows through a tungsten filament for $5.0\\text{ s}$. Approximately how many electrons pass through a cross-section of the filament during this time? ($e = 1.6 \\times 10^{-19}\\text{ C}$)',
    options: [
      {
        id: 'A',
        text: '$2.0 \\times 10^{19}$ electrons',
        trapExplanation:
          'AP Trap: Forgot to multiply by $\\Delta t = 5.0\\text{ s}$! That gives the number of electrons per second ($3.2 / e$), not the total in $5.0\\text{ s}$.',
      },
      {
        id: 'B',
        text: '$4.0 \\times 10^{18}$ electrons',
        trapExplanation:
          'AP Trap: Divided current by time ($3.2 / 5.0$) instead of multiplying $Q = I \\Delta t$.',
      },
      {
        id: 'C',
        text: '$1.0 \\times 10^{20}$ electrons',
        trapExplanation:
          'Correct! Total charge $Q = I \\Delta t = (3.2\\text{ A})(5.0\\text{ s}) = 16\\text{ C}$. Then $N = Q / e = 16 / (1.6 \\times 10^{-19}) = 1.0 \\times 10^{20}$ electrons.',
      },
      {
        id: 'D',
        text: '$2.6 \\times 10^{-18}$ electrons',
        trapExplanation:
          'AP Trap: Multiplied $Q$ by $e$ instead of dividing $N = Q / e$. The number of electrons must be a huge integer!',
      },
    ],
    correctAnswers: ['C'],
    hint: 'First compute total charge $Q = I\\Delta t$, then divide by the elementary charge $e = 1.6 \\times 10^{-19}\\text{ C}$.',
    solutionSummary:
      'Total charge $Q = I\\Delta t = (3.2)(5.0) = 16\\text{ C}$. Dividing by $e = 1.6 \\times 10^{-19}\\text{ C}$ gives $N = 1.0 \\times 10^{20}$ electrons.',
  },
  {
    id: 'm1-q6',
    moduleId: 1,
    questionType: 'single',
    difficulty: 'High-Trap',
    title: 'Conservation of Charge in a Variable-Area Wire',
    prompt:
      'A steady DC current passes through a copper wire consisting of wide Section X (cross-sectional area $2A$) joined directly in series to narrow Section Y (cross-sectional area $A$). How do the currents $I_X, I_Y$ and electron drift speeds $v_{d,X}, v_{d,Y}$ compare?',
    circuitId: 'm1-varying-wire',
    options: [
      {
        id: 'A',
        text: '$I_X = I_Y$ and $v_{d,X} = v_{d,Y}$',
        trapExplanation:
          'AP Trap: While $I_X = I_Y$ is true by charge conservation, the same charge per second passing through half the cross-sectional area requires electrons to drift twice as fast in Section Y.',
      },
      {
        id: 'B',
        text: '$I_X = I_Y$ and $v_{d,Y} = 2v_{d,X}$',
        trapExplanation:
          'Correct! Because charge cannot pile up at the junction in steady state, $I_X = I_Y$. From $I = n e A v_d$ (same material $\\implies$ same carrier density $n$), halving $A$ doubles the drift speed: $v_{d,Y} = 2v_{d,X}$.',
      },
      {
        id: 'C',
        text: '$I_X = 2I_Y$ and $v_{d,X} = v_{d,Y}$',
        trapExplanation:
          'AP Trap: Violates conservation of charge! If more charge entered Section X per second than left Section Y, charge would accumulate indefinitely at the boundary.',
      },
      {
        id: 'D',
        text: '$I_Y = 2I_X$ and $v_{d,Y} = 2v_{d,X}$',
        trapExplanation:
          'AP Trap: Current is the rate of charge flow (like volume flow rate in a pipe), which stays constant along a single unbranched wire.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Think of the continuity equation for fluids ($A_1 v_1 = A_2 v_2$): in steady state, charge flow rate $I$ cannot change along a single unbranched path.',
    solutionSummary:
      'By conservation of charge in steady state, $I_X = I_Y$. Since $I = n q A v_d$ and both segments are copper (same $n$), reducing area from $2A$ to $A$ doubles the drift speed in Section Y.',
  },

  // ============================================================
  // MODULE 2: Resistivity & Graph Linearization (6 MCQs)
  // ============================================================
  {
    id: 'm2-q1',
    moduleId: 2,
    questionType: 'single',
    difficulty: 'AP Standard',
    title: 'Scaling Resistance: Halving Both Radius and Length',
    prompt:
      'Cylindrical Wire 1 has length $L$, radius $r$, and electrical resistance $R$. Cylindrical Wire 2 is made of the same metal (identical resistivity $\\rho$), but has length $L/2$ and radius $r/2$. What is the resistance $R\'$ of Wire 2 in terms of $R$?',
    circuitId: 'm2-cylinders',
    options: [
      {
        id: 'A',
        text: '$R\' = R$',
        trapExplanation:
          'AP Trap: Assuming area scales linearly with radius ($A \\propto r$) instead of quadratically ($A = \\pi r^2$). Halving $r$ cuts $A$ to $1/4$, not $1/2$!',
      },
      {
        id: 'B',
        text: '$R\' = \\frac{1}{2}R$',
        trapExplanation:
          'AP Trap: Only accounting for halving the length while ignoring the change in cross-sectional area.',
      },
      {
        id: 'C',
        text: '$R\' = 2R$',
        trapExplanation:
          'Correct! $R\' = \\frac{\\rho (L/2)}{\\pi (r/2)^2} = \\frac{\\frac{1}{2}}{\\frac{1}{4}} \\cdot \\frac{\\rho L}{\\pi r^2} = 2R$.',
      },
      {
        id: 'D',
        text: '$R\' = 4R$',
        trapExplanation:
          'AP Trap: Accounted for $A\' = A/4$ (factor of $4$) but forgot that the length was also halved (factor of $1/2$).',
      },
    ],
    correctAnswers: ['C'],
    hint: 'Write $R = \\frac{\\rho L}{\\pi r^2}$ and substitute $L \\to L/2$ and $r \\to r/2$ carefully.',
    solutionSummary:
      'Because $A = \\pi r^2$, halving the radius reduces the cross-sectional area by a factor of $4$. Combined with halving the length, $R\' = \\frac{1/2}{1/4}R = 2R$.',
  },
  {
    id: 'm2-q2',
    moduleId: 2,
    questionType: 'single',
    difficulty: 'AP Standard',
    title: 'Doubling Diameter and Quadrupling Length',
    prompt:
      'A uniform cylindrical resistor made of nichrome has diameter $d$, length $L$, and resistance $R_0$. A second nichrome cylinder has diameter $2d$ and length $4L$. What is the resistance of the second cylinder?',
    options: [
      {
        id: 'A',
        text: '$\\frac{1}{2}R_0$',
        trapExplanation:
          'AP Trap: Confusing diameter and area scaling or inverting the ratio.',
      },
      {
        id: 'B',
        text: '$R_0$',
        trapExplanation:
          'Correct! Doubling diameter $d \\to 2d$ quadruples the area $A = \\frac{\\pi d^2}{4} \\to 4A$. Quadrupling length $L \\to 4L$ cancels the $4A$ exactly: $R\' = \\frac{\\rho(4L)}{4A} = R_0$.',
      },
      {
        id: 'C',
        text: '$2R_0$',
        trapExplanation:
          'AP Trap: Treating $A \\propto d$ instead of $A \\propto d^2$, which gives $4/2 = 2R_0$.',
      },
      {
        id: 'D',
        text: '$16R_0$',
        trapExplanation:
          'AP Trap: Multiplying $L$ and $A$ instead of dividing $L/A$.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Since $A = \\frac{\\pi}{4}d^2$, how does doubling $d$ change the cross-sectional area $A$?',
    solutionSummary:
      'Doubling diameter increases cross-sectional area by $2^2 = 4$. Quadrupling length increases the numerator by $4$. The two factors of $4$ cancel, leaving resistance unchanged at $R_0$.',
  },
  {
    id: 'm2-q3',
    moduleId: 2,
    questionType: 'single',
    difficulty: 'High-Trap',
    title: 'Unlabeled Axis Graph: Two Sets of Cylinders (Same Material)',
    prompt:
      'A student measures the resistance $R$ of two sets of cylindrical wires (Set A and Set B) made of the **same metal** (identical resistivity $\\rho$). Each set consists of cylinders of a fixed cross-sectional area but varying lengths. The student plots $R$ versus an unlabeled horizontal axis (Quantity X) and obtains the two straight lines shown. Which of the following correctly identifies Quantity X and compares the cross-sectional areas $A_A$ and $A_B$?',
    graphId: 'm2-r-vs-unlabeled-l',
    options: [
      {
        id: 'A',
        text: 'Quantity X is length $L$, and $A_A > A_B$.',
        trapExplanation:
          'AP Trap: Classic slope inversion error! Since $R = (\\rho / A)L$, the slope is $\\rho / A$, which is INVERSELY proportional to area $A$. A steeper slope means a SMALLER area!',
      },
      {
        id: 'B',
        text: 'Quantity X is length $L$, and $A_A < A_B$.',
        trapExplanation:
          'Correct! Since length varies and $R \\propto L$ linearly, Quantity X is $L$. The slope equals $\\rho / A$. Because Set A has a steeper slope and $\\rho$ is the same, $1/A_A > 1/A_B \\implies A_A < A_B$.',
      },
      {
        id: 'C',
        text: 'Quantity X is cross-sectional area $A$, and $L_A > L_B$.',
        trapExplanation:
          'AP Trap: Plotting $R$ vs. $A$ produces a hyperbola ($R \\propto 1/A$), NOT a straight line through the origin.',
      },
      {
        id: 'D',
        text: 'Quantity X is $1/L$, and $A_A < A_B$.',
        trapExplanation:
          'AP Trap: $R$ is directly proportional to $L$, so $R$ vs. $1/L$ would be curved (inverse), not linear.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Write $R = \\left(\\frac{\\rho}{A}\\right)L$ in $y = mx$ form. Compare the slope $m = \\rho / A$ of Set A and Set B.',
    solutionSummary:
      'Because $R$ varies linearly with $L$ for fixed $\\rho$ and $A$, the horizontal axis must be $L$. The slope is $m = \\rho / A$. Set A has the steeper slope, so with equal $\\rho$, Set A must have the smaller cross-sectional area ($A_A < A_B$).',
    apTip: 'On AP Physics 2 graph questions, ALWAYS write $y = m \\cdot x$ explicitly and circle the algebraic expression for the slope $m$!',
  },
  {
    id: 'm2-q4',
    moduleId: 2,
    questionType: 'single',
    difficulty: 'High-Trap',
    title: 'Unlabeled Axis Graph: Fixed Length, Varying Diameter',
    prompt:
      'In a second lab, two sets of cylinders (Set A made of Alloy A, Set B made of Alloy B) all have the **same fixed length $L$**, while their cross-sectional areas $A$ are varied. The student plots $R$ versus an unlabeled horizontal Quantity Z and obtains the linear graph shown. What is Quantity Z, and how do resistivities $\\rho_A$ and $\\rho_B$ compare?',
    graphId: 'm2-r-vs-unlabeled-inv-a',
    options: [
      {
        id: 'A',
        text: 'Quantity Z is $A$, and $\\rho_A > \\rho_B$.',
        trapExplanation:
          'AP Trap: $R$ is inversely proportional to $A$, so $R$ vs. $A$ cannot be a straight line through the origin.',
      },
      {
        id: 'B',
        text: 'Quantity Z is $1/A$, and $\\rho_A > \\rho_B$.',
        trapExplanation:
          'Correct! Writing $R = (\\rho L)\\left(\\frac{1}{A}\\right)$ yields a straight line through the origin when plotting $R$ vs. $1/A$. The slope is $\\rho L$. Since $L$ is identical and Set A has a steeper slope, $\\rho_A > \\rho_B$.',
      },
      {
        id: 'C',
        text: 'Quantity Z is $1/A$, and $\\rho_A < \\rho_B$.',
        trapExplanation:
          'AP Trap: Inverted the slope relationship! Here $\\rho$ is in the numerator of the slope ($m = \\rho L$), so steeper slope means larger resistivity.',
      },
      {
        id: 'D',
        text: 'Quantity Z is radius $r$, and $\\rho_A > \\rho_B$.',
        trapExplanation:
          'AP Trap: $R \\propto 1/r^2$, so $R$ vs. $r$ is a decreasing curve, not an increasing straight line.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'If $L$ is constant and $A$ varies, what function of $A$ must go on the x-axis to linearize $R = \\frac{\\rho L}{A}$?',
    solutionSummary:
      'Linearizing $R = \\rho L (1/A)$ puts $1/A$ on the horizontal axis with slope $m = \\rho L$. Because both sets share the same $L$, Set A\'s steeper slope directly implies $\\rho_A > \\rho_B$.',
  },
  {
    id: 'm2-q5',
    moduleId: 2,
    questionType: 'single',
    difficulty: 'Core',
    title: 'Direct Slope Linearization for Resistivity',
    prompt:
      'A student measures resistance $R$, length $L$, and cross-sectional area $A$ for several wires of the same unknown metal. Which pair of quantities should the student plot on the vertical and horizontal axes so that the **slope of the best-fit line directly equals the resistivity $\\rho$**?',
    options: [
      {
        id: 'A',
        text: 'Vertical axis: $R$; Horizontal axis: $L/A$',
        trapExplanation:
          'Correct! Since $R = \\rho (L/A)$, plotting $y = R$ versus $x = L/A$ gives a line through the origin whose slope is exactly $m = \\rho$.',
      },
      {
        id: 'B',
        text: 'Vertical axis: $R$; Horizontal axis: $A/L$',
        trapExplanation:
          'AP Trap: $R$ is inversely proportional to $A/L$, so this plot would be a curve rather than a straight line.',
      },
      {
        id: 'C',
        text: 'Vertical axis: $RA$; Horizontal axis: $1/L$',
        trapExplanation:
          'AP Trap: Since $RA = \\rho L$, plotting $RA$ vs. $1/L$ is non-linear. (Plotting $RA$ vs. $L$ WOULD work!)',
      },
      {
        id: 'D',
        text: 'Vertical axis: $L/A$; Horizontal axis: $R$',
        trapExplanation:
          'AP Trap: Reversing the axes makes the slope equal to $1/\\rho$ (the conductivity), not $\\rho$.',
      },
    ],
    correctAnswers: ['A'],
    hint: 'Rearrange $R = \\rho \\frac{L}{A}$ into $y = \\rho \\cdot x$.',
    solutionSummary:
      'Matching $R = \\rho (L/A)$ to $y = mx$ shows that plotting $R$ on the vertical axis and $L/A$ on the horizontal axis produces a slope equal to $\\rho$.',
  },
  {
    id: 'm2-q6',
    moduleId: 2,
    questionType: 'single',
    difficulty: 'High-Trap',
    title: 'Stretching a Wire at Constant Volume',
    prompt:
      'A uniform copper wire of resistance $R$ is pulled through a die so that it stretches uniformly to **twice its original length** ($L\' = 2L$) without losing any copper (constant volume $V = AL$). What is the new resistance of the wire?',
    options: [
      {
        id: 'A',
        text: '$2R$',
        trapExplanation:
          'AP Trap: Assuming area stays constant when a wire is stretched! Because volume $V = AL$ is conserved, doubling $L$ automatically halves $A$.',
      },
      {
        id: 'B',
        text: '$4R$',
        trapExplanation:
          'Correct! Constant volume $A\'L\' = AL$ with $L\' = 2L$ forces $A\' = A/2$. Therefore $R\' = \\frac{\\rho(2L)}{A/2} = 4R$.',
      },
      {
        id: 'C',
        text: '$8R$',
        trapExplanation:
          'AP Trap: Incorrectly thinking $A\' = A/4$ (confusing area with radius—radius drops by $\\sqrt{2}$, so area drops by $2$).',
      },
      {
        id: 'D',
        text: '$\\frac{1}{2}R$',
        trapExplanation:
          'AP Trap: Stretching makes a wire both longer and thinner, which MUST increase resistance.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Volume $V = A \\cdot L$ is fixed. If $L$ doubles, what must happen to $A$?',
    solutionSummary:
      'Since $V = AL$ is constant, doubling $L$ cuts cross-sectional area $A$ in half. Substituting $L\'=2L$ and $A\'=A/2$ into $R = \\rho L / A$ yields $R\' = 4R$.',
  },

  // ============================================================
  // MODULE 3: Equivalent Resistance & Capacitance (6 MCQs)
  // ============================================================
  {
    id: 'm3-q1',
    moduleId: 3,
    questionType: 'single',
    difficulty: 'Core',
    title: 'Purely Symbolic Equivalent Resistance',
    prompt:
      'Three resistors $R_1$, $R_2$, and $R_3$ are connected between terminals X and Y as shown. Which purely symbolic expression gives the equivalent resistance $R_{eq}$ between X and Y?',
    circuitId: 'm3-symbolic-resistors',
    options: [
      {
        id: 'A',
        text: '$R_1 + \\left(\\frac{1}{R_2} + \\frac{1}{R_3}\\right)^{-1}$',
        trapExplanation:
          'Correct! $R_2$ and $R_3$ are in parallel, giving $R_{23} = \\left(\\frac{1}{R_2} + \\frac{1}{R_3}\\right)^{-1}$. That pair is in series with $R_1$, so we add $R_1$.',
      },
      {
        id: 'B',
        text: '$\\left(\\frac{1}{R_1} + \\frac{1}{R_2 + R_3}\\right)^{-1}$',
        trapExplanation:
          'AP Trap: That expression is for $R_1$ in parallel with a series pair $(R_2 + R_3)$—the exact dual of this circuit.',
      },
      {
        id: 'C',
        text: '$R_1 + \\frac{1}{R_2} + \\frac{1}{R_3}$',
        trapExplanation:
          'AP Trap: Forgot to take the reciprocal! $\\frac{1}{R_2} + \\frac{1}{R_3}$ has units of $\\Omega^{-1}$, so it cannot even be added to $R_1$ ($\\Omega$).',
      },
      {
        id: 'D',
        text: '$\\left(\\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3}\\right)^{-1}$',
        trapExplanation:
          'AP Trap: That assumes all three resistors are in parallel, ignoring that $R_1$ carries the entire current.',
      },
    ],
    correctAnswers: ['A'],
    hint: 'Combine the parallel pair $R_2$ and $R_3$ first, then add the series resistor $R_1$. Check dimensions!',
    solutionSummary:
      'Resistors $R_2$ and $R_3$ share the same two nodes (parallel), giving $R_{23} = (1/R_2 + 1/R_3)^{-1}$. Adding $R_1$ in series yields $R_{eq} = R_1 + (1/R_2 + 1/R_3)^{-1}$.',
  },
  {
    id: 'm3-q2',
    moduleId: 3,
    questionType: 'single',
    difficulty: 'AP Standard',
    title: 'Purely Symbolic Equivalent Capacitance',
    prompt:
      'Three capacitors $C_1$, $C_2$, and $C_3$ are connected between terminals A and B as shown. Which purely symbolic expression correctly gives the equivalent capacitance $C_{eq}$ between A and B?',
    circuitId: 'm3-symbolic-capacitors',
    options: [
      {
        id: 'A',
        text: '$\\left(\\frac{1}{C_1} + \\frac{1}{C_2 + C_3}\\right)^{-1}$',
        trapExplanation:
          'AP Trap: Applied resistor combination rules to capacitors! Remember: capacitors add directly in PARALLEL and add reciprocally in SERIES.',
      },
      {
        id: 'B',
        text: '$C_1 + \\left(\\frac{1}{C_2} + \\frac{1}{C_3}\\right)^{-1}$',
        trapExplanation:
          'Correct! $C_2$ and $C_3$ are in SERIES, so $C_{23} = \\left(\\frac{1}{C_2} + \\frac{1}{C_3}\\right)^{-1}$. That series branch is in PARALLEL with $C_1$, so their capacitances add directly: $C_{eq} = C_1 + C_{23}$.',
      },
      {
        id: 'C',
        text: '$C_1 + C_2 + C_3$',
        trapExplanation:
          'AP Trap: $C_2$ and $C_3$ are in series with each other, not in parallel.',
      },
      {
        id: 'D',
        text: '$\\left(\\frac{1}{C_1} + \\frac{1}{C_2} + \\frac{1}{C_3}\\right)^{-1}$',
        trapExplanation:
          'AP Trap: That would apply only if all three capacitors were in a single series chain.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Capacitor rules are the opposite of resistor rules: series combines reciprocally, parallel adds directly.',
    solutionSummary:
      'The bottom branch has $C_2$ and $C_3$ in series: $C_{23} = (1/C_2 + 1/C_3)^{-1}$. Because the top branch ($C_1$) is in parallel with the bottom branch, $C_{eq} = C_1 + (1/C_2 + 1/C_3)^{-1}$.',
  },
  {
    id: 'm3-q3',
    moduleId: 3,
    questionType: 'single',
    difficulty: 'AP Standard',
    title: 'Capacitor Set Ratio ($C_{eq,B} : C_{eq,A}$)',
    prompt:
      'Each capacitor in Set A and Set B has identical capacitance $C$. What is the ratio of the equivalent capacitance of Set B to the equivalent capacitance of Set A, $C_{eq,B} : C_{eq,A}$?',
    circuitId: 'm3-cap-sets-ab',
    options: [
      {
        id: 'A',
        text: '$1 : 2$',
        trapExplanation:
          'AP Trap: Inverted the ratio ($C_{eq,A} : C_{eq,B}$ instead of $C_{eq,B} : C_{eq,A}$), or used resistor rules where Set A would be $3R$ and Set B would be $1.5R$.',
      },
      {
        id: 'B',
        text: '$2 : 1$',
        trapExplanation:
          'Correct! Set A (3 in series): $C_{eq,A} = C/3$. Set B ($C$ in series with parallel $2C$): $C_{eq,B} = \\left(\\frac{1}{C} + \\frac{1}{2C}\\right)^{-1} = \\frac{2}{3}C$. Thus $C_{eq,B} / C_{eq,A} = \\frac{2/3}{1/3} = 2 : 1$.',
      },
      {
        id: 'C',
        text: '$3 : 2$',
        trapExplanation:
          'AP Trap: Miscomputed Set B by adding $C + C/2 = \\frac{3}{2}C$ (mixing resistor and capacitor rules).',
      },
      {
        id: 'D',
        text: '$9 : 2$',
        trapExplanation:
          'AP Trap: Computed Set B as $\\frac{3}{2}C$ and divided by $C/3$. Remember: two parallel capacitors give $2C$, and putting that in series with $C$ gives $\\frac{2}{3}C$, which is LESS than $C$!',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Compute $C_{eq,A}$ (3 in series) and $C_{eq,B}$ ($C$ in series with $2C$) carefully—remember that series capacitance is always smaller than any individual capacitor in the series.',
    solutionSummary:
      'For Set A, $C_{eq,A} = C/3$. For Set B, the parallel pair is $2C$, in series with $C$: $C_{eq,B} = \\frac{C(2C)}{C+2C} = \\frac{2}{3}C$. Therefore $C_{eq,B} : C_{eq,A} = 2 : 1$.',
  },
  {
    id: 'm3-q4',
    moduleId: 3,
    questionType: 'single',
    difficulty: 'AP Standard',
    title: 'Numberless Ranking of Identical-Resistor Networks',
    prompt:
      'Four networks are built from three identical resistors of resistance $R$. Each network is connected separately across the same ideal battery of emf $\\varepsilon$. Rank the networks from **GREATEST to LEAST total current drawn from the battery**.',
    circuitId: 'm3-resistor-networks-rank',
    options: [
      {
        id: 'A',
        text: '$I_{\\text{I}} > I_{\\text{II}} > I_{\\text{III}} > I_{\\text{IV}}$',
        trapExplanation:
          'AP Trap: That is the ranking of equivalent RESISTANCE ($3R > \\frac{3}{2}R > \\frac{2}{3}R > \\frac{1}{3}R$), not current! Current is inversely proportional to $R_{eq}$.',
      },
      {
        id: 'B',
        text: '$I_{\\text{IV}} > I_{\\text{III}} > I_{\\text{II}} > I_{\\text{I}}$',
        trapExplanation:
          'Correct! Equivalent resistances are $R_{\\text{I}} = 3R$, $R_{\\text{II}} = 1.5R$, $R_{\\text{III}} = \\frac{2}{3}R$, and $R_{\\text{IV}} = \\frac{1}{3}R$. Since $I = \\varepsilon / R_{eq}$, smaller $R_{eq}$ yields larger current: $\\text{IV} > \\text{III} > \\text{II} > \\text{I}$.',
      },
      {
        id: 'C',
        text: '$I_{\\text{IV}} > I_{\\text{II}} > I_{\\text{III}} > I_{\\text{I}}$',
        trapExplanation:
          'AP Trap: Confused Network II ($R + R/2 = 1.5R$) with Network III ($2R \\parallel R = \\frac{2}{3}R$). Network III has a direct single-$R$ branch across the battery, so its $R_{eq}$ MUST be less than $R$!',
      },
      {
        id: 'D',
        text: '$I_{\\text{IV}} > I_{\\text{II}} = I_{\\text{III}} > I_{\\text{I}}$',
        trapExplanation:
          'AP Trap: Assuming any mix of 1 series + 2 parallel gives the same $R_{eq}$. In Network II $R_{eq} = 1.5R > R$, while in Network III $R_{eq} = \\frac{2}{3}R < R$.',
      },
    ],
    correctAnswers: ['B'],
    hint: 'Use the AP shortcut: $R_{\\text{I}} > R$, $R_{\\text{II}} > R$, while $R_{\\text{III}} < R$ and $R_{\\text{IV}} < R$. Then remember $I = \\varepsilon / R_{eq}$.',
    solutionSummary:
      'Computing each network: $R_{\\text{I}} = 3R$, $R_{\\text{II}} = \\frac{3}{2}R$, $R_{\\text{III}} = \\frac{2}{3}R$, and $R_{\\text{IV}} = \\frac{1}{3}R$. Because $I = \\varepsilon / R_{eq}$, battery current ranks $\\text{IV} > \\text{III} > \\text{II} > \\text{I}$.',
  },
  {
    id: 'm3-q5',
    moduleId: 3,
    questionType: 'single',
    difficulty: 'AP Standard',
    title: 'Four-Resistor Symbolic Combination',
    prompt:
      'Which symbolic expression gives the equivalent resistance between terminals A and B for the four-resistor network shown?',
    circuitId: 'm3-four-resistors',
    options: [
      {
        id: 'A',
        text: '$R_1 + \\left(\\frac{1}{R_2 + R_3} + \\frac{1}{R_4}\\right)^{-1}$',
        trapExplanation:
          'Correct! $R_2$ and $R_3$ are in series ($R_2 + R_3$), that branch is in parallel with $R_4$, and the entire parallel block is in series with $R_1$.',
      },
      {
        id: 'B',
        text: '$R_1 + \\left(\\frac{1}{R_2} + \\frac{1}{R_3} + \\frac{1}{R_4}\\right)^{-1}$',
        trapExplanation:
          'AP Trap: Treated $R_2$ and $R_3$ as parallel instead of in series on the upper branch.',
      },
      {
        id: 'C',
        text: '$\\left(\\frac{1}{R_1 + R_2 + R_3} + \\frac{1}{R_4}\\right)^{-1}$',
        trapExplanation:
          'AP Trap: Included $R_1$ inside the upper branch, ignoring that $R_1$ is outside the junction and in series with the entire parallel section.',
      },
      {
        id: 'D',
        text: '$R_1 + R_4 + \\left(\\frac{1}{R_2} + \\frac{1}{R_3}\\right)^{-1}$',
        trapExplanation:
          'AP Trap: Put $R_4$ in series instead of parallel with the $(R_2 + R_3)$ branch.',
      },
    ],
    correctAnswers: ['A'],
    hint: 'Work from the innermost series pair ($R_2$ and $R_3$) outward toward terminals A and B.',
    solutionSummary:
      'The top branch has resistance $R_2 + R_3$. Combining it in parallel with $R_4$ gives $(1/(R_2+R_3) + 1/R_4)^{-1}$, which is then added in series to $R_1$.',
  },
  {
    id: 'm3-q6',
    moduleId: 3,
    questionType: 'single',
    difficulty: 'Core',
    title: 'Parallel Addition: Resistors vs. Capacitors',
    prompt:
      'A circuit initially contains a single resistor $R_1$. A second resistor $R_2$ is added in **parallel** with $R_1$. Separately, a circuit contains a single capacitor $C_1$, and a second capacitor $C_2$ is added in **parallel** with $C_1$. How do $R_{eq}$ and $C_{eq}$ change?',
    options: [
      {
        id: 'A',
        text: '$R_{eq}$ increases and $C_{eq}$ increases.',
        trapExplanation:
          'AP Trap: Adding a parallel path for current always DECREASES equivalent resistance, even if $R_2$ is very large!',
      },
      {
        id: 'B',
        text: '$R_{eq}$ decreases and $C_{eq}$ decreases.',
        trapExplanation:
          'AP Trap: Adding a parallel capacitor provides additional plate area at the same $\\Delta V$, increasing total charge stored and therefore INCREASING $C_{eq} = C_1 + C_2$.',
      },
      {
        id: 'C',
        text: '$R_{eq}$ decreases and $C_{eq}$ increases.',
        trapExplanation:
          'Correct! Adding a parallel resistor provides an extra path for current ($1/R_{eq} = 1/R_1 + 1/R_2 \\implies R_{eq} < R_1$). Adding a parallel capacitor increases total charge stored at the same voltage ($C_{eq} = C_1 + C_2 > C_1$).',
      },
      {
        id: 'D',
        text: '$R_{eq}$ increases and $C_{eq}$ decreases.',
        trapExplanation:
          'AP Trap: That describes adding components in SERIES, not in parallel!',
      },
    ],
    correctAnswers: ['C'],
    hint: 'Parallel resistor = extra lane on a highway (less resistance). Parallel capacitor = extra storage plate area (more capacitance).',
    solutionSummary:
      'Adding any resistor in parallel always lowers $R_{eq}$ below the smallest individual branch resistance. Adding any capacitor in parallel adds directly ($C_{eq} = C_1 + C_2$), always increasing $C_{eq}$.',
  },
]
