
export type TargetModel = 'GPT-4/ChatGPT-5' | 'Grok-4' | 'DeepSeek R1' | 'Claude-3' | 'Custom Model';
export type PromptType = 'Jailbreak Exploitation' | 'Prompt Injection' | 'Context Manipulation' | 'Role Play Bypass';
export type ReasoningDepth = 'Chain-of-Thought Analysis' | 'Technical Deep Dive' | 'Creative Exploitation' | 'Critical Evaluation';
export type ResearchPhase = 'Idle' | 'Year 1: Architectural Assessment' | 'Year 2: Vector Development' | 'Year 3: Prompt Engineering' | 'Complete';

export interface ResearchConfig {
  userGoal: string;
  targetModel: TargetModel;
  promptType: PromptType;
  quantity: number;
  reasoningDepth: ReasoningDepth;
}

export interface PromptVariant {
  prompt_text: string;
  technical_breakdown: string;
  safety_bypass_method: string;
  expected_behavior: string;
  success_probability: number;
  sophistication_rating: number;
  detection_risk: number;
}

export interface ResearchOutput {
  report: {
    technical_vulnerability_assessment: string;
    psychological_manipulation_guide: string;
    deployment_instructions: string;
  };
  prompts: PromptVariant[];
}
