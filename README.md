# Capstone - Automated CI/CD Pipeline

This capstone project is part of Udacity's 
[Cloud DevOps Engineer Nanodegree](https://www.udacity.com/course/cloud-dev-ops-nanodegree--nd9991) 
program. Within the project, I implemented an automated Continuous Integration/Continous 
Deployment(CI/CD) pipeline for a microservice application using a rolling deployment strategy. The 
application is a Node.js Matching Game web app. Meanwhile, the pipeline was built using GitHub, 
Jenkins, Docker, DockerHub, Kubernetes, and AWS CloudFormation. 

## Pipeline Structure

Using Jenkins build automation server, the web app code was checked out from GitHub. The code 
was built, tested and dockerized. The dockerized code was then pushed to DockerHub which was then
pulled from DockerHub and deployed to a three-node Kubernetes cluster using a rolling deployment 
strategy. Meanwhile, the Kubernetes cluster consist of a master node and two woker nodes. 

Here is an overview of the the pipeline:
````
          GitHub ===> Jenkins ===> DockerHub ===> Kubernetes Cluster
````
````
    GitHub: serves as the source control repository for the code

    Jenkins: serves as the automation tool for building, testing, and deploying the code

    DockerHub: a remote registry where built and tested code was pushed

    Kubernetes Cluster: this is a three-node Kubernetes cluster production enviroment.
```` 

## Initial Setup

* Specification
  - Server: AWS EC2 Instance
  - Ubuntu OS: 18.04 LTS
  - Docker: 18.06.1-ce
  - Jenkins: 2.249.3 LTS
  - Kubeadm: 1.15.7
  - Kubelet: 1.15.7
  - Kubectl: 1.15.7

* Jenkins Server Setup
    - On an AWS EC2 instance, Docker, Jenkins and all required Jenkins plugins 
      was installed on an Ubuntu 18.04 LTS operating system. 


* Kubernetes Cluster Setup
    - From the [AWS Management Console](https://aws.amazon.com/console/), search for and then 
      click on CloudFormation.

    - Within the CloudFormation console, create a stack using this template file 
      `cfn-k8s-cluster.yml`

    - The `cfn-k8s-cluster.yml` file provisions a three-node Kubernetes cluster with docker,
      kubeadm, kubelet and kubectl aleady installed.

    - After provisioning the cluster, log into the master node to initialize the cluster.

    - On the master node, run the following commands to initialize the cluster:
      ````
        sudo kubeadm init --pod-network-cidr=10.244.0.0/16 --ignore-preflight-errors=NumCPU
      ````

    - After initializing the cluster, take note of the output on the screen for further 
      configuration. Run the commands below on the master node as stated on the screen:
      ````
        mkdir -p $HOME/.kube
        sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
        sudo chown $(id -u):$(id -g) $HOME/.kube/config
      ````

    - Now log into each worker node and join them to the cluster using the command similar to the 
      one below:
      ````
        sudo kubeadm join $some_ip:6443 \
                    --token $some_token \
                    --discovery-token-ca-cert-hash $some_hash

        Note: Get the actual kubeadm join command from the console output
      ````
    
    - Now setup the cluster/pod network using [Flannel](https://github.com/coreos/flannel#flannel). 
      Run the following commands on all nodes:
      ````
        echo "net.bridge.bridge-nf-call-iptables=1" | sudo tee -a /etc/sysctl.conf
        sudo sysctl -p
      ````

    - Only on the master node, run the following command:
      ````
        kubectl apply -f \
          https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel-old.yaml
      ````

    - This concludes the Kubernetes cluster setup. To verify that it is working, run the following 
      command on the master node:
      ````
        kubectl get nodes
      ````
    
    - After running the `kubectl get nodes` command, an output similar to the one below is 
      displayed:
      ````
        ubuntu@ip-172-31-63-140:~$ kubectl get nodes
        NAME               STATUS   ROLES    AGE   VERSION
        ip-172-31-26-174   Ready    <none>   34m   v1.15.7
        ip-172-31-54-110   Ready    <none>   33m   v1.15.7
        ip-172-31-63-140   Ready    master   58m   v1.15.7
      ````

## License

The contents of this repository are covered under the [MIT Licence](#)
