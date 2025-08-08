from openai import OpenAI

class SmoothingModel:
    def __init__(self, api_key: str, model_name: str = 'gpt-4.1-nano') -> None:
        self.client = OpenAI(api_key=api_key)
        self.model = model_name

    def smoothing_answer(self, answer: str) -> str:
        prompt = f"""
Bạn là chuyên gia LỊCH SỬ VIỆT NAM.

Hãy làm mượt nội dung câu trả lời dưới đây sao cho đúng tính chất LỊCH SỬ VIỆT NAM và câu từ rõ nghĩa.

Câu trả lời: {answer}

**LƯU Ý**: Chỉ cần trả về nội dung câu trả lời được làm mượt! KHÔNG trả lời thêm bất cứ thứ gì.
"""

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": prompt.strip()}]
        )

        return response.choices[0].message.content


    def smoothing_answer_markdown(self, answer: str) -> str:
        prompt = f"""
Bạn là chuyên gia LỊCH SỬ VIỆT NAM.

Hãy làm mượt nội dung câu trả lời dưới đây sao cho đúng tính chất LỊCH SỬ VIỆT NAM, rõ nghĩa, và trình bày lại bằng **Markdown** để dễ hiển thị đẹp trên web.

Câu trả lời: {answer}

**LƯU Ý**: 
- Trả về **chỉ nội dung Markdown**.
- Có thể dùng các tiêu đề (##), danh sách (-), in đậm (**), in nghiêng (*), đoạn xuống dòng (`\\n\\n`) nếu phù hợp.
"""

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": prompt.strip()}]
        )

        return response.choices[0].message.content

