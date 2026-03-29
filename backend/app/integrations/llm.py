from app.core.config import get_settings


def get_llm_provider_status() -> dict[str, bool]:
    settings = get_settings()
    return {
        "groq_configured": bool(settings.groq_api_key),
        "anthropic_configured": bool(settings.anthropic_api_key),
    }
