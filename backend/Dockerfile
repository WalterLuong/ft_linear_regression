FROM python:3.7

RUN apt-get update

RUN mkdir /usr/src/api/

WORKDIR /usr/src/api/

COPY ./ ./

EXPOSE $PORT

RUN pip install -r requirements.txt

CMD ["python", "./app.py"]