rm -f despri_admin/migrations/0*
docker exec -i backend_db_1 mysql -u wopii -p'secret' designpriset << 'EOF'
SET FOREIGN_KEY_CHECKS = 0;

SET @tables = NULL;

SELECT GROUP_CONCAT('`', table_schema, '`.`', table_name,'`')
INTO @tables
FROM
    information_schema.tables
WHERE
    table_name NOT LIKE 'auth_%' AND 
    table_name NOT LIKE 'django_%' AND
    table_name NOT LIKE 'old_%' AND
    table_schema = 'designpriset';

SET @tables = CONCAT('DROP TABLE ', @tables);
PREPARE stmt1 FROM @tables;
EXECUTE stmt1;
DEALLOCATE PREPARE stmt1;

SET FOREIGN_KEY_CHECKS = 1;

EOF
./run_manage.sh makemigrations && ./run_manage.sh migrate --fake despri_admin zero && ./run_manage.sh migrate
