pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checkout'
            }
        }
        stage('npm install dependencies') {
            steps {
                echo 'Install dependencies'
                nodejs('Node 10.15.0 LTS') {
                    sh 'npm install'
              }
            }
        }
        stage('Test') {
                    steps {
                        echo 'Test cases'
                        nodejs('Node 10.15.0 LTS') {
                            sh 'npm run-script test'
                      }
                    }
                }

        stage('Build NPM') {
            steps {
                echo 'Build NPM'
                nodejs('Node 10.15.0 LTS') {
                    sh 'npm run-script build'
              }
            }
        }



        stage('Build Docker Image') {
            steps {
                echo 'Build Docker Image'
                sh 'docker build --no-cache -t leon4uk/botmasterzzz-mobile-frontend:1.0.0 .'
            }
        }

        stage('Push Docker image') {
            steps {
                echo 'Push Docker image'
                withCredentials([string(credentialsId: 'dockerHubPwd', variable: 'dockerHubPwd')]) {
                   sh "docker login -u leon4uk -p ${dockerHubPwd}"
                }
                sh 'docker push leon4uk/botmasterzzz-mobile-frontend:1.0.0'
                sh 'docker rmi  leon4uk/botmasterzzz-mobile-frontend:1.0.0'
            }
        }

        stage('Deploy') {
            steps {
                echo '## Deploy remote ##'
                script {
                    sshagent(credentials: ['second']) {
                        echo '## Deploy remote ##'
                        sh "ssh root@5.189.146.63 docker container ls -a -f name=botmasterzzz-mobile-frontend -q | ssh root@5.189.146.63 xargs --no-run-if-empty docker container stop"
                        sh 'ssh root@5.189.146.63 docker container ls -a -f name=botmasterzzz-mobile-frontend -q | ssh root@5.189.146.63 xargs -r docker container rm'
                        sh "ssh root@5.189.146.63 docker rmi --force leon4uk/botmasterzzz-mobile-frontend:1.0.0"
                        sh 'ssh root@5.189.146.63 docker run -v /etc/localtime:/etc/localtime --name botmasterzzz-mobile-frontend -d -p 0.0.0.0:8017:80 --restart always leon4uk/botmasterzzz-mobile-frontend:1.0.0'
                    }
                }
            }
        }
    }
}
