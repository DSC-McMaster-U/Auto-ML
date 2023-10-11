# Cloud Accelerated ML Training

## Benefits of GPU Training for ML

For heavy computations that can be preformed independant of each other (like matrix multiplication), parallelism can provide significant speed-up. Graphics Processing Units (GPUs) contain thousands of Arithmetic Logic Units (ALUs) to execute additions and multiplications in parallel. In regards to ML, training a neural network requires looped matrix addition and miltiplication, so GPUs can significantly improve our execution time. For our application, GPU training may only be useful for heavier models like the NNs, and image models, but may not be as relevant for 'simpler' models, like decision trees, that require less compute resources. 

### Side Note on TPUs
Tensor Processing Units are even more specialized for matrix arithmetic (more ALUs!!). They may be a bit too much for our applications since we'll be generating vanilla models that don't require hours to train, but they might be interesting to look into later on. 

## Steps to Setting up GPU Training

1. **Create a Virtual Machine (VM) instance** to be hosted on Google's infrastructure through the cloud console, cloud CLI, or the Compute Engine API. Different machine types (Accelerator Optimized Series and N1 General Purpose Series) support GPUs differently
2. **Add GPUs to the VM instance**. The VM gets direct control over the GPUs and their associated memory. 

- [GPU type availability based on zone](https://cloud.google.com/compute/docs/gpus/gpu-regions-zones)

3. ...



