#!/bin/bash

cd "$(dirname "$0")"
path=./despri_admin/fixtures

./run_manage.sh loaddata $path/content.json
./run_manage.sh loaddata $path/mail.json
