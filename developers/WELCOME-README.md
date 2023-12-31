# Auto-ML
<!-- TODO: add in list of top/active contributors -->

<!-- TODO: add in repo badges once project starts-->
<!-- TODO: move some of the content to a specialized doc for developers, turn this doc into a 'how to use the service' type doc -->
## About the Project
<!-- TODO: insert screenshot of application page-->
Automation has been making its way into all industries and services, including machine learning! Automating the training and development of models makes machine learning more accessible to user's with little to no background in ML. It takes the user's task, uses a training dataset to fit and tune models to the desired model metrics, and returns a functioning classification model to the user. Google Cloud provides an [AutoML](https://cloud.google.com/vertex-ai/docs/beginner/beginners-guide) service (which we will be taking major inspiration from), and they define it as below:

> "AutoML enables developers with limited machine learning expertise to train high-quality models specific to their business needs. Build your own custom machine learning model in minutes."

That sounds really hard to develop tho! Do not fear... for python libraries exist to make everything easier on us. This project does not require you to have background in ML, however, be prepared to gain some! We will also be working on a good amount of front-end/back-end development to push out user interface in the form of a web application. We will start off developing a minimum viable product using python libraries, like streamlit, pandas, and pycaret to do all the heavy lifting for us, and then iteratively build upon the project adding more custom features and tools to the tech stack. Python will just be our starting point; however, we will expand out into other languages/tools depending on our projects direction and our team member's interest/skills. 

## Projected Roadmap
| Sprint Number   | Goals |
|-----------------|---------|
|1| Minimum Viable Product: Streamlit powered data app |
|2-4 | Improve user interface by swapping out streamlit for JavaScript/HTML/CSS/Flask or other more powerful web dev tools
|2-4|Integrate Google Cloud's Vertex AI AutoML service to provide more accurate models |
|5 and beyond | More features that we'll come up with as a team! 

On a week-by-week basis, we will be tackling this broad roadmap through a list of specific tasks/features each contributor will take on. See the [open issues](https://github.com/DSC-McMaster-U/Auto-ML/issues) for a full list of proposed features and issues. 

### Agile Development
To give us all a taste of :star2: real :star2: software engineering, we will be mimicking an agile development environment with this project, having weekly(ish) sprints to push out small features. Features will show up as issues and will each get assigned to an individual at our weekly scrum. Since we are mimicking a professional dev team, we want to follow python (or other languages) style conventions defined [here](https://peps.python.org/pep-0008/), and we'll be using pylint (a static code analysis library for python) to ensure the code meets best practices. We also want to implement unit testing, so each time you want to submit a feature PR, we will require you to implement testing (try to maximize coverage using python's coverage library). We will not require unit testing of PRs where it would be unhelpful/redundant. 

## Project Challenges 
Below is a list of challenges that we'll try to address over the course of our project, after developing our MVP. Some of them reflect industry level challenges involving ML services. They may show up as features/issues throughout our project, depending on what stage we're at.  
- Distinguish our service from Google Cloud's AutoML
    - make the UI so user-friendly that little to no background in ML is needed to produce a model using our service
- Maintain user's data privacy 
    - if cloud training is used, how is the model and the data it was trained on protected on it's journey from cloud to customer
    - secure storage of user's inputted training dataset
- Address common AutoML challenges such as the tendency to overfit when optimizing accuracy through models
- Build our own automated model training service using PyTorch, i.e. implement the service from scratch - this will require members to have knowledge in ML and familiarity with PyTorch
- Incorporate Federated Learning: this is related to maintaining user privacy with cloud training. Federated learning has been a hot topic in ML so it'd be great for us as devs to get our hands on it. Check out [this](https://federated.withgoogle.com/) comic made by google to learn a bit more about the benefits of federated learning. Read [this](https://blog.research.google/2017/04/federated-learning-collaborative.html?m=1) google blog post to learn more if you're interested

## What you'll need to contribute:

### Github
Hopefully you're already accustomed to working with git, as it we will be hosting our project right in this repo. You should know how to clone a repo, commit changes, push and pull to the remote repository. You should also familiarize yourself with making pull requests, as that will be how you contribute to this project! If you've never made a PR, please complete [this](https://github.com/firstcontributions/first-contributions) tutorial and adopt the practice of making a branch to commit to any time you want to make a PR. More details on how we'll be organizing our project will come soon!

### Other Dependencies
We'll start off with a fully python project, so if you don’t already have python installed on your machine, download [here](https://www.python.org/downloads/) and set up a development environment - VS code is recommended but use what ever you like!

To install the python libraries we'll be using for our MVP, run the below command in the directory containing this repo on your machine:

```sh
# Can be py or python3 depending on your system
python -m pip install -r requirements.txt 
```

You're free to add to the requirements.txt file if you run into any new libraries you want to add to the project. You're also free to change the version number if you run into conflicts involving the libraries, as some of them may be dated/deprecated. To add to the requirements.txt file, on a new line in the file, simply add the install name of the project followed by '==' followed by the version number, like:

 `pycaret==3.0.4` 

## Resources for MVP

### Streamlit data app

https://www.youtube.com/watch?v=ApxEBGbqTyQ&ab_channel=DataProfessor

https://www.youtube.com/watch?v=xTKoyfCQiiU&t=1196s&ab_channel=NicholasRenotte




