variable "project" { default = "automateml" }
variable "region" { default = "us-east1" }
variable "zone" { default = "us-east1-a" }

provider "google" {
  project     = var.project
  region      = var.region
  credentials = file("${path.module}/credentials.json")
  zone        = var.zone
}

# Add GKE Service Account 
resource "google_service_account" "gke_tf_account" {
  account_id   = "gke-tf-service-account"
  display_name = "A Service Account For Terraform To Make GKE Cluster"
}

resource "google_container_cluster" "automl_cluster" {
  name     = "automl-cluster"
  location = var.region
  project  = var.project

  remove_default_node_pool = true
  initial_node_count       = 2
}

//single node "node pool" for frontend and backend pods
resource "google_container_node_pool" "febe_node_pool" {
  name       = "frontend-backend-node-pool"
  location   = var.region
  cluster    = google_container_cluster.gke_cluster.name
  node_count = 1

  node_config {
    service_account = google_service_account.gke_tf_account.email
    machine_type    = "e2-micro"
    disk_size_gb    = 30
    labels = {
      workload_type = "frontend-backend"
    }

    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring"
    ]
  }
}

//pool for machine learning (allows us to adjust the compute later if needed)
resource "google_container_node_pool" "ml_node_pool" {
  name       = "machine-learning-node-pool"
  location   = var.region
  cluster    = google_container_cluster.gke_cluster.name
  node_count = 1

  node_config {
    service_account = google_service_account.gke_tf_account.email
    machine_type    = "e2-micro"
    disk_size_gb    = 30
    labels = {
      workload_type = "machine-learning"
    }

    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring"
    ]
  }
}
