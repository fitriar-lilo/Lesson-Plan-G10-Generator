import jsPDF from 'jspdf';
import { LessonPlanState } from '../types/lessonPlan';
import { downloadBlob } from './fileDownload';

/**
 * Pure vector PDF generator that produces an authentic A4 PDF with
 * exact 2.0 cm margins, 11pt typography, official Semesta table headers,
 * and automatic page numbering. Runs entirely in JavaScript without
 * DOM-to-canvas rendering, making it 100% immune to CSS oklch bugs.
 */
export async function exportToPdf(
  state: LessonPlanState,
  filename = 'Semesta_IGCSE_0580_Lesson_Plan.pdf'
): Promise<{ blob: Blob; url: string; filename: string }> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 20; // 2.0 cm margins on all sides
  const contentWidth = pageWidth - margin * 2; // 170mm
  const maxY = pageHeight - margin - 10; // 267mm max content y before page break

  let currentY = margin;

  // Helper to check and handle page break
  const checkPageBreak = (neededHeight: number): void => {
    if (currentY + neededHeight > maxY) {
      doc.addPage();
      currentY = margin;
      drawPageHeaderMini();
    }
  };

  const drawPageHeaderMini = (): void => {
    doc.setFillColor(30, 58, 138); // #1E3A8A
    doc.rect(margin, currentY, contentWidth, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('SEMESTA BILINGUAL BOARDING SCHOOL — IGCSE MATHEMATICS 0580 LESSON PLAN', margin + 3, currentY + 5);
    currentY += 10;
  };

  // 1. Official School Header (Banner)
  doc.setFillColor(30, 58, 138); // #1E3A8A
  doc.rect(margin, currentY, contentWidth, 24, 'F');

  // Gold accent bar
  doc.setFillColor(217, 119, 6); // Warm gold #D97706
  doc.rect(margin, currentY + 24, contentWidth, 1.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('SEMESTA BILINGUAL BOARDING SCHOOL', margin + 4, currentY + 7);

  doc.setFontSize(8.5);
  doc.setTextColor(253, 224, 71); // Light gold
  doc.text('CAMBRIDGE INTERNATIONAL SCHOOL ID058 — HIGH SCHOOL DEPARTMENT (SMA)', margin + 4, currentY + 13);

  doc.setFontSize(8);
  doc.setTextColor(226, 232, 240); // Slate 200
  doc.text('Jl. Raya Semarang - Boja KM. 15, Gunungpati, Semarang • www.semesta.sch.id', margin + 4, currentY + 18);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('OFFICIAL LESSON PLAN (RPP) — CAMBRIDGE IGCSE MATHEMATICS 0580', margin + 4, currentY + 22.5);

  currentY += 30;

  // Helper for section header banner
  const drawSectionHeader = (title: string, subtitle?: string): void => {
    checkPageBreak(12);
    doc.setFillColor(30, 58, 138); // #1E3A8A
    doc.rect(margin, currentY, contentWidth, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(title.toUpperCase(), margin + 3, currentY + 4.8);

    if (subtitle) {
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(253, 224, 71);
      doc.text(subtitle, margin + contentWidth - 3, currentY + 4.8, { align: 'right' });
    }

    currentY += 8.5;
  };

  // SECTION I: LESSON METADATA
  drawSectionHeader('I. Lesson Meta Data & Cambridge Objectives', 'Semesta SMA Official Template');

  const metadataRows = [
    [
      { label: 'Teacher Name:', value: state.teacherName },
      { label: 'Principal Name:', value: state.principalName }
    ],
    [
      { label: 'Year Group / Level:', value: `${state.yearGroup} (${state.targetLevel})` },
      { label: 'Duration / Meetings:', value: `${state.durationPerMeeting} | ${state.totalMeetings} Meetings` }
    ],
    [
      { label: 'Unit / Topic(s):', value: state.customTopicTitle || `Topic ${state.selectedTopicId}` },
      { label: 'Subtopic(s) & Codes:', value: `${state.customSubtopicTitle || state.selectedSubtopicId} [${state.customObjectives.join(', ')}]` }
    ],
    [
      { label: 'Date Range:', value: state.dateRange },
      { label: 'Academic Term:', value: state.semesterTerm }
    ]
  ];

  doc.setFontSize(8);
  const colHalf = contentWidth / 2;

  for (const row of metadataRows) {
    checkPageBreak(7);
    doc.setFillColor(248, 250, 252);
    doc.rect(margin, currentY, contentWidth, 6.5, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.rect(margin, currentY, contentWidth, 6.5, 'S');

    // Col 1
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(row[0].label, margin + 2, currentY + 4.5);
    doc.setFont('helvetica', 'normal');
    doc.text(doc.splitTextToSize(row[0].value, colHalf - 38), margin + 34, currentY + 4.5);

    // Col 2
    doc.setFont('helvetica', 'bold');
    doc.text(row[1].label, margin + colHalf + 2, currentY + 4.5);
    doc.setFont('helvetica', 'normal');
    doc.text(doc.splitTextToSize(row[1].value, colHalf - 38), margin + colHalf + 35, currentY + 4.5);

    currentY += 6.5;
  }

  // AO Focus row
  checkPageBreak(10);
  doc.setFillColor(255, 255, 255);
  doc.rect(margin, currentY, contentWidth, 8, 'F');
  doc.rect(margin, currentY, contentWidth, 8, 'S');
  doc.setFont('helvetica', 'bold');
  doc.text('Assessment Objectives:', margin + 2, currentY + 4);
  doc.setFont('helvetica', 'normal');
  doc.text(`• AO1 (Techniques): ${state.ao1Focus}`, margin + 38, currentY + 3.8);
  doc.text(`• AO2 (Application): ${state.ao2Focus}`, margin + 38, currentY + 7);
  currentY += 12;

  // SECTION II: INTEGRATED WALT, WILF & SLO
  drawSectionHeader('II. Integrated WALT, WILF & SLO (Student Learning Outcomes)', '3-Column Table');

  const col3Width = contentWidth / 3;
  checkPageBreak(35);

  // Table header
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, currentY, contentWidth, 6, 'F');
  doc.rect(margin, currentY, contentWidth, 6, 'S');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 58, 138);
  doc.text('1. WALT (Learning Intent)', margin + 2, currentY + 4.2);
  doc.text("2. WILF (Success Criteria)", margin + col3Width + 2, currentY + 4.2);
  doc.text('3. SLO & Key Terminology', margin + col3Width * 2 + 2, currentY + 4.2);
  currentY += 6;

  // Content block
  const waltLines = doc.splitTextToSize(state.walt, col3Width - 4);
  const wilfText = state.wilf.map((w) => `☑ ${w}`).join('\n');
  const wilfLines = doc.splitTextToSize(wilfText, col3Width - 4);
  const sloText = state.slo.map((s) => `• ${s}`).join('\n');
  const sloLines = doc.splitTextToSize(sloText, col3Width - 4);

  const blockHeight = Math.max(waltLines.length * 4.2 + 12, wilfLines.length * 4.2 + 6, sloLines.length * 4.2 + 8, 28);
  checkPageBreak(blockHeight);

  doc.rect(margin, currentY, contentWidth, blockHeight, 'S');
  doc.line(margin + col3Width, currentY, margin + col3Width, currentY + blockHeight);
  doc.line(margin + col3Width * 2, currentY, margin + col3Width * 2, currentY + blockHeight);

  // Col 1: WALT
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(waltLines, margin + 2, currentY + 4.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(180, 83, 9);
  doc.text('Scaffolding Focus:', margin + 2, currentY + waltLines.length * 4.2 + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Clean integer calculations for middle-to-low achievers.', margin + 2, currentY + waltLines.length * 4.2 + 9.5);
  doc.setFontSize(8);

  // Col 2: WILF
  doc.setTextColor(15, 23, 42);
  doc.text(wilfLines, margin + col3Width + 2, currentY + 4.5);

  // Col 3: SLO
  doc.text(sloLines, margin + col3Width * 2 + 2, currentY + 4.5);

  currentY += blockHeight + 5;

  // SECTION III: MULTI-TIER DIFFERENTIATION PROVISIONS
  drawSectionHeader('III. Multi-Tier Differentiation Provisions', 'Scaffolded for Diverse Readiness');

  checkPageBreak(25);
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, currentY, contentWidth, 6, 'F');
  doc.rect(margin, currentY, contentWidth, 6, 'S');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(180, 83, 9);
  doc.text('Struggled (Level 1 Scaffolding)', margin + 2, currentY + 4.2);
  doc.setTextColor(3, 105, 161);
  doc.text('EAL / Language Support (Level 2)', margin + col3Width + 2, currentY + 4.2);
  doc.setTextColor(21, 128, 61);
  doc.text('High-Achieving Extension (Level 3)', margin + col3Width * 2 + 2, currentY + 4.2);
  currentY += 6;

  const diffL1 = doc.splitTextToSize(state.struggledScaffolding.map((s) => `• ${s}`).join('\n'), col3Width - 4);
  const diffL2 = doc.splitTextToSize(state.ealProvisions.map((s) => `• ${s}`).join('\n'), col3Width - 4);
  const diffL3 = doc.splitTextToSize(state.extensionTasks.map((s) => `• ${s}`).join('\n'), col3Width - 4);

  const diffHeight = Math.max(diffL1.length * 4 + 4, diffL2.length * 4 + 4, diffL3.length * 4 + 4, 18);
  checkPageBreak(diffHeight);

  doc.rect(margin, currentY, contentWidth, diffHeight, 'S');
  doc.line(margin + col3Width, currentY, margin + col3Width, currentY + diffHeight);
  doc.line(margin + col3Width * 2, currentY, margin + col3Width * 2, currentY + diffHeight);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(diffL1, margin + 2, currentY + 4.5);
  doc.text(diffL2, margin + col3Width + 2, currentY + 4.5);
  doc.text(diffL3, margin + col3Width * 2 + 2, currentY + 4.5);

  currentY += diffHeight + 5;

  // SECTION IV: 5E INSTRUCTIONAL MODEL
  drawSectionHeader('IV. 5E Instructional Model — Lesson Delivery Sequence', `${state.meetings.length} Sesi • ${state.durationPerMeeting}`);

  for (const m of state.meetings) {
    checkPageBreak(40);

    // Meeting bar
    doc.setFillColor(238, 242, 255);
    doc.rect(margin, currentY, contentWidth, 5.5, 'F');
    doc.setDrawColor(199, 210, 254);
    doc.rect(margin, currentY, contentWidth, 5.5, 'S');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 58, 138);
    doc.text(`▶ Session ${m.meetingNumber}: ${m.topicFocus}`, margin + 2, currentY + 4);
    currentY += 5.5;

    // Starter
    const starterLines = doc.splitTextToSize(`Starter / Hook: ${m.starterHook}`, contentWidth - 4);
    doc.rect(margin, currentY, contentWidth, starterLines.length * 4 + 2, 'S');
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text(starterLines, margin + 2, currentY + 3.8);
    currentY += starterLines.length * 4 + 2;

    // 5E Stages
    const stages = [
      { name: 'Engage (10m)', stage: m.engage },
      { name: 'Explore (20m)', stage: m.explore },
      { name: 'Explain (15m)', stage: m.explain },
      { name: 'Elaborate (20m)', stage: m.elaborate },
      { name: 'Evaluate (15m)', stage: m.evaluate }
    ];

    for (const st of stages) {
      checkPageBreak(12);
      const descLines = doc.splitTextToSize(`${st.name}: ${st.stage.description}`, contentWidth - 45);
      const rowH = Math.max(descLines.length * 4 + 3, 7);

      doc.rect(margin, currentY, contentWidth, rowH, 'S');
      doc.line(margin + 32, currentY, margin + 32, currentY + rowH);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 58, 138);
      doc.text(st.name, margin + 2, currentY + 4);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(descLines, margin + 34, currentY + 4);

      currentY += rowH;
    }

    currentY += 3;
  }

  // SECTION V: FORMATIVE ASSESSMENT
  drawSectionHeader('V. Formative Exercises & Post-Lesson Reflection', 'Aligned to SLO Mastery');

  const formRows = [
    ['Level 1 (Entry):', state.formativeExercises.level1],
    ['Level 2 (Core):', state.formativeExercises.level2],
    ['Level 3 (Stretch):', state.formativeExercises.level3],
    ['Homework:', state.formativeExercises.homework]
  ];

  for (const [lvl, val] of formRows) {
    checkPageBreak(7);
    doc.rect(margin, currentY, contentWidth, 6, 'S');
    doc.line(margin + 32, currentY, margin + 32, currentY + 6);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(lvl, margin + 2, currentY + 4.2);
    doc.setFont('helvetica', 'normal');
    doc.text(doc.splitTextToSize(val, contentWidth - 36), margin + 34, currentY + 4.2);
    currentY += 6;
  }

  currentY += 4;

  // SECTION VI: RESOURCES
  drawSectionHeader('VI. Curriculum Media & Educational Resources', 'Official Materials');
  checkPageBreak(14);

  const resRows = [
    ['Coursebook Reference:', state.coursebookReference],
    ['Manipulatives & Tools:', state.manipulativeTools],
    ['Scaffolding Strategy:', state.customPedagogicalNotes || 'Direct instruction with clean positive integer numbers.']
  ];

  for (const [k, v] of resRows) {
    checkPageBreak(6);
    doc.rect(margin, currentY, contentWidth, 6, 'S');
    doc.line(margin + 42, currentY, margin + 42, currentY + 6);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(k, margin + 2, currentY + 4.2);
    doc.setFont('helvetica', 'normal');
    doc.text(doc.splitTextToSize(v, contentWidth - 46), margin + 44, currentY + 4.2);
    currentY += 6;
  }

  currentY += 5;

  // SECTION VII: SIGN-OFF
  drawSectionHeader('VII. Administrative Sign-off & Verification', 'Semesta School Requirement');
  checkPageBreak(25);

  doc.rect(margin, currentY, contentWidth, 24, 'S');
  doc.line(margin + colHalf, currentY, margin + colHalf, currentY + 24);

  // Teacher Sign-off
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 116, 139);
  doc.text('Submitted by Subject Teacher:', margin + 2, currentY + 4.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 58, 138);
  doc.setFontSize(9);
  doc.text('Fitria Rakhmawati, S.Pd.', margin + 2, currentY + 12);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('IGCSE Mathematics Teacher • Semesta High School', margin + 2, currentY + 16);
  doc.text(`Date of Submission: ${state.signDate}`, margin + 2, currentY + 20);

  // Principal Sign-off
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 116, 139);
  doc.text('Acknowledged & Approved by:', margin + colHalf + 2, currentY + 4.5);
  doc.setFontSize(9);
  doc.setTextColor(16, 185, 129);
  doc.text('[ APPROVED ]', margin + contentWidth - 25, currentY + 4.5);
  doc.setTextColor(30, 58, 138);
  doc.text('Ahmad Nurani, S.T., M.Pd.', margin + colHalf + 2, currentY + 12);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Principal of SMA & Head of Cambridge Center', margin + colHalf + 2, currentY + 16);
  doc.text('Semesta Bilingual Boarding School, Semarang', margin + colHalf + 2, currentY + 20);

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Semesta Bilingual Boarding School • Cambridge IGCSE Math 0580 • Page ${p} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  const pdfBlob = doc.output('blob');
  const url = downloadBlob(pdfBlob, filename);

  return { blob: pdfBlob, url, filename };
}
