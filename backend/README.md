## Poetry + FastAPI

A simple guide on how to start on poetry, a simple **package manager** like npm but for python.

ref : 
- [official docs](https://python-poetry.org/docs/)
- [medium article](https://medium.com/@caetanoog/start-your-first-fastapi-server-with-poetry-in-10-minutes-fef90e9604d9)

### Setup

Make sure you `cd` into the parent backend folder when running the api. 

-----------------------------------------

To start with Poetry on mac, run:

`brew install poetry`

(or) Linux, macOS, Windows (WSL) :

`curl -sSL https://install.python-poetry.org | python3 -`

This will set up poetry. check installation using `poetry --version`

------------------------------------------

To install dependencies, run:

`poetry install`

- The install command reads the `pyproject.toml` file from the current project, resolves the dependencies, and installs them.
- If there is a `poetry.lock` file in the current directory, it will use the exact versions from there instead of resolving them. 
- This ensures that everyone using the library will get the same versions of the dependencies.

------------------------------------------


To start the FastAPI server locally (using virtual env), run:

`poetry shell`

and then run:

`uvicorn main:app --reload`

- Your local host on port `8000` should now be running the api : http://127.0.0.1:8000/

### Frontend: basic request to API

ref : 
- guide : https://vercel.com/templates/next.js/nextjs-fastapi-starter
- repo : https://github.com/digitros/nextjs-fastapi

 > Make sure both the frontend and backend setups are up and running

- next.js frontend running on http://localhost:3000/  
- fastAPI server runs on http://127.0.0.1:8000/ 
- front end api requests made from http://localhost:3000/api/python
