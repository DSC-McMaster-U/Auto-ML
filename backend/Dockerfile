# argument to be passed while running the docker build command
ARG CREDENTIALS_JSON

# Use the official Python 3.11 image from Docker Hub
FROM python:3.11.6-slim

# Set the working directory in the container
WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y gcc musl-dev python3-dev

# Install and cleanup
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && pip install poetry \
    && apt-get purge -y --auto-remove build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy the pyproject.toml and poetry.lock files into the container
COPY pyproject.toml poetry.lock ./

# Install the dependencies
RUN poetry config virtualenvs.create false && poetry install --no-dev

# Copy the creds file and compute dir into the container
COPY compute ./compute
COPY  ${CREDENTIALS_JSON} ./

# Copy the FastAPI application into the container
COPY big_query.py ./
COPY main.py ./

# Specify the command to run the FastAPI application using uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
