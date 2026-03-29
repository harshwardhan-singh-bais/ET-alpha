from pydantic import BaseModel

from app.schemas.common import ApiMeta


class ArgumentPoint(BaseModel):
    text: str
    citation: str


class DebateResult(BaseModel):
    symbol: str
    price: float
    change_percent: float
    bull_points: list[ArgumentPoint]
    bear_points: list[ArgumentPoint]
    arbitrator_summary: str
    conviction_score: float
    verdict: str
    meta: ApiMeta
