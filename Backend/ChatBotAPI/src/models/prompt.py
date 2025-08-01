from pydantic import BaseModel


class Prompt(BaseModel):
    model: str
    question: str


class Response(BaseModel):
    answer: str
