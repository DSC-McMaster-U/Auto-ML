# Provider and Common Variables 
variable "project" {
  default = "automateml"
}
variable "region" {
  default = "us-east1"
}
variable "zone" {
  default = "us-east1-b"
}
provider "google" {
  project     = var.project
  region      = var.region
  credentials = file("automateml-f4e570d0a95d-owner-sa.json")
  zone        = var.zone
}

# Add GKE Service Account 
# Minimum roles bc will be the default account used by requests
resource "google_service_account" "GKE_tf_account" {
  account_id   = "gke-tf-service-account"
  display_name = "A Service Account  For Terraform To Make GKE Cluster"
}

# Kubernetes Version
variable "cluster_version" { 
  default = "1.26"
}

# Setup Clusters 
resource "google_container_cluster" "cluster" {
  name               = "tutorial"
  location           = var.zone
  min_master_version = var.cluster_version
  project            = var.project

  # Ignore changes to min-master-version - this is bc version may be different to what TF expects
  lifecycle {
    ignore_changes = [
      min_master_version,
    ]
  }

  # Cant create cluster w/o pool defined, create smallest possible pool, delete immediatly 
  # Use seperately managed pools
  remove_default_node_pool = true
  initial_node_count       = 1

  # Enable Workload Identity 
  # allows workloads in clusters to impersonate IAM service accounts 
  workload_identity_config {
    workload_pool = "${var.project}.svc.id.goog"
  }
}

# Node Pool Definition
resource "google_container_node_pool" "primary_preemptible_nodes" {
  name       = "trial-zero-cluster-node-pool"
  location   = var.zone
  project    = var.project
  cluster    = google_container_cluster.cluster.name
  node_count = 1
  
  # Setup autoscaling with min and max number of nodes
  autoscaling {
    min_node_count = 1
    max_node_count = 5
  }

  version = var.cluster_version

  # Node configuration definition: 
  node_config {

    preemptible  = true
    machine_type = "e2-medium"

    # Google recommends custom service accounts that have cloud-platform scope and 
    # permissions granted via IAM Roles.

    # Tie nodes to sa created above
    service_account = google_service_account.GKE_tf_account.email
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]

    # Disable regeneration of node pool everytime we run this file
    metadata = {
      disable-legacy-endpoints = "true"
    }
  }

  lifecycle {
    ignore_changes = [
      # Ignore changes to node_count, initial_node_count and version
      # otherwise node pool will be recreated if there is drift between what 
      # terraform expects and what it sees
      initial_node_count,
      node_count,
      version
    ]
  }
}

resource "google_service_account" "workload-identity-user-sa" {
  account_id   = "workload-identity-tutorial"
  display_name = "Service Account For Workload Identity"
}
resource "google_project_iam_member" "storage-role" {
  project = var.project
  role = "roles/storage.admin"
  # role   = "roles/storage.objectAdmin"
  member = "serviceAccount:${google_service_account.workload-identity-user-sa.email}"
}
resource "google_project_iam_member" "workload_identity-role" {
  project = var.project
  role   = "roles/iam.workloadIdentityUser"
  member = "serviceAccount:${var.project}.svc.id.goog[workload-identity-test/workload-identity-user]"
}


# Older code: 
/*
resource "google_service_account_iam_member" "GKE_account_iam" {
  service_account_id = google_service_account.GKE_account.name
  role               = "roles/iam.serviceAccountUser"
  member             = "user:jane@example.com"
}

# Allow SA service account use the default GCE account
resource "google_service_account_iam_member" "gce-default-account-iam" {
  service_account_id = data.google_compute_default_service_account.default.name
  role               = "roles/iam.serviceAccountUser"
  member             = "serviceAccount:${google_service_account.sa.email}"
}

resource "google_project_service" "run_api" {
  provider           = google
  service            = "run.googleapis.com"
  disable_on_destroy = true
}

# Create the Cloud Run service
resource "google_cloud_run_service" "run_service" {
  provider = google
  name     = "automate"
  location = "us-east1"

  template {
    spec {
      containers {
        image = "us-east1-docker.pkg.dev/automateml/docker-repo/automate:1.0"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  # Waits for the Cloud Run API to be enabled
  depends_on = [google_project_service.run_api]
}

resource "google_cloud_run_service_iam_member" "run_all_users" {
  provider = google
  service  = google_cloud_run_service.run_service.name
  location = google_cloud_run_service.run_service.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

output "service_url" {
  value = google_cloud_run_service.run_service.status.0.url
}
*/