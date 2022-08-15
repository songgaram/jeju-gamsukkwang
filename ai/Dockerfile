FROM python:3.8.13-slim
WORKDIR /app

RUN apt-get update -y
RUN apt-get install -y gcc g++

COPY . /app
COPY requirements.txt .

RUN pip3 install --no-cache-dir -r requirements.txt
RUN chmod +x /app/app.py
EXPOSE 5003
CMD ["gunicorn", "--bind", "0.0.0.0:5003", "app:app"]