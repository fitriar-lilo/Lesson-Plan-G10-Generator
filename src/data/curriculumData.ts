import { TopicData, MeetingPlan, SubtopicData } from '../types/lessonPlan';

export const CAMBRIDGE_OBJECTIVE_DESCRIPTIONS: Record<string, string> = {
  'C1.11': 'Calculate a given fraction or percentage of a quantity, express one quantity as a percentage of another.',
  'E1.11': 'Calculate given fraction/percentage of quantities, reverse percentage, repeated percentage changes.',
  'C1.12': 'Understand speed, distance, time, and calculate average speed.',
  'E1.12': 'Calculate average speed and rates in real-life contexts involving multiple units.',
  'C1.13': 'Calculate simple interest, compound interest, personal and household finances.',
  'E1.13': 'Calculate compound interest value over several years, depreciation, inflation.',
  'C1.16': 'Calculate earnings, gross pay, net pay, hourly rate, tax deductions.',
  'E1.16': 'Extended earnings, taxation bands, progressive income tax calculations.',
  'C2.2': 'Manipulate directed numbers, use brackets, extract common integer factors.',
  'E2.2': 'Factorise quadratic expressions ax² + bx + c, algebraic fractions, common binomial factors.',
  'C2.5': 'Solve simple linear equations and simultaneous linear equations in two unknowns.',
  'E2.5': 'Solve simultaneous equations with linear and non-linear forms, algebraic rearrangement.',
  'C2.6': 'Represent and interpret linear inequalities on a number line.',
  'E2.6': 'Represent linear inequalities graphically, identify regions satisfied by multiple inequalities.',
  'C2.10': 'Construct tables of values and draw graphs for quadratic functions y = ax² + bx + c.',
  'E2.10': 'Interpret curved graphs, solve equations graphically, reciprocal functions y = a/x.',
  'E2.3': 'Solve quadratic equations by factorisation, quadratic formula, and completing the square.',
  'E2.8': 'Express direct and inverse variation in algebraic terms, find constant of proportionality k.',
  'E2.9': 'Interpret distance-time and speed-time graphs, calculate acceleration and distance under curve.',
  'E2.12': 'Estimate gradients of curves by drawing tangents, understand basic derivative concepts.',
  'E2.13': 'Use function notation f(x), evaluate composite functions gf(x) and inverse functions f⁻¹(x).',
  'C4.3': 'Use scale drawings and bearings (three-figure bearings from North clockwise).',
  'E4.3': 'Advanced scale diagrams, navigate with 3-figure bearings, multi-step navigation problems.',
  'C4.5': 'Recognise line and rotational symmetry in 2D shapes.',
  'E4.5': 'Recognise line, plane, and rotational symmetry in 3D polyhedra and prisms.',
  'C4.7': 'Calculate unknown angles using geometric properties, angles at a point, triangles.',
  'E4.7': 'Calculate unknown angles using circle theorems (subtended angles, cyclic quadrilaterals).',
  'E4.8': 'Use symmetry properties of circles, chords, tangents, perpendicular bisectors.',
  'C6.2': 'Apply Pythagoras theorem and sine, cosine, tangent ratios in right-angled triangles.',
  'E6.2': 'Solve right-angled triangle problems in 2D and elevation/depression angle contexts.',
  'E6.3': 'Know and use exact trigonometric values for 0°, 30°, 45°, 60°, 90° without a calculator.',
  'E6.4': 'Recognise and use sine, cosine, and tangent of obtuse and reflex angles up to 360°.',
  'E6.5': 'Use the sine rule a/sinA = b/sinB, cosine rule a² = b² + c² - 2bc cosA, area = 1/2 ab sinC.',
  'E6.6': 'Solve problems using trigonometry and Pythagoras theorem in three dimensions.',
  'C7.1': 'Recognise and draw reflection, rotation, translation, and enlargement on a grid.',
  'E7.1': 'Describe and execute transformations with fractional/negative scale factors.',
  'E7.2': 'Describe translation using column vectors, calculate vector magnitude.',
  'E7.3': 'Add and subtract column vectors, multiply vector by a scalar.',
  'E7.4': 'Represent vectors geometrically, solve geometric vector proof problems.',
  'C8.3': 'Calculate probability of single events, understand sample spaces and tree diagrams.',
  'E8.3': 'Use probability tree diagrams for independent and dependent (without replacement) events.',
  'E8.4': 'Calculate conditional probability and use Venn diagrams with set notation.',
  'C9.5': 'Draw and interpret scatter diagrams, identify positive, negative, and zero correlation.',
  'E9.5': 'Draw line of best fit by eye, interpret correlation, understand causation vs correlation.',
  'E9.6': 'Construct and interpret cumulative frequency diagrams, find median, quartiles, IQR.',
  'E9.7': 'Construct and interpret histograms with unequal intervals using frequency density.',
};

export function createMeetingPlan(
  meetingNum: number,
  topicTitle: string,
  subtopicTitle: string,
  focusSnippet: string,
  starterHook: string,
  diagnosticProblem: string,
  inquiryPrompt: string,
  boardExample: string,
  elaborateTask: string,
  exitQuestion: string
): MeetingPlan {
  return {
    meetingNumber: meetingNum,
    topicFocus: `Meeting ${meetingNum}: ${focusSnippet}`,
    starterHook: starterHook,
    engage: {
      title: 'Engage (Diagnostic Warm-up & Hook)',
      duration: '10 min',
      description: `Display WALT & WILF on board. Conduct a low-stakes 3-minute starter with friendly integer values. Review prerequisite terminology: "${diagnosticProblem}".`,
      scaffoldingTips: 'Use visual number lines or color-coded algebraic tiles. Reinforce that zero and positive integers keep cognitive load low.',
      sampleProblem: diagnosticProblem,
      teacherRole: 'Elicit prior knowledge via cold-call mini-whiteboard check; highlight key vocabulary.',
      studentRole: 'Solve integer warm-up on mini-whiteboards; self-assess baseline comfort level.'
    },
    explore: {
      title: 'Explore (Guided Discovery & Scaffolded Inquiry)',
      duration: '20 min',
      description: `Students work in mixed-readiness pairs on a concrete structured exploration task: ${inquiryPrompt}. Use integer-based step cards to notice numerical patterns.`,
      scaffoldingTips: 'Provide structured graphic organizers with fill-in-the-blank prompt boxes. Ensure numbers result in whole integer quotients/sums.',
      sampleProblem: inquiryPrompt,
      teacherRole: 'Facilitate paired discourse; circulate with targeted prompt questions for struggling learners.',
      studentRole: 'Collaborate with partner using step-by-step cue cards; test integer conjectures.'
    },
    explain: {
      title: 'Explain (Explicit Instruction & Formative Modeling)',
      duration: '15 min',
      description: `Teacher-led explicit direct instruction using the "I Do, We Do, You Do" framework. Model the algorithm step-by-step: "${boardExample}". Highlight common pitfalls (e.g. sign errors, omitting negative signs).`,
      scaffoldingTips: 'Color-code matching terms (e.g., green for variable x, blue for variable y, red for constants). Write the rule in plain English before mathematical notation.',
      sampleProblem: boardExample,
      teacherRole: 'Demonstrate clean vertical working; ask probing "Why did I do this step?" questions.',
      studentRole: 'Annotate worked examples in course notebooks; chorally repeat procedural steps.'
    },
    elaborate: {
      title: 'Elaborate (Differentiated Practice & Consolidation)',
      duration: '20 min',
      description: `Independent and small-group tiered practice on worksheet: ${elaborateTask}. Level 1 questions use clean single-digit integers; Level 2 introduces moderate combined steps; Level 3 offers word-problem context.`,
      scaffoldingTips: 'Allow struggling students to use calculation cue sheets and formula templates. High-achievers proceed directly to application challenges.',
      sampleProblem: elaborateTask,
      teacherRole: 'Pull small focus group (3-4 students) to the teacher desk for intensive guided scaffolding; monitor room.',
      studentRole: 'Complete tiered exercises at own pace; check answers with peer buddy against answer station.'
    },
    evaluate: {
      title: 'Evaluate (Exit Ticket & Formative Reflection)',
      duration: '15 min',
      description: `Individual unassisted Exit Ticket: "${exitQuestion}". Collect responses to diagnose mastery against the day's WILF criteria. Close with 2-minute student reflection.`,
      scaffoldingTips: 'Provide a 2-step structured prompt box so students can earn partial credit for process even if arithmetic fails.',
      sampleProblem: exitQuestion,
      teacherRole: 'Scan exit tickets immediately for triage; assign appropriate evening practice based on outcome.',
      studentRole: 'Independently complete exit ticket without notes; hand to teacher on dismissal.'
    }
  };
}

export function generateMeetingsForSubtopic(
  subtopicId: string,
  subtopicTitle: string,
  totalMeetings: number
): MeetingPlan[] {
  const result: MeetingPlan[] = [];

  // Seed progressive meeting themes based on meeting index
  for (let i = 1; i <= totalMeetings; i++) {
    let focus = '';
    let hook = '';
    let diag = '';
    let inq = '';
    let board = '';
    let elab = '';
    let exit = '';

    if (i === 1) {
      focus = `Foundational Concepts & Clean Integer Representations in ${subtopicTitle}`;
      hook = `Real-world hook: Where does ${subtopicTitle} appear in daily engineering, school events, or local markets?`;
      diag = `Identify integer parts and evaluate: e.g., 2(3) + 4 = ?`;
      inq = `Sort 4 sample cards into correct procedural sequence using only small whole numbers.`;
      board = `Step-by-step foundational model with single-digit integers (e.g. solve 2x + 3 = 11).`;
      elab = `Tier 1 Worksheet: 8 straightforward integer problems with structured hint guides.`;
      exit = `Solve 1 core entry-level problem matching today's primary WILF step.`;
    } else if (i === 2) {
      focus = `Procedural Mastery, Dual-Step Techniques & Error Analysis`;
      hook = `"Spot the Blunder": Analyze a mock student response that made a classic sign or bracket mistake.`;
      diag = `Quick 2-minute diagnostic check on yesterday's core technique using integers.`;
      inq = `Compare two methods (Method A vs Method B) and verify both reach the identical whole number answer.`;
      board = `Dual-step demonstration with negative numbers and grouping (e.g. 3x - 5 = x + 7).`;
      elab = `Paired rally-coach activity: Student A solves while Student B coaches, then swap roles.`;
      exit = `Complete 1 dual-step integer problem and identify which step requires reversing operations.`;
    } else if (i === 3) {
      focus = `Real-World Word Problems & Contextual Mathematical Modelling`;
      hook = `School canteen / sports day scenario involving unknown quantities represented by integers.`;
      diag = `Translate two English phrases into algebraic/geometric statements (e.g., "5 more than double x").`;
      inq = `Construct a graphic organizer mapping word phrases to mathematical equations.`;
      board = `Translating and solving a 3-sentence word problem into clean integer equations.`;
      elab = `Cambridge 0580 Paper 2 past-paper style word problems scaffolded with sentence starters.`;
      exit = `Formulate an equation from a short paragraph and solve for the integer answer.`;
    } else if (i === 4) {
      focus = `Multi-Step Examination Scenarios, Differentiation & Formative Review`;
      hook = `Cambridge Examiner's Report Insights: What did 40% of candidates miss on this question?`;
      diag = `Mini-quiz on key terms (CLIL bilingual matching: English to Indonesian translation).`;
      inq = `Collaborative carousel: 4 challenge stations around the classroom with progressive hints under flap.`;
      board = `Extended question breakdown showing how method marks (M1, A1) are awarded.`;
      elab = `Individual differentiated packet: Struggling (scaffolded), Middle (standard), Extension (high-level).`;
      exit = `Final mastery exit check: 1 two-part question assessing both AO1 (techniques) and AO2 (application).`;
    } else {
      focus = `Consolidation, Fluency Sprint & Extension Applications (Part ${i})`;
      hook = `Speed and precision sprint: How fast can we accurately solve 3 integer checks?`;
      diag = `Recall formula or core definition in under 60 seconds on mini-whiteboard.`;
      inq = `Investigation into edge cases: What happens when values double or become negative?`;
      board = `Exam-style multi-part question synthesis combining today's focus with prior units.`;
      elab = `Targeted stations: Remediation station for struggling learners; Past-paper marathon for stretch.`;
      exit = `Synthesised exam question (3 marks) with self-rating rubric (Red / Amber / Green).`;
    }

    result.push(
      createMeetingPlan(i, 'Cambridge 0580', subtopicTitle, focus, hook, diag, inq, board, elab, exit)
    );
  }

  return result;
}

