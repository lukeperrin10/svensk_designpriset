#!/bin/bash

REMOTE="xupet"
base_dir=$(dirname "$0")
USER=xupet
APP=dp_node
VERSION=latest
IMAGE=$APP:$VERSION

cd $base_dir/server
npx tsc

cd ..

docker image build -t $IMAGE ./server/

docker tag $IMAGE $REMOTE/$IMAGE
docker login -u $USER xupet
docker push $REMOTE/$IMAGE

