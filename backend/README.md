# Poetry + FastAPI Backend Setup

- Poetry is a tool for dependency management and packaging in Python. It allows you to declare the libraries your project depends on and it will manage (install/update) them for you. 
- It's similar to npm in the JavaScript world
- FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints.

References: 
- https://python-poetry.org/docs/
- [Medium Article](https://medium.com/@caetanoog/start-your-first-fastapi-server-with-poetry-in-10-minutes-fef90e9604d9)

### Local Setup

Poetry installation:

- `cd` into the `/backend` folder
- To start with Poetry on mac, run: `brew install poetry`

- For Linux, macOS, Windows (WSL), run:  
`curl -sSL https://install.python-poetry.org | python3 -`

This will set up poetry. check installation using `poetry --version`

<details>
<summary><strong>Note (click to open)</strong></summary>
<br>

(Read **only** if you have added a new import to `main.py` that requires a package not currently listed in `pyproject.toml` file)
﻿
- `pyproject.toml` file will not be automatically updated when you modify your `.py` files. 
- The `pyproject.toml` file is a configuration file that specifies the dependencies and other settings for your Python project. It doesn't automatically track the imports or other changes in your Python files.
- If you add a new import to your Python files that requires a package not currently listed in your `pyproject.toml` file, you need to manually add that package to the `[tool.poetry.dependencies]` section of your `pyproject.toml` file.
- This can be done by running `poetry add package-name` which will add the package to the  `[tool.poetry.dependencies]` section and update the `poetry.lock` file to include the new package and its dependencies.
- No need to run `poetry lock` or `poetry install` after this because `poetry add` already does the equivalent of both commands.

So, when u add a new dependancy to the code u do `poetry add package-name` 
when u just wanna run u do `poetry install`
</details>

Next, to install the dependencies, run: `poetry install`

- This command reads the `pyproject.toml` file from the current project, resolves the dependencies, and installs them.
- If there is a `poetry.lock` file in the current directory, it will use the exact versions from there instead of resolving them. 
- This ensures that everyone using the library will get the same versions of the dependencies.

Lastly, to start the FastAPI server locally (using virtual env), run:
`poetry shell`
and then run:`uvicorn main:app --reload`

- Your local host on port `8000` should now be running the api : http://127.0.0.1:8000/

### Frontend: basic request to API

(Only required for local setup)  
Make sure both the frontend and backend setups are up and running

- Next.js frontend running on http://localhost:3000/  
- FastAPI server runs on http://127.0.0.1:8000/ 
- See if http://localhost:3000/api/python prints hello message from backend (which confirms that the frontend is able to make a request to the backend)

References:
- Guide : https://vercel.com/templates/next.js/nextjs-fastapi-starter
- Corresponding Repo : https://github.com/digitros/nextjs-fastapi

### Docker Setup

If you don't want to run locally, you can run the backend using docker.

- `cd` into backend parent folder
- Run: `docker build . -t automate-be`
- This builds a local docker image of the automate backend tagged "automate-be"
- run: `docker run -d -p 8000:8000 automate-be`
- This runs the container in detached mode, on port 8000 (default port)