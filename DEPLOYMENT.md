# Deploying the Groundwater Mapping Application

## Deploying Using the Gcloud CLI:
- Ensure the appengine service is enabled on your Google Cloud Platform project
- Navigate to the frontend folder and run 'npm run prod' to build the frontend
- Navigate to the backend folder
- Ensure GCloud CLI is installed
- In a terminal with access to GCloud CLI, login to an account with access to the project you plan to deploy to `gcloud auth login`
- Run `gcloud projects list` and ensure the project you are going to deploy the app to is in the list.
- Select the project you intend to deploy to with `gcloud config set project [PROJECT_ID]`
- Run 'gcloud app deploy ./app.yaml' to deploy the app

## Deploying Using Bitbucket Pipelines:
- See the bitbucket-pipelines.yml file, and ensure that the DEPLOY_KEY_FILE is set in your bitbucket repo.
