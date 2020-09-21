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
        
        /*
        stage('Build Code') {
            steps {
                
                sh "docker build . -t mattocodes/testapp:${BUILD_NUMBER}"
                
            }
        }
        */
    }
}
