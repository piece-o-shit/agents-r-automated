import { z } from 'zod';

export const agentConfigSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  background: z.string().min(1, 'Background is required'),
  outputFormat: z.string().min(1, 'Output format is required'),
  model: z.string().min(1, 'Model is required'),
  temperature: z.number().min(0).max(2),
  maxTokens: z.number().min(1).max(32000),
  tools: z.array(z.string()),
  knowledgeSources: z.array(z.string()).optional(),
  language: z.string().min(2, 'Language code is required'),
  brandVoice: z.string().optional()
});

export const createAgentSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  model: z.string().min(1, 'Model is required')
});

export type CreateAgentInput = z.infer<typeof createAgentSchema>;
export type AgentConfigInput = z.infer<typeof agentConfigSchema>;