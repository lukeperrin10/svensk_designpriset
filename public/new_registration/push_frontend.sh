#!/bin/bash

npm run build-dev
./copy_build.sh

npm run build-test
./copy_build_test.sh

cd ../../backend
./push_nginx.sh
