from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "ET Alpha - The Conviction Engine API"
    app_version: str = "0.1.0"
    api_prefix: str = "/api"
    environment: str = Field(default="development")
    debug: bool = Field(default=True)

    groq_api_key: str | None = None
    anthropic_api_key: str | None = None
    redis_url: str | None = None
    neondb_url: str | None = None
    qdrant_url: str | None = None


@lru_cache
def get_settings() -> Settings:
    return Settings()
