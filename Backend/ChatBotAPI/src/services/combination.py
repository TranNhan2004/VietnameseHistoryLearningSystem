import os
from typing import Dict

from dotenv import load_dotenv

from src.services.answer_generator import Generator, ViT5Generator
from src.services.contexts_retriever import FAISSRetriever, PDFRetriever
from src.services.embedding import EmbeddingModel
from src.services.filter_contexts import FilterContexts
from src.services.openai_api import SmoothingModel
from src.services.preprocess import Preprocess
from src.services.question_classifier import FastTextClassifier

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

smoothing_model = SmoothingModel(OPENAI_API_KEY)

# Question Classifier
fasttext_classifier = FastTextClassifier(model_path="src/ai_models/fasttext/fasttext-dim=50-ngrams=2.ftz")

# Context Retriever
embedding_model = EmbeddingModel("sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")
faiss_retriever = FAISSRetriever(
    df_path="src/ai_models/faiss/QuestionAnswersFinalForFAISS.xlsx",
    embeddings_path="src/ai_models/faiss/question_embeddings.npy",
    faiss_index_path="src/ai_models/faiss/question_index.index",
    embedding_model=embedding_model
)
pdf_retriever = PDFRetriever(embedding_model)
filter_contexts = FilterContexts(embedding_model)

# Answer Generator
vit5_generator = ViT5Generator(model_path="src/ai_models/vit5-base-ft")
default_answer = "Kiến thức của tôi không bao hàm câu hỏi của bạn, vui lòng đặt câu hỏi khác!"
generators: Dict[str, Generator] = {
    "ViT5": vit5_generator,
}


def generate_smoothed_answer(model: str, question: str) -> str:
    # smoothed_question = smoothing_model.smoothing_question(question)
    smoothed_question = Preprocess.remove_special_chars(question)
    is_vietnamese_history_question = fasttext_classifier.predict(smoothed_question)

    if is_vietnamese_history_question:
        inner_contexts = faiss_retriever.retrieve(smoothed_question)
        contexts_str = filter_contexts.filter(smoothed_question, inner_contexts, None)

        if contexts_str:
            print(contexts_str)
            answer = generators[model].generate(question, contexts_str)
            answer = answer.replace("ĐÁP: ", "")
            return smoothing_model.smoothing_answer(answer)

    return default_answer


def generate_smoothed_answer_with_pdf(model: str, question: str, pdf_text: str) -> str:
    # smoothed_question = smoothing_model.smoothing_question(question)
    smoothed_question = Preprocess.remove_special_chars(question)
    smoothed_pdf_text = Preprocess.remove_special_chars(pdf_text)
    is_vietnamese_history_question = fasttext_classifier.predict(smoothed_question)

    if is_vietnamese_history_question:
        inner_contexts = faiss_retriever.retrieve(smoothed_question)
        outer_contexts = pdf_retriever.retrieve(smoothed_pdf_text, smoothed_question)

        contexts_str = filter_contexts.filter(question, inner_contexts, outer_contexts)

        if contexts_str:
            print(contexts_str)
            answer = generators[model].generate(question, contexts_str)
            answer = answer.replace("ĐÁP: ", "")
            return smoothing_model.smoothing_answer(answer)

    return default_answer


def generate_answer(question: str) -> str:
    is_vietnamese_history_question = fasttext_classifier.predict(question)

    if is_vietnamese_history_question:
        contexts = faiss_retriever.find_nearest(question)

        if len(contexts) > 0:
            print(contexts)
            answer = vit5_generator.generate(question, contexts[0]["context"])
            answer = answer.replace("ĐÁP: ", "")
            return answer

    return default_answer
