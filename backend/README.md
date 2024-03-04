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

- `pyproject.toml` file will not be automatically updated when you modify your `.py` files.
- The `pyproject.toml` file is a configuration file that specifies the dependencies and other settings for your Python project. It doesn't automatically track the imports or other changes in your Python files.
- If you add a new import to your Python files that requires a package not currently listed in your `pyproject.toml` file, you need to manually add that package to the `[tool.poetry.dependencies]` section of your `pyproject.toml` file.
- This can be done by running `poetry add package-name` which will add the package to the `[tool.poetry.dependencies]` section and update the `poetry.lock` file to include the new package and its dependencies.
- Now, run `poetry lock` and then `poetry install` to install the new package and its dependencies.
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

### Running Tests with Pytest

Using Pytest for testing the backend, follow these steps to run the tests:

- Ensure you have Poetry installed and the backend dependencies are installed using `poetry install`.
- To run the tests, execute:
  `poetry run pytest tests/api_test.py`
  This command will run the tests located in `tests/api_test.py` using the Pytest framework.

### Jenkins Pipeline Integration

Jenkins is for continuous integration and automation. The `Jenkinsfile` in the repository outlines the necessary steps for the pipeline.

#### Jenkins Setup

Before you can run the Jenkins pipeline, you need to set up Jenkins on your system. Follow these steps based on your operating system:

**For macOS:**

1. Install Jenkins using Homebrew:
    ```
    brew install jenkins-lts
    ```
2. Start Jenkins:
    ```
    brew services start jenkins-lts
    ```
3. Access Jenkins by navigating to `http://localhost:8080` in your browser.

**For Windows:**

1. Download the Jenkins installer from the [Jenkins website](https://www.jenkins.io/download/).
2. Run the installer and follow the on-screen instructions.
3. Once installed, start Jenkins and access it via `http://localhost:8080`.

**For Linux (using curl):**

1. Add the Jenkins repository and key:
    ```
    curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee \
    /usr/share/keyrings/jenkins-keyring.asc > /dev/null
    ```
2. Add the Jenkins source list:
    ```
    echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
    https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
    /etc/apt/sources.list.d/jenkins.list > /dev/null
    ```
3. Update your local package index, then install Jenkins:
    ```
    sudo apt-get update
    sudo apt-get install jenkins
    ```
4. Start Jenkins:
    ```
    sudo systemctl start jenkins
    ```
5. Access Jenkins at `http://localhost:8080`.

#### Running the Jenkins Pipeline

Once Jenkins is set up:

1. Open Jenkins in your web browser.
2. Create a new job and select "Pipeline" as the project type.
3. In the pipeline configuration, specify the path to your `Jenkinsfile`.
4. Run the pipeline. It will execute the steps defined in the `Jenkinsfile`:
   - **Checkout**: Clones the repository.
   - **Set Up Backend Environment**: Installs dependencies using Poetry.
   - **Start FastAPI Server**: Launches the FastAPI application.
   - **Run Tests**: Executes tests using Pytest.
   - **Post-Execution**: Cleans up resources and stops the server.

#### Additional Resources

For more detailed information on Jenkins and its setup, refer to the [official Jenkins documentation](https://www.jenkins.io/doc/).