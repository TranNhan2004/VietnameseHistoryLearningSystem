FROM python:3.11.9
WORKDIR /ChatBotAPI
COPY requirements.txt .
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    git \
    libffi-dev \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir --default-timeout=100000 -r requirements.txt
COPY src/ ./src
EXPOSE 8000
CMD  ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]