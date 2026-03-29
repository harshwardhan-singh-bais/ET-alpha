from fastapi import APIRouter

from app.api.routes import (
    briefing,
    chat,
    dashboard,
    debate,
    health,
    onboarding,
    patterns,
    portfolio,
    radar,
    smart_money,
    stress_test,
)

api_router = APIRouter()

api_router.include_router(health.router, tags=["health"])
api_router.include_router(onboarding.router, prefix="/onboarding", tags=["onboarding"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(debate.router, prefix="/debate", tags=["debate"])
api_router.include_router(portfolio.router, prefix="/portfolio", tags=["portfolio"])
api_router.include_router(radar.router, prefix="/radar", tags=["radar"])
api_router.include_router(patterns.router, prefix="/patterns", tags=["patterns"])
api_router.include_router(smart_money.router, prefix="/smart-money", tags=["smart-money"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(stress_test.router, prefix="/stress-test", tags=["stress-test"])
api_router.include_router(briefing.router, prefix="/briefing", tags=["briefing"])
