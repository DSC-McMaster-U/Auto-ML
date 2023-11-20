variable "project" { default = "automateml" }
variable "region" { default = "us-east1" }
variable "zone" { default = "us-east1-b" }
variable "sa_email" { default = "owner-sa@automateml.iam.gserviceaccount.com" }

provider "google" {
  project     = var.project
  region      = var.region
  credentials = file("credentials.json") //github actions creates ./cloud-infra/credentials.json
  zone        = var.zone
}

resource "random_id" "default" {
  byte_length = 8
}

resource "google_storage_bucket" "default" {
  name                        = "${random_id.default.hex}-gcf-source" # Every bucket name must be globally unique
  location                    = "US"
  uniform_bucket_level_access = true
}

data "archive_file" "default" {
  type        = "zip"
  output_path = "/tmp/function-source.zip"
  source_dir  = "app/test/"
}
resource "google_storage_bucket_object" "object" {
  name   = "function-source.zip"
  bucket = google_storage_bucket.default.name
  source = data.archive_file.default.output_path # Add path to the zipped function source code
}

resource "google_cloudfunctions2_function" "default" {
  name        = "example function python"
  location    = "us-east1"
  description = "prints hello name"

  build_config {
    runtime     = "python39"    #python version 3.9
    entry_point = "hello_world" # Set the entry point function
    source {
      storage_source {
        bucket = google_storage_bucket.default.name
        object = google_storage_bucket_object.object.name
      }
    }
  }

  service_config {
    max_instance_count = 1
    available_memory   = "32M"
    timeout_seconds    = 30
  }
}

resource "google_cloud_run_service_iam_member" "member" {
  location = google_cloudfunctions2_function.default.location
  service  = google_cloudfunctions2_function.default.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

output "function_uri" {
  value = google_cloudfunctions2_function.default.service_config[0].uri
}

# resource "google_container_cluster" "automl_cluster" {
#   name     = "automl-cluster"
#   location = var.zone
#   project  = var.project

#   remove_default_node_pool = true
#   initial_node_count       = 2
# }

# //single node "node pool" for frontend and backend pods
# resource "google_container_node_pool" "febe_node_pool" {
#   name       = "frontend-backend-node-pool"
#   location   = var.zone
#   cluster    = google_container_cluster.automl_cluster.name
#   node_count = 1

#   node_config {
#     service_account = var.sa_email
#     machine_type    = "e2-micro"
#     disk_size_gb    = 30
#     labels = {
#       workload_type = "frontend-backend"
#     }

#     oauth_scopes = [
#       "https://www.googleapis.com/auth/cloud-platform",
#       "https://www.googleapis.com/auth/logging.write",
#       "https://www.googleapis.com/auth/monitoring"
#     ]
#   }
# }

# //pool for machine learning (allows us to adjust the compute later if needed)
# resource "google_container_node_pool" "ml_node_pool" {
#   name       = "machine-learning-node-pool"
#   location   = var.zone
#   cluster    = google_container_cluster.automl_cluster.name
#   node_count = 1

#   node_config {
#     service_account = var.sa_email
#     machine_type    = "e2-micro"
#     disk_size_gb    = 30
#     labels = {
#       workload_type = "machine-learning"
#     }

#     oauth_scopes = [
#       "https://www.googleapis.com/auth/cloud-platform",
#       "https://www.googleapis.com/auth/logging.write",
#       "https://www.googleapis.com/auth/monitoring"
#     ]
#   }
# }
