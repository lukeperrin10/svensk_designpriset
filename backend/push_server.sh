#!/bin/bash

REMOTE="dev.wopii.com"
base_dir=$(dirname "$0")
USER=wopii
APP=dp_node
VERSION=latest
IMAGE=$APP:$VERSION


cd $base_dir
docker image build -t $IMAGE ./server/

docker tag $IMAGE $REMOTE/$IMAGE
docker login -u $USER dev.wopii.com
docker push $REMOTE/$IMAGE
