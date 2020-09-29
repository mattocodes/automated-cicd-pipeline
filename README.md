# Capstone Project - Implementing a Full CI/CD Pipeline

This capstone project involved building a Continuous Integration/Continuous Deployment(CI/CD)
pipeline for a microservice application. The application is a basic Node.js game app. And, the
CI/CD pipeline, from source code to production, was implemented using Github, Jenkins, Docker,
Kubernetes, and AWS CloudFormation. 

## Pipeline Structure

Here is the overview of the the pipeline:

            GitHub ===> Jenkins ===> DockerHub ===> Kubernetes Cluster

    GitHub: serves as the source control repository for the code

    Jenkins: serves as the automation tool for building, testing, and deploying the code

    DockerHub: a remote registry where built and tested code was pushed

    Kubernetes Cluster: this is a three-node Kubernetes cluster production enviroment. 

So using Jenkins build automation server, the web app code was checked out from GitHub. The code 
was built, tested and dockerized. The build code was then pushed to DockerHub. The code was then
pulled from DockerHub and deployed to the three-node Kubernetes cluster using a rolling deployment 
strategy. Meanwhile, the cluster consist of a master node and two woker nodes. 


## Initial Setup

* Jenkins Server Setup
    - On an AWS EC2 instance, using Ubuntu 18.04 LTS OS, Docker, Jenkins and all required plugins 
      was installed. 

* Kubernetes Cluster Setup
    - Using the CloudFormation template file `cfn-k8s-cluster.yml`, three EC2 instances were
      provisioned with Docker, kubeadm, kubelet, and kubectl already installed. These instances
      make up the three-node Kubernetes cluster. 

    - After provisioning the cluster, Flannel networking was configured, the master node was
      initialized, and the worker nodes was joined to the cluster.

## License

The contents of this repository are covered under the [MIT Licence](#)
