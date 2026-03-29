from app.core.config import get_settings


def get_qdrant_url() -> str | None:
    return get_settings().qdrant_url