export const CURRICULUM_DATA: TopicData[] = [
  {
    id: 14,
    numberStr: '14',
    title: 'Further solving of equations and inequalities',
    syllabusCategory: 'Algebra and graphs',
    subtopics: [
      {
        id: '14.1',
        title: 'Simultaneous linear equations',
        objectives: ['C2.5', 'E2.5'],
        walt: 'Solve pairs of simultaneous linear equations in two variables using elimination and substitution methods with clean integer solutions.',
        wilf: [
          'I can line up like terms (x and y) vertically and label equations (1) and (2).',
          'I can multiply one or both equations by a whole number so the coefficients of x or y match.',
          'I can add or subtract equations to eliminate one variable and find the first integer answer.',
          'I can substitute the first value back into equation (1) to calculate the second integer answer.',
          'I can verify both answers by substituting them into equation (2).'
        ],
        slo: [
          'Solve simultaneous linear equations with integer coefficients yielding integer solutions (e.g. x + y = 7, 2x - y = 5).',
          'Explain whether addition or subtraction is needed based on matching signs.',
          'Formulate simultaneous equations from short contextual word problems.'
        ],
        keyTerms: [
          { term: 'Simultaneous equations', definition: 'Two or more equations with the same variables that must be satisfied at the same time.', indonesianGloss: 'Persamaan linear simultan' },
          { term: 'Elimination method', definition: 'Adding or subtracting equations to remove one variable.', indonesianGloss: 'Metode eliminasi' },
          { term: 'Substitution method', definition: 'Replacing a variable in one equation with an expression from the other.', indonesianGloss: 'Metode substitusi' },
          { term: 'Coefficient', definition: 'The numerical factor multiplying a variable (e.g., 3 in 3x).', indonesianGloss: 'Koefisien' }
        ],
        ealStrategies: [
          'Color code the x-terms in red, y-terms in blue, and constants in black.',
          'Use mnemonic: SSS = Same Sign Subtract; OSA = Opposite Sign Add.',
          'Bilingual vocabulary cards with Indonesian translations provided for low-language learners.'
        ],
        struggledScaffolding: [
          'Start exclusively with equations where one variable already has equal coefficients (e.g., x + y = 6 and x - y = 2).',
          'Provide a structured 4-row calculation template with pre-labeled boxes for (1), (2), elimination step, and substitution step.',
          'Limit all initial examples to positive integers between 1 and 10 to reduce arithmetic overload.'
        ],
        extensionTasks: [
          'Solve simultaneous equations with fractional coefficients, e.g., x/2 + y/3 = 4 and x/4 - y/6 = 1.',
          'Construct a real-life word problem about school tickets or merchandise that translates into simultaneous equations with non-integer prices.'
        ],
        defaultFormativeExercises: {
          level1: 'Solve: x + y = 9 and x - y = 3 (Hint: Add equations to eliminate y).',
          level2: 'Solve: 2x + 3y = 13 and x + 3y = 11 (Hint: Subtract equations to eliminate y).',
          level3: 'Solve: 3x + 2y = 16 and 2x - y = 6 (Hint: Multiply second equation by 2).',
          homework: 'Coursebook 0580 Exercise 14.1, Page 214, Questions 1(a-d), 3, 5.'
        },
        coursebookPages: 'Cambridge IGCSE Mathematics (0580) Coursebook Ch 14, pp. 210–218',
        suggestedTools: ['Algebra tiles', 'Desmos Graphing Calculator (intersection of 2 lines)', 'Mini-whiteboards'],
        defaultMeetings: generateMeetingsForSubtopic('14.1', 'Simultaneous linear equations', 4)
      },
      {
        id: '14.2',
        title: 'Linear inequalities',
        objectives: ['C2.6', 'E2.6'],
        walt: 'Solve single-variable linear inequalities and represent solution sets on integer number lines.',
        wilf: [
          'I can isolate the variable by using inverse operations just like solving an equation.',
          'I can reverse the inequality symbol whenever multiplying or dividing by a negative integer.',
          'I can draw an open circle for < or > and a filled circle for ≤ or ≥ on a number line.',
          'I can list all the integers satisfying a combined inequality like -2 < x ≤ 4.'
        ],
        slo: [
          'Solve linear inequalities such as 3x - 4 < 11 and represent solutions on a number line.',
          'List integers that satisfy inequalities.',
          'Apply the negative sign reversal rule accurately.'
        ],
        keyTerms: [
          { term: 'Inequality', definition: 'A mathematical statement showing one quantity is greater than, less than, or equal to another.', indonesianGloss: 'Pertidaksamaan' },
          { term: 'Integer', definition: 'A whole number that can be positive, negative, or zero (..., -2, -1, 0, 1, 2, ...).', indonesianGloss: 'Bilangan bulat' },
          { term: 'Reversal Rule', definition: 'Reversing the inequality sign when multiplying or dividing by a negative value.', indonesianGloss: 'Aturan pembalikan tanda' }
        ],
        ealStrategies: [
          'Visual symbol anchor chart: Open circle = strictly greater/less; Filled solid circle = inclusive.',
          'Physical gesture: Hands pointing left for less than, right for greater than.'
        ],
        struggledScaffolding: [
          'Begin with 1-step inequalities: x + 4 > 9, 2x ≤ 10 before introducing negative coefficients.',
          'Use physical number lines with moveable counters.'
        ],
        extensionTasks: [
          'Solve compound inequalities: 2 < 3x - 1 ≤ 14 and list all integer solutions.',
          'Formulate an inequality model for an elevator carrying weight limits.'
        ],
        defaultFormativeExercises: {
          level1: 'Solve and draw on number line: x + 5 ≤ 11.',
          level2: 'Solve: 4x - 3 > 17.',
          level3: 'Solve: 5 - 2x ≥ 1 (Watch the negative sign!).',
          homework: 'Coursebook 0580 Exercise 14.2, pp. 219–223, Questions 2, 4, 7.'
        },
        coursebookPages: 'Cambridge IGCSE Mathematics (0580) Coursebook Ch 14, pp. 219–225',
        suggestedTools: ['Number line templates', 'Dry-erase markers', 'Desmos 1D inequality sliders'],
        defaultMeetings: generateMeetingsForSubtopic('14.2', 'Linear inequalities', 4)
      },
      {
        id: '14.3',
        title: 'Regions in plane',
        objectives: ['E2.6'],
        walt: 'Identify and shade regions defined by linear inequalities on a 2D Cartesian coordinate plane.',
        wilf: [
          'I can graph boundary lines using solid lines for ≤ / ≥ and dashed/broken lines for < / >.',
          'I can test the origin (0, 0) to determine which side of the boundary line satisfies the inequality.',
          'I can correctly shade the unwanted (or wanted) region as specified by Cambridge convention (label R).'
        ],
        slo: [
          'Plot boundary lines like y = 2x + 1 and x = 3.',
          'Identify coordinates of integer points lying inside the feasible region R.'
        ],
        keyTerms: [
          { term: 'Boundary line', definition: 'The straight line corresponding to the equality part of an inequality.', indonesianGloss: 'Garis batas' },
          { term: 'Feasible region', definition: 'The area on the coordinate plane where all given inequalities are true simultaneously.', indonesianGloss: 'Daerah penyelesaian' }
        ],
        ealStrategies: ['Shading key: "Solid line = points on line are included; Dashed = points not included."'],
        struggledScaffolding: ['Use grid paper with pre-drawn axes and integer scale from -5 to +5.'],
        extensionTasks: ['Linear programming problem maximizing profit P = 3x + 2y in region R.'],
        defaultFormativeExercises: {
          level1: 'Shade the region satisfied by x ≥ 2 and y ≤ 4.',
          level2: 'Show the region defined by y < x + 2 and y ≥ -1.',
          level3: 'Identify all integer coordinate pairs (x, y) satisfying x + y ≤ 5, x ≥ 1, and y ≥ 1.',
          homework: 'Coursebook 0580 Exercise 14.3, pp. 226–230, Questions 1, 3, 6.'
        },
        coursebookPages: 'Coursebook Ch 14, pp. 226–232',
        suggestedTools: ['GeoGebra 2D Inequalities', 'Graphing grid paper', 'Highlighters'],
        defaultMeetings: generateMeetingsForSubtopic('14.3', 'Regions in plane', 3)
      },
      {
        id: '14.4',
        title: 'Completing the square',
        objectives: ['E2.3'],
        walt: 'Transform quadratic expressions into completed square form (x + p)² + q and find the vertex.',
        wilf: [
          'I can take half of the coefficient of x (b/2) and square it.',
          'I can write the quadratic in the form (x + p)² + q where p = b/2.',
          'I can identify the minimum value of the expression and the coordinate of the turning point.'
        ],
        slo: [
          'Complete the square for x² + bx + c where b is an even integer.',
          'State coordinates of the minimum turning point (-p, q).'
        ],
        keyTerms: [
          { term: 'Completing the square', definition: 'Rewriting a quadratic in the form (x + p)² + q.', indonesianGloss: 'Melengkapkan kuadrat sempurna' },
          { term: 'Turning point / Vertex', definition: 'The maximum or minimum point of a quadratic curve.', indonesianGloss: 'Titik balik / puncak' }
        ],
        ealStrategies: ['Use geometric square area model visual diagram to show missing corner square.'],
        struggledScaffolding: ['Always choose even numbers for b (e.g. x² + 6x + 5) so b/2 is a whole integer.'],
        extensionTasks: ['Complete the square where coefficient of x² > 1, e.g., 2x² + 12x + 7.'],
        defaultFormativeExercises: {
          level1: 'Write x² + 4x + 1 in the form (x + p)² + q.',
          level2: 'Write x² - 6x + 10 in completed square form and state the minimum value.',
          level3: 'Solve x² + 8x + 7 = 0 by completing the square.',
          homework: 'Coursebook 0580 Exercise 14.4, pp. 233–237, Questions 2(a-d), 4.'
        },
        coursebookPages: 'Coursebook Ch 14, pp. 233–238',
        suggestedTools: ['Algebra tile kits', 'Geometric square visual cards'],
        defaultMeetings: generateMeetingsForSubtopic('14.4', 'Completing the square', 3)
      },
      {
        id: '14.5',
        title: 'Quadratic formula',
        objectives: ['E2.3'],
        walt: 'Use the quadratic formula x = (-b ± √(b² - 4ac)) / (2a) to solve quadratic equations accurately.',
        wilf: [
          'I can rearrange any quadratic equation into the standard form ax² + bx + c = 0.',
          'I can identify the integer values of a, b, and c with their proper signs.',
          'I can substitute carefully using brackets around negative values: (-b) and (b)²',
          'I can calculate the discriminant (b² - 4ac) before calculating square roots.',
          'I can state answers rounded to 2 decimal places or exact surd form.'
        ],
        slo: [
          'Correctly substitute into the quadratic formula.',
          'Solve equations with real roots.',
          'Avoid calculator syntax errors with negative signs.'
        ],
        keyTerms: [
          { term: 'Quadratic formula', definition: 'x = (-b ± √(b² - 4ac)) / (2a).', indonesianGloss: 'Rumus kuadratik / rumus abc' },
          { term: 'Discriminant', definition: 'The value b² - 4ac under the square root.', indonesianGloss: 'Diskriminan' }
        ],
        ealStrategies: ['Song / rhythm mnemonic for remembering the formula.', 'Step-by-step substitution template.'],
        struggledScaffolding: ['Provide template boxes for [a = __], [b = __], [c = __], [b² - 4ac = __].'],
        extensionTasks: ['Determine number of real roots based on discriminant sign (b² - 4ac > 0, = 0, < 0).'],
        defaultFormativeExercises: {
          level1: 'Solve using formula: x² + 5x + 6 = 0 (Integer discriminant = 1).',
          level2: 'Solve: x² - 4x - 5 = 0.',
          level3: 'Solve: 2x² + 3x - 7 = 0 to 2 decimal places.',
          homework: 'Coursebook 0580 Exercise 14.5, pp. 239–244, Questions 1, 3, 5.'
        },
        coursebookPages: 'Coursebook Ch 14, pp. 239–245',
        suggestedTools: ['Scientific calculators (Casio fx-991EX/CW)', 'Formula scaffold sheet'],
        defaultMeetings: generateMeetingsForSubtopic('14.5', 'Quadratic formula', 4)
      },
      {
        id: '14.6',
        title: 'Factorising quadratics where coefficient of x² ≠ 1',
        objectives: ['E2.2'],
        walt: 'Factorise non-monic quadratic expressions ax² + bx + c into two binomial brackets (px + q)(rx + s).',
        wilf: [
          'I can multiply a and c to find the product ac.',
          'I can find two integer factors of ac that add up to b.',
          'I can split the middle term into two parts and factorise by grouping.'
        ],
        slo: ['Factorise expressions such as 2x² + 7x + 3 into (2x + 1)(x + 3).', 'Solve 2x² + 5x + 2 = 0.'],
        keyTerms: [
          { term: 'Non-monic quadratic', definition: 'Quadratic expression where coefficient a ≠ 1.', indonesianGloss: 'Kuadrat non-monik' },
          { term: 'Factorising by grouping', definition: 'Grouping terms into pairs to factorise common terms.', indonesianGloss: 'Faktorisasi pengelompokan' }
        ],
        ealStrategies: ['AC method "X-puzzle" organizer: product ac on top, sum b on bottom.'],
        struggledScaffolding: ['Keep a = 2 or 3 (prime numbers) to limit factor pairs.'],
        extensionTasks: ['Factorise and simplify algebraic fractions with non-monic quadratics.'],
        defaultFormativeExercises: {
          level1: 'Factorise: 2x² + 5x + 2.',
          level2: 'Factorise: 3x² + 7x + 2.',
          level3: 'Solve: 2x² - 5x - 3 = 0.',
          homework: 'Coursebook 0580 Exercise 14.6, pp. 246–250, Questions 1, 2, 6.'
        },
        coursebookPages: 'Coursebook Ch 14, pp. 246–251',
        suggestedTools: ['AC grid organizer', 'Factor pair list chart'],
        defaultMeetings: generateMeetingsForSubtopic('14.6', 'Factorising quadratics a ≠ 1', 3)
      },
      {
        id: '14.7',
        title: 'Algebraic fractions',
        objectives: ['E2.2'],
        walt: 'Simplify, add, subtract, multiply, and divide algebraic fractions with common denominators and factorisation.',
        wilf: [
          'I can factorise numerators and denominators completely before canceling common factors.',
          'I can find the common denominator by multiplying algebraic factors.',
          'I can expand brackets carefully when subtracting algebraic numerators.'
        ],
        slo: ['Simplify (x² - 9)/(2x + 6).', 'Add 2/(x + 1) + 3/(x - 2).'],
        keyTerms: [
          { term: 'Algebraic fraction', definition: 'A fraction containing variable expressions in numerator or denominator.', indonesianGloss: 'Pecahan aljabar' },
          { term: 'Common denominator', definition: 'A common multiple of the denominators.', indonesianGloss: 'Penyebut persekutuan' }
        ],
        ealStrategies: ['Review numeric fraction rules (e.g. 2/3 + 1/4) directly adjacent to algebraic counterparts.'],
        struggledScaffolding: ['Start with numeric denominators (e.g. x/3 + x/4 = 7) before variable denominators.'],
        extensionTasks: ['Solve equations of the form 1/(x - 1) + 2/(x + 2) = 1 leading to quadratics.'],
        defaultFormativeExercises: {
          level1: 'Simplify: (2x + 4) / 2.',
          level2: 'Simplify: (x² - 4) / (x + 2).',
          level3: 'Express as single fraction: 3/(x + 1) + 2/(x - 1).',
          homework: 'Coursebook 0580 Exercise 14.7, pp. 252–257, Questions 1(a-e), 3, 5.'
        },
        coursebookPages: 'Coursebook Ch 14, pp. 252–258',
        suggestedTools: ['Fraction equivalence charts', 'Color-coded bracket cards'],
        defaultMeetings: generateMeetingsForSubtopic('14.7', 'Algebraic fractions', 4)
      }
    ]
  },
  {
    id: 15,
    numberStr: '15',
    title: 'Scale drawings, bearings and trigonometry',
    syllabusCategory: 'Geometry and measure',
    subtopics: [
      {
        id: '15.1',
        title: 'Scale drawing',
        objectives: ['C4.3', 'E4.3'],
        walt: 'Use scale ratios to convert between map distances and real-world lengths using consistent metric units.',
        wilf: [
          'I can express scales in the ratio form 1 : n using the same unit.',
          'I can multiply map measurements by scale factor to find actual distances.',
          'I can divide real distances by scale factor to draw accurate diagram lengths in centimeters.'
        ],
        slo: ['Convert distances using scale 1:50,000.', 'Measure map distances with a ruler and calculate kilometers.'],
        keyTerms: [
          { term: 'Scale ratio', definition: 'The ratio comparing diagram size to real-life size.', indonesianGloss: 'Skala gambar' },
          { term: 'Metric conversion', definition: '1 m = 100 cm; 1 km = 1,000 m = 100,000 cm.', indonesianGloss: 'Konversi metrik' }
        ],
        ealStrategies: ['Conversion ladder visual: cm -> m (÷100) -> km (÷1000).'],
        struggledScaffolding: ['Use simple round scales: 1 cm represents 2 m or 1 cm represents 5 km.'],
        extensionTasks: ['Calculate scale factor for area where linear scale is 1 : k (area scale 1 : k²).'],
        defaultFormativeExercises: {
          level1: 'On a 1:100 plan, a room is 5 cm long. Find actual length in meters.',
          level2: 'A map scale is 1:25,000. Actual distance is 5 km. Find distance on map in cm.',
          level3: 'A field of 2 cm by 3 cm on a 1:500 plan. Find actual area in m².',
          homework: 'Coursebook 0580 Exercise 15.1, pp. 260–265, Questions 1, 4, 8.'
        },
        coursebookPages: 'Coursebook Ch 15, pp. 260–266',
        suggestedTools: ['Metric rulers', 'Semesta School campus map', 'Protractors'],
        defaultMeetings: generateMeetingsForSubtopic('15.1', 'Scale drawing', 2)
      },
      {
        id: '15.2',
        title: 'Bearings',
        objectives: ['C4.3', 'E4.3'],
        walt: 'Measure and calculate three-figure bearings measured clockwise from North.',
        wilf: [
          'I can always measure from the North line (000°).',
          'I can always measure in a clockwise direction.',
          'I can always write bearings using three figures (e.g. 045°, 090°, 270°).',
          'I can calculate back-bearings by adding or subtracting 180°.'
        ],
        slo: ['Measure angles using 360° protractor.', 'Calculate back bearings using parallel line angle rules.'],
        keyTerms: [
          { term: 'Bearing', definition: 'An angle in degrees measured clockwise from North using 3 digits.', indonesianGloss: 'Jurusan tiga angka / Azimuth' },
          { term: 'Back-bearing', definition: 'The direction directly opposite (differs by 180°).', indonesianGloss: 'Sudut balik' }
        ],
        ealStrategies: ['Compass rose visual with N, E, S, W labeled 000°, 090°, 180°, 270°.'],
        struggledScaffolding: ['Emphasize drawing a vertical North arrow with a ruler at the starting point first.'],
        extensionTasks: ['Combine bearings with trigonometry to locate ships or lost hikers.'],
        defaultFormativeExercises: {
          level1: 'Write North-East as a three-figure bearing (045°).',
          level2: 'The bearing of B from A is 070°. Find the bearing of A from B.',
          level3: 'Ship sails 10 km on bearing 060°, then 15 km on 150°. Draw sketch and calculate distance.',
          homework: 'Coursebook 0580 Exercise 15.2, pp. 267–272, Questions 2, 5, 9.'
        },
        coursebookPages: 'Coursebook Ch 15, pp. 267–273',
        suggestedTools: ['360° protractors', 'Compass rose templates'],
        defaultMeetings: generateMeetingsForSubtopic('15.2', 'Bearings', 3)
      },
      {
        id: '15.3',
        title: 'Understanding tangent, cosine, sine ratios',
        objectives: ['C6.2', 'E6.2'],
        walt: 'Define and apply SOH CAH TOA ratios in right-angled triangles to calculate unknown sides.',
        wilf: [
          'I can correctly label the Hypotenuse (H), Opposite (O), and Adjacent (A) sides.',
          'I can select the correct ratio: sin θ = O/H, cos θ = A/H, tan θ = O/A.',
          'I can rearrange the formula and evaluate on calculator in DEG mode.'
        ],
        slo: ['Label right-angled triangles accurately relative to marked reference angle.', 'Calculate missing side lengths.'],
        keyTerms: [
          { term: 'Hypotenuse', definition: 'The longest side opposite the right angle.', indonesianGloss: 'Sisi miring / hipotenusa' },
          { term: 'Opposite', definition: 'The side facing directly across from the reference angle.', indonesianGloss: 'Sisi depan' },
          { term: 'Adjacent', definition: 'The side next to the reference angle between angle and 90°.', indonesianGloss: 'Sisi samping' }
        ],
        ealStrategies: ['Mnemonic SOH CAH TOA with color-coordinated triangle sides.'],
        struggledScaffolding: ['Use 3-4-5 and 5-12-13 integer triangles for initial ratio calculations.'],
        extensionTasks: ['Find missing angles using inverse functions sin⁻¹, cos⁻¹, tan⁻¹.'],
        defaultFormativeExercises: {
          level1: 'Identify Hypotenuse, Opposite, Adjacent in triangle with angle 30° at base.',
          level2: 'In right triangle, angle = 30°, H = 10 cm. Find O using sin 30° = 0.5.',
          level3: 'Find adjacent side when angle = 45° and opposite = 8 cm.',
          homework: 'Coursebook 0580 Exercise 15.3, pp. 274–280, Questions 1, 3, 7.'
        },
        coursebookPages: 'Coursebook Ch 15, pp. 274–282',
        suggestedTools: ['Right triangle cutouts', 'Scientific calculators'],
        defaultMeetings: generateMeetingsForSubtopic('15.3', 'Trigonometric ratios', 4)
      },
      {
        id: '15.4',
        title: 'Exact Trigonometric Ratios',
        objectives: ['E6.3'],
        walt: 'Derive and recall exact values of sin, cos, and tan for 0°, 30°, 45°, 60°, and 90° without a calculator.',
        wilf: [
          'I can draw an equilateral triangle of side 2 to derive ratios for 30° and 60°.',
          'I can draw an isosceles right triangle of legs 1 to derive ratios for 45°.',
          'I can construct and recall the hand trick or exact value table.'
        ],
        slo: ['State exact values like sin 30° = 1/2, cos 60° = 1/2, tan 45° = 1.', 'Calculate surd values like cos 30° = √3/2.'],
        keyTerms: [
          { term: 'Exact value', definition: 'A value expressed in fraction or surd form without rounding decimals.', indonesianGloss: 'Nilai eksak' },
          { term: 'Surd', definition: 'An irrational root number such as √2 or √3.', indonesianGloss: 'Bentuk akar / surd' }
        ],
        ealStrategies: ['5-finger hand trick diagram for 0, 30, 45, 60, 90 degrees.'],
        struggledScaffolding: ['Focus first on 30°, 45°, and 60° values that equal integers or halves (1/2, 1).'],
        extensionTasks: ['Evaluate expressions without calculator: 2 sin 30° + tan 45° - cos 60°.'],
        defaultFormativeExercises: {
          level1: 'State exact value of sin 30° and tan 45°.',
          level2: 'Show that sin² 45° + cos² 45° = 1 using exact surd values.',
          level3: 'Evaluate without calculator: 4 cos 60° + 2 tan 45° - √3 tan 60°.',
          homework: 'Coursebook 0580 Exercise 15.4, pp. 283–287, Questions 2, 4, 6.'
        },
        coursebookPages: 'Coursebook Ch 15, pp. 283–288',
        suggestedTools: ['Equilateral triangle folding models', 'Exact ratio summary cards'],
        defaultMeetings: generateMeetingsForSubtopic('15.4', 'Exact trigonometric ratios', 2)
      },
      {
        id: '15.5',
        title: 'Solving problems using trigonometry',
        objectives: ['C6.2', 'E6.2'],
        walt: 'Apply trigonometry to angles of elevation and depression in practical word problems.',
        wilf: [
          'I can draw a clear right-angled triangle from a written description.',
          'I can identify angles of elevation looking up and depression looking down from horizontal.',
          'I can solve for unknown building heights and distances.'
        ],
        slo: ['Translate word scenarios into geometric diagrams.', 'Calculate heights and distances accurately.'],
        keyTerms: [
          { term: 'Angle of elevation', definition: 'The angle between the horizontal line of sight and an object above.', indonesianGloss: 'Sudut elevasi' },
          { term: 'Angle of depression', definition: 'The angle between the horizontal line of sight and an object below.', indonesianGloss: 'Sudut depresi' }
        ],
        ealStrategies: ['Emphasize: Angle of depression is measured from the HORIZONTAL line of sight, never the vertical.'],
        struggledScaffolding: ['Always draw the horizontal dotted eye-level line before drawing the sight line.'],
        extensionTasks: ['Solve 2-triangle problems with two observers at different distances measuring the same tower.'],
        defaultFormativeExercises: {
          level1: 'A ladder 5 m long rests against a wall making 60° with ground. Find height reached.',
          level2: 'From a cliff 40 m high, angle of depression to boat is 20°. Find distance of boat from base.',
          level3: 'A flagpole casts a 12 m shadow when sun elevation is 35°. Find height of flagpole.',
          homework: 'Coursebook 0580 Exercise 15.5, pp. 289–295, Questions 1, 3, 7.'
        },
        coursebookPages: 'Coursebook Ch 15, pp. 289–296',
        suggestedTools: ['Clinometer app / cardboard clinometer', 'School flagpole measurement'],
        defaultMeetings: generateMeetingsForSubtopic('15.5', 'Problem solving with trigonometry', 3)
      },
      {
        id: '15.6',
        title: 'Sines, cosines and tangents of angles > 90°',
        objectives: ['E6.4'],
        walt: 'Determine trigonometric values for obtuse angles using ASTC quadrant rules and reference angles.',
        wilf: [
          'I can find the reference acute angle α = 180° - θ for obtuse angles.',
          'I can state that sin(180° - θ) = sin θ and cos(180° - θ) = -cos θ.',
          'I can solve trigonometric equations with two solutions between 0° and 180°.'
        ],
        slo: ['Recognise sine is positive and cosine is negative in quadrant 2 (90° to 180°).'],
        keyTerms: [
          { term: 'Obtuse angle', definition: 'An angle between 90° and 180°.', indonesianGloss: 'Sudut tumpul' },
          { term: 'Reference angle', definition: 'The acute angle made with the positive or negative horizontal axis.', indonesianGloss: 'Sudut referensi' }
        ],
        ealStrategies: ['ASTC diagram: All Students Take Calculus (Quadrant 1 All, Quadrant 2 Sine, etc.).'],
        struggledScaffolding: ['Use unit circle visual on GeoGebra to watch coordinates (x, y) = (cos θ, sin θ).'],
        extensionTasks: ['Solve sin θ = 0.5 for 0° ≤ θ ≤ 360° yielding 30° and 150°.'],
        defaultFormativeExercises: {
          level1: 'Find sin 150° given sin 30° = 0.5.',
          level2: 'Explain why cos 120° = -0.5.',
          level3: 'Solve sin x = 0.8 for 0° ≤ x ≤ 180°.',
          homework: 'Coursebook 0580 Exercise 15.6, pp. 297–302, Questions 2, 4, 8.'
        },
        coursebookPages: 'Coursebook Ch 15, pp. 297–304',
        suggestedTools: ['Interactive Unit Circle', 'GeoGebra trig graph visualizer'],
        defaultMeetings: generateMeetingsForSubtopic('15.6', 'Trigonometry > 90°', 2)
      },
      {
        id: '15.7',
        title: 'The sine and cosine rules',
        objectives: ['E6.5'],
        walt: 'Apply the sine rule and cosine rule to find missing sides and angles in non-right-angled triangles.',
        wilf: [
          'I can label sides a, b, c opposite angles A, B, C.',
          'I can choose Sine Rule: a/sinA = b/sinB when I know a matching side-angle pair.',
          'I can choose Cosine Rule: a² = b² + c² - 2bc cosA when given SAS or SSS.',
          'I can rearrange the cosine rule to find angles: cosA = (b² + c² - a²) / (2bc).'
        ],
        slo: ['Identify whether to use Sine Rule or Cosine Rule.', 'Calculate missing measurements in scalene triangles.'],
        keyTerms: [
          { term: 'Sine rule', definition: 'a/sinA = b/sinB = c/sinC.', indonesianGloss: 'Aturan sinus' },
          { term: 'Cosine rule', definition: 'a² = b² + c² - 2bc cosA.', indonesianGloss: 'Aturan cosinus' }
        ],
        ealStrategies: ['Decision Flowchart: "Do I have an angle and its opposite side? YES -> Sine Rule; NO -> Cosine Rule."'],
        struggledScaffolding: ['Always label the three pairs of matching uppercase and lowercase letters on triangle vertices and opposite sides.'],
        extensionTasks: ['Investigate the ambiguous case of the sine rule (SSA).'],
        defaultFormativeExercises: {
          level1: 'In triangle ABC, a = 8 cm, A = 30°, B = 45°. Find side b using sine rule.',
          level2: 'In triangle PQR, p = 5 cm, q = 7 cm, angle R = 60°. Find side r using cosine rule.',
          level3: 'In triangle with sides 5, 6, 7 cm, find the largest angle using rearranged cosine rule.',
          homework: 'Coursebook 0580 Exercise 15.7, pp. 305–312, Questions 1, 3, 5, 8.'
        },
        coursebookPages: 'Coursebook Ch 15, pp. 305–314',
        suggestedTools: ['Formula sheet summary', 'Scalene triangle templates'],
        defaultMeetings: generateMeetingsForSubtopic('15.7', 'Sine and cosine rules', 4)
      },
      {
        id: '15.8',
        title: 'Area of a triangle',
        objectives: ['E6.5'],
        walt: 'Calculate the area of any triangle using Area = 1/2 ab sin C given two sides and the included angle.',
        wilf: [
          'I can identify the two side lengths a and b.',
          'I can check that the angle C is the included angle (between the two sides).',
          'I can substitute values into Area = 0.5 × a × b × sin C.'
        ],
        slo: ['Calculate area without needing perpendicular height.', 'Calculate total area of composite quadrilaterals.'],
        keyTerms: [
          { term: 'Included angle', definition: 'The angle between two given adjacent sides.', indonesianGloss: 'Sudut apit' }
        ],
        ealStrategies: ['"V-shape" visual: The two sides form the arms of the V, and the angle sits in the apex.'],
        struggledScaffolding: ['Use clean integer sides (e.g. 6 cm, 8 cm) and 30° where sin 30° = 0.5 to keep arithmetic mental.'],
        extensionTasks: ['Find missing angle when area and two sides are given.'],
        defaultFormativeExercises: {
          level1: 'Find area of triangle with sides 6 cm, 10 cm and included angle 30°.',
          level2: 'Find area of parallelogram with sides 5 cm, 8 cm and angle 45°.',
          level3: 'A triangle has area 24 cm², sides 8 cm and 12 cm. Find possible values for included angle.',
          homework: 'Coursebook 0580 Exercise 15.8, pp. 315–318, Questions 2, 4, 6.'
        },
        coursebookPages: 'Coursebook Ch 15, pp. 315–320',
        suggestedTools: ['Area visualizer', 'Calculators'],
        defaultMeetings: generateMeetingsForSubtopic('15.8', 'Area of a triangle', 2)
      },
      {
        id: '15.9',
        title: 'Trigonometry in three dimensions',
        objectives: ['E6.6'],
        walt: 'Calculate lengths and angles between lines and planes in 3D shapes (cuboids, pyramids).',
        wilf: [
          'I can sketch and extract the relevant 2D right-angled triangle from the 3D solid.',
          'I can use 3D Pythagoras theorem d² = l² + w² + h² to find space diagonals.',
          'I can identify the angle between a line and the base plane.'
        ],
        slo: ['Find diagonal length across a cuboid.', 'Determine angle between slant edge of a pyramid and the base.'],
        keyTerms: [
          { term: 'Space diagonal', definition: 'A line segment connecting two vertices not in the same face.', indonesianGloss: 'Diagonal ruang' },
          { term: 'Projection', definition: 'The shadow or perpendicular image of a line onto a flat plane.', indonesianGloss: 'Proyeksi' }
        ],
        ealStrategies: ['Physical 3D wireframe models with coloured string for diagonals.'],
        struggledScaffolding: ['Break problem into 2 separate 2D sketches: Step 1 = Base triangle, Step 2 = Vertical triangle.'],
        extensionTasks: ['Calculate dihedral angle between two triangular faces of a regular tetrahedron.'],
        defaultFormativeExercises: {
          level1: 'Find space diagonal of a cuboid measuring 3 cm by 4 cm by 12 cm (exact integer answer = 13 cm!).',
          level2: 'Calculate angle between diagonal and base of a 6cm × 8cm × 10cm cuboid.',
          level3: 'In a square pyramid of base 10 cm and vertical height 12 cm, find length of slant edge.',
          homework: 'Coursebook 0580 Exercise 15.9, pp. 321–328, Questions 1, 4, 7.'
        },
        coursebookPages: 'Coursebook Ch 15, pp. 321–330',
        suggestedTools: ['3D wooden/perspex geometric solids', 'Pipe cleaner models'],
        defaultMeetings: generateMeetingsForSubtopic('15.9', '3D Trigonometry', 3)
      }
    ]
  },
  {
    id: 16,
    numberStr: '16',
    title: 'Scatter diagrams and correlation',
    syllabusCategory: 'Statistics',
    subtopics: [
      {
        id: '16.1',
        title: 'Introduction to bivariate data',
        objectives: ['C9.5', 'E9.5'],
        walt: 'Plot bivariate data on scatter diagrams, identify correlation types, and draw lines of best fit by eye.',
        wilf: [
          'I can plot paired coordinate points (x, y) accurately on a scatter diagram.',
          'I can describe correlation as positive, negative, or zero / no correlation.',
          'I can draw a balanced straight line of best fit through the mean point (x̄, ȳ).',
          'I can use the line of best fit to estimate values (interpolation) and identify why extrapolation is unreliable.'
        ],
        slo: ['Construct scatter diagrams.', 'Differentiate between correlation and causation.', 'Estimate values using line of best fit.'],
        keyTerms: [
          { term: 'Bivariate data', definition: 'Data involving two related variables.', indonesianGloss: 'Data bivariat' },
          { term: 'Correlation', definition: 'A statistical relationship or association between two variables.', indonesianGloss: 'Korelasi' },
          { term: 'Line of best fit', definition: 'A straight line drawn through the middle of plotted points.', indonesianGloss: 'Garis tren / best fit' },
          { term: 'Interpolation vs Extrapolation', definition: 'Estimating within the data range vs outside the known range.', indonesianGloss: 'Interpolasi vs Ekstrapolasi' }
        ],
        ealStrategies: ['Visual trend arrows: Upwards slope = Positive; Downwards slope = Negative; Random scatter = None.'],
        struggledScaffolding: ['Use integer data sets: e.g. Study hours vs Test score with whole numbers.'],
        extensionTasks: ['Analyze spurious correlation examples (e.g., ice cream sales vs shark attacks) to discuss causation.'],
        defaultFormativeExercises: {
          level1: 'State whether correlation is positive, negative, or none: Height vs Weight; Temperature vs Heating bill.',
          level2: 'Plot 6 integer points: (1, 2), (2, 4), (3, 5), (4, 7), (5, 8), (6, 10) and draw line of best fit.',
          level3: 'Use line to estimate y when x = 3.5; explain why estimating for x = 15 is unreliable.',
          homework: 'Coursebook 0580 Exercise 16.1, pp. 332–338, Questions 1, 3, 5.'
        },
        coursebookPages: 'Coursebook Ch 16, pp. 331–340',
        suggestedTools: ['Rulers', 'Desmos scatter plot generator', 'Real class height vs shoe size data'],
        defaultMeetings: generateMeetingsForSubtopic('16.1', 'Scatter diagrams and correlation', 3)
      }
    ]
  },
  {
    id: 17,
    numberStr: '17',
    title: 'Managing money',
    syllabusCategory: 'Number',
    subtopics: [
      {
        id: '17.1',
        title: 'Earning money',
        objectives: ['C1.16', 'E1.16'],
        walt: 'Calculate gross pay, overtime pay rates, bonuses, and net pay after standard deductions.',
        wilf: [
          'I can calculate basic pay: Hourly rate × Regular hours.',
          'I can calculate overtime pay using time-and-a-half (×1.5) or double-time (×2).',
          'I can calculate total gross earnings and deduct tax/insurance to find net pay.'
        ],
        slo: ['Compute wages and overtime.', 'Calculate percentage tax deductions.', 'Distinguish gross from net income.'],
        keyTerms: [
          { term: 'Gross pay', definition: 'Total earnings before any tax or deductions are removed.', indonesianGloss: 'Gaji kotor' },
          { term: 'Net pay', definition: 'Take-home pay remaining after all tax and deductions.', indonesianGloss: 'Gaji bersih' },
          { term: 'Overtime', definition: 'Hours worked beyond normal contracted hours at higher pay rate.', indonesianGloss: 'Lembur' }
        ],
        ealStrategies: ['Income formula banner: Net Pay = Gross Pay - Total Deductions.'],
        struggledScaffolding: ['Use clean integer hourly wages ($10/hr, $15/hr) and round numbers.'],
        extensionTasks: ['Calculate progressive tax across tiered brackets (0% up to $10,000, 20% on excess).'],
        defaultFormativeExercises: {
          level1: 'An employee earns $12/hour for 35 hours. Calculate weekly gross pay.',
          level2: 'Worker earns $10/hour. Overtime is paid at 1.5 times basic rate. Calculate pay for 40 basic hours + 6 overtime hours.',
          level3: 'Gross salary is $3,000. Deductions are 10% tax and $150 pension. Calculate net pay.',
          homework: 'Coursebook 0580 Exercise 17.1, pp. 342–347, Questions 2, 4, 7.'
        },
        coursebookPages: 'Coursebook Ch 17, pp. 341–348',
        suggestedTools: ['Sample payslip templates', 'Spreadsheet calculator'],
        defaultMeetings: generateMeetingsForSubtopic('17.1', 'Earning money', 2)
      },
      {
        id: '17.2',
        title: 'Borrowing and investing money',
        objectives: ['C1.13', 'E1.13'],
        walt: 'Calculate Simple Interest using I = PRT / 100 and Compound Interest using A = P(1 + r/100)ⁿ.',
        wilf: [
          'I can identify Principal (P), Rate (R), and Time in years (T).',
          'I can use I = (P × R × T) / 100 to find simple interest.',
          'I can use the multiplier (1 + r/100) and power of n for compound interest.',
          'I can calculate depreciation by subtracting the percentage: (1 - r/100)ⁿ.'
        ],
        slo: ['Calculate simple interest.', 'Calculate compound interest value over several years.', 'Contrast linear vs exponential growth.'],
        keyTerms: [
          { term: 'Simple interest', definition: 'Interest calculated only on the initial principal amount.', indonesianGloss: 'Bunga tunggal' },
          { term: 'Compound interest', definition: 'Interest calculated on both initial principal and accumulated interest.', indonesianGloss: 'Bunga majemuk' },
          { term: 'Principal', definition: 'The original sum of money borrowed or invested.', indonesianGloss: 'Modal / pokok' }
        ],
        ealStrategies: ['Side-by-side growth comparison table showing year-by-year balance.'],
        struggledScaffolding: ['Use round principals like $1,000 with 5% or 10% interest for 2 years.'],
        extensionTasks: ['Calculate depreciation of a vehicle losing 15% per year over 4 years.'],
        defaultFormativeExercises: {
          level1: 'Calculate simple interest on $500 invested at 4% per year for 3 years.',
          level2: 'Calculate total amount when $1,000 is invested at 5% compound interest for 2 years.',
          level3: 'A car bought for $20,000 depreciates by 10% each year. Find value after 3 years.',
          homework: 'Coursebook 0580 Exercise 17.2, pp. 349–356, Questions 1, 3, 5, 8.'
        },
        coursebookPages: 'Coursebook Ch 17, pp. 349–358',
        suggestedTools: ['Bank loan simulator', 'Scientific calculators'],
        defaultMeetings: generateMeetingsForSubtopic('17.2', 'Borrowing and investing', 3)
      },
      {
        id: '17.3',
        title: 'Buying and selling',
        objectives: ['C1.13', 'E1.13', 'C1.16', 'E1.16'],
        walt: 'Calculate percentage profit, loss, discount, and reverse percentages to find original cost prices.',
        wilf: [
          'I can find percentage profit: (Profit / Cost Price) × 100%.',
          'I can apply percentage discounts using decimal multipliers (e.g., 20% off = ×0.80).',
          'I can find original price before discount by dividing by the multiplier (Reverse percentage).'
        ],
        slo: ['Calculate profit or loss percentages.', 'Solve reverse percentage problems without error.'],
        keyTerms: [
          { term: 'Percentage profit', definition: '(Profit / Cost Price) × 100%.', indonesianGloss: 'Persentase keuntungan' },
          { term: 'Reverse percentage', definition: 'Finding original price before an increase or decrease.', indonesianGloss: 'Persentase terbalik' }
        ],
        ealStrategies: ['Common error warning poster: "Never subtract 20% to undo a 20% increase! Divide by 1.20 instead."'],
        struggledScaffolding: ['Use bar model diagrams: 100% block + 20% block = 120% total.'],
        extensionTasks: ['Solve multi-stage markup and discount chain problems.'],
        defaultFormativeExercises: {
          level1: 'An item bought for $40 is sold for $50. Calculate profit percentage.',
          level2: 'A jacket normally $80 is on sale with 25% discount. Find sale price.',
          level3: 'A television is sold for $360 after a 10% discount. Find original price.',
          homework: 'Coursebook 0580 Exercise 17.3, pp. 357–364, Questions 2, 4, 7, 9.'
        },
        coursebookPages: 'Coursebook Ch 17, pp. 357–366',
        suggestedTools: ['Bar model strips', 'Store discount coupons'],
        defaultMeetings: generateMeetingsForSubtopic('17.3', 'Buying and selling', 3)
      }
    ]
  },
  {
    id: 18,
    numberStr: '18',
    title: 'Curved graphs',
    syllabusCategory: 'Algebra and graphs',
    subtopics: [
      {
        id: '18.1',
        title: 'Review of quadratics graphs (parabola)',
        objectives: ['C2.10', 'E2.10'],
        walt: 'Plot quadratic functions y = ax² + bx + c and identify the vertex, axis of symmetry, and roots.',
        wilf: [
          'I can complete a table of integer values for x between -3 and +3.',
          'I can correctly square negative numbers: (-2)² = +4.',
          'I can plot coordinates smoothly without straight ruler segments.',
          'I can read the roots (x-intercepts) and minimum/maximum turning point.'
        ],
        slo: ['Construct tables of values.', 'Draw smooth parabolic curves.', 'Identify symmetry x = -b/(2a).'],
        keyTerms: [
          { term: 'Parabola', definition: 'The U-shaped curved graph of a quadratic function.', indonesianGloss: 'Parabola' },
          { term: 'Roots / x-intercepts', definition: 'The values of x where y = 0.', indonesianGloss: 'Akar / titik potong sumbu-x' }
        ],
        ealStrategies: ['Shape clue: "Positive a = Happy face U; Negative a = Sad face ∩."'],
        struggledScaffolding: ['Provide pre-calculated tables where negative squares are explicitly bracketed.'],
        extensionTasks: ['Find equation of line of symmetry and coordinates of vertex algebraically.'],
        defaultFormativeExercises: {
          level1: 'Complete table for y = x² - 4 for x = -3, -2, -1, 0, 1, 2, 3.',
          level2: 'Plot y = x² - 2x - 3 and state coordinates of minimum point.',
          level3: 'Use your graph of y = x² - 2x - 3 to solve x² - 2x - 3 = 0.',
          homework: 'Coursebook 0580 Exercise 18.1, pp. 368–374, Questions 1, 3, 5.'
        },
        coursebookPages: 'Coursebook Ch 18, pp. 368–376',
        suggestedTools: ['Graph paper grids', 'Desmos quadratic slider', 'French curves'],
        defaultMeetings: generateMeetingsForSubtopic('18.1', 'Review of quadratic graphs', 3)
      },
      {
        id: '18.2',
        title: 'Drawing reciprocal graphs (hyperbola)',
        objectives: ['C2.10', 'E2.10'],
        walt: 'Plot reciprocal functions y = k/x (k integer) and understand asymptotes at x = 0 and y = 0.',
        wilf: [
          'I can calculate y values for positive and negative integer and fractional x values.',
          'I can recognise that x = 0 is undefined (cannot divide by zero).',
          'I can draw the two separate smooth branches in opposite quadrants approaching the axes.'
        ],
        slo: ['Plot hyperbola curves.', 'Explain why the curve never touches the axes (asymptotes).'],
        keyTerms: [
          { term: 'Reciprocal function', definition: 'A function in the form y = k/x.', indonesianGloss: 'Fungsi resiprokal' },
          { term: 'Asymptote', definition: 'A line that a curve approaches closer and closer to but never touches.', indonesianGloss: 'Asimtot' }
        ],
        ealStrategies: ['Gesture: Two curved arms in Quadrants 1 and 3 that flatten towards the walls.'],
        struggledScaffolding: ['Use y = 6/x or y = 12/x with x values that are factors of 6 or 12: 1, 2, 3, 6.'],
        extensionTasks: ['Graph shifted reciprocal functions: y = 2/(x - 1) + 3 and identify new asymptotes.'],
        defaultFormativeExercises: {
          level1: 'Find values of y = 6/x for x = 1, 2, 3, 6, -1, -2, -3, -6.',
          level2: 'Plot y = 4/x for -4 ≤ x ≤ 4 (x ≠ 0).',
          level3: 'State the equations of the vertical and horizontal asymptotes for y = 4/x.',
          homework: 'Coursebook 0580 Exercise 18.2, pp. 375–380, Questions 2, 4.'
        },
        coursebookPages: 'Coursebook Ch 18, pp. 375–382',
        suggestedTools: ['Desmos reciprocal explorer', '1mm graph paper'],
        defaultMeetings: generateMeetingsForSubtopic('18.2', 'Reciprocal graphs', 2)
      },
      {
        id: '18.3',
        title: 'Using graphs to solve quadratics equations',
        objectives: ['C2.10', 'E2.10'],
        walt: 'Solve quadratic and linear-quadratic equations by finding coordinates of graph intersections.',
        wilf: [
          'I can locate where y = f(x) crosses the line y = 0 or y = k.',
          'I can rearrange f(x) = g(x) to identify what line needs to be drawn onto an existing curve.',
          'I can read x-coordinates of intersection points accurately from the grid.'
        ],
        slo: ['Solve f(x) = 0 from graph.', 'Determine the straight line y = mx + c to plot to solve derived equations.'],
        keyTerms: [
          { term: 'Intersection', definition: 'The point where two graphs meet or cross.', indonesianGloss: 'Titik potong' }
        ],
        ealStrategies: ['Color-coding: Curve in Blue, intersecting line in Red, drop vertical dashed line to x-axis in Green.'],
        struggledScaffolding: ['Start with horizontal lines y = 4 before sloping lines y = 2x + 1.'],
        extensionTasks: ['Determine number of solutions based on whether line is tangent, secant, or does not intersect.'],
        defaultFormativeExercises: {
          level1: 'Given graph of y = x² - 4, state solutions to x² - 4 = 0.',
          level2: 'Use graph of y = x² - 3x to solve x² - 3x = 4 by drawing the line y = 4.',
          level3: 'What line must be drawn on y = x² - 2x to solve x² - 3x - 1 = 0?',
          homework: 'Coursebook 0580 Exercise 18.3, pp. 381–386, Questions 1, 3, 6.'
        },
        coursebookPages: 'Coursebook Ch 18, pp. 381–388',
        suggestedTools: ['Clear plastic rulers', 'Pre-printed graph sheets'],
        defaultMeetings: generateMeetingsForSubtopic('18.3', 'Solving equations graphically', 3)
      },
      {
        id: '18.4',
        title: 'Simultaneous linear and non-linear equations',
        objectives: ['E2.10'],
        walt: 'Solve simultaneous equations where one is linear and one is quadratic algebraically and graphically.',
        wilf: [
          'I can rearrange the linear equation to make y or x the subject.',
          'I can substitute this expression into the quadratic equation.',
          'I can solve the resulting single-variable quadratic to get two x values.',
          'I can substitute each x back to find the corresponding y values, writing answers as pairs.'
        ],
        slo: ['Solve pairs like y = x² and y = x + 2.', 'Verify answers correspond to intersection points.'],
        keyTerms: [
          { term: 'Non-linear', definition: 'An equation containing powers of variables other than 1.', indonesianGloss: 'Non-linear' }
        ],
        ealStrategies: ['Pair organizer: (x₁, y₁) and (x₂, y₂) clearly bracketed together.'],
        struggledScaffolding: ['Use clean integer solutions (e.g. x = 2 and x = -1).'],
        extensionTasks: ['Interpret geometric meaning: Secant line (2 solutions), Tangent (1 solution), No intersection (0).'],
        defaultFormativeExercises: {
          level1: 'Solve: y = x² and y = 2x + 3.',
          level2: 'Solve: y = x² - x and y = 2x + 4.',
          level3: 'Solve: x² + y² = 25 and y = x - 1.',
          homework: 'Coursebook 0580 Exercise 18.4, pp. 387–392, Questions 2, 5, 8.'
        },
        coursebookPages: 'Coursebook Ch 18, pp. 387–394',
        suggestedTools: ['Desmos intersection calculator', 'Algebraic templates'],
        defaultMeetings: generateMeetingsForSubtopic('18.4', 'Simultaneous non-linear equations', 4)
      },
      {
        id: '18.5',
        title: 'Other non-linear graphs',
        objectives: ['E2.10'],
        walt: 'Recognise and sketch cubic graphs y = ax³, exponential graphs y = aˣ, and circle graphs x² + y² = r².',
        wilf: [
          'I can identify characteristic shapes: Cubic (S-curve), Exponential (J-curve), Circle (radius r).',
          'I can plot integer points and identify y-intercepts (e.g., 2⁰ = 1 for exponential).',
          'I can determine radius and center of x² + y² = r².'
        ],
        slo: ['Sketch cubic and exponential curves.', 'State key features including asymptotes and intercepts.'],
        keyTerms: [
          { term: 'Cubic graph', definition: 'Graph of degree 3 with turning points or point of inflection.', indonesianGloss: 'Grafik fungsi kubik' },
          { term: 'Exponential graph', definition: 'Graph of the form y = aˣ featuring rapid growth or decay.', indonesianGloss: 'Grafik eksponensial' }
        ],
        ealStrategies: ['Shape matching flashcards: Name, Formula, and Curve silhouette.'],
        struggledScaffolding: ['Calculate integer powers of 2 (2¹, 2², 2³) to see exponential doubling.'],
        extensionTasks: ['Model population growth or bacteria doubling using y = A · 2ᵗ.'],
        defaultFormativeExercises: {
          level1: 'Sketch y = x³ for x between -2 and +2.',
          level2: 'Calculate values of y = 2ˣ for x = -1, 0, 1, 2, 3 and sketch curve.',
          level3: 'State center and radius of circle x² + y² = 49.',
          homework: 'Coursebook 0580 Exercise 18.5, pp. 393–398, Questions 1, 3, 7.'
        },
        coursebookPages: 'Coursebook Ch 18, pp. 393–400',
        suggestedTools: ['Graph matching cards', 'GeoGebra 3D/2D curve gallery'],
        defaultMeetings: generateMeetingsForSubtopic('18.5', 'Other non-linear graphs', 2)
      },
      {
        id: '18.6',
        title: 'Finding the gradient of a curve',
        objectives: ['E2.12'],
        walt: 'Estimate the gradient of a curve at a given point by constructing an accurate tangent line.',
        wilf: [
          'I can locate the specified point on the curve.',
          'I can position a clear ruler to touch the curve at that single point without crossing it (tangent).',
          'I can pick two well-spaced integer grid points on the tangent line.',
          'I can calculate gradient = (y₂ - y₁) / (x₂ - x₁).'
        ],
        slo: ['Draw tangents to curved graphs.', 'Calculate rate of change as the gradient of the tangent.'],
        keyTerms: [
          { term: 'Tangent', definition: 'A straight line that touches a curve at a single point without crossing it.', indonesianGloss: 'Garis singgung' },
          { term: 'Gradient', definition: 'The steepness or rate of change (Rise over Run).', indonesianGloss: 'Kemiringan / gradien' }
        ],
        ealStrategies: ['Ruler balancing technique: Rock the ruler until the gap angles on either side are equal.'],
        struggledScaffolding: ['Use large transparent rulers and draw a large right triangle (run of at least 4 units) for accuracy.'],
        extensionTasks: ['Relate tangent gradient to instantaneous speed on a distance-time curve.'],
        defaultFormativeExercises: {
          level1: 'Draw a tangent to y = x² at x = 2 and calculate its gradient.',
          level2: 'Estimate gradient of curve at its turning point (gradient = 0).',
          level3: 'Given a speed-time curve, find acceleration at t = 3 seconds by drawing a tangent.',
          homework: 'Coursebook 0580 Exercise 18.6, pp. 399–404, Questions 1, 3, 5.'
        },
        coursebookPages: 'Coursebook Ch 18, pp. 399–406',
        suggestedTools: ['Clear transparent 30cm rulers', 'Curve tangent worksheets'],
        defaultMeetings: generateMeetingsForSubtopic('18.6', 'Gradient of a curve', 2)
      },
      {
        id: '18.7',
        title: 'Derivatives of functions',
        objectives: ['E2.12'],
        walt: 'Differentiate polynomial functions using the power rule d/dx(xⁿ) = n·xⁿ⁻¹ to calculate instantaneous gradients.',
        wilf: [
          'I can bring the existing power down to multiply the coefficient.',
          'I can reduce the power by 1: if y = x³, dy/dx = 3x².',
          'I can know that constant terms differentiate to zero (d/dx(c) = 0).',
          'I can substitute an integer x value to find the exact gradient.'
        ],
        slo: ['Differentiate terms like 3x² - 5x + 4.', 'Calculate exact gradients without drawing tangents.'],
        keyTerms: [
          { term: 'Derivative / dy/dx', definition: 'The algebraic formula for the gradient of a curve at any point x.', indonesianGloss: 'Turunan / diferensiasi' },
          { term: 'Power rule', definition: 'Rule: multiply by current power, then subtract 1 from power.', indonesianGloss: 'Aturan pangkat' }
        ],
        ealStrategies: ['Action chant: "Multiply by the power, drop the power by one!"'],
        struggledScaffolding: ['Start with pure integer powers: y = x², y = x³, y = 4x² before multi-term polynomials.'],
        extensionTasks: ['Find coordinates of stationary points where dy/dx = 0.'],
        defaultFormativeExercises: {
          level1: 'Find dy/dx for y = x⁴ and y = 5x².',
          level2: 'Differentiate y = 2x³ - 4x² + 7x - 9.',
          level3: 'Find gradient of y = x² - 3x + 2 at x = 4.',
          homework: 'Coursebook 0580 Exercise 18.7, pp. 405–410, Questions 1, 3, 6, 9.'
        },
        coursebookPages: 'Coursebook Ch 18, pp. 405–412',
        suggestedTools: ['Derivative power rule summary card', 'Whiteboard speed drill'],
        defaultMeetings: generateMeetingsForSubtopic('18.7', 'Derivatives of functions', 3)
      }
    ]
  },
  {
    id: 19,
    numberStr: '19',
    title: 'Symmetry',
    syllabusCategory: 'Geometry and measure',
    subtopics: [
      {
        id: '19.1',
        title: 'Symmetry in two dimensions',
        objectives: ['C4.5', 'E4.5'],
        walt: 'Identify lines of symmetry and order of rotational symmetry in regular and irregular 2D polygons.',
        wilf: [
          'I can fold or draw mirror lines that split a shape into congruent halves.',
          'I can rotate a shape through 360° and count how many times it fits onto its original outline (order).',
          'I can state that a regular n-gon has n lines of symmetry and rotational order n.'
        ],
        slo: ['Determine lines of symmetry in 2D shapes.', 'Find order of rotational symmetry.', 'Complete symmetric patterns on grids.'],
        keyTerms: [
          { term: 'Line of symmetry', definition: 'A reflection line dividing a figure into two identical mirror images.', indonesianGloss: 'Sumbu simetri' },
          { term: 'Rotational symmetry', definition: 'When a shape looks identical after a rotation of less than 360°.', indonesianGloss: 'Simetri putar' },
          { term: 'Order of rotational symmetry', definition: 'The number of times a shape maps onto itself in one full 360° turn.', indonesianGloss: 'Tingkat simetri putar' }
        ],
        ealStrategies: ['Tracing paper overlay technique: Pin center with pencil, rotate 360° counting matches.'],
        struggledScaffolding: ['Use physical plastic regular polygon tiles (triangle, square, pentagon, hexagon).'],
        extensionTasks: ['Design a logo having rotational symmetry order 4 and no lines of symmetry.'],
        defaultFormativeExercises: {
          level1: 'State lines of symmetry and rotational order for a rectangle and an equilateral triangle.',
          level2: 'Draw all lines of symmetry on a regular hexagon.',
          level3: 'Shade two more squares on a 4x4 grid so the pattern has rotational symmetry order 2.',
          homework: 'Coursebook 0580 Exercise 19.1, pp. 414–419, Questions 1, 4, 7.'
        },
        coursebookPages: 'Coursebook Ch 19, pp. 414–420',
        suggestedTools: ['Tracing paper', 'Mira reflection mirrors', 'Polygon cutouts'],
        defaultMeetings: generateMeetingsForSubtopic('19.1', '2D Symmetry', 2)
      },
      {
        id: '19.2',
        title: 'Symmetry in three dimensions',
        objectives: ['E4.5'],
        walt: 'Identify planes of symmetry and axes of rotational symmetry in 3D prisms, pyramids, and cylinders.',
        wilf: [
          'I can visualize flat cutting planes that divide a 3D solid into two mirror-image halves.',
          'I can count the 9 planes of symmetry of a cube.',
          'I can identify axes of rotational symmetry in square-based pyramids and cuboids.'
        ],
        slo: ['Count planes of symmetry in standard 3D solids.', 'Sketch cross-sectional reflection planes.'],
        keyTerms: [
          { term: 'Plane of symmetry', definition: 'A flat 2D plane passing through a 3D solid dividing it into two mirror halves.', indonesianGloss: 'Bidang simetri' },
          { term: 'Axis of symmetry', definition: 'An imaginary line about which a 3D solid can rotate to look identical.', indonesianGloss: 'Sumbu rotasi' }
        ],
        ealStrategies: ['Clay cutting activity: Plastic knife cutting play-dough cuboids to see mirror halves.'],
        struggledScaffolding: ['Start with cuboid planes of symmetry (3 planes parallel to faces) before diagonal planes.'],
        extensionTasks: ['Investigate planes of symmetry in a regular tetrahedron.'],
        defaultFormativeExercises: {
          level1: 'How many planes of symmetry does a non-cube rectangular cuboid have? (3)',
          level2: 'State number of planes of symmetry in a square-based pyramid.',
          level3: 'List all 9 planes of symmetry in a cube (3 parallel to faces, 6 diagonal).',
          homework: 'Coursebook 0580 Exercise 19.2, pp. 421–425, Questions 1, 3, 5.'
        },
        coursebookPages: 'Coursebook Ch 19, pp. 421–426',
        suggestedTools: ['Play-dough & plastic slicers', 'Clear plastic 3D geometric solids'],
        defaultMeetings: generateMeetingsForSubtopic('19.2', '3D Symmetry', 2)
      },
      {
        id: '19.3',
        title: 'Symmetry properties of circles',
        objectives: ['E4.8'],
        walt: 'Apply circle symmetry properties involving chords, perpendicular bisectors, and tangents from an external point.',
        wilf: [
          'I can recall that the perpendicular from center O to a chord bisects the chord.',
          'I can recall that tangents from an external point to a circle are equal in length.',
          'I can form right-angled triangles using the radius to chord or tangent and apply Pythagoras theorem.'
        ],
        slo: ['Calculate chord lengths and distance from center.', 'Find lengths of tangents from an external point.'],
        keyTerms: [
          { term: 'Chord', definition: 'A line segment connecting two points on the circumference.', indonesianGloss: 'Tali busur' },
          { term: 'Perpendicular bisector', definition: 'A line cutting another segment in half at 90°.', indonesianGloss: 'Garis bagi tegak lurus' },
          { term: 'Tangent to a circle', definition: 'A line touching the circle at exactly one point, forming 90° with radius.', indonesianGloss: 'Garis singgung lingkaran' }
        ],
        ealStrategies: ['Circle anatomy poster: Center, Radius, Chord, Tangent, Perpendicular bisector.'],
        struggledScaffolding: ['Use Pythagorean integer triples (3-4-5, 5-12-13, 6-8-10) for radius and chord calculations.'],
        extensionTasks: ['Prove that the angle between a tangent and chord equals the angle in alternate segment.'],
        defaultFormativeExercises: {
          level1: 'A chord of length 8 cm is in a circle of radius 5 cm. Find its perpendicular distance from center.',
          level2: 'Two tangents are drawn from point T to circle center O of radius 6 cm. If OT = 10 cm, find length of tangents.',
          level3: 'A chord is 6 cm from center of a circle of radius 10 cm. Find the length of the chord.',
          homework: 'Coursebook 0580 Exercise 19.3, pp. 427–432, Questions 2, 4, 7.'
        },
        coursebookPages: 'Coursebook Ch 19, pp. 427–434',
        suggestedTools: ['Compass and straightedge', 'GeoGebra dynamic circle'],
        defaultMeetings: generateMeetingsForSubtopic('19.3', 'Symmetry properties of circles', 3)
      },
      {
        id: '19.4',
        title: 'Angle relationships in circles',
        objectives: ['C4.7', 'E4.7'],
        walt: 'Calculate unknown angles using Cambridge circle theorems (angle at center, semicircle, cyclic quadrilateral).',
        wilf: [
          'I can recall that the angle subtended at the center is twice the angle at the circumference (2θ vs θ).',
          'I can recall that the angle in a semicircle is a right angle (90°).',
          'I can recall that angles in the same segment subtended by the same arc are equal.',
          'I can recall that opposite angles of a cyclic quadrilateral sum to 180°.'
        ],
        slo: ['State exact geometric reasons for each circle angle calculation.', 'Solve multi-step circle angle problems.'],
        keyTerms: [
          { term: 'Subtended angle', definition: 'An angle created by connecting the endpoints of an arc.', indonesianGloss: 'Sudut keliling / pusat' },
          { term: 'Cyclic quadrilateral', definition: 'A 4-sided polygon whose 4 vertices all lie on a circle.', indonesianGloss: 'Segi empat tali busur' },
          { term: 'Alternate segment', definition: 'The segment on the opposite side of a chord from a tangent.', indonesianGloss: 'Tembereng selang-seling' }
        ],
        ealStrategies: ['Cambridge reason cheat sheet: "Angle at centre is twice angle at circumference", "Opposite angles of cyclic quad = 180°".'],
        struggledScaffolding: ['Highlight the arc in red and trace the lines going up to the circumference like an arrowhead or bow-tie.'],
        extensionTasks: ['Solve composite problems requiring alternate segment theorem.'],
        defaultFormativeExercises: {
          level1: 'Angle at circumference is 35°. Find angle at center standing on same arc (70°).',
          level2: 'Diameter AB forms triangle ACB on circumference. If angle A = 40°, find angle B.',
          level3: 'In cyclic quadrilateral ABCD, angle A = 75° and angle B = 110°. Find angles C and D.',
          homework: 'Coursebook 0580 Exercise 19.4, pp. 433–440, Questions 1, 3, 5, 8.'
        },
        coursebookPages: 'Coursebook Ch 19, pp. 433–442',
        suggestedTools: ['Bow-tie & arrowhead visual cards', 'Whiteboards'],
        defaultMeetings: generateMeetingsForSubtopic('19.4', 'Circle theorems', 4)
      }
    ]
  },
  {
    id: 20,
    numberStr: '20',
    title: 'Histograms and cumulative frequency diagrams',
    syllabusCategory: 'Statistics',
    subtopics: [
      {
        id: '20.1',
        title: 'Histogram',
        objectives: ['E9.7'],
        walt: 'Construct and interpret histograms with unequal class intervals using Frequency Density = Frequency / Class Width.',
        wilf: [
          'I can calculate the class width for each group (Upper boundary - Lower boundary).',
          'I can calculate Frequency Density (FD) = Frequency ÷ Class Width.',
          'I can plot Frequency Density on the vertical y-axis and continuous variable on horizontal x-axis.',
          'I can calculate the frequency represented by a bar as its Area (Area = Width × FD).'
        ],
        slo: ['Compute frequency density values.', 'Draw accurate histograms with unequal bars.', 'Estimate frequencies from histogram areas.'],
        keyTerms: [
          { term: 'Histogram', definition: 'A graphical display of continuous data where bar AREA represents frequency.', indonesianGloss: 'Histogram' },
          { term: 'Frequency density', definition: 'Frequency divided by class interval width (FD = F / CW).', indonesianGloss: 'Kerapatan frekuensi' },
          { term: 'Continuous data', definition: 'Data that can take any numeric value within an interval (e.g. time, mass, height).', indonesianGloss: 'Data kontinu' }
        ],
        ealStrategies: ['Golden Rule Banner: "In a histogram, AREA = FREQUENCY, NOT height!"'],
        struggledScaffolding: ['Use clean integer class widths (5, 10, 20) and frequencies divisible by width (e.g., F=30, CW=10, FD=3).'],
        extensionTasks: ['Estimate the median of a continuous distribution from a histogram.'],
        defaultFormativeExercises: {
          level1: 'Class interval 20 ≤ x < 30 has frequency 20. Calculate class width and frequency density.',
          level2: 'Given interval 0 ≤ x < 10 (F=15), 10 ≤ x < 20 (F=25), 20 ≤ x < 40 (F=30). Find FD for each.',
          level3: 'A bar has width 15 and frequency density 2.4. Find the number of items represented by this bar.',
          homework: 'Coursebook 0580 Exercise 20.1, pp. 444–450, Questions 1, 3, 6.'
        },
        coursebookPages: 'Coursebook Ch 20, pp. 444–452',
        suggestedTools: ['Calculators', 'Pre-formatted frequency density tables', 'Graph paper'],
        defaultMeetings: generateMeetingsForSubtopic('20.1', 'Histograms', 3)
      },
      {
        id: '20.2',
        title: 'Cumulative frequency',
        objectives: ['E9.6'],
        walt: 'Construct cumulative frequency tables, draw smooth S-shaped curves (ogives), and estimate Median and IQR.',
        wilf: [
          'I can calculate cumulative frequency by running a progressive running total.',
          'I can plot points at UPPER class boundaries against cumulative frequency.',
          'I can draw a smooth S-curve starting at (lowest boundary, 0).',
          'I can read Median (at n/2), Lower Quartile Q1 (at n/4), Upper Quartile Q3 (at 3n/4), and calculate IQR = Q3 - Q1.'
        ],
        slo: ['Calculate running totals.', 'Draw cumulative frequency curves.', 'Estimate median, quartiles, and 90th percentile.'],
        keyTerms: [
          { term: 'Cumulative frequency', definition: 'The running sum of all frequencies up to a certain value.', indonesianGloss: 'Frekuensi kumulatif' },
          { term: 'Median (Q2)', definition: 'The middle value (50th percentile) at position n/2.', indonesianGloss: 'Median / Kuartil tengah' },
          { term: 'Interquartile Range (IQR)', definition: 'The spread of the middle 50% of data (IQR = Q3 - Q1).', indonesianGloss: 'Jangkauan interkuartil' }
        ],
        ealStrategies: ['Quartile position map: n/4 = 25% (Q1), n/2 = 50% (Median), 3n/4 = 75% (Q3).'],
        struggledScaffolding: ['Use total frequencies of round numbers like n = 40, 80, or 100 so quarters are clean integers (10, 20, 30).'],
        extensionTasks: ['Construct a box-and-whisker plot directly below the cumulative frequency curve.'],
        defaultFormativeExercises: {
          level1: 'A sample has n = 80. State the cumulative frequency values where you read Q1, Median, and Q3.',
          level2: 'Given frequencies 5, 12, 18, 10, 5, construct the cumulative frequency table.',
          level3: 'From a cumulative frequency graph, Q1 = 42 kg, Q3 = 68 kg. Calculate the Interquartile Range.',
          homework: 'Coursebook 0580 Exercise 20.2, pp. 451–458, Questions 2, 4, 7.'
        },
        coursebookPages: 'Coursebook Ch 20, pp. 451–460',
        suggestedTools: ['Rulers', 'Ogives pre-printed grids', 'Box-plot comparison template'],
        defaultMeetings: generateMeetingsForSubtopic('20.2', 'Cumulative frequency', 4)
      }
    ]
  },
  {
    id: 21,
    numberStr: '21',
    title: 'Ratio, rate and proportion',
    syllabusCategory: 'Number',
    subtopics: [
      {
        id: '21.1',
        title: 'Working with ratios',
        objectives: ['C1.11', 'E1.11'],
        walt: 'Simplify ratios, divide quantities into given ratios, and solve unitary ratio problems.',
        wilf: [
          'I can simplify ratios to lowest terms by dividing by highest common factor.',
          'I can find total parts by adding ratio numbers together.',
          'I can calculate value of one part: Total Quantity ÷ Total Parts.',
          'I can multiply one part by each ratio number to find individual shares.'
        ],
        slo: ['Simplify integer and fraction ratios.', 'Divide $120 in ratio 2:3:5.', 'Solve difference ratio questions.'],
        keyTerms: [
          { term: 'Ratio', definition: 'A comparison of two or more quantities having the same units.', indonesianGloss: 'Perbandingan / Rasio' },
          { term: 'Unitary method', definition: 'Finding the value of one single part first.', indonesianGloss: 'Metode satuan' }
        ],
        ealStrategies: ['Bar model strips: Draw 2 boxes for Alice, 3 boxes for Bob, 5 boxes for Charlie.'],
        struggledScaffolding: ['Use numbers where total quantity divides exactly by sum of parts (e.g., $60 in 1:2:3 -> 6 parts -> $10 each).'],
        extensionTasks: ['Solve algebraic ratio problems: If (x + 2) : (2x - 1) = 3 : 4, find x.'],
        defaultFormativeExercises: {
          level1: 'Simplify ratio 15 : 25 and 18 : 24.',
          level2: 'Divide $60 in the ratio 2 : 3.',
          level3: 'A and B share money in ratio 3 : 5. If B gets $40 more than A, find total money shared.',
          homework: 'Coursebook 0580 Exercise 21.1, pp. 462–468, Questions 1, 4, 8, 11.'
        },
        coursebookPages: 'Coursebook Ch 21, pp. 462–470',
        suggestedTools: ['Interlocking counting cubes', 'Bar model templates'],
        defaultMeetings: generateMeetingsForSubtopic('21.1', 'Working with ratios', 3)
      },
      {
        id: '21.2',
        title: 'Ratio and scales',
        objectives: ['C1.11', 'E1.11'],
        walt: 'Apply scale factors to lengths, areas (k²), and volumes (k³) in similar geometric figures.',
        wilf: [
          'I can find linear scale factor k = New Length ÷ Original Length.',
          'I can use Area Scale Factor = k² to find unknown surface areas.',
          'I can use Volume Scale Factor = k³ to find unknown capacities or masses.'
        ],
        slo: ['Calculate lengths of similar shapes.', 'Apply k² for area and k³ for volume correctly.'],
        keyTerms: [
          { term: 'Similar figures', definition: 'Shapes with identical angles and proportional corresponding sides.', indonesianGloss: 'Bangun sebangun' },
          { term: 'Scale factor', definition: 'The multiplier used to enlarge or reduce a shape.', indonesianGloss: 'Faktor skala' }
        ],
        ealStrategies: ['Power rule for dimensions: 1D length -> k; 2D area -> k²; 3D volume -> k³.'],
        struggledScaffolding: ['Use integer scale factors k = 2 or k = 3 so k² = 4, 9 and k³ = 8, 27.'],
        extensionTasks: ['Given ratio of volumes is 27 : 64, find ratio of surface areas.'],
        defaultFormativeExercises: {
          level1: 'Two similar rectangles have lengths 4 cm and 8 cm. Find scale factor k.',
          level2: 'Scale factor between two cylinders is 3. Smaller has area 10 cm². Find larger area.',
          level3: 'Two similar bottles have heights 10 cm and 20 cm. Small bottle holds 250 ml. Find capacity of large bottle.',
          homework: 'Coursebook 0580 Exercise 21.2, pp. 469–475, Questions 2, 5, 9.'
        },
        coursebookPages: 'Coursebook Ch 21, pp. 469–476',
        suggestedTools: ['Similar 3D nesting boxes', 'Area expansion visual cards'],
        defaultMeetings: generateMeetingsForSubtopic('21.2', 'Ratio and scales', 3)
      },
      {
        id: '21.3',
        title: 'Rates',
        objectives: ['C1.12', 'E1.12'],
        walt: 'Calculate unit rates for speed, density, pressure, and convert compound units (km/h to m/s).',
        wilf: [
          'I can use the triangle formula Speed = Distance ÷ Time.',
          'I can convert minutes to decimal hours (e.g. 30 min = 0.5 h; 15 min = 0.25 h).',
          'I can calculate Average Speed = Total Distance ÷ Total Time (never average the speeds!).'
        ],
        slo: ['Compute speed, distance, time.', 'Convert between km/h and m/s (÷ 3.6).', 'Calculate density and pressure.'],
        keyTerms: [
          { term: 'Rate', definition: 'A comparison of two quantities measured in different units.', indonesianGloss: 'Laju / kecepatan' },
          { term: 'Average speed', definition: 'Total distance divided by total elapsed time.', indonesianGloss: 'Kecepatan rata-rata' }
        ],
        ealStrategies: ['Formula triangles: D over S×T; Mass over Density×Volume.'],
        struggledScaffolding: ['Avoid awkward minutes like 23 min initially; use 30 min (0.5 hr), 1 hr, 2 hr.'],
        extensionTasks: ['Convert 72 km/h into m/s showing dimensional analysis.'],
        defaultFormativeExercises: {
          level1: 'A train travels 120 km in 2 hours. Calculate average speed.',
          level2: 'A cyclist travels 15 km in 30 minutes. Find speed in km/h.',
          level3: 'Car drives 60 km at 30 km/h, then 60 km at 60 km/h. Find average speed for whole journey.',
          homework: 'Coursebook 0580 Exercise 21.3, pp. 477–483, Questions 1, 3, 7.'
        },
        coursebookPages: 'Coursebook Ch 21, pp. 477–484',
        suggestedTools: ['Stopwatches', 'Speed-distance formula triangle cards'],
        defaultMeetings: generateMeetingsForSubtopic('21.3', 'Rates', 3)
      },
      {
        id: '21.4',
        title: 'Kinematic graphs',
        objectives: ['E2.9'],
        walt: 'Interpret distance-time and speed-time graphs, finding velocity, acceleration, and total distance.',
        wilf: [
          'I can state that gradient of distance-time graph = speed.',
          'I can state that gradient of speed-time graph = acceleration.',
          'I can calculate total distance travelled as the Area under the speed-time graph (triangles + rectangles + trapezia).'
        ],
        slo: ['Interpret horizontal lines on distance-time (stationary) vs speed-time (constant speed).', 'Compute area under curve.'],
        keyTerms: [
          { term: 'Distance-time graph', definition: 'Graph showing position over time.', indonesianGloss: 'Grafik jarak-waktu' },
          { term: 'Speed-time graph', definition: 'Graph showing speed over time.', indonesianGloss: 'Grafik kecepatan-waktu' },
          { term: 'Acceleration', definition: 'Rate of change of speed (gradient of speed-time graph).', indonesianGloss: 'Percepatan' }
        ],
        ealStrategies: ['Side-by-side comparison chart: "What does a flat horizontal line mean on Graph A vs Graph B?"'],
        struggledScaffolding: ['Break the area under speed-time graph into simple geometric shapes: 1 rectangle and 1 triangle.'],
        extensionTasks: ['Calculate deceleration from negative gradients and convert units.'],
        defaultFormativeExercises: {
          level1: 'A car accelerates from 0 to 20 m/s in 5 seconds. Find acceleration (gradient).',
          level2: 'Calculate area of a triangular speed-time graph: base 10 s, height 15 m/s.',
          level3: 'A car travels at 20 m/s for 10 s, then decelerates to rest in 5 s. Find total distance travelled.',
          homework: 'Coursebook 0580 Exercise 21.4, pp. 485–492, Questions 2, 4, 8.'
        },
        coursebookPages: 'Coursebook Ch 21, pp. 485–494',
        suggestedTools: ['Motion sensor / ticker-timer', 'Pre-printed velocity graphs'],
        defaultMeetings: generateMeetingsForSubtopic('21.4', 'Kinematic graphs', 3)
      },
      {
        id: '21.5',
        title: 'Proportions',
        objectives: ['C1.11', 'E1.11'],
        walt: 'Solve direct and inverse proportion problems using unitary methods and proportional multipliers.',
        wilf: [
          'I can recognise direct proportion: as one increases, the other increases at the same rate.',
          'I can recognise inverse proportion: as one increases, the other decreases (e.g. workers vs time).',
          'I can solve using constant product for inverse proportion: Worker₁ × Time₁ = Worker₂ × Time₂.'
        ],
        slo: ['Solve recipe scaling problems.', 'Solve worker/job time inverse proportion problems.'],
        keyTerms: [
          { term: 'Direct proportion', definition: 'Two quantities whose ratio remains constant (y = kx).', indonesianGloss: 'Perbandingan senilai' },
          { term: 'Inverse proportion', definition: 'Two quantities whose product remains constant (xy = k).', indonesianGloss: 'Perbandingan berbalik nilai' }
        ],
        ealStrategies: ['Table headers: "More workers = LESS time (Multiply sideways, not cross-multiply!)"'],
        struggledScaffolding: ['Use clean integer scenarios: 4 workers take 6 hours -> Total man-hours = 24.'],
        extensionTasks: ['Solve composite proportion involving 3 variables: workers, days, and meters of road.'],
        defaultFormativeExercises: {
          level1: '3 pens cost $6. Find cost of 7 pens.',
          level2: 'A recipe for 4 people needs 200g flour. How much flour for 6 people?',
          level3: '4 builders take 6 days to build a wall. How many days will 3 builders take at same rate?',
          homework: 'Coursebook 0580 Exercise 21.5, pp. 493–498, Questions 1, 3, 6, 9.'
        },
        coursebookPages: 'Coursebook Ch 21, pp. 493–500',
        suggestedTools: ['Recipe cards', 'Proportion comparison tables'],
        defaultMeetings: generateMeetingsForSubtopic('21.5', 'Proportions', 2)
      },
      {
        id: '21.6',
        title: 'Direct and inverse proportions in algebraic terms',
        objectives: ['E2.8'],
        walt: 'Set up algebraic variation equations y = kxⁿ and y = k/xⁿ, find constant k, and calculate unknown values.',
        wilf: [
          'I can translate "y is directly proportional to x²" into y = kx².',
          'I can translate "y is inversely proportional to √x" into y = k / √x.',
          'I can substitute given initial values of x and y to find the integer value of k.',
          'I can rewrite the full formula with k and substitute new values.'
        ],
        slo: ['Write equations with constant of proportionality k.', 'Solve variation problems involving powers and roots.'],
        keyTerms: [
          { term: 'Constant of proportionality (k)', definition: 'The constant multiplier relating two variables.', indonesianGloss: 'Konstanta proporsionalitas' }
        ],
        ealStrategies: ['4-step routine poster: 1. Write equation with k; 2. Plug in values; 3. Find k; 4. Answer question.'],
        struggledScaffolding: ['Keep k as a simple whole integer (k = 2, 3, 5, 10).'],
        extensionTasks: ['Describe the percentage effect on y when x is doubled in y = k/x².'],
        defaultFormativeExercises: {
          level1: 'y is proportional to x. When x = 3, y = 12. Find k and find y when x = 5.',
          level2: 'y is directly proportional to x². When x = 2, y = 20. Find formula and find y when x = 3.',
          level3: 'y is inversely proportional to x. When x = 4, y = 6. Find value of y when x = 8.',
          homework: 'Coursebook 0580 Exercise 21.6, pp. 499–506, Questions 2, 4, 7, 10.'
        },
        coursebookPages: 'Coursebook Ch 21, pp. 499–508',
        suggestedTools: ['4-step routine organizer', 'Mini-whiteboards'],
        defaultMeetings: generateMeetingsForSubtopic('21.6', 'Algebraic proportion', 3)
      }
    ]
  },
  {
    id: 22,
    numberStr: '22',
    title: 'More equations, formulae and functions',
    syllabusCategory: 'Algebra and graphs',
    subtopics: [
      {
        id: '22.1',
        title: 'Setting up equations to solve problems',
        objectives: ['C2.5', 'E2.5'],
        walt: 'Translate word problems involving perimeters, ages, consecutive integers, and angles into linear equations.',
        wilf: [
          'I can define a variable clearly: "Let x = ...".',
          'I can express other quantities in terms of x (e.g. consecutive numbers: x, x+1, x+2).',
          'I can form an equation equating expressions to the given total.',
          'I can solve for x and answer the original question with units.'
        ],
        slo: ['Formulate linear equations from geometric and practical descriptions.', 'Verify solutions in original context.'],
        keyTerms: [
          { term: 'Consecutive integers', definition: 'Numbers that follow each other in order without gaps (n, n+1, n+2).', indonesianGloss: 'Bilangan berurutan' }
        ],
        ealStrategies: ['Key word dictionary: "Sum = add", "Difference = subtract", "Product = multiply", "Is = equals".'],
        struggledScaffolding: ['Use perimeter of rectangles where length is 3 cm longer than width.'],
        extensionTasks: ['Set up quadratic equations from Pythagoras theorem word problems.'],
        defaultFormativeExercises: {
          level1: 'The sum of three consecutive integers is 36. Find the numbers.',
          level2: 'A rectangle has length (x + 4) cm and width x cm. Perimeter is 32 cm. Find x.',
          level3: 'The angles of a triangle are x°, (2x)°, and (x + 20)°. Find all three angles.',
          homework: 'Coursebook 0580 Exercise 22.1, pp. 510–516, Questions 1, 3, 5, 8.'
        },
        coursebookPages: 'Coursebook Ch 22, pp. 510–518',
        suggestedTools: ['Sentence strip translation cards', 'Whiteboards'],
        defaultMeetings: generateMeetingsForSubtopic('22.1', 'Setting up equations', 3)
      },
      {
        id: '22.2',
        title: 'Using and transforming formulae',
        objectives: ['C2.5', 'E2.5'],
        walt: 'Rearrange complex algebraic formulae to make a specified variable the subject.',
        wilf: [
          'I can use inverse operations in reverse BIDMAS order.',
          'I can collect all terms containing the target variable on one side.',
          'I can factorise out the common target variable if it appears more than once.',
          'I can divide by the bracket to isolate the subject.'
        ],
        slo: ['Rearrange linear and quadratic formulae.', 'Rearrange formulae where subject appears twice (e.g., ax + b = cx + d).'],
        keyTerms: [
          { term: 'Subject of a formula', definition: 'The single variable isolated on one side of the equals sign.', indonesianGloss: 'Subjek rumus' },
          { term: 'Inverse operation', definition: 'The operation that reverses another (+ and -, × and ÷, ² and √).', indonesianGloss: 'Operasi invers' }
        ],
        ealStrategies: ['Onion peeling model: Draw circles around terms from outside inwards to peel layers.'],
        struggledScaffolding: ['Start with formulas where target appears once: v = u + at, y = mx + c.'],
        extensionTasks: ['Make x the subject of y = (x + 1) / (x - 2).'],
        defaultFormativeExercises: {
          level1: 'Make t the subject of v = u + at.',
          level2: 'Make r the subject of A = πr².',
          level3: 'Make x the subject of ax - y = bx + z.',
          homework: 'Coursebook 0580 Exercise 22.2, pp. 517–523, Questions 2, 4, 7, 11.'
        },
        coursebookPages: 'Coursebook Ch 22, pp. 517–524',
        suggestedTools: ['Balance beam visual', 'Formula rearrangement flowcharts'],
        defaultMeetings: generateMeetingsForSubtopic('22.2', 'Transforming formulae', 3)
      },
      {
        id: '22.3',
        title: 'Functions and functions notation',
        objectives: ['E2.13'],
        walt: 'Evaluate functions f(x), composite functions fg(x), and find inverse functions f⁻¹(x).',
        wilf: [
          'I can evaluate f(3) by substituting 3 in place of every x.',
          'I can evaluate composite function fg(2) by calculating g(2) first, then plugging into f.',
          'I can find inverse f⁻¹(x) by setting y = f(x), swapping x and y, and solving for y.'
        ],
        slo: ['Use f(x) and g(x) notation.', 'Compute composite and inverse functions.', 'State domain/range restrictions.'],
        keyTerms: [
          { term: 'Function notation', definition: 'f(x) representing the output for input x.', indonesianGloss: 'Notasi fungsi' },
          { term: 'Composite function', definition: 'Applying one function to the result of another: fg(x) = f(g(x)).', indonesianGloss: 'Fungsi komposisi' },
          { term: 'Inverse function', definition: 'A function that reverses the effect of the original function f⁻¹(x).', indonesianGloss: 'Fungsi invers' }
        ],
        ealStrategies: ['Function Machine diagram: Input -> [ Box g ] -> Output -> [ Box f ] -> Final Output.'],
        struggledScaffolding: ['Use linear functions f(x) = 2x + 3 and g(x) = x - 4 with whole numbers.'],
        extensionTasks: ['Solve equations of the form f⁻¹(x) = gf(x).'],
        defaultFormativeExercises: {
          level1: 'Given f(x) = 3x - 1, find f(4) and f(-2).',
          level2: 'Given f(x) = 2x + 1 and g(x) = x², find fg(3) and gf(3).',
          level3: 'Find inverse function f⁻¹(x) for f(x) = (2x + 5) / 3.',
          homework: 'Coursebook 0580 Exercise 22.3, pp. 524–532, Questions 1, 3, 6, 9.'
        },
        coursebookPages: 'Coursebook Ch 22, pp. 524–534',
        suggestedTools: ['Function machine boxes', 'Inverse mapping arrow charts'],
        defaultMeetings: generateMeetingsForSubtopic('22.3', 'Functions and notation', 4)
      }
    ]
  },
  {
    id: 23,
    numberStr: '23',
    title: 'Transformations and vectors',
    syllabusCategory: 'Geometry and measure',
    subtopics: [
      {
        id: '23.1',
        title: 'Simple plane transformations',
        objectives: ['C7.1', 'E7.1'],
        walt: 'Perform and fully describe the 4 basic isometric plane transformations: Translation, Reflection, Rotation, Enlargement.',
        wilf: [
          'I can describe Translation using a column vector (x on top, y on bottom).',
          'I can describe Reflection by giving the equation of mirror line (e.g. y = x, x = 2).',
          'I can describe Rotation by giving angle, direction (clockwise/anticlockwise), and center (x, y).',
          'I can describe Enlargement by giving scale factor k and center of enlargement (x, y).'
        ],
        slo: ['Plot transformed shapes on coordinate grid.', 'Write complete descriptions using Cambridge examiner keywords.'],
        keyTerms: [
          { term: 'Column vector', definition: 'A matrix [x; y] showing horizontal (top) and vertical (bottom) movement.', indonesianGloss: 'Vektor kolom' },
          { term: 'Center of rotation', definition: 'The fixed point around which a shape turns.', indonesianGloss: 'Pusat rotasi' },
          { term: 'Scale factor', definition: 'The multiplier by which distances from center are multiplied.', indonesianGloss: 'Faktor skala' }
        ],
        ealStrategies: ['4 Transformation Cards: Each card lists the MANDATORY keywords needed to score full Cambridge marks.'],
        struggledScaffolding: ['Use tracing paper for rotation; count vector hops horizontally first then vertically.'],
        extensionTasks: ['Enlarge shapes with negative fractional scale factor -1/2.'],
        defaultFormativeExercises: {
          level1: 'Translate triangle A by vector [3; -2].',
          level2: 'Reflect shape in the line y = 1.',
          level3: 'Rotate shape 90° clockwise about origin (0, 0).',
          homework: 'Coursebook 0580 Exercise 23.1, pp. 536–544, Questions 1, 3, 5, 8.'
        },
        coursebookPages: 'Coursebook Ch 23, pp. 536–546',
        suggestedTools: ['Tracing paper', 'Coordinate grid boards', 'Rulers'],
        defaultMeetings: generateMeetingsForSubtopic('23.1', 'Simple plane transformations', 3)
      },
      {
        id: '23.2',
        title: 'Further transformations',
        objectives: ['E7.1'],
        walt: 'Perform and describe combined transformations and enlargements with negative and fractional scale factors.',
        wilf: [
          'I can enlarge a shape with negative scale factor by projecting ray lines through the center to the opposite side.',
          'I can enlarge with fractional scale factor to produce a smaller similar shape.',
          'I can determine whether a combination of two reflections equals a rotation or translation.'
        ],
        slo: ['Execute enlargements with k = -2, -1, 1/2.', 'Recognise inverted orientations in negative enlargements.'],
        keyTerms: [
          { term: 'Negative enlargement', definition: 'Enlargement where image is on opposite side of center and inverted.', indonesianGloss: 'Dilatasi faktor negatif' }
        ],
        ealStrategies: ['Ray diagram guide: Center -> Object -> Reverse through Center -> Image.'],
        struggledScaffolding: ['Use center at origin (0, 0) and small integer vertices (1, 2) with k = -1 or -2.'],
        extensionTasks: ['Prove that reflection in y = x followed by reflection in y = -x is a rotation of 180°.'],
        defaultFormativeExercises: {
          level1: 'Enlarge triangle with vertices (2, 2), (4, 2), (2, 6) with scale factor 1/2, center (0, 0).',
          level2: 'Enlarge a shape by scale factor -1, center (1, 1).',
          level3: 'Enlarge with scale factor -2, center (2, 3).',
          homework: 'Coursebook 0580 Exercise 23.2, pp. 545–552, Questions 2, 4, 7.'
        },
        coursebookPages: 'Coursebook Ch 23, pp. 545–554',
        suggestedTools: ['Rulers', 'GeoGebra transformation animator'],
        defaultMeetings: generateMeetingsForSubtopic('23.2', 'Further transformations', 3)
      },
      {
        id: '23.3',
        title: 'Vectors',
        objectives: ['E7.2', 'E7.3', 'E7.4'],
        walt: 'Calculate vector magnitude |v| = √(x² + y²), add/subtract vectors, and solve geometric vector proofs.',
        wilf: [
          'I can add and subtract column vectors by adding/subtracting top and bottom components.',
          'I can multiply a vector by an integer scalar: k[x; y] = [kx; ky].',
          'I can calculate magnitude using Pythagoras: |a| = √(x² + y²).',
          'I can express paths along geometric diagrams in terms of vectors a and b.',
          'I can prove two vectors are parallel by showing one is a scalar multiple of the other.'
        ],
        slo: ['Add and subtract 2D column vectors.', 'Find vector magnitudes.', 'Solve vector geometry path proofs.'],
        keyTerms: [
          { term: 'Vector', definition: 'A quantity with both magnitude (size) and direction.', indonesianGloss: 'Vektor' },
          { term: 'Magnitude', definition: 'The length of a vector |v| = √(x² + y²).', indonesianGloss: 'Panjang / magnitudo vektor' },
          { term: 'Parallel vectors', definition: 'Vectors that are scalar multiples of each other (v = k · u).', indonesianGloss: 'Vektor sejajar' }
        ],
        ealStrategies: ['Walking a path analogy: "To go from O to B, walk backwards along a (-a) then forward along b (+b)."'],
        struggledScaffolding: ['Use Pythagorean integer vectors [3; 4] -> magnitude 5; [6; 8] -> magnitude 10.'],
        extensionTasks: ['Prove that points A, B, and C lie on a straight line (collinear) using vector multiples.'],
        defaultFormativeExercises: {
          level1: 'Given a = [2; 5] and b = [3; -1], calculate a + b and 2a.',
          level2: 'Calculate magnitude of vector [6; 8].',
          level3: 'In triangle OAB, OA = a, OB = b. M is midpoint of AB. Express OM in terms of a and b.',
          homework: 'Coursebook 0580 Exercise 23.3, pp. 553–562, Questions 1, 3, 6, 10.'
        },
        coursebookPages: 'Coursebook Ch 23, pp. 553–564',
        suggestedTools: ['Vector grid paper', 'Arrow manipulatives'],
        defaultMeetings: generateMeetingsForSubtopic('23.3', 'Vectors and vector geometry', 4)
      }
    ]
  },
  {
    id: 24,
    numberStr: '24',
    title: 'Probability using tree diagrams and Venn diagrams',
    syllabusCategory: 'Probability',
    subtopics: [
      {
        id: '24.1',
        title: 'Using tree diagrams to show outcomes',
        objectives: ['C8.3', 'E8.3'],
        walt: 'Construct probability tree diagrams for independent two-stage events and list sample spaces.',
        wilf: [
          'I can draw branching branches for the first event and attach probabilities that sum to 1.',
          'I can draw identical branches for the second independent event.',
          'I can list all sample space combined outcomes at the ends of branches (e.g. HH, HT, TH, TT).'
        ],
        slo: ['Construct clear probability tree diagrams.', 'Ensure branch pairs sum to 1.0.'],
        keyTerms: [
          { term: 'Tree diagram', definition: 'A branching diagram representing sequential probability outcomes.', indonesianGloss: 'Diagram pohon' },
          { term: 'Independent events', definition: 'Events where the outcome of one does not affect the outcome of the other.', indonesianGloss: 'Kejadian saling bebas' }
        ],
        ealStrategies: ['Tree branch check: Every fork must add up to 1.0 (or 100%).'],
        struggledScaffolding: ['Use clean simple fractions (1/2 for coins, 1/6 for dice, 1/4 for spinners).'],
        extensionTasks: ['Expand tree diagrams to 3 sequential independent events (e.g. 3 coin flips).'],
        defaultFormativeExercises: {
          level1: 'Draw a tree diagram for flipping a fair coin twice.',
          level2: 'Probability of rain is 0.3. Complete tree diagram for two consecutive days.',
          level3: 'List all outcomes from rolling a 6-sided die and flipping a coin.',
          homework: 'Coursebook 0580 Exercise 24.1, pp. 566–572, Questions 1, 3, 5.'
        },
        coursebookPages: 'Coursebook Ch 24, pp. 566–574',
        suggestedTools: ['Real dice and coins', 'Tree diagram organizer sheets'],
        defaultMeetings: generateMeetingsForSubtopic('24.1', 'Tree diagrams outcomes', 2)
      },
      {
        id: '24.2',
        title: 'Calculating probability from tree diagrams',
        objectives: ['C8.3', 'E8.3'],
        walt: 'Calculate combined probabilities for independent and dependent events (without replacement).',
        wilf: [
          'I can multiply along the branches (AND rule: P(A and B) = P(A) × P(B)).',
          'I can add the results of different branch paths (OR rule: P(A or B) = P(A) + P(B)).',
          'I can adjust probabilities for dependent events without replacement (denominator decreases by 1).'
        ],
        slo: ['Solve bag-of-counters problems with and without replacement.', 'Calculate probability of "at least one".'],
        keyTerms: [
          { term: 'Dependent events', definition: 'Events where first outcome affects probability of second outcome.', indonesianGloss: 'Kejadian bersyarat / terikat' },
          { term: 'Without replacement', definition: 'When an item selected is not returned to the pool before second pick.', indonesianGloss: 'Tanpa pengembalian' }
        ],
        ealStrategies: ['Rule rhyme: "Across the branches MULTIPLY; Down the outcomes ADD."'],
        struggledScaffolding: ['Use small integer counter counts: 3 Red and 2 Blue counters (Total 5).'],
        extensionTasks: ['Use complement rule: P(at least one red) = 1 - P(no red).'],
        defaultFormativeExercises: {
          level1: 'A bag has 3 Red and 2 Blue balls. Pick one, replace it, pick second. Find P(Red, Red).',
          level2: 'Same bag (3 Red, 2 Blue). Pick two WITHOUT replacement. Complete tree diagram with second denominator 4.',
          level3: 'Find probability of picking at least one Red counter without replacement.',
          homework: 'Coursebook 0580 Exercise 24.2, pp. 573–580, Questions 2, 4, 7, 9.'
        },
        coursebookPages: 'Coursebook Ch 24, pp. 573–582',
        suggestedTools: ['Colored counter bags', 'Tree diagram calculation templates'],
        defaultMeetings: generateMeetingsForSubtopic('24.2', 'Tree diagram calculations', 4)
      },
      {
        id: '24.3',
        title: 'Calculating probability from Venn diagrams',
        objectives: ['E8.4'],
        walt: 'Use Venn diagrams and set notation (∩, ∪, \') to calculate theoretical probabilities.',
        wilf: [
          'I can place integers accurately into regions: Intersection A ∩ B, Only A, Only B, Outside (A ∪ B)\'.',
          'I can identify Intersection (AND, ∩) as the overlap region.',
          'I can identify Union (OR, ∪) as everything inside both circles combined.',
          'I can identify Complement (NOT, A\') as everything outside circle A.'
        ],
        slo: ['Construct 2-set and 3-set Venn diagrams.', 'Calculate P(A ∩ B), P(A ∪ B), and P(A\').'],
        keyTerms: [
          { term: 'Intersection (∩)', definition: 'The set of elements belonging to both A and B.', indonesianGloss: 'Irisan (A dan B)' },
          { term: 'Union (∪)', definition: 'The set of elements belonging to A or B or both.', indonesianGloss: 'Gabungan (A atau B)' },
          { term: 'Complement (A\')', definition: 'The set of elements in the universal set that do NOT belong to A.', indonesianGloss: 'Komplemen' }
        ],
        ealStrategies: ['Set notation visual: ∩ looks like an "n" for aNd; ∪ looks like a cup for Union.'],
        struggledScaffolding: ['Use a universal set of integers 1 to 10 with Set A = Evens, Set B = Multiples of 3.'],
        extensionTasks: ['Solve 3-circle Venn diagrams representing students studying Biology, Chemistry, and Physics.'],
        defaultFormativeExercises: {
          level1: 'Given Universal set = {1, 2, 3, 4, 5, 6, 7, 8}, A = {2, 4, 6, 8}, B = {4, 8}. Draw Venn diagram.',
          level2: 'From a class of 30 students, 18 play football, 12 play basketball, 5 play both. Find P(neither).',
          level3: 'Find P(A ∪ B)\' from a given Venn diagram.',
          homework: 'Coursebook 0580 Exercise 24.3, pp. 581–588, Questions 1, 3, 6, 8.'
        },
        coursebookPages: 'Coursebook Ch 24, pp. 581–590',
        suggestedTools: ['Hula hoops for floor Venn diagrams', 'Card sorting sets'],
        defaultMeetings: generateMeetingsForSubtopic('24.3', 'Venn diagrams', 3)
      },
      {
        id: '24.4',
        title: 'Conditional Probability',
        objectives: ['E8.4'],
        walt: 'Calculate conditional probability P(A|B) = P(A ∩ B) / P(B) using reduced sample spaces and two-way tables.',
        wilf: [
          'I can recognize conditional phrasing: "Given that...", "If it is known that...".',
          'I can reduce the sample space denominator to only the given condition group.',
          'I can read conditional values directly from two-way frequency tables.',
          'I can apply the formal formula P(A|B) = P(A ∩ B) ÷ P(B).'
        ],
        slo: ['Compute conditional probabilities from two-way tables.', 'Apply reduced sample space method.'],
        keyTerms: [
          { term: 'Conditional probability', definition: 'The probability of event A occurring given that event B has already occurred.', indonesianGloss: 'Peluang bersyarat' },
          { term: 'Reduced sample space', definition: 'Restricting the total outcomes solely to the condition specified.', indonesianGloss: 'Ruang sampel tereduksi' }
        ],
        ealStrategies: ['Condition highlighter: Put finger over or highlight ONLY the row or column of the "given" condition.'],
        struggledScaffolding: ['Use a clean 2x2 table of 100 students (Boys/Girls vs Glasses/No Glasses) with whole numbers.'],
        extensionTasks: ['Test whether two events are statistically independent by checking if P(A|B) = P(A).'],
        defaultFormativeExercises: {
          level1: 'In a class: 12 boys (4 wear glasses), 16 girls (6 wear glasses). Find P(glasses | boy).',
          level2: 'From a two-way table of 50 students, find probability a student studies Art GIVEN that they study French.',
          level3: 'If P(A ∩ B) = 0.2 and P(B) = 0.5, calculate P(A|B).',
          homework: 'Coursebook 0580 Exercise 24.4, pp. 589–596, Questions 2, 4, 7, 10.'
        },
        coursebookPages: 'Coursebook Ch 24, pp. 589–598',
        suggestedTools: ['Two-way table highlighter strips', 'Whiteboards'],
        defaultMeetings: generateMeetingsForSubtopic('24.4', 'Conditional probability', 3)
      }
    ]
  }
];

