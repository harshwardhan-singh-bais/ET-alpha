from dataclasses import dataclass


@dataclass
class OrchestrationResult:
    route: str
    reason: str


def route_user_intent(intent: str) -> OrchestrationResult:
    """Temporary rule-based router until LangGraph workflow is wired."""
    intent_lower = intent.lower()
    if "debate" in intent_lower:
        return OrchestrationResult(route="debate", reason="Detected debate intent")
    if "portfolio" in intent_lower or "xray" in intent_lower:
        return OrchestrationResult(route="portfolio", reason="Detected portfolio intent")
    return OrchestrationResult(route="chat", reason="Default conversational fallback")
