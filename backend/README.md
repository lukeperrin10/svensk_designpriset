# Designpriset Backend

## To install and run locally

```bash
cd ./server
npm install
```

1. Edit local file `/etc/hosts` and add the line `127.0.0.1 myown.se`. The reason for this is to avoid problems with CORS.
2. Run `docker-compose build` in `backend` directory. 
3. Run `docker-compose up db`
4. When initialization is done press `Ctrl + C` and run `docker-compose up`
5. In `backend/admin/`, run `./run_manage.sh migrate`.
6. Run `./run_manage.sh createsuperuser` and choose username and password.
7. Run `./load_all_fixtures.sh`.
8. In `backend` run `./load_views.sh`.

Next time all you have to do to run the backend is `docker-compose up` 

The node server is running on `myown.se:8001`.
The Django server is runnong on `myown.se:8000`.

The Django admin is located at `myown.se:8000/admin`
 
`localhost` usually works instead of `myown.se`, but localhost treats cookies differently.

## Deployment
There is one push script for each part of the enviroment:
push_admin.sh
push_db.sh
push_nginx.sh
push_server.sh

Change "REMOTE" and "USER" in each script to your chosen docker repository.

After running either one or all of the push scripts you need to run the correlated scripts in the production server enviroment:
reload_admin.sh
reload_db.sh
reload_nginx.sh
reload_node.sh

reload_all.sh

Remember to change "REMOTE" and "USER" in these scripts as well.

## Other scripts
In backend/admin there is a script for accesing the mysql database called "run_mysql.sh".
Use "run_manage.sh <option>" when you need to use django manage. Example
```bash
./run_manage.sh makemigrations
```

## Testing
There is an automated test suite for the node server. The tests are located in dir 'test'.
```bash
cd server
./run_test.sh
```

There is also some independent test for testing post entry and voting in folder root/test scripts.

