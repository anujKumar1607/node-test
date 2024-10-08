pipeline {
    agent any

    environment {
        // Set environment variables
        AWS_SERVER = "ubuntu@3.111.229.11"
        // DEPLOY_DIR = "/var/www/html/droyl-backend"
        // PM2_PROCESS_NAME = "server.js"
    }

    stages {
        //step 1 clone the repository from git

        stage("Clone Repository"){
            steps {
                // Checkout code from Bitbucket
                git branch: 'development', credentialsId: 'bitbucketId', url: 'https://anujcool@bitbucket.org/anujcool/droyl-backend.git'
            }
        }

        //step : 2 Build the docker image using the docker file
        stage("Build Docker Image"){
            steps{
                script{
                    //Build the Docker image from Repo
                    dockerImage = docker.build("anujcool/simple-node-app")
                }
            }
        }
        //Deploy the Docker Container over the EC2 insance using SSH

        stage('Deploy to EC2 B'){
            steps{
                sshagent(['sshkey']){
                    sh '''
                    #ssh into 3.111.229.11 server and run docker commands
                    ssh -o StrictHostKeyChecking=no ${AWS_SERVER} \
                    "docker pull anujcool/simple-node-app && docker run -d -p 9000:9000 anujcool/simple-node-app"

                    '''
                }
            }
        }
        // Step 4: Start or Restart PM2 with server.js
        stage('Start/Restart PM2') {
            steps {
                sshagent(['sshkey']) {
                    sh '''
                    # SSH into EC2 B to start/restart PM2 and manage server.js
                    ssh -o StrictHostKeyChecking=no ec2-user@<EC2-B-Public-IP> \
                    "
                    cd /home/ubuntu/test-node && \
                    pm2 start server.js --name nodetest || pm2 restart nodetest
                    "
                    '''
                }
            }
        }
    }
}
