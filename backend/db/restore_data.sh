#/bin/bash

docker exec -i $(docker container ps | grep backend_db_1 | awk '{print($1)}') bash << 'EOF'
	mysqldump --defaults-extra-file=/var/dumps/user.cnf designpriset > /var/dumps/overwrite_$(date "+%Y-%m-%d_%H-%M").sql
	exit
EOF

SQL=$(basename "$1")

docker exec -i $(docker container ps | grep backend_db_1 | awk '{print($1)}') bash << EOF
	mysql --defaults-extra-file=/var/dumps/user.cnf designpriset < /var/dumps/$SQL
	exit
EOF
