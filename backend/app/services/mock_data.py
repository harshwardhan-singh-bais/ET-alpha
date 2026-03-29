from app.schemas.common import ApiMeta
from app.schemas.dashboard import DashboardSummary
from app.schemas.debate import ArgumentPoint, DebateResult


def get_dashboard_summary() -> DashboardSummary:
    return DashboardSummary(
        portfolio_value=1284500.0,
        day_pnl=18340.0,
        overall_pnl=221560.0,
        nifty_delta_percent=0.84,
        active_alerts=5,
        meta=ApiMeta(source="precomputed-demo"),
    )


def get_leaderboard() -> list[dict[str, float | str]]:
    return [
        {"symbol": "ZOMATO", "score": 7.8, "sector": "Quick Commerce"},
        {"symbol": "RELIANCE", "score": 7.4, "sector": "Energy"},
        {"symbol": "TCS", "score": 7.1, "sector": "IT"},
        {"symbol": "HDFCBANK", "score": 6.9, "sector": "Banking"},
        {"symbol": "TATAMOTORS", "score": 6.8, "sector": "Auto"},
    ]


def get_debate(symbol: str) -> DebateResult:
    symbol_upper = symbol.upper()
    return DebateResult(
        symbol=symbol_upper,
        price=221.35 if symbol_upper == "ZOMATO" else 1450.2,
        change_percent=2.18,
        bull_points=[
            ArgumentPoint(
                text="Breakout above 20-day consolidation with rising momentum.",
                citation="technical-patterns:v1",
            ),
            ArgumentPoint(
                text="Sector-level FII buying has improved for five consecutive sessions.",
                citation="nse-fii-flow:daily",
            ),
        ],
        bear_points=[
            ArgumentPoint(
                text="Valuation premium is elevated versus peer median EV/EBITDA.",
                citation="valuation-screen:peer-pack",
            ),
            ArgumentPoint(
                text="Recent promoter-side secondary supply can cap near-term upside.",
                citation="shareholding-disclosure:qtr",
            ),
        ],
        arbitrator_summary=(
            "Bull case is slightly stronger, but valuation risk remains active. "
            "Moderate conviction with strict risk control."
        ),
        conviction_score=6.2,
        verdict="Moderate conviction",
        meta=ApiMeta(source="cached-debate"),
    )


def get_radar_alerts() -> list[dict[str, str | float | int]]:
    return [
        {
            "id": 1,
            "symbol": "ZOMATO",
            "signal_type": "Confluence",
            "description": "Breakout + sentiment uptick + volume surge",
            "score": 7.8,
            "minutes_ago": 6,
        },
        {
            "id": 2,
            "symbol": "SBIN",
            "signal_type": "Institutional",
            "description": "Bulk deal from long-only institution",
            "score": 7.1,
            "minutes_ago": 14,
        },
        {
            "id": 3,
            "symbol": "INFY",
            "signal_type": "Earnings",
            "description": "Guidance tone improved vs previous quarter",
            "score": 6.7,
            "minutes_ago": 22,
        },
    ]


def get_briefing(briefing_type: str) -> dict[str, object]:
    if briefing_type == "post":
        return {
            "type": "post",
            "headline": "Volatility cooled; selective midcaps outperformed.",
            "highlights": [
                "Nifty closed +0.6% with broad participation.",
                "Portfolio outperformed benchmark by 38 bps.",
                "Two high-conviction signals triggered and remained valid into close.",
            ],
            "watch_tomorrow": ["RBI commentary", "F&O positioning", "IT earnings"],
        }
    return {
        "type": "pre",
        "headline": "Global cues stable; domestic breadth likely constructive.",
        "highlights": [
            "US futures flat, crude slightly softer overnight.",
            "Three opportunity-radar signals fired before open.",
            "Watch quick commerce and defense momentum buckets.",
        ],
        "watch_today": ["Result reactions", "Sector rotation", "Options PCR"],
    }
