'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { AgentConfig } from '@/lib/agents/types';

interface AgentFormProps {
  onConfigGenerated: (config: AgentConfig) => void;
}

export default function AgentForm({ onConfigGenerated }: AgentFormProps) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const generateConfig = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/agents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description,
          model: 'gpt-4'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate configuration');
      }

      const data = await response.json();
      onConfigGenerated(data);
    } catch (error) {
      console.error('Error generating config:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Describe what you want this agent to do..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
        className="min-h-[100px]"
      />
      <Button
        onClick={generateConfig}
        disabled={loading || !description.trim()}
        className="w-full"
      >
        {loading ? 'Generating...' : 'Generate with AI'}
      </Button>
    </div>
  );
}