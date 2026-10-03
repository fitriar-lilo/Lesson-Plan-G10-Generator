import React, { useState } from 'react';
import { LessonPlanState } from './types/lessonPlan';
import {
  CURRICULUM_DATA,
  generateMeetingsForSubtopic
} from './data/curriculumData';
import { getSemestaDefaultHeaderSVG } from './utils/defaultHeader';
import { getCursiveSignature } from './utils/defaultSignatures';
import { ConfigPanel } from './components/ConfigPanel';
import { LessonPlanPreview } from './components/LessonPlanPreview';
import { ExportToolbar } from './components/ExportToolbar';
import { SignatureModal } from './components/SignatureModal';
import { exportToDocx } from './utils/docxExport';
import { exportToPdf } from './utils/pdfExport';
import { printLessonPlan } from './utils/printHelper';
import { Eye, Edit3, Sparkles, Download, FileText, Printer } from 'lucide-react';

const INITIAL_TOPIC = CURRICULUM_DATA[0]; // Topic 14
const INITIAL_SUBTOPIC = INITIAL_TOPIC.subtopics[0]; // 14.1 Simultaneous equations

function createInitialState(): LessonPlanState {
  return {
    teacherName: 'Fitria Rakhmawati',
    principalName: 'Ahmad Nurani, S.T., M.Pd.',
    schoolName: 'Semesta Bilingual Boarding School',
    yearGroup: 'Year 10 (SMA)',
    targetLevel: 'Middle to Low achieving students',
    durationPerMeeting: '80 min (Double Period)',
    totalMeetings: 4,
    dateRange: '12 - 23 October 2026',
    semesterTerm: 'Semester 1 (AY 2026/2027)',

    selectedTopicIds: [INITIAL_TOPIC.id],
    selectedSubtopicIds: [INITIAL_SUBTOPIC.id],
    selectedTopicId: INITIAL_TOPIC.id,
    selectedSubtopicId: INITIAL_SUBTOPIC.id,
    customTopicTitle: INITIAL_TOPIC.title,
    customSubtopicTitle: INITIAL_SUBTOPIC.title,
    customObjectives: [...INITIAL_SUBTOPIC.objectives],

    ao1Focus: 'Accurate algebraic manipulation, eliminating variables by matching coefficients with positive/negative integers.',
    ao2Focus: 'Formulating pairs of linear equations from everyday school scenarios (e.g. ticket costs, stationery purchases).',

    walt: INITIAL_SUBTOPIC.walt,
    wilf: [...INITIAL_SUBTOPIC.wilf],
    slo: [...INITIAL_SUBTOPIC.slo],
    keyTerms: [...INITIAL_SUBTOPIC.keyTerms],
    ealSupport: [...INITIAL_SUBTOPIC.ealStrategies],

    struggledScaffolding: [...INITIAL_SUBTOPIC.struggledScaffolding],
    ealProvisions: [...INITIAL_SUBTOPIC.ealStrategies],
    extensionTasks: [...INITIAL_SUBTOPIC.extensionTasks],

    meetings: generateMeetingsForSubtopic(INITIAL_SUBTOPIC.id, INITIAL_SUBTOPIC.title, 4),

    formativeExercises: { ...INITIAL_SUBTOPIC.defaultFormativeExercises },
    reflectionPrompts: {
      comprehensionEvaluation: '78% of students mastered elimination with matching coefficients; 4 students required extra guidance on subtraction sign changes.',
      scaffoldingEffectiveness: 'Using integer-only numbers and pre-aligned coordinate boxes eliminated arithmetic frustration and improved confidence.',
      nextSteps: 'Revisit equations requiring multiplication of both equations before moving to quadratic systems.'
    },

    teacherResourcesUrl: 'https://drive.google.com/semesta-igcse/math0580/ch14-simultaneous',
    studentWorksheetsUrl: 'https://classroom.google.com/c/semesta-y10-math0580/a/eq-practice',
    coursebookReference: INITIAL_SUBTOPIC.coursebookPages,
    manipulativeTools: INITIAL_SUBTOPIC.suggestedTools.join(', '),

    // Teaching Methods & Pedagogical Ideas
    teachingMethods: [
      'Direct Explicit Instruction (I Do, We Do, You Do)',
      'Concrete-Representational-Abstract (CRA) Framework',
      'Cooperative Learning (Rally-Coach Pairs)',
      'Visual & Spatial Modeling (Algebra Tiles / Bar Models)'
    ],
    classroomPedagogyModel: '5E Constructivist Model (Engage-Explore-Explain-Elaborate-Evaluate) with Integer Scaffolding',
    customTeachingIdea: `1. Physical Balance Scale Hook: Introduce simultaneous equations using two balance pans with positive integer weights. Show students that adding or subtracting an entire balanced scale to another maintains equilibrium.
2. Step-by-Step Color Coding: In the 'I Do' phase, color-code terms: red for x-coefficients, blue for y-coefficients, and green for constants. Emphasize SSS (Same Sign Subtract) and OSA (Opposite Sign Add).
3. Rally-Coach Paired Work: In the 'Elaborate' phase, students work in pairs. Student A solves Problem 1 out loud while Student B coaches and validates. Then swap roles for Problem 2 to foster mathematical dialogue and self-correction.
4. Error Analysis & Misconception Check: Highlight the classic blunder of forgetting to reverse signs when subtracting negative integer terms.`,
    teacherGuidingQuestions: `• Why do we subtract the two equations when the matching signs are the same (+ and + or - and -)?
• What happens to the balance scale if we only multiply one side of an equation?
• How can you verify that your solution (x, y) is 100% correct without checking the answer key?`,
    customPedagogicalNotes: 'Scaffolding strategy: Focus heavily on clean integer calculations, foundational worked examples, step-by-step guidance, and accessible exercises.',

    teacherSignatureUrl: getCursiveSignature('Fitria Rakhmawati', 'Subject Teacher'),
    principalSignatureUrl: getCursiveSignature('Ahmad Nurani', 'Principal'),
    isPrincipalApproved: true,
    signDate: '12 October 2026',

    headerImageUrl: getSemestaDefaultHeaderSVG('#1e3a8a'),
    primaryColor: '#1e3a8a', // Deep Semesta Blue
    secondaryColor: '#0f766e', // Teal
    accentColor: '#d97706', // Warm Gold
    fontFamily: 'Nunito',
    fontSize: '11pt'
  };
}

