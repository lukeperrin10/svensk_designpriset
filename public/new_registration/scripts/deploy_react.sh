#!/bin/bash

cd $(dirname "$0")
cd ..

#build react projekt
react-scripts-ts build 

path="/var/www/www.designpriset.se/wwwroot"
react_path="$path/register2"
# filename="reg_backup/register2_$(date +%Y-%m-%d_%H-%M-%S).tar.gz"


rsync -hvzrlptDvn --delete --exclude-from="rsync_exclude.txt" build/ root@batteri:$react_path


echo "Do you want to continue? [y/n]"

read cont

if [ "$cont" != "y" ]; then
	echo "Exiting..."
	exit 0
fi

rsync -hvzrlptD --delete --exclude-from="rsync_exclude.txt" build/ root@batteri:$react_path
