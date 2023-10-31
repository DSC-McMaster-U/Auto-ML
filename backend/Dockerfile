# Use the official Python 3.11 image from Docker Hub
FROM python:3.11.6-slim

# Set the working directory in the container
WORKDIR /app

# Install poetry for dependency management
RUN pip install poetry

# Copy the pyproject.toml and poetry.lock files into the container
COPY pyproject.toml poetry.lock ./

# Install the dependencies
RUN poetry config virtualenvs.create false && poetry install --no-dev

# Copy the FastAPI application into the container
COPY main.py ./

# Specify the command to run the FastAPI application using uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
