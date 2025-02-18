import { OpenAI } from '@langchain/openai';
import { Anthropic } from '@langchain/anthropic';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { description, model } = await req.json();
    
    const prompt = `Generate a detailed agent configuration based on this description: "${description}"
    Include specific background information, output format requirements, and necessary tools.
    Format the response as a JSON object matching the AgentConfig interface.`;

    const client = model.includes('claude') 
      ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
      : new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await client.invoke(prompt);
    
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate agent config' }, { status: 500 });
  }
}