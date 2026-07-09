#!/usr/bin/env node
/**
 * posthog-llm-obs-api · HTTP proxy for PostHog LLM Observability
 * Auto-generated · exposes SDK methods as REST endpoints.
 */
import { createServer } from 'node:http';
import { PosthogLlmObs } from '@ai-native-solutions/posthog-llm-obs-sdk';

const PORT = process.env.PORT || 4200;
const client = new PosthogLlmObs({ apiKey: process.env.POSTHOG_LLM_OBS_API_KEY });

createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    if (req.method === 'GET' && req.url === '/health') return res.end(JSON.stringify({ status: 'ok', wraps: 'PostHog LLM Observability' }));
    if (req.method === 'GET' && req.url === '/') return res.end(JSON.stringify({ name: 'posthog-llm-obs-api', wraps: 'PostHog LLM Observability', methods: Object.getOwnPropertyNames(Object.getPrototypeOf(client)).filter(n => n !== 'constructor') }));
    // POST /call/<method> → invoke SDK method with body as params
    const m = req.url.match(/^\/call\/([a-zA-Z0-9_]+)$/);
    if (m && req.method === 'POST') {
      let body = ''; for await (const chunk of req) body += chunk;
      const params = body ? JSON.parse(body) : {};
      const method = m[1];
      if (typeof client[method] !== 'function') { res.statusCode = 404; return res.end(JSON.stringify({ error: 'unknown method' })); }
      const result = await client[method](params);
      return res.end(JSON.stringify(result));
    }
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'not found', endpoints: ['/', '/health', 'POST /call/:method'] }));
  } catch (e) { res.statusCode = 500; res.end(JSON.stringify({ error: e.message })); }
}).listen(PORT, () => console.log('posthog-llm-obs-api listening on', PORT));
