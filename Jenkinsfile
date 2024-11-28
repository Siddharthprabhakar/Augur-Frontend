pipeline {
    agent any

    environment {
        // Define environment variables here if needed (e.g., Node version)
        NODE_VERSION = '14.x'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from GitHub
                git 'https://github.com/Siddharthprabhakar/Augur-Frontend.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    // Install Node.js and project dependencies
                    sh 'curl -sL https://deb.nodesource.com/setup_${NODE_VERSION} | sudo -E bash -'
                    sh 'sudo apt-get install -y nodejs'
                    sh 'npm install'
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                // Run your tests (assuming you use Jest or another testing framework)
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                // Build the project (adjust the build command according to your project setup)
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                // Optionally, you can add a deployment step, e.g., to Azure, AWS, or another platform
                echo 'Deploying to production environment...'
                // You can use commands like `sh 'npm run deploy'` or any specific deployment script
            }
        }
    }
    
    post {
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
