pipeline {
    agent any

    environment {
        TAG ='${env.BUILD_NUMBER}'
    }
    stages {
        //stage('Code Checkout from GitHub') {
            //steps {
                //This step is performed by Jenkins
            //}
        //}
        
        stage('Environment Variable') {
            steps {
                echo 'Initial value of tag: TAG'
                sh 'TAG = ${env.BUILD_NUMBER}'
                echo 'Current value of tag: ${TAG}'
            }
        }
    }
}
