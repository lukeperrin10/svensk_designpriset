# To install and run locally
1. Edit local file `/etc/hosts` and add the line `127.0.0.1 myown.se`
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

#TODO File/code structure

