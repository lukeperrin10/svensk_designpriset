#!/bin/bash

cd "$(dirname "$0")"
path=./despri_admin/fixtures

./run_manage.sh loaddata $path/profile.json
./run_manage.sh loaddata $path/entry.json
