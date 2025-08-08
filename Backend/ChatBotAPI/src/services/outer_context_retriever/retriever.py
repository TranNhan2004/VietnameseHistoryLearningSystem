from src.services.embedding import EmbeddingModel
from underthesea import sent_tokenize
from typing import List, Dict

class PDFRetriever:
    def __init__(self, embedding_model: EmbeddingModel):
        print("[INFO] Initializing PDF Retriever...")
        self.embedding_model = embedding_model
        print("[INFO] Loading PDF Retriever successfully!")

    def chunk_text(self, pdf_text: str, n_sent=3) -> List[str]:
        sentences = sent_tokenize(pdf_text)
        chunks = [" ".join(sentences[i:i + n_sent]) for i in range(0, len(sentences), n_sent)]
        return chunks

    def retrieve(
        self,
        pdf_text: str,
        question: str,
        top_k: int = 3
    ) -> List[Dict]:
        chunks = self.chunk_text(pdf_text)
        chunk_vectors = self.embedding_model.embed_text(chunks)
        query_vec = self.embedding_model.embed_text([question])

        scores = (chunk_vectors @ query_vec.T).flatten()
        top_indices = scores.argsort()[-top_k:][::-1]

        return [
            {"context": chunks[i], "score": float(scores[i])}
            for i in top_indices
        ]