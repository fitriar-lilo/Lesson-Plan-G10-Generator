import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  Layers,
  Palette,
  UserCheck,
  Sparkles,
  Link as LinkIcon,
  ChevronDown,
  ChevronUp,
  Sliders,
  CheckCircle2,
  FileSpreadsheet,
  Lightbulb,
  Plus,
  HelpCircle,
  Brain,
  Check,
  X,
  FolderPlus,
  ListFilter
} from 'lucide-react';
import { LessonPlanState } from '../types/lessonPlan';
import {
  CURRICULUM_DATA,
  COLOR_THEMES,
  generateMeetingsForSubtopic,
  CAMBRIDGE_OBJECTIVE_DESCRIPTIONS,
  synthesizeMultiSubtopicsPlan,
  findSubtopicById
} from '../data/curriculumData';

const PRESET_TEACHING_METHODS = [
  'Direct Explicit Instruction (I Do, We Do, You Do)',
  'Concrete-Representational-Abstract (CRA) Framework',
  'Guided Inquiry & Discovery Learning',
  'Cooperative Learning (Rally-Coach Pairs)',
  'Worked-Example Effect & Faded Scaffolding',
  'Visual & Spatial Modeling (Algebra Tiles / Bar Models)',
  'Diagnostic Questioning & Mini-Whiteboards',
  'Real-World Problem-Based Learning (PBL)',
  'Spot-the-Blunder Error Analysis Carousel',
  'Low-Floor High-Ceiling Tiered Tasks'
];

