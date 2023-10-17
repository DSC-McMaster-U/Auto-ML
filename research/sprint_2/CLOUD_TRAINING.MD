# Cloud Accelerated ML Training

## Benefits of GPU Training for ML

For heavy computations that can be preformed independant of each other (like matrix multiplication), parallelism can provide significant speed-up. Graphics Processing Units (GPUs) contain thousands of Arithmetic Logic Units (ALUs) to execute additions and multiplications in parallel. In regards to ML, training a neural network requires looped matrix addition and miltiplication, so GPUs can significantly improve our execution time. For our application, GPU training may only be useful for heavier models like the NNs, and image models, but may not be as relevant for 'simpler' models, like decision trees, that require less compute resources. 

### Side Note on TPUs
Tensor Processing Units are even more specialized for matrix arithmetic (more ALUs!!). They may be a bit too much for our applications since we'll be generating vanilla models that don't require hours to train, but they might be interesting to look into later on.  [1].

## Steps to Setting up GPU Training w/o Vertex AI

1. **Create a Virtual Machine (VM) instance** to be hosted on Google's infrastructure through the cloud console, cloud CLI, or the Compute Engine API. Different machine types (Accelerator Optimized Series and N1 General Purpose Series) support GPUs differently 
2. **Add GPUs to the VM instance**. The VM gets direct control over the GPUs and their associated memory. [2],[3].

- [GPU type availability based on zone](https://cloud.google.com/compute/docs/gpus/gpu-regions-zones)

### Question is how do we configure it to run the training after step 2.


# Vertex AI Custom Training 
We could opt to use Vertex AI's custom training to cut out the potential work needed to setup the training on the GPUs. The diagram below outlines the Vertex AI Workflow:
![alt text](https://cloud.google.com/static/vertex-ai/docs/training/images/custom-training-workflow.svg)

## Containerizing with Vertex AI 
- we have the option to use a prebuilt docker container that supports the ML Framework that we will move forward with (PyTorch or Tensorflow or both in seperate prebuilt containers)
- a custom docker container will take us longer to setup, however if we want to integrate both Tensorflow and PyTorch we might be able to use a single container [4]
### Another question: Kubernetes vs Docker? (take a look at [kubeflow](https://github.com/kubeflow/kubeflow) MLOps)

## Demos & Notebooks 
- [PyTorch on Google Cloud: How To train and tune PyTorch models on Vertex AI](https://cloud.google.com/blog/topics/developers-practitioners/pytorch-google-cloud-how-train-and-tune-pytorch-models-vertex-ai)
- [Orchestrating PyTorch ML Workflows on Vertex AI Pipelines](https://cloud.google.com/blog/topics/developers-practitioners/orchestrating-pytorch-ml-workflows-vertex-ai-pipelines)
- [Scalable ML Workflows using PyTorch on Kubeflow Pipelines and Vertex Pipelines](https://cloud.google.com/blog/topics/developers-practitioners/scalable-ml-workflows-using-pytorch-kubeflow-pipelines-and-vertex-pipelines)
## References 

[1] [Intro to GPUs/TPUs](https://cloud.google.com/tpu/docs/intro-to-tpu
)

[2] [GPU Platform](https://cloud.google.com/compute/docs/gpus)

[3] [Compute Engine Instances](https://cloud.google.com/compute/docs/instances)

[4] [Custom Training on Vertex AI](https://cloud.google.com/vertex-ai/docs/training/overview)

