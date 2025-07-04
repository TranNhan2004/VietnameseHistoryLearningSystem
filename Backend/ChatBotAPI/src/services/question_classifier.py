import fasttext


class FastTextClassifier:
    def __init__(self, model_path: str):
        self.model = fasttext.load_model(model_path)

    def predict(self, question: str) -> int:
        labels, _ = self.model.predict(question, k=1)
        return int(labels[0].replace("__label__", ""))
