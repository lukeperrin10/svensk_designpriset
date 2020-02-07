#!/bin/bash

cd "$(dirname "$0")"

for f in ./despri_admin/fixtures/*.json; do
    ./run_manage.sh loaddata "$f"
done
