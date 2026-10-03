import React from 'react';
import { LessonPlanState } from '../types/lessonPlan';
import { HeaderBanner } from './HeaderBanner';
import { ExternalLink, Check, CheckSquare, Square } from 'lucide-react';

interface LessonPlanPreviewProps {
  state: LessonPlanState;
  onUpdateState: (updater: (prev: LessonPlanState) => LessonPlanState) => void;
  onOpenTeacherSignature: () => void;
  onOpenPrincipalSignature: () => void;
  isLiveEditable?: boolean;
}

export const LessonPlanPreview: React.FC<LessonPlanPreviewProps> = ({
  state,
  onUpdateState,
  onOpenTeacherSignature,
  onOpenPrincipalSignature,
  isLiveEditable = false
}) => {
  const primary = state.primaryColor || '#1e3a8a';
  const secondary = state.secondaryColor || '#0f766e';
  const accent = state.accentColor || '#d97706';

  return (
    <div
      id="printable-lesson-plan"
      className="bg-white text-slate-800 shadow-2xl mx-auto border border-slate-300 transition-all font-['Nunito',sans-serif]"
      style={{
        width: '100%',
        maxWidth: '210mm', // Standard A4 width
        minHeight: '297mm', // Standard A4 height
        padding: '20mm', // Exactly 2.0 cm margins on all sides
        fontSize: '11pt', // Exactly 11pt font
        lineHeight: 1.5, // Exactly 1.5 line spacing
        boxSizing: 'border-box'
      }}
    >
      {/* 1. Official Header Image / Banner across top */}
      <HeaderBanner
        headerImageUrl={state.headerImageUrl}
        primaryColor={primary}
        onUpdateHeader={(url) => onUpdateState((p) => ({ ...p, headerImageUrl: url }))}
        isEditable={true}
      />

      {/* 2. Top Information Metadata Bar */}
      <div className="mb-5 overflow-hidden rounded-sm border border-slate-300">
        <div
          className="px-4 py-2 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-between"
          style={{
            background: `linear-gradient(90deg, ${primary} 0%, ${secondary} 100%)`
          }}
        >
          <span>I. LESSON METADATA & CAMBRIDGE OBJECTIVES</span>
          <span className="text-[10px] text-amber-200">Semesta SMA Official Template</span>
        </div>

        <table className="w-full text-xs border-collapse">
          <tbody>
            <tr className="border-b border-slate-200">
              <td className="w-1/4 p-2 bg-slate-50 font-bold text-slate-700 border-r border-slate-200">
                Teacher Name:
              </td>
              <td className="w-1/4 p-2 border-r border-slate-200 font-semibold text-slate-900">
                {state.teacherName}
              </td>
              <td className="w-1/4 p-2 bg-slate-50 font-bold text-slate-700 border-r border-slate-200">
                Principal Name:
              </td>
              <td className="w-1/4 p-2 font-semibold text-slate-900">
                {state.principalName}
              </td>
            </tr>

            <tr className="border-b border-slate-200">
              <td className="p-2 bg-slate-50 font-bold text-slate-700 border-r border-slate-200">
                Year Group / Level:
              </td>
              <td className="p-2 border-r border-slate-200 font-semibold text-slate-900">
                {state.yearGroup} ({state.targetLevel})
              </td>
              <td className="p-2 bg-slate-50 font-bold text-slate-700 border-r border-slate-200">
                Duration / Meetings:
              </td>
              <td className="p-2 font-semibold text-slate-900">
                {state.durationPerMeeting} | {state.totalMeetings} Meeting{state.totalMeetings > 1 ? 's' : ''}
              </td>
            </tr>

            <tr className="border-b border-slate-200">
              <td className="p-2 bg-slate-50 font-bold text-slate-700 border-r border-slate-200">
                Unit / Topic(s):
              </td>
              <td className="p-2 border-r border-slate-200 font-bold text-blue-900">
                {state.customTopicTitle || `Topic ${state.selectedTopicId}`}
              </td>
              <td className="p-2 bg-slate-50 font-bold text-slate-700 border-r border-slate-200">
                Subtopic(s) &amp; Codes:
              </td>
              <td className="p-2 font-bold text-emerald-900">
                <div>{state.customSubtopicTitle || state.selectedSubtopicId}</div>
                <div className="text-[10px] font-mono text-slate-600 font-normal mt-0.5">
                  Objectives: [{state.customObjectives.join(', ')}]
                </div>
              </td>
            </tr>

            <tr className="border-b border-slate-200">
              <td className="p-2 bg-slate-50 font-bold text-slate-700 border-r border-slate-200">
                Date Range / Period:
              </td>
              <td className="p-2 border-r border-slate-200 font-semibold text-slate-900">
                {state.dateRange}
              </td>
              <td className="p-2 bg-slate-50 font-bold text-slate-700 border-r border-slate-200">
                Academic Term:
              </td>
              <td className="p-2 font-semibold text-slate-900">
                {state.semesterTerm}
              </td>
            </tr>

            <tr>
              <td className="p-2 bg-slate-50 font-bold text-slate-700 border-r border-slate-200 align-top">
                Cambridge Assessment Objectives:
              </td>
              <td colSpan={3} className="p-2 text-slate-800">
                <div className="space-y-0.5">
                  <div>
                    <strong className="text-blue-800">AO1 (Mathematical techniques):</strong> {state.ao1Focus}
                  </div>
                  <div>
                    <strong className="text-emerald-800">AO2 (Applying techniques to solve problems):</strong>{' '}
                    {state.ao2Focus}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 3. Integrated WALT / WILF / SLO Table (Single Table, 3 Columns) */}
      <div className="mb-5 overflow-hidden rounded-sm border border-slate-300 page-break-avoid">
        <div
          className="px-4 py-2 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-between"
          style={{ backgroundColor: primary }}
        >
          <span>II. INTEGRATED WALT, WILF &amp; SLO (STUDENT LEARNING OUTCOMES)</span>
          <span className="text-[10px] text-amber-200">Single 3-Column Integrated Table</span>
        </div>

        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-300 bg-slate-100 text-slate-800 font-bold">
              <th className="w-1/3 p-2.5 text-left border-r border-slate-300" style={{ color: primary }}>
                1. WALT (We Are Learning To)
              </th>
              <th className="w-1/3 p-2.5 text-left border-r border-slate-300" style={{ color: primary }}>
                2. WILF (What I'm Looking For)
              </th>
              <th className="w-1/3 p-2.5 text-left" style={{ color: primary }}>
                3. SLO &amp; Language Objectives
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="align-top">
              {/* Column 1: WALT */}
              <td className="p-3 border-r border-slate-300 leading-relaxed bg-white">
                <p className="font-semibold text-slate-900 mb-2">
                  {state.walt}
                </p>
                <div className="mt-3 p-2 bg-amber-50/80 border border-amber-200 rounded text-[11px] text-amber-900">
                  <span className="font-bold block text-amber-950 mb-0.5">Scaffolding Focus:</span>
                  Emphasizes step-by-step foundational working with clean integer numbers to minimize cognitive load for middle-to-low achieving students.
                </div>
              </td>

              {/* Column 2: WILF */}
              <td className="p-3 border-r border-slate-300 leading-relaxed bg-white">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Success Criteria Checklist:
                </p>
                <ul className="space-y-1.5">
                  {state.wilf.map((criterion, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-slate-800">
                      <span className="text-emerald-600 font-bold mt-0.5">☑</span>
                      <span className="leading-snug">{criterion}</span>
                    </li>
                  ))}
                </ul>
              </td>

              {/* Column 3: SLO & Language Objectives */}
              <td className="p-3 leading-relaxed bg-white">
                <div className="space-y-2.5">
                  <div>
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                      Measurable Outcomes (SLO):
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-800">
                      {state.slo.map((s, idx) => (
                        <li key={idx} className="leading-snug">{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-1 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                      CLIL Key Terminology:
                    </span>
                    <div className="space-y-1 text-[11px]">
                      {state.keyTerms.map((kt, idx) => (
                        <div key={idx} className="leading-tight">
                          <strong className="text-blue-900">{kt.term}</strong>
                          {kt.indonesianGloss && (
                            <span className="text-slate-500 italic"> ({kt.indonesianGloss})</span>
                          )}
                          : <span className="text-slate-700">{kt.definition}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-1 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                      EAL / Bilingual Support:
                    </span>
                    <ul className="list-square list-inside space-y-0.5 text-[11px] text-slate-700">
                      {state.ealSupport.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 3. Differentiation Provisions Table */}
      <div className="mb-5 overflow-hidden rounded-sm border border-slate-300 page-break-avoid">
        <div
          className="px-4 py-2 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-between"
          style={{ backgroundColor: secondary }}
        >
          <span>III. MULTI-TIER DIFFERENTIATION PROVISIONS</span>
          <span className="text-[10px] text-amber-200">Scaffolded for Diverse Readiness</span>
        </div>

        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-300 font-bold">
              <th className="w-1/3 p-2 bg-amber-50 text-amber-900 border-r border-slate-300 text-left">
                Struggled Scaffolding (Level 1)
              </th>
              <th className="w-1/3 p-2 bg-sky-50 text-sky-900 border-r border-slate-300 text-left">
                EAL / Language Support (Level 2)
              </th>
              <th className="w-1/3 p-2 bg-emerald-50 text-emerald-900 text-left">
                High-Achieving Extension (Level 3)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="align-top bg-white">
              <td className="p-3 border-r border-slate-300 leading-relaxed">
                <ul className="space-y-1.5 list-disc list-inside text-slate-800">
                  {state.struggledScaffolding.map((item, idx) => (
                    <li key={idx} className="leading-snug">{item}</li>
                  ))}
                </ul>
              </td>

              <td className="p-3 border-r border-slate-300 leading-relaxed">
                <ul className="space-y-1.5 list-disc list-inside text-slate-800">
                  {state.ealProvisions.map((item, idx) => (
                    <li key={idx} className="leading-snug">{item}</li>
                  ))}
                </ul>
              </td>

              <td className="p-3 leading-relaxed">
                <ul className="space-y-1.5 list-disc list-inside text-slate-800">
                  {state.extensionTasks.map((item, idx) => (
                    <li key={idx} className="leading-snug">{item}</li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 4. 5E Instructional Model (Generated per Meeting) */}
      <div className="mb-5 space-y-4">
        <div
          className="px-4 py-2 text-white font-bold text-xs uppercase tracking-wider rounded-t-sm flex items-center justify-between"
          style={{ backgroundColor: primary }}
        >
          <span>IV. 5E INSTRUCTIONAL MODEL &mdash; LESSON DELIVERY SEQUENCE</span>
          <span className="text-[10px] text-amber-200">
            {state.meetings.length} Meeting{state.meetings.length > 1 ? 's' : ''} &bull; {state.durationPerMeeting}
          </span>
        </div>

        {state.meetings.map((meeting) => (
          <div
            key={meeting.meetingNumber}
            className="border border-slate-300 rounded-sm overflow-hidden page-break-avoid"
          >
            {/* Meeting Title Banner */}
            <div className="bg-slate-100 border-b border-slate-300 px-3.5 py-1.5 flex items-center justify-between">
              <div className="font-bold text-xs text-blue-900 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-blue-700 text-white rounded text-[10px] font-bold">
                  Session {meeting.meetingNumber} of {state.totalMeetings}
                </span>
                <span>{meeting.topicFocus}</span>
              </div>
              <span className="text-[11px] text-slate-500 font-semibold">{state.durationPerMeeting}</span>
            </div>

            {/* Starter Hook */}
            <div className="px-3.5 py-2 bg-amber-50/60 border-b border-slate-200 text-xs flex items-start gap-2">
              <span className="font-bold text-amber-900 whitespace-nowrap">Starter / Stimulus:</span>
              <span className="text-amber-950 leading-snug">{meeting.starterHook}</span>
            </div>

            {/* 5E Stages Table */}
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-600 text-[11px]">
                  <th className="w-1/6 p-2 text-left border-r border-slate-200">5E Stage</th>
                  <th className="w-3/6 p-2 text-left border-r border-slate-200">Activity &amp; Scaffolding Strategy</th>
                  <th className="w-2/6 p-2 text-left">Teacher &amp; Student Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* 1. Engage */}
                <tr className="border-b border-slate-200 align-top">
                  <td className="p-2 border-r border-slate-200 font-bold text-amber-800 bg-amber-50/30">
                    Engage (10 min)
                  </td>
                  <td className="p-2 border-r border-slate-200">
                    <p className="font-semibold text-slate-900 mb-1">{meeting.engage.description}</p>
                    {meeting.engage.sampleProblem && (
                      <div className="text-[11px] p-1.5 bg-slate-50 border border-slate-200 rounded font-mono text-slate-700">
                        Task: {meeting.engage.sampleProblem}
                      </div>
                    )}
                    <p className="text-[11px] text-amber-900 italic mt-1">
                      Scaffolding: {meeting.engage.scaffoldingTips}
                    </p>
                  </td>
                  <td className="p-2 text-[11px] leading-tight space-y-1">
                    <div><strong className="text-blue-800">T:</strong> {meeting.engage.teacherRole}</div>
                    <div><strong className="text-emerald-800">S:</strong> {meeting.engage.studentRole}</div>
                  </td>
                </tr>

                {/* 2. Explore */}
                <tr className="border-b border-slate-200 align-top">
                  <td className="p-2 border-r border-slate-200 font-bold text-sky-800 bg-sky-50/30">
                    Explore (20 min)
                  </td>
                  <td className="p-2 border-r border-slate-200">
                    <p className="font-semibold text-slate-900 mb-1">{meeting.explore.description}</p>
                    {meeting.explore.sampleProblem && (
                      <div className="text-[11px] p-1.5 bg-slate-50 border border-slate-200 rounded font-mono text-slate-700">
                        Inquiry: {meeting.explore.sampleProblem}
                      </div>
                    )}
                    <p className="text-[11px] text-sky-900 italic mt-1">
                      Scaffolding: {meeting.explore.scaffoldingTips}
                    </p>
                  </td>
                  <td className="p-2 text-[11px] leading-tight space-y-1">
                    <div><strong className="text-blue-800">T:</strong> {meeting.explore.teacherRole}</div>
                    <div><strong className="text-emerald-800">S:</strong> {meeting.explore.studentRole}</div>
                  </td>
                </tr>

                {/* 3. Explain */}
                <tr className="border-b border-slate-200 align-top">
                  <td className="p-2 border-r border-slate-200 font-bold text-pink-800 bg-pink-50/30">
                    Explain (15 min)
                  </td>
                  <td className="p-2 border-r border-slate-200">
                    <p className="font-semibold text-slate-900 mb-1">{meeting.explain.description}</p>
                    {meeting.explain.sampleProblem && (
                      <div className="text-[11px] p-1.5 bg-slate-50 border border-slate-200 rounded font-mono text-slate-700">
                        Board Model: {meeting.explain.sampleProblem}
                      </div>
                    )}
                    <p className="text-[11px] text-pink-900 italic mt-1">
                      Scaffolding: {meeting.explain.scaffoldingTips}
                    </p>
                  </td>
                  <td className="p-2 text-[11px] leading-tight space-y-1">
                    <div><strong className="text-blue-800">T:</strong> {meeting.explain.teacherRole}</div>
                    <div><strong className="text-emerald-800">S:</strong> {meeting.explain.studentRole}</div>
                  </td>
                </tr>

                {/* 4. Elaborate */}
                <tr className="border-b border-slate-200 align-top">
                  <td className="p-2 border-r border-slate-200 font-bold text-emerald-800 bg-emerald-50/30">
                    Elaborate (20 min)
                  </td>
                  <td className="p-2 border-r border-slate-200">
                    <p className="font-semibold text-slate-900 mb-1">{meeting.elaborate.description}</p>
                    {meeting.elaborate.sampleProblem && (
                      <div className="text-[11px] p-1.5 bg-slate-50 border border-slate-200 rounded font-mono text-slate-700">
                        Practice: {meeting.elaborate.sampleProblem}
                      </div>
                    )}
                    <p className="text-[11px] text-emerald-900 italic mt-1">
                      Scaffolding: {meeting.elaborate.scaffoldingTips}
                    </p>
                  </td>
                  <td className="p-2 text-[11px] leading-tight space-y-1">
                    <div><strong className="text-blue-800">T:</strong> {meeting.elaborate.teacherRole}</div>
                    <div><strong className="text-emerald-800">S:</strong> {meeting.elaborate.studentRole}</div>
                  </td>
                </tr>

                {/* 5. Evaluate */}
                <tr className="align-top">
                  <td className="p-2 border-r border-slate-200 font-bold text-purple-800 bg-purple-50/30">
                    Evaluate (15 min)
                  </td>
                  <td className="p-2 border-r border-slate-200">
                    <p className="font-semibold text-slate-900 mb-1">{meeting.evaluate.description}</p>
                    {meeting.evaluate.sampleProblem && (
                      <div className="text-[11px] p-1.5 bg-purple-50 border border-purple-200 rounded font-mono text-purple-900 font-bold">
                        Exit Ticket: {meeting.evaluate.sampleProblem}
                      </div>
                    )}
                    <p className="text-[11px] text-purple-900 italic mt-1">
                      Diagnosis: {meeting.evaluate.scaffoldingTips}
                    </p>
                  </td>
                  <td className="p-2 text-[11px] leading-tight space-y-1">
                    <div><strong className="text-blue-800">T:</strong> {meeting.evaluate.teacherRole}</div>
                    <div><strong className="text-emerald-800">S:</strong> {meeting.evaluate.studentRole}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* 5. Formative Assessment, Exercises & Post-Lesson Reflection Table */}
      <div className="mb-5 overflow-hidden rounded-sm border border-slate-300 page-break-avoid">
        <div
          className="px-4 py-2 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-between"
          style={{ backgroundColor: primary }}
        >
          <span>V. FORMATIVE EXERCISES &amp; POST-LESSON REFLECTION</span>
          <span className="text-[10px] text-amber-200">Aligned with SLO Mastery</span>
        </div>

        <table className="w-full text-xs border-collapse">
          <tbody>
            <tr className="border-b border-slate-200">
              <td className="w-1/4 p-2.5 bg-slate-50 font-bold text-slate-700 border-r border-slate-200">
                Level 1 Formative (Entry):
              </td>
              <td className="w-3/4 p-2.5 font-medium text-slate-800">
                {state.formativeExercises.level1}
              </td>
            </tr>

            <tr className="border-b border-slate-200">
              <td className="p-2.5 bg-slate-50 font-bold text-slate-700 border-r border-slate-200">
                Level 2 Formative (Core):
              </td>
              <td className="p-2.5 font-medium text-slate-800">
                {state.formativeExercises.level2}
              </td>
            </tr>

            <tr className="border-b border-slate-200">
              <td className="p-2.5 bg-slate-50 font-bold text-slate-700 border-r border-slate-200">
                Level 3 Formative (Stretch):
              </td>
              <td className="p-2.5 font-medium text-slate-800">
                {state.formativeExercises.level3}
              </td>
            </tr>

            <tr className="border-b border-slate-200">
              <td className="p-2.5 bg-slate-50 font-bold text-slate-700 border-r border-slate-200">
                Homework / Consolidation:
              </td>
              <td className="p-2.5 font-medium text-slate-800">
                {state.formativeExercises.homework}
              </td>
            </tr>

            <tr className="align-top">
              <td className="p-2.5 bg-slate-50 font-bold text-blue-900 border-r border-slate-200">
                Post-Lesson Teacher Reflection Prompts:
              </td>
              <td className="p-2.5 text-slate-700 text-[11px] leading-relaxed space-y-1">
                <div>
                  <strong>• Student Comprehension:</strong> {state.reflectionPrompts.comprehensionEvaluation}
                </div>
                <div>
                  <strong>• Scaffolding Impact:</strong> {state.reflectionPrompts.scaffoldingEffectiveness}
                </div>
                <div>
                  <strong>• Next Steps / Remediation:</strong> {state.reflectionPrompts.nextSteps}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 6. Resource List Table */}
      <div className="mb-5 overflow-hidden rounded-sm border border-slate-300 page-break-avoid">
        <div
          className="px-4 py-2 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-between"
          style={{ backgroundColor: secondary }}
        >
          <span>VI. CURRICULUM MEDIA &amp; EDUCATIONAL RESOURCES</span>
          <span className="text-[10px] text-amber-200">Physical &amp; Digital Materials</span>
        </div>

        <table className="w-full text-xs border-collapse">
          <tbody>
            <tr className="border-b border-slate-200">
              <td className="w-1/3 p-2 bg-slate-50 font-bold text-slate-700 border-r border-slate-200">
                Official Coursebook Pages:
              </td>
              <td className="w-2/3 p-2 font-medium text-slate-800">
                {state.coursebookReference}
              </td>
            </tr>

            <tr className="border-b border-slate-200">
              <td className="p-2 bg-slate-50 font-bold text-slate-700 border-r border-slate-200">
                Teacher Digital Resources:
              </td>
              <td className="p-2">
                {state.teacherResourcesUrl ? (
                  <a
                    href={state.teacherResourcesUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-700 underline flex items-center gap-1 font-semibold"
                  >
                    {state.teacherResourcesUrl} <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-slate-400 italic">None specified</span>
                )}
              </td>
            </tr>

            <tr className="border-b border-slate-200">
              <td className="p-2 bg-slate-50 font-bold text-slate-700 border-r border-slate-200">
                Student Activities / Worksheets:
              </td>
              <td className="p-2">
                {state.studentWorksheetsUrl ? (
                  <a
                    href={state.studentWorksheetsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-700 underline flex items-center gap-1 font-semibold"
                  >
                    {state.studentWorksheetsUrl} <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-slate-400 italic">None specified</span>
                )}
              </td>
            </tr>

            <tr className="border-b border-slate-200">
              <td className="p-2 bg-slate-50 font-bold text-slate-700 border-r border-slate-200">
                Manipulatives &amp; Visual Tools:
              </td>
              <td className="p-2 text-slate-800 font-medium">
                {state.manipulativeTools}
              </td>
            </tr>

            <tr>
              <td className="p-2 bg-slate-50 font-bold text-slate-700 border-r border-slate-200">
                Scaffolding Strategy &amp; Notes:
              </td>
              <td className="p-2 text-slate-800 italic text-[11px]">
                {state.customPedagogicalNotes || 'Direct instruction, integer scaffolding, formative exit tickets.'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 7. Sign-off Footer Table */}
      <div className="overflow-hidden rounded-sm border border-slate-300 page-break-avoid">
        <div
          className="px-4 py-2 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-between"
          style={{ backgroundColor: primary }}
        >
          <span>VII. ADMINISTRATIVE SIGN-OFF &amp; APPROVAL VERIFICATION</span>
          <span className="text-[10px] text-amber-200">Semesta Bilingual Boarding School</span>
        </div>

        <table className="w-full text-xs border-collapse">
          <tbody>
            <tr className="align-top">
              {/* Teacher Column */}
              <td className="w-1/2 p-4 border-r border-slate-300 bg-white">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Prepared &amp; Submitted by:
                </p>

                {/* Signature Image Box */}
                <div
                  onClick={onOpenTeacherSignature}
                  className="h-20 w-48 border border-dashed border-slate-300 rounded bg-slate-50/50 flex items-center justify-center p-1.5 cursor-pointer hover:border-blue-500 transition-colors my-2 group"
                  title="Click to change or draw signature"
                >
                  {state.teacherSignatureUrl ? (
                    <img
                      src={state.teacherSignatureUrl}
                      alt="Fitria Rakhmawati Signature"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-[11px] text-slate-400 group-hover:text-blue-600 font-semibold">
                      Click to sign
                    </span>
                  )}
                </div>

                <div className="font-bold text-sm text-slate-900 mt-2">
                  Fitria Rakhmawati, S.Pd.
                </div>
                <div className="text-[11px] text-slate-600">
                  Subject Teacher &bull; IGCSE Mathematics 0580
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Semesta Bilingual Boarding School, Semarang
                </div>
                <div className="text-[11px] text-slate-700 font-semibold mt-2">
                  Submission Date: {state.signDate}
                </div>
              </td>

              {/* Principal Column */}
              <td className="w-1/2 p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Acknowledged &amp; Approved by:
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {state.isPrincipalApproved ? (
                      <>
                        <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                        <span>APPROVED</span>
                      </>
                    ) : (
                      <>
                        <Square className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-slate-500">PENDING REVIEW</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Signature Image Box */}
                <div
                  onClick={onOpenPrincipalSignature}
                  className="h-20 w-48 border border-dashed border-slate-300 rounded bg-slate-50/50 flex items-center justify-center p-1.5 cursor-pointer hover:border-blue-500 transition-colors my-2 group"
                  title="Click to change or draw signature"
                >
                  {state.principalSignatureUrl ? (
                    <img
                      src={state.principalSignatureUrl}
                      alt="Ahmad Nurani Signature"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-[11px] text-slate-400 group-hover:text-blue-600 font-semibold">
                      Click to sign
                    </span>
                  )}
                </div>

                <div className="font-bold text-sm text-slate-900 mt-2">
                  Ahmad Nurani, S.T., M.Pd.
                </div>
                <div className="text-[11px] text-slate-600">
                  Principal of SMA &bull; Head of Cambridge Center ID058
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Semesta Bilingual Boarding School, Semarang
                </div>
                <div className="text-[11px] text-slate-700 font-semibold mt-2">
                  Approval Date: {state.signDate}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Document footer meta */}
      <div className="mt-4 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
        <span>Semesta Bilingual Boarding School &bull; IGCSE Mathematics 0580 Lesson Plan</span>
        <span>Page Margins: 2.0 cm &bull; Font: Nunito 11pt &bull; Line Spacing: 1.5</span>
      </div>
    </div>
  );
};
