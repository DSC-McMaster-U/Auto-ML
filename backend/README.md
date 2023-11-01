A simple guide on how to start on poetry, a simple package manager like npm but for python.

Make sure you cd into the parent backend folder when running the api. 

-------------------------------------------------------------------------------------------

To start with Poetry on mac, run:

brew install poetry

This will set up poetry.

-------------------------------------------------------------------------------------------

To install dependencies, run:

poetry install

-------------------------------------------------------------------------------------------


To start the api locally, run:

poetry shell 

AND THEN: 

uvicorn main:app --reload


Your local host on port 8000 should now be running the api

-------------------------------------------------------------------------------------------

docker

cd backend

docker build -t backend . 

docker run -p 8000:8000 backend

Google Kubernetes Engine?
