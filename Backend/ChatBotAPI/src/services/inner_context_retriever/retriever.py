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
        print("[INFO] Initializing FAISS Retriever...")

        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print(f"[INFO] Using device: {self.device}")

        assert embedding_model is not None, "Embedding model is not provided!"
        self.embedding_model = embedding_model

        assert df_path is not None, "Data frame path is not provided!"
        self.df = pd.read_excel(df_path)

        assert embeddings_path is not None, "Question embeddings path is not provided!"
        self.embeddings = np.load(embeddings_path)

        if faiss_index_path:
            self.index = faiss.read_index(faiss_index_path)
        else:
            self.index = None

        print("[INFO] Loading FAISS Retriever successfully!")

    def build_index(self):
        assert self.embeddings is not None, "Embeddings are not loaded!"
        dim = self.embeddings.shape[1]
        print(dim)
        self.index = faiss.IndexFlatIP(dim)
        self.index.add(self.embeddings)
        print("[INFO] FAISS index built.")

    def save_index(self, path: str):
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



