#!/bin/bash

cd $(dirname "$0")
cd ..

#build to dist
tsc

path="/var/www/www.designpriset.se/wwwroot"
backend_path="$path/backend_api"
filename="backend_backup/backend_$(date +%Y-%m-%d_%H-%M-%S).tar.gz"


rsync -hvzrlptDvn --delete --exclude-from="rsync_exclude.txt" dist/ root@batteri:$backend_path

echo "Do you want to continue? [y/n]"

read cont

if [ "$cont" != "y" ]; then
	echo "Exiting..."
	exit 0
fi

#heredoc 

ssh root@batteri << EOF
    cd $path && \
    tar -czf $filename --exclude node_modules backend_api
EOF

rsync -hvzrlptD --delete --exclude-from="rsync_exclude.txt" dist/ root@batteri:$backend_path
# rsync -hvzrlptD --exclude-from="rsync_exclude.txt" dist/ root@batteri:$backend_path
scp package.json root@batteri:$backend_path
scp package-lock.json root@batteri:$backend_path

ssh root@batteri <<- EOF
	cd $backend_path && \
	npm install --only=production
EOF




