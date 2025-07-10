FROM python:3.11-alpine
WORKDIR /app
COPY requirements.txt .
RUN apk add --no-cache build-base && \
    pip install --no-cache-dir --default-timeout=100000 -r requirements.txt
COPY src/ .
EXPOSE 8000
CMD  ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]