# Use the official Python 3.11 image from Docker Hub
FROM python:3.11.6-slim

# Set the working directory in the container
WORKDIR /app

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

# Copy the FastAPI application into the container
COPY . .

# Specify the command to run the FastAPI application using uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
