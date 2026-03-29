# ET Alpha Backend

FastAPI backend scaffold for ET Alpha - The Conviction Engine.

## Features Implemented (Backend Scaffold)

- Production-style FastAPI app structure using `app/` package
- API routing for all frontend feature modules
- Hardcoded demo payloads for fast hackathon iteration
- Debate and chat streaming endpoints via WebSocket
- Onboarding endpoints for profile, holdings, and watchlist intake
- Portfolio X-Ray and stress test endpoints
- Opportunity radar, patterns, smart money, and briefing endpoints
- LangChain/LangGraph-ready agent scaffold files
- NeonDB and Qdrant integration stubs for future wiring
- SEBI-safe disclaimer included in response metadata

## API Routes

- `GET /api/health`
- `POST /api/onboarding/profile`
- `POST /api/onboarding/holdings`
- `POST /api/onboarding/watchlist`
- `GET /api/dashboard/summary`
- `GET /api/debate/{symbol}`
- `WS /api/debate/stream/{symbol}`
- `GET /api/portfolio/xray`
- `POST /api/stress-test/run`
- `GET /api/radar/alerts`
- `GET /api/patterns/detections`
- `GET /api/smart-money/overview`
- `POST /api/chat/query`
- `WS /api/chat/stream`
- `GET /api/briefing/today`

## Run

```bash
uv sync
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Open docs at `http://localhost:8000/docs`.
