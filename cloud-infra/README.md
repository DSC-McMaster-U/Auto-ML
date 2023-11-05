# Installing and Running Terraform 

## Installation

### Terraform Installation

**macOS:**

`brew tap hashicorp/tap`

`brew install hashicorp/tap/terraform`

**Windows:**
You can try using the installer linked [here](https://developer.hashicorp.com/terraform/downloads), but it gave me issues, so I did the following:

Install chocolatey by running the following command on Powershell (Run as admin):

`Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))`

Then run the following command to install terraform:

`choco install terraform`

### Google Cloud SDK 
Follow [these](https://cloud.google.com/sdk/docs/install) instructions. 

## Run the terraform file
First, make sure you're in the directory containing the main.tf file (i.e. the cloud-infra folder). To initialize the working directory with the tf file, run:

`terraform init`

To compile the file and create the 'execution plan' i.e. what is going to be configured on our cloud project, run:

`terraform plan -out tfplan`

This will output everything that will be created/destroyed/replaced upon applying the plan. This will also create a tfplan file. We can apply this plan, i.e. apply the configurations to our project by running:

`terraform apply tfplan`

It may take some time to finish applying the infrastructure changes, but you should be able to see it active on our projects console under Kubernetes Engine > Clusters. 