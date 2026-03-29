from pydantic import BaseModel

from app.schemas.common import ApiMeta


class ChatRequest(BaseModel):
    prompt: str


class ChatResponse(BaseModel):
    answer: str
    citations: list[str]
    meta: ApiMeta
