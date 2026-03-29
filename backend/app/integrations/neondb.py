from app.core.config import get_settings


def get_neondb_connection_string() -> str | None:
    return get_settings().neondb_url
