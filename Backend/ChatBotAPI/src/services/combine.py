import os

from dotenv import load_dotenv

from src.services.answer_generator import ViT5Generator
from src.services.contexts_retriever import FAISSRetriever
from src.services.openai_api import SmoothingModel
from src.services.question_classifier import FastTextClassifier

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

smoothing_model = SmoothingModel(OPENAI_API_KEY)
fasttext_classifier = FastTextClassifier(model_path="ai_models/fasttext/fasttext-dim=50-ngrams=2.ftz")
faiss_retriever = FAISSRetriever(
    df_path="ai_models/faiss/QuestionAnswersFinal.xlsx",
    embeddings_path="ai_models/faiss/question_embeddings.npy",
    faiss_index_path="ai_models/faiss/question_index.index"
)
vit5_generator = ViT5Generator(model_path="ai_models/vit5-base-ft")
default_answer = "Kiến thức của tôi không bao hàm câu hỏi của bạn, bạn có muốn nhận một câu trả lời từ nguồn khác hay không?"


def generate_smoothed_answer(question: str) -> str:
    smoothed_question = smoothing_model.smoothing_question(question)
    is_vietnamese_history_question = fasttext_classifier.predict(smoothed_question)

    if is_vietnamese_history_question:
        contexts = faiss_retriever.find_nearest(smoothed_question)

        if len(contexts) > 0:
            print(contexts)
            answer = vit5_generator.generate(question, contexts[0]["context"])
            answer = answer.replace("ĐÁP: ", "")
            return answer, smoothing_model.smoothing_answer(answer)

    return default_answer, default_answer


def generate_answer(question: str) -> str:
    is_vietnamese_history_question = fasttext_classifier.predict(question)

    if is_vietnamese_history_question:
        contexts = faiss_retriever.find_nearest(question)

        if len(contexts) > 0:
            print(contexts)
            answer = vit5_generator.generate(question, contexts[0]["context"])
            answer = answer.replace("ĐÁP: ", "")
            return answer, answer

    return default_answer, default_answer
