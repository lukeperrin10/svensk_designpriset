#!/bin/bash

cd "$(dirname "$0")"

./populate_standard_data.sh
./populate_content_data.sh
./populate_dummy_data.sh
