#!/usr/bin/env node

import 'dotenv/config';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// ---- Minimal Perplexity caller ----
const PPLX_API_URL = 'https://api.perplexity.ai/chat/completions';
const PPLX_MODEL = 'sonar';

type CallOpts = { query: string };

function getApiKey(): string {
  const key = process.env.PPLX_API_KEY;
  if (!key) throw new Error('Missing PPLX_API_KEY in .env');
  return key;
}

async function pplxSearch({ query }: CallOpts): Promise<string> {
  const res = await fetch(PPLX_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: PPLX_MODEL,
      messages: [{ role: 'user', content: query }],
      temperature: 0.2,
    }),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(`Perplexity ${res.status}: ${msg || res.statusText}`);
  }

  const json: any = await res.json();
  return (
    json?.choices?.[0]?.message?.content ??
    json?.choices?.[0]?.text ??
    ''
  );
}

// ---- MCP server with one tool ----
const server = new McpServer({
  name: 'Perplexity MCP (minimal)',
  version: '1.0.0',
  description: 'Single-tool Perplexity search (model: sonar)',
});

server.tool(
  'pplx_search',
  'Run a Perplexity search and return the answer text.',
  { query: z.string().describe('Search question or prompt.') },
  async ({ query }) => {
    const text = await pplxSearch({ query });
    return { content: [{ type: 'text', text }] };
  }
);

// ---- start stdio transport ----
const transport = new StdioServerTransport();
server.connect(transport).catch((err: unknown) => {
  console.error('Failed to start MCP server:', err);
  process.exit(1);
});