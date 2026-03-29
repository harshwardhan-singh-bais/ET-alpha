import asyncio

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.schemas.chat import ChatRequest
from app.services.chat_service import get_chat_response

router = APIRouter()


@router.post("/query")
async def chat_query(payload: ChatRequest) -> dict[str, object]:
    response = get_chat_response(payload.prompt)
    return response.model_dump()


@router.websocket("/stream")
async def chat_stream(websocket: WebSocket) -> None:
    await websocket.accept()
    try:
        while True:
            message = await websocket.receive_json()
            prompt = str(message.get("prompt", ""))
            response = get_chat_response(prompt)

            chunks = response.answer.split(" ")
            assembled = []
            for chunk in chunks:
                assembled.append(chunk)
                await websocket.send_json({"token": " ".join(assembled)})
                await asyncio.sleep(0.04)

            await websocket.send_json({"done": True, "meta": response.meta.model_dump()})
    except WebSocketDisconnect:
        return
