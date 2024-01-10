# Application Deployment Guide

## Local Deployment using Docker Compose

To deploy the application locally using Docker Compose, follow these steps:

1. Install Docker and Docker Compose on your local machine (If you have Docker Desktop installed on your machine, you already have Docker and Docker Compose installed and accessible via the command line interface.)

2. Navigate to the root directory of the application.
3. Open the terminal and run the following command to start the application:

   ```bash
   docker-compose up
   ```

4. The application will be deployed locally and accessible at `http://localhost:3000` which is the default port for the frontend application. The backend application will be accessible at `http://localhost:8000`.

## Cloud Deployment using Google Kubernetes Engine (GKE)

To deploy the application on the cloud using GKE, follow these steps:

1. Navigate to the root directory of the application.
2. Run the workflow/gh action `.yml` files in the following order:

   1. `manual-terraform.yml` which uses the terraform files from `/cloud-infra` dir to provision the infrastructure (gke cluster) on GCP.
   2. `docker.yml` which builds the frontend & backend Docker image for the application and pushes it to the artifact registry on gcp.
   3. `kubernetes.yml` which creates a kubernetes deployment and service for the application on GKE using the files in `/cloud-infra/k8s` dir.

3. The application will be deployed on GKE and accessible through the external IP provided by the Load Balancer service.

4. Go to [link](https://console.cloud.google.com/kubernetes/deployment/us-east1-b/automl-cluster/default/backend-deployment/overview?project=automateml&supportedpurview=project) and scroll down to view the external IP of the Load Balancer service.

>Please note that it will take some time for the application to be fully functional.
>If you see any errors, try refreshing the page after some time.

>[!NOTE]
> you might have to setup some gcloud configurations to get this to work.