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


## Selecting Container type
Vertex AI runs your training application in a Docker container image. A Docker container image is a self-contained software package that includes code and all dependencies, which can run in almost any computing environment. You can either specify the URI of a prebuilt container image to use, or create and upload a custom container image.

**Prebuilt container vs Custom Conatiner**
![image](https://github.com/evan-placenis/Auto-ML/assets/112578037/9736ab3c-34f7-4ed5-b7e0-f0f34704bd17)

