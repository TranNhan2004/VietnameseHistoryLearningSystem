from typing import List

from sentence_transformers import SentenceTransformer
from sklearn.preprocessing import normalize


class EmbeddingModel:
    def __init__(self, model_name: str) -> None:
        self._embedding_model = SentenceTransformer(model_name)

    def embed_text(self, sentences: List[str]):
        return normalize(self._embedding_model.encode(sentences))
