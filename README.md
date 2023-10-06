# New Mexico BGMR Groundwater Mapping
Angular and Flask project to visualize groundwater well measurements and highlight missing monitoring throughout New Mexico.

### Run Frontend
- **Navigate to `/frontend`**
- Run `npm i` to install dependencies
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`
  - The frontend may be run independently of the backend

### Run Backend

- **Navigate to `/backend`**
- Run `python -m venv venv` to create virtual environment
- Run `./venv/Scripts/activate` to activate virtual environment
- Run `python -m pip install -r requirements.txt` to install requirements
- Define environment variables `FLASK_APP=main.py` and `FLASK_ENV=development`
- Run `flask run` to run the backend

### Bitbucket Deployment
- Go to the "pipelines" section of the bitbucket
- Click "Run pipeline" in the top right corner
- Select the branch
- Select the "deploy-appengine" pipeline
- Click "run"
- When complete the app should be available at https://bgmr-gwm.wn.r.appspot.com/

### Environment Variables (Frontend)
- *BucketURL: Cloud bucket base URL
- **Note: CSVs on the bucket must have CORS configured to allow all requests

## Code Structure

### Frontend
`/app/` Main app module, components and routing
`/app/modules/core` App level components and services (header, footer, nav)
`/app/modules/shared` Components, services, modules shared throughout app (spinner, logger, etc)
`/app/modules/features` Feature modules

### Backend
`main.py` Entry point, runs application
`/api/__init__.py` Application factory
