pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                sh 'echo Checking out code from GitHub repo...'
            }
        }
        stage('Test Build Image') {
            steps {
                sh 'echo Testing build image...'
                sh 'tidy -q -e *.html'
            } 
        }
        stage('Build Docker Image') {
            steps {
                sh 'echo Running build automation...'
                script {
                    app = docker.build("mattocodes/game-app")
                    app.inside {
                        sh 'echo $(curl localhost:8080)'
                    }
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                sh 'echo Pushing image to Docker Hub...'
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub_id') {
                        app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                sh 'echo Deploying to Kubernetes cluster...'
                input 'Deploy to Production?'
                milestone(1)
                kubernetesDeploy(
                    kubeconfigId: 'kubeconfig_id',
                    configs: 'game-app-kube.yml',
                    enableConfigSubstitution: true
                )
            }
        }
    }
}
