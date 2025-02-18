import { OpenAI } from '@langchain/openai';
import { Anthropic } from '@langchain/anthropic';
import { NextResponse } from 'next/server';
import type { AgentConfig } from '@/lib/agents/types';

export async function POST(req: Request) {
  try {
    const { description, model } = await req.json();
    
    const prompt = `Generate a detailed agent configuration based on this description: "${description}"
    Include specific background information, output format requirements, and necessary tools.
    Format the response as a JSON object with the following fields:
    - title: A concise title for the agent
    - description: A clear description of what the agent does
    - background: The agent's expertise and context
    - outputFormat: How the agent should structure its responses
    - model: The AI model to use (e.g. gpt-4, gpt-3.5-turbo, claude-2)
    - language: The primary language (e.g. en, es, fr)
    - temperature: A number between 0 and 2
    - maxTokens: A number between 1 and 32000
    - brandVoice: The tone and style the agent should use`;

    const client = model.includes('claude') 
      ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
      : new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await client.invoke(prompt);
    let config: AgentConfig;

    try {
      config = typeof response === 'string' ? JSON.parse(response) : response;
      
      // Ensure required fields have default values
      config.model = config.model || 'gpt-4';
      config.language = config.language || 'en';
      config.temperature = config.temperature || 0.7;
      config.maxTokens = config.maxTokens || 2048;
      
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      throw new Error('Invalid configuration format');
    }
    
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error generating config:', error);
    return NextResponse.json({ error: 'Failed to generate agent config' }, { status: 500 });
  }
}