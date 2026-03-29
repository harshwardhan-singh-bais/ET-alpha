from datetime import UTC, datetime

from fastapi import APIRouter

from app.services.mock_data import get_radar_alerts

router = APIRouter()


@router.get("/alerts")
async def radar_alerts() -> dict[str, object]:
    return {
        "alerts": get_radar_alerts(),
        "last_updated": datetime.now(UTC).isoformat(),
        "refresh_interval_minutes": 15,
    }
