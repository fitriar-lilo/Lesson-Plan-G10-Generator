export interface CambridgeObjective {
  code: string;
  description: string;
}

export interface FiveEStage {
  title: string;
  duration: string;
  description: string;
  scaffoldingTips: string;
  sampleProblem?: string;
  teacherRole: string;
  studentRole: string;
}

export interface MeetingPlan {
  meetingNumber: number;
  date?: string;
  topicFocus: string;
  starterHook: string;
  engage: FiveEStage;
  explore: FiveEStage;
  explain: FiveEStage;
  elaborate: FiveEStage;
  evaluate: FiveEStage;
}

export interface SubtopicData {
  id: string; // e.g. "14.1"
  title: string;
  objectives: string[]; // e.g. ["C2.5", "E2.5"]
  walt: string;
  wilf: string[];
  slo: string[];
  keyTerms: { term: string; definition: string; indonesianGloss?: string }[];
  ealStrategies: string[];
  struggledScaffolding: string[];
  extensionTasks: string[];
  defaultFormativeExercises: {
    level1: string; // low/entry
    level2: string; // mid
    level3: string; // stretch
    homework: string;
  };
  coursebookPages: string;
  suggestedTools: string[];
  defaultMeetings: MeetingPlan[];
}

export interface TopicData {
  id: number; // e.g. 14
  numberStr: string; // "14"
  title: string;
  syllabusCategory: string;
  subtopics: SubtopicData[];
}

export interface LessonPlanState {
  teacherName: string;
  principalName: string;
  schoolName: string;
  yearGroup: string;
  targetLevel: string;
  durationPerMeeting: string;
  totalMeetings: number;
  dateRange: string;
  semesterTerm: string;

  // Selected Curriculum (Multi-Selection Enabled)
  selectedTopicIds: number[];
  selectedSubtopicIds: string[];
  selectedTopicId: number;
  selectedSubtopicId: string;
  customTopicTitle?: string;
  customSubtopicTitle?: string;
  customObjectives: string[];

  // Assessment Objectives
  ao1Focus: string;
  ao2Focus: string;

  // WALT / WILF / SLO
  walt: string;
  wilf: string[];
  slo: string[];
  keyTerms: { term: string; definition: string; indonesianGloss?: string }[];
  ealSupport: string[];

  // Differentiation
  struggledScaffolding: string[];
  ealProvisions: string[];
  extensionTasks: string[];

  // 5E Meetings
  meetings: MeetingPlan[];

  // Formative Assessment & Reflection
  formativeExercises: {
    level1: string;
    level2: string;
    level3: string;
    homework: string;
  };
  reflectionPrompts: {
    comprehensionEvaluation: string;
    scaffoldingEffectiveness: string;
    nextSteps: string;
  };

  // Resources
  teacherResourcesUrl: string;
  studentWorksheetsUrl: string;
  coursebookReference: string;
  manipulativeTools: string;
  // Teaching Methods & Pedagogical Ideas
  teachingMethods: string[];
  customTeachingIdea: string;
  classroomPedagogyModel: string;
  teacherGuidingQuestions: string;
  customPedagogicalNotes: string;

  // Sign-off
  teacherSignatureUrl: string;
  principalSignatureUrl: string;
  isPrincipalApproved: boolean;
  signDate: string;

  // Header & Styling
  headerImageUrl: string;
  primaryColor: string; // e.g., "#1e3a8a"
  secondaryColor: string; // e.g., "#0f766e"
  accentColor: string; // e.g., "#f59e0b"
  fontFamily: string;
  fontSize: string;
}
