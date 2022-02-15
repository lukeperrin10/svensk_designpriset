#!/bin/bash

REMOTE="lukeperrin11"
base_dir=$(dirname "$0")
USER=lukeperrin11
APP=dp_node
VERSION=latest
IMAGE=$APP:$VERSION

cd $base_dir/server
npx tsc

cd ..

docker image build -t $IMAGE ./server/

docker tag $IMAGE $REMOTE/$IMAGE
docker login -u $USER lukeperrin11
docker push $REMOTE/$IMAGE

