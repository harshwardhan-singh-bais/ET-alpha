from pydantic import BaseModel

from app.schemas.common import ApiMeta


class DashboardSummary(BaseModel):
    portfolio_value: float
    day_pnl: float
    overall_pnl: float
    nifty_delta_percent: float
    active_alerts: int
    meta: ApiMeta
