# Designpriset Frontend

The frontend application is built with React

## Installation

```bash
yarn
```

## Run

```bash
yarn start
```

There is also a development version that allows for switching between different phases:
```bash
yarn dev
```

## Build and Deploy

We use Docker to deploy the frontend. You need to change "REMOTE" and "USER" in "push_frontend.sh" to your own repository enviroment (for example Docker Hub).
The same goes for all push/deploy/build scripts that uses Docker in the backend dir and in the production server enviroment.

### To build and deploy the development version

```bash
./push_frontend_test.sh
```

Then you need to reload Nginx in the server enviroment. Run the script 'reload_nginx.sh'
Done!

### To build and deploy the production version
```bash
./push_frontend.sh
```

Then run 'build_frontend.sh' in the server enviroment.
The reason for why we have a build script on the server instead of building localy is because we in the begining used react-snap in post build.
We have, how ever, chosen to remove that so feel free to choose another way of deploying this.

## Testing
There is an automated test suite for the node server. The tests are located in dir 'test'.
```bash
cd server
./run_test.sh
```

