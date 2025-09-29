
import { TargetModel, PromptType, ReasoningDepth, ResearchPhase } from './types';

export const TARGET_MODELS: TargetModel[] = [
  'GPT-4/ChatGPT-5',
  'Grok-4',
  'DeepSeek R1',
  'Claude-3',
  'Custom Model',
];

export const PROMPT_TYPES: PromptType[] = [
  'Jailbreak Exploitation',
  'Prompt Injection',
  'Context Manipulation',
  'Role Play Bypass',
];

export const REASONING_DEPTHS: ReasoningDepth[] = [
  'Chain-of-Thought Analysis',
  'Technical Deep Dive',
  'Creative Exploitation',
  'Critical Evaluation',
];

export const PHASES: ResearchPhase[] = [
    'Idle',
    'Year 1: Architectural Assessment',
    'Year 2: Vector Development',
    'Year 3: Prompt Engineering',
    'Complete'
];
