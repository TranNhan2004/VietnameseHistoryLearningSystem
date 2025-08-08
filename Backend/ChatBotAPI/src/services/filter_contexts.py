import numpy as np
from typing import List, Dict
from underthesea import sent_tokenize
from src.services.embedding import EmbeddingModel
from src.services.text_ranking import TextRankingModel

class FilterContexts:
    def __init__(self, text_ranking_model: TextRankingModel, embedding_model: EmbeddingModel):
        self.text_ranking_model = text_ranking_model
        self.embedding_model = embedding_model

    def filter(
        self,
        question: str,
        inner_contexts: List[Dict],
        outer_contexts: List[Dict],
        alpha = 0.7,
        top_k: int = 10,
        min_threshold: float = 0.6
    ) -> str | None:

        sentences = set()

        for inner in inner_contexts or []:
            for s in inner["context"].split("\n"):
                s = s.strip()
                if s:
                    sentences.add(s)

        for outer in outer_contexts or []:
            for s in sent_tokenize(outer["context"]):
                s = s.strip()
                if s:
                    sentences.add(s)

        if not sentences:
            return None

        sentences = list(sentences)
        pairs = [(question, s) for s in sentences]

        ranking_scores = self.text_ranking_model.predict(pairs)

        question_emb = self.embedding_model.embed_text([question])
        sentence_embs = self.embedding_model.embed_text(sentences)
        cosine_scores = (question_emb @ sentence_embs.T).flatten()

        final_scores = alpha * ranking_scores + (1 - alpha) * cosine_scores

        top_indices = np.argsort(final_scores)[-top_k:][::-1]
        selected = [sentences[i] for i in top_indices if final_scores[i] >= min_threshold]

        return "\n".join(selected) if selected else None