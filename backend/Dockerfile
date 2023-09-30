FROM python:3.9.7-slim-buster

RUN apt-get update

RUN mkdir /usr/src/api/

WORKDIR /usr/src/api/

COPY ./ ./

EXPOSE $PORT

RUN pip install --no-cache -r requirements.txt

CMD ["python", "./app.py"]