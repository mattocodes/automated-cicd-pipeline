pipeline {
    agent any

    environment {
        TAG ='${BUILD_NUMBER}'
    }
    stages {
        /*stage('Code Checkout from GitHub') {
            steps {
                //This step is performed by Jenkins
            }
         }
        */
        stage('Build Image') {
            steps {
                
                sh 'docker build -t . mattocodes/gameapp:{BUILD_NUMBER}
                
                sh 'echo Current value of tag: ${TAG}'
            }
        }
    }
}
