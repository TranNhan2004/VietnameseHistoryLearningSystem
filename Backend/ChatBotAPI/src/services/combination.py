import os
from typing import Tuple

from dotenv import load_dotenv
from underthesea import word_tokenize

from src.services.answer_generator.generator import AnswerGenerator
from src.services.answer_generator.smoothing import SmoothingModel
from src.services.embedding import EmbeddingModel
from src.services.filter_contexts import FilterContexts
from src.services.inner_context_retriever.retriever import FAISSRetriever
from src.services.outer_context_retriever.retriever import PDFRetriever
from src.services.outer_context_retriever.summarization import SummarizingModel
from src.services.preprocessing import Preprocessor
from src.services.question_classifier.classifier import FastTextClassifier
from src.services.text_ranking import TextRankingModel

load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GOOGLEAI_API_KEY = os.getenv("GOOGLEAI_API_KEY")
PRODUCTION = int(os.getenv("PRODUCTION")) | 1


class GenerateService:
    def __init__(self) -> None:
        self.fasttext_classifier = FastTextClassifier(model_path="src/ai_models/fasttext/fasttext-dim=50-ngrams=2.ftz")

        self.embedding_model = EmbeddingModel("sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")
        self.text_ranking_model = TextRankingModel("cross-encoder/mmarco-mMiniLMv2-L12-H384-v1")
        self.faiss_retriever = FAISSRetriever(
            df_path="src/ai_models/faiss/QuestionAnswersFinalForFAISS.xlsx",
            embeddings_path="src/ai_models/faiss/question_embeddings.npy",
            faiss_index_path="src/ai_models/faiss/question_index.index",
            embedding_model=self.embedding_model
        )
        self.summarizing_model = SummarizingModel(GOOGLEAI_API_KEY)
        self.pdf_retriever = PDFRetriever(self.embedding_model)
        self.filter_contexts = FilterContexts(self.text_ranking_model, self.embedding_model)

        self.answer_generators = {
            "LOTUS-v1": AnswerGenerator(
                hf_token=HF_TOKEN,
                repo_id="trannhan2004/Llama-3.2-1B-Instruct-Frog-Vietnamese-History-GGUF",
                filename="models/llama-vietnamese-history.gguf",
                n_ctx=2048,
                n_threads=4,
                n_batch=512
            )
        }
        self.smoothing_model = SmoothingModel(OPENAI_API_KEY)
        self.default_answer = "Kiến thức của tôi không bao hàm câu hỏi của bạn, vui lòng đặt câu hỏi khác!"
        self.null_context = "NULL"

    def set_args(self, **kwargs):
        required_keys = (
            "icr_top_k",
            "ocr_top_k",
            "max_pdf_words",
            "fc_alpha",
            "fc_top_k",
            "fc_min_threshold",
            "ag_max_tokens",
            "ag_temperature",
            "ag_top_p",
            "ag_repeat_penalty"
        )
        for key in required_keys:
            if key not in kwargs:
                raise ValueError(f"Missing required config key: {key}")

        self.icr_top_k = kwargs["icr_top_k"]
        self.ocr_top_k = kwargs["ocr_top_k"]
        self.max_pdf_words = kwargs["max_pdf_words"]
        self.fc_alpha = kwargs["fc_alpha"]
        self.fc_top_k = kwargs["fc_top_k"]
        self.fc_min_threshold = kwargs["fc_min_threshold"]
        self.ag_max_tokens = kwargs["ag_max_tokens"]
        self.ag_temperature = kwargs["ag_temperature"]
        self.ag_top_p = kwargs["ag_top_p"]
        self.ag_repeat_penalty = kwargs["ag_repeat_penalty"]

    def generate(self, model: str, question: str) -> Tuple[str, str]:
        preprocessed_question = Preprocessor.remove_special_chars(question)
        is_vietnamese_history_question = self.fasttext_classifier.predict(preprocessed_question)

        if is_vietnamese_history_question:
            inner_contexts = self.faiss_retriever.retrieve(preprocessed_question, top_k=self.icr_top_k)
            contexts_str = self.filter_contexts.filter(
                preprocessed_question,
                inner_contexts,
                None,
                alpha=self.fc_alpha,
                top_k=self.fc_top_k,
                min_threshold=self.fc_min_threshold
            )

            if contexts_str:
                answer = self.answer_generators[model].generate(
                    question,
                    contexts_str,
                    self.ag_max_tokens,
                    self.ag_temperature,
                    self.ag_top_p,
                    self.ag_repeat_penalty
                )
                return self.smoothing_model.smoothing_answer_markdown(answer) if PRODUCTION \
                    else self.smoothing_model.smoothing_answer(answer), contexts_str

        return self.default_answer, self.null_context

    def generate_with_pdf(self, model: str, question: str, pdf_text: str) -> Tuple[str, str]:
        preprocessed_question = Preprocessor.remove_special_chars(question)
        preprocessed_pdf_text = Preprocessor.remove_special_chars(pdf_text)
        is_vietnamese_history_question = self.fasttext_classifier.predict(preprocessed_question)

        if len(word_tokenize(preprocessed_pdf_text)) > self.max_pdf_words:
            preprocessed_pdf_text = self.summarizing_model.summarize(preprocessed_pdf_text)

        if is_vietnamese_history_question:
            inner_contexts = self.faiss_retriever.retrieve(preprocessed_question, top_k=self.icr_top_k)
            outer_contexts = self.pdf_retriever.retrieve(preprocessed_pdf_text, preprocessed_question,
                                                         top_k=self.ocr_top_k)

            contexts_str = self.filter_contexts.filter(
                preprocessed_question,
                inner_contexts,
                outer_contexts,
                alpha=self.fc_alpha,
                top_k=self.fc_top_k,
                min_threshold=self.fc_min_threshold
            )

            if contexts_str:
                answer = self.answer_generators[model].generate(
                    question,
                    contexts_str,
                    self.ag_max_tokens,
                    self.ag_temperature,
                    self.ag_top_p,
                    self.ag_repeat_penalty
                )
                return self.smoothing_model.smoothing_answer_markdown(answer) if PRODUCTION \
                    else self.smoothing_model.smoothing_answer(answer), contexts_str

        return self.default_answer, self.null_context
