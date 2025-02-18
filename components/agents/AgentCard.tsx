'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { AgentConfig } from '@/lib/agents/types';

interface AgentCardProps {
  agent: AgentConfig;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function AgentCard({ agent, onEdit, onDelete }: AgentCardProps) {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{agent.title}</h3>
          <p className="text-sm text-gray-500">{agent.description}</p>
        </div>
        <div className="space-x-2">
          {onEdit && (
            <Button variant="outline" size="sm" onClick={onEdit}>
              Edit
            </Button>
          )}
          {onDelete && (
            <Button variant="destructive" size="sm" onClick={onDelete}>
              Delete
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {agent.tools.map((tool) => (
            <Badge key={tool} variant="secondary">
              {tool}
            </Badge>
          ))}
        </div>
        <div className="text-sm">
          <span className="font-medium">Model:</span> {agent.model}
        </div>
        <div className="text-sm">
          <span className="font-medium">Language:</span> {agent.language}
        </div>
      </div>
    </Card>
  );
}