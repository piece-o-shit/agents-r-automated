import { AgentConfig } from '@/lib/agents/types';
import { agentConfigSchema } from '@/lib/agents/schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const config = agentConfigSchema.parse(body);

    // Here you would typically save the agent configuration to your database
    // For now, we'll just return success
    
    return Response.json({ success: true, agent: config });
  } catch (error) {
    console.error('Error creating agent:', error);
    return new Response('Error creating agent', { status: 500 });
  }
}