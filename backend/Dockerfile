# Python 3.11 slim — lightweight base image
FROM python:3.11-slim

# Container ke andar /app folder mein kaam karo
WORKDIR /app

# Pehle requirements copy karo aur install karo
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Ab apna code copy karo
COPY main.py .

# Port 8000 expose karo — FastAPI yahan chalega
EXPOSE 8000

# Container start hote hi ye command chale
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
