# Capstone Project - Implementing a Full CI/CD Pipeline

## Summary
The goal of this capstone project was to implement a Continous Integration/Continuous Deployment(CI/CD) pipeline using Jenkins.
To achieve this goal, I used GitHub as my souce code repository where I had a simple Nodejs web app.

So using Jenkins build automation server, the web app code was checked out from GitHub. The code was built, tested and dockerized. The build code was then pushed to a remote registry - Docker Hub. Also it was pushed to production on a two-node Kubernetes cluster running on AWS EC2 instance. 



## Initial Setup

* Jenkins Server Setup
    - Using AWS EC2 instance, I installed Jenkins and all required plugins.

* Kubernetes Server Setup
    - Also, using EC2 instances, I had setup a two-node Kubernetes cluster - one master node and one worker node. 

