#!/bin/bash

cd $(dirname "$0")
cd ..

#build to dist
tsc

path="/var/www/www.designpriset.se/wwwroot"
filename="backend_backup/backend_$(date +%Y-%m-%d_%H-%M-%S).tar.gz"

#heredoc 

ssh root@batteri << EOF
    cd $path && \
    tar -czf $filename --exclude node_modules backend_api
EOF

rsync -havz --delete --exclude-from="rsync_exclude.txt" dist/ root@batteri:$path/backend_api
# rsync -havz --exclude-from="rsync_exclude.txt" dist/ root@batteri:$path/backend_api
scp package.json root@batteri:$path/backend_api
scp package-lock.json root@batteri:$path/backend_api



