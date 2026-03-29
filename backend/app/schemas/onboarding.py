from pydantic import BaseModel, Field


class ProfileInput(BaseModel):
    profile_type: str = Field(examples=["Trader"])
    risk_appetite: str = Field(examples=["High"])


class HoldingInput(BaseModel):
    symbol: str
    quantity: int
    avg_price: float


class WatchlistInput(BaseModel):
    symbols: list[str]
