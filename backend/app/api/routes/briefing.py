from datetime import date

from fastapi import APIRouter, Query

from app.services.mock_data import get_briefing

router = APIRouter()


@router.get("/today")
async def get_today_briefing(
    briefing_type: str = Query(default="pre", pattern="^(pre|post)$")
) -> dict[str, object]:
    content = get_briefing(briefing_type)
    return {"date": date.today().isoformat(), "content": content}
