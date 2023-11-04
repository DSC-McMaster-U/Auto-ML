provider "google" {
  project = "automateml"
  region  = "us-east1"
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

# Add Service Account 
resource "google_service_account" "default" {
  account_id   = "compute-service-account" #changing id causes forces new account
  display_name = "Service Account for Compute Instance"
}

# Create new VM, Attach to Service Account - for later 
/*
resource "google_compute_instance" "default" {
  name         = "my-test-vm"
  machine_type = "n1-standard-1"
  zone         = "us-central1-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  // Local SSD disk
  scratch_disk {
    interface = "SCSI"
  }

  network_interface {
    network = "default"

    access_config {
      // Ephemeral public IP
    }
  }

  service_account {
    email  = google_service_account.default.email
    scopes = ["cloud-platform"] #  `cloud-platform` is recommended for avoid embedding secret keys or user credentials
  }
}
*/