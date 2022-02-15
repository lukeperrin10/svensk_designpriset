#cat db/views/*.sql |  docker exec -i backend_db_1 mysql -u wopii -p'secret' designpriset

docker-compose up -d --build db
sleep 5

docker exec -i backend_db_1 sh << EOF
cat /views/*.sql | mysql -u wopii -p'secret' designpriset 
EOF


