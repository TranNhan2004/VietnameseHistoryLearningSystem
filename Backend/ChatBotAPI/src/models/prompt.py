from pydantic import BaseModel


class Prompt(BaseModel):
    content: str


class Response(BaseModel):
    root_content: str
    smoothed_content: str
