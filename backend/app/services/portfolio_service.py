from app.schemas.common import ApiMeta


def get_portfolio_xray() -> dict[str, object]:
    return {
        "xirr": 18.6,
        "day_pnl": 1.45,
        "month_pnl": 4.91,
        "year_pnl": 22.2,
        "benchmark": {"nifty50": 14.9, "nifty_midcap": 18.1},
        "sector_allocation": [
            {"sector": "IT", "weight": 24.0},
            {"sector": "Financials", "weight": 31.0},
            {"sector": "Consumer", "weight": 18.0},
            {"sector": "Energy", "weight": 16.0},
            {"sector": "Others", "weight": 11.0},
        ],
        "risk_flags": [
            "Single-stock concentration exceeds 20% in one position.",
            "Three holdings show high correlation cluster (0.90+).",
        ],
        "meta": ApiMeta(source="portfolio-snapshot").model_dump(),
    }


def run_stress_test(market_drop_percent: float) -> dict[str, object]:
    portfolio_drop = round(market_drop_percent * 0.86, 2)
    return {
        "scenario_market_drop": market_drop_percent,
        "estimated_portfolio_drop": portfolio_drop,
        "worst_impacts": [
            {"symbol": "TATAMOTORS", "estimated_drag": -7.4},
            {"symbol": "HDFCBANK", "estimated_drag": -6.2},
            {"symbol": "INFY", "estimated_drag": -5.7},
        ],
        "meta": ApiMeta(source="stress-sim-mock").model_dump(),
    }
