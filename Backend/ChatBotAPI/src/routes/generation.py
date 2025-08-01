import json

import fitz
from fastapi import APIRouter, HTTPException, UploadFile, Form, File

from src.models.prompt import Prompt, Response
from src.services.combination import generate_smoothed_answer, generate_smoothed_answer_with_pdf

router = APIRouter()


@router.post("/api/chatbot/generate")
async def generate(prompt: Prompt):
    answer = generate_smoothed_answer(prompt.model, prompt.question)
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

        answer = generate_smoothed_answer_with_pdf(model, question, pdf_text)

        return Response(answer=answer)

    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON in metadata.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")
