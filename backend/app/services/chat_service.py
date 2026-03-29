from app.schemas.chat import ChatResponse
from app.schemas.common import ApiMeta


def get_chat_response(prompt: str) -> ChatResponse:
    prompt_lower = prompt.lower()
    if "zomato" in prompt_lower:
        answer = (
            "You currently have 0% exposure to quick commerce. The latest setup has "
            "moderate conviction (6.2/10), so staged exposure may be safer than a "
            "full-size entry while valuation risk remains elevated."
        )
    else:
        answer = (
            "Signal blend is mixed. Momentum is constructive, but risk flags remain. "
            "A wait-for-confirmation stance has better downside control."
        )

    return ChatResponse(
        answer=answer,
        citations=["debate-cache", "portfolio-allocation", "market-pulse"],
        meta=ApiMeta(source="llm-fallback-mock"),
    )
