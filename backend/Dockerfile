# Stage 1: Install dependencies and build the app
FROM python:3.11.8-slim AS builder

# Set the working directory in the container
WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y gcc g++ musl-dev python3-dev

# Install and cleanup
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && pip install poetry \
    && apt-get purge -y --auto-remove build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy the pyproject.toml & poetry.lock files into the container (app dir)
COPY ./pyproject.toml ./poetry.lock* ./

# Create the requirements.txt file from the pyproject.toml file
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

# Install the Python packages
RUN pip install --no-cache-dir --upgrade -r ./requirements.txt

# Stage 2: Run the app
FROM python:3.11.8-slim AS runner

# argument to be passed while running the docker build command
ARG CREDENTIALS_JSON

WORKDIR /app

# Copy the installed Python packages from the builder stage
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages

RUN pip uninstall -y uvicorn
RUN pip install uvicorn[standard]==0.23.2

# Copy the required files & dir into the container
COPY compute ./compute
COPY big_query.py ./
COPY ${CREDENTIALS_JSON} ./

# create dir for the HTML files created during profiling
RUN mkdir tempHTML

# Copy the FastAPI application into the container
COPY main.py ./

# Specify the command to run the FastAPI application using uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]