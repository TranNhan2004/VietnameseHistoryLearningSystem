from fastapi import APIRouter

from src.models.prompt import Prompt, Response
from src.services.combine import generate_smoothed_answer

router = APIRouter()


@router.post("/api/chatbot/generate")
async def generate(prompt: Prompt):
    root_content, smoothed_content = generate_smoothed_answer(prompt.content)
    return Response(root_content=root_content, smoothed_content=smoothed_content)
