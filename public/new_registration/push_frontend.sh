#!/bin/bash

npm run build-dev
./copy_build.sh
cd ../../backend
./push_nginx.sh
