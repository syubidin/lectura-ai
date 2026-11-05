export type FeatureType = 'deconstruct' | 'trap_predictor' | 'cram_plan' | 'feynman';

export interface NoteDeconstructionResult {
  title: string;
  coreConcepts: Array<{
    term: string;
    definition: string;
    importance: 'high' | 'medium' | 'low';
  }>;
  biteSizedModules: Array<{
    timeMinutes: number;
    title: string;
    action: string;
  }>;
  keyFormulaOrRules: string[];
}

export interface TrapQuestion {
  question: string;
  commonMistake: string;
  correctConcept: string;
  severity: 'TRAP_HIGH' | 'TRAP_MEDIUM' | 'TRAP_LOW';
  proTip: string;
}

export interface TrapPredictorResult {
  courseName: string;
  topic: string;
  trapQuestions: TrapQuestion[];
  examMindsetWarning: string;
}

export interface CramPlanHour {
  timeBlock: string;
  phase: string;
  task: string;
  cognitiveEnergy: 'HIGH' | 'MEDIUM' | 'RECOVERY';
}

export interface CramPlanResult {
  subject: string;
  hoursRemaining: number;
  survivalStrategy: string;
  schedule: CramPlanHour[];
  recommendedBreaks: string;
}

export interface FeynmanResult {
  topic: string;
  simpleAnalogy: string;
  stepByStepExplanation: string[];
  commonMisconception: string;
  testYourselfQuestion: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  mode: 'live_ai' | 'fallback_demo';
  modelUsed?: string;
  timestamp: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  details?: string;
}
