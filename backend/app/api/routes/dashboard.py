from fastapi import APIRouter

from app.services.mock_data import get_dashboard_summary, get_leaderboard

router = APIRouter()


@router.get("/summary")
async def dashboard_summary() -> dict[str, object]:
    summary = get_dashboard_summary()
    leaderboard = get_leaderboard()
    market_pulse = {
        "nifty50": 24892.3,
        "bank_nifty": 52310.2,
        "sensex": 82014.7,
        "advance_decline": {"advances": 1234, "declines": 917},
        "india_vix": 13.2,
        "fii_dii": {"fii": 812.4, "dii": -241.7},
    }
    return {
        "portfolio": summary.model_dump(),
        "market_pulse": market_pulse,
        "leaderboard": leaderboard,
    }
