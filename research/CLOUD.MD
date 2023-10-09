# Cloud Architecture
Overview and architecture plan for our application top to bottom.


## Front-end
Description of utilized cloud services for hosting our application, as well as the tools utilized for developement.

### I. Cloud  Services


 **Google App Engine (GAE)**: Google Cloud offers a Platform as a Service (PaaS) called "Google App Engine" (GAE). This fully managed platform allows us to deploy, monitor, and scale applications without the overhead of infrastructure management. With GAE, we can seamlessly deploy our Next.js and React-based frontend, benefitting from automatic scaling based on our traffic needs. Integration with other Google Cloud services is also simplified, providing a cohesive environment for potential future enhancements.

**Considerations:**
  While *Firebase* offers a comprehensive set of tools for web development, including hosting, database, and authentication, we have chosen not to pursue it at this time. Our primary requirement is a reliable hosting solution for serving JavaScript, handling domain names, and ensuring SSL security. Given our anticipated light website traffic and the simplicity of our hosting needs, GAE stands out as an efficient, cost-effective choice.

### II. Development:
GAE offers support for JavaScript thus we will leverage the following JavaScript frameworks and libraries to develop our front-end app code.

- **React**: A simple and powerful JavaScript library that should allow us to build out UI.
- **Next.js**: a React framework that offers server-side rendering and static site generation, improving  performance.
  

## Back-end
### Middleware
### Compute
### Storage


# Cloud Integration for Improved Model Training

## I. Introduction

**Background:**
This research focuses on integrating Google Cloud, specifically Vertex AI, into our system to enhance model quality, reduce wait times, and ensure transparency in decision-making.

## II. Research Question

**Question:**
How can we seamlessly integrate Google Cloud's Vertex AI into our system, and what tools are necessary for successful implementation?

## III. Relevance to the Project

**Objectives:**
1. **Enhance Model Quality:** Use Vertex AI and AutoML for superior model outcomes.
2. **Reduce Wait Times:** Utilize Google Cloud's GPU resources for faster model training.
3. **Transparency and Trust:** Integrate Explainable AI tools to provide insights into model decisions.

## IV. Additional Resources

1. **Cloud Documentation:**
   Explore Google Cloud's official documentation for comprehensive guides and best practices. Example: [Google Cloud Documentation](https://cloud.google.com/docs)

2. **Open Source Projects:**
   Analyze successful integrations on GitHub. For instance:
   - **TensorFlow Extended (TFX):** Leverages BigQuery, Dataflow, and Cloud ML Engine. [GitHub Repository](https://github.com/tensorflow/tfx)
   - **Kubeflow:** Integrates with Kubernetes Engine and AI Platform. [GitHub Repository](https://github.com/kubeflow/kubeflow)
   - **Apache Beam:** Uses Dataflow for seamless execution. [GitHub Repository](https://github.com/apache/beam)
   - **Spinnaker:** Utilizes Container Registry and Kubernetes Engine. [GitHub Repository](https://github.com/spinnaker/spinnaker)
   - **Apache Flink:** Integrates with Bigtable and Cloud Storage. [GitHub Repository](https://github.com/apache/flink)
   - **Deeplearning4j:** Integrates with TensorFlow and AI Platform. [GitHub Repository](https://github.com/eclipse/deeplearning4j)

3. **Community Forums:**
   Engage in discussions on Stack Overflow and Google Cloud Community for practical insights. Example: [Stack Overflow Thread](https://stackoverflow.com/questions/tagged/google-cloud-platform)

4. **Google Cloud Labs:**
   Participate in Google Cloud Labs for hands-on experience. Example: [Google Cloud Labs](https://cloud.google.com/training)
