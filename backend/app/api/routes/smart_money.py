from datetime import UTC, datetime

from fastapi import APIRouter

router = APIRouter()


@router.get("/overview")
async def smart_money_overview() -> dict[str, object]:
    return {
        "daily_flow": {"fii": 845.3, "dii": -224.6, "status": "net-fii-buyer"},
        "sector_heatmap": [
            {"sector": "IT", "flow": 122.4, "intensity": "medium"},
            {"sector": "Financials", "flow": 318.2, "intensity": "high"},
            {"sector": "Auto", "flow": -94.1, "intensity": "low"},
        ],
        "stock_activity": [
            {"symbol": "ZOMATO", "smart_money_score": 74},
            {"symbol": "HDFCBANK", "smart_money_score": 71},
            {"symbol": "TCS", "smart_money_score": 69},
        ],
        "last_updated": datetime.now(UTC).isoformat(),
    }
