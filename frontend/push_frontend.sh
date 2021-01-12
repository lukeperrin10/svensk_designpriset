#!/bin/bash

REMOTE="xupet"
base_dir=$(dirname "$0")
USER=xupet
APP=dp_frontend
VERSION=latest
IMAGE=$APP:$VERSION


cd $base_dir

docker image build -t $IMAGE .

docker tag $IMAGE $REMOTE/$IMAGE
docker login -u $USER xupet
docker push $REMOTE/$IMAGE