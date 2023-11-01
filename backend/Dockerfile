FROM python:3.10 as python-base
RUN mkdir backend
WORKDIR  /backend
COPY /pyproject.toml /backend
RUN pip3 install poetry
RUN poetry config virtualenvs.create false
RUN poetry install 
COPY . .
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "main:app", "--bind", "0.0.0.0:8000"]
