from datetime import UTC, datetime

from fastapi import APIRouter, Query

router = APIRouter()


@router.get("/detections")
async def pattern_detections(symbol: str | None = Query(default=None)) -> dict[str, object]:
    items = [
        {
            "symbol": symbol.upper() if symbol else "INFY",
            "pattern": "Cup and Handle",
            "direction": "bullish",
            "entry": 1542.0,
            "target": 1678.0,
            "stop_loss": 1498.0,
            "completion_percent": 82,
            "history": {
                "occurrences": 4,
                "worked": 3,
                "avg_move_percent": 8.2,
                "avg_days": 23,
            },
        }
    ]
    return {"patterns": items, "last_updated": datetime.now(UTC).isoformat()}
