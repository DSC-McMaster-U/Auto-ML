# Auto-ML

## About the Project
<!-- TODO: insert screenshot of application page-->
Automation has been making its way into all industries and services, including machine learning! 

AutoML makes machine learning more accessible to user's with little to no background in ML. It takes the user's task, categorizing cat and dog pictures for example, uses a training dataset to fit and tune models to the desired model metrics, and returns a functioning classification model to the user. 

That sounds really hard to develop tho! Do not fear... for python libraries exist to make everything easier on us. This project does not require you to have background in ML, however be prepared to gain some! We will start of developing a minimum viable product using python libraries to do all the heavy computations for us, and then iterativley build upon the project adding more custom features and tools to the tech stack. 
###


## Projected Roadmap
<input type="checkbox" disabled /> Minimum Viable Product: Streamlit powered data app

<input type="checkbox" disabled /> Improve user interface by swapping our streemlit for HTML, Flask, or other more powerful web dex tools

<input type="checkbox" disabled /> Integrate Google Cloud's Vertex AI AutoML service to provide more accurate models

<input type="checkbox" disabled /> ... more features! 

See the [open issues](https://github.com/DSC-McMaster-U/Auto-ML/issues) for a full list of proposed features (and known issues).

## Project Challenges 
- Distinguish our service from Google Cloud's AutoML
    - make the UI so friendly that little to know background in ML is needed to produce a model using our service
- Maintain user's data privacy 
    - if cloud training is used, how is the model and the data it was trained on  protected from cloud to customer
    - secure storage of user's inputted dataset
- Prevent common AutoML challenges such as the tendancy to overfit when optimizing accuracy through models

## What you'll need to contribute:

### Github
Hopefully you're already accustomed to working with git, as it we will be hosting our project on here. You should know how to clone a repo, commit changes, push and pull to the remote repository. You should also familiarize yourself with making pull requests! If you've never made a PR, please complete [this](https://github.com/firstcontributions/first-contributions) tutorial. 

### Other Dependancies
We'll start off with a fully python project, so if you dont already have python installed on your machine, follow [this]() tutorial. 
To install the python libraries we'll be using for our MVP, run the below command in the directory:

`pip install requirements.txt`

You're free to add to the requirements.txt file if you run into any new libraries you want to add to the project. On a new line in the file, simply add the install name of the project followed by '==' followed by the version number, like: `pycaret==3.0.4` 