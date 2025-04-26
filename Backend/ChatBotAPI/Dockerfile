# Sử dụng phiên bản Python 3.12 slim làm hình nền
FROM python:3.12-slim

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép tệp yêu cầu và cài đặt các thư viện phụ thuộc
COPY requirements.txt .

# Cài đặt các phụ thuộc
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]