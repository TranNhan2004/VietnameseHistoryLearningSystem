from typing import Optional, List, Dict

import faiss
import numpy as np
import pandas as pd
import torch
from underthesea import sent_tokenize

from src.services.embedding import EmbeddingModel


class FAISSRetriever:
    def __init__(
        self,
        df_path: str,
        embedding_model: EmbeddingModel,
        embeddings_path: str,
        faiss_index_path: Optional[str] = None,
    ):
        """
        FAISSRetriever using only one FAISS index (question-based).
        Uses FAISS IndexFlatIP with normalized vectors for cosine similarity.
        """
        print("[INFO] Initializing FAISSRetriever...")

        # Device
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print(f"[INFO] Using device: {self.device}")

        # Load embedding model
        assert embedding_model is not None, "Embedding model is not provided!"
        print("[INFO] Loading embedding model...")
        self.embedding_model = embedding_model

        # Load DataFrame
        assert df_path is not None, "Data frame path is not provided!"
        print("[INFO] Loading dataset...")
        self.df = pd.read_excel(df_path)

        # Load embeddings
        assert embeddings_path is not None, "Question embeddings path is not provided!"
        print("[INFO] Loading embeddings...")
        self.embeddings = np.load(embeddings_path)

        # Load FAISS index (optional)
        if faiss_index_path:
            print("[INFO] Loading FAISS index...")
            self.index = faiss.read_index(faiss_index_path)
        else:
            self.index = None

    def build_index(self):
        """
        Build FAISS IndexFlatIP from question embeddings
        """
        assert self.embeddings is not None, "Embeddings are not loaded!"
        dim = self.embeddings.shape[1]
        print(dim)
        self.index = faiss.IndexFlatIP(dim)
        self.index.add(self.embeddings)
        print("[INFO] FAISS index built.")

    def save_index(self, path: str):
        """
        Save the FAISS index to disk
        """
        assert self.index is not None, "Index not built!"
        faiss.write_index(self.index, path)
        print(f"[INFO] FAISS index saved to {path}")

    def retrieve(
        self,
        query: str,
        top_k: int = 5,
    ) -> List[Dict]:
        assert self.index is not None, "Index not loaded or built!"

        query_vector = self.embedding_model.embed_text([query])
        D, I = self.index.search(query_vector, top_k)
        results = [
            {
                "context": self.df.loc[idx, "Context"],
                "score": score
            }
            for score, idx in zip(D[0], I[0])
        ]

        results.sort(key=lambda x: x["score"], reverse=True)
        return results[:top_k]


class PDFRetriever:
    def __init__(self, embedding_model: EmbeddingModel):
        self.embedding_model = embedding_model

    def chunk_text(self, pdf_text: str, n_sent=3) -> List[str]:
        sentences = sent_tokenize(pdf_text)
        chunks = [" ".join(sentences[i:i + n_sent]) for i in range(0, len(sentences), n_sent)]
        return [c for c in chunks if len(c.strip()) > 10]

    def retrieve(
        self,
        pdf_text: str,
        question: str,
        top_k: int = 3
    ) -> List[Dict]:
        chunks = self.chunk_text(pdf_text)
        chunk_vectors = self.embedding_model.embed_text(chunks)
        query_vec = self.embedding_model.embed_text([question])

        scores = np.dot(chunk_vectors, query_vec.T).flatten()
        top_indices = scores.argsort()[-top_k:][::-1]

        return [
            {"context": chunks[i], "score": float(scores[i])}
            for i in top_indices
        ]