interface ConfigPanelProps {
  state: LessonPlanState;
  onChange: (updater: (prev: LessonPlanState) => LessonPlanState) => void;
  onOpenTeacherSignature: () => void;
  onOpenPrincipalSignature: () => void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
  state,
  onChange,
  onOpenTeacherSignature,
  onOpenPrincipalSignature
}) => {
  const [activeTab, setActiveTab] = useState<'metadata' | 'curriculum' | 'methodology' | '5e' | 'diff' | 'resources' | 'appearance'>('curriculum');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [customMethodInput, setCustomMethodInput] = useState('');
  const [expandedTopicIds, setExpandedTopicIds] = useState<number[]>([state.selectedTopicId || 14]);
  const [customObjectiveInput, setCustomObjectiveInput] = useState('');

  const currentSubtopicIds = (state.selectedSubtopicIds && state.selectedSubtopicIds.length > 0)
    ? state.selectedSubtopicIds
    : [state.selectedSubtopicId || '14.1'];

  const toggleTopicAccordion = (topicId: number) => {
    setExpandedTopicIds((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const applySynthesizedPlan = (subIds: string[]) => {
    const plan = synthesizeMultiSubtopicsPlan(subIds, state.totalMeetings);
    onChange((prev) => ({
      ...prev,
      selectedTopicIds: plan.topicIds,
      selectedSubtopicIds: plan.subtopicIds,
      selectedTopicId: plan.topicIds[0],
      selectedSubtopicId: plan.subtopicIds[0],
      customTopicTitle: plan.topicTitles.join(' | '),
      customSubtopicTitle: plan.subtopicTitles.join(', '),
      customObjectives: plan.objectives,
      walt: plan.walt,
      wilf: plan.wilf,
      slo: plan.slo,
      keyTerms: plan.keyTerms,
      ealSupport: plan.ealSupport,
      struggledScaffolding: plan.struggledScaffolding,
      ealProvisions: plan.ealProvisions,
      extensionTasks: plan.extensionTasks,
      formativeExercises: plan.formativeExercises,
      coursebookReference: plan.coursebookReference,
      manipulativeTools: plan.manipulativeTools,
      meetings: plan.meetings
    }));
  };

  const handleToggleSubtopic = (subId: string) => {
    let nextSubIds: string[];
    if (currentSubtopicIds.includes(subId)) {
      if (currentSubtopicIds.length === 1) return; // Keep at least 1 subtopic
      nextSubIds = currentSubtopicIds.filter((id) => id !== subId);
    } else {
      nextSubIds = [...currentSubtopicIds, subId];
    }
    applySynthesizedPlan(nextSubIds);
  };

  const handleSelectAllInTopic = (topicId: number) => {
    const topic = CURRICULUM_DATA.find((t) => t.id === topicId);
    if (!topic) return;
    const topicSubIds = topic.subtopics.map((s) => s.id);
    const nextSubIds = Array.from(new Set([...currentSubtopicIds, ...topicSubIds]));
    applySynthesizedPlan(nextSubIds);
  };

  const handleClearTopic = (topicId: number) => {
    const topic = CURRICULUM_DATA.find((t) => t.id === topicId);
    if (!topic) return;
    const topicSubIds = topic.subtopics.map((s) => s.id);
    const remaining = currentSubtopicIds.filter((id) => !topicSubIds.includes(id));
    if (remaining.length === 0) return; // Keep at least one
    applySynthesizedPlan(remaining);
  };

  const handleApplyComboPreset = (subIds: string[]) => {
    applySynthesizedPlan(subIds);
  };

  const handleToggleObjective = (objCode: string) => {
    const current = state.customObjectives || [];
    let next: string[];
    if (current.includes(objCode)) {
      if (current.length === 1) return; // Keep at least 1
      next = current.filter((c) => c !== objCode);
    } else {
      next = [...current, objCode];
    }
    onChange((prev) => ({ ...prev, customObjectives: next }));
  };

  const handleAddCustomObjective = () => {
    const trimmed = customObjectiveInput.trim().toUpperCase();
    if (!trimmed) return;
    const current = state.customObjectives || [];
    if (!current.includes(trimmed)) {
      onChange((prev) => ({ ...prev, customObjectives: [...current, trimmed] }));
    }
    setCustomObjectiveInput('');
  };

  const handleMeetingsCountChange = (newCount: number) => {
    const currentSubs = (state.selectedSubtopicIds && state.selectedSubtopicIds.length > 0)
      ? state.selectedSubtopicIds
      : [state.selectedSubtopicId || '14.1'];

    const plan = synthesizeMultiSubtopicsPlan(currentSubs, newCount);
    onChange((prev) => ({
      ...prev,
      totalMeetings: newCount,
      meetings: plan.meetings
    }));
  };

  const applyColorTheme = (theme: typeof COLOR_THEMES[0]) => {
    onChange((prev) => ({
      ...prev,
      primaryColor: theme.primaryColor,
      secondaryColor: theme.secondaryColor,
      accentColor: theme.accentColor
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden no-print transition-all">
      {/* Panel Top Title Bar */}
      <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-blue-600/30 text-blue-400 rounded-lg border border-blue-500/30">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-sm tracking-wide">Lesson Plan Control Center</h2>
            <p className="text-xs text-slate-400">Semesta SMA &bull; Cambridge IGCSE Math (0580)</p>
          </div>
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
          title={isCollapsed ? 'Expand Configuration' : 'Collapse Configuration'}
        >
          {isCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
        </button>
      </div>

      {!isCollapsed && (
        <>
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50/70 overflow-x-auto text-xs font-semibold">
            <button
              onClick={() => setActiveTab('metadata')}
              className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'metadata'
                  ? 'border-blue-700 text-blue-800 bg-white font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" /> 1. Meta Data
            </button>

            <button
              onClick={() => setActiveTab('curriculum')}
              className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'curriculum'
                  ? 'border-blue-700 text-blue-800 bg-white font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> 2. Topic & WALT/WILF
            </button>

            <button
              onClick={() => setActiveTab('methodology')}
              className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'methodology'
                  ? 'border-amber-600 text-amber-900 bg-amber-50/50 font-bold'
                  : 'border-transparent text-slate-700 hover:text-amber-800 hover:bg-amber-50/20'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>3. Teaching Method &amp; Ideas</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-extrabold uppercase tracking-wider ml-0.5">
                Write
              </span>
            </button>

            <button
              onClick={() => setActiveTab('5e')}
              className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === '5e'
                  ? 'border-blue-700 text-blue-800 bg-white font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> 4. 5E Meetings ({state.totalMeetings})
            </button>

            <button
              onClick={() => setActiveTab('diff')}
              className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'diff'
                  ? 'border-blue-700 text-blue-800 bg-white font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> 5. Scaffolding & Exercises
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'resources'
                  ? 'border-blue-700 text-blue-800 bg-white font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" /> 6. Media & Links
            </button>

            <button
              onClick={() => setActiveTab('appearance')}
              className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'appearance'
                  ? 'border-blue-700 text-blue-800 bg-white font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Palette className="w-3.5 h-3.5" /> 7. Colors & Sign-off
            </button>
          </div>

          {/* Tab Contents */}
          <div className="p-5 max-h-[480px] overflow-y-auto">
            {/* TAB 1: METADATA */}
            {activeTab === 'metadata' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Teacher Name (Pengampu)
                  </label>
                  <input
                    type="text"
                    value={state.teacherName}
                    onChange={(e) => onChange((p) => ({ ...p, teacherName: e.target.value }))}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Pre-filled with Fitria Rakhmawati</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Principal Name (Kepala Sekolah)
                  </label>
                  <input
                    type="text"
                    value={state.principalName}
                    onChange={(e) => onChange((p) => ({ ...p, principalName: e.target.value }))}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Pre-filled with Ahmad Nurani, S.T., M.Pd.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Time Duration per Meeting
                  </label>
                  <select
                    value={state.durationPerMeeting}
                    onChange={(e) => onChange((p) => ({ ...p, durationPerMeeting: e.target.value }))}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                  >
                    <option value="80 min (Double Period)">80 min (Double Period — Standard)</option>
                    <option value="40 min (Single Period)">40 min (Single Period)</option>
                    <option value="90 min (Block Schedule)">90 min (Block Schedule)</option>
                    <option value="60 min">60 min</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Number of Meetings (Total Sesi)
                  </label>
                  <select
                    value={state.totalMeetings}
                    onChange={(e) => handleMeetingsCountChange(parseInt(e.target.value, 10))}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white font-bold text-blue-700"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <option key={num} value={num}>
                        {num} Meeting{num > 1 ? 's' : ''} (Auto-generates full 5E cycle)
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-500 mt-1">Select from 1 to 12 meetings.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Date Range / Single Date
                  </label>
                  <input
                    type="text"
                    value={state.dateRange}
                    onChange={(e) => onChange((p) => ({ ...p, dateRange: e.target.value }))}
                    placeholder="e.g. 12 - 23 October 2026"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Academic Term & Year Group
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={state.semesterTerm}
                      onChange={(e) => onChange((p) => ({ ...p, semesterTerm: e.target.value }))}
                      className="text-xs px-3 py-2 border border-slate-300 rounded-md"
                    />
                    <input
                      type="text"
                      value={state.yearGroup}
                      onChange={(e) => onChange((p) => ({ ...p, yearGroup: e.target.value }))}
                      className="text-xs px-3 py-2 border border-slate-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2.5">
                  <div className="text-amber-700 font-bold text-xs mt-0.5">Scaffolding Target:</div>
                  <div className="text-xs text-amber-900 leading-relaxed">
                    <strong>{state.targetLevel}</strong>: All calculations, worked examples, and formative questions are designed around clean, positive integer calculations and multi-tier differentiation.
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: TOPIC, SUBTOPIC & OBJECTIVE SELECTORS (MULTI-SELECT) */}
            {activeTab === 'curriculum' && (
              <div className="space-y-4">
                {/* Selected Subtopics Summary & Action Bar */}
                <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-blue-950 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-700" />
                        Selected Subtopics ({currentSubtopicIds.length}):
                      </span>
                      <span className="text-[11px] text-blue-700">
                        ({(state.selectedTopicIds || [state.selectedTopicId]).length} Topic(s) included)
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => applySynthesizedPlan(currentSubtopicIds)}
                      className="text-xs font-bold text-blue-700 hover:text-blue-900 bg-white px-2.5 py-1 rounded border border-blue-300 shadow-2xs hover:bg-blue-50 transition-colors"
                      title="Re-synthesize WALT, WILF & 5E Meetings for current selection"
                    >
                      ↻ Re-Synthesize Plan
                    </button>
                  </div>

                  {/* Active Subtopic Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {currentSubtopicIds.map((subId) => {
                      const match = findSubtopicById(subId);
                      const title = match ? `${subId}: ${match.subtopic.title}` : subId;
                      return (
                        <span
                          key={subId}
                          className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 bg-white border border-blue-300 text-blue-900 rounded-md shadow-2xs"
                        >
                          <span>{title}</span>
                          {currentSubtopicIds.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleToggleSubtopic(subId)}
                              className="text-slate-400 hover:text-red-600 ml-0.5 p-0.5 rounded"
                              title="Remove subtopic"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </span>
                      );
                    })}
                  </div>

                  {/* Popular Multi-Subtopic Combos */}
                  <div className="pt-2 border-t border-blue-200/70 flex flex-wrap items-center gap-1 text-[11px]">
                    <span className="font-bold text-blue-900 mr-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" /> Quick Combos:
                    </span>
                    <button
                      type="button"
                      onClick={() => handleApplyComboPreset(['14.1', '14.2'])}
                      className="px-2 py-0.5 bg-white hover:bg-blue-100/70 border border-blue-200 rounded text-slate-700 font-semibold transition-colors"
                    >
                      14.1 + 14.2 (Linear Eq &amp; Inequalities)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyComboPreset(['15.3', '15.4', '15.5'])}
                      className="px-2 py-0.5 bg-white hover:bg-blue-100/70 border border-blue-200 rounded text-slate-700 font-semibold transition-colors"
                    >
                      15.3 + 15.4 + 15.5 (Trigonometry Core)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyComboPreset(['17.1', '17.2', '17.3'])}
                      className="px-2 py-0.5 bg-white hover:bg-blue-100/70 border border-blue-200 rounded text-slate-700 font-semibold transition-colors"
                    >
                      17.1 + 17.2 + 17.3 (Financial Math)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyComboPreset(['18.1', '18.2', '18.3'])}
                      className="px-2 py-0.5 bg-white hover:bg-blue-100/70 border border-blue-200 rounded text-slate-700 font-semibold transition-colors"
                    >
                      18.1 + 18.2 + 18.3 (Curved Graphs)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyComboPreset(['21.1', '21.2', '21.3'])}
                      className="px-2 py-0.5 bg-white hover:bg-blue-100/70 border border-blue-200 rounded text-slate-700 font-semibold transition-colors"
                    >
                      21.1 + 21.2 + 21.3 (Ratios &amp; Rates)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyComboPreset(['24.1', '24.2', '24.3'])}
                      className="px-2 py-0.5 bg-white hover:bg-blue-100/70 border border-blue-200 rounded text-slate-700 font-semibold transition-colors"
                    >
                      24.1 + 24.2 + 24.3 (Probability Suite)
                    </button>
                  </div>
                </div>

                {/* 11 Topics & Subtopics Multi-Checklist Accordion */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-800">
                      Cambridge IGCSE 0580 Topics &amp; Subtopics (Select multiple):
                    </label>
                    <span className="text-[11px] text-slate-500">
                      Check box to select whole topic or click to expand
                    </span>
                  </div>

                  {/* Horizontal Topic Jump Bar */}
                  <div className="flex flex-wrap items-center gap-1 p-1.5 bg-slate-100/80 rounded-lg border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-600 px-1">Jump to Topic:</span>
                    {CURRICULUM_DATA.map((t) => {
                      const count = t.subtopics.filter((s) => currentSubtopicIds.includes(s.id)).length;
                      const isExpanded = expandedTopicIds.includes(t.id);
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            if (!expandedTopicIds.includes(t.id)) {
                              setExpandedTopicIds((p) => [...p, t.id]);
                            }
                          }}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded transition-all ${
                            count > 0
                              ? 'bg-blue-700 text-white shadow-2xs'
                              : isExpanded
                              ? 'bg-slate-300 text-slate-800'
                              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                          }`}
                          title={`${t.numberStr}. ${t.title} (${count}/${t.subtopics.length} selected)`}
                        >
                          T{t.numberStr} {count > 0 ? `(${count})` : ''}
                        </button>
                      );
                    })}
                  </div>

                  <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-200 max-h-[340px] overflow-y-auto bg-slate-50/50">
                    {CURRICULUM_DATA.map((topic) => {
                      const isExpanded = expandedTopicIds.includes(topic.id);
                      const selectedCountInTopic = topic.subtopics.filter((s) =>
                        currentSubtopicIds.includes(s.id)
                      ).length;
                      const hasSelected = selectedCountInTopic > 0;
                      const isAllSelected = selectedCountInTopic === topic.subtopics.length;

                      return (
                        <div key={topic.id} className="bg-white">
                          {/* Topic Header Row */}
                          <div
                            className={`p-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                              hasSelected ? 'bg-blue-50/60' : 'hover:bg-slate-50'
                            }`}
                            onClick={() => toggleTopicAccordion(topic.id)}
                          >
                            <div className="flex items-center gap-2.5">
                              {/* 1-Click Topic Multi-Select Checkbox */}
                              <input
                                type="checkbox"
                                checked={isAllSelected}
                                ref={(el) => {
                                  if (el) {
                                    el.indeterminate = hasSelected && !isAllSelected;
                                  }
                                }}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  if (isAllSelected) {
                                    handleClearTopic(topic.id);
                                  } else {
                                    handleSelectAllInTopic(topic.id);
                                  }
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className="rounded text-blue-700 focus:ring-blue-500 cursor-pointer w-4 h-4"
                                title={isAllSelected ? 'Deselect all in topic' : 'Select entire topic'}
                              />

                              <span className="text-slate-400">
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </span>
                              <span className="text-xs font-bold text-slate-900">
                                {topic.numberStr}. {topic.title}
                              </span>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                                {topic.syllabusCategory}
                              </span>
                            </div>

                            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                              <span
                                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                  hasSelected
                                    ? 'bg-blue-700 text-white'
                                    : 'bg-slate-100 text-slate-500'
                                }`}
                              >
                                {selectedCountInTopic} / {topic.subtopics.length}
                              </span>

                              <button
                                type="button"
                                onClick={() => handleSelectAllInTopic(topic.id)}
                                className="text-[10px] font-bold text-blue-700 hover:text-blue-900 px-1.5 py-0.5 rounded hover:bg-blue-100 transition-colors"
                                title="Select all subtopics in this topic"
                              >
                                Select All
                              </button>

                              {hasSelected && (
                                <button
                                  type="button"
                                  onClick={() => handleClearTopic(topic.id)}
                                  className="text-[10px] font-bold text-slate-400 hover:text-red-600 px-1.5 py-0.5 rounded hover:bg-red-50 transition-colors"
                                  title="Deselect all in this topic"
                                >
                                  Clear
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Subtopics Checklist inside Topic */}
                          {isExpanded && (
                            <div className="p-2.5 bg-slate-50/60 border-t border-slate-100 space-y-1.5 pl-7">
                              {topic.subtopics.map((sub) => {
                                const isChecked = currentSubtopicIds.includes(sub.id);
                                return (
                                  <label
                                    key={sub.id}
                                    className={`flex items-start gap-2.5 p-2 rounded-md border text-xs cursor-pointer transition-all ${
                                      isChecked
                                        ? 'bg-blue-50 border-blue-300 font-semibold text-blue-950 shadow-2xs'
                                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => handleToggleSubtopic(sub.id)}
                                      className="rounded text-blue-700 mt-0.5 focus:ring-blue-500"
                                    />
                                    <div className="flex-1 leading-snug">
                                      <div className="flex items-center justify-between">
                                        <span className="font-bold text-slate-900">
                                          {sub.id}: {sub.title}
                                        </span>
                                        <span className="text-[10px] font-mono text-blue-800 bg-white px-1.5 py-0.5 rounded border border-blue-200">
                                          {sub.objectives.join(', ')}
                                        </span>
                                      </div>
                                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                        {sub.walt}
                                      </p>
                                    </div>
                                  </label>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Multi-Objective Selectors & Adder */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Target Cambridge Assessment Objectives ({state.customObjectives.length} Active):
                    </div>
                    <span className="text-[10px] text-slate-500">
                      Click code to toggle inclusion
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {state.customObjectives.map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => handleToggleObjective(code)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 bg-white border border-emerald-300 text-emerald-900 rounded-md shadow-2xs hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors group"
                        title={CAMBRIDGE_OBJECTIVE_DESCRIPTIONS[code] || 'Click to remove objective'}
                      >
                        <span className="text-blue-700 font-extrabold">{code}:</span>{' '}
                        <span className="max-w-[220px] truncate text-slate-700">
                          {CAMBRIDGE_OBJECTIVE_DESCRIPTIONS[code] || 'Cambridge Syllabus Code'}
                        </span>
                        <X className="w-3 h-3 text-slate-400 group-hover:text-red-600" />
                      </button>
                    ))}
                  </div>

                  {/* Add Custom Objective Code */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                    <input
                      type="text"
                      value={customObjectiveInput}
                      onChange={(e) => setCustomObjectiveInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddCustomObjective();
                        }
                      }}
                      placeholder="Add another Cambridge code (e.g. C1.12, E6.3, AO1.2)..."
                      className="flex-1 text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomObjective}
                      className="text-xs px-3 py-1.5 font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Code
                    </button>
                  </div>
                </div>

                {/* WALT Editable */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-800">
                      WALT (We Are Learning To) &mdash; Tailored Synthesis
                    </label>
                    <span className="text-[10px] text-slate-500">
                      Auto-synthesizes when topics change; fully editable
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={state.walt}
                    onChange={(e) => onChange((p) => ({ ...p, walt: e.target.value }))}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* WILF Editable Checklist */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-800">
                      WILF (What I'm Looking For) &mdash; "I can..." Integer Steps Checklist
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        onChange((p) => ({
                          ...p,
                          wilf: [...p.wilf, 'I can verify my calculations using integer substitution.']
                        }));
                      }}
                      className="text-[11px] font-bold text-blue-700 hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Criterion
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {state.wilf.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-xs font-bold text-blue-700 w-5">#{idx + 1}</span>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const newWilf = [...state.wilf];
                            newWilf[idx] = e.target.value;
                            onChange((p) => ({ ...p, wilf: newWilf }));
                          }}
                          className="flex-1 text-xs px-2.5 py-1.5 border border-slate-300 rounded-md"
                        />
                        {state.wilf.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newWilf = state.wilf.filter((_, i) => i !== idx);
                              onChange((p) => ({ ...p, wilf: newWilf }));
                            }}
                            className="text-slate-400 hover:text-red-600 p-1"
                            title="Remove criterion"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Callout to Teaching Method & Ideas */}
                <div className="p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                      <Lightbulb className="w-4 h-4 text-amber-600 fill-amber-400" />
                      <span>Teaching Method &amp; Lesson Ideas Ready for Customization</span>
                    </div>
                    <p className="text-[11px] text-amber-900 mt-0.5">
                      Write your custom instructional flow, physical balance scale hook, pair routines, and integer scaffolding in Tab 3.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('methodology')}
                    className="px-3.5 py-1.5 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <Lightbulb className="w-3.5 h-3.5" /> Write Method &amp; Ideas ➔
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: TEACHING METHOD & IDEAS */}
            {activeTab === 'methodology' && (
              <div className="space-y-4">
                {/* Method Overview Card */}
                <div className="p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg flex items-start gap-3">
                  <div className="p-2 bg-amber-500 text-white rounded-lg shadow-xs mt-0.5">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                      Teacher's Instructional Methodology &amp; Lesson Ideas (Planning Guide)
                    </h3>
                    <p className="text-[11px] text-amber-900 leading-relaxed mt-0.5">
                      Define your pedagogical approach, interactive flow, and creative teaching strategies tailored for middle-to-low achieving students in Year 10 IGCSE Mathematics. <em>These notes guide the generation of your 5E stages, WALT/WILF, and scaffolding, while keeping the final official document clean and uncluttered.</em>
                    </p>
                  </div>
                </div>

                {/* Teaching Methods Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                    <span>1. Core Teaching Method(s) &mdash; Click to toggle or add:</span>
                    <span className="text-[11px] font-normal text-slate-500">
                      {(state.teachingMethods || []).length} selected
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {PRESET_TEACHING_METHODS.map((method) => {
                      const isSelected = (state.teachingMethods || []).includes(method);
                      return (
                        <button
                          key={method}
                          type="button"
                          onClick={() => {
                            const current = state.teachingMethods || [];
                            const updated = isSelected
                              ? current.filter((m) => m !== method)
                              : [...current, method];
                            onChange((p) => ({ ...p, teachingMethods: updated }));
                          }}
                          className={`text-xs px-2.5 py-1.5 rounded-md font-semibold border transition-all ${
                            isSelected
                              ? 'bg-blue-700 text-white border-blue-800 shadow-2xs'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}
                          {method}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Method Adder */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={customMethodInput}
                      onChange={(e) => setCustomMethodInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && customMethodInput.trim()) {
                          e.preventDefault();
                          const current = state.teachingMethods || [];
                          if (!current.includes(customMethodInput.trim())) {
                            onChange((p) => ({ ...p, teachingMethods: [...current, customMethodInput.trim()] }));
                          }
                          setCustomMethodInput('');
                        }
                      }}
                      placeholder="Add another teaching method (e.g. Socratic Questioning)..."
                      className="flex-1 text-xs px-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (customMethodInput.trim()) {
                          const current = state.teachingMethods || [];
                          if (!current.includes(customMethodInput.trim())) {
                            onChange((p) => ({ ...p, teachingMethods: [...current, customMethodInput.trim()] }));
                          }
                          setCustomMethodInput('');
                        }
                      }}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-md flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>
                </div>

                {/* Core Framework Model */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    2. Classroom Pedagogical Framework
                  </label>
                  <input
                    type="text"
                    value={state.classroomPedagogyModel || '5E Constructivist Model (Engage-Explore-Explain-Elaborate-Evaluate) with Integer Scaffolding'}
                    onChange={(e) => onChange((p) => ({ ...p, classroomPedagogyModel: e.target.value }))}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md font-medium text-slate-900 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Teacher's Custom Lesson Idea & Flow (Generous Textarea) */}
                <div className="border border-amber-300/80 bg-amber-50/30 p-3.5 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-amber-950 flex items-center gap-1.5">
                      <Brain className="w-4 h-4 text-amber-600" />
                      3. Teacher's Custom Lesson Idea &amp; Classroom Dynamic:
                    </label>
                    <span className="text-[10px] text-amber-800 font-semibold">
                      Full space for your creative plan
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-snug">
                    Describe your hook, interactive activities, pair dynamic, manipulatives usage, and how you will guide struggling students step-by-step:
                  </p>

                  <textarea
                    rows={8}
                    value={state.customTeachingIdea || ''}
                    onChange={(e) => onChange((p) => ({ ...p, customTeachingIdea: e.target.value }))}
                    placeholder="Write your custom lesson idea here... e.g.:
1. Concrete Opening: Use an integer physical balance scale to show equations as balanced pans.
2. Paired Collaboration: Students do Rally-Coach where Student A solves out loud while Student B checks signs.
3. Scaffolded Progression: Keep all coefficients positive integers for the first 3 examples before introducing subtraction.
4. Error Analysis: Show a common blunder on the board and have students spot why it happened..."
                    className="w-full text-xs p-3 border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden leading-relaxed font-sans"
                  />
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>💡 Tip: Numbered steps or bullet points will format cleanly in the generated PDF and DOCX document.</span>
                    <span>{(state.customTeachingIdea || '').length} characters &bull; {(state.customTeachingIdea || '').split(/\s+/).filter(Boolean).length} words</span>
                  </div>

                  {/* Quick Inspiration Buttons */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-600 block mb-1">
                      Quick Idea Inspiration Presets (Click to append):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          const snippet = `• Concrete Balance Scale Hook: Begin with an interactive visual balance scale using positive integer weights. Show that whatever operation is done to one side must be mirrored on the other to preserve equilibrium.\n`;
                          onChange((p) => ({
                            ...p,
                            customTeachingIdea: (p.customTeachingIdea ? p.customTeachingIdea + '\n' : '') + snippet
                          }));
                        }}
                        className="text-[11px] px-2 py-1 bg-white border border-slate-300 hover:border-amber-500 hover:bg-amber-50 text-slate-700 rounded transition-colors"
                      >
                        + Balance Scale Hook
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const snippet = `• Rally-Coach Paired Routine: Students partner in mixed-ability pairs. Student A solves Problem 1 explaining aloud while Student B coaches and validates. Then swap roles for Problem 2 to reinforce procedural fluency.\n`;
                          onChange((p) => ({
                            ...p,
                            customTeachingIdea: (p.customTeachingIdea ? p.customTeachingIdea + '\n' : '') + snippet
                          }));
                        }}
                        className="text-[11px] px-2 py-1 bg-white border border-slate-300 hover:border-amber-500 hover:bg-amber-50 text-slate-700 rounded transition-colors"
                      >
                        + Rally-Coach Pairs
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const snippet = `• Faded Scaffolding Sequence: Present 3 consecutive worked examples: Example 1 is fully modeled with colored steps; Example 2 has intermediate blanks for students to fill; Example 3 is solved independently on mini-whiteboards.\n`;
                          onChange((p) => ({
                            ...p,
                            customTeachingIdea: (p.customTeachingIdea ? p.customTeachingIdea + '\n' : '') + snippet
                          }));
                        }}
                        className="text-[11px] px-2 py-1 bg-white border border-slate-300 hover:border-amber-500 hover:bg-amber-50 text-slate-700 rounded transition-colors"
                      >
                        + Faded Scaffolding
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const snippet = `• "Spot the Blunder" Misconception Check: Display a mock student solution containing a classic sign or bracket error. Have the class identify the exact line of mistake and rewrite the correct integer solution.\n`;
                          onChange((p) => ({
                            ...p,
                            customTeachingIdea: (p.customTeachingIdea ? p.customTeachingIdea + '\n' : '') + snippet
                          }));
                        }}
                        className="text-[11px] px-2 py-1 bg-white border border-slate-300 hover:border-amber-500 hover:bg-amber-50 text-slate-700 rounded transition-colors"
                      >
                        + Spot the Blunder
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const snippet = `• School Canteen Word Problem Context: Frame the mathematical problem as purchasing items at the Semesta school canteen (e.g. 2 juices and 3 sandwiches = Rp 25,000) so students immediately see the practical relevance.\n`;
                          onChange((p) => ({
                            ...p,
                            customTeachingIdea: (p.customTeachingIdea ? p.customTeachingIdea + '\n' : '') + snippet
                          }));
                        }}
                        className="text-[11px] px-2 py-1 bg-white border border-slate-300 hover:border-amber-500 hover:bg-amber-50 text-slate-700 rounded transition-colors"
                      >
                        + School Canteen Context
                      </button>
                    </div>
                  </div>
                </div>

                {/* Guiding & Metacognitive Questions */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                    4. Teacher's Key Guiding &amp; Metacognitive Questions
                  </label>
                  <textarea
                    rows={3}
                    value={state.teacherGuidingQuestions || ''}
                    onChange={(e) => onChange((p) => ({ ...p, teacherGuidingQuestions: e.target.value }))}
                    placeholder="e.g.:
• Why do we subtract when the signs of matching terms are the same?
• What does the variable represent in the real-world scenario?
• How can you verify your answer without checking the back of the book?"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Scaffolding & Remediation Strategy Notes */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      5. Scaffolding &amp; Remediation Strategy Notes (Middle-to-Low Achievers)
                    </label>
                    <span className="text-[10px] text-slate-500">Integer-focused notes</span>
                  </div>
                  <textarea
                    rows={3}
                    value={state.customPedagogicalNotes || ''}
                    onChange={(e) => onChange((p) => ({ ...p, customPedagogicalNotes: e.target.value }))}
                    placeholder="e.g. Scaffolding strategy: Focus heavily on clean integer calculations, foundational worked examples, step-by-step guidance, and accessible exercises."
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: 5E MEETINGS PLAN */}
            {activeTab === '5e' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div>
                    <span className="text-xs font-bold text-blue-900">
                      5E Cycle Sequence: {state.meetings.length} Meeting(s) &bull; {state.durationPerMeeting}
                    </span>
                    <p className="text-[11px] text-blue-700">
                      Each meeting features Starter Hook, Engage (10m), Explore (20m), Explain (15m), Elaborate (20m), Evaluate (15m).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleMeetingsCountChange(state.totalMeetings)}
                    className="text-xs font-bold px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-md transition-colors"
                  >
                    Regenerate 5E Stages
                  </button>
                </div>

                <div className="space-y-3">
                  {state.meetings.map((m, mIdx) => (
                    <div
                      key={m.meetingNumber}
                      className="border border-slate-200 rounded-lg p-3 bg-white shadow-2xs space-y-2.5"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="font-bold text-xs text-blue-900 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-blue-700 text-white flex items-center justify-center text-[10px]">
                            {m.meetingNumber}
                          </span>
                          {m.topicFocus}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        <div>
                          <label className="font-semibold text-slate-700">Starter / Hook:</label>
                          <input
                            type="text"
                            value={m.starterHook}
                            onChange={(e) => {
                              const newMeetings = [...state.meetings];
                              newMeetings[mIdx].starterHook = e.target.value;
                              onChange((p) => ({ ...p, meetings: newMeetings }));
                            }}
                            className="w-full text-xs p-1.5 border border-slate-300 rounded-md mt-0.5"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-amber-700">Engage Diagnostic (10 min):</label>
                          <input
                            type="text"
                            value={m.engage.sampleProblem || ''}
                            onChange={(e) => {
                              const newMeetings = [...state.meetings];
                              newMeetings[mIdx].engage.sampleProblem = e.target.value;
                              onChange((p) => ({ ...p, meetings: newMeetings }));
                            }}
                            className="w-full text-xs p-1.5 border border-slate-300 rounded-md mt-0.5"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-sky-700">Explore Inquiry (20 min):</label>
                          <input
                            type="text"
                            value={m.explore.sampleProblem || ''}
                            onChange={(e) => {
                              const newMeetings = [...state.meetings];
                              newMeetings[mIdx].explore.sampleProblem = e.target.value;
                              onChange((p) => ({ ...p, meetings: newMeetings }));
                            }}
                            className="w-full text-xs p-1.5 border border-slate-300 rounded-md mt-0.5"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-pink-700">Explain Model (15 min):</label>
                          <input
                            type="text"
                            value={m.explain.sampleProblem || ''}
                            onChange={(e) => {
                              const newMeetings = [...state.meetings];
                              newMeetings[mIdx].explain.sampleProblem = e.target.value;
                              onChange((p) => ({ ...p, meetings: newMeetings }));
                            }}
                            className="w-full text-xs p-1.5 border border-slate-300 rounded-md mt-0.5"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-emerald-700">Elaborate Task (20 min):</label>
                          <input
                            type="text"
                            value={m.elaborate.sampleProblem || ''}
                            onChange={(e) => {
                              const newMeetings = [...state.meetings];
                              newMeetings[mIdx].elaborate.sampleProblem = e.target.value;
                              onChange((p) => ({ ...p, meetings: newMeetings }));
                            }}
                            className="w-full text-xs p-1.5 border border-slate-300 rounded-md mt-0.5"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-purple-700">Evaluate Exit Ticket (15 min):</label>
                          <input
                            type="text"
                            value={m.evaluate.sampleProblem || ''}
                            onChange={(e) => {
                              const newMeetings = [...state.meetings];
                              newMeetings[mIdx].evaluate.sampleProblem = e.target.value;
                              onChange((p) => ({ ...p, meetings: newMeetings }));
                            }}
                            className="w-full text-xs p-1.5 border border-slate-300 rounded-md mt-0.5"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: DIFFERENTIATION & EXERCISES */}
            {activeTab === 'diff' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg">
                    <span className="text-xs font-bold text-amber-900 block mb-1">
                      1. Struggled Scaffolding (Low)
                    </span>
                    <p className="text-[11px] text-amber-800 mb-2">Integer steps & visual organizers</p>
                    <textarea
                      rows={5}
                      value={state.struggledScaffolding.join('\n')}
                      onChange={(e) =>
                        onChange((p) => ({
                          ...p,
                          struggledScaffolding: e.target.value.split('\n').filter((l) => l.trim())
                        }))
                      }
                      className="w-full text-xs p-2 bg-white border border-amber-300 rounded-md"
                    />
                  </div>

                  <div className="p-3 bg-sky-50/70 border border-sky-200 rounded-lg">
                    <span className="text-xs font-bold text-sky-900 block mb-1">
                      2. EAL / Language Support
                    </span>
                    <p className="text-[11px] text-sky-800 mb-2">Bilingual terms & sentence frames</p>
                    <textarea
                      rows={5}
                      value={state.ealProvisions.join('\n')}
                      onChange={(e) =>
                        onChange((p) => ({
                          ...p,
                          ealProvisions: e.target.value.split('\n').filter((l) => l.trim())
                        }))
                      }
                      className="w-full text-xs p-2 bg-white border border-sky-300 rounded-md"
                    />
                  </div>

                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg">
                    <span className="text-xs font-bold text-emerald-900 block mb-1">
                      3. High-Achieving Extension
                    </span>
                    <p className="text-[11px] text-emerald-800 mb-2">Multi-step & real context</p>
                    <textarea
                      rows={5}
                      value={state.extensionTasks.join('\n')}
                      onChange={(e) =>
                        onChange((p) => ({
                          ...p,
                          extensionTasks: e.target.value.split('\n').filter((l) => l.trim())
                        }))
                      }
                      className="w-full text-xs p-2 bg-white border border-emerald-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Formative Exercises */}
                <div className="border border-slate-200 p-3.5 rounded-lg bg-slate-50 space-y-2">
                  <span className="text-xs font-bold text-slate-800 block">
                    Formative Practice Questions (Clean Integer Scaffolding):
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-amber-700">Level 1 (Entry):</label>
                      <input
                        type="text"
                        value={state.formativeExercises.level1}
                        onChange={(e) => {
                          const val = e.target.value;
                          onChange((p) => ({ ...p, formativeExercises: { ...p.formativeExercises, level1: val } }));
                        }}
                        className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-blue-700">Level 2 (Core):</label>
                      <input
                        type="text"
                        value={state.formativeExercises.level2}
                        onChange={(e) => {
                          const val = e.target.value;
                          onChange((p) => ({ ...p, formativeExercises: { ...p.formativeExercises, level2: val } }));
                        }}
                        className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-emerald-700">Level 3 (Stretch):</label>
                      <input
                        type="text"
                        value={state.formativeExercises.level3}
                        onChange={(e) => {
                          const val = e.target.value;
                          onChange((p) => ({ ...p, formativeExercises: { ...p.formativeExercises, level3: val } }));
                        }}
                        className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700">Homework & Consolidation:</label>
                    <input
                      type="text"
                      value={state.formativeExercises.homework}
                      onChange={(e) => {
                        const val = e.target.value;
                        onChange((p) => ({ ...p, formativeExercises: { ...p.formativeExercises, homework: val } }));
                      }}
                      className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: RESOURCES & LINKS */}
            {activeTab === 'resources' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Teacher Resources URL
                    </label>
                    <input
                      type="url"
                      value={state.teacherResourcesUrl}
                      onChange={(e) => onChange((p) => ({ ...p, teacherResourcesUrl: e.target.value }))}
                      placeholder="https://drive.google.com/..."
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Student Activities / Worksheets URL
                    </label>
                    <input
                      type="url"
                      value={state.studentWorksheetsUrl}
                      onChange={(e) => onChange((p) => ({ ...p, studentWorksheetsUrl: e.target.value }))}
                      placeholder="https://classroom.google.com/..."
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Coursebook Reference (Cambridge 0580)
                    </label>
                    <input
                      type="text"
                      value={state.coursebookReference}
                      onChange={(e) => onChange((p) => ({ ...p, coursebookReference: e.target.value }))}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Manipulatives & Digital Tools
                    </label>
                    <input
                      type="text"
                      value={state.manipulativeTools}
                      onChange={(e) => onChange((p) => ({ ...p, manipulativeTools: e.target.value }))}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Teacher's Custom Lesson Ideas & Pedagogical Method
                  </label>
                  <textarea
                    rows={3}
                    value={state.customPedagogicalNotes}
                    onChange={(e) => onChange((p) => ({ ...p, customPedagogicalNotes: e.target.value }))}
                    placeholder="e.g. Scaffolding with positive integers, using rally-coach paired activities, mini-whiteboard cold-call checks..."
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-md"
                  />
                </div>
              </div>
            )}

            {/* TAB 6: APPEARANCE & SIGNATURES */}
            {activeTab === 'appearance' && (
              <div className="space-y-5">
                {/* Color Theme Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Official Color Themes & Section Bar Styling
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {COLOR_THEMES.map((theme) => (
                      <button
                        key={theme.name}
                        type="button"
                        onClick={() => applyColorTheme(theme)}
                        className={`p-2 rounded-lg border text-left transition-all ${
                          state.primaryColor === theme.primaryColor
                            ? 'border-blue-700 ring-2 ring-blue-500/20 bg-blue-50/50'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex gap-1 mb-1.5">
                          <span
                            className="w-4 h-4 rounded-full border border-black/10"
                            style={{ backgroundColor: theme.primaryColor }}
                          />
                          <span
                            className="w-4 h-4 rounded-full border border-black/10"
                            style={{ backgroundColor: theme.secondaryColor }}
                          />
                          <span
                            className="w-4 h-4 rounded-full border border-black/10"
                            style={{ backgroundColor: theme.accentColor }}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-slate-800 line-clamp-1">
                          {theme.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Color Pickers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Header Gradient Start:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={state.primaryColor}
                        onChange={(e) => onChange((p) => ({ ...p, primaryColor: e.target.value }))}
                        className="w-8 h-8 rounded-md cursor-pointer border border-slate-300"
                      />
                      <input
                        type="text"
                        value={state.primaryColor}
                        onChange={(e) => onChange((p) => ({ ...p, primaryColor: e.target.value }))}
                        className="text-xs px-2 py-1 border border-slate-300 rounded-md w-24"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Section Bar Color:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={state.secondaryColor}
                        onChange={(e) => onChange((p) => ({ ...p, secondaryColor: e.target.value }))}
                        className="w-8 h-8 rounded-md cursor-pointer border border-slate-300"
                      />
                      <input
                        type="text"
                        value={state.secondaryColor}
                        onChange={(e) => onChange((p) => ({ ...p, secondaryColor: e.target.value }))}
                        className="text-xs px-2 py-1 border border-slate-300 rounded-md w-24"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Accent Gold / Highlight:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={state.accentColor}
                        onChange={(e) => onChange((p) => ({ ...p, accentColor: e.target.value }))}
                        className="w-8 h-8 rounded-md cursor-pointer border border-slate-300"
                      />
                      <input
                        type="text"
                        value={state.accentColor}
                        onChange={(e) => onChange((p) => ({ ...p, accentColor: e.target.value }))}
                        className="text-xs px-2 py-1 border border-slate-300 rounded-md w-24"
                      />
                    </div>
                  </div>
                </div>

                {/* Signatures & Approval */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="border border-slate-200 rounded-lg p-3.5 bg-slate-50">
                    <span className="text-xs font-bold text-slate-800 block mb-2">
                      Teacher Signature: Fitria Rakhmawati
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-32 border border-slate-300 rounded bg-white flex items-center justify-center p-1">
                        <img
                          src={state.teacherSignatureUrl}
                          alt="Teacher Signature"
                          className="max-h-full object-contain"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={onOpenTeacherSignature}
                        className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-md transition-colors"
                      >
                        Change / Draw
                      </button>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-lg p-3.5 bg-slate-50">
                    <span className="text-xs font-bold text-slate-800 block mb-2">
                      Principal Approval: Ahmad Nurani, S.T., M.Pd.
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-32 border border-slate-300 rounded bg-white flex items-center justify-center p-1">
                        <img
                          src={state.principalSignatureUrl}
                          alt="Principal Signature"
                          className="max-h-full object-contain"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <button
                          type="button"
                          onClick={onOpenPrincipalSignature}
                          className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-md transition-colors block"
                        >
                          Change / Draw
                        </button>
                        <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={state.isPrincipalApproved}
                            onChange={(e) => onChange((p) => ({ ...p, isPrincipalApproved: e.target.checked }))}
                            className="rounded text-blue-700"
                          />
                          Mark Approved
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
