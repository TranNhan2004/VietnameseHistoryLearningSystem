import json
import os

import fitz
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, UploadFile, Form, File
from redis.asyncio import Redis

from src.models.prompt import Prompt, Response
from src.services.combination import GenerateService

load_dotenv()

router = APIRouter()
generate_service = GenerateService()

REDIS_PASSWORD = os.getenv("REDIS_PASSWORD")
REDIS_AI_KEY = os.getenv("REDIS_AI_KEY")
redis_client = Redis(
    host="localhost",
    port=6379,
    db=0,
    password=REDIS_PASSWORD,
    decode_responses=True
)


@router.get("/api/chatbot/config")
async def load_config():
    redis_key = REDIS_AI_KEY

    try:
        if await redis_client.exists(redis_key):
            config = json.loads(await redis_client.get(redis_key))
        else:
            with open("src/config/default.json", "r", encoding="utf-8") as f:
                config = json.load(f)
                await redis_client.set(redis_key, json.dumps(config))

        generate_service.set_args(**config)
        return "Load config successfully"

    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="default.json file not found.")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid JSON in default.json or Redis.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")


@router.post("/api/chatbot/generate")
async def generate(prompt: Prompt):
    answer, _ = generate_service.generate(prompt.model, prompt.question)
    return Response(answer=answer)


@router.post("/api/chatbot/generate-with-pdf")
async def generate_with_pdf(
    metadata: str = Form(...),
    pdf: UploadFile = File(...)
):
    try:
        meta = json.loads(metadata)
        question = meta.get("question")
        model = meta.get("model")

        if not question:
            raise HTTPException(status_code=400, detail="Missing question in metadata.")

        contents = await pdf.read()
        with fitz.open(stream=contents, filetype="pdf") as doc:
            pdf_text = "\n".join([page.get_text() for page in doc])

        answer, _ = generate_service.generate_with_pdf(model, question, pdf_text)

        return Response(answer=answer)

    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON in metadata.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")
