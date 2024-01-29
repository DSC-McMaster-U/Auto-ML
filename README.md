# AutoMate-ML

<!-- TODO: add in repo badges once project starts-->

![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white) ![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white) ![Terraform](https://img.shields.io/badge/terraform-%235835CC.svg?style=for-the-badge&logo=terraform&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white)

![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)

## The AutoMate Architecture
![image](developers/diagrams/excal_architechture.png)

## Contributors

| <div style="width:100px"> Contributor </div>                                                    | Most Used Frameworks/Tools                                                                                                                                                                                                                                                                                                   | Notable Contributions                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="developers/contributors/rawan.jpg" alt="drawing" width="100"/> <br/> **Rawan Mahdi** <br/> <i/> Project Manager & DevOps </i>   | ![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white) ![Terraform](https://img.shields.io/badge/terraform-%235835CC.svg?style=for-the-badge&logo=terraform&logoColor=white)|||
 <img src="developers/contributors/mohammed.jpg" alt="drawing" width="100"/> <br/> **Mohammed Abed** <br/> <i/> Full-stack Developer </i>| ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi) ![Terraform](https://img.shields.io/badge/terraform-%235835CC.svg?style=for-the-badge&logo=terraform&logoColor=white) |  <ul><li>[#168: Implemented Upload and Retrieval of Data from GCP Buckets](https://github.com/DSC-McMaster-U/Auto-ML/pull/168)</li><li>[#133: Wrote K8s Manifest for Backend](https://github.com/DSC-McMaster-U/Auto-ML/pull/133)</li><li>[#93: Frontend Root Layout Component](https://github.com/DSC-McMaster-U/Auto-ML/pull/93)</li></ul> |
| <img src="developers/contributors/raymond.jpeg" alt="drawing" width="100"/> <br/> **Raymond Tao** <br/> <i/> Backend Developer </i> |  |  
<img src="developers/contributors/nicole.jpeg" alt="drawing" width="100"/> <br/> **Nicole Sorokin** <br/> <i/> Frontend Developer  </i>   | ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)  |<ul><li>[#80: Developed Frontend for Data Upload Page](https://github.com/DSC-McMaster-U/Auto-ML/issues/80)</li><li>[#141: Refined and Enhanced Frontend Styling](https://github.com/DSC-McMaster-U/Auto-ML/issues/141)</li><li>[#152: Implemented Data Preprocessing for AutoML Module](https://github.com/DSC-McMaster-U/Auto-ML/issues/152)</li><ul>
 <img src="developers/contributors/austin.jpg" alt="drawing" width="100"/> <br/> **Austin Bennett** <br/> <i/> Cloud Architect & Backend Developer </i>   | ![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white) | <ul><li>[#55: Designed Containerized Application and Cloud Architecture](https://github.com/DSC-McMaster-U/Auto-ML/pull/55)</li><li>[#128: Wrote K8s Manifest for Frontend](https://github.com/DSC-McMaster-U/Auto-ML/pull/128)</li><li>[#132: Created Workflow to push K8s Manifest to GKE cluster](https://github.com/DSC-McMaster-U/Auto-ML/pull/132)</li><ul> |


## About the Project

<!-- TODO: insert screenshot of application page-->

Automation has been making its way into all industries and services, including machine learning! Automating the training and development of models makes machine learning more accessible to user's with little to no background in ML. It takes the user's task, uses a training dataset to fit and tune models to the desired model metrics, and returns a functioning classification model to the user. Google Cloud provides an [AutoML](https://cloud.google.com/vertex-ai/docs/beginner/beginners-guide) service (which we will be taking major inspiration from), and they define it as below:

> "AutoML enables developers with limited machine learning expertise to train high-quality models specific to their business needs. Build your own custom machine learning model in minutes."

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
