import re


class Preprocess:
    @staticmethod
    def remove_special_chars(text: str) -> str:
        temp = re.sub(r"\[\d+\]", "", text)
        return re.sub(r"[^0-9a-zA-ZÀ-ỹ\-/.,();:'\"?! ]+", '', temp).strip()
