#!/bin/bash

REMOTE="dev.wopii.com"
base_dir=$(dirname "$0")
USER=wopii
APP=dp_frontend
VERSION=latest
IMAGE=$APP:$VERSION


cd $base_dir

npm install

docker image build -t $IMAGE .

docker tag $IMAGE $REMOTE/$IMAGE
docker login -u $USER dev.wopii.com
docker push $REMOTE/$IMAGE
