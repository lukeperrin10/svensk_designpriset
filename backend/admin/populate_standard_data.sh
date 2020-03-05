#!/bin/bash

cd "$(dirname "$0")"
path=./despri_admin/fixtures

./run_manage.sh loaddata $path/content_template.json
./run_manage.sh loaddata $path/content_phase.json
./run_manage.sh loaddata $path/mail_var.json
./run_manage.sh loaddata $path/category.json
