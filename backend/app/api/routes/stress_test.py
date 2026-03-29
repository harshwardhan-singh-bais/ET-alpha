from pydantic import BaseModel, Field
from fastapi import APIRouter

from app.services.portfolio_service import run_stress_test

router = APIRouter()


class StressTestInput(BaseModel):
    market_drop_percent: float = Field(default=20.0, ge=1.0, le=95.0)


@router.post("/run")
async def stress_test(payload: StressTestInput) -> dict[str, object]:
    return run_stress_test(payload.market_drop_percent)
