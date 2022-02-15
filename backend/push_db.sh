#!/bin/bash

REMOTE="lukeperrin11"
base_dir=$(dirname "$0")
USER=lukeperrin11
APP=dp_db
VERSION=latest
IMAGE=$APP:$VERSION


cd $base_dir
docker image build -t $IMAGE ./db/

docker tag $IMAGE $REMOTE/$IMAGE
docker login -u $USER lukeperrin11
docker push $REMOTE/$IMAGE

