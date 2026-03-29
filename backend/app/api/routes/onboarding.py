from fastapi import APIRouter

from app.schemas.onboarding import HoldingInput, ProfileInput, WatchlistInput

router = APIRouter()


@router.post("/profile")
async def save_profile(payload: ProfileInput) -> dict[str, object]:
    return {"status": "saved", "profile": payload.model_dump(), "storage": "mock"}


@router.post("/holdings")
async def save_holdings(payload: list[HoldingInput]) -> dict[str, object]:
    return {"status": "saved", "count": len(payload), "storage": "mock"}


@router.post("/watchlist")
async def save_watchlist(payload: WatchlistInput) -> dict[str, object]:
    return {"status": "saved", "symbols": payload.symbols, "storage": "mock"}
