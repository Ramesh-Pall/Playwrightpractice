pipeline {
  agent any

  parameters {
    choice(name: 'TARGET_ENV', choices: ['qa', 'uat'], description: 'Environment URL file to use')
    string(name: 'PRODUCT_COUNT', defaultValue: '2', description: 'Number of products to add (1-6)')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Node Dependencies') {
      steps {
        bat 'npm ci'
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        bat 'npx playwright install'
      }
    }

    stage('Run Playwright Tests') {
      steps {
        withCredentials([
          string(credentialsId: 'qa-username', variable: 'SAUCE_USERNAME'),
          string(credentialsId: 'qa-password', variable: 'SAUCE_PASSWORD')
        ]) {
          withEnv(["TEST_ENV=${params.TARGET_ENV}", "PRODUCT_COUNT=${params.PRODUCT_COUNT}"]) {
            bat 'npx playwright test'
          }
        }
      }
    }
  }

  post {
    always {
      junit testResults: 'test-results/junit.xml', allowEmptyResults: true
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    }
  }
}