from typing import List, Dict

import numpy as np
from underthesea import sent_tokenize

from src.services.embedding import EmbeddingModel


class FilterContexts:
    def __init__(self, embedding_model: EmbeddingModel):
        self.embedding_model = embedding_model

    def filter(
        self,
        question: str,
        inner_contexts: List[Dict],
        outer_contexts: List[Dict],
        threshold: float = 0.4,
        top_k: int = 10
    ) -> str | None:
        contexts = []
        for inner_context in inner_contexts:
            contexts.extend(inner_context["context"])

        if outer_contexts:
            for outer_context in outer_contexts:
                contexts.extend(sent_tokenize(outer_context["context"]))

        query_embedding = self.embedding_model.embed_text([question])
        context_embeddings = self.embedding_model.embed_text(contexts)

        similarity = query_embedding @ context_embeddings.T
        similarity = similarity.flatten()

        top_k_indices = np.argsort(similarity)[-top_k:][::-1]

        selected_contexts = [
            contexts[i] for i in top_k_indices if similarity[i] >= threshold
        ]

        if selected_contexts:
            return "\n".join(selected_contexts)

        return None