export const COLOR_THEMES = [
  {
    name: 'Semesta Navy & Gold (Official)',
    primaryColor: '#1e3a8a', // Deep Semesta Blue
    secondaryColor: '#0f766e', // Teal
    accentColor: '#d97706' // Warm Gold
  },
  {
    name: 'Cambridge Emerald',
    primaryColor: '#065f46',
    secondaryColor: '#047857',
    accentColor: '#10b981'
  },
  {
    name: 'Classic Royal Blue',
    primaryColor: '#1d4ed8',
    secondaryColor: '#3b82f6',
    accentColor: '#f59e0b'
  },
  {
    name: 'Charcoal & Slate',
    primaryColor: '#334155',
    secondaryColor: '#475569',
    accentColor: '#0284c7'
  },
  {
    name: 'Crimson Scholar',
    primaryColor: '#881337',
    secondaryColor: '#9f1239',
    accentColor: '#e11d48'
  }
];

export function findSubtopicById(subtopicId: string): { topic: TopicData; subtopic: SubtopicData } | undefined {
  for (const topic of CURRICULUM_DATA) {
    const sub = topic.subtopics.find((s) => s.id === subtopicId);
    if (sub) {
      return { topic, subtopic: sub };
    }
  }
  return undefined;
}

export function synthesizeMultiSubtopicsPlan(subtopicIds: string[], totalMeetings: number) {
  const matches = subtopicIds
    .map((id) => findSubtopicById(id))
    .filter((m): m is { topic: TopicData; subtopic: SubtopicData } => m !== undefined);

  if (matches.length === 0) {
    const fallback = CURRICULUM_DATA[0].subtopics[0];
    return {
      topicIds: [CURRICULUM_DATA[0].id],
      topicTitles: [CURRICULUM_DATA[0].title],
      subtopicIds: [fallback.id],
      subtopicTitles: [fallback.title],
      objectives: [...fallback.objectives],
      walt: fallback.walt,
      wilf: [...fallback.wilf],
      slo: [...fallback.slo],
      keyTerms: [...fallback.keyTerms],
      ealSupport: [...fallback.ealStrategies],
      struggledScaffolding: [...fallback.struggledScaffolding],
      ealProvisions: [...fallback.ealStrategies],
      extensionTasks: [...fallback.extensionTasks],
      formativeExercises: { ...fallback.defaultFormativeExercises },
      coursebookReference: fallback.coursebookPages,
      manipulativeTools: fallback.suggestedTools.join(', '),
      meetings: generateMeetingsForSubtopic(fallback.id, fallback.title, totalMeetings)
    };
  }

  // Deduplicate Topics & Objectives
  const topicIds = Array.from(new Set(matches.map((m) => m.topic.id)));
  const topicTitles = Array.from(new Set(matches.map((m) => `Topic ${m.topic.numberStr}: ${m.topic.title}`)));
  const subtopicTitles = matches.map((m) => `${m.subtopic.id}: ${m.subtopic.title}`);
  const combinedObjectives = Array.from(new Set(matches.flatMap((m) => m.subtopic.objectives)));

  // Synthesize WALT
  let synthesizedWalt = '';
  if (matches.length === 1) {
    synthesizedWalt = matches[0].subtopic.walt;
  } else {
    const titlesList = matches.map((m) => m.subtopic.title).join(' and ');
    synthesizedWalt = `Master mathematical concepts and problem-solving techniques in ${titlesList}, utilizing step-by-step integer scaffolding, visual modeling, and algebraic reasoning.`;
  }

  // Combine WILF (take top 2-3 criteria from each subtopic, max 8 items)
  const combinedWilf: string[] = [];
  matches.forEach((m) => {
    const count = matches.length === 1 ? m.subtopic.wilf.length : Math.max(2, Math.floor(6 / matches.length));
    m.subtopic.wilf.slice(0, count).forEach((w) => {
      if (!combinedWilf.includes(w)) combinedWilf.push(w);
    });
  });

  // Combine SLOs
  const combinedSlo = Array.from(new Set(matches.flatMap((m) => m.subtopic.slo))).slice(0, 5);

  // Combine Key Terms
  const seenTerms = new Set<string>();
  const combinedKeyTerms = matches
    .flatMap((m) => m.subtopic.keyTerms)
    .filter((kt) => {
      if (seenTerms.has(kt.term.toLowerCase())) return false;
      seenTerms.add(kt.term.toLowerCase());
      return true;
    })
    .slice(0, 6);

  // Combine EAL Strategies
  const combinedEal = Array.from(new Set(matches.flatMap((m) => m.subtopic.ealStrategies))).slice(0, 4);

  // Combine Differentiation Provisions
  const combinedStruggled = Array.from(new Set(matches.flatMap((m) => m.subtopic.struggledScaffolding))).slice(0, 4);
  const combinedExtension = Array.from(new Set(matches.flatMap((m) => m.subtopic.extensionTasks))).slice(0, 4);

  // Combine Formative Exercises
  const combinedFormative = {
    level1: matches[0].subtopic.defaultFormativeExercises.level1,
    level2: matches[matches.length > 1 ? 1 : 0].subtopic.defaultFormativeExercises.level2,
    level3: matches[matches.length - 1].subtopic.defaultFormativeExercises.level3,
    homework: matches.map((m) => `${m.subtopic.id}: ${m.subtopic.defaultFormativeExercises.homework}`).join(' | ')
  };

  // Combine Coursebook & Tools
  const combinedCoursebook = matches.map((m) => m.subtopic.coursebookPages).join('; ');
  const combinedTools = Array.from(new Set(matches.flatMap((m) => m.subtopic.suggestedTools))).join(', ');

  // Distribute Meetings across selected subtopics
  const meetings: MeetingPlan[] = [];
  const numSubtopics = matches.length;

  for (let i = 1; i <= totalMeetings; i++) {
    // Determine which subtopic this meeting primarily focuses on
    let subIdx = 0;
    if (numSubtopics > 1) {
      if (i === totalMeetings && totalMeetings >= 3) {
        // Last meeting is synthesis/review of all selected subtopics
        subIdx = -1;
      } else {
        subIdx = (i - 1) % numSubtopics;
      }
    }

    if (subIdx === -1) {
      // Integrated Review Meeting
      meetings.push(
        createMeetingPlan(
          i,
          'Cambridge 0580',
          matches.map((m) => m.subtopic.title).join(' & '),
          `Synthesis & Integrated Exam Review (${matches.map((m) => m.subtopic.id).join(' + ')})`,
          `Cambridge Past Paper Connection: How examiners combine ${matches.map((m) => m.subtopic.title).join(' and ')} in Paper 2/4.`,
          `Warm-up: Rapid recall of 2 key definitions from each subtopic.`,
          `Paired Carousel: Stations rotating between ${matches.map((m) => m.subtopic.title).join(' and ')}.`,
          `Board breakdown: Solving a multi-part examination problem linking both subtopics.`,
          `Tiered practice: Mixed problem set combining both topics with integer scaffolding.`,
          `Exit check: 1 multi-step question synthesizing both subtopics.`
        )
      );
    } else {
      const activeMatch = matches[subIdx];
      const subMeetings = generateMeetingsForSubtopic(activeMatch.subtopic.id, activeMatch.subtopic.title, totalMeetings);
      const meetingTemplate = subMeetings[(i - 1) % subMeetings.length];
      meetings.push({
        ...meetingTemplate,
        meetingNumber: i,
        topicFocus: `Meeting ${i} [${activeMatch.subtopic.id}]: ${meetingTemplate.topicFocus.replace(/^Meeting \d+: /, '')}`
      });
    }
  }

  return {
    topicIds,
    topicTitles,
    subtopicIds: matches.map((m) => m.subtopic.id),
    subtopicTitles,
    objectives: combinedObjectives,
    walt: synthesizedWalt,
    wilf: combinedWilf,
    slo: combinedSlo,
    keyTerms: combinedKeyTerms,
    ealSupport: combinedEal,
    struggledScaffolding: combinedStruggled,
    ealProvisions: combinedEal,
    extensionTasks: combinedExtension,
    formativeExercises: combinedFormative,
    coursebookReference: combinedCoursebook,
    manipulativeTools: combinedTools,
    meetings
  };
}
