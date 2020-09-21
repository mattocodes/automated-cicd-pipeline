pipeline {
    agent any

    stages {
        /*
        stage('Code Checkout') {
            steps {
                //This step is performed by Jenkins
            }
         }
        */
        
        stage('Test Code') {
            steps {
                echo "Testing code..."
                sh "tidy -q -e *.html"
            }
        }
        
        stage('Build Code') {
            steps {
                echo "Building code..."
                sh "docker build . -t mattocodes/testapp:${BUILD_NUMBER}"
                sh "docker tag mattocodes/testapp:${BUILD_NUMBER} mattocodes/testapp:latest"
            }
        }
        stage('Push Build to DockerHub') {
            steps {
                echo "Pushing build to DockerHub..."
                withCredentials([string(credentialsId: 'dockerhub_id', variable: 'dockerhub_pwd')]) {
                    sh "docker login -u mattocodes -p ${dockerhub_pwd}"
                    sh "docker push mattocodes/testapp:${BUILD_NUMBER}"
                    sh "docker push mattocodes/testapp:latest"
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                sshagent(['kubemasternode_id']) {
                    echo "Copying game-app file"
                    sh "scp -o StrictHostKeyChecking=no game-app.yml ubuntu@3.215.23.226:/home/ubuntu/"
                    script {
                        try {
                            sh "ssh ubuntu@3.215.23.226 kubectl apply -f ."
                        }catch(error) {
                            sh "ssh ubuntu@3.215.23.226 kubectl create -f ."
                        }
                    }
                    
                }
            }
        }
        
    }
}
