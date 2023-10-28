# Vertex AI

## Benefits of Vertex AI
- Faster training speeds with the cloud
- Ability to host a model for online predictions
- Security & Privacy
- Ability to Scale (serving pipeline)
- Model monitoring
- Enables multiple tools such as distributed training, hyperparameter tuning ect...

## Intall the Vertex AI SDK for Python
1. Create python environment

   This is considered best practice as it helps prevent dependency, version, and premission conflicts
   
2. Install the Vertex AI SDK package:

   pip install google-cloud-aiplatform
   
3. Initialize the Vertex AI SDK

   Initialize the SDK with your Vertex AI and Google Cloud details
   
4. Import Vertex AI
   from google.cloud import aiplatform
_Tutorial:_
https://cloud.google.com/vertex-ai/docs/start/install-sdk



## Vertex AI Compatability With Google Cloud Run

Vertex AI can be deployed in just one container to Google Cloud Run. The following link provides a tutorial on how to use Vertex AI custom training with pre-build Google Cloud Pipeline Components.

**The Tutorial covers:**
- Setting up Google Cloud Project
- Creating a Cloud Storage Bucket
- Initializing Vertex AI SDK for Python
- Creating a custom component for training the custom model
- Converting the component to a Vertex AI custom job
- Defining the pipeline for the custom training job

_Tutorial:_
https://github.com/GoogleCloudPlatform/vertex-ai-samples/blob/main/notebooks/official/pipelines/custom_model_training_and_batch_prediction.ipynb

# Training Custom Models on Vertex AI

## Create a workbench
 _Need to decide if we want to work with a seperate notebook or in the repository_

This is the best option if we are using a jupyter/google collab notebook. Notebooks can be saved and easily dragged into workbench

_Creating Workbench Video Tutorial:_
https://www.youtube.com/watch?v=_Q1Nf-rgSiE&ab_channel=GoogleCloudTech

## Storing Data in the Cloud for Model Training
**Bucket**

Cloud storage has the concept of a bucket which is what holds your data in a container. Within a bucket you can create folders to hold your data (train,test,val). 

- Download dataset off internet like a local environment(kaggle,tfds, ect)
- Create buckets and upload folders in Google Cloud UI _or_ upload files programmatically with the gsutil tool

   e.g !gsutil -m cp -r {data_dir} gs://prototype-to-production-bucket
   
- Each file in cloud storage has a path "gs://bucket-name/path/to/file"


## Selecting Container type
Running a custom training job on Vertex AI is done with containers. Containers are packages of your application code together with dependencies such as specific versions of programming language runtimes and libraries required to run your software services. You can either specify the URI of a prebuilt container image that meets your needs, or create and upload a custom container image. These containers are created with Docker.

**Prebuilt container vs Custom Conatiner**
![image](https://github.com/evan-placenis/Auto-ML/assets/112578037/9736ab3c-34f7-4ed5-b7e0-f0f34704bd17)

## Running a custom training job

- **Create python file containing AI models**

- **Read data from Cloud Storage**
   - data_dir = "/gsc/bucket/folder"
   - data_dir = pathlib.Path(data_dir)
   - Cloud Storage Fuse (gcs):
      - Using this tool, training jobs on vertex AI can access cloud storage as files on the local file system. This               provides high throughput for large file sequential reads.
   
- **Write model to Cloud Storage** (so it can be run on a different device)
   - model.save("/gsc/bucket/modelname")

- **Containerize code with docker** (in terminal)
   - mkdir name
   - mkdir name/trainer
   - mv pyfile.py name/trainer
   - cd name
   - touch Dockerfile (different on mac and windows)

   These commands make this:
  
   ![image](https://github.com/evan-placenis/Auto-ML/assets/112578037/c00daac8-60a5-490f-a74f-d6df9b2f94ec)

   In Docker file:

   ![image](https://github.com/evan-placenis/Auto-ML/assets/112578037/3888f95f-84ed-4f35-a31d-6e9e8249b406)
   This executes the "task.py" file when we run the training job

- **Push to artifact registry** (place for storing containers in google cloud)
   - docker build ./ -t $CONTAINER_URI
   - docker push $CONTAINER_URI
 
- **Launch training Job**
  - launch through google cloud UI
 
_Video Tutorial_: https://www.youtube.com/watch?v=VRQXIiNLdAk&t=202s&ab_channel=GoogleCloudTech

## Getting Predictions from Model
Put model into the Vertex AI Model Registry. This is a repository where we can manage the lifecycle of the ML models. This can done by using the google cloud UI (shown in video) or through SDK with code.

**Batch Predictions**
- Asynchronous
- Don't require immediate response
- For accumulated batches of data
![image](https://github.com/evan-placenis/Auto-ML/assets/112578037/6bc73e92-ca21-4441-a4a9-e68d9e1f1e0a)

**Online Predictions**
- Synchronous
- Low latency
- For small batches of data
![image](https://github.com/evan-placenis/Auto-ML/assets/112578037/f2c7b836-7fa0-452b-8c14-fa12bb573aae)

Online predictions need an additional step of deploying the model to an endpoint. This associates the saved model artifacts with physical resources for low latency serving. (Deploying to endpoint shown in video)

**Calling Model**
Once the model is deployed, we can call it like any other REST endpoint. We can call it from a cloud function, web app, ect.

   Sending Request:
      Request is received by an http server. This server extracts the prediction request. The data passed must be a list of value or members of a JSON Object (preprocessed already).

Sending the request needs:
   -Project Number (different than project ID)
   -Endpoint ID

_Video Tutorial:_ https://www.youtube.com/watch?v=-9fU1xwBQYU&t=3s&ab_channel=GoogleCloudTech
