import numpy as np

from typing import List, Tuple
from sentence_transformers import CrossEncoder
from src.utils.scaler import MinMaxScaler

class TextRankingModel:
    def __init__(self, model_name: str) -> None:
        self._text_ranking_model = CrossEncoder(model_name)

    def predict(self, pairs: List[Tuple[str, str]]):
        scores = np.array(self._text_ranking_model.predict(pairs))
        return MinMaxScaler.scale(scores, target_range=[-1, 1])
