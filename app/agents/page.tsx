'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AgentCard } from '@/components/agents/AgentCard';
import { GuideInfoBox } from '@/components/guide/GuideInfoBox';

export default function AgentsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Agents</h1>
        <Link href="/agents/create">
          <Button>Create New Agent</Button>
        </Link>
      </div>

      <GuideInfoBox>
        <ul>
          <li className="text-l">
            🤝
            <span className="ml-2">
              This template showcases a{" "}
              <a href="https://js.langchain.com/" target="_blank">
                LangChain.js
              </a>{" "}
              agent and the Vercel{" "}
              <a href="https://sdk.vercel.ai/docs" target="_blank">
                AI SDK
              </a>{" "}
              in a{" "}
              <a href="https://nextjs.org/" target="_blank">
                Next.js
              </a>{" "}
              project.
            </span>
          </li>
          <li>
            🛠️
            <span className="ml-2">
              Create custom agents with specific expertise and capabilities.
            </span>
          </li>
          <li className="hidden text-l md:block">
            💻
            <span className="ml-2">
              Each agent can be configured with different models, languages, and personalities.
            </span>
          </li>
        </ul>
      </GuideInfoBox>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/* Agent cards will be rendered here */}
      </div>
    </div>
  );
}
