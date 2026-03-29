import asyncio

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.services.mock_data import get_debate

router = APIRouter()


@router.get("/{symbol}")
async def debate_snapshot(symbol: str) -> dict[str, object]:
    return get_debate(symbol).model_dump()


@router.websocket("/stream/{symbol}")
async def debate_stream(websocket: WebSocket, symbol: str) -> None:
    await websocket.accept()
    payload = get_debate(symbol)

    events = [
        {"stage": "init", "message": "Initializing debate agents..."},
        {"stage": "bull_tool", "message": "Fetching technical patterns..."},
        {"stage": "bear_tool", "message": "Checking valuation vs peers..."},
    ]

    try:
        for event in events:
            await websocket.send_json(event)
            await asyncio.sleep(0.35)

        await websocket.send_json(
            {
                "stage": "bull_argument",
                "points": [point.model_dump() for point in payload.bull_points],
            }
        )
        await asyncio.sleep(0.35)
        await websocket.send_json(
            {
                "stage": "bear_argument",
                "points": [point.model_dump() for point in payload.bear_points],
            }
        )
        await asyncio.sleep(0.35)
        await websocket.send_json(
            {
                "stage": "arbitrator",
                "summary": payload.arbitrator_summary,
                "score": payload.conviction_score,
                "verdict": payload.verdict,
                "meta": payload.meta.model_dump(),
            }
        )
    except WebSocketDisconnect:
        return
