import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  ShadingType,
  HeadingLevel
} from 'docx';
import { LessonPlanState } from '../types/lessonPlan';

// Helper to clean hex for docx (needs 6 hex characters without #)
function cleanHex(hex: string, fallback = '1E3A8A'): string {
  if (!hex) return fallback;
  return hex.replace('#', '').toUpperCase();
}

export async function exportToDocx(state: LessonPlanState): Promise<Blob> {
  const primaryHex = cleanHex(state.primaryColor, '1E3A8A');
  const lightBgHex = 'F8FAFC';
  const tableBorderColor = 'CBD5E1';

  const defaultBorders = {
    top: { style: BorderStyle.SINGLE, size: 4, color: tableBorderColor },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: tableBorderColor },
    left: { style: BorderStyle.SINGLE, size: 4, color: tableBorderColor },
    right: { style: BorderStyle.SINGLE, size: 4, color: tableBorderColor }
  };

  const headerBorders = {
    top: { style: BorderStyle.SINGLE, size: 6, color: primaryHex },
    bottom: { style: BorderStyle.SINGLE, size: 6, color: primaryHex },
    left: { style: BorderStyle.SINGLE, size: 6, color: primaryHex },
    right: { style: BorderStyle.SINGLE, size: 6, color: primaryHex }
  };

  const sectionsChildren: (Paragraph | Table)[] = [];

  // Helper paragraph creator with Nunito 11pt and 1.5 line spacing (360)
  const createP = (text: string, options?: { bold?: boolean; italic?: boolean; color?: string; size?: number; align?: (typeof AlignmentType)[keyof typeof AlignmentType]; spaceBefore?: number; spaceAfter?: number }) => {
    return new Paragraph({
      alignment: options?.align || AlignmentType.LEFT,
      spacing: {
        line: 360, // 1.5 line spacing
        before: options?.spaceBefore ?? 100,
        after: options?.spaceAfter ?? 100
      },
      children: [
        new TextRun({
          text,
          font: 'Nunito',
          size: options?.size ?? 22, // 11pt = 22 half-points
          bold: options?.bold ?? false,
          italics: options?.italic ?? false,
          color: options?.color ? cleanHex(options.color) : '1E293B'
        })
      ]
    });
  };

  // Helper for multi-line text blocks (split by newline into distinct paragraphs with proper line spacing)
  const createMultilineP = (text: string, options?: { bold?: boolean; italic?: boolean; color?: string; size?: number; align?: (typeof AlignmentType)[keyof typeof AlignmentType]; spaceBefore?: number; spaceAfter?: number }) => {
    if (!text) return [createP('', options)];
    const lines = text.split('\n').filter((l) => l.trim().length > 0);
    if (lines.length === 0) return [createP('', options)];
    return lines.map((line, idx) =>
      createP(line, {
        ...options,
        spaceBefore: idx === 0 ? (options?.spaceBefore ?? 100) : 40,
        spaceAfter: idx === lines.length - 1 ? (options?.spaceAfter ?? 100) : 40
      })
    );
  };

  const createSectionHeader = (title: string, subtitle?: string) => {
    const runs = [
      new TextRun({
        text: title.toUpperCase(),
        font: 'Nunito',
        size: 24, // 12pt bold
        bold: true,
        color: 'FFFFFF'
      })
    ];
    if (subtitle) {
      runs.push(
        new TextRun({
          text: `  |  ${subtitle}`,
          font: 'Nunito',
          size: 20,
          italics: true,
          color: 'FDE047'
        })
      );
    }
    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: headerBorders,
              shading: { fill: primaryHex, type: ShadingType.CLEAR },
              margins: { top: 120, bottom: 120, left: 160, right: 160 },
              children: [
                new Paragraph({
                  spacing: { line: 360, before: 60, after: 60 },
                  children: runs
                })
              ]
            })
          ]
        })
      ]
    });
  };

  // 1. Official School Header Table
  sectionsChildren.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: defaultBorders,
              shading: { fill: lightBgHex, type: ShadingType.CLEAR },
              margins: { top: 160, bottom: 160, left: 200, right: 200 },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { line: 360, before: 60, after: 40 },
                  children: [
                    new TextRun({
                      text: 'SEMESTA BILINGUAL BOARDING SCHOOL',
                      font: 'Nunito',
                      size: 28, // 14pt
                      bold: true,
                      color: primaryHex
                    })
                  ]
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { line: 360, before: 20, after: 40 },
                  children: [
                    new TextRun({
                      text: 'CAMBRIDGE INTERNATIONAL SCHOOL ID058 — HIGH SCHOOL DEPARTMENT (SMA)',
                      font: 'Nunito',
                      size: 20,
                      bold: true,
                      color: '475569'
                    })
                  ]
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { line: 360, before: 20, after: 80 },
                  children: [
                    new TextRun({
                      text: 'OFFICIAL LESSON PLAN (RENCANA PELAKSANAAN PEMBELAJARAN) — IGCSE MATHEMATICS 0580',
                      font: 'Nunito',
                      size: 22,
                      bold: true,
                      color: primaryHex
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    })
  );

  sectionsChildren.push(createP('', { spaceAfter: 120 }));

  // 2. Top Information Metadata Table
  sectionsChildren.push(
    createSectionHeader('1. Lesson Meta Data & Cambridge Objectives', 'Semesta Official Template')
  );

  sectionsChildren.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 25, type: WidthType.PERCENTAGE },
              shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP('Teacher Name:', { bold: true })]
            }),
            new TableCell({
              width: { size: 25, type: WidthType.PERCENTAGE },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP(state.teacherName)]
            }),
            new TableCell({
              width: { size: 25, type: WidthType.PERCENTAGE },
              shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP('Principal Name:', { bold: true })]
            }),
            new TableCell({
              width: { size: 25, type: WidthType.PERCENTAGE },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP(state.principalName)]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP('Year Group / Level:', { bold: true })]
            }),
            new TableCell({
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP(`${state.yearGroup} (${state.targetLevel})`)]
            }),
            new TableCell({
              shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP('Duration / Meetings:', { bold: true })]
            }),
            new TableCell({
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP(`${state.durationPerMeeting} | ${state.totalMeetings} Meeting(s)`)]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP('Unit / Topic(s):', { bold: true })]
            }),
            new TableCell({
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP(state.customTopicTitle || `Topic ${state.selectedTopicId}`)]
            }),
            new TableCell({
              shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP('Subtopic(s) & Codes:', { bold: true })]
            }),
            new TableCell({
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP(`${state.customSubtopicTitle || state.selectedSubtopicId} [Objectives: ${state.customObjectives.join(', ')}]`)]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP('Date / Period:', { bold: true })]
            }),
            new TableCell({
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP(state.dateRange)]
            }),
            new TableCell({
              shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP('Academic Term:', { bold: true })]
            }),
            new TableCell({
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP(state.semesterTerm)]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP('Cambridge AO Focus:', { bold: true })]
            }),
            new TableCell({
              columnSpan: 3,
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [
                createP(`• AO1 (Techniques): ${state.ao1Focus}`),
                createP(`• AO2 (Application & Problem Solving): ${state.ao2Focus}`)
              ]
            })
          ]
        })
      ]
    })
  );

  sectionsChildren.push(createP('', { spaceAfter: 120 }));

  // 3. Integrated WALT / WILF / SLO Table (3 Columns)
  sectionsChildren.push(
    createSectionHeader('2. Integrated WALT / WILF / SLO & Language Objectives', 'Single 3-Column Integrated Table')
  );

  sectionsChildren.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 33, type: WidthType.PERCENTAGE },
              shading: { fill: 'E2E8F0', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 100, bottom: 100, left: 120, right: 120 },
              children: [createP('WALT (We Are Learning To)', { bold: true, color: primaryHex })]
            }),
            new TableCell({
              width: { size: 33, type: WidthType.PERCENTAGE },
              shading: { fill: 'E2E8F0', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 100, bottom: 100, left: 120, right: 120 },
              children: [createP("WILF (What I'm Looking For)", { bold: true, color: primaryHex })]
            }),
            new TableCell({
              width: { size: 34, type: WidthType.PERCENTAGE },
              shading: { fill: 'E2E8F0', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 100, bottom: 100, left: 120, right: 120 },
              children: [createP('SLO & Language Objectives', { bold: true, color: primaryHex })]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              borders: defaultBorders,
              margins: { top: 100, bottom: 100, left: 120, right: 120 },
              children: [
                createP(state.walt),
                createP('Focus on Integer Calculations:', { bold: true, spaceBefore: 80 }),
                createP('Designed for middle-to-low achieving students using accessible integer scaffolding.')
              ]
            }),
            new TableCell({
              borders: defaultBorders,
              margins: { top: 100, bottom: 100, left: 120, right: 120 },
              children: state.wilf.map((item) => createP(`☑ ${item}`, { spaceAfter: 60 }))
            }),
            new TableCell({
              borders: defaultBorders,
              margins: { top: 100, bottom: 100, left: 120, right: 120 },
              children: [
                createP('Student Learning Outcomes (SLO):', { bold: true }),
                ...state.slo.map((s) => createP(`• ${s}`)),
                createP('CLIL Key Terminology:', { bold: true, spaceBefore: 80 }),
                ...state.keyTerms.map((kt) =>
                  createP(`• ${kt.term} (${kt.indonesianGloss || 'id'}): ${kt.definition}`)
                ),
                createP('EAL Bilingual Support:', { bold: true, spaceBefore: 80 }),
                ...state.ealSupport.map((eal) => createP(`• ${eal}`))
              ]
            })
          ]
        })
      ]
    })
  );

  sectionsChildren.push(createP('', { spaceAfter: 120 }));

  // 3. Differentiation Provisions Table
  sectionsChildren.push(
    createSectionHeader('3. Multi-Tier Differentiation Provisions', 'Scaffolded for Middle-to-Low Achievers')
  );

  sectionsChildren.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 33, type: WidthType.PERCENTAGE },
              shading: { fill: 'FEF3C7', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP('Struggled Scaffolding (Level 1)', { bold: true, color: 'B45309' })]
            }),
            new TableCell({
              width: { size: 33, type: WidthType.PERCENTAGE },
              shading: { fill: 'E0F2FE', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP('EAL / Language Support (Level 2)', { bold: true, color: '0369A1' })]
            }),
            new TableCell({
              width: { size: 34, type: WidthType.PERCENTAGE },
              shading: { fill: 'DCFCE7', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP('High-Achieving Extension (Level 3)', { bold: true, color: '15803D' })]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              borders: defaultBorders,
              margins: { top: 100, bottom: 100, left: 120, right: 120 },
              children: state.struggledScaffolding.map((item) => createP(`• ${item}`, { spaceAfter: 60 }))
            }),
            new TableCell({
              borders: defaultBorders,
              margins: { top: 100, bottom: 100, left: 120, right: 120 },
              children: state.ealProvisions.map((item) => createP(`• ${item}`, { spaceAfter: 60 }))
            }),
            new TableCell({
              borders: defaultBorders,
              margins: { top: 100, bottom: 100, left: 120, right: 120 },
              children: state.extensionTasks.map((item) => createP(`• ${item}`, { spaceAfter: 60 }))
            })
          ]
        })
      ]
    })
  );

  sectionsChildren.push(createP('', { spaceAfter: 120 }));

  // 4. 5E Instructional Model (Generated per Meeting)
  sectionsChildren.push(
    createSectionHeader('4. 5E Instructional Model (Generated per Meeting)', `Total: ${state.meetings.length} Meeting(s) — 80 min each`)
  );

  for (const m of state.meetings) {
    sectionsChildren.push(
      new Paragraph({
        spacing: { line: 360, before: 140, after: 60 },
        children: [
          new TextRun({
            text: `▶ MEETING ${m.meetingNumber}: ${m.topicFocus}`,
            font: 'Nunito',
            size: 24,
            bold: true,
            color: primaryHex
          })
        ]
      })
    );

    sectionsChildren.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          // Starter / Stimulus
          new TableRow({
            children: [
              new TableCell({
                width: { size: 25, type: WidthType.PERCENTAGE },
                shading: { fill: 'F8FAFC', type: ShadingType.CLEAR },
                borders: defaultBorders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [createP('Starter / Stimulus Hook:', { bold: true })]
              }),
              new TableCell({
                width: { size: 75, type: WidthType.PERCENTAGE },
                borders: defaultBorders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [createP(m.starterHook)]
              })
            ]
          }),
          // Engage
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: 'FEF3C7', type: ShadingType.CLEAR },
                borders: defaultBorders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [createP('Engage (10 min):', { bold: true })]
              }),
              new TableCell({
                borders: defaultBorders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [
                  createP(m.engage.description),
                  createP(`Scaffolding Tip: ${m.engage.scaffoldingTips}`, { italic: true }),
                  createP(`Teacher Role: ${m.engage.teacherRole} | Student Role: ${m.engage.studentRole}`)
                ]
              })
            ]
          }),
          // Explore
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: 'E0F2FE', type: ShadingType.CLEAR },
                borders: defaultBorders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [createP('Explore (20 min):', { bold: true })]
              }),
              new TableCell({
                borders: defaultBorders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [
                  createP(m.explore.description),
                  createP(`Inquiry Task: ${m.explore.sampleProblem || ''}`, { bold: true }),
                  createP(`Scaffolding: ${m.explore.scaffoldingTips}`, { italic: true }),
                  createP(`Teacher: ${m.explore.teacherRole} | Student: ${m.explore.studentRole}`)
                ]
              })
            ]
          }),
          // Explain
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: 'FCE7F3', type: ShadingType.CLEAR },
                borders: defaultBorders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [createP('Explain (15 min):', { bold: true })]
              }),
              new TableCell({
                borders: defaultBorders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [
                  createP(m.explain.description),
                  createP(`Board Model: ${m.explain.sampleProblem || ''}`, { bold: true }),
                  createP(`Scaffolding: ${m.explain.scaffoldingTips}`, { italic: true }),
                  createP(`Teacher: ${m.explain.teacherRole} | Student: ${m.explain.studentRole}`)
                ]
              })
            ]
          }),
          // Elaborate
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: 'DCFCE7', type: ShadingType.CLEAR },
                borders: defaultBorders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [createP('Elaborate (20 min):', { bold: true })]
              }),
              new TableCell({
                borders: defaultBorders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [
                  createP(m.elaborate.description),
                  createP(`Scaffolding: ${m.elaborate.scaffoldingTips}`, { italic: true }),
                  createP(`Teacher: ${m.elaborate.teacherRole} | Student: ${m.elaborate.studentRole}`)
                ]
              })
            ]
          }),
          // Evaluate
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: 'EDE9FE', type: ShadingType.CLEAR },
                borders: defaultBorders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [createP('Evaluate (15 min):', { bold: true })]
              }),
              new TableCell({
                borders: defaultBorders,
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [
                  createP(m.evaluate.description),
                  createP(`Exit Check: ${m.evaluate.sampleProblem || ''}`, { bold: true }),
                  createP(`Diagnostic: ${m.evaluate.scaffoldingTips}`, { italic: true })
                ]
              })
            ]
          })
        ]
      })
    );

    sectionsChildren.push(createP('', { spaceAfter: 80 }));
  }

  // 5. Formative Assessment, Exercises & Post-Lesson Reflection Table
  sectionsChildren.push(
    createSectionHeader('5. Formative Exercises & Post-Lesson Reflection', 'Aligned to SLO & Integer Scaffolding')
  );

  sectionsChildren.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 25, type: WidthType.PERCENTAGE },
              shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP('Level 1 Formative (Entry):', { bold: true })]
            }),
            new TableCell({
              width: { size: 75, type: WidthType.PERCENTAGE },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP(state.formativeExercises.level1)]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP('Level 2 Formative (Core):', { bold: true })]
            }),
            new TableCell({
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP(state.formativeExercises.level2)]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP('Level 3 Formative (Stretch):', { bold: true })]
            }),
            new TableCell({
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP(state.formativeExercises.level3)]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP('Homework / Consolidation:', { bold: true })]
            }),
            new TableCell({
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP(state.formativeExercises.homework)]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              shading: { fill: 'F8FAFC', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP('Post-Lesson Reflection Prompts:', { bold: true, color: primaryHex })]
            }),
            new TableCell({
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [
                createP(`• Student Comprehension: ${state.reflectionPrompts.comprehensionEvaluation}`),
                createP(`• Scaffolding Effectiveness: ${state.reflectionPrompts.scaffoldingEffectiveness}`),
                createP(`• Next Steps / Remediation: ${state.reflectionPrompts.nextSteps}`)
              ]
            })
          ]
        })
      ]
    })
  );

  sectionsChildren.push(createP('', { spaceAfter: 120 }));

  // 6. Resource List Table
  sectionsChildren.push(
    createSectionHeader('6. Resource List & Educational Media', 'Curriculum & Digital Materials')
  );

  sectionsChildren.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 30, type: WidthType.PERCENTAGE },
              shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP('Coursebook & Syllabus:', { bold: true })]
            }),
            new TableCell({
              width: { size: 70, type: WidthType.PERCENTAGE },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP(state.coursebookReference)]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP('Teacher Resources URL:', { bold: true })]
            }),
            new TableCell({
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP(state.teacherResourcesUrl || 'None specified')]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP('Student Worksheets URL:', { bold: true })]
            }),
            new TableCell({
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP(state.studentWorksheetsUrl || 'None specified')]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP('Manipulatives & Physical Tools:', { bold: true })]
            }),
            new TableCell({
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP(state.manipulativeTools)]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP('Scaffolding Strategy & Notes:', { bold: true })]
            }),
            new TableCell({
              borders: defaultBorders,
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [createP(state.customPedagogicalNotes || 'Direct instruction, integer scaffolding, formative exit tickets.')]
            })
          ]
        })
      ]
    })
  );

  sectionsChildren.push(createP('', { spaceAfter: 140 }));

  // 7. Sign-off Footer Table (Teacher & Principal)
  sectionsChildren.push(
    createSectionHeader('7. Approval & Sign-Off Verification', 'Semesta School Administrative Requirement')
  );

  sectionsChildren.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              shading: { fill: 'F8FAFC', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 120, bottom: 120, left: 160, right: 160 },
              children: [
                createP('Submitted by Subject Teacher:', { bold: true }),
                createP('Fitria Rakhmawati, S.Pd.', { bold: true, color: primaryHex, spaceBefore: 60 }),
                createP('IGCSE Mathematics Teacher', { italic: true }),
                createP(`Date: ${state.signDate}`, { spaceBefore: 60 }),
                createP('[Digital Signature on Record / Attached in PDF]', { italic: true, color: '64748B' })
              ]
            }),
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              shading: { fill: 'F8FAFC', type: ShadingType.CLEAR },
              borders: defaultBorders,
              margins: { top: 120, bottom: 120, left: 160, right: 160 },
              children: [
                createP('Approved by Principal / Head of School:', { bold: true }),
                createP('Ahmad Nurani, S.T., M.Pd.', { bold: true, color: primaryHex, spaceBefore: 60 }),
                createP('Principal of SMA Semesta', { italic: true }),
                createP(`Status: ${state.isPrincipalApproved ? '☑ APPROVED' : '☐ PENDING REVIEW'}`, { bold: true }),
                createP(`Date: ${state.signDate}`, { spaceBefore: 40 }),
                createP('[Official Stamp & Sign-off on File]', { italic: true, color: '64748B' })
              ]
            })
          ]
        })
      ]
    })
  );

  // Document Page Setup:
  // Margins 2.0 cm on all sides: 20 mm = 1134 dxa (twips).
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Nunito',
            size: 22, // 11pt
            color: '1E293B'
          },
          paragraph: {
            spacing: {
              line: 360, // 1.5 line spacing
              before: 80,
              after: 80
            }
          }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134, // 2.0 cm
              bottom: 1134, // 2.0 cm
              left: 1134, // 2.0 cm
              right: 1134 // 2.0 cm
            }
          }
        },
        children: sectionsChildren
      }
    ]
  });

  return await Packer.toBlob(doc);
}
