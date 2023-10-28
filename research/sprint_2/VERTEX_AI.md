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

- Create buckets and upload folders in Google Cloud UI _or_ upload files programmatically with the gsutil tool
   e.g !gsutil -m cp -r {data_dir} gs://prototype-to-production-bucket
   
- Each file in cloud storage has a path "gs://bucket-name/path/to/file"
- Download dataset off internet like a local environment(kaggle,tfds, ect)

## Selecting Container type
Running a custom training job on Vertex AI is done with containers. Containers are packages of your application code together with dependencies such as specific versions of programming language runtimes and libraries required to run your software services. You can either specify the URI of a prebuilt container image that meets your needs, or create and upload a custom container image. These containers are created with Docker.

**Prebuilt container vs Custom Conatiner**
![image](https://github.com/evan-placenis/Auto-ML/assets/112578037/9736ab3c-34f7-4ed5-b7e0-f0f34704bd17)

**Running a custom training job**

- Create python file containing AI models

- Read data from Cloud Storage
   - data_dir = "/gsc/bucket/folder"
   - data_dir = pathlib.Path(data_dir)
   
- Write model to Cloud Storage (so it can be run on a different device)
   -model.save("/gsc/bucket/modelname")

- Containerize code with docker (in terminal)
   - mkdir name
   - mkdir name/trainer
   - mv pyfile.py name/trainer
   - cd name
   - touch Dockerfile (different on mac and windows)

   These commands make this:
   ![image](https://github.com/evan-placenis/Auto-ML/assets/112578037/c00daac8-60a5-490f-a74f-d6df9b2f94ec)

- Launch training **Job**

Cloud Storage Fuse:
Using this tool, training jobs on vertex AI can access cloud storage as files on the local file system. This provides high throughput for large file sequential reads.
