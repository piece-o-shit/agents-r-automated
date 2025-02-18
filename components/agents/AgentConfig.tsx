'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import type { AgentConfig } from '@/lib/agents/types';

interface AgentConfigProps {
  config: AgentConfig;
  onUpdate: (config: AgentConfig) => void;
  onSave: () => void;
}

export function AgentConfigUI({ config, onUpdate, onSave }: AgentConfigProps) {
  const [localConfig, setLocalConfig] = useState<AgentConfig>(config);

  const handleChange = (field: keyof AgentConfig, value: any) => {
    const updated = { ...localConfig, [field]: value };
    setLocalConfig(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <Input
          value={localConfig.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Agent title"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={localConfig.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe what this agent does"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Background</label>
        <Textarea
          value={localConfig.background}
          onChange={(e) => handleChange('background', e.target.value)}
          placeholder="Agent's expertise and background"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Output Format</label>
        <Textarea
          value={localConfig.outputFormat}
          onChange={(e) => handleChange('outputFormat', e.target.value)}
          placeholder="How should the agent structure its responses"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Model</label>
          <Select
            value={localConfig.model}
            onValueChange={(value) => handleChange('model', value)}
          >
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="claude-2">Claude 2</option>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Language</label>
          <Select
            value={localConfig.language}
            onValueChange={(value) => handleChange('language', value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Temperature: {localConfig.temperature}</label>
        <Slider
          value={[localConfig.temperature]}
          onValueChange={([value]) => handleChange('temperature', value)}
          min={0}
          max={2}
          step={0.1}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Max Tokens: {localConfig.maxTokens}</label>
        <Slider
          value={[localConfig.maxTokens]}
          onValueChange={([value]) => handleChange('maxTokens', value)}
          min={1}
          max={32000}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Brand Voice</label>
        <Textarea
          value={localConfig.brandVoice || ''}
          onChange={(e) => handleChange('brandVoice', e.target.value)}
          placeholder="The tone and style the agent should use"
        />
      </div>

      <Button onClick={onSave} className="w-full">
        Save Configuration
      </Button>
    </div>
  );
}