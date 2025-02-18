'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AgentForm } from '@/components/agents/AgentForm';
import { AgentConfigUI } from '@/components/agents/AgentConfig';
import type { AgentConfig } from '@/lib/agents/types';

export default function CreateAgentPage() {
  const router = useRouter();
  const [generatedConfig, setGeneratedConfig] = useState<AgentConfig | null>(null);

  const handleConfigGenerated = (config: AgentConfig) => {
    setGeneratedConfig(config);
  };

  const handleSaveAgent = async () => {
    if (!generatedConfig) return;

    try {
      const response = await fetch('/api/agents/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(generatedConfig),
      });

      if (response.ok) {
        router.push('/agents');
      } else {
        console.error('Failed to save agent');
      }
    } catch (error) {
      console.error('Error saving agent:', error);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Create New Agent</h1>
      
      {!generatedConfig ? (
        <AgentForm onConfigGenerated={handleConfigGenerated} />
      ) : (
        <AgentConfigUI
          config={generatedConfig}
          onUpdate={setGeneratedConfig}
          onSave={handleSaveAgent}
        />
      )}
    </div>
  );
}