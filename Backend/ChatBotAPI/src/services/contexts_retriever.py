from typing import Optional, List, Dict

import faiss
import numpy as np
import pandas as pd
import torch


class FAISSRetriever:
    def __init__(
        self,
        df_path: str,
        embeddings_path: str,
        faiss_index_path: Optional[str],
        phobert_tokenizer,
        phobert_model
    ):
        """
        FAISSRetriever using only one FAISS index (question-based).
        Uses FAISS IndexFlatIP with normalized vectors for cosine similarity.
        """
        print("[INFO] Initializing FAISSRetriever...")

        # Device
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print(f"[INFO] Using device: {self.device}")

        # Load PhoBERT
        print("[INFO] Loading PhoBERT...")
        self.phobert_tokenizer = phobert_tokenizer
        self.phobert_model = phobert_model

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

    def _normalize_vectors(self, x: np.ndarray) -> np.ndarray:
        norms = np.linalg.norm(x, axis=1, keepdims=True)
        return x / norms

    def embed_sentence(self, sentence: str) -> np.ndarray:
        """
        Encode a sentence using PhoBERT and return normalized vector (1,768)
        """
        inputs = self.phobert_tokenizer(sentence, return_tensors='pt', truncation=True, max_length=128).to(self.device)
        with torch.no_grad():
            outputs = self.phobert_model(**inputs)
        cls_vector = outputs.last_hidden_state[:, 0, :].squeeze().cpu().numpy().reshape(1, -1)
        normalized_vector = self._normalize_vectors(cls_vector)
        return normalized_vector

    def build_index(self):
        """
        Build FAISS IndexFlatIP from question embeddings
        """
        assert self.embeddings is not None, "Embeddings are not loaded!"
        dim = self.embeddings.shape[1]
        self.embeddings = self._normalize_vectors(self.embeddings)
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

    def find_nearest(
        self,
        query: str,
        find_k: int = 100,
        top_k: int = 5,
        threshold_trials: List[float] = [0.8, 0.7, 0.6],
    ) -> List[Dict]:
        """
        Search for the most similar contexts given a query
        """
        assert self.index is not None, "Index not loaded or built!"
        assert len(threshold_trials) > 0, "At least one threshold must be provided."

        query_vector = self.embed_sentence(query)
        D, I = self.index.search(query_vector, find_k)
        results = []
        t = 0
        while True:
            for score, idx in zip(D[0], I[0]):
                if score >= threshold_trials[t]:
                    results.append({
                        "context": self.df.loc[idx, "Context"],
                        "score": score
                    })
            t += 1
            if len(results) > 0 or t >= len(threshold_trials):
                break

        results.sort(key=lambda x: x["score"], reverse=True)
        return results[:top_k]
