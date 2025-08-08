from google import genai

class SummarizingModel:
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)

    def summarize(self, text: str) -> str:
        prompt = f"""
Hãy tóm tắt nội dung văn bản sau thành 1 đoạn duy nhất, không quá 512 từ, giữ lại các ý quan trọng và sửa lỗi chính tả (nếu có):

{text}

**LƯU Ý**: CHỈ trả về đúng nội dung được tóm tắt, không trả thêm bất cứ câu từ hay từ ngữ, định dạng không liên quan
"""
        response = self.client.models.generate_content(
            model="gemma-3-27b-it", 
            contents=prompt
        )
        
        return response.text
        


