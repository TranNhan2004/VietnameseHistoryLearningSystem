import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM


class Generator:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print("[INFO] Using device: ", self.device)

    def generate(self, question: str, context: str) -> str:
        return ""


class ViT5Generator(Generator):
    def __init__(self, model_path: str):
        super().__init__();

        print("[INFO] Loading model...")
        assert model_path is not None, "Model path is not provided!"
        self.tokenizer = AutoTokenizer.from_pretrained(model_path)
        self.model = AutoModelForSeq2SeqLM.from_pretrained(model_path).to(self.device)

        print("[INFO] Model loaded.")

    def generate(self, question: str, context: str) -> str:
        prompt = f"HỎI: {question}\n NGỮ CẢNH: {context}"

        input_ids = self.tokenizer(
            prompt,
            return_tensors="pt",
            max_length=1024,
            truncation=True,
            padding="max_length"
        ).input_ids.to(self.device)

        output_ids = self.model.generate(
            input_ids=input_ids,
            max_new_tokens=1024,
            do_sample=True,
            temperature=0.8,
            top_p=0.8,
            repetition_penalty=1.2,
            eos_token_id=self.tokenizer.eos_token_id,
            pad_token_id=self.tokenizer.pad_token_id,
        )

        return self.tokenizer.decode(output_ids[0], skip_special_tokens=True)
