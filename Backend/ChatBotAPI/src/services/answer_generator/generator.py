from huggingface_hub import login, hf_hub_download
from llama_cpp import Llama


class AnswerGenerator:
    def __init__(
        self,
        hf_token: str,
        repo_id: str,
        filename: str,
        n_ctx: int,
        n_threads: int,
        n_batch: int
    ) -> None:
        print("[INFO] Initializing Answer Generator...")
        login(token=hf_token)

        self.model_path = hf_hub_download(
            repo_id=repo_id,
            filename=filename,
            repo_type="model"
        )

        self.llm = Llama(
            model_path=self.model_path,
            n_ctx=n_ctx,
            n_threads=n_threads,
            n_batch=n_batch
        )

        print("[INFO] Loading Answer Generator successfully!")

    def generate(
        self,
        question: str,
        context: str,
        max_tokens: int,
        temperature: float,
        top_p: float,
        repeat_penalty: float
    ) -> str:
        prompt = f"""
### System:
Bạn là một chuyên gia về lịch sử Việt Nam.

### User:
QUESTION: {question}
CONTEXT: {context}

### Assistant:
"""
        output_text = ''
        for i in range(5):
            output = self.llm(
                prompt=prompt.strip(),
                max_tokens=max_tokens,
                temperature=temperature,
                top_p=top_p,
                stop=["###"],
                repeat_penalty=repeat_penalty
            )

            output_text = output["choices"][0]["text"]

            if f"QUESTION: {question}" in output_text:
                output_text = output_text.replace(f"QUESTION: {question}", "")
            if f"CONTEXT: {context}" in output_text:
                output_text = output_text.replace(f"CONTEXT: {context}", "")
            if "ANSWER:" in output_text:
                output_text = output_text.replace("ANSWER:", "")

            if output_text.strip() != '':
                return output_text.strip()

        return output_text.strip()
