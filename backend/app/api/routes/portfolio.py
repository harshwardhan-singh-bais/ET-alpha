from fastapi import APIRouter

from app.services.portfolio_service import get_portfolio_xray

router = APIRouter()


@router.get("/xray")
async def portfolio_xray() -> dict[str, object]:
    return get_portfolio_xray()
