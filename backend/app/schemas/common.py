from datetime import UTC, datetime

from pydantic import BaseModel, Field


class ApiMeta(BaseModel):
    last_updated: str = Field(default_factory=lambda: datetime.now(UTC).isoformat())
    source: str = "mock"
    disclaimer: str = (
        "For educational purposes only. Not SEBI registered investment advice."
    )


class StockSignal(BaseModel):
    symbol: str
    confluence_score: float
    confidence: str
    summary: str
