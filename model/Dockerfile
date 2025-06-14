
FROM python:3.12

RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    python3-distutils \
    gcc \
    cmake \
    git \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgl1-mesa-glx \
    && apt-get clean

RUN pip install --upgrade pip setuptools wheel

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