export default function App() {
  const [state, setState] = useState<LessonPlanState>(createInitialState);
  const [activeViewMode, setActiveViewMode] = useState<'split' | 'editor' | 'preview'>('split');
  const [isTeacherSigOpen, setIsTeacherSigOpen] = useState(false);
  const [isPrincipalSigOpen, setIsPrincipalSigOpen] = useState(false);

  const handleResetDefaults = () => {
    if (window.confirm('Reset all values to default Semesta School template (Fitria Rakhmawati)?')) {
      setState(createInitialState());
    }
  };

  const handleLoadPreset = (topicId: number, subtopicId: string, meetings: number) => {
    const topic = CURRICULUM_DATA.find((t) => t.id === topicId) || CURRICULUM_DATA[0];
    const sub = topic.subtopics.find((s) => s.id === subtopicId) || topic.subtopics[0];

    setState((prev) => ({
      ...prev,
      selectedTopicIds: [topic.id],
      selectedSubtopicIds: [sub.id],
      selectedTopicId: topic.id,
      customTopicTitle: topic.title,
      selectedSubtopicId: sub.id,
      customSubtopicTitle: sub.title,
      customObjectives: [...sub.objectives],
      totalMeetings: meetings,
      walt: sub.walt,
      wilf: [...sub.wilf],
      slo: [...sub.slo],
      keyTerms: [...sub.keyTerms],
      ealSupport: [...sub.ealStrategies],
      struggledScaffolding: [...sub.struggledScaffolding],
      ealProvisions: [...sub.ealStrategies],
      extensionTasks: [...sub.extensionTasks],
      formativeExercises: { ...sub.defaultFormativeExercises },
      coursebookReference: sub.coursebookPages,
      manipulativeTools: sub.suggestedTools.join(', '),
      meetings: generateMeetingsForSubtopic(sub.id, sub.title, meetings)
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-['Nunito',sans-serif]">
      {/* Sticky Top Toolbar with Export Actions */}
      <ExportToolbar
        state={state}
        onResetDefaults={handleResetDefaults}
        onLoadPreset={handleLoadPreset}
      />

      {/* Mobile / Screen View Mode Switcher */}
      <div className="no-print bg-slate-200/80 border-b border-slate-300 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700 hidden sm:inline">View Mode:</span>
          <div className="inline-flex rounded-lg border border-slate-300 bg-white p-0.5">
            <button
              type="button"
              onClick={() => setActiveViewMode('split')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                activeViewMode === 'split'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Side-by-Side Split
            </button>
            <button
              type="button"
              onClick={() => setActiveViewMode('editor')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                activeViewMode === 'editor'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5 inline mr-1" /> Controls
            </button>
            <button
              type="button"
              onClick={() => setActiveViewMode('preview')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                activeViewMode === 'preview'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5 inline mr-1" /> Preview
            </button>
          </div>
        </div>

        <div className="text-[11px] text-slate-600 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Middle-to-Low Achiever Integer Scaffolding Enabled</span>
        </div>
      </div>

      {/* Main Workspace */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive Configuration Panel */}
          {(activeViewMode === 'split' || activeViewMode === 'editor') && (
            <div className={`no-print ${activeViewMode === 'split' ? 'lg:col-span-5' : 'lg:col-span-12'}`}>
              <ConfigPanel
                state={state}
                onChange={setState}
                onOpenTeacherSignature={() => setIsTeacherSigOpen(true)}
                onOpenPrincipalSignature={() => setIsPrincipalSigOpen(true)}
              />
            </div>
          )}

          {/* Right Column: Live Printable Lesson Plan Preview */}
          <div
            className={`overflow-x-auto pb-12 transition-all ${
              activeViewMode === 'editor'
                ? 'fixed left-[-9999px] top-0 pointer-events-none opacity-0'
                : activeViewMode === 'split'
                ? 'flex flex-col items-center lg:col-span-7'
                : 'flex flex-col items-center lg:col-span-12'
            }`}
          >
            {/* Quick Export Banner right above the document */}
            <div className="no-print w-full max-w-[210mm] mb-3 p-3 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-800">Generated Lesson Plan Document Ready</span>
                <span className="text-[11px] text-slate-500 hidden sm:inline">&bull; 2.0 cm margins &bull; Nunito 11pt</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    const subSuffix = (state.selectedSubtopicIds && state.selectedSubtopicIds.length > 0)
                      ? state.selectedSubtopicIds.join('-')
                      : state.selectedSubtopicId;
                    await exportToPdf('printable-lesson-plan', `Semesta_IGCSE_0580_LP_${subSuffix}_${state.teacherName.replace(/\s+/g, '_')}.pdf`);
                  }}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-200" /> Download PDF
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    const subSuffix = (state.selectedSubtopicIds && state.selectedSubtopicIds.length > 0)
                      ? state.selectedSubtopicIds.join('-')
                      : state.selectedSubtopicId;
                    const blob = await exportToDocx(state);
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `Semesta_IGCSE_0580_LP_${subSuffix}_${state.teacherName.replace(/\s+/g, '_')}.docx`;
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(() => {
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }, 1000);
                  }}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-200" /> Download DOCX
                </button>
                <button
                  type="button"
                  onClick={() => printLessonPlan('printable-lesson-plan')}
                  className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg flex items-center gap-1.5 transition-colors"
                  title="Print or Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" /> Print / Save
                </button>
              </div>
            </div>

            <LessonPlanPreview
              state={state}
              onUpdateState={setState}
              onOpenTeacherSignature={() => setIsTeacherSigOpen(true)}
              onOpenPrincipalSignature={() => setIsPrincipalSigOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Teacher Signature Modal */}
      <SignatureModal
        isOpen={isTeacherSigOpen}
        onClose={() => setIsTeacherSigOpen(false)}
        title="Teacher Signature & Stamp"
        signerName={state.teacherName}
        signerRole="Subject Teacher (IGCSE Math 0580)"
        currentSignatureUrl={state.teacherSignatureUrl}
        onSaveSignature={(dataUrl) => setState((p) => ({ ...p, teacherSignatureUrl: dataUrl }))}
      />

      {/* Principal Signature Modal */}
      <SignatureModal
        isOpen={isPrincipalSigOpen}
        onClose={() => setIsPrincipalSigOpen(false)}
        title="Principal Approval Signature"
        signerName={state.principalName}
        signerRole="Principal of SMA & Head of Center"
        currentSignatureUrl={state.principalSignatureUrl}
        onSaveSignature={(dataUrl) => setState((p) => ({ ...p, principalSignatureUrl: dataUrl, isPrincipalApproved: true }))}
      />
    </div>
  );
}
