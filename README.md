# posthog-llm-obs-api

Sovereign HTTP proxy for **PostHog LLM Observability** · exposes SDK methods over REST.

## Endpoints
- `GET /` — metadata + available methods
- `GET /health` — health check
- `POST /call/:method` — invoke SDK method with JSON body as params

## Env
`POSTHOG_LLM_OBS_API_KEY` required.

## Run
```bash
npm install && npm start
```

MIT · AI-Native Solutions estate.
