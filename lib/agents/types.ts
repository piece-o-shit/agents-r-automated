export interface AgentConfig {
  title: string;
  description: string;
  background: string;
  outputFormat: string;
  model: string;
  temperature: number;
  maxTokens: number;
  tools: string[];
  knowledgeSources?: string[];
  language: string;
  brandVoice?: string;
}

export interface AgentTemplate {
  title: string;
  description: string;
  defaultConfig: Partial<AgentConfig>;
}